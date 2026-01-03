# Integração Google Calendar API - Agendas dos Profissionais

## 📋 Visão Geral

Este documento detalha como integrar o Google Calendar API para gerenciar agendas individuais de cada profissional do salão, permitindo sincronização bidirecional entre o sistema Perfect Salon e o Google Calendar de cada profissional.

---

## 🎯 Objetivos da Integração

1. **Cada profissional tem seu próprio Google Calendar**
2. **Sincronização bidirecional**: eventos criados no sistema aparecem no Google Calendar e vice-versa
3. **Privacidade**: cada profissional controla seu próprio calendário
4. **Automação**: criar/atualizar/deletar eventos automaticamente
5. **Webhooks**: receber notificações quando eventos são modificados no Google Calendar

---

## 🔐 Configuração Inicial

### 1. Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Google Calendar API**:
   - Vá em "APIs & Services" > "Library"
   - Procure por "Google Calendar API"
   - Clique em "Enable"

### 2. Configurar OAuth 2.0

1. Vá em "APIs & Services" > "Credentials"
2. Clique em "Create Credentials" > "OAuth client ID"
3. Configure:
   - **Application type**: Web application
   - **Name**: Perfect Salon Backend
   - **Authorized redirect URIs**:
     - `http://localhost:3001/api/auth/google/calendar/callback` (dev)
     - `https://api.yourdomain.com/api/auth/google/calendar/callback` (prod)
4. Salve o **Client ID** e **Client Secret**

### 3. Scopes Necessários

```typescript
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',           // Leitura e escrita completa
  'https://www.googleapis.com/auth/calendar.events',    // Apenas eventos
  'https://www.googleapis.com/auth/userinfo.email',     // Email do usuário
  'https://www.googleapis.com/auth/userinfo.profile',   // Perfil do usuário
];
```

---

## 📦 Instalação de Dependências

```bash
npm install googleapis
npm install @types/googleapis --save-dev
```

---

## 🏗️ Arquitetura da Integração

### Fluxo de Autenticação

```
1. Profissional clica em "Conectar Google Calendar"
2. Backend redireciona para Google OAuth
3. Profissional autoriza acesso
4. Google redireciona de volta com código
5. Backend troca código por access_token e refresh_token
6. Backend armazena refresh_token (criptografado) no banco
7. Backend usa refresh_token para obter access_tokens quando necessário
```

### Estrutura de Dados

```prisma
model Professional {
  id                String   @id @default(cuid())
  name              String
  email             String
  googleCalendarId  String?  // ID do calendário (geralmente 'primary')
  googleRefreshToken String? // Token para renovar acesso (CRIPTOGRAFADO)
  googleEmail       String?  // Email da conta Google conectada
  calendarConnected Boolean  @default(false)
  // ...
}
```

---

## 💻 Implementação Completa

### 1. Serviço de Google Calendar

```typescript
// src/services/googleCalendar.service.ts
import { google, calendar_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import prisma from '../config/database';
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!; // 32 bytes
const IV_LENGTH = 16;

class GoogleCalendarService {
  private getOAuth2Client(): OAuth2Client {
    return new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!,
      process.env.GOOGLE_REDIRECT_URI!
    );
  }

  /**
   * Criptografa o refresh token antes de salvar no banco
   */
  private encryptToken(token: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  /**
   * Descriptografa o refresh token do banco
   */
  private decryptToken(encryptedToken: string): string {
    const parts = encryptedToken.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  /**
   * Gera URL de autorização OAuth
   */
  getAuthUrl(professionalId: string): string {
    const oauth2Client = this.getOAuth2Client();
    
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline', // Necessário para obter refresh_token
      scope: scopes,
      prompt: 'consent', // Força mostrar tela de consentimento para garantir refresh_token
      state: professionalId, // Passa ID do profissional para identificar depois
    });

    return url;
  }

  /**
   * Processa callback do OAuth e salva tokens
   */
  async handleCallback(code: string, professionalId: string) {
    const oauth2Client = this.getOAuth2Client();
    
    // Trocar código por tokens
    const { tokens } = await oauth2Client.getToken(code);
    
    if (!tokens.refresh_token) {
      throw new Error('Refresh token não recebido. O usuário pode já ter autorizado antes.');
    }

    // Obter informações do usuário
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    // Criptografar refresh token
    const encryptedRefreshToken = this.encryptToken(tokens.refresh_token);

    // Salvar no banco
    await prisma.professional.update({
      where: { id: professionalId },
      data: {
        googleRefreshToken: encryptedRefreshToken,
        googleEmail: userInfo.data.email || null,
        googleCalendarId: 'primary', // ou o ID específico do calendário
        calendarConnected: true,
      },
    });

    return {
      email: userInfo.data.email,
      name: userInfo.data.name,
    };
  }

  /**
   * Obtém cliente autenticado para um profissional
   */
  private async getAuthenticatedClient(professionalId: string): Promise<OAuth2Client> {
    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
    });

    if (!professional || !professional.googleRefreshToken) {
      throw new Error('Profissional não tem Google Calendar conectado');
    }

    const oauth2Client = this.getOAuth2Client();
    const refreshToken = this.decryptToken(professional.googleRefreshToken);

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    // Renovar access token se necessário
    try {
      await oauth2Client.getAccessToken();
    } catch (error) {
      // Se falhar, o refresh token pode ter expirado
      throw new Error('Erro ao renovar acesso ao Google Calendar. Reconecte sua conta.');
    }

    return oauth2Client;
  }

  /**
   * Cria evento no Google Calendar do profissional
   */
  async createEvent(
    professionalId: string,
    event: {
      title: string;
      start: Date;
      end: Date;
      description?: string;
      location?: string;
      clientName?: string;
      clientPhone?: string;
    }
  ): Promise<string> {
    const auth = await this.getAuthenticatedClient(professionalId);
    const calendar = google.calendar({ version: 'v3', auth });

    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
    });

    const calendarId = professional?.googleCalendarId || 'primary';

    const response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: event.title,
        description: event.description || '',
        start: {
          dateTime: event.start.toISOString(),
          timeZone: process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Sao_Paulo',
        },
        end: {
          dateTime: event.end.toISOString(),
          timeZone: process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Sao_Paulo',
        },
        location: event.location,
        // Adicionar informações do cliente como extendedProperties
        extendedProperties: {
          private: {
            clientName: event.clientName || '',
            clientPhone: event.clientPhone || '',
          },
        },
        // Notificações
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 dia antes
            { method: 'popup', minutes: 60 },      // 1 hora antes
          ],
        },
      },
    });

    return response.data.id || '';
  }

  /**
   * Atualiza evento no Google Calendar
   */
  async updateEvent(
    professionalId: string,
    googleEventId: string,
    event: {
      title?: string;
      start?: Date;
      end?: Date;
      description?: string;
      location?: string;
    }
  ) {
    const auth = await this.getAuthenticatedClient(professionalId);
    const calendar = google.calendar({ version: 'v3', auth });

    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
    });

    const calendarId = professional?.googleCalendarId || 'primary';

    // Buscar evento atual
    const existingEvent = await calendar.events.get({
      calendarId,
      eventId: googleEventId,
    });

    // Atualizar
    const response = await calendar.events.update({
      calendarId,
      eventId: googleEventId,
      requestBody: {
        ...existingEvent.data,
        summary: event.title || existingEvent.data.summary,
        description: event.description !== undefined 
          ? event.description 
          : existingEvent.data.description,
        location: event.location || existingEvent.data.location,
        start: event.start
          ? {
              dateTime: event.start.toISOString(),
              timeZone: process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Sao_Paulo',
            }
          : existingEvent.data.start,
        end: event.end
          ? {
              dateTime: event.end.toISOString(),
              timeZone: process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Sao_Paulo',
            }
          : existingEvent.data.end,
      },
    });

    return response.data;
  }

  /**
   * Deleta evento do Google Calendar
   */
  async deleteEvent(professionalId: string, googleEventId: string) {
    const auth = await this.getAuthenticatedClient(professionalId);
    const calendar = google.calendar({ version: 'v3', auth });

    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
    });

    const calendarId = professional?.googleCalendarId || 'primary';

    await calendar.events.delete({
      calendarId,
      eventId: googleEventId,
    });
  }

  /**
   * Lista eventos do Google Calendar do profissional
   */
  async listEvents(
    professionalId: string,
    timeMin: Date,
    timeMax: Date
  ): Promise<calendar_v3.Schema$Event[]> {
    const auth = await this.getAuthenticatedClient(professionalId);
    const calendar = google.calendar({ version: 'v3', auth });

    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
    });

    const calendarId = professional?.googleCalendarId || 'primary';

    const response = await calendar.events.list({
      calendarId,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 2500, // Máximo permitido pela API
    });

    return response.data.items || [];
  }

  /**
   * Sincroniza eventos do Google Calendar para o banco de dados
   */
  async syncEventsToDatabase(professionalId: string, timeMin: Date, timeMax: Date) {
    const googleEvents = await this.listEvents(professionalId, timeMin, timeMax);

    for (const googleEvent of googleEvents) {
      if (!googleEvent.id || !googleEvent.start?.dateTime || !googleEvent.end?.dateTime) {
        continue;
      }

      // Verificar se evento já existe no banco
      const existingAppointment = await prisma.appointment.findFirst({
        where: {
          professionalId,
          googleEventId: googleEvent.id,
        },
      });

      const startDate = new Date(googleEvent.start.dateTime);
      const endDate = new Date(googleEvent.end.dateTime);

      // Extrair informações do cliente das extendedProperties
      const clientName = googleEvent.extendedProperties?.private?.clientName || 
                        googleEvent.summary || 'Cliente';
      const clientPhone = googleEvent.extendedProperties?.private?.clientPhone || '';

      if (existingAppointment) {
        // Atualizar evento existente
        await prisma.appointment.update({
          where: { id: existingAppointment.id },
          data: {
            title: googleEvent.summary || 'Agendamento',
            start: startDate,
            end: endDate,
            description: googleEvent.description || null,
            clientName,
            clientPhone,
          },
        });
      } else {
        // Criar novo evento
        await prisma.appointment.create({
          data: {
            title: googleEvent.summary || 'Agendamento',
            start: startDate,
            end: endDate,
            description: googleEvent.description || null,
            clientName,
            clientPhone,
            googleEventId: googleEvent.id,
            professionalId,
            salonId: (await prisma.professional.findUnique({
              where: { id: professionalId },
            }))!.salonId,
            status: 'CONFIRMED',
          },
        });
      }
    }
  }

  /**
   * Desconecta Google Calendar do profissional
   */
  async disconnect(professionalId: string) {
    await prisma.professional.update({
      where: { id: professionalId },
      data: {
        googleRefreshToken: null,
        googleEmail: null,
        googleCalendarId: null,
        calendarConnected: false,
      },
    });
  }

  /**
   * Verifica status da conexão
   */
  async checkConnectionStatus(professionalId: string): Promise<boolean> {
    try {
      const professional = await prisma.professional.findUnique({
        where: { id: professionalId },
      });

      if (!professional?.googleRefreshToken || !professional.calendarConnected) {
        return false;
      }

      // Tentar obter acesso para verificar se token ainda é válido
      await this.getAuthenticatedClient(professionalId);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new GoogleCalendarService();
```

---

## 🛣️ Rotas da API

```typescript
// src/routes/calendar.routes.ts
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import googleCalendarService from '../services/googleCalendar.service';
import prisma from '../config/database';

const router = Router();

/**
 * GET /api/calendar/auth-url/:professionalId
 * Gera URL de autorização OAuth
 */
router.get(
  '/auth-url/:professionalId',
  authMiddleware,
  async (req, res) => {
    try {
      const { professionalId } = req.params;
      const userId = (req as any).userId;

      // Verificar se profissional pertence ao usuário
      const professional = await prisma.professional.findFirst({
        where: {
          id: professionalId,
          ownerId: userId,
        },
      });

      if (!professional) {
        return res.status(404).json({ error: 'Profissional não encontrado' });
      }

      const authUrl = googleCalendarService.getAuthUrl(professionalId);
      res.json({ authUrl });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao gerar URL de autorização' });
    }
  }
);

/**
 * GET /api/calendar/callback
 * Processa callback do OAuth
 */
router.get('/callback', async (req, res) => {
  try {
    const { code, state: professionalId } = req.query;

    if (!code || !professionalId) {
      return res.status(400).json({ error: 'Código ou state não fornecido' });
    }

    const result = await googleCalendarService.handleCallback(
      code as string,
      professionalId as string
    );

    // Redirecionar para frontend com sucesso
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/connections?calendar_connected=true&email=${result.email}`);
  } catch (error: any) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/connections?calendar_error=${encodeURIComponent(error.message)}`);
  }
});

/**
 * GET /api/calendar/status/:professionalId
 * Verifica status da conexão
 */
router.get(
  '/status/:professionalId',
  authMiddleware,
  async (req, res) => {
    try {
      const { professionalId } = req.params;
      const userId = (req as any).userId;

      const professional = await prisma.professional.findFirst({
        where: {
          id: professionalId,
          ownerId: userId,
        },
      });

      if (!professional) {
        return res.status(404).json({ error: 'Profissional não encontrado' });
      }

      const isConnected = await googleCalendarService.checkConnectionStatus(professionalId);

      res.json({
        connected: isConnected,
        email: professional.googleEmail,
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao verificar status' });
    }
  }
);

/**
 * POST /api/calendar/disconnect/:professionalId
 * Desconecta Google Calendar
 */
router.post(
  '/disconnect/:professionalId',
  authMiddleware,
  async (req, res) => {
    try {
      const { professionalId } = req.params;
      const userId = (req as any).userId;

      const professional = await prisma.professional.findFirst({
        where: {
          id: professionalId,
          ownerId: userId,
        },
      });

      if (!professional) {
        return res.status(404).json({ error: 'Profissional não encontrado' });
      }

      await googleCalendarService.disconnect(professionalId);

      res.json({ message: 'Google Calendar desconectado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao desconectar' });
    }
  }
);

/**
 * GET /api/calendar/events/:professionalId
 * Lista eventos do Google Calendar
 */
router.get(
  '/events/:professionalId',
  authMiddleware,
  async (req, res) => {
    try {
      const { professionalId } = req.params;
      const { start, end } = req.query;
      const userId = (req as any).userId;

      const professional = await prisma.professional.findFirst({
        where: {
          id: professionalId,
          ownerId: userId,
        },
      });

      if (!professional) {
        return res.status(404).json({ error: 'Profissional não encontrado' });
      }

      const timeMin = start ? new Date(start as string) : new Date();
      const timeMax = end ? new Date(end as string) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // +30 dias

      const events = await googleCalendarService.listEvents(professionalId, timeMin, timeMax);

      res.json({ events });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Erro ao listar eventos' });
    }
  }
);

/**
 * POST /api/calendar/sync/:professionalId
 * Sincroniza eventos do Google Calendar para o banco
 */
router.post(
  '/sync/:professionalId',
  authMiddleware,
  async (req, res) => {
    try {
      const { professionalId } = req.params;
      const { start, end } = req.body;
      const userId = (req as any).userId;

      const professional = await prisma.professional.findFirst({
        where: {
          id: professionalId,
          ownerId: userId,
        },
      });

      if (!professional) {
        return res.status(404).json({ error: 'Profissional não encontrado' });
      }

      const timeMin = start ? new Date(start) : new Date();
      const timeMax = end ? new Date(end) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      await googleCalendarService.syncEventsToDatabase(professionalId, timeMin, timeMax);

      res.json({ message: 'Sincronização concluída' });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Erro ao sincronizar' });
    }
  }
);

export default router;
```

---

## 🔄 Sincronização Bidirecional

### Quando Criar/Atualizar no Google Calendar

```typescript
// src/services/appointment.service.ts
import googleCalendarService from './googleCalendar.service';
import prisma from '../config/database';

export class AppointmentService {
  async createAppointment(data: {
    title: string;
    start: Date;
    end: Date;
    professionalId: string;
    salonId: string;
    // ... outros campos
  }) {
    // Criar no banco
    const appointment = await prisma.appointment.create({
      data,
    });

    // Se profissional tem Google Calendar conectado, criar lá também
    const professional = await prisma.professional.findUnique({
      where: { id: data.professionalId },
    });

    if (professional?.calendarConnected && professional.googleRefreshToken) {
      try {
        const googleEventId = await googleCalendarService.createEvent(
          data.professionalId,
          {
            title: data.title,
            start: data.start,
            end: data.end,
            description: data.description,
            clientName: data.clientName,
            clientPhone: data.clientPhone,
          }
        );

        // Atualizar appointment com googleEventId
        await prisma.appointment.update({
          where: { id: appointment.id },
          data: { googleEventId },
        });
      } catch (error) {
        // Log erro mas não falha a criação do appointment
        console.error('Erro ao criar evento no Google Calendar:', error);
      }
    }

    return appointment;
  }

  async updateAppointment(appointmentId: string, data: Partial<Appointment>) {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { professional: true },
    });

    if (!appointment) {
      throw new Error('Appointment não encontrado');
    }

    // Atualizar no banco
    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data,
    });

    // Se tem googleEventId e profissional está conectado, atualizar no Google Calendar
    if (
      appointment.googleEventId &&
      appointment.professional?.calendarConnected &&
      appointment.professional.googleRefreshToken
    ) {
      try {
        await googleCalendarService.updateEvent(
          appointment.professionalId!,
          appointment.googleEventId,
          {
            title: data.title,
            start: data.start,
            end: data.end,
            description: data.description,
          }
        );
      } catch (error) {
        console.error('Erro ao atualizar evento no Google Calendar:', error);
      }
    }

    return updated;
  }

  async deleteAppointment(appointmentId: string) {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { professional: true },
    });

    if (!appointment) {
      throw new Error('Appointment não encontrado');
    }

    // Se tem googleEventId e profissional está conectado, deletar do Google Calendar
    if (
      appointment.googleEventId &&
      appointment.professional?.calendarConnected &&
      appointment.professional.googleRefreshToken
    ) {
      try {
        await googleCalendarService.deleteEvent(
          appointment.professionalId!,
          appointment.googleEventId
        );
      } catch (error) {
        console.error('Erro ao deletar evento no Google Calendar:', error);
      }
    }

    // Deletar do banco
    await prisma.appointment.delete({
      where: { id: appointmentId },
    });
  }
}
```

---

## 🔔 Webhooks (Push Notifications)

### Configurar Webhook no Google Calendar

```typescript
// src/services/googleCalendarWebhook.service.ts
import { google } from 'googleapis';
import prisma from '../config/database';
import googleCalendarService from './googleCalendar.service';

export class GoogleCalendarWebhookService {
  /**
   * Registra webhook para um calendário
   */
  async registerWebhook(professionalId: string, webhookUrl: string) {
    const auth = await googleCalendarService.getAuthenticatedClient(professionalId);
    const calendar = google.calendar({ version: 'v3', auth });

    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
    });

    const calendarId = professional?.googleCalendarId || 'primary';

    // Criar canal de notificação
    const response = await calendar.events.watch({
      calendarId,
      requestBody: {
        id: `professional-${professionalId}-${Date.now()}`,
        type: 'web_hook',
        address: webhookUrl,
      },
    });

    // Salvar channel ID para poder parar depois
    await prisma.professional.update({
      where: { id: professionalId },
      data: {
        googleChannelId: response.data.id || null,
        googleResourceId: response.data.resourceId || null,
      },
    });

    return response.data;
  }

  /**
   * Para webhook
   */
  async stopWebhook(professionalId: string) {
    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
    });

    if (!professional?.googleChannelId || !professional.googleResourceId) {
      return;
    }

    const auth = await googleCalendarService.getAuthenticatedClient(professionalId);
    const calendar = google.calendar({ version: 'v3', auth });

    await calendar.channels.stop({
      requestBody: {
        id: professional.googleChannelId,
        resourceId: professional.googleResourceId,
      },
    });

    await prisma.professional.update({
      where: { id: professionalId },
      data: {
        googleChannelId: null,
        googleResourceId: null,
      },
    });
  }

  /**
   * Processa notificação do webhook
   */
  async handleWebhookNotification(professionalId: string) {
    // Quando receber notificação, sincronizar eventos
    const timeMin = new Date();
    const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await googleCalendarService.syncEventsToDatabase(professionalId, timeMin, timeMax);
  }
}
```

### Endpoint para Receber Webhooks

```typescript
// src/routes/webhooks.routes.ts
import { Router } from 'express';
import prisma from '../config/database';
import { GoogleCalendarWebhookService } from '../services/googleCalendarWebhook.service';

const router = Router();
const webhookService = new GoogleCalendarWebhookService();

/**
 * POST /api/webhooks/calendar
 * Recebe notificações do Google Calendar
 */
router.post('/calendar', async (req, res) => {
  try {
    const { headers, body } = req;

    // Verificar header X-Goog-Channel-ID
    const channelId = headers['x-goog-channel-id'] as string;
    const resourceId = headers['x-goog-resource-id'] as string;

    if (!channelId || !resourceId) {
      return res.status(400).json({ error: 'Headers inválidos' });
    }

    // Encontrar profissional pelo channel ID
    const professional = await prisma.professional.findFirst({
      where: {
        googleChannelId: channelId,
        googleResourceId: resourceId,
      },
    });

    if (!professional) {
      return res.status(404).json({ error: 'Profissional não encontrado' });
    }

    // Sincronizar eventos
    await webhookService.handleWebhookNotification(professional.id);

    // Responder 200 OK para Google
    res.status(200).send('OK');
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
});

export default router;
```

---

## 🔐 Segurança

### Criptografia de Tokens

```typescript
// src/utils/encryption.util.ts
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!; // 32 bytes
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(encryptedText: string): string {
  const parts = encryptedText.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = parts[1];
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
```

### Gerar Encryption Key

```bash
# Gerar chave de 32 bytes (256 bits)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Adicionar ao `.env`:
```
ENCRYPTION_KEY=<chave_gerada>
```

---

## 📝 Variáveis de Ambiente

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3001/api/calendar/callback

# Google Calendar
GOOGLE_CALENDAR_TIMEZONE=America/Sao_Paulo
GOOGLE_CALENDAR_ID=primary

# Encryption
ENCRYPTION_KEY=<32_bytes_hex_string>

# Webhook URL (produção)
GOOGLE_WEBHOOK_URL=https://api.yourdomain.com/api/webhooks/calendar
```

---

## 🧪 Testes

### Teste Manual

1. **Conectar Google Calendar:**
   ```
   GET /api/calendar/auth-url/:professionalId
   → Abrir URL retornada no navegador
   → Autorizar acesso
   → Verificar callback
   ```

2. **Verificar Status:**
   ```
   GET /api/calendar/status/:professionalId
   → Deve retornar { connected: true, email: "..." }
   ```

3. **Criar Evento:**
   ```
   POST /api/appointments
   → Verificar se aparece no Google Calendar
   ```

4. **Sincronizar:**
   ```
   POST /api/calendar/sync/:professionalId
   → Verificar se eventos do Google aparecem no sistema
   ```

---

## 🐛 Troubleshooting

### Problema: Refresh Token não recebido

**Solução**: Adicionar `prompt: 'consent'` no `generateAuthUrl()` para forçar tela de consentimento.

### Problema: Token expirado

**Solução**: Implementar renovação automática usando refresh_token.

### Problema: Webhook não funciona

**Solução**: 
- Verificar se URL é acessível publicamente (usar ngrok em dev)
- Verificar se está respondendo 200 OK
- Verificar headers X-Goog-Channel-ID e X-Goog-Resource-ID

### Problema: Rate Limits

**Solução**: 
- Implementar cache
- Usar batch requests quando possível
- Respeitar limites da API (1 milhão de requests/dia)

---

## 📚 Recursos

- [Google Calendar API Docs](https://developers.google.com/calendar/api/v3/reference)
- [OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Push Notifications](https://developers.google.com/calendar/api/v3/push)
- [Rate Limits](https://developers.google.com/calendar/api/guides/limits)

---

**Última atualização**: Janeiro 2025  
**Versão**: 1.0.0


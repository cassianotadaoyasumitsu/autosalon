# Guia de Migração para Produção

Este documento detalha todas as atualizações necessárias para transformar a aplicação Perfect Salon de um protótipo frontend-only para uma aplicação completa em produção.

## 📋 Índice

1. [Backend/API](#backendapi)
2. [Autenticação](#autenticação)
3. [Banco de Dados](#banco-de-dados)
4. [Integrações Externas](#integrações-externas)
5. [Segurança](#segurança)
6. [Variáveis de Ambiente](#variáveis-de-ambiente)
7. [Deploy](#deploy)
8. [Monitoramento e Logging](#monitoramento-e-logging)
9. [Performance](#performance)
10. [Checklist de Migração](#checklist-de-migração)

---

## 🔧 Backend/API

### Arquitetura Recomendada

A aplicação atual é apenas frontend. É necessário criar um backend completo com API REST ou GraphQL.

### Opções de Stack Backend

**Opção 1: Node.js/Express (Recomendado para começar rápido)**
- Express.js ou Fastify
- TypeScript
- Prisma ou TypeORM para ORM
- PostgreSQL ou MongoDB

**Opção 2: Python/FastAPI**
- FastAPI
- SQLAlchemy
- PostgreSQL

**Opção 3: Serverless (AWS Lambda, Vercel Functions)**
- Vercel Serverless Functions
- AWS Lambda + API Gateway
- Supabase (Backend-as-a-Service)

### Estrutura de API Necessária

```
/api
  /auth
    POST   /signup          # Criar conta
    POST   /login           # Login com email/senha
    POST   /login/google    # Login com Google OAuth
    POST   /logout          # Logout
    POST   /refresh         # Refresh token
    GET    /me              # Obter dados do usuário atual
  
  /users
    GET    /                # Listar usuários (admin)
    GET    /:id             # Obter usuário específico
    PUT    /:id             # Atualizar usuário
    DELETE /:id             # Deletar usuário
  
  /professionals
    GET    /                # Listar profissionais
    GET    /:id             # Obter profissional específico
    POST   /                # Criar profissional
    PUT    /:id             # Atualizar profissional
    DELETE /:id             # Deletar profissional
    POST   /:id/invite      # Enviar convite para profissional
  
  /services
    GET    /                # Listar serviços
    GET    /:id             # Obter serviço específico
    POST   /                # Criar serviço
    PUT    /:id             # Atualizar serviço
    DELETE /:id             # Deletar serviço
  
  /connections
    GET    /whatsapp        # Status conexão WhatsApp
    POST   /whatsapp/connect # Conectar WhatsApp
    GET    /calendar        # Status conexão Google Calendar
    POST   /calendar/connect # Conectar Google Calendar
  
  /appointments
    GET    /                # Listar agendamentos
    GET    /:id             # Obter agendamento específico
    POST   /                # Criar agendamento
    PUT    /:id             # Atualizar agendamento
    DELETE /:id             # Cancelar agendamento
  
  /reviews
    GET    /                # Listar avaliações
    GET    /:id             # Obter avaliação específica
    POST   /                # Criar avaliação
    PUT    /:id             # Atualizar avaliação
  
  /notifications
    GET    /                # Listar notificações
    PUT    /:id/read        # Marcar como lida
    DELETE /:id             # Deletar notificação
  
  /dashboard
    GET    /stats           # Estatísticas do dashboard
    GET    /analytics       # Dados analíticos
```

### Atualizações no Frontend

**Criar serviço de API:**

```typescript
// services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = sessionStorage.getItem('ps_auth_token');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(email: string, password: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // ... outros métodos
}

export const apiService = new ApiService();
```

**Atualizar AuthContext para usar API real:**

```typescript
// Substituir localStorage por chamadas de API
const login = async (email: string, password: string): Promise<void> => {
  const response = await apiService.login(email, password);
  sessionStorage.setItem('ps_auth_token', response.token);
  sessionStorage.setItem('ps_user_data', JSON.stringify(response.user));
  setUser(response.user);
};
```

---

## 🔐 Autenticação

### Implementação Real

**1. JWT (JSON Web Tokens)**
- Access Token (curta duração: 15-30 min)
- Refresh Token (longa duração: 7-30 dias)
- Armazenar refresh token em httpOnly cookie

**2. Google OAuth 2.0**
- Configurar Google Cloud Console
- Obter Client ID e Client Secret
- Implementar fluxo OAuth completo no backend
- Validar token do Google no backend

**3. Hash de Senhas**
- Usar bcrypt ou argon2
- Nunca armazenar senhas em texto plano
- Salt único por usuário

**4. Rate Limiting**
- Limitar tentativas de login (ex: 5 por IP/15min)
- Proteger endpoints de autenticação

### Atualizações Necessárias

**Backend:**
```typescript
// Exemplo de middleware de autenticação
export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};
```

**Frontend - Atualizar LoginPage.tsx:**
```typescript
// Substituir mock do Google por integração real
const handleGoogleLogin = async () => {
  // Redirecionar para endpoint OAuth do backend
  window.location.href = `${API_BASE_URL}/auth/google`;
  // Backend redireciona para Google, depois volta com token
};
```

---

## 🗄️ Banco de Dados

### Schema de Banco de Dados

**PostgreSQL (Recomendado) ou MongoDB**

```sql
-- Tabela de Usuários
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255), -- NULL se autenticação apenas Google
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('OWNER', 'PROFESSIONAL')),
  auth_provider VARCHAR(50) NOT NULL CHECK (auth_provider IN ('email', 'google')),
  google_id VARCHAR(255) UNIQUE,
  picture_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Profissionais
CREATE TABLE professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(255),
  photo_url TEXT,
  email VARCHAR(255) NOT NULL,
  invite_token VARCHAR(255) UNIQUE,
  google_calendar_id VARCHAR(255),
  google_refresh_token TEXT, -- Criptografado
  status VARCHAR(50) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE', 'PENDING_SETUP')),
  calendar_connected BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Serviços
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  professional_ids UUID[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Agendamentos
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID REFERENCES users(id) ON DELETE CASCADE,
  professional_id UUID REFERENCES professionals(id) ON DELETE SET NULL,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  client_name VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50) NOT NULL,
  client_email VARCHAR(255),
  scheduled_at TIMESTAMP NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Avaliações
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  client_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Notificações
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Conexões (WhatsApp, Calendar)
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('WHATSAPP', 'GOOGLE_CALENDAR')),
  status VARCHAR(50) NOT NULL CHECK (status IN ('CONNECTED', 'DISCONNECTED', 'PENDING')),
  config JSONB, -- Armazenar configurações específicas
  credentials_encrypted TEXT, -- Credenciais criptografadas
  last_sync_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_professionals_user_id ON professionals(user_id);
CREATE INDEX idx_appointments_salon_id ON appointments(salon_id);
CREATE INDEX idx_appointments_professional_id ON appointments(professional_id);
CREATE INDEX idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
```

### Migrações

Usar ferramentas de migração:
- **Prisma Migrate** (se usar Prisma)
- **TypeORM Migrations** (se usar TypeORM)
- **Knex Migrations** (se usar Knex)

---

## 🔌 Integrações Externas

### 1. WhatsApp Business API

**Opções:**
- **WhatsApp Business API oficial** (Meta)
- **Evolution API** (alternativa open-source)
- **Twilio WhatsApp API**
- **Baileys** (biblioteca Node.js)

**Implementação:**

```typescript
// Backend: services/whatsapp.service.ts
export class WhatsAppService {
  async sendMessage(to: string, message: string) {
    // Implementar envio via API do WhatsApp
  }

  async sendAppointmentConfirmation(appointment: Appointment) {
    // Enviar confirmação de agendamento
  }
}
```

**Variáveis de Ambiente:**
```env
WHATSAPP_API_URL=https://api.whatsapp.com
WHATSAPP_API_KEY=your_api_key
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
```

### 2. Google Calendar API

**Implementação:**

```typescript
// Backend: services/calendar.service.ts
import { google } from 'googleapis';

export class CalendarService {
  async createEvent(professionalId: string, appointment: Appointment) {
    const oauth2Client = await this.getOAuth2Client(professionalId);
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    return calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: appointment.serviceName,
        start: { dateTime: appointment.scheduledAt },
        end: { dateTime: appointment.endTime },
      },
    });
  }
}
```

**Variáveis de Ambiente:**
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://yourdomain.com/auth/google/callback
```

### 3. Gemini API (IA)

**Implementação:**

```typescript
// Backend: services/gemini.service.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }

  async generateResponse(prompt: string) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }
}
```

**Variáveis de Ambiente:**
```env
GEMINI_API_KEY=your_gemini_api_key
```

---

## 🔒 Segurança

### Checklist de Segurança

**1. HTTPS Obrigatório**
- Certificado SSL/TLS em produção
- Redirecionar HTTP para HTTPS
- HSTS headers

**2. CORS Configurado**
```typescript
// Backend
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));
```

**3. Validação de Input**
- Validar todos os inputs no backend
- Usar bibliotecas como Joi, Zod, ou class-validator
- Sanitizar dados de entrada

**4. Proteção contra SQL Injection**
- Usar ORM/Query Builder (Prisma, TypeORM)
- Nunca concatenar strings em queries SQL

**5. Rate Limiting**
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});
```

**6. Helmet.js para Headers de Segurança**
```typescript
import helmet from 'helmet';
app.use(helmet());
```

**7. Variáveis Sensíveis**
- Nunca commitar `.env` no git
- Usar gerenciadores de secrets (AWS Secrets Manager, Vault)
- Rotacionar chaves regularmente

**8. Logs Seguros**
- Não logar senhas, tokens, ou dados sensíveis
- Usar log levels apropriados

**9. Autenticação de Dois Fatores (2FA)**
- Implementar 2FA opcional para contas importantes
- Usar TOTP (Google Authenticator, Authy)

**10. Backup e Recuperação**
- Backups automáticos do banco de dados
- Testar restauração de backups regularmente
- Backup em múltiplas localizações

---

## 🌍 Variáveis de Ambiente

### Frontend (.env.production)

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_ENVIRONMENT=production
```

### Backend (.env)

```env
# Servidor
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com

# Banco de Dados
DATABASE_URL=postgresql://user:password@localhost:5432/perfectsalon
DATABASE_SSL=true

# Autenticação
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://api.yourdomain.com/auth/google/callback

# WhatsApp
WHATSAPP_API_URL=https://api.whatsapp.com
WHATSAPP_API_KEY=your_whatsapp_api_key
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Email (para notificações)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=noreply@yourdomain.com

# Redis (para cache e sessões)
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=info
SENTRY_DSN=your_sentry_dsn (opcional)
```

---

## 🚀 Deploy

### Frontend

**Opção 1: Vercel (Recomendado)**
```bash
npm install -g vercel
vercel --prod
```

**Opção 2: Netlify**
```bash
npm run build
# Fazer upload da pasta dist/
```

**Opção 3: AWS S3 + CloudFront**
```bash
aws s3 sync dist/ s3://your-bucket-name
```

**Opção 4: Docker**
```dockerfile
# Dockerfile.frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Backend

**Opção 1: Railway / Render**
- Conectar repositório Git
- Configurar variáveis de ambiente
- Deploy automático

**Opção 2: AWS EC2 / DigitalOcean**
```bash
# Instalar Node.js, PM2
npm install -g pm2
pm2 start server.js --name perfect-salon-api
pm2 save
pm2 startup
```

**Opção 3: Docker**
```dockerfile
# Dockerfile.backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "dist/server.js"]
```

**Opção 4: Serverless (AWS Lambda)**
- Usar Serverless Framework ou AWS SAM
- Configurar API Gateway

### Banco de Dados

**Opções:**
- **PostgreSQL**: AWS RDS, DigitalOcean Managed Database, Supabase, Neon
- **MongoDB**: MongoDB Atlas
- **PlanetScale** (MySQL compatível)

---

## 📊 Monitoramento e Logging

### Ferramentas Recomendadas

**1. Logging**
- **Winston** ou **Pino** (Node.js)
- **Sentry** (erros e exceções)
- **LogRocket** (sessões de usuário)

**2. Monitoramento**
- **New Relic**
- **Datadog**
- **Grafana + Prometheus**

**3. Analytics**
- **Google Analytics**
- **Mixpanel**
- **Amplitude**

### Implementação Básica

```typescript
// Backend: middleware/logging.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

---

## ⚡ Performance

### Otimizações Frontend

**1. Code Splitting**
```typescript
// App.tsx - Lazy loading de rotas
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Professionals = lazy(() => import('./pages/Professionals'));
```

**2. Image Optimization**
- Usar formato WebP
- Lazy loading de imagens
- CDN para assets estáticos

**3. Bundle Size**
- Analisar bundle com `npm run build -- --analyze`
- Remover dependências não utilizadas
- Tree shaking

**4. Caching**
- Service Workers (PWA)
- Cache headers apropriados
- CDN caching

### Otimizações Backend

**1. Database Indexing**
- Criar índices nas colunas frequentemente consultadas
- Analisar queries lentas

**2. Caching**
- Redis para cache de dados frequentes
- Cache de queries pesadas

**3. Paginação**
- Implementar paginação em todas as listagens
- Limitar resultados por página

**4. Connection Pooling**
- Configurar pool de conexões do banco de dados

---

## ✅ Checklist de Migração

### Fase 1: Preparação
- [ ] Escolher stack de backend
- [ ] Configurar repositório Git separado para backend
- [ ] Configurar ambiente de desenvolvimento local
- [ ] Escolher provedor de banco de dados
- [ ] Configurar domínio e SSL

### Fase 2: Backend Básico
- [ ] Criar estrutura de projeto backend
- [ ] Configurar banco de dados
- [ ] Criar schema e migrações
- [ ] Implementar autenticação (JWT)
- [ ] Implementar Google OAuth
- [ ] Criar endpoints básicos de CRUD

### Fase 3: Integrações
- [ ] Integrar WhatsApp Business API
- [ ] Integrar Google Calendar API
- [ ] Integrar Gemini API
- [ ] Configurar envio de emails

### Fase 4: Frontend
- [ ] Criar serviço de API no frontend
- [ ] Atualizar AuthContext para usar API real
- [ ] Substituir todos os mocks por chamadas de API
- [ ] Implementar tratamento de erros global
- [ ] Adicionar loading states

### Fase 5: Segurança
- [ ] Implementar HTTPS
- [ ] Configurar CORS
- [ ] Adicionar rate limiting
- [ ] Validar todos os inputs
- [ ] Implementar 2FA (opcional)
- [ ] Configurar headers de segurança

### Fase 6: Deploy
- [ ] Configurar CI/CD
- [ ] Deploy do frontend
- [ ] Deploy do backend
- [ ] Configurar banco de dados em produção
- [ ] Configurar variáveis de ambiente

### Fase 7: Monitoramento
- [ ] Configurar logging
- [ ] Configurar monitoramento de erros
- [ ] Configurar analytics
- [ ] Configurar alertas

### Fase 8: Testes
- [ ] Testes unitários (backend)
- [ ] Testes de integração
- [ ] Testes end-to-end
- [ ] Testes de carga
- [ ] Testes de segurança

### Fase 9: Documentação
- [ ] Documentar API (Swagger/OpenAPI)
- [ ] Documentar processo de deploy
- [ ] Documentar troubleshooting
- [ ] Criar guia para desenvolvedores

### Fase 10: Go-Live
- [ ] Backup do banco de dados
- [ ] Deploy em produção
- [ ] Verificar funcionalidades críticas
- [ ] Monitorar logs e erros
- [ ] Comunicar usuários sobre mudanças

---

## 📚 Recursos Adicionais

### Documentação Útil
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PostgreSQL Performance](https://www.postgresql.org/docs/current/performance-tips.html)
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Google Calendar API](https://developers.google.com/calendar)

### Ferramentas Recomendadas
- **Postman** ou **Insomnia** - Testar APIs
- **DBeaver** - Gerenciar banco de dados
- **Redis Commander** - Gerenciar Redis
- **Docker Desktop** - Containers locais

---

## 🎯 Próximos Passos

1. **Começar pelo Backend Básico**: Implementar autenticação e CRUD básico
2. **Migrar Dados**: Se houver dados mock, criar script de migração
3. **Testar Localmente**: Garantir que tudo funciona antes de deploy
4. **Deploy Incremental**: Começar com ambiente de staging
5. **Monitorar e Iterar**: Acompanhar métricas e melhorar continuamente

---

**Última atualização**: Janeiro 2025
**Versão**: 1.0.0


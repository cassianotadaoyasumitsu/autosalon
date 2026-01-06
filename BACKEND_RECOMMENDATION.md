# Recomendação de Backend - Perfect Salon

## 🎯 Recomendação Principal

**Stack: Node.js/Bun + TypeScript + Prisma + PostgreSQL**

### Por que esta stack?

- ✅ **Mesma linguagem do frontend** (TypeScript) - facilita manutenção e compartilhamento de tipos
- ✅ **Ecossistema maduro** - ampla comunidade e documentação
- ✅ **Performance** - Node.js/Bun são excelentes para I/O assíncrono (APIs, integrações)
- ✅ **Escalabilidade** - fácil escalar horizontalmente
- ✅ **Type Safety** - TypeScript garante menos erros em runtime
- ✅ **Prisma** - ORM moderno com excelente DX (Developer Experience)
- ✅ **PostgreSQL** - Banco relacional robusto e confiável
- ⚡ **Bun (opcional)** - Runtime ultra-rápido com suporte nativo a TypeScript

---

## 📦 Stack Completa Recomendada

### Core
```
Node.js 20+ (LTS) OU Bun (latest)
TypeScript 5+
Express.js ou Fastify (API REST)
Prisma (ORM - altamente recomendado)
PostgreSQL 15+ (banco de dados)
```

### Escolhendo entre Node.js e Bun

**Node.js** (Recomendado para produção):
- ✅ Ecossistema mais maduro e estável
- ✅ Maior compatibilidade com bibliotecas
- ✅ Melhor suporte em plataformas de deploy
- ✅ Comunidade maior e mais documentação

**Bun** (Recomendado para desenvolvimento):
- ⚡ Performance superior (até 3x mais rápido)
- ⚡ Instalação de pacotes muito mais rápida
- ⚡ Suporte nativo a TypeScript (sem transpilação)
- ⚡ Bundler e test runner integrados
- ⚡ Compatível com a maioria dos pacotes npm

**Recomendação**: Use **Bun para desenvolvimento** (mais rápido) e **Node.js para produção** (mais estável), ou use Bun em ambos se preferir máxima performance.

### Bibliotecas Essenciais

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "typescript": "^5.3.3",
    "@prisma/client": "^5.7.0",
    "prisma": "^5.7.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.22.4",
    "googleapis": "^128.0.0",
    "@google/generative-ai": "^0.2.1",
    "express-rate-limit": "^7.1.5",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.1",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.5",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "ts-node": "^10.9.2",
    "tsx": "^4.7.0",
    "nodemon": "^3.0.2"
  },
  "scripts": {
    "dev": "nodemon --exec tsx src/index.ts",
    "dev:bun": "bun --watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "start:bun": "bun dist/index.js"
  }
}
```

---

## 📁 Estrutura de Pastas Sugerida

```
backend/
├── src/
│   ├── config/          # Configurações (DB, env)
│   │   ├── database.ts
│   │   └── env.ts
│   ├── controllers/     # Lógica de negócio
│   │   ├── auth.controller.ts
│   │   ├── professionals.controller.ts
│   │   ├── appointments.controller.ts
│   │   └── dashboard.controller.ts
│   ├── services/        # Serviços (Google, WhatsApp, etc)
│   │   ├── googleCalendar.service.ts
│   │   ├── whatsapp.service.ts
│   │   ├── gemini.service.ts
│   │   └── email.service.ts
│   ├── models/          # Modelos Prisma (gerados automaticamente)
│   ├── routes/          # Rotas da API
│   │   ├── auth.routes.ts
│   │   ├── professionals.routes.ts
│   │   └── index.ts
│   ├── middleware/      # Auth, validation, error handling
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── utils/           # Funções auxiliares
│   │   ├── jwt.util.ts
│   │   └── logger.util.ts
│   └── types/           # TypeScript types
│       └── index.ts
├── prisma/
│   ├── schema.prisma    # Schema do banco
│   └── migrations/      # Migrações (geradas automaticamente)
├── tests/               # Testes
│   ├── unit/
│   └── integration/
├── .env.example
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── nodemon.json
└── README.md
```

---

## 🗄️ Schema do Banco de Dados (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  OWNER
  ADMIN
  PROFESSIONAL
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

enum ProfessionalStatus {
  ACTIVE
  INACTIVE
  PENDING_SETUP
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  password      String?  // nullable para Google OAuth
  name          String
  role          Role     @default(OWNER)
  googleId      String?  @unique
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  salon         Salon?
  professionals Professional[]
  
  @@map("users")
}

model Salon {
  id              String   @id @default(cuid())
  name            String
  ownerId         String   @unique
  owner           User     @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  
  professionals   Professional[]
  services        Service[]
  appointments    Appointment[]
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@map("salons")
}

model Professional {
  id                String   @id @default(cuid())
  name              String
  email             String
  specialty         String
  photoUrl          String?
  status            ProfessionalStatus @default(PENDING_SETUP)
  googleCalendarId  String?
  googleRefreshToken String? // Encrypted - nunca expor ao frontend
  
  salonId           String
  salon             Salon     @relation(fields: [salonId], references: [id], onDelete: Cascade)
  ownerId           String
  owner             User       @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  
  appointments      Appointment[]
  reviews           Review[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@unique([salonId, email])
  @@map("professionals")
}

model Service {
  id            String   @id @default(cuid())
  name          String
  description   String?
  price         Float
  duration      Int      // em minutos
  salonId       String
  salon         Salon     @relation(fields: [salonId], references: [id], onDelete: Cascade)
  
  appointments  Appointment[]
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@map("services")
}

model Appointment {
  id            String   @id @default(cuid())
  title         String
  start         DateTime
  end           DateTime
  description   String?
  clientName    String
  clientPhone   String
  status        AppointmentStatus @default(CONFIRMED)
  googleEventId String?  @unique
  
  salonId       String
  salon         Salon     @relation(fields: [salonId], references: [id], onDelete: Cascade)
  professionalId String?
  professional  Professional? @relation(fields: [professionalId], references: [id], onDelete: SetNull)
  serviceId     String?
  service       Service?  @relation(fields: [serviceId], references: [id], onDelete: SetNull)
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([salonId, start])
  @@index([professionalId, start])
  @@map("appointments")
}

model Review {
  id            String   @id @default(cuid())
  rating        Int      // 1-5
  comment       String?
  clientName    String
  
  professionalId String
  professional  Professional @relation(fields: [professionalId], references: [id], onDelete: Cascade)
  
  createdAt     DateTime @default(now())
  
  @@index([professionalId])
  @@map("reviews")
}

model Connection {
  id            String   @id @default(cuid())
  type          String   // 'whatsapp' | 'google_calendar'
  status        String   // 'connected' | 'disconnected'
  config        Json     // Configurações específicas (tokens, IDs, etc)
  
  salonId       String
  salon         Salon     @relation(fields: [salonId], references: [id], onDelete: Cascade)
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@unique([salonId, type])
  @@map("connections")
}
```

---

## 🚀 Endpoints Prioritários (Ordem de Implementação)

### Fase 1: Autenticação (Semana 1) 🔐

```
POST   /api/auth/signup          # Criar conta
POST   /api/auth/login           # Login com email/senha
POST   /api/auth/google          # Login com Google OAuth
POST   /api/auth/refresh         # Refresh token
POST   /api/auth/logout          # Logout
GET    /api/auth/me              # Obter dados do usuário atual
```

### Fase 2: CRUD Básico (Semana 2) 📝

```
# Professionals
GET    /api/professionals        # Listar profissionais
GET    /api/professionals/:id    # Obter profissional específico
POST   /api/professionals        # Criar profissional
PUT    /api/professionals/:id    # Atualizar profissional
DELETE /api/professionals/:id    # Deletar profissional
POST   /api/professionals/:id/invite  # Enviar convite

# Services
GET    /api/services              # Listar serviços
GET    /api/services/:id         # Obter serviço específico
POST   /api/services             # Criar serviço
PUT    /api/services/:id         # Atualizar serviço
DELETE /api/services/:id         # Deletar serviço

# Appointments
GET    /api/appointments         # Listar agendamentos (com filtros)
GET    /api/appointments/:id    # Obter agendamento específico
POST   /api/appointments         # Criar agendamento
PUT    /api/appointments/:id    # Atualizar agendamento
DELETE /api/appointments/:id     # Cancelar agendamento
```

### Fase 3: Integrações (Semana 3-4) 🔗

```
# WhatsApp
GET    /api/connections/whatsapp        # Status conexão
POST   /api/connections/whatsapp/connect  # Conectar
POST   /api/connections/whatsapp/disconnect  # Desconectar
POST   /api/whatsapp/send               # Enviar mensagem

# Google Calendar
GET    /api/connections/calendar        # Status conexão
POST   /api/connections/calendar/connect  # Conectar (OAuth)
POST   /api/connections/calendar/disconnect  # Desconectar
GET    /api/calendar/events            # Listar eventos
POST   /api/calendar/events             # Criar evento
PUT    /api/calendar/events/:id         # Atualizar evento
DELETE /api/calendar/events/:id        # Deletar evento
POST   /api/calendar/sync               # Sincronizar eventos
```

### Fase 4: Dashboard e Relatórios (Semana 5) 📊

```
GET    /api/dashboard/stats             # Estatísticas gerais
GET    /api/dashboard/analytics         # Dados analíticos
GET    /api/reports/weekly              # Relatório semanal
GET    /api/reports/monthly             # Relatório mensal
GET    /api/reports/quarterly           # Relatório trimestral
GET    /api/reports/semiannual          # Relatório semestral
GET    /api/reports/annual              # Relatório anual
```

### Fase 5: Features Adicionais (Semana 6+) ⭐

```
# Reviews
GET    /api/reviews                     # Listar avaliações
POST   /api/reviews                     # Criar avaliação
PUT    /api/reviews/:id                 # Atualizar avaliação

# Notifications
GET    /api/notifications               # Listar notificações
PUT    /api/notifications/:id/read      # Marcar como lida
DELETE /api/notifications/:id          # Deletar notificação
```

---

## 💻 Exemplo de Implementação

### 1. Configuração Inicial

```typescript
// src/config/database.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export default prisma;
```

```typescript
// src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GEMINI_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
```

### 2. Controller de Autenticação

```typescript
// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { env } from '../config/env';

export class AuthController {
  async signup(req: Request, res: Response) {
    const { email, password, name } = req.body;

    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário e salão
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'OWNER',
        salon: {
          create: {
            name: `${name}'s Salon`,
          },
        },
      },
      include: {
        salon: true,
      },
    });

    // Gerar tokens
    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ userId: user.id }, env.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
      refreshToken,
    });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { salon: true },
    });

    if (!user || !user.password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ userId: user.id }, env.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
      refreshToken,
    });
  }

  async me(req: Request, res: Response) {
    const userId = (req as any).userId; // Set by auth middleware

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { salon: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      salon: user.salon,
    });
  }
}
```

### 3. Middleware de Autenticação

```typescript
// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
```

### 4. Serviço de Google Calendar

```typescript
// src/services/googleCalendar.service.ts
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export class GoogleCalendarService {
  private getAuthClient(refreshToken: string): OAuth2Client {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    return oauth2Client;
  }

  async createEvent(
    refreshToken: string,
    event: {
      title: string;
      start: Date;
      end: Date;
      description?: string;
    }
  ) {
    const auth = this.getAuthClient(refreshToken);
    const calendar = google.calendar({ version: 'v3', auth });

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: event.title,
        description: event.description,
        start: {
          dateTime: event.start.toISOString(),
          timeZone: process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Sao_Paulo',
        },
        end: {
          dateTime: event.end.toISOString(),
          timeZone: process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Sao_Paulo',
        },
      },
    });

    return response.data;
  }

  async listEvents(refreshToken: string, timeMin: Date, timeMax: Date) {
    const auth = this.getAuthClient(refreshToken);
    const calendar = google.calendar({ version: 'v3', auth });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items || [];
  }

  async updateEvent(
    refreshToken: string,
    eventId: string,
    event: {
      title?: string;
      start?: Date;
      end?: Date;
      description?: string;
    }
  ) {
    const auth = this.getAuthClient(refreshToken);
    const calendar = google.calendar({ version: 'v3', auth });

    // Primeiro, buscar o evento atual
    const existingEvent = await calendar.events.get({
      calendarId: 'primary',
      eventId,
    });

    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId,
      requestBody: {
        ...existingEvent.data,
        summary: event.title || existingEvent.data.summary,
        description: event.description || existingEvent.data.description,
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

  async deleteEvent(refreshToken: string, eventId: string) {
    const auth = this.getAuthClient(refreshToken);
    const calendar = google.calendar({ version: 'v3', auth });

    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
    });
  }
}
```

---

## 🚀 Implementação com Bun

Bun oferece uma experiência de desenvolvimento mais rápida e simplificada. Esta seção mostra como implementar o backend usando Bun ao invés de Node.js.

### Por que usar Bun?

- ⚡ **Performance**: Até 3x mais rápido que Node.js em muitas operações
- 🚀 **Instalação rápida**: Instala pacotes até 30x mais rápido que npm
- 📦 **TypeScript nativo**: Executa TypeScript diretamente sem transpilação
- 🔥 **Hot reload**: Watch mode nativo sem necessidade de nodemon
- 🛠️ **All-in-one**: Runtime, bundler, test runner e package manager em um só

### 1. Setup Inicial com Bun

```bash
# Instalar Bun (se ainda não tiver)
curl -fsSL https://bun.sh/install | bash

# Criar estrutura do projeto
mkdir backend && cd backend
bun init

# Instalar dependências (muito mais rápido!)
bun install express @prisma/client prisma zod googleapis @google/generative-ai bcryptjs jsonwebtoken cors helmet express-rate-limit express-validator

# Instalar dependências de desenvolvimento
bun add -d @types/express @types/bcryptjs @types/jsonwebtoken @types/node typescript
```

### 2. package.json para Bun

```json
{
  "name": "perfect-salon-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "bun --watch src/index.ts",
    "build": "bun build src/index.ts --outdir dist --target bun",
    "start": "bun dist/index.js",
    "prisma:generate": "bunx prisma generate",
    "prisma:migrate": "bunx prisma migrate dev",
    "prisma:studio": "bunx prisma studio"
  },
  "dependencies": {
    "express": "^4.18.2",
    "@prisma/client": "^5.7.0",
    "prisma": "^5.7.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.22.4",
    "googleapis": "^128.0.0",
    "@google/generative-ai": "^0.2.1",
    "express-rate-limit": "^7.1.5",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/node": "^20.10.5",
    "typescript": "^5.3.3"
  }
}
```

### 3. Configuração TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. Servidor Express com Bun

```typescript
// src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/env';
import { authRoutes } from './routes/auth.routes';
import { professionalsRoutes } from './routes/professionals.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
});
app.use('/api/', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/professionals', professionalsRoutes);

// Error handler
app.use(errorHandler);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', runtime: 'bun' });
});

const PORT = config.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`⚡ Powered by Bun ${Bun.version}`);
});
```

### 5. Configuração de Ambiente com Bun

```typescript
// src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GEMINI_API_KEY: z.string(),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
});

// Bun lê .env automaticamente, mas podemos validar
export const config = envSchema.parse({
  NODE_ENV: Bun.env.NODE_ENV || 'development',
  PORT: Bun.env.PORT || '3001',
  DATABASE_URL: Bun.env.DATABASE_URL,
  JWT_SECRET: Bun.env.JWT_SECRET,
  JWT_REFRESH_SECRET: Bun.env.JWT_REFRESH_SECRET,
  GOOGLE_CLIENT_ID: Bun.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: Bun.env.GOOGLE_CLIENT_SECRET,
  GEMINI_API_KEY: Bun.env.GEMINI_API_KEY,
  FRONTEND_URL: Bun.env.FRONTEND_URL || 'http://localhost:3000',
});
```

### 6. Prisma Client com Bun

```typescript
// src/config/database.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: Bun.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
```

### 7. Controller de Autenticação (Bun)

```typescript
// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { config } from '../config/env';

export class AuthController {
  async signup(req: Request, res: Response) {
    const { email, password, name } = req.body;

    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha (Bun tem suporte nativo para crypto, mas bcryptjs funciona igual)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário e salão
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'OWNER',
        salon: {
          create: {
            name: `${name}'s Salon`,
          },
        },
      },
      include: {
        salon: true,
      },
    });

    // Gerar tokens
    const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ userId: user.id }, config.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
      refreshToken,
    });
  }

  // ... outros métodos (login, me, etc) são idênticos ao Node.js
}
```

### 8. Comandos de Desenvolvimento

```bash
# Desenvolvimento com hot reload automático
bun dev

# Ou com watch explícito
bun --watch src/index.ts

# Gerar Prisma Client
bunx prisma generate

# Criar migration
bunx prisma migrate dev --name init

# Abrir Prisma Studio
bunx prisma studio

# Build para produção
bun build src/index.ts --outdir dist --target bun --minify

# Executar produção
bun dist/index.js
```

### 9. Vantagens Específicas do Bun

#### Performance
- **Instalação**: `bun install` é até 30x mais rápido que `npm install`
- **Startup**: Aplicações iniciam mais rápido
- **I/O**: Operações de arquivo e rede são mais eficientes

#### Desenvolvimento
- **TypeScript**: Executa diretamente sem transpilação
- **Hot Reload**: Watch mode nativo, sem necessidade de nodemon
- **Testes**: Test runner integrado (não precisa de Jest/Vitest)

#### Compatibilidade
- ✅ Compatível com a maioria dos pacotes npm
- ✅ Suporta Node.js APIs (fs, path, crypto, etc)
- ✅ Funciona com Express, Prisma, e outras bibliotecas populares

### 10. Diferenças Importantes

#### Variáveis de Ambiente
```typescript
// Node.js
process.env.DATABASE_URL

// Bun
Bun.env.DATABASE_URL
// ou (compatibilidade)
process.env.DATABASE_URL // também funciona
```

#### File System
```typescript
// Bun tem APIs nativas mais rápidas
import { readFile, writeFile } from 'fs/promises';

// Mas também suporta Node.js fs
const file = Bun.file('data.json');
const content = await file.text();
```

#### HTTP Server Nativo (Alternativa ao Express)
```typescript
// Bun também tem servidor HTTP nativo (mais rápido)
const server = Bun.serve({
  port: 3001,
  fetch(req) {
    return new Response('Hello from Bun!');
  },
});
```

### 11. Deploy com Bun

#### Railway / Render
```bash
# Build command
bun build src/index.ts --outdir dist --target bun

# Start command
bun dist/index.js
```

#### Docker
```dockerfile
FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun build src/index.ts --outdir dist --target bun

EXPOSE 3001

CMD ["bun", "dist/index.js"]
```

### 12. Migração de Node.js para Bun

Se você já tem um projeto Node.js, migrar para Bun é simples:

1. **Instalar Bun**: `curl -fsSL https://bun.sh/install | bash`
2. **Trocar comandos**: `npm install` → `bun install`
3. **Atualizar scripts**: Remover `nodemon`, `ts-node`, `tsx` (não são necessários)
4. **Testar**: Executar `bun dev` e verificar se tudo funciona
5. **Opcional**: Usar `Bun.env` ao invés de `process.env` para melhor performance

**Nota**: A maioria do código funciona sem alterações! Bun é altamente compatível com Node.js.

---

## 📋 Checklist de Implementação

### Semana 1: Setup Básico
- [ ] Escolher runtime: Node.js ou Bun
- [ ] Criar projeto Node.js/Bun + TypeScript
- [ ] Configurar Prisma + PostgreSQL
- [ ] Criar schema do banco de dados
- [ ] Configurar variáveis de ambiente
- [ ] Implementar autenticação JWT
- [ ] Criar endpoints de auth (signup, login, me)
- [ ] Implementar middleware de autenticação
- [ ] Configurar CORS e segurança básica

### Setup com Bun (Opcional)

Se escolher usar Bun, você pode simplificar o setup:

```bash
# Instalar Bun
curl -fsSL https://bun.sh/install | bash

# Criar projeto
bun init

# Instalar dependências (muito mais rápido)
bun install

# Executar em desenvolvimento (sem necessidade de nodemon/tsx)
bun --watch src/index.ts

# Build (Bun tem bundler integrado)
bun build src/index.ts --outdir dist
```

**Vantagens do Bun para desenvolvimento:**
- Não precisa de `ts-node`, `tsx`, ou `nodemon`
- Execução direta de arquivos TypeScript
- Hot reload nativo
- Instalação de pacotes muito mais rápida

### Semana 2: CRUD Básico
- [ ] Endpoints de Professionals (CRUD completo)
- [ ] Endpoints de Services (CRUD completo)
- [ ] Endpoints de Appointments (CRUD completo)
- [ ] Validação de dados (Zod ou class-validator)
- [ ] Tratamento de erros global
- [ ] Testes básicos

### Semana 3: Integrações - Google
- [ ] Google OAuth flow completo
- [ ] Armazenar refresh tokens de forma segura
- [ ] Google Calendar service
- [ ] Sincronização bidirecional de eventos
- [ ] Webhook para mudanças no calendário

### Semana 4: Integrações - WhatsApp e AI
- [ ] WhatsApp integration (Evolution API ou Meta)
- [ ] Envio de mensagens automáticas
- [ ] Gemini AI integration
- [ ] Respostas automáticas inteligentes

### Semana 5: Dashboard e Relatórios
- [ ] Endpoint de estatísticas do dashboard
- [ ] Endpoints de relatórios (semanal, mensal, etc)
- [ ] Agregação de dados eficiente
- [ ] Cache de relatórios (Redis opcional)

### Semana 6+: Features Adicionais
- [ ] Sistema de reviews
- [ ] Notificações
- [ ] Upload de imagens (S3 ou Cloudinary)
- [ ] Email notifications
- [ ] Testes completos (unit + integration)

---

## 🔒 Segurança

### Boas Práticas

1. **Senhas**: Sempre usar bcrypt com salt rounds >= 10
2. **Tokens**: JWT com expiração curta (15min) + refresh tokens
3. **Rate Limiting**: Implementar para prevenir abuse
4. **Validação**: Validar todos os inputs (Zod recomendado)
5. **SQL Injection**: Prisma previne automaticamente
6. **CORS**: Configurar corretamente para produção
7. **Helmet**: Usar para headers de segurança
8. **Secrets**: Nunca commitar .env, usar gerenciadores de secrets

### Exemplo de Configuração de Segurança

```typescript
// src/app.ts
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
});
app.use('/api/', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

---

## 🚀 Deploy

### Opções Recomendadas

1. **Railway** - Fácil deploy, PostgreSQL incluído
2. **Render** - Similar ao Heroku, gratuito para começar
3. **Fly.io** - Boa performance, global
4. **AWS** - Mais complexo, mas muito escalável
5. **DigitalOcean** - Bom custo-benefício

### Variáveis de Ambiente para Produção

Ver `env.backend.example` para lista completa.

---

## 📚 Recursos e Documentação

- [Prisma Docs](https://www.prisma.io/docs)
- [Express.js Docs](https://expressjs.com/)
- [Bun Docs](https://bun.sh/docs) - Runtime JavaScript ultra-rápido
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Google Calendar API](https://developers.google.com/calendar)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)

---

## 💡 Próximos Passos

1. **Criar estrutura inicial do projeto**
2. **Configurar Prisma e criar migrations**
3. **Implementar autenticação básica**
4. **Criar primeiro CRUD (Professionals)**
5. **Testar integração com frontend**
6. **Iterar e adicionar features gradualmente**

---

**Última atualização**: Janeiro 2025  
**Versão**: 1.0.0


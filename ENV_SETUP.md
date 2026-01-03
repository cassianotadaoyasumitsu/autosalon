# Guia de Configuração de Variáveis de Ambiente

Este guia explica como configurar as variáveis de ambiente para o Perfect Salon.

## 📁 Arquivos Disponíveis

- **`env.example`** - Template para variáveis do frontend
- **`env.backend.example`** - Template completo para variáveis do backend
- **`env.development.example`** - Configurações simplificadas para desenvolvimento
- **`env.production.example`** - Configurações para produção

## 🚀 Configuração Rápida

### Frontend (Desenvolvimento)

1. Copie o arquivo de exemplo:
```bash
cp env.example .env.local
```

2. Edite `.env.local` e preencha os valores:
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_GOOGLE_CLIENT_ID=seu_client_id_aqui
VITE_ENVIRONMENT=development
```

### Backend (Desenvolvimento)

1. Copie o arquivo de exemplo:
```bash
cp env.development.example .env
```

2. Edite `.env` e preencha os valores necessários:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/perfectsalon_dev
JWT_SECRET=seu_secret_aqui
GOOGLE_CLIENT_ID=seu_client_id_aqui
# ... etc
```

## 🔑 Como Obter as Chaves Necessárias

### Google OAuth (Client ID e Secret)

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá em **APIs & Services** > **Credentials**
4. Clique em **Create Credentials** > **OAuth client ID**
5. Configure:
   - Application type: **Web application**
   - Authorized redirect URIs: `http://localhost:3001/api/auth/google/callback` (dev) ou `https://api.yourdomain.com/api/auth/google/callback` (prod)
6. Copie o **Client ID** e **Client Secret**

### Gemini API Key

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Clique em **Get API Key**
3. Crie uma nova chave ou use uma existente
4. Copie a chave gerada

### WhatsApp Business API

**Opção 1: Meta WhatsApp Business API (Oficial)**
1. Acesse [Meta for Developers](https://developers.facebook.com/)
2. Crie uma aplicação do tipo **Business**
3. Adicione o produto **WhatsApp**
4. Configure e obtenha:
   - Phone Number ID
   - Access Token
   - Verify Token (para webhooks)

**Opção 2: Evolution API (Open Source)**
- Siga a documentação em: https://github.com/EvolutionAPI/evolution-api

**Opção 3: Twilio WhatsApp**
- Crie conta em: https://www.twilio.com/
- Obtenha Account SID e Auth Token

### Banco de Dados PostgreSQL

**Desenvolvimento Local:**
```bash
# Instalar PostgreSQL
brew install postgresql  # macOS
# ou
sudo apt-get install postgresql  # Linux

# Criar banco de dados
createdb perfectsalon_dev

# URL de conexão
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/perfectsalon_dev
```

**Produção (Serviços Gerenciados):**
- **Supabase**: https://supabase.com/
- **Neon**: https://neon.tech/
- **AWS RDS**: https://aws.amazon.com/rds/
- **DigitalOcean**: https://www.digitalocean.com/products/managed-databases

### Email (SMTP)

**Desenvolvimento (Mailtrap):**
1. Crie conta em: https://mailtrap.io/
2. Obtenha credenciais SMTP do inbox de teste

**Produção:**
- **SendGrid**: https://sendgrid.com/
- **AWS SES**: https://aws.amazon.com/ses/
- **Gmail App Password**: https://myaccount.google.com/apppasswords

### Redis (Opcional)

**Desenvolvimento Local:**
```bash
# Instalar Redis
brew install redis  # macOS
# ou
sudo apt-get install redis  # Linux

# Iniciar Redis
redis-server

# URL de conexão
REDIS_URL=redis://localhost:6379
```

**Produção:**
- **Redis Cloud**: https://redis.com/try-free/
- **AWS ElastiCache**: https://aws.amazon.com/elasticache/
- **Upstash**: https://upstash.com/

## 🔐 Gerando Secrets Seguros

### JWT Secrets

Use OpenSSL para gerar secrets seguros:

```bash
# Gerar JWT Secret (32+ caracteres)
openssl rand -base64 32

# Gerar Refresh Secret (diferente do JWT)
openssl rand -base64 32
```

### Webhook Secrets

```bash
openssl rand -hex 32
```

## ✅ Checklist de Configuração

### Desenvolvimento
- [ ] Copiar `env.example` para `.env.local` (frontend)
- [ ] Copiar `env.development.example` para `.env` (backend)
- [ ] Configurar `DATABASE_URL` local
- [ ] Obter Google OAuth credentials
- [ ] Configurar JWT secrets (pode usar valores de exemplo em dev)
- [ ] (Opcional) Configurar Mailtrap para emails

### Produção
- [ ] Copiar `env.production.example` para `.env` (backend)
- [ ] Gerar novos JWT secrets únicos
- [ ] Configurar banco de dados em produção
- [ ] Configurar Google OAuth com URLs de produção
- [ ] Obter credenciais do WhatsApp Business API
- [ ] Configurar serviço de email em produção
- [ ] Configurar Redis em produção
- [ ] Configurar storage (S3 ou Cloudinary)
- [ ] Configurar Sentry para error tracking
- [ ] Usar gerenciador de secrets (AWS Secrets Manager, etc.)

## ⚠️ Segurança

1. **NUNCA** commite arquivos `.env` ou `.env.local` no Git
2. Use valores diferentes para desenvolvimento e produção
3. Rotacione secrets regularmente em produção
4. Use gerenciadores de secrets em produção (AWS Secrets Manager, HashiCorp Vault)
5. Mantenha backups seguros das variáveis de ambiente
6. Revise permissões de acesso regularmente

## 📝 Notas

- Variáveis que começam com `VITE_` são expostas ao frontend
- Variáveis sem `VITE_` são apenas para backend
- Comentários nos arquivos `.example` explicam cada variável
- Valores marcados com `# Opcional` podem ser deixados vazios se não usar a feature

## 🆘 Troubleshooting

**Erro: "Environment variable not found"**
- Verifique se o arquivo `.env` ou `.env.local` existe
- Verifique se o nome da variável está correto
- Reinicie o servidor após alterar variáveis

**Erro de conexão com banco de dados**
- Verifique se o PostgreSQL está rodando
- Verifique se a URL de conexão está correta
- Verifique permissões do usuário do banco

**Erro de autenticação Google**
- Verifique se as URLs de redirect estão corretas
- Verifique se o Client ID e Secret estão corretos
- Verifique se a API está habilitada no Google Cloud Console


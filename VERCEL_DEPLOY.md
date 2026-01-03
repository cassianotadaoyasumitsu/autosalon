# Guia de Deploy para Vercel

Este guia explica como fazer deploy da aplicação Perfect Salon no Vercel.

## 🚀 Configuração Inicial

### 1. Criar Conta no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub/GitLab/Bitbucket
3. Autorize o Vercel a acessar seus repositórios

### 2. Conectar Repositório

1. No dashboard do Vercel, clique em **Add New Project**
2. Selecione o repositório `autosalon`
3. O Vercel detectará automaticamente que é um projeto Vite

### 3. Configuração Automática

O Vercel detectará automaticamente:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

O arquivo `vercel.json` já está configurado com:
- Rewrites para SPA routing (todas as rotas redirecionam para `/index.html`)
- Cache headers para assets estáticos

## ⚙️ Variáveis de Ambiente

### Configurar no Vercel

1. No projeto, vá em **Settings** > **Environment Variables**
2. Adicione as variáveis necessárias:

```
VITE_API_BASE_URL=https://seu-backend.com/api
VITE_GOOGLE_CLIENT_ID=seu-google-client-id
GEMINI_API_KEY=sua-chave-gemini (se usar)
```

### Variáveis Disponíveis

- `VITE_API_BASE_URL` - URL base da API backend
- `VITE_GOOGLE_CLIENT_ID` - Client ID do Google OAuth
- `GEMINI_API_KEY` - Chave da API Gemini (opcional)

**Nota**: Variáveis que começam com `VITE_` são expostas ao cliente. Não coloque secrets sensíveis nelas.

## 📋 Arquivos de Configuração

### `vercel.json`

Já está configurado com:
- **Rewrites**: Todas as rotas (`/*`) redirecionam para `/index.html` (necessário para SPA)
- **Headers**: Cache otimizado para assets estáticos
- **Build settings**: Comandos de build e output directory

### `vite.config.ts`

Configurado para usar sempre `base: '/'`:
- Sempre usa `base: '/'` (Vercel, desenvolvimento local, produção)
- Não precisa de configuração adicional

## 🔄 Deploy Automático

O Vercel faz deploy automaticamente:
- **Push para `main`**: Deploy de produção
- **Pull Requests**: Preview deployments
- **Push para outras branches**: Preview deployments

## 🌐 URLs

Após o deploy:
- **Produção**: `https://seu-projeto.vercel.app`
- **Preview**: `https://seu-projeto-git-branch.vercel.app`

## 🔧 Comandos Úteis

### Deploy Manual via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
vercel

# Deploy de produção
vercel --prod
```

### Verificar Build Localmente

```bash
# Build local
npm run build

# Preview do build
npm run preview
```

## 🐛 Troubleshooting

### Erro: "404 Not Found" nas rotas

**Solução**: Verifique se o `vercel.json` tem o rewrite configurado:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Assets não carregam

**Solução**: Verifique se o `vite.config.ts` está usando `base: '/'` quando `VERCEL=1`

### Build falha

**Solução**: 
1. Verifique os logs no dashboard do Vercel
2. Teste o build localmente: `npm run build`
3. Verifique se todas as dependências estão no `package.json`

### Variáveis de ambiente não funcionam

**Solução**:
1. Variáveis devem começar com `VITE_` para serem expostas ao cliente
2. Após adicionar variáveis, faça um novo deploy
3. Verifique se as variáveis estão configuradas para o ambiente correto (Production/Preview/Development)

## 📝 Notas Importantes

- O Vercel usa **BrowserRouter** (não HashRouter) - já configurado no `App.tsx`
- O base path é sempre `/` no Vercel (não precisa de subdiretório)
- O Vercel suporta SPA routing nativamente via rewrites
- Assets são servidos com cache otimizado automaticamente

## 🎉 Pronto!

Após seguir esses passos, sua aplicação estará disponível no Vercel com deploy automático a cada push!


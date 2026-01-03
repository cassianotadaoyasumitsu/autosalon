# Guia de Deploy para GitHub Pages

Este guia explica como fazer deploy da aplicação Perfect Salon no GitHub Pages usando GitHub Actions.

## 🚀 Configuração Inicial

### 1. Habilitar GitHub Pages no Repositório

1. Acesse seu repositório no GitHub: `https://github.com/cassianotadaoyasumitsu/autosalon`
2. Vá em **Settings** > **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. Clique em **Save**

### 2. Verificar Branch Principal

O workflow está configurado para a branch `main`. Se sua branch principal for `master`, edite o arquivo `.github/workflows/deploy.yml` e altere:

```yaml
branches:
  - master  # ao invés de main
```

### 3. Fazer Push das Alterações

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

## 📋 O que foi Configurado

### Arquivos Criados/Modificados

1. **`.github/workflows/deploy.yml`**
   - Workflow automático que faz build e deploy
   - Executa automaticamente a cada push na branch main
   - Também pode ser executado manualmente

2. **`vite.config.ts`** (atualizado)
   - Configurado com `base: '/autosalon/'` para GitHub Pages
   - Detecta automaticamente quando está sendo buildado para GitHub Pages

## 🔗 URL da Aplicação

Após o deploy, sua aplicação estará disponível em:

```
https://cassianotadaoyasumitsu.github.io/autosalon/
```

## ⚙️ Variáveis de Ambiente (Opcional)

Se precisar configurar variáveis de ambiente para produção:

1. Vá em **Settings** > **Secrets and variables** > **Actions**
2. Clique em **New repository secret**
3. Adicione as variáveis:
   - `VITE_API_BASE_URL` (se tiver backend)
   - `VITE_GOOGLE_CLIENT_ID` (se usar Google OAuth)
   - Outras variáveis `VITE_*` necessárias

O workflow já está configurado para usar esses secrets.

## 📊 Verificar Status do Deploy

1. Vá na aba **Actions** do seu repositório
2. Você verá o workflow "Deploy to GitHub Pages" executando
3. Clique no workflow para ver os logs detalhados
4. Quando completar, você verá um link para a página deployada

## 🔄 Deploy Manual

Se quiser fazer deploy manualmente:

1. Vá na aba **Actions**
2. Selecione o workflow "Deploy to GitHub Pages"
3. Clique em **Run workflow**
4. Selecione a branch e clique em **Run workflow**

## ⚠️ Importante

- O deploy é automático a cada push na branch `main`
- O primeiro deploy pode levar alguns minutos
- Deploys subsequentes são mais rápidos
- Se algo der errado, verifique os logs na aba **Actions**

## 🐛 Troubleshooting

### Erro: "Workflow not found"
- Verifique se o arquivo `.github/workflows/deploy.yml` foi commitado
- Verifique se está na branch correta

### Erro: "Permission denied"
- Vá em **Settings** > **Actions** > **General**
- Em **Workflow permissions**, selecione **Read and write permissions**
- Marque **Allow GitHub Actions to create and approve pull requests**

### Build falha
- Verifique os logs na aba **Actions**
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se não há erros de TypeScript

### Página não carrega
- Verifique se o `base` no `vite.config.ts` está correto (`/autosalon/`)
- Verifique se o GitHub Pages está habilitado
- Aguarde alguns minutos após o deploy (pode levar tempo para propagar)

## 📝 Notas

- A aplicação usa `HashRouter`, então todas as rotas funcionarão corretamente
- Como é apenas frontend, a autenticação mock funcionará normalmente
- Se precisar de backend, você precisará deployar em outro serviço (Vercel, Railway, etc.)

## 🎉 Pronto!

Após seguir esses passos, sua aplicação estará disponível no GitHub Pages!


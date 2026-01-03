# Troubleshooting 404 Errors

Este guia ajuda a identificar e corrigir erros 404 comuns no projeto Perfect Salon.

## Verificação Rápida

### 1. Abrir DevTools
- **Chrome/Edge**: `F12` ou `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
- **Firefox**: `F12` ou `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
- **Safari**: `Cmd+Option+I` (Mac)

### 2. Verificar Aba Network
1. Abra a aba **Network**
2. Recarregue a página (`F5` ou `Ctrl+R`)
3. Procure por requisições em **vermelho** (status 404)
4. Clique na requisição para ver detalhes:
   - **Headers**: URL completa que está sendo solicitada
   - **Response**: Mensagem de erro do servidor

## Problemas Comuns e Soluções

### Problema 1: CSS do react-big-calendar não carrega

**Sintoma:**
```
Failed to load resource: the server responded with a status of 404 (react-big-calendar/lib/css/react-big-calendar.css)
```

**Causa:**
O import do CSS pode não estar sendo resolvido corretamente em produção.

**Solução:**
O import está correto em `pages/CalendarView.tsx`:
```tsx
import 'react-big-calendar/lib/css/react-big-calendar.css';
```

Se ainda houver problemas:
1. Verifique se `react-big-calendar` está instalado: `npm list react-big-calendar`
2. Se necessário, reinstale: `npm install react-big-calendar`

### Problema 2: Imagens não encontradas

**Sintoma:**
```
Failed to load resource: the server responded with a status of 404 (/images/picture.png)
```

**Causa:**
- Arquivo não existe em `public/images/`
- Caminho incorreto no código
- Problema com base path em produção

**Solução:**

1. **Verificar se o arquivo existe:**
   ```bash
   ls public/images/
   ```

2. **Verificar o caminho no código:**
   ```tsx
   // ✅ Correto - caminho absoluto
   <img src="/images/picture.png" alt="Descrição" />
   
   // ❌ Incorreto
   <img src="images/picture.png" alt="Descrição" />
   <img src="./images/picture.png" alt="Descrição" />
   ```

3. **Para GitHub Pages (com base path):**
   Se você está usando GitHub Pages com base path `/autosalon/`, pode precisar usar:
   ```tsx
   // Em desenvolvimento
   <img src="/images/picture.png" alt="Descrição" />
   
   // Em produção (se base path for /autosalon/)
   // O Vite deve resolver automaticamente, mas se não funcionar:
   const basePath = import.meta.env.BASE_URL || '';
   <img src={`${basePath}images/picture.png`} alt="Descrição" />
   ```

### Problema 3: Scripts ou módulos não encontrados

**Sintoma:**
```
Failed to load resource: the server responded with a status of 404 (/index.tsx)
```

**Causa:**
Problema com o entry point ou configuração do Vite.

**Solução:**

1. **Verificar `index.html`:**
   ```html
   <!-- ✅ Correto -->
   <script type="module" src="/index.tsx"></script>
   ```

2. **Verificar `vite.config.ts`:**
   ```typescript
   export default defineConfig({
     base: process.env.GITHUB_PAGES ? '/autosalon/' : '/',
     // ...
   });
   ```

3. **Verificar se `index.tsx` existe na raiz do projeto**

### Problema 4: Fontes do Google não carregam

**Sintoma:**
```
Failed to load resource: the server responded with a status of 404 (fonts.googleapis.com)
```

**Causa:**
- Problema de rede/CORS
- URL incorreta

**Solução:**
Verifique o `index.html`:
```html
<!-- ✅ URL correta -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
```

Se o problema persistir, pode ser bloqueio de rede/firewall.

### Problema 5: Assets em produção (GitHub Pages)

**Sintoma:**
Recursos funcionam em desenvolvimento mas não em produção.

**Causa:**
Base path não configurado corretamente.

**Solução:**

1. **Verificar `vite.config.ts`:**
   ```typescript
   const base = process.env.GITHUB_PAGES ? '/autosalon/' : '/';
   ```

2. **Verificar variável de ambiente no GitHub Actions:**
   ```yaml
   # .github/workflows/deploy.yml
   env:
     GITHUB_PAGES: true
   ```

3. **Verificar se o build está usando o base correto:**
   ```bash
   npm run build
   # Verificar se os caminhos em dist/index.html começam com /autosalon/
   ```

## Checklist de Verificação

Use este checklist para diagnosticar problemas 404:

- [ ] Abri o DevTools e verifiquei a aba Network
- [ ] Identifiquei qual recurso está retornando 404
- [ ] Verifiquei se o arquivo existe no local esperado
- [ ] Verifiquei se o caminho no código está correto
- [ ] Verifiquei se há diferenças entre desenvolvimento e produção
- [ ] Verifiquei a configuração do base path no `vite.config.ts`
- [ ] Verifiquei se as dependências estão instaladas (`npm install`)
- [ ] Verifiquei se o build foi feito corretamente (`npm run build`)

## Comandos Úteis

```bash
# Verificar se arquivo existe
ls -la public/images/picture.png

# Verificar dependências instaladas
npm list react-big-calendar moment

# Reinstalar dependências
npm install

# Limpar e reconstruir
rm -rf node_modules dist
npm install
npm run build

# Verificar build
npm run preview
```

## Exemplos de Código Correto

### Imagens
```tsx
// ✅ Correto
<img src="/images/logo.png" alt="Logo" />

// ✅ Correto com base path dinâmico (se necessário)
const basePath = import.meta.env.BASE_URL || '';
<img src={`${basePath}images/logo.png`} alt="Logo" />
```

### CSS de bibliotecas
```tsx
// ✅ Correto
import 'react-big-calendar/lib/css/react-big-calendar.css';
```

### Imports de módulos
```tsx
// ✅ Correto - imports relativos
import Component from './components/Component';
import { service } from '../services/service';

// ✅ Correto - imports absolutos com alias
import { something } from '@/types';
```

## Ainda com Problemas?

Se nenhuma das soluções acima funcionar:

1. **Capture informações:**
   - Screenshot do erro no console
   - URL completa do recurso que está falhando (da aba Network)
   - Ambiente (desenvolvimento ou produção)
   - Navegador e versão

2. **Verifique logs:**
   - Console do navegador (erros JavaScript)
   - Network tab (requisições HTTP)
   - Build logs (`npm run build`)

3. **Teste em outro ambiente:**
   - Tente em outro navegador
   - Tente em modo anônimo/privado
   - Tente em outra máquina

## Recursos Adicionais

- [Vite Static Asset Handling](https://vitejs.dev/guide/assets.html)
- [Vite Base Path Configuration](https://vitejs.dev/config/shared-options.html#base)
- [GitHub Pages Deployment](https://docs.github.com/en/pages/getting-started-with-github-pages)


# Guia de Assets Estáticos

## Estrutura de Pastas

O projeto usa a pasta `public/` para assets estáticos que serão servidos diretamente pelo Vite.

```
public/
├── images/          # Imagens estáticas
│   └── .gitkeep
```

## Como Usar Imagens

### 1. Colocar Imagens na Pasta `public/images/`

Adicione suas imagens na pasta `public/images/`:

```
public/
└── images/
    ├── logo.png
    ├── hero-image.jpg
    └── picture.png
```

### 2. Referenciar Imagens no Código

No código React/TypeScript, referencie as imagens usando o caminho absoluto começando com `/`:

```tsx
// ✅ Correto - caminho absoluto
<img src="/images/picture.png" alt="Descrição" />

// ✅ Correto - usando import (para assets que precisam ser processados)
import logo from '/images/logo.png';
<img src={logo} alt="Logo" />

// ❌ Incorreto - caminho relativo
<img src="images/picture.png" alt="Descrição" />
<img src="./images/picture.png" alt="Descrição" />
```

### 3. Exemplo Completo

```tsx
import React from 'react';

const MyComponent: React.FC = () => {
  return (
    <div>
      {/* Usando caminho absoluto */}
      <img 
        src="/images/picture.png" 
        alt="Minha imagem" 
        className="w-full h-auto"
      />
      
      {/* Ou usando import */}
      <img 
        src="/images/logo.png" 
        alt="Logo" 
      />
    </div>
  );
};

export default MyComponent;
```

## Verificação de Erros 404

Se você encontrar um erro 404 para uma imagem:

1. **Verifique o caminho no código:**
   - Deve começar com `/` (caminho absoluto)
   - Exemplo: `/images/picture.png` ✅
   - Não use: `images/picture.png` ❌

2. **Verifique se o arquivo existe:**
   - O arquivo deve estar em `public/images/`
   - Verifique o nome do arquivo (case-sensitive)
   - Verifique a extensão (.png, .jpg, .svg, etc.)

3. **Verifique no DevTools:**
   - Abra o Network tab
   - Procure pela requisição que retornou 404
   - Veja qual URL está sendo solicitada
   - Compare com o caminho real do arquivo

## Assets Externos

Para imagens hospedadas externamente (Unsplash, CDN, etc.), use URLs completas:

```tsx
// ✅ Correto - URL externa
<img 
  src="https://images.unsplash.com/photo-1234567890" 
  alt="Imagem externa" 
/>
```

## Build e Deploy

Quando você faz o build do projeto (`npm run build`), os arquivos em `public/` são copiados para `dist/` mantendo a estrutura de pastas.

Para GitHub Pages, certifique-se de que o `base` no `vite.config.ts` está configurado corretamente:

```typescript
const base = process.env.GITHUB_PAGES ? '/autosalon/' : '/';
```

Se o base for `/autosalon/`, as imagens devem ser referenciadas como:
- `/autosalon/images/picture.png` (em produção)
- `/images/picture.png` (em desenvolvimento)

Ou use variáveis de ambiente para gerenciar isso dinamicamente.

## Troubleshooting

### Erro 404 em Desenvolvimento

1. Verifique se o arquivo está em `public/images/`
2. Verifique se o caminho no código começa com `/`
3. Reinicie o servidor de desenvolvimento (`npm run dev`)

### Erro 404 em Produção (GitHub Pages)

1. Verifique o `base` no `vite.config.ts`
2. Verifique se os arquivos foram copiados para `dist/images/` após o build
3. Verifique se o caminho inclui o prefixo do base path se necessário

### Imagens não aparecem

1. Verifique o console do navegador para erros
2. Verifique a aba Network para ver se a requisição está sendo feita
3. Verifique se o CORS está configurado corretamente (para imagens externas)


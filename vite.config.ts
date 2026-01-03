import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Base path para GitHub Pages (nome do repositório)
    // Se o repositório for username.github.io, use base: '/'
    // Caso contrário, use base: '/nome-do-repositorio/'
    // Para produção no GitHub Pages, sempre usar /autosalon/
    // Durante 'npm run build', o Vite sempre usa mode: 'production'
    // Para desenvolvimento local, usar '/' para facilitar testes
    const githubPagesEnv = process.env.GITHUB_PAGES || env.GITHUB_PAGES || '';
    const isProduction = mode === 'production';
    const githubPages = githubPagesEnv === 'true' || githubPagesEnv === '1';
    
    // Sempre usar /autosalon/ para builds de produção (GitHub Pages)
    // Em desenvolvimento, usar '/' para facilitar testes locais
    const base = (isProduction || githubPages) ? '/autosalon/' : '/';
    
    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

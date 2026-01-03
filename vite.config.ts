import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Base path configuration
    // - Vercel: sempre usar '/' (detectado via VERCEL env var)
    // - GitHub Pages: usar '/autosalon/' quando GITHUB_PAGES=true
    // - Desenvolvimento local: usar '/' para facilitar testes
    const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
    const githubPagesEnv = process.env.GITHUB_PAGES || env.GITHUB_PAGES || '';
    const githubPages = githubPagesEnv === 'true' || githubPagesEnv === '1' || githubPagesEnv === true;
    
    // Vercel sempre usa base: '/'
    // GitHub Pages usa '/autosalon/' quando configurado
    // Desenvolvimento local usa '/'
    const base = isVercel ? '/' : (githubPages ? '/autosalon/' : '/');
    
    // Log para debug
    if (process.env.NODE_ENV === 'production') {
      console.log(`[Vite Config] Building for ${isVercel ? 'Vercel' : githubPages ? 'GitHub Pages' : 'production'} with base: ${base}`);
    }
    
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

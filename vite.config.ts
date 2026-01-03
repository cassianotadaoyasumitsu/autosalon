import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Base path configuration
    // - Por padrão: sempre usar '/' (Vercel, desenvolvimento local, etc.)
    // - GitHub Pages: usar '/autosalon/' APENAS quando GITHUB_PAGES=true explicitamente
    // - O Vercel sempre usa base: '/' (não precisa de subdiretório)
    // - Verificar se está no Vercel primeiro (VERCEL env var)
    const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
    const githubPagesEnv = process.env.GITHUB_PAGES || env.GITHUB_PAGES || '';
    const githubPages = !isVercel && (githubPagesEnv === 'true' || githubPagesEnv === '1');
    
    // Vercel sempre usa '/' (ignora GITHUB_PAGES se estiver setado)
    // GitHub Pages usa '/autosalon/' quando GITHUB_PAGES=true E não estiver no Vercel
    // Por padrão sempre usar '/' (desenvolvimento, etc.)
    const base = githubPages ? '/autosalon/' : '/';
    
    // Log para debug
    if (process.env.NODE_ENV === 'production') {
      console.log(`[Vite Config] Building for ${isVercel ? 'Vercel' : githubPages ? 'GitHub Pages' : 'Production'} with base: ${base}`);
      console.log(`[Vite Config] Env vars - VERCEL: ${process.env.VERCEL}, GITHUB_PAGES: ${githubPagesEnv}, isVercel: ${isVercel}, githubPages: ${githubPages}`);
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

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Base path configuration
    // - Por padrão: sempre usar '/' (Vercel, desenvolvimento local, etc.)
    // - GitHub Pages: usar '/autosalon/' APENAS quando GITHUB_PAGES=true explicitamente
    // - O Vercel sempre usa base: '/' (não precisa de subdiretório)
    const githubPagesEnv = process.env.GITHUB_PAGES || env.GITHUB_PAGES || '';
    const githubPages = githubPagesEnv === 'true' || githubPagesEnv === '1';
    
    // Por padrão sempre usar '/' (Vercel, desenvolvimento, etc.)
    // Só usar '/autosalon/' quando explicitamente configurado para GitHub Pages
    const base = githubPages ? '/autosalon/' : '/';
    
    // Log para debug
    if (process.env.NODE_ENV === 'production') {
      console.log(`[Vite Config] Building for ${githubPages ? 'GitHub Pages' : 'Vercel/Production'} with base: ${base}`);
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

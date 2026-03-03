import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // Mengizinkan semua host agar Replit tidak memblokir koneksi
      allowedHosts: true, 
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      cors: true,
      // Mengatur HMR agar tidak bentrok dengan protokol proxy Replit
      hmr: {
        clientPort: 443, // Memaksa HMR menggunakan port HTTPS standar
      },
    },
  };
});

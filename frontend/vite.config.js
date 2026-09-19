import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // Permite testar o PWA rodando localmente
      },
      manifest: {
        name: 'Parô? | Gestão de Tempo',
        short_name: 'Parô?',
        description: 'Sistema de Monitoramento de Tempo Parado em Roteiros',
        theme_color: '#F58220', // O laranja alerta da nossa logo
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192x192.png', // Precisaremos colocar a logo na pasta public depois
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
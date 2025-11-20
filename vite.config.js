// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,               // allow external access (0.0.0.0)
    port: 5173,
    // allow your ngrok host here:
    allowedHosts: [
      'unguzzled-noninterruptedly-shayna.ngrok-free.dev'
      // if ngrok gives you a new host later, just add another string here
    ]
  }
})

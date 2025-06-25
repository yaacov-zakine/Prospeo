
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig(async ({ mode }) => {
  const plugins = [react()]
  
  // Conditionally import and add componentTagger only in development mode
  if (mode === 'development') {
    try {
      const { componentTagger } = await import('lovable-tagger')
      plugins.push(componentTagger() as any)
    } catch (error) {
      console.warn('Could not load lovable-tagger:', (error as Error).message)
    }
  }

  return {
    plugins,
    server: {
      host: "::",
      port: 8080
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Ensure TypeScript can resolve path mappings
    esbuild: {
      target: 'es2020'
    }
  }
})

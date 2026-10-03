import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Provided by vite-plugin-pwa at build time.
// @ts-expect-error The virtual module has no local TypeScript declaration.
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

registerSW({
  immediate: true,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
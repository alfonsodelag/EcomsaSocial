import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { randomFillSync, webcrypto } from 'node:crypto'

// Polyfill `crypto.getRandomValues` for Node versions that lack Web Crypto
// support. Vite relies on this API when resolving configuration, so we need
// to ensure it is available before Vite executes.
if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== 'function') {
  // Prefer the built-in `webcrypto` implementation when available. Fall back
  // to using `randomFillSync` which behaves similarly for typed arrays.
  const cryptoImpl = webcrypto ?? {}
  const getRandomValues = cryptoImpl.getRandomValues?.bind(cryptoImpl)
  globalThis.crypto = {
    ...cryptoImpl,
    getRandomValues: getRandomValues ?? ((buffer) => randomFillSync(buffer)),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

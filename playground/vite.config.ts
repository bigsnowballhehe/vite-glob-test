import { defineConfig } from 'vite'
import globNext from '../src/index'

export default defineConfig({
  plugins: [
    globNext(),
  ],
})

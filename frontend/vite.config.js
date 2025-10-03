import { defineConfig } from "vite";  // https://vitejs.dev/config/
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";  // https://tailwindcss.com/docs/guides/vite

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
});
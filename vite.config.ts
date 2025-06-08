import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import vitePrerender from "vite-plugin-prerender";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerender({ 
      staticDir: "dist", 
      // adding more route later
      routes: ["/"] }),
  ],
});

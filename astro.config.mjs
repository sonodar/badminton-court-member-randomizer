import node from '@astrojs/node';
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  addons: node({ mode: 'standalone' }),
  integrations: [react()],
  vite: {
    define: {
      "window.global": {},
    },
  },
});

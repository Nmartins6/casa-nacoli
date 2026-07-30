import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.casanacoli.com.br",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

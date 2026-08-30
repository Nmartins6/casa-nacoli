import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.casanacoli.com.br",
  integrations: [sitemap()],
  redirects: {
    "/produtos/dtf-em-rolo": "/categorias/grafica-e-impressoes",
    "/produtos/dtf-por-arte": "/categorias/grafica-e-impressoes",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

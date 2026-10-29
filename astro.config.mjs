import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Cambia esto por tu dominio final cuando lo tengas (mejora SEO / OG).
  // site: "https://josegranados.netlify.app",
  compressHTML: true,
  build: {
    // Deja el HTML autocontenido (CSS incluido) para poder abrirlo con doble clic.
    inlineStylesheets: "always",
  },
});

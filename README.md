# Portafolio / CV — José Armando Granados Martínez

Sitio de una sola página construido con **Astro 5**, CSS moderno y JavaScript vanilla (sin librerías de UI ni plantillas). Listo para publicarse gratis en Netlify, Vercel o cualquier hosting estático.

## Cómo verlo (sin servidor, sin comandos)

Abre con doble clic:

```
dist/index.html
```

Ese archivo ya trae el CSS y el JavaScript dentro, así que se ve exactamente igual que en internet. Solo necesita la carpeta `assets/` al lado (ya está).

> Si cambias algo en `src/`, vuelve a generar el archivo con `npm run build` y recarga.

## Stack

- **Astro 5** — generación estática, componentes `.astro`, cero JS de framework en el cliente.
- **CSS propio** — variables, grid, animaciones y responsive sin Tailwind ni Bootstrap.
- **JavaScript vanilla** — menú, scroll reveal con `IntersectionObserver`, copiar correo, rotador de rol.
- **Google Fonts** — Space Grotesk, Inter y JetBrains Mono.

## Requisitos

Node.js 18 o superior (probado con Node 24) y npm.

```bash
npm install
npm run dev      # servidor local en http://localhost:4321
npm run build    # genera dist/ listo para subir / ver
npm run preview  # previsualiza el build
```

> `build.inlineStylesheets: "always"` está activado en `astro.config.mjs` para que `dist/index.html` funcione con doble clic.

## Estructura

```
astro.config.mjs
package.json
public/
  assets/avatar.png       Foto de perfil
  assets/cv.pdf           CV descargable
  assets/og.png           Vista previa para redes (1200×630)
  assets/qr-github.png    QR -> github.com/JoseGranados7
  assets/qr-linkedin.png  QR -> perfil de LinkedIn
  assets/favicon.svg
  robots.txt
src/
  layouts/Layout.astro    <head>, SEO, JSON-LD, estilos y script global
  pages/index.astro       Composición de todas las secciones
  components/
    Nav.astro             Barra fija, progreso, menú móvil
    Hero.astro            Portada + terminal animada + estadísticas
    Marquee.astro         Cinta de tecnologías
    About.astro           Sobre mí + ficha rápida
    Experience.astro      Línea de tiempo laboral
    Projects.astro        Proyectos
    Stack.astro           Tecnologías + nota "hecho con Astro"
    Education.astro       Formación y certificaciones
    Contact.astro         Contacto + QR
    Footer.astro          Pie con badge de Astro
  styles/global.css       Todos los estilos
  scripts/main.js         Toda la interactividad
dist/                     Build listo para publicar (se regenera)
Elementos/                Archivos originales (no se despliega)
```

## Publicar

### Netlify (recomendado)

**Opción A — arrastrar el build**
1. `npm run build`
2. Entra a <https://app.netlify.com/drop> y arrastra la carpeta **`dist`**.
3. Netlify te da una URL tipo `https://tu-nombre.netlify.app` (puedes cambiarla en *Site settings*).

**Opción B — conectar el repositorio**
1. Sube el proyecto a GitHub.
2. En Netlify: *Add new site → Import an existing project*.
3. Netlify detecta Astro automáticamente (también está el `netlify.toml` con `npm run build` y `dist`).

### Vercel

1. Sube el proyecto a GitHub.
2. Entra a <https://vercel.com/new> e importa el repo.
3. Framework preset: **Astro** (lo detecta solo). Deploy.

### GitHub Pages

Requiere compilar con GitHub Actions y configurar `site` + `base` en `astro.config.mjs` si el repo no se llama `usuario.github.io`. Para este proyecto es más simple Netlify o Vercel.

## Personalizar

- **Colores:** variables al inicio de `src/styles/global.css` (`--lime`, `--violet`, `--bg`).
- **Contenido:** cada sección vive en su componente dentro de `src/components/`.
- **LinkedIn:** el CV original tenía dos URLs y el QR original apuntaba a la más antigua (`/in/josé-granados-9869223a9`). Aquí se usó la del CV reciente (`/in/josé-armando-granados-martínez-6b3968294/`) y se regeneraron ambos QR para que el código y los botones lleven al mismo perfil. Si el correcto fuera el otro, cambia la URL en `Hero`, `Contact` y `Footer`, y regenera el QR.
- **Dominio:** cuando lo tengas, descomenta `site` en `astro.config.mjs`.

## Notas

- Astro está fijado en la **versión 5**: la 7 depende de un módulo nativo (`satteri`) que este equipo bloquea por política de Application Control.
- El proyecto no toca bases de datos ni FTP.

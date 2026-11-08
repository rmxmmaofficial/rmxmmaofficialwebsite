# RMX MMA & Fitness Centre

Premium, responsive RMX website built with React and Vite.

## Stack and package manager

- React 18 with Vite 5
- npm, pinned by `package-lock.json`
- Framer Motion, GSAP, and Lucide React
- Bebas Neue and Inter loaded from Google Fonts

## Run and build

Use Node.js 24 and npm from the project root:

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The production build is written to `dist/`.

## Netlify

`netlify.toml` sets the build command, Node version, and publish directory. The SPA fallback in `public/_redirects` is copied into `dist/_redirects` by Vite.

- Build command: `npm run build`
- Publish directory: `dist`
- Required app environment variables: none
- Server functions or backend: none

Google Tag Manager container `GTM-MXB594JM` is installed in `index.html`. The container ID is public and is not a secret. Configure and publish any analytics or marketing tags in Google Tag Manager itself.

For manual deployment, build the project and upload the contents of `dist/`.

For continuous deployment, push the project root to GitHub and connect that repository in Netlify. Keep `package-lock.json`, `netlify.toml`, and `public/_redirects` in the repository. Do not commit `node_modules/`, `dist/`, or `.env` files.

## Assets

The supplied RMX photos and videos are under `public/assets/`. Vite copies public assets into `dist/` without renaming them. The site references Bebas Neue and Inter through Google Fonts, so browsers need network access to Google Fonts to load those typefaces; CSS fallbacks remain available.

The site is a single-page application. Navigation uses in-page anchors; it does not currently define separate page routes. The Netlify fallback serves the app shell on direct paths and refreshes.

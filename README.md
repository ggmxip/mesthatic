# mesthatic

Personal portfolio of **Aditya Ishan** — Associate Business Analyst @ Koch Industries.

Built with React, Vite, Three.js, Framer Motion, and Tailwind CSS. One continuous scroll, metallic aesthetic, live GitHub integration.

## Stack
- **React 19** + **Vite 8**
- **Three.js** + **@react-three/fiber** for the 3D chrome torus / wireframe icosahedron background
- **Framer Motion** for section transitions and shine sweeps
- **Tailwind CSS v4** for styling
- **Lenis** for smooth scrolling
- Live GitHub data via `api.github.com/users/ggmxip`

## Local development
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint
```

## Deployment
Hosted on **DigitalOcean App Platform** at **[adityaishan.social](https://adityaishan.social)**.

### One-time setup
1. Push the repo to GitHub (already done: `ggmxip/mesthatic`).
2. In the [DigitalOcean dashboard](https://cloud.digitalocean.com/apps), click **Create App** → **GitHub** → select `ggmxip/mesthatic`.
3. App Platform auto-detects Vite. Confirm:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Add the custom domain `adityaishan.social` in the app's **Settings → Domains**.
5. DigitalOcean will show DNS records. Add them at your registrar (name.com):
   - For apex (`adityaishan.social`): `A` record → the IP DigitalOcean gives you.
   - For `www`: `CNAME` → the target DigitalOcean gives you.
6. Wait for DNS to propagate (5–30 min) and TLS cert provisioning (a few minutes after that).

### Subsequent deploys
Just push to `main`. App Platform auto-builds and deploys.

## Structure
```
src/
  App.jsx                    Composition root
  main.jsx                   React entry
  index.css                  Tailwind + metallic utilities
  data/resume.js             All content (profile, experience, projects, skills…)
  services/github.js         GitHub API client with localStorage cache
  components/
    canvas/BackgroundScene.jsx   Three.js scene
    sections/                    One file per page section
      Hero / About / Experience / Projects / GitHub / Skills / Education / Certifications / Contact
    ui/                           Reusable building blocks
      MetalCard / MetallicScrollbar / MeshGradient / BrushedMetal / TopNav
```

## License
© Aditya Ishan. All rights reserved.

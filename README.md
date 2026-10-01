# Spandan Studios

Portfolio website for Spandan Studios — art, design & installation, Surat.

Built with React 19, Vite 7, Tailwind CSS 4, GSAP + ScrollTrigger and Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Images

Put the artwork files in `public/images/` using these exact names:

| File | Used in |
| --- | --- |
| `img10.webp` | Hero, gallery |
| `img12.webp` | Services 01, gallery |
| `img13.webp` | About, gallery |
| `img14.webp` | Services 02, gallery |
| `img15.webp` | Gallery |
| `img16.webp` | Services 03, gallery |
| `img17.webp` | Gallery |
| `img18.webp` | Gallery |
| `shankk.png` | About (signature block) |
| `uncle.webp` | Founder — Manish R. Dholakia |
| `swayam.webp` | Founder — Swayam M. Dholakia |

A missing file shows a quiet hatched placeholder labelled with its filename, so nothing breaks.

## Where to edit content

- `src/data/site.js` — address, phone numbers, WhatsApp, Google Maps links, **social profile URLs**, nav and image mapping
- `src/data/services.js` — the three services
- `src/data/gallery.js` — gallery order, titles, mediums and layout shape per artwork

## Structure

```
src/
  components/
    Navbar.jsx  MobileMenu.jsx  Hero.jsx  About.jsx  Statement.jsx
    Services.jsx  Gallery.jsx  Lightbox.jsx  Founders.jsx  Contact.jsx  Footer.jsx
    ui/  ArtImage  Reveal (MaskLine, Reveal, ImageReveal)  ParallaxImage  Eyebrow  SocialLinks  PulseLine
  data/   site.js  services.js  gallery.js
  lib/    gsap.js  motion.js
```

Motion respects `prefers-reduced-motion`: scroll-scrubbed effects are disabled, reveals render
immediately, and the gallery falls back to a native horizontal scroller.

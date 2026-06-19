# BytePortfolio

Ek modern, animated developer portfolio — built with **React 19 + Vite + Tailwind CSS v4 + Framer Motion**. Dark "build-log" aesthetic, custom interactive bit-matrix hero, cursor glow, scroll-reveal animations, sab kuch responsive + accessible (reduced-motion respected).

---

## Quick start

```bash
# 1. dependencies install karo
npm install

# 2. dev server start (http://localhost:5173)
npm run dev

# 3. production build
npm run build

# 4. build ko locally preview karo
npm run preview
```

Bas. Node 18+ chahiye (project Node 22 par bana hai).

---

## Apna content kaise daalein (sabse important)

Saara text/data **ek hi file** mein hai → `src/data.js`. 90% personalization yahin se ho jayega, kisi component ko chhune ki zarurat nahi:

- `profile` — naam, headline, role, tagline, location, status, email, resume link, social links (GitHub/LinkedIn/X)
- `stats` — hero ke neeche wale numbers
- `about` — bio paragraphs + "build.log" timeline
- `skills` — 4 categories (Frontend / Backend / Platform / Craft), apne hisaab se edit karo
- `projects` — project cards (pehle 2 "featured" hain), title/year/tags/live+code links
- `nav` — navbar ke links

### Apni photo lagao

`src/components/About.jsx` mein ek placeholder hai (initials wala circle). Apni image `public/` mein daalo (e.g. `public/me.jpg`) aur us file mein commented `<img>` line ko uncomment kar do.

---

## Project structure

```
BytePortfolio/
├── index.html              # fonts + meta + root
├── public/
│   └── favicon.svg
├── src/
│   ├── data.js             # ← YAHAN apna content edit karo
│   ├── index.css           # design tokens (colors/fonts) + helpers
│   ├── App.jsx             # sab sections compose hote hain
│   ├── main.jsx
│   └── components/
│       ├── Navbar.jsx      # sticky nav + mobile menu
│       ├── Hero.jsx        # ByteMatrix bg + headline + stats
│       ├── ByteMatrix.jsx  # interactive 0/1 canvas grid
│       ├── CursorGlow.jsx  # pointer-follow glow
│       ├── DecodeText.jsx  # scramble→resolve text effect
│       ├── About.jsx
│       ├── Skills.jsx
│       ├── Projects.jsx
│       ├── Contact.jsx     # copy-email + mailto form
│       ├── Footer.jsx
│       ├── SectionLabel.jsx
│       └── Icons.jsx       # custom GitHub/LinkedIn/X SVGs
└── vite.config.js
```

---

## Colors / theme change karna

Saare design tokens `src/index.css` ke `@theme` block mein hain (Tailwind v4 style). Accent color, background, fonts — sab wahin se badal sakte ho. Example: `--color-accent` change karoge to poori site ka highlight color update ho jayega.

Tailwind utility classes me directly use kar sakte ho: `text-accent`, `bg-bg`, `text-muted`, `font-display`, etc.

---

## Deploy

Build static hai, kahin bhi deploy ho jayega:

- **Vercel / Netlify** — repo connect karo, framework "Vite" auto-detect ho jayega. Build command `npm run build`, output dir `dist`.
- **GitHub Pages / koi bhi static host** — `npm run build` chalao aur `dist/` folder upload kar do.

---

## Tech stack

| Cheez            | Version |
|------------------|---------|
| React            | 19      |
| Vite             | 8       |
| Tailwind CSS     | 4       |
| Framer Motion    | 12      |
| lucide-react     | 1       |

Animations Framer Motion se, icons lucide-react se (brand icons custom SVG mein kyunki lucide v1 ne trademark wajah se hata diye). Sab `prefers-reduced-motion` respect karta hai.

Happy building! 🚀

# blendcofee

Blend Coffee & Co. — Premium Website Redesign

A premium, scroll-driven redesign of blendcoffeeandco.com.
Designed & developed by Magdio (www.magdio.com).

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build + pre-render in /dist
npm run preview   # serve the production build
```

The `dist/` folder in this zip is already built. Upload it to any static host
(Netlify drop, Vercel, Cloudflare Pages, cPanel) as-is.

## Logo

The Blend Coffee & Co. logo has been redrawn as clean vector artwork (coffee-ring
stain, typewriter "Blend", outlined "Coffee & Co." and the "mixing life with
coffee" script). Web versions live in `public/brand/`; the full logo pack (SVG +
transparent PNG, light/dark/brand colours, app icon) is in `brand-assets/`.

## Edit business details

Everything lives in `src/data/site.ts`: address, phone, email, hours, social
links, the Clover online-ordering link, the gift-card link and the four menu
categories. The "Open now / Closed now" badge reads those hours in Douglas, WY
time automatically.

## What's inside

- **Apple-style hero:** a 193-frame scroll-scrubbed sequence where a latte
  deconstructs into an exploded view (microfoam, steamed milk, espresso, cup),
  with callouts that draw in at the end. Desktop and mobile frame sets in
  `public/seq/hero/{d,m}`, loaded progressively.
- Editorial story section with parallax photography and the real Blend story.
- Menu cards (Coffee, Espresso, Signature Drinks, Breakfast & Café) linking to
  online ordering. No prices are invented; the live menu stays on Clover.
- Pinned horizontal photo gallery (desktop), infinite marquee.
- Visit Us with live open/closed status, hours, map and directions.
- Gift cards with a 3D tilt card linking to the real gift-card store.
- Sticky navigation that switches from transparent to cream, with a full-screen
  mobile menu.

## Performance

The page is pre-rendered to static HTML at build time (`scripts/prerender.mjs`),
so text and layout show before JavaScript loads, and search engines read the
full content. Latin-only self-hosted fonts with preloading, phones load half the
animation frames (data-saver loads a quarter), and portrait tablets get the
stacked phone layout. Google Lighthouse (this build): mobile 95 performance,
100 accessibility, 100 best practices, 100 SEO; desktop 100 on all four.

## Stack

React 19 + TypeScript, Vite, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis
smooth scrolling, Framer Motion, Lucide icons, self-hosted Cormorant Garamond
and Inter fonts. Respects `prefers-reduced-motion`. Includes Schema.org
CafeOrCoffeeShop data, Open Graph tags and semantic, accessible markup.

All photography and the hero animation are original AI-generated imagery made
for this redesign. Swap in real photos of the café any time by replacing the
files in `public/img` (keep the same names).

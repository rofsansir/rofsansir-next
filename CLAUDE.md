# Rofsan Sir   Next.js Site (CLAUDE.md / AGENTS.md)

Premium redesign of **rofsansir.com** (Cambridge CAIE O Level Bengali examiner
Rofsan Khan). Ported from `../rofsansir-prototype` (design) and
`../rofsansir-static` (content). Full plan: `PLAN.md`.

## Stack
- **Next.js 16 (App Router)** + React 19 + TypeScript (strict)
- **Tailwind CSS v4** (`@theme` in `src/app/globals.css`)   **no `tailwind.config.js`**
- **Framer Motion** (`motion`) for reveals/parallax/tilt; CSS for marquees/shimmer/blobs
- **lucide-react** icons; **clsx + tailwind-merge** via `cn()`
- Fonts via `next/font`: Bricolage Grotesque (display), Inter (body), Hind Siliguri (bn)

## Commands
```
npm run dev      # dev server (http://localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

## Conventions
- Use `@/*` alias (→ `src/*`).
- **Use design tokens, not raw hex.** Colors: `cream paper ink plum plum-2 plum-3
  marigold marigold-soft marigold-deep rose teal muted`. Shadows: `shadow-luxe shadow-card`.
  Fonts: `font-display font-body font-bengali`. Animations: `animate-marquee`,
  `animate-spin-slow`, `animate-floaty`, `animate-blob`, etc.
- Signature classes: `.noise` (grain overlay on dark sections), `.text-shimmer` (gold A\*),
  `.text-outline` (numerals 01–05), `.edge-fade` (carousel mask), `.no-scrollbar`.
- Animations always play (`MotionConfig reducedMotion="never"` in `app/layout.tsx`);
  do not add `prefers-reduced-motion` handling.
- Images: use `next/image` with explicit `width`/`height`; assets live in `public/assets/`.
- Server Components by default; add `"use client"` only where needed (motion, interactivity).

## Structure
```
src/
  app/           # routes, layout, globals.css, sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
  components/    # UI primitives + sections (Phase 1+)
  data/          # typed content ported from static site (Phase 3+)
  content/       # MDX long-form (tips/books   Phase 4)
  hooks/         # useCountUp, useTypewriter, ... (Phase 1+)
  lib/           # site.ts (config), cn.ts, utils
```

## SEO (first-class requirement   "share a link → branded card with title + description")
- Per-route `metadata` / `generateMetadata`; root defaults in `app/layout.tsx`.
- **Dynamic OG images** via `next/og` (`opengraph-image.tsx`)   per route in Phase 5.
- JSON-LD: Organization/Person/Course/FAQPage/Article/Book.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`.
- `next.config.ts` → `redirects()` for all old URLs (no SEO regression).

## Content source
Content migrated from `../rofsansir-static/resources/js/data/*.json` into `src/data/`.
Site config (name, url, contact, social, nav) in `src/lib/site.ts`.

## Phase status
See `PLAN.md` §8 and the Task List. Currently: **Phase 0 (Foundation)   in progress.**

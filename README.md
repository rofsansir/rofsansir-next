# Rofsan Sir — Next.js Redesign

Premium redesign of **[rofsansir.com](https://rofsansir.com)** — the personal education
brand of **Rofsan Khan**, Cambridge CAIE O Level Bengali Examiner & author.

Built by porting the design from [`rofsansir-prototype`](../rofsansir-prototype) and the
content from [`rofsansir-static`](../rofsansir-static) into a **Next.js 16 (App Router)**
project with SEO and social-share previews as a first-class requirement.

## Goals
- **Premium, elegant redesign** — warm cream/plum/marigold aesthetic, editorial typography
  (Bricolage Grotesque + Inter), signature effects (noise, shimmer, marquees, tilt).
- **SEO-native** — SSG, rich metadata, **dynamic OG images** (every shareable URL renders a
  branded card), JSON-LD, sitemap, robots, and permanent redirects for old URLs.
- **Full content migration** — all pages, 117 CAIE 3204 past papers, 5 books, examiner tips,
  FAQ, and resources — with the audit's P0/P1 content defects fixed along the way.

## Stack
Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react · next/font

## Getting started
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Documentation
- **[PLAN.md](./PLAN.md)** — full implementation plan (architecture, design system, route map, SEO strategy, phases, open decisions).
- **[CLAUDE.md](./CLAUDE.md)** — conventions & project guide for contributors/AI agents.

## Status
**Phase 0 (Foundation)** — scaffold, design system, fonts, base SEO, and asset migration complete.
Homepage vertical slice (Phases 1–2) in progress. See PLAN.md §8 and the task list.
# rofsansir-next

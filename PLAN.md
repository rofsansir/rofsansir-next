# Rofsan Sir   Next.js Redesign: Implementation Plan

> Transform the premium prototype (`rofsansir-prototype`) into a production Next.js site,
> migrating all content from the existing Vite SPA (`rofsansir-static`), with SEO and
> social-share previews (WhatsApp/Facebook/Twitter/LinkedIn) as a first-class requirement.

**Domain:** `rofsansir.com` · **Target dir:** `rofsansir-nextjs/` (currently empty)
**Author/brand:** Rofsan Khan   CAIE O Level Bengali Examiner & author, Lalmatia, Dhaka.

---

## 1. Goals & Success Criteria

1. **Premium redesign**   adopt the prototype's warm, editorial, "tutoring atelier" aesthetic
   (cream/plum/marigold, Bricolage Grotesque + Inter, noise textures, shimmer, count-ups,
   marquees, tilt) applied **consistently across every page**, not just the home page.
2. **SEO-native**   server-rendered/SSG HTML so every page is crawlable; rich `metadata`,
   dynamic OG images, JSON-LD, sitemap, robots. **A shared link must render a branded card
   with the correct title + description** in WhatsApp/social.
3. **Full content migration**   carry over all 15+ pages, 117 past papers, 5 books, tips,
   FAQ, videos, resources   fixing the P0 content defects found in the audit along the way.
4. **Performance & a11y**   `next/image`, font optimization, AA contrast.
5. **No SEO regression**   permanent redirects for every old URL so indexed links keep working.

---

## 2. Tech Stack & Architecture Decisions

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19 + TypeScript** | Native SSG/SSR solves the old site's "Helmet tags invisible to crawlers" problem (the whole reason for the hacky prerender script). |
| Styling | **Tailwind CSS v4** (`@theme`) | Matches the static site's stack; port the prototype's CDN config into a real build. |
| Fonts | **`next/font`**   Bricolage Grotesque (display), Inter (body), + a Bengali font (Hind Siliguri or Noto Sans Bengali; keep Kalpurush as fallback) | Zero layout shift, self-hosted, premium typography preserved; Bengali glyphs for `bn` content. |
| Animation | **Framer Motion (`motion`)** for reveals/parallax/tilt + **CSS** for marquees/shimmer/blobs (ported directly). Custom hooks (`useCountUp`, `useTypewriter`) where Framer isn't the right fit. *(Decision A1: Framer Motion   chosen.)* | Less custom code, easy to extend; marquees/shimmer stay CSS. |
| UI primitives | **shadcn/ui** (install only what's used: Button, Dialog, Accordion, Select, Tooltip) + Radix (already familiar from old site) | Accessible, unstyled-by-default, fits the custom design system. |
| Icons | **lucide-react** (matches old site; replace prototype's inline SVGs with a shared set) | Consistency, tree-shakeable. |
| Content | **Typed JSON/TS in `src/data/`** (port existing), **MDX** for long-form (book sections, tip articles) | Rich rendering for articles; data stays diff-friendly. |
| SEO images | **`next/og` (`ImageResponse`)** via `app/**/opengraph-image.tsx` | Dynamic branded OG cards per page   solves the WhatsApp-preview requirement beautifully without hand-making 100+ images. |
| Deployment | **Vercel** (recommended) or any Node host | First-class Next support; OG image gen works out of the box. |

**Output mode:** Default SSG (static export where possible). Past-paper/book/tip routes use
`generateStaticParams` so all 120+ detail pages are pre-rendered at build time → fast + crawlable.

---

## 3. The Design System (ported from the prototype)

### Colors → `@theme` tokens
```
cream      #f3ede1   page background (warm off-white)
paper      #fbf7ef   cards, nav pill, borders (lightest)
ink        #221a15   primary text, dark buttons/footer
plum       #382033   dark section backgrounds (deep aubergine)
plum-2     #4a2b42   mid plum (gradient mid)
plum-3     #5e3852   light plum (glow blobs)
marigold   #e2a039   PRIMARY accent (buttons, badges, highlights)
marigold-soft  #f1c878   hover/light gold (text on dark)
marigold-deep  #b97a23   deep gold (shimmer base, text on light)
rose       #c7654f   terracotta (sparing)
teal       #1f5550   deep teal (sparing)
muted      #73665b   muted body text / meta
```

### Typography
- **Display:** Bricolage Grotesque (500–800, opsz)   all headings, big numbers, names, quotes.
- **Body:** Inter (400–700)   body, nav, buttons, meta.
- **Bengali:** Hind Siliguri / Noto Sans Bengali   for `bn` passages (FAQ parent answers, taglines).
- Treatments: `text-balance` on H1s, `tracking-tight` headings, uppercase `tracking-widest`
  eyebrows, outline numerals (`-webkit-text-stroke`) for "01"–"05" section indices.

### Signature premium effects (port to React/CSS)
- Grain/noise overlay (`feTurbulence` SVG @ ~4.5%) on dark sections + body.
- Drifting blurred color blobs (marquee + blob keyframes).
- Shimmer gradient on "A\*", hand-drawn SVG underline squiggle.
- Glassmorphic floating nav pill + chips (`backdrop-blur`).
- Dramatic shadows: `luxe` `0 30px 80px -30px rgba(56,32,51,.35)`, `card` `0 14px 40px -20px rgba(56,32,51,.22)`.
- Motion: scroll-reveal (IntersectionObserver), count-up stats, typewriter tagline/testimonial,
  infinite marquees (pause-on-hover), 3D portrait tilt + parallax, slow-spin starburst.

### Spacing & radius
Container `max-w-7xl`, `px-4 md:px-6`, sections `py-16 md:py-24`.
Radii: `rounded-full` (pills/avatars/nav), `rounded-[2rem]…[2.6rem]` (cards/portraits).

---

## 4. Information Architecture (route map, old → new)

Consolidate, fix IA defects from the audit, and keep old URLs alive via redirects.

| New route | Source | Notes |
|---|---|---|
| `/` | HomePage (prototype) | Full prototype homepage. |
| `/about` | AboutPage | **Condensed to ~⅓** with sticky Table of Contents. |
| `/courses` | RoutinePage | Rename from `/routine`; `/courses` becomes canonical. |
| `/results` | **NEW** | Hall-of-Fame proof page (P1: substantiate A\*/3000+ claims). |
| `/books` | **NEW index** | Grid of 5 books. |
| `/books/[slug]` | 5 BookDetail pages | `/o-level-bengali-X-plus` → `/books/basic-plus` etc. |
| `/examiner-tips` | ExaminerTipsPage | Rename from `/tips`; acts as the blog index. |
| `/examiner-tips/[slug]` | tip articles | 8 articles via MDX. |
| `/past-papers` | **NEW index** | Browse/filter 117 CAIE 3204 papers by year & paper type (no index existed before). |
| `/past-papers/[slug]` | PastPaperDetailPage | Static-generated. |
| `/resources` | ResourcesPage | **Fix the 6 broken `#` links** (P0). |
| `/faq` | FAQPage | Consolidated student + parent FAQ. |
| `/class/8`, `/class/9`, `/class/10` | Class 8/9/10 pages | Group under `/class`; **promote out of footer-only** (IA fix). |
| ~~`/fees`~~ | ~~NEW~~ | **Dropped** — no pricing page. |
| `/contact` | ContactPage | Fix "O & A Level" → "O Level" (P0). |
| `/privacy-policy`, `/terms-of-service` | same | Ported. |

**Permanent redirects** (`next.config.ts` → `redirects()`) to preserve SEO:
`/routine→/courses`, `/tips→/examiner-tips`, `/tips/:id→/examiner-tips/:id`,
`/courses→/courses` (alias), `/class-8→/class/8` (+ `class-viii`), `/class-9→/class/9` (+ ix),
`/class-10→/class/10` (+ x), `/o-level-bengali-*-plus→/books/*`.

**Nav (new):** Home · About · Courses · Results · Books · Examiner Tips · Resources · Contact
+ sticky "Book a Free Class" CTA (→ admission form). Mobile: same, hamburger.

---

## 5. SEO Strategy (core requirement)

This is the heart of the "share a link → see title + description" goal.

### 5.1 Metadata (App Router Metadata API)
- Root `app/layout.tsx` exports a **default `metadata`** + `viewport`: title template
  (`%s · Rofsan Sir`), description, canonical, themeColor, authors, keywords, OG/Twitter defaults.
- Every page exports `metadata` (static) or `generateMetadata` (dynamic for books/papers/tips)
  resolving **unique title + description + keywords** from the ported `seo.json` + content JSON.
- `alternates.canonical` on every route. `openGraph`/`twitter` `type`, `url`, `siteName`,
  `locale` (`en_US` + `bn_BD` `alternate`), `images`.

### 5.2 Dynamic OG images (`next/og`)   the WhatsApp-preview win
- `app/opengraph-image.tsx` (site default) + per-section `opengraph-image.tsx` /
  `opengraph-image.tsx` with `alt`, `size: 1200×630`.
- Each renders a **branded card**: cream/plum bg, marigold accent, Rofsan Sir logo, the page
  **title + description** baked in (matches the prototype aesthetic). Dynamic routes
  (books/papers/tips) generate a card from their data → every one of 120+ shareable URLs
  gets a bespoke preview. Replaces the old hand-built JPG OG set.

### 5.3 Structured data (JSON-LD)
Port & expand the old `StructuredData.tsx` into route-level schema:
- `EducationalOrganization` + `Person` (Rofsan Khan) on root.
- `Course` (O Level Bengali 3204, in-person Dhaka) on `/courses`.
- `FAQPage` on `/faq` (auto-built from `faq.json`).
- `Article` + `BreadcrumbList` on tips/articles; `Book` on `/books/[slug]`;
  `ItemList` on past-papers & books indexes.
- Emit via `<script type="application/ld+json">` (rendered server-side → crawlable).

### 5.4 Crawl infrastructure
- `app/sitemap.ts`   auto-include all static routes + dynamic (books/tips/papers) from JSON.
- `app/robots.ts`   allow all, point to `https://rofsansir.com/sitemap.xml`.
- `app/manifest.ts`   PWA manifest (fix the old "MyWebSite" placeholder name).
- Favicon set ported into `app/` (`icon.svg`, `apple-icon.png`, etc.) and `public/`.

### 5.5 Performance & UX signals (Core Web Vitals)
- `next/image` everywhere with explicit `width/height`; optimize the large PNGs/JPGs
  (several are 0.4–1.5 MB in the source).
- `next/font` self-host (no Google Fonts flash).
- Prefetch on internal links; RSC + SSG for instant nav.
- `<Image priority>` on hero LCP; lazy-load below the fold.

---

## 6. Data & Content Migration

Port JSON/TS from `rofsansir-static/resources/js/data/` → `src/data/` (typed):

| File | Contents | Destination |
|---|---|---|
| `seo.json` | Per-route title/desc/keywords | `src/data/seo.ts` → fold into per-route `metadata` |
| `bookData.json` | 5 books, full sections | `src/data/books.ts` (+ MDX bodies) |
| `pastPapers.json` | 117 papers (3204, 2004–2025) | `src/data/past-papers.ts` |
| `faq.json` | 11 student + 10 parent Q&As | `src/data/faq.ts` |
| `videoData.json` | 10 YouTube videos | `src/data/videos.ts` |
| `blogContent.json` | 8 examiner-tip articles | `src/content/tips/*.mdx` |
| Inline (BOOKS, RESOURCES, QUIZ, testimonials, programs, stats) | → typed data files | `src/data/*.ts` |

**Bengali content:** keep `lang` attrs correct; load Bengali font; ensure RTL/typography fine.

---

## 7. Asset Migration

Copy from both folders → `public/assets/` (and `public/logos/`):

- Logos: `brand-logo.png`, `brand-logo-white.svg`, board logos (Cambridge/Edexcel/Elites).
- Photos: `teacher/*`, `students/*`, `class-banner/*`, `books/1–5.png`, `tips/1–8.jpg`.
- **Past-paper PDFs** (`assets/past-paper/<year>/*.pdf`, ~80 files) → `public/assets/past-paper/`.
- **Premium study PDFs** (`assets/pdfs/*.pdf`) → `public/assets/pdfs/`.
- Bengali font `kalpurush.ttf` (fallback).
- Optimize all large raster images (run through `sharp`/Squoosh → WebP/AVIF via `next/image`).
- **P0 fix:** replace fragile relative `../assets/...` paths with absolute `/assets/...`.

---

## 8. Implementation Phases

> Each phase = shippable increment. Tracked in the project Task List.

### Phase 0   Foundation (no UI yet)
- Init Next.js 15 (App Router, TS, Tailwind v4, ESLint, Prettier w/ tailwind plugin).
- Port design tokens to `@theme`; wire `next/font` (Bricolage + Inter + Bengali).
- Project structure (`src/app`, `src/components`, `src/data`, `src/content`, `src/lib`, `src/hooks`).
- Base SEO infra: root layout + default metadata + `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`.
- Copy + optimize all assets into `public/`.
- Git init, `.gitignore`, `CLAUDE.md`/`README.md`.

### Phase 1   Design-system layer & shared components
- Navbar (glass pill, scroll state, mobile menu), Footer.
- Primitives: Button, Badge, Pill, Card, Section, Eyebrow, Stat, Avatar, Marquee, Reveal,
  NoiseSection, BlobBackground, Starburst, ShimmerText.
- Hooks: `useScrollReveal`, `useCountUp`, `useTypewriter`, `useTilt`.
- Layout: shared `<PageShell>` (nav + footer + floating WhatsApp/back-to-top).

### Phase 2   Homepage (port the prototype to React)
- Hero, Trust strip, Achievement ticker, Video/About teaser, Hall of Fame, Gallery,
  Testimonials, Books, Admission CTA   1:1 with the prototype, premium effects intact.

### Phase 3   Core content pages (apply the design system)
- About (condensed + sticky ToC), Courses, Contact, FAQ (accordion), Resources (fixed links),
  Class 8/9/10, Privacy, Terms. Each with its own `metadata` + JSON-LD.

### Phase 4   Dynamic/library pages (SSG via generateStaticParams)
- `/books` index + `/books/[slug]` (5).
- `/past-papers` index (filter by year/paper) + `/past-papers/[slug]` (117).
- `/examiner-tips` index + `/examiner-tips/[slug]` (8 MDX).
- Per-page `generateMetadata`, `opengraph-image`, JSON-LD, breadcrumbs.

### Phase 5   SEO, polish & launch readiness
- Dynamic OG images for every section/route.
- Full JSON-LD pass; sitemap/robots verification.
- Image/perf audit (Lighthouse), a11y pass (contrast, focus).
- Redirects for all old URLs; 404 page; analytics (Plausible/Umami   P2).
- New `/results` page (live). No `/fees` page.

### Phase 6   Content/UX fixes folded in (from audit)
- **P0:** fix 6 `#` resource links; replace placeholder YouTube IDs; fix Contact "O & A Level";
  fix relative image paths; enrollment flow (no pricing page).
- **P1:** substantiate claims on `/results` (live); consolidate FAQ; trim About.
- **P2:** a11y (≥14px nav, contrast, bilingual glosses, lang attrs), lead capture, analytics.

---

## 9. Open Decisions (need your input)

- ~~**A1   Animation:** Framer Motion (chosen). Marquees/shimmer/blobs stay CSS.~~ ✅
- ~~**A2   Scope:** Homepage vertical slice first (Phase 0→2), then scale to all pages.~~ ✅
- ~~**A3 — Content I'll need from you:**~~ Mostly resolved. Remaining: the **correct YouTube
  video ID** for the homepage teaser (currently `tAlxNZrj7xU`).
- **A4   Deployment:** Vercel (recommended) or your existing host? (Affects OG image + edge setup.)
- **A5   Bengali UX:** bilingual toggle, or keep current mixed inline approach?

---

## 10. Progress

Tracked in the Task List (`TaskList`). Each phase is a task; status updates as work lands.

- ✅ **Phase 0   Foundation** (Next 16 scaffold, design tokens, next/font, base SEO, asset migration)
- ✅ **Phase 1   Design-system layer** (primitives, motion hooks, Navbar/Footer/FloatingActions)
- ✅ **Phase 2   Homepage** (prototype ported   Hero, Trust, Ticker, About teaser, Hall of Fame,
  Gallery, Testimonials, Books, Admission CTA; JSON-LD; build green; live at `localhost:3000`)
- ⏳ **Phases 3–6**   pending your review of the homepage slice.

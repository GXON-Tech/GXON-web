# AGENTS.md — GXON AGRO Website Project Instructions

> This file is the single source of truth for all AI coding agents working on this project.
> Read this file completely before making any changes. Every rule here exists because
> violating it has caused problems in the past.

## 1. Project Overview

**What**: GXON AGRO official website — a B2B industrial manufacturer site for grain drying equipment.
**Who**: Global grain processors, rice mills, farmers, grain traders in 30+ countries (Southeast Asia, Africa, South Asia, Latin America).
**Language**: All user-facing content is in **English**. Code comments and commit messages in English.
**Domain**: https://www.gxonagro.com/ (production target)

**Core Products**:
- Mobile Batch Grain Dryer (5–20 TPD)
- Fixed Batch Grain Dryer (5–30 TPD)
- Continuous Drying Tower (100–500 TPD)
- Complete Grain System (cleaning + drying + handling + storage)
- Multi-Fuel Heating Systems (diesel, rice husk, biomass, natural gas, wood, coal)

## 2. Tech Stack

| Item | Value | Notes |
|------|-------|-------|
| Architecture | Static HTML/CSS/JS | No build tools, no frameworks, no bundlers |
| HTML | Semantic HTML5 | Use `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<figure>` |
| CSS | Inline `<style>` per page | CSS variables in `:root`, no external CSS files |
| JS | Vanilla JS, inline `<script>` | No jQuery, no React, no Vue |
| Fonts | Self-hosted TTF in `./_shared/fonts/` | Loaded via `@font-face` |
| Images | `assets/` directory, relative paths | No CDN URLs, no base64 in authoring |
| Hosting | GitHub Pages | Deploy from `main` branch root |

**Forbidden**: React, Vue, Angular, jQuery, Tailwind, Bootstrap, any npm dependency, any build step.

## 3. Directory Structure

```
gxon-agro-web/
├── AGENTS.md              ← You are here. AI project instructions.
├── README.md              ← Human-readable project overview.
├── .gitignore
├── index.html             ← Homepage (primary entry point).
├── pages/                 ← Subpages (future development).
│   ├── solutions.html
│   ├── products.html
│   ├── technology.html
│   ├── resources.html
│   ├── company.html
│   └── contact.html
├── _shared/
│   ├── fonts/             ← BigShoulders, WorkSans, JetBrainsMono (TTF).
│   └── js/                ← Shared JS libraries (e.g., echarts.min.js if needed).
├── assets/                ← All images: logo, hero, products, projects.
├── docs/
│   ├── website-blueprint.md   ← Full sitemap and section specifications.
│   └── brand-visual-spec.md   ← Complete brand visual specification.
└── .github/
    └── workflows/
        └── deploy.yml     ← GitHub Pages auto-deploy on push to main.
```

**Rules**:
- All paths must be **relative** (e.g., `./_shared/fonts/`, `assets/hero.jpg`). Never use absolute paths starting with `/`.
- When creating a new subpage in `pages/`, copy the `<head>`, `<style>`, header, and footer from `index.html` to maintain consistency.
- Images go in `assets/`, fonts in `_shared/fonts/`, shared JS in `_shared/js/`. Never mix these.

## 4. Color System

All colors are defined as CSS variables in `:root`. **Never hardcode hex values in CSS rules** — always use `var(--c-*)`.

### Brand Colors (extracted from Logo and machinery)

| Variable | Hex | Usage | Contrast Note |
|----------|-----|-------|---------------|
| `--c-primary` | `#084F32` | CTA buttons, highlights, numbers, product labels | GXON Industrial Green — from dryer green |
| `--c-primary-light` | `#0B6B45` | Hover states for primary | — |
| `--c-primary-dark` | `#053D24` | Pressed states for primary | — |
| `--c-primary-bg` | `#EAF3EF` | Light tint background for selected/active states | — |
| `--c-orange` | `#F59A23` | CTA buttons (hero, final form), accent highlights | Harvest Orange — from Logo wheat ears |
| `--c-orange-dark` | `#D4841A` | Hover/pressed for orange | — |
| `--c-orange-bg` | `#FFF5E6` | Light tint background for orange elements | — |
| `--c-dark` | `#24282D` | Header text, footer background, section titles | Dark Engineering Gray |
| `--c-silver` | `#BFC3C7` | Industrial background textures, borders | Metallic Silver — from Logo |
| `--c-tech` | `#00A86B` | Technology tags, card color bars ONLY | NOT a general-purpose color |

### Background Colors (Aluminum Plate Tones)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--c-n8` / `--c-white` | `#E2E5E8` | Primary page background (aluminum gray) |
| `--c-n7` / `--c-bg-alt` | `#D6D9DC` | Secondary background, section dividers |

### Color Proportion Rule (Website Overall)

The website must maintain this visual color ratio:
- **White / Aluminum Gray**: 55% (backgrounds, card surfaces)
- **Dark Gray**: 20% (header, footer, titles)
- **Industrial Green**: 15% (product areas, interactive elements)
- **Orange**: 5% (CTAs, highlights only)
- **Silver**: 5% (industrial textures, borders)

### Color Usage Rules

1. **Homepage CTA buttons use `--c-orange`** (not green). This is a hard constraint.
2. **Avoid large green color blocks.** Green is for product labels, tags, and small interactive elements only.
3. **Title text must NOT use gradient colors.** Use solid `--c-dark` or `--c-n1`.
4. **All text/background combinations must pass WCAG AA** (contrast ratio ≥ 4.5:1).
5. **Selected/active button style**: light tint background (`var(--c-primary-bg)`), border (`var(--c-primary)`), text color (`var(--c-primary)`), `font-weight: 700`. Do NOT use solid fill for selected states.
6. **Tech Green (`--c-tech`) is restricted**: only for Technology section tags and card color bars. Never use it as a button color or large background.

### Full CSS Variable Reference

```css
:root {
  /* Primary — Industrial Green */
  --c-primary: #084F32;
  --c-primary-light: #0B6B45;
  --c-primary-dark: #053D24;
  --c-primary-bg: #EAF3EF;

  /* Tech Green — restricted to technology tags */
  --c-tech: #00A86B;
  --c-tech-light: #1EC488;
  --c-tech-dark: #008A58;
  --c-tech-bg: #E0F5EC;

  /* Accent — Harvest Orange */
  --c-orange: #F59A23;
  --c-orange-light: #FFB347;
  --c-orange-dark: #D4841A;
  --c-orange-bg: #FFF5E6;

  /* Dark Engineering Gray */
  --c-dark: #24282D;
  --c-dark-light: #3A3F45;

  /* Metallic Silver */
  --c-silver: #BFC3C7;
  --c-silver-light: #D5D8DB;
  --c-silver-bg: #F0F1F3;

  /* Backgrounds — Aluminum Plate Tones */
  --c-n8: #E2E5E8;   /* primary background */
  --c-n7: #D6D9DC;   /* secondary background */
  --c-white: #E2E5E8; /* alias for primary background */

  /* Neutral Scale */
  --c-n1: #1A1A1A;   /* darkest text */
  --c-n2: #4A4A4A;   /* body text */
  --c-n3: #6B6B6B;   /* muted text */
  --c-n4: #9B9B9B;   /* placeholder */
  --c-n5: #B8BBC0;   /* disabled */
  --c-n6: #C8CBD0;   /* borders */

  /* Semantic */
  --c-success: #084F32;
  --c-warning: #F59A23;
  --c-error: #C0392B;
  --c-info: #4A6FA5;

  /* Layout */
  --max-w: 1200px;
  --header-h: 72px;

  /* Radius */
  --r-sm: 4px;
  --r-md: 8px;
  --r-lg: 12px;

  /* Shadows */
  --sh-sm: 0 1px 3px rgba(0,0,0,0.08);
  --sh-md: 0 4px 12px rgba(0,0,0,0.10);
  --sh-lg: 0 8px 24px rgba(0,0,0,0.12);
  --sh-xl: 0 16px 48px rgba(0,0,0,0.16);
}
```

## 5. Typography

```css
--font-body: 'WorkSans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: 'BigShoulders', 'Inter', sans-serif;
--font-mono: 'JetBrainsMono', 'Courier New', monospace;
```

| Font | Usage | Weights Available |
|------|-------|-------------------|
| BigShoulders | H1, H2, H3 headings, logo text, card titles | 400 (Regular), 700 (Bold) |
| WorkSans | Body text, paragraphs, buttons, form labels, nav | 400, 400 Italic, 700 |
| JetBrainsMono | Code snippets, language toggle, spec labels | 400, 700 |

**Rules**:
- Body font-size: 16px (`html { font-size: 16px; }`), line-height: 1.7.
- Headings use `font-family: var(--font-heading)` with `font-weight: 700`.
- Section titles (`.section-head h2`) are 32–36px, uppercase eyebrow labels above.
- Body text color: `var(--c-n1)` or `var(--c-n2)`. Muted text: `var(--c-n3)`.
- **Never use gradient text.** Title text is always a solid color.

## 6. Component Patterns

### Buttons

```css
.btn { /* base: inline-flex, 12px 28px padding, 15px font, 700 weight, r-md */ }
.btn-primary { background: var(--c-primary); color: #fff; }       /* Product/form actions */
.btn-cta { background: var(--c-orange); color: var(--c-dark); }   /* Hero, final CTA ONLY */
.btn-outline { background: transparent; border: 2px solid var(--c-n5); } /* Secondary */
.btn-text { background: transparent; color: var(--c-orange-dark); }      /* Text links */
.btn-lg { padding: 16px 36px; font-size: 17px; }
.btn-sm { padding: 8px 18px; font-size: 13px; }
.btn-block { width: 100%; }
```

**Rules**:
- Homepage hero CTA = `.btn-cta` (orange). Never green.
- Product "View Products" button = `.btn-primary` (green).
- Hover: `translateY(-2px)` + colored shadow. Transition: `all 0.2s`.

### Cards

Product cards, Why-GXON cards, System step cards all share this pattern:
- White or light surface (`#fff` on aluminum background)
- `border-radius: var(--r-md)` or `var(--r-lg)`
- `box-shadow: var(--sh-sm)`, hover → `var(--sh-md)` or `var(--sh-lg)`
- `transition: all 0.3s`
- Tag/label in upper-left corner with colored background

### Forms

- Input/select: `border: 1px solid var(--c-n6)`, `border-radius: var(--r-sm)`, `padding: 12px 16px`
- Focus: `border-color: var(--c-primary)`, no outline glow
- Required fields marked with `*` in `var(--c-orange-dark)`
- Submit button: `.btn-cta .btn-lg .btn-block`

### Section Head Pattern

Every major section uses this structure:
```html
<div class="section-head reveal">
  <div class="eyebrow">UPPERCASE LABEL</div>
  <h2>Section Title</h2>
  <p class="desc">Section description text.</p>
</div>
```
- Eyebrow: uppercase, letter-spacing, `var(--c-tech)` or `var(--c-orange)`, 12–13px
- H2: `var(--font-heading)`, 32–36px, `var(--c-dark)`
- Desc: `var(--c-n3)`, 15–16px

## 7. Homepage Structure (Blueprint)

The homepage (`index.html`) follows this 7-section structure. See `docs/website-blueprint.md` for full details.

| # | Section | ID | Purpose |
|---|---------|----|---------|
| 1 | Hero Banner | `#hero` | H1 + subtitle + 2 CTAs + product keyword pills + trust bar |
| 2 | Solution Finder | `#solutions` | 3-step selector (crop → capacity → fuel) + recommendation result |
| 3 | Product Portfolio | `#products` | 4 product cards with TPD ranges + "View Products" CTA |
| 4 | Why GXON | `#why` | 6 advantage cards (Multi-Fuel, Flexible Capacity, Complete Solution, Engineering Design, Global Experience, Technical Support) |
| 5 | Complete Post-Harvest System | `#system` | 4-step flow (Cleaning → Drying → Handling → Storage) with equipment labels |
| 6 | Global Solutions | `#projects` | Project case cards from 30+ countries |
| 7 | Final CTA | `#contact` | Form with 5 fields: Country, Crop, Capacity, Fuel, WhatsApp |

**Navigation**: Home | Solutions | Products | Technology | Resources | Company | Contact

## 8. SEO and AI Search Requirements

Every page must include in `<head>`:
- `<title>` with primary keywords (brand + product type + key benefit)
- `<meta name="description">` with capacity range and service area
- `<link rel="canonical">` to the production URL
- `<link rel="alternate" hreflang="...">` for en, zh, es, fr, x-default
- Open Graph tags (`og:type`, `og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags
- JSON-LD structured data (at minimum: Organization, WebSite)

**AI Search optimization** (for ChatGPT/Gemini discovery):
- Include `<meta name="ai-content-type">`, `<meta name="ai-product-category">`, `<meta name="ai-target-audience">`, `<meta name="ai-geography">`
- Add FAQPage JSON-LD with common questions about grain drying
- Use semantic HTML (`<section>`, `<article>`, proper heading hierarchy)
- Include capacity ranges, fuel types, grain types in visible text (not just images)

## 9. Coding Conventions

### CSS
- Always use `var(--c-*)` for colors. **Never hardcode hex values** in CSS rules.
- Use `var(--font-*)` for font families. Never write raw font names.
- Use `var(--r-*)` for border-radius, `var(--sh-*)` for shadows.
- Class naming: BEM-lite (`.component-name`, `.component-name-element`, `.component-name--modifier`).
- Mobile-first responsive: base styles for mobile, `@media (min-width: 768px)` for tablet/desktop.
- Use `flexbox` and `CSS Grid` for layout. Avoid `float` and `position: absolute` for layout.
- Animations: use `transition: all 0.2s` or `0.3s` for hover states. Use `@keyframes` for entrance animations.

### HTML
- `lang="en"` on `<html>`.
- All images must have `alt` attributes describing the content.
- Use `<figure>` + `<figcaption>` for images that need captions.
- Form inputs must have associated `<label>` elements.
- Use `aria-label` on icon-only buttons.

### JavaScript
- Vanilla JS only. No dependencies.
- Wrap in IIFE or use `defer` attribute on `<script>` tags.
- No `console.log` in production code.
- Event listeners use `addEventListener`, not inline `onclick` (except for simple demo interactions).

## 10. Content Guidelines

- **Tone**: Professional, technical, benefit-focused. No marketing fluff ("world-class", "cutting-edge").
- **Numbers are specific**: "5–500 TPD", "30+ countries", "6 fuel types", "24 hours response".
- **Product names**: Always use full name first ("Mobile Batch Grain Dryer"), abbreviations after ("Mobile Dryer").
- **Capacity**: Always include TPD (tons per day) range.
- **Fuel types**: diesel, rice husk, biomass, natural gas, wood, coal (all 6 must be listed consistently).

## 11. Out of Scope (Do NOT Do These)

- Do NOT add a CMS, database, or server-side code.
- Do NOT add multi-language content (hreflang tags are for future planning only; actual translated content is out of scope for MVP).
- Do NOT add e-commerce functionality (cart, payment, checkout).
- Do NOT add user accounts or authentication.
- Do NOT use any CSS framework (Tailwind, Bootstrap, Bulma, etc.).
- Do NOT use any JavaScript framework or library.
- Do NOT use CDN URLs for fonts, JS, or CSS. All assets must be self-hosted.
- Do NOT create separate CSS files. Styles are inline in each HTML page's `<style>` tag.
- Do NOT use green for homepage hero CTA buttons. Hero CTA is always orange.
- Do NOT use gradient text for titles.
- Do NOT change the color proportion ratio (55% white/gray, 20% dark, 15% green, 5% orange, 5% silver).

## 12. Development Workflow

### Running locally
```bash
# From the project root:
npx serve . -l 3210
# Or any static file server. Python also works:
# python3 -m http.server 3210
```
Open http://localhost:3210/ in browser.

### Git workflow
```bash
# Create a feature branch
git checkout -b feature/solutions-page

# Make changes, then commit with conventional commits
git add .
git commit -m "feat: add solutions page with grain dryer comparison"

# Push and create PR
git push origin feature/solutions-page
```

**Commit message format** (Conventional Commits):
- `feat:` new feature (e.g., `feat: add products page`)
- `fix:` bug fix (e.g., `fix: correct mobile nav toggle on iOS`)
- `style:` visual only (e.g., `style: adjust CTA button padding`)
- `docs:` documentation (e.g., `docs: update AGENTS.md color rules`)
- `refactor:` code restructure without behavior change
- `chore:` maintenance (e.g., `chore: update font files`)

### Deployment
- Push to `main` branch → GitHub Actions auto-deploys to GitHub Pages.
- Production URL: https://[username].github.io/gxon-agro-web/ (until custom domain is configured).
- To configure custom domain: GitHub repo → Settings → Pages → Custom domain → `www.gxonagro.com`.

## 13. When Adding a New Page

1. Copy `index.html` as the base template.
2. Update `<title>`, `<meta description>`, canonical URL, OG tags.
3. Keep the full `<style>` block — do not remove CSS variables.
4. Keep the header and footer exactly as-is (only the nav `active` state changes).
5. Replace the main content area (`<main>` or equivalent).
6. Add page-specific JSON-LD (e.g., `BreadcrumbList`, `Product` with details).
7. Test at http://localhost:3210/pages/[page-name].html.
8. Verify all internal links point to correct relative paths.

## 14. Key Files Reference

| File | Purpose |
|------|---------|
| `index.html` | Homepage — the primary working file |
| `docs/website-blueprint.md` | Full sitemap and section-by-section specifications |
| `docs/brand-visual-spec.md` | Complete brand visual specification (10 chapters) |
| `_shared/fonts/` | 7 TTF font files (BigShoulders, WorkSans, JetBrainsMono) |
| `assets/` | Logo, hero image, product images, project case images |
| `.github/workflows/deploy.yml` | GitHub Pages auto-deploy configuration |

---

**Last updated**: 2026-07-19
**Maintained by**: GXON AGRO design team
**AI agents**: Read this file before every task. If something is unclear, check `docs/` for detailed specs.

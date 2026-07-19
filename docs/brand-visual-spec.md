# GXON AGRO Brand Visual Specification

> Complete visual design system for the GXON AGRO website.
> All colors must be traceable to Logo, machinery, or their harmonious derivatives.

## 1. Color System

### Brand Colors

| Color Name | Hex | CSS Variable | Source | Usage |
|------------|-----|--------------|--------|-------|
| Industrial Green | `#084F32` | `--c-primary` | Dryer green | CTA (product), highlights, numbers, product labels |
| Harvest Orange | `#F59A23` | `--c-orange` | Logo wheat ears | Hero CTA, final form button, accent highlights |
| Dark Engineering Gray | `#24282D` | `--c-dark` | Industrial machinery | Header, footer, section titles |
| Metallic Silver | `#BFC3C7` | `--c-silver` | Logo metal texture | Industrial backgrounds, borders, product display |
| Tech Green | `#00A86B` | `--c-tech` | Sci-tech emerald | Technology tags, card color bars ONLY |
| Slate Dark | `#1F2933` | `--c-aux` | Slate tone | Auxiliary color (hover states, pressed states) |

### Background Colors (Aluminum Plate Tones)

| Color Name | Hex | CSS Variable | Usage |
|------------|-----|--------------|-------|
| Aluminum Gray | `#E2E5E8` | `--c-n8` / `--c-white` | Primary page background |
| Darker Aluminum | `#D6D9DC` | `--c-n7` / `--c-bg-alt` | Secondary background, dividers |

### Color Variants (for each brand color)

Each brand color has 4 variants:
- **Base**: The main color
- **Light** (`-light`): Hover states, lighter accents
- **Dark** (`-dark`): Pressed states, darker accents
- **BG** (`-bg`): Light tint background (10:1 ratio with base)

### Color Proportion

The website must maintain this visual ratio:
- White / Aluminum Gray: **55%**
- Dark Gray: **20%**
- Industrial Green: **15%**
- Orange: **5%**
- Silver: **5%**

### Hard Constraints

1. All colors must be marked with Hex codes, not just color names.
2. All text/background combinations must pass **WCAG AA** (contrast ratio >= 4.5:1).
3. Homepage hero CTA buttons must use **orange** (`--c-orange`), not green.
4. Avoid large green color blocks.
5. Title text must NOT use gradient colors.
6. Tech Green (`--c-tech`) is restricted to Technology section tags and card color bars only.

## 2. Typography

| Font | CSS Variable | Usage | Weights |
|------|--------------|-------|---------|
| BigShoulders | `--font-heading` | H1-H3, logo, card titles | Regular (400), Bold (700) |
| WorkSans | `--font-body` | Body text, buttons, forms, nav | Regular (400), Italic (400), Bold (700) |
| JetBrainsMono | `--font-mono` | Code, language toggle, spec labels | Regular (400), Bold (700) |

**Rules**:
- Base font-size: 16px, line-height: 1.7
- Section titles: 32-36px, BigShoulders Bold
- Body text: 15-16px, WorkSans Regular, color `--c-n1` or `--c-n2`
- Muted text: 13-14px, color `--c-n3`
- Eyebrow labels: 12-13px, uppercase, letter-spacing 0.08em

## 3. Buttons

| Class | Background | Text | Border | Usage |
|-------|-----------|------|--------|-------|
| `.btn-primary` | `--c-primary` | `#fff` | none | Product actions, form submits |
| `.btn-cta` | `--c-orange` | `--c-dark` | none | Hero CTA, final form button |
| `.btn-outline` | transparent | `--c-n1` | `2px solid --c-n5` | Secondary actions |
| `.btn-text` | transparent | `--c-orange-dark` | none | Inline text links |

**Sizes**: `.btn-lg` (16px 36px), default (12px 28px), `.btn-sm` (8px 18px)

**Hover**: `translateY(-2px)` + colored shadow, `transition: all 0.2s`

**Selected button style** (Solution Finder):
- `background: var(--c-primary-bg)` (light tint)
- `border: 1.5px solid var(--c-primary)`
- `color: var(--c-primary)`
- `font-weight: 700`
- Do NOT use solid fill for selected states.

## 4. Tags & Labels

| Tag Type | Background | Text | Usage |
|----------|-----------|------|-------|
| Product tag | `--c-tech-bg` | `--c-tech` | Product card type labels (MOBILE, BATCH, TOWER, SYSTEM) |
| Eyebrow | transparent | `--c-tech` or `--c-orange` | Section heading labels |
| Badge | `--c-orange-bg` | `--c-orange-dark` | Hero highlight badges |

## 5. Forms

- Input border: `1px solid var(--c-n6)`, radius `--r-sm` (4px)
- Input padding: `12px 16px`
- Focus state: `border-color: var(--c-primary)`, no outline glow
- Required fields: `*` in `--c-orange-dark`
- Submit button: `.btn-cta .btn-lg .btn-block`

## 6. Cards

- Surface: white `#fff` on aluminum background
- Border radius: `--r-md` (8px) or `--r-lg` (12px)
- Shadow: `--sh-sm` default, `--sh-md` on hover
- Transition: `all 0.3s`
- Tag in upper-left corner with colored background

## 7. Spacing & Layout

- Max content width: `1200px` (`--max-w`)
- Header height: `72px` (`--header-h`)
- Container padding: `0 24px`
- Section vertical padding: `80-120px`
- Card gap: `24px` (grid), `16px` (flex)

## 8. Radius & Shadow

| Token | Value | Usage |
|-------|-------|-------|
| `--r-sm` | 4px | Inputs, small buttons, tags |
| `--r-md` | 8px | Buttons, cards |
| `--r-lg` | 12px | Large cards, modals |
| `--sh-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Cards default |
| `--sh-md` | `0 4px 12px rgba(0,0,0,0.10)` | Cards hover |
| `--sh-lg` | `0 8px 24px rgba(0,0,0,0.12)` | Modals, dropdowns |
| `--sh-xl` | `0 16px 48px rgba(0,0,0,0.16)` | Hero overlays |

## 9. Grid System

- Desktop: CSS Grid, `repeat(auto-fit, minmax(280px, 1fr))` for product cards
- Mobile-first: base styles for mobile, `@media (min-width: 768px)` for tablet+
- Breakpoints: 768px (tablet), 1024px (desktop), 1200px (max width)

## 10. Navigation

- Fixed header, `72px` height, aluminum background with `backdrop-filter: blur(10px)`
- Logo left, nav center, CTA right
- Nav items: 14px, font-weight 700, `8px 16px` padding
- Active/hover: `background: var(--c-n7)`, `color: var(--c-primary)`
- Mobile: hamburger toggle, slide-down menu

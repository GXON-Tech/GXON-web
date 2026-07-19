# GXON AGRO Website

> Global Grain Drying Solution Provider — official website

## Quick Start

```bash
# Clone the repo
git clone https://github.com/[your-username]/gxon-agro-web.git
cd gxon-agro-web

# Run locally (any static server works)
npx serve . -l 3210
# Or: python3 -m http.server 3210

# Open in browser
open http://localhost:3210/
```

## Project Structure

```
gxon-agro-web/
├── AGENTS.md              # AI agent instructions (read this first!)
├── index.html             # Homepage
├── pages/                 # Subpages (Solutions, Products, Technology, etc.)
├── _shared/
│   ├── fonts/             # BigShoulders, WorkSans, JetBrainsMono (TTF)
│   └── js/                # Shared JS libraries
├── assets/                # Images: logo, hero, products, projects
├── docs/                  # Website Blueprint & Brand Visual Spec
└── .github/workflows/     # GitHub Pages auto-deploy
```

## Tech Stack

- **Static HTML/CSS/JS** — no build tools, no frameworks
- **Self-hosted fonts** — TTF files in `_shared/fonts/`
- **CSS variables** — all colors, fonts, spacing defined in `:root`
- **GitHub Pages** — free hosting, auto-deploy on push to `main`

## Key Documents

| Document | Description |
|----------|-------------|
| [AGENTS.md](AGENTS.md) | Project instructions for AI coding agents |
| [docs/website-blueprint.md](docs/website-blueprint.md) | Full sitemap and section specifications |
| [docs/brand-visual-spec.md](docs/brand-visual-spec.md) | Brand colors, typography, components |

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Industrial Green | `#084F32` | Product buttons, highlights, numbers |
| Harvest Orange | `#F59A23` | Hero CTA, final form button |
| Dark Engineering Gray | `#24282D` | Header, footer, titles |
| Metallic Silver | `#BFC3C7` | Industrial textures, borders |
| Aluminum Gray | `#E2E5E8` | Page background |

## Development

### Git Workflow

```bash
# Create a feature branch
git checkout -b feature/products-page

# Commit with conventional commits
git commit -m "feat: add products page with dryer comparison table"

# Push and create PR
git push origin feature/products-page
```

### Deployment

Push to `main` → GitHub Actions auto-deploys to GitHub Pages.

To configure custom domain: Settings → Pages → Custom domain → `www.gxonagro.com`.

## License

© 2026 GXON AGRO. All rights reserved.

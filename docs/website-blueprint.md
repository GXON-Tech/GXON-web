# GXON AGRO Website Blueprint

> Complete specification for building the GXON AGRO website.
> Designed to support 3-5 years of growth without major architecture changes.

## Goals

- Support AI Search (ChatGPT / Gemini) discovery
- Support SEO + GEO multi-country expansion
- Support B2B lead conversion
- Support product line expansion
- Support distributor network development

## Brand Positioning

**GXON AGRO** — Global Grain Drying Solution Provider

**Core Business**:
- Mobile Grain Dryers
- Batch Grain Dryers
- Continuous Drying Towers
- Multi-Fuel Heating Systems
- Grain Handling & Storage Systems

## Sitemap

```
GXON AGRO
│
├── HOME
├── SOLUTIONS
├── PRODUCTS
├── TECHNOLOGY
├── RESOURCES
├── COMPANY
└── CONTACT
```

## HOME Page — Section Specifications

### Section 1: Hero Banner

**Goal**: Let visitors know who GXON is within 5 seconds.

- **H1**: Complete Grain Drying & Post-Harvest Solutions
- **Subtitle**: GXON designs and manufactures grain drying systems from mobile dryers to industrial continuous drying towers.
- **Product keywords**: Mobile Dryer, Batch Dryer, Continuous Dryer, Multi-Fuel Heating
- **CTAs**: Get My Drying Solution (orange) | Explore Products (outline)
- **Image**: Factory + drying site + grain processing flow

### Section 2: Solution Finder

**Goal**: Interactive 3-step tool to recommend the right dryer.

- **Step 1**: What grain do you want to dry?
  - Rice, Maize, Wheat, Soybean
- **Step 2**: How many tons of grain do you need to dry per day?
  - <20 tons/day, 20-50 tons/day, 50-100 tons/day, 100+ tons/day
- **Step 3**: What fuel is available at your location?
  - Diesel, Rice Husk, Biomass, Natural Gas, Wood, Coal
- **Submit**: Get My Drying Solution
- **Step 4**: Your Recommended Grain Drying Solution (result display)

### Section 3: Product Portfolio

Display 4 product categories:

| Product | Capacity | Description |
|---------|----------|-------------|
| Mobile Batch Dryer | 5-20 TPD | Portable drying for farms |
| Fixed Batch Dryer | 5-30 TPD | Recirculating batch for rice mills |
| Continuous Grain Dryer Tower | 100-500 TPD | Industrial-scale continuous drying |
| Complete Grain System | Custom | Cleaning + Conveying + Storage |

**CTA**: View Products

### Section 4: Why GXON

6 advantages:

| Advantage | Description |
|-----------|-------------|
| Multi-Fuel Technology | 6 fuel types supported |
| Flexible Capacity | 5-500 TPD range |
| Complete Solution | Full post-harvest processing chain |
| Engineering Design | Custom solution design |
| Global Experience | 30+ countries served |
| Technical Support | Installation, training, lifetime parts |

### Section 5: Complete Post-Harvest System

4-step flow with equipment:

1. **Cleaning** → Pre-cleaner
2. **Drying** → Dryer
3. **Handling** → Conveyor + Elevator
4. **Storage** → Silo

### Section 6: Global Grain Drying Solutions

Project case studies from 30+ countries:
- Bangladesh Rice Drying Project
- Kenya Maize Drying Project
- Philippines Farm Drying Project

### Section 7: Final CTA

- **Title**: Need a Grain Drying Solution?
- **Form fields**: Country, Crop, Capacity, Fuel, WhatsApp
- **Button**: Get Recommendation

### Footer

- Distributor CTA strip: "Become a GXON Distributor" + Apply Now
- 6 columns: Brand+Social, Solutions, Products, Technology, Resources, Company
- Resources links: Case Studies, Documentation, FAQ, Blog, Global Projects

---

## PRODUCTS Page — `/pages/products.html`

**Goal**: Showcase all 12 grain dryer models with filtering and individual detail pages.

### Section 1: Page Hero

- **H1**: Grain Drying Products
- **Subtitle**: 12 models from 5–500 TPD. Mobile, batch, continuous, and complete systems.
- **Hero stats**: 12 Product Models | 4 Product Lines | 6 Fuel Types | 30+ Countries

### Section 2: Filter Bar

4 dropdown filters (compact horizontal layout, mirrors homepage dropdown style):

| Filter | Type | Options |
|--------|------|---------|
| Product Type | Single-select | All Products / Mobile / Batch / Continuous / System |
| Grain Type | Multi-select | Paddy / Maize / Wheat / Sorghum / Soybeans |
| Daily Capacity | Multi-select | 5–20 / 20–100 / 100–500 TPD / Custom |
| Fuel Type | Multi-select | Diesel / LPG / Natural Gas / Biomass / Wood / Coal |

- Real-time result count + Reset Filters button
- Empty state when 0 products match

### Section 3: Product Grid

12 product cards in 3-column grid. Each card (detail-display style):
- Product image (4:3 aspect ratio)
- Category tag (MOBILE / BATCH / CONTINUOUS / SYSTEM)
- Model name (h3, BigShoulders 22px) + subtitle
- Short description
- 2×2 spec grid (Capacity / Daily Output / Hopper or Power / Fuels)
- "View Details →" green button linking to individual detail page

**12 Models**:

| Category | Model | Capacity | Detail Page |
|----------|-------|----------|-------------|
| Mobile | G-MR-5 | 5 T/batch, 10–20 TPD | products/G-MR-5.html |
| Mobile | G-MR-10 | 10 T/batch, 20–40 TPD | products/G-MR-10.html |
| Mobile | G-MR-20 (PTO) | 20 T/batch, 70–80 TPD | products/G-MR-20.html |
| Batch | 5T Batch Dryer | 5 T/batch | products/5T-batch-dryer.html |
| Batch | 10T Batch Dryer | 10 T/batch | products/10T-batch-dryer.html |
| Batch | G-SR-30 | 30 T/batch, 15.2 kW | products/G-SR-30.html |
| Batch | G-SR-32 | 32 T/batch, 19.4 kW | products/G-SR-32.html |
| Continuous | G-CT-120 | 120 MTPD, 48 kW | products/G-CT-120.html |
| Continuous | G-CT-200 | 200 MTPD, 102.7 kW | products/G-CT-200.html |
| Continuous | G-CT-300 | 300 MTPD, 125.5 kW | products/G-CT-300.html |
| Continuous | G-CT-500 | 500 MTPD, 211 kW | products/G-CT-500.html |
| System | Complete Grain System | Custom | products/complete-grain-system.html |

### Section 4: Category Overview

4 category sections retained from original design:
- **#mobile**: Mobile Batch Dryer lineup with full spec table (3 models)
- **#batch**: Fixed Batch Dryer lineup with full spec table (4 models)
- **#continuous**: Continuous Drying Tower lineup with full spec table (4 models)
- **#system**: Complete Grain System overview with 4-stage flow

### Product Detail Pages — `/pages/products/[model].html`

Each of the 12 models has an individual detail page with:

1. **Breadcrumb**: Home / Products / [Model]
2. **Product Hero**: Large image + model name + subtitle + description + 4 highlight cards + dual CTA (Request Quote / Compare Models)
3. **Full Specifications**: 12-row spec table (Model / Category / Capacity / Daily / Hopper / Fuel / Heating / Grain / Power / Dimension / Mobility / Deployment)
4. **Key Features**: 4 feature cards with emoji icons
5. **Model Comparison**: Same-series comparison table with CURRENT model highlighted; other models link to their detail pages
6. **System Components** (Complete Grain System only): 4-component grid (Pre-Cleaner / Conveyor / Grain Dryer / Storage) — replaces comparison table
7. **CTA Section**: Dark background + Request Quote + Back to Products
8. **Footer**: Same as homepage

---

## CONTACT Page — `/pages/contact.html`

**Goal**: Business Development Center — convert visitors into leads, distributors, and partners.

**URL**: `/pages/contact/`
**Positioning**: Business Development Center

### Section 1: Page Hero

- **H1**: Let's Build Your Grain Drying Solution
- **Subtitle**: From single dryers to complete post-harvest systems
- **Hero tag**: 24-hour response guaranteed (with pulse animation)
- **Hero stats**: 30+ Countries Served | 24h Response Time | 6 Fuel Types

### Section 2: Request Solution — `#request`

Inquiry form with 7 fields (≤6 priority + Message):

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Country/Region | Single-select + search | Yes | 170+ countries with flags, grouped by region |
| Business Type | Single-select | Yes | Farmer / Rice Mill / Grain Trader / Feed Mill / Grain Processor / Distributor / Other |
| Crop | Multi-select | Yes | Paddy / Maize / Wheat / Sorghum / Soybeans / Other |
| Capacity (TPD) | Single-select | Yes | <20 / 20–50 / 50–100 / 100+ TPD |
| Fuel | Single-select | No | Diesel / LPG / Natural Gas / Biomass / Wood / Coal |
| WhatsApp | Text input | Yes | Phone number with country code |
| Message | Textarea | No | Free-form project details |

- **Button**: Send Request (orange CTA)
- Left side: value proposition + 4 benefits checklist
- Dropdowns mirror homepage CTA style (searchable country, multi-select crop)

### Section 3: Company Contact — `#company-contact`

3 sales manager cards in 3-column grid:

| Manager | Title | Email | WhatsApp |
|---------|-------|-------|----------|
| Shawn Jin (靳振祥) | International Business Development Manager | shawnjin@gxonagro.com | +86 185 6770 3190 |
| Paul Sun (孙东方) | International Commercial Manager | paul.s@gxonagro.com | +86 181 3572 6591 |
| Leo Yi (易秋帆) | International Sales Manager | leoyi@gxonagro.com | +86 136 2628 3477 |

- Each card: avatar (initials circle) + name + title + email link + WhatsApp link
- Below cards: company info (info@gxonagro.com, www.gxonagro.com, Henan GXON AGRO Equipment Co., Ltd.)

### Section 4: Become Distributor — `#distributor`

Dark-background section with partnership CTA:

- **Title**: Become a GXON Distributor
- **Benefits list**: Competitive pricing / Technical training / Marketing materials / Priority shipping / Dedicated account manager
- **Stats**: 30+ Distributor Countries | 10+ Years Experience | 500+ Installations
- **CTA**: Apply Now (orange, links to #request form)

### Section 5: Global Partners — `#partners`

Country tag grid showing 15 representative customer countries:
- 🇧🇩 Bangladesh · 🇰🇪 Kenya · 🇵🇭 Philippines · 🇳🇬 Nigeria · 🇮🇳 India · 🇵🇰 Pakistan · 🇻🇳 Vietnam · 🇹🇭 Thailand · 🇮🇩 Indonesia · 🇲🇲 Myanmar · 🇪🇹 Ethiopia · 🇬🇭 Ghana · 🇹🇿 Tanzania · 🇱🇰 Sri Lanka · 🇨🇲 Cameroon

### Section 6: Exhibition — `#exhibition`

3 upcoming event cards:

| Event | Date | Location | Focus |
|-------|------|----------|-------|
| Canton Fair 2026 | Oct 15–18 | Guangzhou, China | Grain Processing |
| AGRA Middle East | Nov 5–7 | Dubai, UAE | Agricultural Machinery |
| Africa Agri Expo | Feb 2026 | Nairobi, Kenya | Agriculture & Farming |

- Each card: date badge + event tag + title + location + description

### Section 7: Social Media — `#social`

4 social platform cards:

| Platform | Handle | Content Focus |
|----------|--------|---------------|
| Facebook | /gxonagro | Latest news and product updates |
| LinkedIn | /company/gxonagro | Professional insights and company news |
| YouTube | /@gxonagro | Equipment demos and installation videos |
| WhatsApp | Direct chat | Quick questions and quotes |

### Navigation Links

- Homepage header nav "Contact" → `pages/contact.html`
- Homepage footer "Contact" → `pages/contact.html`
- Homepage footer "Become Distributor" → `pages/contact.html#distributor`
- Products page header/footer Contact → `contact.html`
- Product detail pages header/footer Contact → `../contact.html`
- Homepage hero/Solution Finder CTA buttons retain `#contact` (scroll to homepage CTA form for data sync)

# Subhajit Das — Portfolio Timeline Website

## 1. Concept & Vision

A recruiter-focused portfolio that positions Subhajit as a high-leverage Growth & AI leader. The **timeline IS the hero** — not a resume attachment, but an interactive scroll-driven narrative of impact. The site communicates: "I scale things." Dark, confident, gold accents signal premium quality without being flashy. Every metric shown should make a recruiter or founder lean forward.

---

## 2. Design Language

### Aesthetic Direction
**Dark executive with gold accents** — Think Bloomberg terminal meets a premium VC portfolio. Confident, data-driven, zero fluff. The timeline cards have subtle glass morphism with gold border accents on hover.

### Color Palette
```
--bg-primary:     #0a0a0f       (near-black base)
--bg-secondary:   #12121a       (card backgrounds)
--bg-tertiary:    #1a1a24       (elevated surfaces)
--border:         #2a2a3a       (subtle borders)
--gold:           #d4af37       (primary accent)
--gold-light:     #f4d03f       (hover/highlight)
--gold-dim:       #8b7355       (muted gold)
--text-primary:   #f5f5f7       (headings)
--text-secondary: #a0a0b0       (body)
--text-muted:     #6b6b7b       (metadata)
```

### Typography
- **Headings**: `Space Grotesk` (700, 600) — distinctive, geometric, modern
- **Body**: `Inter` (400, 500) — clean, professional readability
- **Monospace accents**: `JetBrains Mono` — for metrics/numbers
- Fallbacks: system-ui, -apple-system, sans-serif

### Spatial System
- Base unit: 4px
- Section padding: 120px vertical (80px mobile)
- Card padding: 32px
- Max content width: 1200px
- Timeline card width: calc(50% - 40px)

### Motion Philosophy
- **Scroll-driven reveals**: Timeline cards fade-in + slide from left/right on scroll intersection (threshold 0.2)
- **Stagger**: 100ms between sequential elements
- **Duration**: 600ms for cards, 400ms for smaller elements
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)
- **Gold shimmer**: Subtle gradient animation on hover for timeline connector dots
- **Metrics counter**: Count-up animation when section enters viewport

### Visual Assets
- **Icons**: Lucide React (consistent stroke weight)
- **Decorative**: Subtle dot grid pattern on hero background
- **Timeline connector**: Vertical gold line with animated pulse on the center axis
- **Card accents**: 1px gold border on hover, subtle glow effect

---

## 3. Layout & Structure

### Page Architecture
```
[Hero]                  — Full viewport, centered, scroll indicator
[Career Timeline]       — The main event: alternating vertical timeline
[Impact Metrics]        — 6-column grid of key numbers
[Skills]               — Tag cloud grouped by category
[AI Projects]          — 2x2 card grid
[Contact]              — Minimal footer with links
```

### Visual Pacing
- Hero: Expansive whitespace, single focus point
- Timeline: Dense but breathing — 80px between entries
- Metrics: Tight, impactful numbers — immediate visual punch
- Projects: Generous cards, scroll to explore
- Contact: Minimal, closing statement

### Responsive Strategy
- **Desktop (1024px+)**: Alternating left/right timeline
- **Tablet (768px-1023px)**: All cards on right, line on left
- **Mobile (<768px)**: Single column, full-width cards, line on left edge

---

## 4. Features & Interactions

### Hero Section
- Full viewport height, centered content
- Name in Space Grotesk 72px (48px mobile)
- Tagline: "Scaling fintech products from millions to billions"
- Subhajit Das / Growth & AI Leader / Bangalore, India
- Scroll indicator: Animated chevron bouncing at bottom
- Background: Subtle dot grid pattern, radial gradient fade

### Career Timeline (Core Feature)
- **Alternating layout**: Cards swap left/right on desktop
- **Visual connector**: Center axis line with gold dots at each entry
- **Scroll animation**: Cards slide in from side + fade (Intersection Observer)
- **Card hover**: Gold border glow, slight Y lift (-4px)
- **Each card contains**:
  - Company name (Space Grotesk, gold tint)
  - Role title (larger, bold)
  - Tenure + Location (muted text)
  - 3-4 bullet points with specific metrics
  - Skills tags at bottom
- **Entry animation**: 600ms ease-out-expo, triggered at 20% visibility

### Impact Metrics
- Count-up animation from 0 to final value when in viewport
- Triggered once per session
- Numbers in JetBrains Mono for visual distinction
- Gold accent color for the number itself

### Skills Section
- Grouped into 4 categories: Growth, AI/ML, Technical, Domain
- Tag cloud with hover state (gold background, dark text)
- Subtle entrance animation: staggered fade-in per tag

### AI Projects
- 2x2 grid of cards (stacks on mobile)
- Each card: Project name, description, tech stack tags, GitHub icon
- Hover: Card lifts, gold border appears
- Tech stack shown as small tags

### Contact Section
- Minimal: Email, LinkedIn, GitHub, Twitter icons
- "Let's build something exceptional" closing line
- Gold hover on icons

### Edge Cases
- Timeline cards with no metrics still render cleanly
- Skills section handles overflow gracefully
- All external links open in new tab
- Smooth scroll behavior throughout

---

## 5. Component Inventory

### `<Hero />`
- States: Initial (loads immediately), Animated (entrance animation)
- Full viewport, flex centered, dot-grid background
- Scroll indicator pulses infinitely

### `<Timeline />`
- Contains timeline data, renders alternating `<TimelineCard />` components
- Vertical line runs through center (desktop) or left edge (mobile)
- Uses Intersection Observer for scroll animations

### `<TimelineCard />`
- States: Hidden (before scroll), Entering (animation in progress), Visible
- Props: entry (company, role, dates, location, bullets, skills)
- Alternates `text-right` / `text-left` alignment based on position

### `<MetricCard />`
- States: Counting (0 → value), Done
- Number in JetBrains Mono, large
- Label below in muted text

### `<SkillTag />`
- States: Default (dark bg), Hover (gold bg, dark text)
- Grouped by category with subtle section headers

### `<ProjectCard />`
- States: Default, Hover (lifted + gold border)
- Contains: title, description, tech stack array, optional link

### `<Contact />`
- Icon links with gold hover
- Closing tagline

---

## 6. Technical Approach

### Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 with custom theme extension
- **Animation**: Framer Motion (scroll animations, variants)
- **Icons**: Lucide React
- **Font loading**: next/font (Space Grotesk, Inter, JetBrains Mono)

### Architecture
```
app/
  layout.tsx          — Root layout, font definitions, metadata
  page.tsx             — Single page composing all sections
  globals.css         — CSS variables, base styles, custom scrollbar
components/
  Hero.tsx
  Timeline.tsx
  TimelineCard.tsx
  ImpactMetrics.tsx
  MetricCard.tsx
  Skills.tsx
  SkillTag.tsx
  Projects.tsx
  ProjectCard.tsx
  Contact.tsx
  ScrollIndicator.tsx
  DotPattern.tsx
lib/
  timeline-data.ts     — All career timeline entries
  skills-data.ts       — Skills grouped by category
  projects-data.ts     — AI project descriptions
```

### Key Implementation Details
- Framer Motion `useInView` hook for scroll-triggered animations
- Custom Tailwind theme extending colors with CSS variable references
- `position: sticky` for the timeline center line (desktop)
- Intersection Observer threshold: 0.2 for card reveals
- Framer Motion `variants` with `staggerChildren` for grouped animations
- Count-up effect: `useEffect` + `requestAnimationFrame` with easing

---

## 7. Content Data

### Timeline Entries (6 total)
1. **Axis Bank** | AVP Growth Marketing | Jan 2020 – Apr 2022 | Mumbai
2. **Groww** | Lead Growth, Credit | May 2022 – Sep 2023 | Bangalore
3. **NIRO** | AVP Lead Growth & Partnerships | Sep 2023 – Jul 2024 | Bangalore
4. **Aditya Birla Capital** | Lead Growth Marketing & CX | Apr 2017 – Dec 2019 | Mumbai
5. **ICICI Bank** | Digital Manager | Sep 2015 – Mar 2017 | Mumbai
6. **Tenovia Solutions** | Consultant | Apr 2014 – Sep 2015 | Bangalore

### Impact Metrics
- 10+ Years Experience
- 6 Companies
- $100M+ Revenue Owned
- $50M+ ARR Influenced
- ₹500Cr+ Loans Disbursed

### Skills
**Growth**: Performance Marketing, Lifecycle CRM, A/B Testing, SEO/GEO, User Journey, Cross-sell & Upsell
**AI/ML**: LLM Orchestration, Prompt Engineering, RAG, Fine-tuning, Multi-model Routing
**Technical**: Python, JavaScript, React, Next.js, Supabase, Docker, GCP, API Design
**Domain**: Fintech Lending, UPI/Payments, Credit Products, D2C GTM, Platform Partnerships

### AI Projects
1. **OmniClaw** — Multi-channel AI assistant (WhatsApp, Telegram, Alexa) with multi-model orchestration
2. **Growth Twitter Bot** — Autonomous agent pipeline for Twitter engagement and research
3. **ChuckleNet** — ML system for standup comedy analysis using XLM-R and audio features
4. **Brain Spark Platform** — Knowledge management with AI-powered search and retrieval

### Contact
- Email: subho.das@outlook.in
- LinkedIn: @subholearns
- GitHub: @Das-rebel
- Twitter/X: @Subholearns
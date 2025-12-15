# Design Guidelines: Premium Apple-Inspired Personal Portfolio

## Design Philosophy & Approach

**Reference-Based Approach**: Apple HIG + Premium Design Patterns
- Calm over clever, depth over decoration, trust over tactics
- Professional standard for founders, CTOs, and product leaders
- Minimalist with purposeful depth and hierarchy

## Color System (STRICT)

**Palette**: Black (#000000), White (#FFFFFF), Grey spectrum only
- High contrast throughout
- No bright colors, no deviations
- Grey gradients for depth and separation

## Typography Hierarchy

**Font Family**: System font stack (San Francisco-style)
```
Font Stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
```

**Scale**:
- H1 Hero: 72px desktop / 48px mobile, font-weight: 600
- H1 Section: 56px desktop / 36px mobile, font-weight: 600
- H2: 40px desktop / 28px mobile, font-weight: 600
- H3: 28px desktop / 20px mobile, font-weight: 500
- Body Large: 20px, font-weight: 400
- Body Regular: 16px, font-weight: 400
- Small: 14px, font-weight: 400

**Line Heights**: 1.2 for headlines, 1.6 for body text

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 8, 12, 16, 20, 24, 32
- Consistent vertical rhythm: py-20 to py-32 for desktop sections
- Responsive scaling: py-12 mobile, py-20 desktop

**Container Widths**:
- Full-width sections: w-full with max-w-7xl centered
- Content sections: max-w-6xl
- Text content: max-w-3xl

**Grid System**: 12-column for desktop, stack to single column on mobile

## Depth & Elevation System

**Three Levels**:
1. **Base Layer** (background): No shadow, flat
2. **Floating Layer** (cards, sections): shadow-lg with 24px blur, 8px offset
3. **Focus Layer** (CTAs, active elements): shadow-2xl with 40px blur, 12px offset

**Shadow Values**:
```
Base: none
Floating: 0 8px 24px rgba(0, 0, 0, 0.12)
Floating Hover: 0 12px 32px rgba(0, 0, 0, 0.16)
Focus: 0 12px 40px rgba(0, 0, 0, 0.20)
```

**Border Radius**: rounded-2xl (16px) for cards, rounded-xl (12px) for buttons, rounded-lg (8px) for inputs

## Component Library

### Navigation
- Sticky header with backdrop blur
- Monochrome social icons (LinkedIn, X, Instagram, Email) with hover lift
- Logo/name on left, nav links center, CTA right

### Hero Section
- Full viewport height (min-h-screen)
- Centered content with max-w-4xl
- Headline: "Designing and building thoughtful mobile & web applications."
- Dual CTAs: Primary "Contact Me" (filled), Secondary "View Portfolio" (outline)
- Scroll progress indicator at bottom

### Cards (Portfolio/Blog)
- Background: white with shadow-lg
- Padding: p-8
- Hover: transform translateY(-4px), shadow increases
- Transition: all 0.3s ease-in-out

### Forms
- Input fields: bg-white, border-2 black, rounded-xl, p-4
- Inline validation with subtle red/green indicators
- Submit button: full-width, primary style
- Smooth success animation (checkmark fade-in)

### Buttons
**Primary**: Black bg, white text, shadow-lg, hover: shadow-2xl + slight scale
**Secondary**: White bg, black border-2, black text, hover: bg-black, text-white
**On Image**: White bg with backdrop-blur-md, black text, no hover interaction needed (inherent states)

### Portfolio Project Cards
- One per viewport with scroll snapping
- Muted looping background video on hover
- Manual navigation dots at bottom

### Blog Grid
- 3 columns desktop (grid-cols-3), 2 tablet (md:grid-cols-2), 1 mobile
- Floating cards with 3D forward movement on hover
- Card transforms: perspective for depth

## Animations & Motion

**Scroll Animations**:
- Fade-in + translateY(-20px) on section reveal
- Timing: ease-in-out, 0.6s duration
- Stagger delay: 0.1s between elements
- Intersection Observer triggers at 20% visibility

**Hover Interactions**:
- Cards: translateY(-4px), shadow deepens
- Buttons: scale(1.02), shadow increases
- Icons: opacity 0.7 → 1.0, translateY(-2px)
- All transitions: 0.3s ease-in-out

**Prohibited**: Bounce, elastic, aggressive motion, parallax overuse

## Images

**Hero Section**: No large hero image - focus on typography and depth
**Portfolio Projects**: Background muted videos (design/development process loops)
**Blog Cards**: Article featured images from Medium feed
**About/Journey**: Optional subtle background textures, no photography

## Special Sections

### Journey Map Timeline
- Vertical timeline with scroll-triggered reveals
- Milestone cards with years: 2019 → 2022 → 2023 (COO) → 2024 (CEO)
- Connecting line with progress indicator

### Blog Article Pages
- Scroll progress bar (fixed top, black, 2px height)
- Highlighted quotes: border-left-4, pl-6, italic, text-2xl
- Sticky subscribe button (bottom-right, shadow-2xl)

### Popups
- Entrance: 8-10s delay, once per session, centered modal with backdrop-blur
- Portfolio: 70% scroll trigger, bottom-right corner
- Close: X icon top-right, ESC key support

## Accessibility

- Minimum touch target: 44x44px
- Focus states: outline-2 outline-offset-2 outline-black
- ARIA labels on all interactive elements
- Keyboard navigation support
- Semantic HTML throughout

## Performance

- Lazy load images and videos
- Intersection Observer for scroll animations
- Debounced scroll handlers
- Optimized shadow/blur usage (use sparingly)

**Outcome**: A calm, confident, premium experience that converts visitors into qualified leads through thoughtful storytelling, clear hierarchy, and professional polish.
# Het Soni - Personal Portfolio Website

## Overview

A premium, Apple-inspired personal portfolio website for Het Soni focused on lead generation for mobile app and web development services. The site targets founders, CTOs, and product leaders with a calm, professional, high-end aesthetic using a strict black, white, and grey color palette.

The primary goals are:
- Generate qualified leads for mobile and web development services
- Encourage portfolio exploration, blog reading, form submissions, and newsletter subscriptions
- Maintain a professional standard that inspires trust

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a page-based structure with reusable components:
- Pages: Home, Services, Portfolio, Portfolio Detail, Journey, Blog, Contact
- Shared layout components: Header, Footer
- Section components for homepage: Hero, Services, PortfolioPreview, etc.
- UI components from shadcn/ui (Radix primitives)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api/*`
- **Build**: esbuild for server bundling, Vite for client

Key API endpoints:
- `POST /api/contact` - Contact form submissions
- `POST /api/newsletter` - Newsletter subscriptions
- `GET /api/blog` - Fetches and caches Medium RSS feed articles

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Storage**: Currently uses in-memory storage (`MemStorage` class) with database schema ready for PostgreSQL

Database tables defined:
- `users` - User authentication
- `contact_submissions` - Contact form entries
- `newsletter_subscriptions` - Email subscriptions

### Design System
Strict adherence to Apple-inspired design guidelines:
- Colors: Black, white, grey spectrum only
- Typography: Inter font with specific hierarchy (72px hero down to 14px small)
- Spacing: Tailwind units following 2, 4, 8, 12, 16, 20, 24, 32 scale
- Components: Smooth curves, realistic shadows, depth through elevation

## External Dependencies

### Third-Party Services
- **Medium RSS**: Blog articles fetched from `medium.com/feed/@hetsoni9398` with 10-minute caching
- **Social Links**: LinkedIn, X (Twitter), Instagram, Medium integration

### Key NPM Packages
- **UI**: Radix UI primitives, shadcn/ui components, Lucide icons, react-icons
- **Forms**: React Hook Form with Zod resolver
- **Database**: Drizzle ORM, PostgreSQL driver (pg), connect-pg-simple for sessions
- **Utilities**: date-fns, clsx, tailwind-merge, class-variance-authority

### Environment Requirements
- `DATABASE_URL` - PostgreSQL connection string (required for production)
- Node.js with ESM support
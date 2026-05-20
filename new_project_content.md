---
title: "Grow Logs"
date: "2026-05-01"
summary: "A full-stack growth logging SaaS for developers and self-learners, built to production engineering standards with multi-stage authentication, ownership-scoped data access, plan-based feature gating, and shared validation contracts across a NestJS API and Next.js frontend."
status: "Ongoing"
tech:
  [
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Next.js",
    "React Query",
    "Zustand",
    "shadcn/ui",
    "Tailwind CSS",
    "Zod",
    "JWT",
    "Resend",
    "Swagger",
    "Turborepo",
  ]
featured: true
domains:
  [
    "Authentication & Session Security",
    "Multi-tenant Data Isolation",
    "SaaS Feature Gating",
    "Full-stack Monorepo Architecture",
    "API Design & Consistency",
    "Frontend State Architecture",
  ]
constraints:
  [
    "rotating refresh tokens with reuse detection; a stolen token wipes all user sessions",
    "every database query scoped to the authenticated user, making cross-tenant data access impossible at the service layer",
    "non-MVP features gated behind DB-backed feature flags with in-memory caching",
    "Zod validation schemas defined once in a shared package and consumed by both API and frontend",
    "all API responses conform to a standard envelope with no inconsistent shapes across resources",
  ]
metrics:
  - label: "Auth Flow"
    value: "Register → Verify → Login → Refresh"
  - label: "Session Security"
    value: "Rotating tokens + reuse detection"
  - label: "Data Isolation"
    value: "Per-user ownership scoping on all queries"
  - label: "Feature Access"
    value: "Flag-gated, plan-aware"
outcomes:
  - "Built a production-grade full-stack SaaS with clear module boundaries across a NestJS backend, Next.js frontend, and shared packages in a Turborepo monorepo."
  - "Implemented a multi-stage auth system with email verification, short-lived JWTs, rolling refresh token rotation, and reuse detection that wipes all sessions on a stolen token scenario."
  - "Enforced per-user data isolation by scoping every database query to the authenticated user's ID at the service layer, not the route layer."
  - "Designed a DB-backed feature flag system with in-memory caching to gate non-MVP features (AI summaries, GitHub integration, Stripe billing) without code changes per deployment."
  - "Shared a single Zod schema package across both API validation pipes and frontend form validation, eliminating duplicated rules and keeping API and UI contracts in sync automatically."
  - "Applied a consistent response envelope and paginated list contracts across all endpoints from the start, making the API predictable regardless of resource type."
---

# Grow Logs

## What it is

Grow Logs is a personal growth logging SaaS for developers and self-learners. Users organise their activities into categories and subcategories, for example a "System Design" category broken down into "Databases", "Caching", and "Distributed Systems", then log daily entries tagged as work or learning with a productivity score and markdown notes. Over time the dashboard surfaces patterns: which areas are getting consistent effort, where progress has stalled, and how productivity trends over time.

The need came from my own habit of tracking learning in scattered notes with no structure or visibility into progress. I decided to solve it properly by building it as a SaaS, both to sharpen my production skills and to create something genuinely useful for other developers and self learners in the same position.

## Core system features

- **Authentication:** register, email verification, login, JWT access and refresh token flow, change password, covering the full auth lifecycle with no shortcuts.
- **Categories and subcategories:** per-user organisation with active and completed lifecycle states, plan-enforced limits, and inline rename.
- **Log entries:** daily WORK or LEARNING entries with productivity score (1-10), subcategory tagging, markdown body, and user-assigned entry date separate from insert timestamp.
- **Dashboard analytics:** aggregated stats across categories, entry streaks, and productivity trends.
- **Feature flags:** DB-backed flags with in-memory caching for gating non-MVP capabilities (AI digest, GitHub import, Stripe billing, public profile).
- **Admin module:** user management and feature flag toggling behind role-based access control.
- **Email delivery:** transactional emails via Resend for verification and notification flows.

## Engineering practices and concepts

Building this as a real SaaS meant going beyond feature implementation. The decisions across this project cover security, data integrity, performance, code quality, continuous integration, observability, and configuration safety: the areas that separate a production grade product from a working prototype. Each section below covers how these concerns were applied in practice.

### Security

- Short-lived JWT access tokens paired with rotating refresh tokens; reuse of a rotated token triggers an immediate full session wipe, treating it as a stolen token scenario.
- Passwords and refresh tokens are stored as bcrypt hashes; refresh tokens are opaque random strings delivered as HTTP-only cookies, so a leaked database or JavaScript context exposes nothing usable.
- Every route except public auth endpoints requires a valid JWT; admin actions require an additional role check, with no path in the codebase that bypasses either.
- Automated dependency scanning with Renovate and Dependabot keeps third party packages current and surfaces known vulnerabilities before they reach production.

### Data integrity

- Every service method includes a `userId` constraint derived from the authenticated JWT, never from the request body, making ownership enforcement a server side guarantee.
- Delete behaviors are chosen deliberately per relationship: categories with entries are blocked from deletion to prevent data loss, while removing a subcategory keeps its entries intact by nulling the reference rather than deleting them.

### Performance

- The database schema is optimized for the app's read patterns: `user_id` is denormalized on the subcategories table to avoid a join on every ownership check, and indexes are placed on the columns used in dashboard and list queries rather than added reactively.
- Feature flag state cached in memory with a short TTL, keeping flag checks off the database on every request without sacrificing freshness.
- Next.js Server Components used by default, reducing JavaScript sent to the browser to only what genuinely requires interactivity.
- React Query handles server state caching on the frontend, preventing redundant API calls across components.

### Code quality

- TypeScript strict mode enforced across both apps and all shared packages, with no `any` types permitted.
- Zod validation schemas defined once in a shared package and consumed by both the API and the frontend, eliminating duplicated rules and keeping both sides in sync automatically.
- ESLint rules enforced across the entire monorepo covering unused imports, naming conventions, and TypeScript-specific patterns, with lint checks running in CI so violations are caught before code reaches review.

### Continuous integration

- Unit tests required for every service file; no implementation step is considered complete until tests pass.
- Code coverage tracked by Codecov on every pull request with a minimum patch threshold, preventing untested code from merging unnoticed.

### Observability

- Structured JSON logging with request correlation IDs, allowing individual requests to be traced across the system.
- A global exception filter normalises every unhandled error into the same response shape, making failure behavior consistent and predictable across all endpoints.

### Configuration safety

- All environment variables validated with Zod at application startup; the app refuses to boot if any required variable is missing or has an invalid value, rather than failing silently at runtime.

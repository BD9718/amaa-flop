# AMAA — Trilingual Institutional Website (Phase 1: Public Site)

A premium, calm, institutional site for AMAA (Association Mauritanienne pour l'Assainissement), fully trilingual in French, Arabic (RTL) and English, built on this project's stack (TanStack Start + React + TypeScript + Tailwind), with Lovable Cloud reserved for the phase-2 admin CMS.

## Stack note

Your spec named Next.js + Strapi/Sanity + NextAuth. This project runs on TanStack Start (React 19, SSR + static prerendering, Vite) and Lovable Cloud (Postgres, auth, storage, server functions). Everything in the spec — SSG/SSR pages, i18n, admin auth, roles, image storage, contact form validation — is achievable natively here, with no external CMS account. Deployment stays Git-based.

## Design system

- Palette from your logo: primary green `#2E7D32`, light green `#8BC34A`, red `#CE1126` (accents only: focus rings, small highlights), gold `#F5E6A3` (rare institutional detail). Backgrounds: white plus very light warm off-whites. All tokens defined as oklch semantic variables in `src/styles.css` — no hardcoded colors in components.
- Typography: Inter (Latin) + a matching Arabic face (IBM Plex Sans Arabic) loaded via a font `<link>` in the root route. Fluid type scale.
- Craft details: generous whitespace, soft long-throw shadows, near-imperceptible grain overlay on select sections, minimalist line icons (Lucide), restrained scroll-reveal and hover micro-interactions.

## Internationalization

- Locale-prefixed routes: `/fr/...`, `/ar/...`, `/en/...`, with `/` redirecting to the visitor's preferred locale (default French).
- Typed dictionaries per locale in `src/i18n/`, one file per language, accessed through a locale-aware hook.
- Arabic sets `dir="rtl"` on `<html>`; layouts use logical Tailwind properties (`ps-`, `pe-`, `ms-`, `text-start`) so the whole UI mirrors, including nav, carousels and forms.
- Language switcher in the header (segmented control), choice persisted in a cookie/localStorage and honoured on return visits.

## Pages (all locales)

- **Home** — sticky header (logo, nav, language switcher, "Nous contacter" CTA); full-width hero with field photo and headline; short association intro; animated key figures; "Nos Actions" cards (Assainissement, Sensibilisation, Formation); featured projects; latest news; gallery preview; partners strip; closing CTA; institutional footer.
- **L'Association** — `/about` hub plus `history`, `mission`, `values`, `team`.
- **Nos Actions** — `/actions` hub plus `sanitation`, `awareness`, `training`, each with objectives, methods, impact, imagery.
- **Nos Projets** — `/projects` split into Réalisés / À venir; detail pages at `/projects/[slug]` with status, contexte, problème, objectifs, bénéficiaires, activités, résultats, partenaires, lieu, période and a project gallery. Seeded with "Vaccination des vidangeurs" (réalisé) and the three upcoming projects.
- **Actualités** — `/news` listing with category and date filters; `/news/[slug]` article pages with rich content and share buttons.
- **Galerie** — filterable grid, lazy-loaded thumbnails, full-screen keyboard-navigable lightbox.
- **Partenaires** — clean logo/name grid.
- **Contact** — phone, email, WhatsApp link, address, plus a Zod-validated contact form (client + server validation) with clear errors and a success state. Map embed left as an optional later addition.

## Content in phase 1

All content lives in typed placeholder data modules (`src/content/`) with the three language variants side by side — clearly labelled placeholder text, figures, and generated placeholder imagery captioned by intended subject ("Photo d'équipe en action", etc.). Phase 2 swaps these modules for Cloud-backed queries without touching page components.

## Quality bar

- Prerendered/SSR pages, WebP/AVIF images with responsive sizes and lazy loading, code-splitting per route, minimal third-party scripts — targeting Lighthouse >90.
- WCAG 2.1 AA: semantic landmarks, single H1 per page, visible focus states, keyboard-operable lightbox and menus, verified contrast in both directions.
- Per-route `head()` metadata (unique titles/descriptions/og tags), canonical + hreflang links across the three locales, sitemap and robots.

## Phase 2 (after this ships)

Lovable Cloud tables for projects, news, gallery, partners, key figures, pages and contact settings — each with per-language fields — an admin login with role-based access, an image uploader with automatic optimisation, and a `/admin` dashboard styled like the public site.

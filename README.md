# AMAA Foundation Hub

Generate a premium, institutional, trilingual (French, Arabic, English - with RTL support for Arabic), and highly performant website for AMAA, a Mauritanian health association. The site must exude seriousness, trust, professionalism, and credibility for the public, institutions, partners, and donors.

**TECHNICAL SPECIFICATIONS:**

*   **Stack:** Next.js (React), TypeScript, Tailwind CSS. For backend/CMS, integrate Headless CMS (e.g., Strapi, Sanity.io, or DatoCMS) with a PostgreSQL database. Authentication for admin via NextAuth.js.

*   **Architecture:** Modular component-based architecture for reusability and scalability. Pages should leverage static site generation (SSG) or server-side rendering (SSR) where appropriate for performance (e.g., articles, project pages).

*   **Deployment:** Designed for Git-based deployment (e.g., Vercel) with Cloudflare for DNS, CDN, and advanced security.

*   **Performance:** High priority. Lighthouse score >90. Optimized images (WebP/AVIF), lazy loading for media, efficient asset delivery, minimal third-party scripts. Code-splitting, tree-shaking.

*   **Security:** Robust admin authentication, role-based access control (if multiple admins), input validation, protection against common web vulnerabilities (XSS, CSRF), HTTPS enforced.

*   **Responsiveness:** Mobile-first design, fully responsive across all devices (mobile, tablet, desktop) with adaptive layouts and fluid typography.

**ARTISTIC DIRECTION & VISUALS:**

*   **Style:** Modern, elegant, minimalist, premium, institutional. Inspired by clean interfaces like Linear, Vercel, or Notion. Focus on conveying trust and professionalism.

*   **Color Palette:** Primarily based on the green from the provided AMAA logo, complemented by white and very light, subtle off-white/grey nuances. Red from the logo to be used sparingly for subtle accents (e.g., focused CTA states, small highlight elements). Avoid heavy, saturated colors.

*   **Typography:** Professional, highly readable, and modern sans-serif fonts. Suggestion: Inter, SF Pro, or Geist Sans for headings and body text to ensure clarity and institutional feel.

*   **Visual Elements:**

    *   **Whitespace:** Abundant use of whitespace to create a clean, uncluttered, and sophisticated aesthetic.

    *   **Depth & Shadows:** Subtle, soft, long-throw shadows for cards and interactive elements to create a sense of depth without being heavy.

    *   **Subtle Textures:** Minimal, almost imperceptible grain or noise overlay on certain background sections to add tactile quality.

    *   **Imagery:** High-quality, authentic photography depicting AMAA's field activities, projects, and beneficiaries (placeholders initially). Images should be empathetic, professional, and culturally appropriate. Avoid stock photo clichés.

    *   **Icons:** Minimalist, line-based, modern icon set.

    *   **Gradients:** Very subtle, soft, almost unnoticeable linear gradients for background elements if necessary, but generally avoid heavy gradients.

    *   **Animations:** Micro-interactions (hover states, click feedback), smooth page transitions, and subtle reveal animations for content as it enters the viewport (on scroll) to enhance perceived performance and elegance, without being distracting.

**USER EXPERIENCE (UX) & INTERFACE (UI):**

*   **Navigation:** Intuitive and clear sticky header navigation. Multi-language switcher clearly visible (e.g., dropdown or segmented control). "Nous contacter" / "Contact Us" button in the header.

*   **Accessibility:** WCAG 2.1 AA compliance (semantic HTML, keyboard navigation, sufficient color contrast, alt tags for images, ARIA attributes).

*   **Information Hierarchy:** Strong visual hierarchy using typography, spacing, and color to guide the user's eye and emphasize key information.

*   **Call-to-Actions (CTAs):** Clearly identifiable, strategically placed, and consistent styling for primary and secondary CTAs.

*   **Multilingual Support:** Full i18n implementation. Arabic version must render correctly with Right-to-Left (RTL) layout for text, UI elements, and navigation flow. Language switcher should persist choice.

*   **Form Design:** Clean, simple, validated forms with clear error messages and success confirmations.

**CONTENT & FUNCTIONALITIES:**

1.  **Homepage (`/`):**

    *   **Header:** Sticky header with AMAA logo (left), primary navigation (center/right), language switcher, and "Nous contacter" / "Contact Us" button.

    *   **Hero Section:** Premium, full-width hero with a large, impactful photo from a field activity. Overlaid title (e.g., "Ensemble pour un Assainissement Durable en Mauritanie"), concise descriptive text, and a prominent call-to-action button (e.g., "Découvrir nos actions").

    *   **Short Association Presentation:** Brief text introduction to AMAA, accompanied by a professional photo (e.g., team in action or facility).

    *   **Key Figures Section:** Administerable animated counters or clearly displayed statistics (e.g., "Bénéficiaires touchés," "Projets réalisés," "Années d'existence"). Use placeholder values.

    *   **"Nos Actions" Section:** Display AMAA's core actions (Assainissement, Sensibilisation, Formation) as visually appealing cards with icons, short descriptions, and links to detailed pages.

    *   **Featured Projects:** Highlight a selection of key projects with compelling images, titles, and brief summaries, linking to individual project detail pages.

    *   **Latest News/Actualités:** Carousel or grid displaying recent articles with titles, dates, images, and links.

    *   **Photo Gallery Preview:** A small, curated selection of photos from the main gallery, enticing users to explore more.

    *   **Partners Section:** Display logos of key partners in a clean, scrollable, or grid layout.

    *   **Final Call-to-Action:** A strong, clear CTA inviting users to get involved, donate (conceptually, not functional), or contact AMAA.

    *   **Footer:** Institutional footer with essential links (Privacy Policy, Terms, Sitemap), contact information (non-editable by CMS, fetched from settings), and copyright.

2.  **L'Association (`/about`):**

    *   **Sub-pages:**

        *   **Notre Histoire (`/about/history`):** Detailed narrative of AMAA's journey.

        *   **Notre Mission / Objectifs (`/about/mission`):** Clear articulation of AMAA's purpose and goals.

        *   **Nos Valeurs (`/about/values`):** Core principles guiding the association.

        *   **Notre Équipe (`/about/team`):** Professional presentation of key team members (names, roles, photos - placeholders).

3.  **Nos Actions (`/actions`):**

    *   **Sub-pages:**

        *   **Assainissement (`/actions/sanitation`):** Detailed explanation of sanitation initiatives.

        *   **Sensibilisation (`/actions/awareness`):** Description of awareness campaigns.

        *   **Formation / Renforcement des Capacités (`/actions/training`):** Overview of training and capacity-building programs.

    *   Each action page should detail objectives, methods, impact, and include relevant imagery.

4.  **Nos Projets (`/projects`):**

    *   **Main Page:** Categorized display of "Projets Réalisés" and "Projets à Venir." Each project listed with title, status, and main image.

    *   **Project Detail Page (`/projects/[slug]`):**

        *   Hero section with main photo and title.

        *   Key project details: Status, Contexte, Problème, Objectifs, Bénéficiaires, Activités, Résultats (for realized), Partenaires, Lieu, Période.

        *   Integrated photo gallery specific to the project.

        *   Placeholder projects:

            *   Réalisés: "Vaccination des vidangeurs"

            *   À venir: "Renforcement des capacités des vidangeurs", "Réalisation de Stations de Traitement des Boues de Vidange (STBV)", "Sensibilisation"

5.  **Actualités (`/news`):**

    *   Blog-like listing of articles, sortable by category or date.

    *   **Article Detail Page (`/news/[slug]`):** Full article content with title, date, main image, category, and rich text content. Social sharing buttons (conceptual, not functional).

6.  **Galerie Photos (`/gallery`):**

    *   Elegant, filterable photo gallery (by category).

    *   Lazy-loaded thumbnails.

    *   Clicking a thumbnail opens a full-screen, performant lightbox with navigation arrows.

    *   Images automatically optimized for web (compression, responsive sizing).

7.  **Partenaires (`/partners`):**

    *   Clean display of partner logos and names. Ability to add/edit/delete partners via CMS.

8.  **Contact (`/contact`):**

    *   Clear, prominent display of:

        *   Phone number (placeholder)

        *   Email address (placeholder)

        *   WhatsApp contact (link to WhatsApp API with placeholder number)

        *   Physical address (placeholder)

    *   **Contact Form:** Fields for Name, Email, Phone (optional), Subject, Message.

    *   Client-side validation and server-side validation.

    *   Success message upon submission.

    *   Optional: Integrated Google Maps iframe (with placeholder location) for visual address representation, contingent on API key availability.

**ADMINISTRATION / CMS (`/admin`):**

*   **Secure Authentication:** User login for administrators.

*   **Intuitive Interface:** User-friendly and clearly labeled dashboard.

*   **Content Management:**

    *   **Pages:** Edit content for static pages (e.g., About sections).

    *   **Texts:** Edit all textual content across the site, with rich text editor (WYSIWYG) support where appropriate.

    *   **Images:** Upload, manage, and replace images for all sections, with automatic optimization.

    *   **Projects:** CRUD operations for projects, including all detailed fields (title, status, context, photos, etc.).

    *   **Actualités (News):** CRUD operations for articles (title, date, image, category, rich content, publish/unpublish status).

    *   **Galerie (Gallery):** Upload, categorize, and manage photos.

    *   **Partenaires (Partners):** Add, modify, delete partner logos and names.

    *   **Key Figures:** Update values for the homepage key figures.

    *   **Contact Information:** Manage phone, email, WhatsApp, address.

    *   **Multilingual Content:** All editable content must support French, Arabic, and English versions, with a clear interface for switching between languages during editing.

**PLACEHOLDERS:**

*   All dynamic content (text, numbers, images, specific project details, contact info, partner names) should use clear placeholder content until actual data is provided by AMAA.

*   Image placeholders should indicate the type of image expected (e.g., "Photo d'équipe en action," "Photo de projet d'assainissement").

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/13faef88-649f-4149-b51e-1445dd0b004a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

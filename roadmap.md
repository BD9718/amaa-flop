# Phase 2 — Back-office AMAA

- [ ] Schéma DB : user_roles + has_role, projects, news, gallery_items, partners, key_figures, contact_messages (GRANT + RLS)
- [ ] Seed : contenu existant (data.ts) inséré en base via migration
- [ ] Auth admin : page /admin/login (email+mot de passe), gate _authenticated, rôle admin
- [ ] Layout /admin : sidebar, tableau de bord
- [ ] CRUD : projets, actualités, galerie, partenaires, chiffres clés, messages de contact
- [ ] Upload d'images (bucket storage)
- [ ] Pages publiques lisent la base au lieu de data.ts (fallback data.ts)
- [ ] Vérification end-to-end

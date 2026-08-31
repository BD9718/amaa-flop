# Déploiement Cloudflare Workers — AMAA

Le build de production (`bun run build`) génère un Worker Cloudflare complet dans
`dist/` : `dist/server/index.mjs` (SSR + fonctions serveur) et `dist/client/`
(assets statiques servis via le binding `ASSETS`).

## Prérequis

1. Un compte Cloudflare avec Workers activé.
2. Authentification locale :

   ```bash
   bunx wrangler login
   ```

## Variables d'environnement

Le Worker a besoin des mêmes variables que l'application. Déclarez-les une fois :

```bash
# Variables non sensibles
bunx wrangler secret put SUPABASE_URL
bunx wrangler secret put SUPABASE_PUBLISHABLE_KEY

# Clés sensibles (obligatoires pour l'admin et le serveur MCP)
bunx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
bunx wrangler secret put LOVABLE_API_KEY
```

Pour un test local (`bun run preview:worker`), copiez `.env` vers `.dev.vars`
à la racine du projet (jamais commité).

## Déployer

```bash
bun run deploy
```

Cette commande reconstruit le site puis publie le Worker sous le nom
`amaa-connect-hub` (défini dans `wrangler.json`). Les flags
`nodejs_compat` et `nodejs_compat_populate_process_env` sont passés par le
script car le code serveur lit `process.env`.

Pour un test local du Worker avant déploiement :

```bash
bun run preview:worker
```

## Domaine personnalisé

1. `bunx wrangler domains add amaa.example.org` (ou via le dashboard Cloudflare
   → Workers → amaa-connect-hub → Settings → Domains & Routes).
2. Mettez ensuite à jour le domaine canonique dans le code :
   - `src/routes/sitemap[.]xml.ts` → constante `BASE_URL`
   - `src/content/media.ts` → `siteOrigin`
   - `public/robots.txt` → directive `Sitemap:`
   - URLs `hreflang`/`og:url` générées via `src/lib/seo.ts` (basées sur `siteOrigin`)

## Notes

- `robots.txt` et le sitemap pointent actuellement vers
  `https://amaa-connect-hub.lovable.app` : changez-les si le domaine Cloudflare
  devient l'URL principale pour éviter les signaux SEO contradictoires.
- L'instance Supabase/Lovable Cloud (auth, base de données, stockage) reste
  hébergée telle quelle ; le Worker s'y connecte via HTTPS.
- Ne jamais éditer `dist/server/wrangler.json` : il est régénéré à chaque
  build. La personnalisation persistante se fait dans le `wrangler.json` racine
  (fusionné automatiquement au build).

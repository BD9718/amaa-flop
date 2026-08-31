# Déploiement Cloudflare Workers — AMAA

Le build de production (`bun run build`) génère un Worker Cloudflare complet dans
`dist/` : `dist/server/index.mjs` (SSR + fonctions serveur) et `dist/client/`
(assets statiques servis via le binding `ASSETS`).

**Tout est déjà configuré.** Les variables non sensibles (`SUPABASE_URL`,
`SUPABASE_PUBLISHABLE_KEY`) sont incluses dans `wrangler.json` — aucune autre
variable n'est nécessaire (l'admin passe par la session utilisateur, aucune clé
secrète côté serveur).

## Option A — Déploiement automatique (recommandé, zéro commande)

Un workflow GitHub Actions est prêt dans `.github/workflows/deploy.yml` :
chaque push sur `main` (ou chaque modification Lovable synchronisée) déploie
automatiquement le Worker.

Activation en 3 étapes, une seule fois :

1. Créez un token API Cloudflare : dash.cloudflare.com → **My Profile →
   API Tokens → Create Token** → modèle **Edit Cloudflare Workers** →
   portée « votre compte ».
2. Dans le dépôt GitHub du projet → **Settings → Secrets and variables →
   Actions → New repository secret**, ajoutez :
   - `CLOUDFLARE_API_TOKEN` = le token créé à l'étape 1
   - `CLOUDFLARE_ACCOUNT_ID` = votre Account ID (visible en bas à droite du
     dashboard Cloudflare, page Workers)
3. C'est tout : le prochain push déploie sur
   `https://amaa-connect-hub.<votre-compte>.workers.dev`. Vous pouvez aussi
   lancer manuellement via **Actions → Deploy to Cloudflare Workers → Run
   workflow**.

## Option B — Déploiement manuel depuis votre machine

```bash
bunx wrangler login
bun run deploy
```

Pour un test local du Worker avant déploiement : `bun run preview:worker`
(copiez d'abord `.env` vers `.dev.vars` à la racine, jamais commité).

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

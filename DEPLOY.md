# Déploiement Vercel — AMAA

Le build de production (`bun run build`) génère directement la structure
**Build Output API** de Vercel dans `.vercel/output` : la fonction SSR (+ les
fonctions serveur) et les assets statiques. Aucune configuration
supplémentaire n'est nécessaire.

## Option A — Déploiement via l'interface Vercel (recommandé)

1. Connectez le projet à GitHub depuis l'éditeur Lovable.
2. Sur [vercel.com/new](https://vercel.com/new), importez le dépôt.
3. Laissez les réglages par défaut : `vercel.json` fixe déjà
   - Install : `bun install --frozen-lockfile`
   - Build : `bun run build`
   - Framework : aucun (sortie Build Output API détectée automatiquement)
4. Cliquez sur **Deploy**. Chaque push sur `main` redéploie automatiquement,
   et chaque branche/PR obtient une preview.

Aucune variable d'environnement n'est requise : les identifiants publics du
backend (URL + clé publiable) sont injectés au build, et l'espace admin
s'authentifie via la session de l'utilisateur (aucune clé secrète côté
serveur).

## Option B — Déploiement manuel depuis votre machine

```bash
bun run build
bunx vercel login
bun run deploy          # vercel deploy --prebuilt
```

Ajoutez `--prod` pour publier en production :
`bunx vercel deploy --prebuilt --prod`.

## Domaine personnalisé

1. Vercel → projet → **Settings → Domains → Add**, puis suivez les
   instructions DNS.
2. Mettez ensuite à jour le domaine canonique dans le code :
   - `src/routes/sitemap[.]xml.ts` → constante `BASE_URL`
   - `src/content/media.ts` → `siteOrigin`
   - `public/robots.txt` → directive `Sitemap:`
   - Les URLs `hreflang`/`og:url` générées via `src/lib/seo.ts` suivent
     automatiquement `siteOrigin`.

## Notes

- `robots.txt` et le sitemap pointent actuellement vers
  `https://amaa-connect-hub.lovable.app` : changez-les si le domaine Vercel
  devient l'URL principale, pour éviter des signaux SEO contradictoires.
- Le backend (auth, base de données, stockage) reste hébergé tel quel ;
  les fonctions Vercel s'y connectent en HTTPS.
- Ne jamais éditer le contenu de `.vercel/output` : il est régénéré à chaque
  build.

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rules
- Server-side backend URL/publishable key are pinned constants in src/lib/env.ts, never read from process.env — the Vercel dashboard held stale env vars that silently pointed production at a dead backend.

- Site photos are served from Lovable asset pointers (src/assets/*.asset.json) via src/content/media.ts; resolveImage() maps legacy "/images/..." database paths — Lovable hosting does not serve public/images, so those paths 404 on amaa-mr.com.

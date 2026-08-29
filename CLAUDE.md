# Portfolio — Alejandro Zumbado Vargas

Personal portfolio site + multi-variant CV generator.

## Structure

- `portfolio/` — the deployed Astro 5 + Tailwind 4 site. This is the actual project; everything else feeds it.
- `CV/ES/<variant>/`, `CV/EN/<variant>/` — source-of-truth CVs (self-contained `.html` + `.md` + `.pdf`), 5 domain variants × 2 languages.
- `tools/cv-build/` — data-driven CV generator. `data/*.json` → rendered CVs, mirrored into `portfolio/public/cv/` (must land under `public/` or Astro won't serve them).

## Rebuilding after editing CV content

```
cd tools/cv-build
node build.js          # regenerates CV/*.html + .md, mirrors into portfolio/public/cv/
```

PDFs are separate — not part of `build.js`. Regenerate with headless Chrome, then re-run `build.js` so the mirror picks up the fresh PDFs:

```
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="<out>.pdf" --print-to-pdf-no-header "file:///<in>.html"
```

## Working on the site

```
cd portfolio
npx astro dev --background     # dev server, controllable via `astro dev stop` / `astro dev status`
npx astro check                # typecheck — run before every build
npx astro build                # production build → dist/
```

Content lives in one place: `portfolio/src/data/site.ts` (profile, projects, experience, skills, stats, CV index). Edit there, not in individual page/component files.

Client-side interactivity lives in `portfolio/public/scripts/*.js` as plain external files (not inline `<script>` blocks) — this keeps the CSP in `vercel.json` (which allow-lists exactly one inline script by hash) from breaking. If you add a new inline script, you must recompute that hash — see `.claude/init.txt` for the exact command, or just don't inline it.

## Deploy

`git push origin main` auto-deploys via Vercel (GitHub integration already connected). Live URL and account details: not in this file since they change — check `.claude/init.txt` or ask the user.

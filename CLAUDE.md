# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

melloware.com personal website — rebuilt from Gatsby to Astro 5. Static site with a blog, projects page, downloads page, and about page. Deployed to GitHub Pages. Node 18+ required.

## Commands

```bash
npm install          # install dependencies
npm run dev          # local dev server at http://localhost:4321
npm run build        # production build → ./dist/
npm run preview      # serve the production build locally
```

On Windows, if `npx astro` fails (bash shim), use the `.cmd` shim directly:
```powershell
.\node_modules\.bin\astro.cmd build
```

There is no lint or test command configured.

## Architecture

### Content Collections (Astro 5 Content Layer)

Blog posts live in `src/content/blog/`. Each post is a directory containing `index.mdx` plus any co-located images:

```
src/content/blog/
  quarkus-faces/
    index.mdx        # frontmatter: title, date, tags[], banner? (relative image path)
    QuarkusFaces.webp
```

The collection schema is defined in `src/content.config.ts` (root of `src/`, not inside `src/content/`) using `glob()` loader. The `banner` field uses Astro's `image()` helper so images are processed through the optimization pipeline.

**Slug generation**: The `id` from the Content Layer is the file path (`quarkus-faces/index.mdx`). All routing strips `/index.mdx` to get the slug. **Avoid dots in directory names** (e.g., use `primefaces-14-0-0` not `primefaces-14.0.0`) — Astro strips dots from dynamic route params.

### Routing

All routes are file-based in `src/pages/`:

| Route | File |
|---|---|
| `/` | `src/pages/index.astro` |
| `/blog/` | `src/pages/blog/index.astro` |
| `/blog/[slug]/` | `src/pages/blog/[slug].astro` |
| `/tags/` | `src/pages/tags/index.astro` |
| `/tags/[tag]/` | `src/pages/tags/[tag].astro` |
| `/about/` | `src/pages/about.astro` |
| `/projects/` | `src/pages/projects.astro` |
| `/downloads/` | `src/pages/downloads.astro` |
| `/rss.xml` | `src/pages/rss.xml.ts` |

### Layouts and Components

- `src/layouts/BaseLayout.astro` — HTML shell (head, meta tags, header, footer, global CSS)
- `src/layouts/BlogPostLayout.astro` — wraps BaseLayout, renders post header (title, date, tags, banner)
- `src/components/Header.astro` — sticky nav bar with logo and nav links; highlights active link
- `src/components/Footer.astro` — copyright + Stack Overflow/GitHub/Sponsors badges
- `src/components/PostCard.astro` — blog post preview card used on index and blog listing

### Styling

Plain CSS only — no framework. All global tokens (colors, fonts, max-width) are CSS custom properties in `src/styles/global.css`. Dark mode is via `@media (prefers-color-scheme: dark)`. Per-component styles use Astro's `<style>` scoped blocks.

Key custom properties: `--bg`, `--bg-secondary`, `--text`, `--text-muted`, `--accent`, `--border`, `--max-width`.

### Static Assets

`public/` is copied directly to the build output. Contains:
- Favicons and web manifest
- `logos/` — Melloware logo variants (svg, png, pdf)
- `projects/` — Project logos referenced by `src/pages/projects.astro`
- `downloads/` — Download assets (logos + zip files) referenced by `src/pages/downloads.astro`

### Code Highlighting

Astro uses Shiki by default, configured in `astro.config.mjs` with `github-light` / `github-dark` theme pair for automatic dark mode support.

### Deployment

Push to `main` → GitHub Actions → builds and deploys to GitHub Pages. The workflow file should mirror the one in the sibling `../melloware/` Gatsby project (`.github/workflows/gatsby.yml`) adapted for Astro.

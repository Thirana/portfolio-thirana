# Redesign follow-ups

Backlog for the `change-ui-theme` branch, parked on 2026-11-03 while new content is added.
Pick this up once the new blog posts / projects are in.

## Already done

- [x] Dev server fix: run on Node 24 (`nvm use`); Node 20.14 cannot load the ESM-only MDX plugins in `next.config.ts`.
- [x] Stopped tracking the impeccable skill files (`aac181a`) - use **Squash and merge** so the 34 MB never reaches `main`.
- [x] Prettier formatting fix for redesign files (`026e112`); typecheck, lint, and prettier:check all pass.

## While adding new content (avoid creating more debt)

- Use ASCII hyphens (`-`), never em or en dashes.
- Project `status` must be one of `Live | Ongoing | WIP | Paused | Completed`.
- Project `domains`, `constraints`, and `metrics` are paired **by position** into the "Concepts and strategies" table. Write them so item 1 of each list belongs together, item 2 together, and so on, with the same count in all three. (Or do fix #1 below first and use explicit rows.)
- Blog frontmatter needs: `title`, `date` (YYYY-MM-DD), `summary`, `tags`, `level`, `track`, `appliesTo`, `takeaway`.

## Work case studies (added 2026-11-03)

- [x] Published `content/work/admin-panels-cloud-run-iap.mdx` (draft flag removed 2026-11-04).
- [x] Production `/work` is no longer empty now that the first case study is published.
- [x] Link Experience timeline entries to their case studies (2026-11-20: a "Case studies" list inside each expanded entry).
- [x] Card marks (2026-11-20, replaced the `cover` thumbnails): optional `mark` frontmatter (path to a small hand-drawn SVG) and optional `cardTitle` (one-line title for cards).
- [x] Mermaid diagrams and tables scroll sideways inside their card on phones (2026-11-20: tables stack per row with column labels via `src/lib/rehype-table-labels.ts`; Mermaid fits the width, Expand for full size).
- [ ] Next case study from `~/Documents/Personals/mo-work-experience`.

### Style for every work case study (agreed 2026-11-04)

- **Diagrams:** hand-drawn Excalidraw, not Mermaid. Source in `content/work/diagrams/<slug>/<name>.excalidraw`, exported SVG in `public/diagrams/work/<slug>/<name>.svg`, embedded with `<Diagram src alt width height caption />` (width/height from the SVG viewBox).
  - Export with no background: `"exportBackground": false` in the file's `appState`, so the diagram sits straight on the paper. No card behind it.
  - Colors and fonts from `.claude/skills/excalidraw-diagram-skill/references/color-palette.md` (site palette, Excalifont labels, mono for code only).
  - Prefer elbow (right-angle) arrows over diagonals: multi-point arrows with `"roundness": null`.
  - Render: `cd .claude/skills/excalidraw-diagram-skill/references && uv run python render_excalidraw.py <file> --output <png> --svg <svg>`
- **Tables:** no white card on work pages; ruled top/bottom and between rows, text aligned to the prose (`.work-prose .mdx-table` in `globals.css`). Blog tables keep the card.
- **Callouts:** `<Callout title="...">` (green by default; `tone="warning"` / `"note"`) for the one sentence a reader must not miss, e.g. the goal.
- **Card mark:** one simple hand-drawn object for the note's topic (shield, key, cookie), drawn in Excalidraw with solid light fills, no background, exported to `public/diagrams/work/<slug>/mark.svg`. Sources in `content/work/diagrams/marks/`. Keep `cardTitle` short enough for one line (about 40 characters).
- **Copy:** never frame the work by how long it took (no "one day", no clock-time timelines) - it undersells the scope. Present the user's own setup (e.g. release-please) as their work. No hostnames, IPs, project IDs, SA emails or colleague names. Don't hint at the naming pattern either (no `staging.<domain>` / `admin-staging.<domain>`): say "the staging website", "the admin panel".

## Audit fixes (from the 2026-11-03 audit, score 14/20)

1. [ ] **[P1] Capability table rows are mismatched on every project page.**
       `src/app/projects/[slug]/page.tsx:107-123` zips `domains` / `constraints` / `metrics` by index, and the lists don't line up
       (e.g. Marketplace: "Database Integrity" next to "Notifications: Persisted intent"; Grow Logs (since removed) had 5 domains but 3 constraints, so the last constraint repeats).
       Fix: replace with an explicit frontmatter list of `{ domain, focus, strategy }` rows, validate it in `src/lib/content.ts`, and rewrite the data for all projects.
2. [ ] **[P2] Heading skip on `/projects`.** `src/components/ProjectCard.tsx:30` renders `h3` directly under the page `h1`. Add a heading-level prop (h2 on `/projects`, h3 on home).
3. [ ] **[P2] Remove the stat strips under the Writing and Projects page titles.**
       "1 tracks" (forced by `trackCount || 1` in `src/app/blog/page.tsx:46`), ISO "2026-05-20 latest", "3 evidence links" - filler that PRODUCT.md lists as an anti-reference ("hero metrics").
4. [ ] **[P2] Replace em/en dashes in blog posts** (67 across all 7; 24 in `session-security-in-practice.mdx`). Mostly `—` -> `-`, read each one. Check any new posts too.
5. [x] **[P3] About page portrait** (2026-11-20: replaced with the interactive mascot; DESIGN.md updated) (`/images/square.png`) conflicts with DESIGN.md ("the mascot stands in for a portrait"). Decide: keep it and update DESIGN.md, or swap to the mascot.
6. [ ] **[P3] Line length.** Card summaries run ~94 chars/line on desktop; About lede isn't capped at 34rem like the home lede.
7. [ ] **[P3] Mermaid diagrams.** `rect rgb(...)` tints in the MDX sit outside the palette; labels render small on desktop (Expand exists).

Not yet tested: mobile nav drawer, sticky header scroll state, keyboard focus order, reduced motion, Lighthouse.

## Docs refresh

- [ ] Update `CLAUDE.md`: document `content/work/*.mdx` (frontmatter: company id from experience.ts, highlights, glance, outcomes, draft) and the `work` revalidate scope; light "paper notebook" theme with hex tokens (not dark/OKLCH), add `Ongoing` status, point to `DESIGN.md` + `PRODUCT.md` as design source of truth, fix the missing `AGENTS.md` reference.
- [ ] Optional: `PRODUCT.md` `## Register` section is no longer read by the impeccable skill; delete it or run `/impeccable init` to refresh.

## Before merging

- [ ] `npm run build` (prerenders every post and project)
- [ ] typecheck, lint, prettier:check clean
- [ ] Re-run `/impeccable audit` to confirm the score went up
- [ ] Open PR `change-ui-theme` -> `main`, **Squash and merge**

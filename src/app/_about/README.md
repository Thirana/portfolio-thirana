The About page is hidden for now. A folder whose name starts with `_` is
private in the Next.js App Router, so `/about` is not a route and returns 404.
To bring the page back, rename this folder to `about`, then add `/about` back
to `mainNav` in `src/lib/site.ts`, to `src/app/sitemap.ts`, and as the author
URL in the detail pages' JSON-LD.

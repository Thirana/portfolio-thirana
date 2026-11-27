# thirana.com launch checklist

The site went live on https://thirana.com on 2026-11-27.

## Current setup

- **Registrar and DNS:** Cloudflare. Auto-renew is on (next renewal October 2027).
- **DNS records:** two CNAME records, `@` and `www`, both pointing to Vercel's `vercel-dns-017.com` target. Both are **DNS only** (grey cloud). Do not turn the Cloudflare proxy on: Vercel handles HTTPS and needs to see the traffic directly.
- **Vercel:** `thirana.com` is the production domain. `www.thirana.com` and `portfolio-thirana.vercel.app` redirect to it with a 308.
- **Environment variables:** `NEXT_PUBLIC_SITE_URL=https://thirana.com` (Config, all environments) and `REVALIDATE_SECRET` (Secret). `NEXT_PUBLIC_SITE_URL` is read at build time, so any change to it needs a redeploy.

## To do soon

### 1. Google Search Console

Done 2026-11-27: verified through Cloudflare (the `google-site-verification` TXT record on `@` must stay), sitemap submitted with 10 pages, indexing requested for the home page.

- [x] Go to https://search.google.com/search-console and add a property of type **Domain** for `thirana.com`.
- [x] Copy the TXT record Google shows, add it in Cloudflare (**DNS -> Records -> Add record**, type TXT, name `@`), then click **Verify** in Search Console.
- [x] Under **Sitemaps**, submit `https://thirana.com/sitemap.xml`.
- [ ] After a few days, check **Pages** for any URLs that were not indexed.

### 2. Update links to the site

- [ ] LinkedIn: the profile's website link, and any Featured items that point to the old address.
- [ ] CV.
- [ ] GitHub profile: the website field.
- [ ] Any older posts or messages that link to `portfolio-thirana.vercel.app`. These still work through the redirect, so this is optional.

### 3. Check the share card

- [ ] Paste `https://thirana.com` into LinkedIn's Post Inspector (https://www.linkedin.com/post-inspector/) so LinkedIn fetches the new title and share image before the link is posted.
- [ ] Do the same for one work note or project page.

### 4. Email for the domain

Without email records, anyone can send email that pretends to come from `@thirana.com`. Pick one option.

- [ ] **Option A - receive email at the domain:** in Cloudflare, open **Email -> Email Routing**, enable it, and add an address such as `hello@thirana.com` that forwards to the personal inbox. Cloudflare adds the MX and SPF records itself. Then add a DMARC record: TXT, name `_dmarc`, value `v=DMARC1; p=quarantine;`.
- [ ] **Option B - no email at the domain:** add two TXT records:
  - name `@`, value `v=spf1 -all`
  - name `_dmarc`, value `v=DMARC1; p=reject;`

## Optional later

- [ ] Move Drydock from `drydock-coral.vercel.app` to `drydock.thirana.com`: add the domain in the Drydock project in Vercel, then add the CNAME it asks for in Cloudflare (DNS only). Update the Live link in `content/projects/drydock.mdx` afterwards.
- [ ] HSTS is sent with `includeSubDomains`, so every subdomain must serve HTTPS. Vercel and Cloudflare do this automatically, but keep it in mind for anything hosted elsewhere.

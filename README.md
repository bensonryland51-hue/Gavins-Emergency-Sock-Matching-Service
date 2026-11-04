# Gavin's Emergency Sock Matching Service

A static parody website for **https://gavins-emergency-sock-matching-service.com**.
It is a joke. It is not a real business. No socks will be matched.

Plain HTML and CSS with a small script. No build step, no dependencies, no analytics.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole site (hero, how it works, pricing, testimonials, Meet Gavin, FAQ, hotline, footer) |
| `styles.css` | All styling. Colours are CSS variables at the top (`--red`, `--navy`, …) |
| `script.js` | Pricing pop-up ("Gavin has been notified") and the fake report form. Sends nothing anywhere |
| `404.html` | "This sock has gone missing" page, served by GitHub Pages for unknown paths |
| `images/` | `logo.svg`, `favicon.svg`, `gavin.svg` (cartoon silhouette), `og-image.svg` + `og-image.png` (link preview), `apple-touch-icon.png` |
| `robots.txt` | Allows all crawlers |
| `CNAME` | The custom domain for GitHub Pages. **Do not delete or edit it** |

## Editing

1. Edit the text directly in `index.html` (or in the GitHub web editor: open the file and click the pencil).
2. Preview locally. The site uses root-relative paths (`/styles.css`), so serve it rather than double-clicking:

   ```bash
   python3 -m http.server 8000
   # open http://localhost:8000
   ```

3. If you change `images/og-image.svg`, re-export it as a 1200×630 `images/og-image.png`
   (social apps don't accept SVG preview images).

Keep it clearly a parody: no real phone numbers, no payment buttons, no real personal details about Gavin,
and keep the footer disclaimer visible.

## Deploying

The site is published by **GitHub Pages → Deploy from a branch → `main` / `(root)`**.
Every push to `main` redeploys automatically in about a minute (see the **Actions** tab,
"pages build and deployment").

```bash
git add -A
git commit -m "Describe your change"
git push origin main
```

If a change doesn't show up, try a private window, or purge the Cloudflare cache
(Caching → Configuration → Purge Everything).

Never commit secrets. `.env` files are git-ignored.

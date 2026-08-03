# Personal Website — Vysakh Ramachandran

Plain HTML/CSS/JS site with a light/dark mode toggle. No build step, no framework.

## Structure

```
index.html          Single page: Home, Research, Publications, Teaching & Achievements, Gallery, Contact
css/style.css        All styling, theme variables for light/dark mode
js/script.js         Theme toggle, mobile nav, contact form handling
image/               Your photos (profile picture + gallery) go here
assets/              Your CV PDF goes here
```

## Before you publish — 3 things to add

1. **Profile photo**: drop a photo into `image/` named `profile.jpg` (used in the Home section).
   If it's missing, the circle just shows your initials — nothing breaks.
2. **CV**: drop your CV PDF into `assets/` named `Vysakh_Ramachandran_CV.pdf` (the "Download CV" button
   links to this path). Rename the file or update the `href` in `index.html` if you'd rather use a
   different filename.
3. **Gallery photos**: replace the three placeholder boxes in the Gallery section (`index.html`, inside
   `#galleryGrid`) with `<img>` tags pointing at files in `image/` whenever you have photos to add. Example:
   ```html
   <div class="gallery-item"><img src="image/lab1.jpg" alt="Description"></div>
   ```

## Contact form (optional but recommended)

The contact form currently falls back to opening the visitor's email client (a `mailto:` link) when they
hit Send — this works out of the box with zero setup. If you'd rather receive submissions directly by
email without the visitor needing an email client to pop up:

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form, copy the endpoint it gives you (looks like `https://formspree.io/f/xxxxabcd`).
3. In `index.html`, find `action="https://formspree.io/f/YOUR_FORM_ID"` on the `<form id="contactForm">`
   element and replace `YOUR_FORM_ID` with your real ID.

That's it — the JS in `script.js` automatically detects whether Formspree is configured and switches
behavior accordingly.

## Updating content later

- **Research**: edit the two cards inside `<section id="research">` in `index.html`. Add more `<article
  class="card">` blocks the same way as your work expands.
- **Publications**: add a new `<li class="pub-item">` block at the top of the list in `<section
  id="publications">` — the numbering is automatic (CSS counter), and the list is ordered newest-first.
- **Teaching & Achievements**: edit the `<ul class="plain-list">` blocks in `<section id="teaching">`.

## Running locally

Just open `index.html` in a browser, or serve it locally for a closer-to-production feel:

```powershell
python -m http.server 8000
# then visit http://localhost:8000
```

## Publishing to GitHub Pages (username site)

This will publish at `https://<your-username>.github.io/`.

```powershell
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/VysakhRamachandran/VysakhRamachandran.github.io.git
git push -u origin main
```

Notes:
- The **repository name must be exactly** `VysakhRamachandran.github.io` (case-insensitive, but match your
  GitHub username exactly) for a username site to work.
- Create that empty repo on GitHub first (no README/license — this folder already has one), then run the
  commands above.
- No further configuration is needed for a username-site repo — GitHub Pages serves `index.html` from the
  `main` branch root automatically. If it doesn't appear within a minute, check the repo's
  **Settings → Pages** and make sure the source is set to "Deploy from branch: main / (root)".
- Every future `git push` to `main` updates the live site within ~1 minute.

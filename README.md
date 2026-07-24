# Jim Christian Ayco — Portfolio

Personal portfolio of **Jim Christian Ayco**, Junior Software Developer at Enki.AI.
Focus: AI Automation · Workflow Automation · API Integration · Web Development · UI/UX Design.

🔗 **Live site:** _enable GitHub Pages (see below), then paste the URL here._

## Pages
- **Home** — intro, featured work, skills overview
- **About** — story, focus areas, education, journey
- **Experience** — Enki.AI role + contributions
- **Projects** — real n8n automation workflows (interactive boards), Chrome extensions, web & mobile apps
- **Skills** — tools & technologies
- **Contact** — info + working message form (EmailJS)

## Tech
Static multi-page site — HTML, Tailwind (CDN), vanilla JS. Shared design system in [`assets/`](assets/):
`styles.css` (tokens, light/dark), `site.js` (nav, footer, theme, background), `n8n-viz.js` (workflow boards),
`projects-data.js` / `workflows-data.js` (content).

## Run locally
```bash
python -m http.server 8000
# open http://127.0.0.1:8000
```

## Deploy (GitHub Pages)
Repo → **Settings → Pages** → Source: `main` branch, `/ (root)` → Save.
Site publishes at `https://<username>.github.io/<repo>/`.

## Notes
- Workflow boards render from anonymized graph data (node names + layout only) — no credentials or company data.
- Dark mode preference is saved in the browser.

© 2026 Jim Christian Ayco.

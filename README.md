# Bima Yangu

**Health cover, plainly explained.** A mobile-friendly catalogue and decision aid for health insurance in Uganda, built for the UIA Career Expo 2026 Live Employer Challenge ("Simplified Health Insurance Access", 29 October 2026).

A user can browse plans without an account or any medical questions, see what a plan pays for, what it refuses, what its money limits are, compare two or three plans on identical fields, and walk an enrolment checklist to a real contact route.

---

## Run it

No build step, no dependencies, no network calls. Pick either:

**Option A — open the file**

Open `index.html` in a browser. Everything works offline.

**Option B — local server (recommended; matches a phone more closely)**

```bash
# any static server works
python -m http.server 8137
# then open http://127.0.0.1:8137/
```

To demo on a phone: connect the phone to the same Wi-Fi and open `http://<your-laptop-ip>:8137/`, or use the browser's device toolbar at 390 × 844.

Deploy anywhere static (GitHub Pages, Netlify, Cloudflare Pages) by uploading `index.html` and `assets/`.

---

## What is where

```
index.html                 app shell
assets/css/styles.css      all styling, mobile-first, no external fonts
assets/js/data.js          product records + glossary + sources  ← edit products here
assets/js/app.js           router, screens, compare engine, glossary sheet
docs/ANALYSIS.md           the thinking: brief breakdown, Prudential teardown, data model, screen map
```

Screens (hash routes, all shareable):

| Route | Screen |
|---|---|
| `#/plans` | Catalogue with search and audience filters |
| `#/plan/:id` | Plan detail: coverage, exclusions, limits, waiting periods, enrolment, contact |
| `#/compare` | Up to 3 plans on identical rows, with "only show differences" |
| `#/enrol/:id` | Enrolment checklist with progress, documents, call script, contact route |
| `#/glossary` | 23 terms; also available as a bottom sheet from any dotted word |
| `#/find` | Three-question shortlist (who / budget / cashless) — no health questions |
| `#/help` | What the tool does and refuses to do, data sources, privacy |

---

## Data policy (the part judges should probe)

Every product record carries `sourceType`:

- **`published`** — facts taken from the insurer's own public page. The record shows the source link and the date checked (`29 October 2026`). Nothing is estimated.
- **`demo`** — written for this prototype to cover the informal-sector case (a market trader micro plan and a boda rider daily accident plan). Badged "Demonstration data" on the card, the detail page and in the compare column. Their contact routes are deliberately blank.

When an insurer does not publish something, the field stays empty and the interface says so:

- **No exclusion list published** → an "Exclusions not published" state plus the question to ask, and a separately labelled panel of *generic* industry exclusions that is explicitly not that plan's terms.
- **No price published** → "Not published — request a quote", never an invented figure.
- A "What we could not confirm" box lists every gap per product.

No account, no medical history, no payments, no analytics, no outbound requests. The only persistence is `localStorage` for the compare selection and checklist ticks.

---

## Products in the catalogue

| Product | Insurer | Type | Source |
|---|---|---|---|
| Individual Health Plan | Prudential Assurance Uganda | Individual | Published |
| Group Health Plan | Prudential Assurance Uganda | Group | Published |
| J-Care Individual / Family | Jubilee Health Insurance Uganda | Family | Published |
| Market Traders Micro Health Cover | — | Micro | Demonstration |
| Boda Rider Daily Accident Cover | — | Micro | Demonstration |

Sources are listed on `#/help` and in `docs/ANALYSIS.md`.

---

## Incomplete features (deliberately not built)

- **No premium engine.** Insurers do not publish rates, so the tool sends you for a quote instead of guessing. Price matching in `#/find` therefore leans on demonstration data and says so.
- **No network hospital lists.** They change often and are large; the records point to the insurer instead.
- **No eligibility decisioning, enrolment submission, claims filing or payment.** Out of scope by the brief.
- **No Luganda/Runyankole translation yet.** Highest-value next step for the actual audience.
- **Demonstration micro products are illustrative,** not market research or quotes from a real scheme.
- **No backend.** Intentional: nothing about a user's health or money touches a server.

---

## Submission checklist

- [x] Working prototype (`index.html` + `assets/`) — runs offline, mobile-first
- [x] Source code (this repository)
- [x] Setup instructions (above)
- [x] Sample product records (`assets/js/data.js`, five records)
- [x] Short explanation of incomplete features (above, and `#/help`)
- [x] Analysis and structure (`docs/ANALYSIS.md`)

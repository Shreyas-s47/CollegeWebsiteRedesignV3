# SEA Website — Master Plan (Corrections + Enhancement)

**Last revised:** 2026-07-26
**Context:** competition entry, built with the college’s approval. Formal client-style sign-off gates do not apply; factual accuracy still does.
**Status of this document:** rewritten after a full audit of the code actually in `src/`, the 43 scraped files in `content/`, the live site rendered in a browser at desktop and mobile widths, and a direct query of the Magic UI MCP registry (§5).

This is **not** an enhancement-only document. Section 2 lists defects that exist in the site *right now* and must be fixed before anything new is built. Later sections describe growth work. Where the previous version of this plan disagreed with the built site, the built site won and the plan text has been corrected — every such correction is listed in section 3 so nothing silently drifts again.

---

## 1. Ground truth — what actually exists today

Anyone picking this up should trust this section over memory or older notes.

**Stack:** Next.js 15.1.4 (App Router) · React 19 · TypeScript 5.7 · `framer-motion` 12
`next.config.ts` → `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`.
**Static export. There is no server, no API route, no database, no CMS.** Anything requiring a runtime (form submission, search API, analytics proxy) needs an external service.

**Routes that exist (24):**
`/` · `/explore/` · `/explore/[slug]/` ×12 · `/academics/` · `/campus-life/` · `/campus-life/facilities/` · `/placements/` · `/about/` · `/admissions/` · `/admissions/international/` · `/gallery/` · `/contact/` · plus `sitemap.xml` and `robots.txt`

**Components that exist:**
`site-header` · `mobile-menu` · `search-modal` · `footer` · `motion` (Reveal, RevealStagger, RevealItem, RevealList, TiltCard, ScrollParallax, ParallaxPhoto, Counter, Marquee, MagneticLink) · `hero-parallax` · `programme-directory` · `crest-shine` · `scroll-timeline` · `lightbox-gallery` · `contact-form` · `hash-highlight` · `social-icons`

**Shared behaviour:** `src/lib/use-dialog-behaviour.ts` — Escape, focus trap, focus return, scroll lock, optional arrow-key paging. Used by the mobile menu, search dialog and lightbox. **Any new dialog must use it.**

**Data:** `src/lib/streams.ts` (12 institutions, build-time validated) · `src/lib/programmes.ts` (32 programmes) · `src/lib/search-index.ts` · `src/lib/site.ts` (routes + canonical origin).

**Content registry:** `src/lib/streams.ts` — 6 academic streams covering all 12 institutions. **This is the single source of truth for institution grouping.** Do not create a second one (see §3).

**Design system** (hand-written CSS in `globals.css`, no Tailwind, no UI kit):

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#f5ede5` | page ground |
| `--ink` | `#121212` | text, borders, dark sections |
| `--indigo` | `#4B0082` | **primary brand** — CTAs, nav active, focus rings, eyebrows |
| `--orange` | `#D9491F` | accent (Law stream, admission banner) |
| `--yellow` | `#D4A72C` | accent (Management stream, story panel) |
| `--green` | `#0E8F52` | accent (Nursing stream) |
| `--purple` | `#7C4DDC` | accent (Schools stream, gallery intro) |
| `--line` | `rgba(18,18,18,.75)` | hairlines |

Type: **Archivo Black** (display) + **Manrope** (body), loaded from Google Fonts via `@import` in `globals.css`.
Motion easing: `[0.16, 1, 0.3, 1]`. Micro-interactions ~150–350 ms, section transitions ~400–700 ms.
`prefers-reduced-motion` is honoured globally at the bottom of `globals.css`.

**Images:** 70+ files in `public/images/`, all served locally. Nothing hotlinks `seaedu.ac.in` any more — keep it that way.

---

## 2. CORRECTIONS — defects in the current site

Ordered by severity. **P0 blocks publication.**

> **Sprint 1 status (2026-07-25): P0-1 → P1-6 and P2-7 are FIXED and verified against the static export in `out/`. Sprint 2 items 1–3 and 5 are also DONE** (validated registry, 12 institution pages, `/placements/`, nav updated).
> Remaining open: **P0-3 is only half-resolved** (see its entry — the form now composes a real email instead of faking success, but a hosted endpoint is still the proper fix), plus **P2-8** and **P2-9**.
> Verification run: `npm run build` clean · 12/12 static pages · all 7 routes at 390 px and 2560 px with zero console errors, zero failed requests, zero horizontal overflow · both dialogs keyboard-operable end to end.

### P0-1 · ✅ FIXED — Published student and faculty numbers were not real data

The home hero and the campus section both publish **"84,858+ students"** and **"868+ teachers"**. These came from `content/about/overview.md`, where the scraper captured:

```
84,858187      ← two numbers mashed together
#### Students
868480         ← same
#### Teachers
8584           ← "Subjects"
828689         ← "Degrees"
```

Those are scraper artifacts from an animated counter widget (rendered value concatenated with its `data-target`), **not published figures**. The numbers we display were invented by splitting that garbage. 84,858 students across 12 institutions with 868 teachers is also a 1:98 ratio, which is not plausible.

*Fix:* remove both figures immediately. Replace with metrics that **are** clean in the source, or leave the slot out. Do not re-derive a number from `84,858187`.

**Verified-clean metrics** (safe to publish, all from `content/placements/placement-overview.md` unless noted):

| Metric | Source |
| --- | --- |
| 160+ recruiters | placement-overview |
| 80+ internship companies | placement-overview |
| 23% salary hike YoY | placement-overview |
| 2,000+ alumni network | placement-overview |
| 10+ campus start-ups | placement-overview |
| 422+ IRE talk series | placement-overview |
| 50+ students of other nationalities | about/overview |
| 12 institutions | counted; exactly 12 |
| Established 2000 | about/overview, founder |

*Affected:* `src/app/page.tsx` (hero stat bar; campus `stat-row`).

### P0-2 · ✅ FIXED — There was no mobile navigation at all

`globals.css` sets `.site-header nav { display:none; }` below 800 px, and **no mobile menu component exists anywhere in `src/`.** On a phone the header offers only the logo and Apply. Every other page is reachable only by scrolling to the footer.

Given the audience is largely mobile, this is the most damaging defect on the site.

*Fix:* build an accessible mobile menu — a labelled `<button aria-expanded aria-controls>`, focus trap while open, Escape to close, focus returned to the trigger, body scroll locked, full keyboard operation. Apply stays visible in the collapsed bar.

### P0-3 · ⚠️ ENDPOINT-READY, awaiting a provider decision — Contact and newsletter forms were decorative

`contact-form.tsx` and `newsletter-signup.tsx` call `preventDefault()`, set local state, and render **"Thanks — we'll be in touch shortly."** Nothing is transmitted. A prospective student who enquires believes they have contacted the college; nobody receives it.

**Done so far:** the false confirmation is gone. The contact form now composes the enquiry into the visitor's own mail client via `mailto:` — which genuinely sends — and says so plainly, with the direct phone/email shown as the reliable alternative. The fake newsletter signup was deleted outright and replaced with links to SEA's real WhatsApp channel and Instagram.

**Now endpoint-ready:** the form posts to `process.env.NEXT_PUBLIC_FORM_ENDPOINT` when that is set at build time, and falls back to `mailto:` when it is not. Sending/sent/error states and the intro copy switch automatically. **Switching to a real backend is a single env var — no code change.**

**Still required (decision, not code):** choose a provider (Formspree, Basin, Netlify Forms, or an SEA API), confirm its server-side validation, spam protection and retention/consent policy, then set `NEXT_PUBLIC_FORM_ENDPOINT`. Until then no enquiry is captured server-side.

### P0-4 · ✅ FIXED — Gallery lightbox was unusable by keyboard

`lightbox-gallery.tsx` puts `onClick` on a `<figure>`. There is no `role`, no `tabIndex`, no key handler — a keyboard or screen-reader user **cannot open the lightbox at all**. Once open there is no `role="dialog"`, no `aria-modal`, no Escape, no focus trap, no focus return, no previous/next, and background scroll is not locked.

*Fix:* trigger becomes a real `<button>`; dialog gets `role="dialog"` + `aria-modal="true"` + labelled title; Escape closes; focus trapped while open and returned to the invoking button on close; add previous/next controls with arrow-key support; lock body scroll.

### P1-5 · ✅ FIXED — Stale and thin metadata

`layout.tsx` still declares `title: "SEA — Many Directions"`. "Many Directions" was the abstract Build/Lead/Care/Create/Explore concept that was **deliberately removed**; the site now says "One campus. Twelve institutions." The browser tab contradicts the page.

Also missing: per-route metadata, canonical URLs, Open Graph/Twitter images, `sitemap.xml`, `robots.txt`, and a `lang`-correct descriptive title pattern.

*Fix:* site title → `SEA Group of Institutions — Bengaluru` (or SEA-approved wording); add per-route `metadata` exports; add sitemap/robots as static-export-compatible files. Add structured data **only** for facts SEA has verified — no invented ranking, review, or course schema.

### P1-6 · ✅ FIXED — Missing baseline accessibility affordances

- No skip-to-content link.
- Nav active state is styled but never exposed programmatically — needs `aria-current="page"`.
- Animated `Counter` values are read out mid-tween by some screen readers; final value should be the accessible name (e.g. render the true value in the DOM and mark the animation `aria-hidden`).
- `<img>` tags have no `width`/`height`/`aspect-ratio`, so they can shift layout (CLS) before load.

### P2-7 · ✅ FIXED — "12+" and "26+" were wrong

There are **exactly 12** institutions and, from 2000 to 2026, **exactly 26** years. The `+` suffix implies more. Drop it on those two stats; keep it on the genuinely open-ended ones (160+ recruiters, 2,000+ alumni).

### P2-8 · ✅ FIXED — `hash-highlight` only fired on mount

`HashHighlight` reads `window.location.hash` inside a mount-only `useEffect`. Navigating from `/explore/#law` to `/explore/#schools` (already on the page) changes the hash without remounting, so the highlight never re-fires. Listen for `hashchange` / react to the routed hash as well.

### P2-9 · ✅ FIXED — Structural odds and ends

**Done:** the **eight** scattered `@media (max-width:800px)` blocks are merged into a single labelled breakpoint at the end of `globals.css`, with the global reduced-motion override deliberately last. Dead rules removed after an automated audit of every class selector against the source tree: `.course-finder` (component deleted — `/academics/` supersedes it), `.pathway-mark`, `.stat-row`, and the legacy `.wordmark` grid/letter-spacing rules.

**Still worth doing eventually:** `RevealList` keys `<motion.li>` by array index (fine while lists are static), and `globals.css` would benefit from splitting into token / layout / component layers.

---

## 3. Plan-vs-reality mismatches now corrected

The previous plan drifted from the build. Each row is a resolved contradiction — **follow the "Corrected position" column.**

| Previous plan said | Reality | Corrected position |
| --- | --- | --- |
| Create `src/lib/institutions.ts` as the typed registry | `src/lib/streams.ts` already exists and is used by home + explore | **Extend `streams.ts`.** Do not create a second registry — two sources of truth for the same 12 institutions is exactly how mismatches start. |
| Nav = Explore, Academics, Campus Life, Placements, Admissions, About, Gallery, Contact | Nav = Explore, Campus life, About, Admissions, Gallery, Contact | Nav grows **only as routes ship.** Never list a link before its page exists. |
| Build a `NeonCta`; use "neon" effects | Design direction is indigo + jewel-tone editorial; nothing neon anywhere | **Drop "neon" from the vocabulary.** The primary CTA is `.primary-cta` (indigo pill, magnetic hover). Name any new work after what it does, not a look we rejected. |
| Add `BentoGrid` and `ShimmerText` components | Campus Life already renders an asymmetric bento in CSS; no shimmer exists and body-text shimmer is banned by our own motion rules | Keep the existing bento. **Reject ShimmerText** — it animates body text. |
| "Paper/Ink and Midnight themes", theme toggle, pre-paint init | No dark theme, no toggle, no dark tokens | Dark mode is **deferred, not in progress.** It is a real project (every token, photo overlay, and gradient needs a dark counterpart). Do not half-ship it. |
| Hero to be introduced "in two stages", image-first then optional 3D | Hero is already built: local campus photo + Smart Course Finder + parallax + floating stat bar | Hero is **done.** The 3D gate below still stands for any future addition. |
| Gallery lightbox "already implemented — extend and harden" | True, but it is not keyboard-operable at all | Hardening is **P0-4**, not a nice-to-have. |
| Spline / R3F not installed | Correct | Unchanged — see §6. |

---

## 4. Content coverage — what we scraped, and one file that must never be published

### ⛔ P0-10 · `financial-aid.md` describes a DIFFERENT college — do not publish

`content/admissions/financial-aid.md` is almost entirely about **Krupanidhi Group of Institutions**, an unrelated Bangalore college, including a named commercial loan tie-up:

> "**Krupanidhi Group of Institutions** has tied up with **Credenc** to help students avail education loans…"
> "The education loan for the students of **Krupanidhi Group of Institutions** are offered based on…"

`content/admissions/admission.md` is contaminated too ("…the admission procedures too **at Krupanidhi**. … When you try **Krupanidhi** you can be at peace…").

SEA's live site appears to carry copy-pasted text from another institution — probably via a shared template vendor. **Publishing it on SEA's site would state a false financial arrangement to families making money decisions, and would misrepresent a third party's commercial partnership.**

*Action:* no financial-aid or scholarship page was built, and **`scripts/check-output.mjs` now fails the build** if `Krupanidhi`, `Credenc`, the fabricated `84,858`, or the old false submission confirmation ever appears in exported HTML (wired into `npm run build`; verified by injecting the text and watching the build fail). SEA must supply their **own** verified financial-aid information before any such page exists. The scholarship paragraph in `nri-admission.md` was also left out: it says the Trust *"plans to institute/offer"* scholarships — aspirational, not a current offering, and unsafe to present as available.

### ⚠️ P0-11 · The supplied hero background plate depicted a campus SEA does not have

The foreground plate provided for the hero parallax was a clean, genuine alpha cutout of the real SEA entrance gate — **used as-is**. The accompanying background plate, however, showed red-brick colonial buildings, a domed rotunda, a manicured quad with fountains and rolling forested hills: an American-style university, almost certainly AI-generated or stock, with the real SEA arch composited into it.

The actual campus (see `public/images/about/campus-img.jpg`) is tropical Bengaluru — palms, monsoon cloud, red-leaf shrubs, a red block. The two are not the same place.

Publishing it would have shown prospective students and their parents **infrastructure the college does not possess**, on the single most prominent image of the site. That is the same class of problem as the fabricated student count (P0-1) and the Krupanidhi text (P0-10).

*Action:* the fabricated background was discarded. The hero now pairs the **real gate cutout** (foreground) with the **real campus garden photograph** (background), so the arch frames the actual gardens — genuine depth from two authentic SEA photographs. The background carries a 2px blur as optical depth-of-field, which is a photographic treatment, not a fabrication.

**Rule going forward:** hero and campus imagery must be photographs of SEA. Generated or stock "campus" imagery is never acceptable, however attractive.

### Everything else

43 markdown files were scraped; the site surfaces roughly a third of them. These themes appear **nowhere** in `src/`:

Brochures (real downloadable PDFs exist) · Financial aid · NRI admission · Foreign national admission · Digital infrastructure · Career Advancement Cell · Value Added Programs · Principals · MTTM · B.Sc Clinical Nutrition · Hospital Administration

Also under-used: the 12 individual institution write-ups (currently only names in a list), Research & Development Centre, sports, hostel/accommodation, accreditations narrative.

This is the largest *opportunity* in the project and it is content work, not effects work. A parent comparing colleges wants fees, eligibility, intake, and hostel facts far more than another animation.

---

## 5. Magic UI evaluation

> **Method note.** The Magic UI MCP **is installed, but it was registered in `%APPDATA%/Roaming/Claude/claude_desktop_config.json` — that is Claude *Desktop*'s config file.** Claude Code reads MCP servers from `~/.claude.json` (user scope) or a project `.mcp.json`, so it never appears here and **restarting Claude Code will not fix it.** To wire it up properly for this project, run `claude mcp add magicui -- cmd /c npx -y @magicuidesign/mcp@latest`, or commit a project `.mcp.json` with the same entry.
>
> The findings below are **not** guesswork — the server was queried directly over stdio JSON-RPC (`@magicuidesign/mcp@latest`, tools: `listRegistryItems`, `getRegistryItem`, `searchRegistryItems`). Registry data below is verbatim from that query on 2026-07-25.

### 5.1 What the registry actually returned

**77 components.** Every one installs via `npx shadcn@latest add "https://magicui.design/r/<name>.json"`.

Three hard facts from the registry that decide this:

1. **The shadcn CLI is the only distribution path.** It expects a `components.json`, a Tailwind setup, and a `cn()` helper. This project has none of the three. `animated-grid-pattern`'s own description says it is *"fully customizable using **Tailwind CSS**"* — the Tailwind dependency is stated by the library itself, not inferred.
2. **Six of the nine candidates declare `dependencies: ["motion"]`** (border-beam, number-ticker, text-reveal, animated-grid-pattern, hero-video-dialog, animated-beam). `motion` is the rebranded successor package to Framer Motion, and this project already ships `framer-motion@12.42.2`. Installing them puts **the same animation library in the bundle under two package names**, with a real risk of shipping the runtime twice.
3. **`bento-grid` is heavier than expected:** `registryDependencies: ["button"]` plus `@radix-ui/react-icons` — so it drags in a shadcn Button and a new icon package on top of Tailwind.

**And the decisive finding — Magic UI does not address any of our actual gaps.** Searching the registry returned **zero results** for `"navigation menu mobile"` and **zero** for `"search command palette"`; `"accessible dialog modal"` returned only `hero-video-dialog`. The library is an effects catalogue (particles, meteors, confetti, retro-grid, warp-background, aurora-text, sparkles-text, neon-gradient-card, smooth-cursor, globe, icon-cloud …), not a UI foundation. **Our P0 defects — no mobile nav, no search, an inaccessible lightbox — have no Magic UI answer.**

### 5.2 Verdicts on the requested candidates

| Component | Proposed section | Visitor benefit | Perf / a11y risk | Tailwind-free? | Verdict |
| --- | --- | --- | --- | --- | --- |
| **Marquee** | Recruiter strip | — | — | No deps; portable | **Reject** — already built (`Marquee` in `motion.tsx`, live on recruiters + accreditations) |
| **Number Ticker** | Placement counters | — | Adds `motion` alongside `framer-motion` | Needs port | **Reject** — duplicate of existing `Counter` |
| **Glare Hover** | Institution cards | — | — | Portable | **Reject** — already built (`.tilt-card::after` cursor-follow glow, plus `CrestShine`) |
| **Bento Grid** | Campus life | — | Pulls shadcn `button` + `@radix-ui/react-icons` | Needs Tailwind | **Reject** — bento already implemented in CSS, and this is the heaviest item on the list |
| **Text Reveal** | Home / about copy | Draws the eye through a paragraph | **Animates body text** — violates our own motion guardrail; harms dyslexic and low-vision readers | Needs port | **Reject on principle** |
| **Animated Grid Pattern** | Hero background | Decorative texture | Endless animation + extra DOM for zero information; competes with the campus photo | **Tailwind-dependent by its own description** | **Reject** |
| **Hero Video Dialog** | Home hero | Campus tour | — | Needs port | **Reject** — *no video asset exists.* `content/gallery/video-gallery.md` is empty. Nothing to play. |
| **Animated Beam** | "12 institutions → 6 streams" | Illustrates grouping | Endless animation, ref-measurement cost, weak on mobile; conveys nothing the stream cards don't | Needs port | **Reject** |
| **Shimmer Button** | Apply CTA | Attention on primary action | Endless loop on the most important control; we already have magnetic hover + lift | No deps; portable | **Reject** — redundant |
| **Border Beam** | Enquiry CTA | One clear "act here" signal | Endless loop — must pause under `prefers-reduced-motion`; one instance only | Portable as CSS (conic-gradient + mask) | **Nice-to-have, conditional** — see Sprint 4 |

### 5.3 Items outside the original list worth knowing about

Surfaced by the full 77-component listing; **none are approved**, recorded so the decision isn't re-litigated later:

- `shine-border` — gentler alternative to `border-beam` for the same CTA job.
- `scroll-progress` — page-level reading progress; only meaningful once long institution pages exist (Sprint 2).
- `lens` — hover magnifier; the one genuinely interesting fit for campus photography in `/gallery/`, but it is pointer-only and needs a touch story before it could ship.
- `animated-theme-toggler` — relevant **only if** dark mode is approved as a full project.

### 5.4 Conclusion

**Do not adopt Magic UI, and do not add Tailwind for it.** Of the ten requested components: four already exist in our own code, two break our motion rules, one has no content to power it, two are pure decoration, and one (Border Beam) is worth borrowing as an *idea* — reimplemented in plain CSS, once. The registry query strengthened rather than changed this conclusion, and it added a concrete new reason: the duplicate `motion`/`framer-motion` runtime.

---

## 6. Guardrails that stay in force

**Creative direction.** Expressive home hero and a few campaign moments; information pages stay calm and readable. Real campus photography over abstract effects. Motion guides attention to one thing per viewport — never animate body text, never animate every card at once, never require a hover to read content.

**Motion.** Transform/opacity only. One easing curve. No endless decorative loops. Reduced-motion removes parallax, tilt, spotlight, and beams while preserving all content and controls.

**Data integrity.** Scraped material is a *draft source*, never a published fact. Every number, accreditation, fee, intake, recruiter logo, and contact detail needs SEA sign-off with a "last verified" date. Where approval is pending, omit the field — do not estimate, and do not reconstruct a figure from garbled scraper output (see P0-1). No fabricated student testimonials, named placement spotlights, or 3D "campus maps" of a layout we have never surveyed.

**3D gate (unchanged).** Neither Spline nor R3F is installed. Any 3D must: lazy-load after critical work, ship a static image fallback, disable under reduced motion, sit behind a feature flag, and demonstrably not regress LCP/INP against the current hero on a mid-range Android. Spline additionally is a hosted external dependency with a watermark on the free tier — inconsistent with the decision to serve every asset locally.

**Performance budgets.** LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1 on representative mobile connections. Keep the home route's initial JS lean; dynamically import search and any future 3D.

**Accessibility target.** WCAG 2.2 AA: keyboard-only operation, visible focus, contrast, 200% zoom, correct dialog semantics, reduced-motion support.

---

## 7. Sequenced work

### Sprint 1 — stop shipping wrong things (all P0)
1. Remove the unverified student/teacher figures; substitute verified metrics or drop the slots. *(P0-1)*
2. Build the accessible mobile navigation. *(P0-2)*
3. Resolve the forms: wire to an approved endpoint, or replace with real contact details and delete the false success message. *(P0-3)*
4. Make the lightbox keyboard- and screen-reader-operable. *(P0-4)*
5. Fix metadata: real title, per-route metadata, sitemap, robots. *(P1-5)*
6. Add skip link, `aria-current`, accessible counter values, image dimensions. *(P1-6)*
7. Drop the incorrect `+` on 12 and 26. *(P2-7)*

**Exit criteria:** `npm run build` passes; every page keyboard-navigable end to end including the lightbox; no unverified statistic anywhere in the output; automated a11y pass on header, nav, gallery dialog, and forms.

### Sprint 2 — depth from content we already have

1. ✅ **Done.** `streams.ts` is now a typed, validated registry — every institution carries `name`, `summary`, `description`, `affiliation`, `duration`, `intake`, `language`, `campus`, `website`, `phone`, `photo`, plus `source` (the `content/` file each fact came from) and `verified` (date reconciled). A `validate()` guard throws at build time on a duplicate slug, a missing required field, an empty description, or drift from the expected 12 — *proven by injecting a duplicate slug and watching the build fail.* Optional fields are omitted rather than guessed, and the page renders only the rows that exist.
2. ✅ **Done.** `/explore/[slug]/` ships 12 real institution pages via `generateStaticParams()`; unknown slugs 404. Each page has breadcrumbs, a course-detail strip, source-derived copy, contact/links, related institutions in the same stream, and a visible "last checked" note.
3. ✅ **Done.** `/placements/` uses **only** the six verified metrics, plus the real four-step recruitment process and the named Career Advancement Cell panel — all from `content/placements/`. Figures carry an explicit "confirm current year with the Placement Department" caveat.
4. ⚠️ **Mostly done, one item permanently blocked.**
   - ✅ `/campus-life/facilities/` — infrastructure, central library, sports, hostel, anti-ragging and student cells, digital services.
   - ✅ `/admissions/international/` — the real five-step process, document checklist and B.E. eligibility for international/NRI applicants.
   - ✅ Brochures — the five real PDFs, linked from `/admissions/`.
   - ⛔ **Financial aid — blocked, see P0-10 above.** The source file is about Krupanidhi Group of Institutions, not SEA.
   - ✅ Value-added programmes, MTTM, clinical nutrition, hospital administration and pre-university are now in the `/academics/` directory; principals are on `/about/`.
5. ✅ **Done.** Placements added to header nav and footer; sitemap now derives institution routes from the registry so it cannot fall out of step.

### Sprint 3 — findability ✅ DONE

1. ✅ Client-side search over pages, streams, institutions and programmes from a prebuilt in-bundle index (`src/lib/search-index.ts`) — no network call. Accessible dialog reusing `useDialogBehaviour`: `Ctrl+K` **and** `Cmd+K`, focus into the input, arrow-key browsing, Enter to open, Escape to close, results announced via `role="status"`, and the shortcut is ignored while typing in another field. *Verified keyboard-only.*
2. ✅ `/academics/` programme directory — 32 programmes, real `<label>`-ed search/level/field controls, live result count, empty state with a route out, and a clear-filters reset. Surfaces the previously unused value-added programmes, MTTM, clinical nutrition, hospital administration and pre-university streams.

### Sprint 4 — considered polish

**Premium-animation shortlist — this is the whole approved list. Anything not named here needs a fresh decision.**

*Keep (already built, no change needed):*

| Effect | Where | Status |
| --- | --- | --- |
| Framer Motion scroll reveals (`Reveal`, `RevealStagger`, `RevealList`) | all pages | keep |
| Parallax (`ParallaxPhoto`, `ScrollParallax`) | home hero photo, campus image | keep |
| Tilt cards + cursor-follow glow (`TiltCard`) | stream cards, pathways, trustees | keep |
| Marquee | recruiters, accreditations | keep |
| Counters (`Counter`) | stat bar, placement pulse | keep — *pending the P0-1 data fix* |
| Magnetic CTA (`MagneticLink`) | header Apply | keep |
| Crest shine (`CrestShine`) | home hero, About legacy seal | keep |
| Scroll timeline (`ScrollTimeline`) | Admissions journey | keep — this is the model for any future scroll work |

*Add — at most one:*
- **One** Border Beam-style CSS emphasis on the enquiry CTA (`shine-border` is the gentler alternative). Written in plain CSS, single instance sitewide, paused under `prefers-reduced-motion`. If it doesn't measurably help enquiries, drop it.

*Explicitly banned:*
- Continuous particle fields, meteors, confetti, flickering/retro/warp grids
- Animated background grid patterns
- Text shimmer, animated gradient text, or any effect that animates body copy
- Endless decorative loops anywhere outside the single CTA above
- Smooth-cursor / custom cursor replacements

*Testing gate for every motion change:* verify on a real mid-range Android at 390 px **and** with `prefers-reduced-motion: reduce` enabled. Motion must never block reading or interaction; reduced-motion must retain all content and controls.

**Also in Sprint 4:**
1. Scroll-driven refinements only where they aid comprehension — `ScrollTimeline` is the model.
2. Dark mode **as a whole project** if approved: every token, photo overlay, gradient, and focus state, pre-paint init, both themes contrast-checked. Ship it complete or not at all.
3. Re-evaluate 3D against the gate in §6 — only after Sprints 1–3 are measured.

---

## 8. Verification

```bash
npm run build        # next build + content guard; must pass
npm run check:content # content guard alone, against an existing out/
npx tsc --noEmit     # type check
```

`scripts/check-output.mjs` scans every exported HTML file for text that must never ship (third-party college content, fabricated statistics, false form confirmations). Add a rule there whenever a new never-publish item is identified.

Beyond that:
- Serve the exported `out/` statically and click every route and internal link — `next dev` alone is not sufficient proof for a static export.
- Keyboard-only pass: tab order, visible focus, Escape and focus-return in every dialog, 200% zoom, reduced-motion on.
- Mobile check at 390 px **and** a wide desktop (≥ 2560 px): no horizontal overflow, no element escaping its container. *(Grid children need `min-width: 0` — this class of bug has already appeared three times: stream cards, pathway list, and the Course Finder's native `<select>`. Check it on every new grid.)*
- Cross-browser: current Chrome, Safari/iOS, Firefox, Android.
- Content: every published figure traceable to an approved, dated record.
- Compare Lighthouse mobile against the pre-change baseline.

---

## 9. Risks

| Risk | Mitigation | Owner |
| --- | --- | --- |
| Unverified or invented claims reach the judged site | Everything traces to `content/`; `source`/`verified` fields in the registry; build-time content guard | Developer |
| Enquiries silently lost through fake forms | Sprint 1 blocks on a real endpoint or removal | SEA IT + developer |
| Mobile visitors cannot navigate | P0-2 mobile menu | Developer |
| Effects grow faster than content | Component work gated behind §6 guardrails; Magic UI assessed and largely rejected | Developer + design |
| A second content registry re-introduces mismatch | `streams.ts` is the only registry; build-time validation | Developer |
| Unlicensed imagery or recruiter logos | Asset-rights review before launch | SEA marketing |

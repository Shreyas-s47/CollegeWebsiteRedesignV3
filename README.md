# 🎓 SEA College Website Redesign — Claude Code Handoff

> **Project**: Complete frontend redesign of SEA Group of Institutions (https://seaedu.ac.in/)
> **Purpose**: Frontend competition — rebuild every page with modern design, keep all original content
> **Prepared by**: Content extraction via Antigravity IDE (automated scraping of all 43 pages)

> **UPDATE (2026-07-22)**: The competition rules changed — **there is no longer a "vanilla JS only" restriction.** Any framework or library is allowed. The live build in `src/` is a **Next.js 15 + React 19 + TypeScript** app (not the Vite/vanilla plan originally described below), using `framer-motion` for scroll-driven 3D and reveal effects. The sections below are kept for historical content/navigation reference, but the "Recommended Tech Stack" and "no frameworks" guidance are superseded.

---

## 🚀 Quick Start for Claude Code

```
1. Read this file first (README.md)
2. Read brand-brief.md for the brand identity
3. Read site-map.json for the full navigation structure
4. The app is already a Next.js (App Router) project in src/ — no framework restriction anymore
5. Build/extend pages using content from content/ folder and local images from public/images/ (not hotlinked from seaedu.ac.in)
```

---

## 📁 Project Structure

```
d:\College website\
│
├── README.md                ← YOU ARE HERE — full project context
├── brand-brief.md           ← Brand identity, vision, mission, colors, fonts, programs
├── site-map.json            ← Complete navigation tree + all 43 page routes
│
├── content/                 ← Clean extracted markdown for every page
│   ├── home/
│   │   └── home.md                              (10,186 chars)
│   ├── about/
│   │   ├── overview.md                           (9,227 chars)
│   │   ├── founder.md                            (2,786 chars)
│   │   ├── chairmans-message.md                  (1,887 chars)
│   │   ├── board-of-trustees.md                  (611 chars)
│   │   ├── director-message.md                   (3,026 chars)
│   │   └── principals.md                         (877 chars)
│   ├── academics/
│   │   ├── value-added-programs.md               (545 chars)
│   │   ├── research-center.md                    (7,428 chars)
│   │   ├── pre-university.md                     (494 chars)
│   │   ├── mttm.md                               (3,278 chars)
│   │   ├── bsc-clinical-nutrition.md             (1,523 chars)
│   │   └── hospital-administration.md            (3,380 chars)
│   ├── institutions/
│   │   ├── sea-college-of-engineering-technology.md      (18,003 chars) ← Largest page
│   │   ├── sea-college-of-management-studies.md          (2,671 chars)
│   │   ├── sea-college-of-research-development-center.md (3,115 chars)
│   │   ├── sea-college-of-nursing.md                     (8,270 chars)
│   │   ├── sea-college-of-law.md                         (10,331 chars)
│   │   ├── sea-college-of-science-commerce-arts.md       (1,538 chars)
│   │   ├── sea-composite-pu-college.md                   (2,097 chars)
│   │   ├── sea-evening-college.md                        (399 chars)
│   │   ├── sea-bed-college.md                            (716 chars)
│   │   ├── sea-international-school.md                   (1,656 chars)
│   │   ├── sea-primary-higher-secondary-school.md        (2,042 chars)
│   │   └── sea-industrial-training-institute.md          (620 chars)
│   ├── admissions/
│   │   ├── apply-online.md                       (768 chars)
│   │   ├── admission.md                          (1,792 chars)
│   │   ├── admission-procedure.md                (1,941 chars)
│   │   ├── foreign-national.md                   (1,902 chars)
│   │   ├── financial-aid.md                      (2,670 chars)
│   │   └── nri-admission.md                      (2,035 chars)
│   ├── campus/
│   │   ├── campus-infrastructure.md              (1,518 chars)
│   │   ├── digital-infrastructure.md             (1,236 chars)
│   │   ├── accommodation-hostel-facilities.md    (1,204 chars)
│   │   └── sports.md                             (249 chars)
│   ├── placements/
│   │   ├── placement-overview.md                 (3,646 chars)
│   │   ├── career-advancement-cell.md            (1,260 chars)
│   │   └── recruiters.md                         (81 chars — mostly images)
│   ├── gallery/
│   │   ├── photo-gallery.md                      (162 chars — 36 images)
│   │   └── video-gallery.md                      (81 chars — YouTube embeds)
│   └── other/
│       ├── contact-us.md                         (562 chars)
│       ├── accreditations.md                     (727 chars)
│       └── brochures.md                          (676 chars)
│
├── assets/
│   ├── logo/
│   │   └── logo.png                  ← SEA official logo (38 KB)
│   ├── banners/
│   │   ├── engineering.jpg           ← Hero banner (269 KB)
│   │   ├── ranker.jpg                ← Hero banner (167 KB)
│   │   ├── degree.jpg                ← Hero banner (254 KB)
│   │   ├── nursing.jpg               ← Hero banner (263 KB)
│   │   ├── pu-banner.jpg             ← Hero banner (300 KB)
│   │   ├── law.jpg                   ← Hero banner (446 KB)
│   │   └── iti.jpg                   ← Hero banner (463 KB)
│   └── images.json                   ← Catalog of ALL 242 image URLs from the original site
│
├── raw-html/                         ← Raw HTML of every page (43 files, for reference only)
│   ├── home.html
│   ├── overview.html
│   ├── founder.html
│   └── ... (43 total)
│
└── scrape-content.js                 ← The scraper script (can re-run if needed)
```

---

## 🏫 About the Organization

| Field | Value |
|-------|-------|
| **Name** | SEA Group of Institutions / Southeast Asian Education Trust (S.E.A.E.T) |
| **Established** | Year 2000 |
| **Location** | KR Puram, Bangalore – 560049, India |
| **Phone** | +91 6366453030 / 7353945999 |
| **Email** | seaeduinfo@seaedu.ac.in |
| **Website** | https://seaedu.ac.in/ |

### Vision
> "We aspire to empower learners with meaningful experiences that will enable them to become reflective individuals who will discover themselves."

### Mission
> "To provide a progressive international education in a diverse learner-centred community, where learners are encouraged to develop the knowledge, skills and values that will enable them to evolve into successful leaders who impact meaningful change in a global society."

---

## 🗺️ Complete Navigation Structure

The website has **8 main navigation sections** with dropdown menus. Build a **mega-menu style** navigation.

### Header Top Bar
- Phone: +91-6366453030 / 7353945999
- Email: seaeduinfo@seaedu.ac.in
- Social Icons: Facebook, Instagram, YouTube, WhatsApp
- Quick Links: Contact Us, Accreditations, Brochures

### Main Navigation

```
Home
│
├── About Us ▾
│   ├── Overview
│   ├── Founder's Message
│   ├── Chairman's Desk
│   ├── Board of Trustees
│   ├── Director's Message
│   └── Principals
│
├── Academics ▾
│   ├── UG Courses ▸
│   │   ├── BE → seacet.edu.in (external)
│   │   ├── Degree → seadegree.ac.in (external)
│   │   ├── Law → sealawcollege.edu.in (external)
│   │   └── Nursing → seanursing.edu.in (external)
│   ├── PG Courses ▸
│   │   ├── M.Tech → seacet.edu.in (external)
│   │   ├── MBA (VTU) → seacet.edu.in (external)
│   │   ├── MBA (BU) → seadegree.ac.in (external)
│   │   ├── M.Com → seacet.edu.in (external)
│   │   ├── M.Sc Nursing → seanursing.edu.in (external)
│   │   ├── Master of Arts → seadegree.ac.in (external)
│   │   └── M.Sc (CS) → seadegree.ac.in (external)
│   ├── Value Added Programs
│   ├── Research Center
│   ├── Pre-University
│   ├── MTTM
│   ├── B.Sc Clinical Nutrition
│   └── Hospital Administration
│
├── Institutions ▾
│   ├── SEA College of Engineering & Technology
│   ├── SEA College of Management Studies
│   ├── SEA College of Research & Development Center
│   ├── SEA College of Nursing
│   ├── SEA College of Law
│   ├── SEA College of Science, Commerce & Arts
│   ├── SEA Composite PU College
│   ├── SEA Evening College
│   ├── SEA B.Ed College
│   ├── SEA International School
│   ├── SEA Primary & Higher Secondary School
│   └── SEA Industrial Training Institute
│
├── Admissions ▾
│   ├── Apply Online
│   ├── Admission
│   ├── Admission Procedure
│   ├── Foreign National
│   ├── Financial Aid
│   └── NRI Admission
│
├── Our Campus ▾
│   ├── Campus Infrastructure
│   ├── Digital Infrastructure
│   ├── Accommodation & Hostel Facilities
│   └── Sports
│
├── Placements ▾
│   ├── Placement Overview
│   ├── Career Advancement Cell
│   └── Recruiters
│
├── Gallery ▾
│   ├── Photo Gallery
│   └── Video Gallery
│
└── Contact Us
```

---

## 🎨 Design Requirements (COMPETITION FOCUS)

### What Judges Look For
1. **Modern, premium UI** — Not a basic Bootstrap template
2. **Responsive/mobile-first** — Must look great on all screens
3. **Consistent design system** — Proper spacing, typography, colors
4. **Micro-animations** — Smooth transitions, hover effects, scroll reveals
5. **Accessibility** — Proper ARIA labels, contrast, keyboard navigation
6. **Clean semantic HTML** — Proper heading hierarchy, semantic elements

### Tech Stack (current, post rule-change)
- **Next.js 15 (App Router) + React 19 + TypeScript** — framework use is now allowed, no restriction
- Custom CSS with CSS Custom Properties for theming (`globals.css`) — not a CSS framework, kept hand-written
- `framer-motion` for scroll-driven reveals, 3D tilt, and parallax
- Self-hosted/Google Fonts: Archivo Black (display) + Manrope (body)
- Images served locally from `public/images/` — never hotlinked from seaedu.ac.in

### Design Ideas
- **Dark/Light mode toggle** with CSS custom properties
- **Glassmorphism** on cards and overlays
- **Gradient mesh** or animated gradient hero section
- **Parallax scrolling** on the homepage
- **Animated counters** for the statistics section (Students: 84,858+, Teachers: 868+)
- **Mega-menu navigation** with icons and descriptions
- **Scroll-triggered animations** using Intersection Observer
- **Smooth page transitions**
- **Hover effects** on institution cards, course cards
- **Testimonial carousel** (reuse placement/recruiter logos)

### Color Palette Suggestion (Replace Current)
```css
:root {
  /* Primary — Deep Blue with teal undertone */
  --primary-50: #e8f4fd;
  --primary-100: #b8ddf7;
  --primary-500: #0c6db5;
  --primary-600: #0a5a96;
  --primary-700: #074677;
  --primary-900: #031d33;

  /* Accent — Warm Gold */
  --accent-400: #f5a623;
  --accent-500: #e8971c;
  --accent-600: #d18416;

  /* Neutral */
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-500: #64748b;
  --gray-800: #1e293b;
  --gray-900: #0f172a;
}
```

---

## 📋 Page-by-Page Build Guide

### 1. Homepage (`content/home/home.md`)
**Sections to build:**
- Hero section with carousel/slider using `assets/banners/` images
- "Welcome to S.E.A. Education Trust" — about section with CTA
- "Our Institutes" — 12 institution cards with links
- Campus info section with statistics counters
- "Our Courses" — 11 course category cards
- "Benefits" section — Student Mentorship, Labs & Library, Workshops & Seminars
- Flash News ticker/marquee
- Footer

### 2. About Section (6 pages)
- **Overview**: Vision, Mission, campus description, statistics counters
- **Founder's Message**: Portrait image + message text
- **Chairman's Desk**: Portrait image + message text
- **Board of Trustees**: Grid of trustee photos with names/titles
- **Director's Message**: Portrait image + message text
- **Principals**: Grid of principal photos with names/institutions

### 3. Academics Section (6 pages)
- **Value Added Programs**: List of certification programs with images
- **Research Center**: Detailed research areas, faculty, publications
- **Pre-University**: Course info for PU College
- **MTTM**: Tourism & Travel Management program details
- **B.Sc Clinical Nutrition**: Program details, eligibility, curriculum
- **Hospital Administration**: Program details

### 4. Institutions Section (12 pages)
Each institution page follows a pattern:
- Banner/hero with institution name
- Course details (Duration, Campus, Language, Intake, Website, Contact)
- Department descriptions
- Benefits/Infrastructure lists
- Faculty information

### 5. Admissions Section (6 pages)
- **Apply Online**: Application form
- **Admission**: General admission info
- **Admission Procedure**: Step-by-step process with flowchart
- **Foreign National**: Requirements for international students
- **Financial Aid**: Scholarship and aid information
- **NRI Admission**: NRI-specific admission process

### 6. Campus Section (4 pages)
- **Campus Infrastructure**: Facilities description with images
- **Digital Infrastructure**: Tech facilities, labs, WiFi
- **Hostel**: Accommodation details with room images
- **Sports**: Sports facilities with photo gallery

### 7. Placements Section (3 pages)
- **Overview**: Placement statistics, process, top companies
- **Career Advancement Cell**: Services offered
- **Recruiters**: Grid of recruiter company logos

### 8. Gallery Section (2 pages)
- **Photo Gallery**: Masonry/grid layout of 36+ campus photos
- **Video Gallery**: YouTube video embed grid

### 9. Other Pages (3 pages)
- **Contact Us**: Map embed + contact form + address/phone/email
- **Accreditations**: Accreditation body logos grid (VTU, AICTE, etc.)
- **Brochures**: Downloadable PDF links for each program

---

## ⚠️ Important Notes

1. **External Links**: UG/PG course links (BE, Degree, Law, Nursing, M.Tech, MBA, etc.) go to external sub-institution websites. Don't build pages for these — just link to them with `target="_blank"`.

2. **Content Files**: Each `.md` file has YAML frontmatter with `title`, `slug`, `section`, `source_url`. The body contains the actual page content in markdown format. Some pages have breadcrumb remnants at the top — skip those lines (e.g., "class=breadcrumb..." artifacts).

3. **Image References**: The `assets/images.json` file lists all 242 image URLs from the original site. You can reference these directly or download additional ones as needed. Key images (logo + 7 banners) are already downloaded locally.

4. **Forms**: The Contact Us page and Apply Online page have forms. Build the HTML form with proper validation — no backend needed (it's a frontend competition).

5. **Raw HTML**: If you need to see the original page structure for any page, check `raw-html/{slug}.html`.

---

## 🏗️ Suggested Build Order

```
Step 1: Set up Vite + design system (CSS variables, fonts, base styles)     → 30 min
Step 2: Build global components (navbar with mega-menu, footer)              → 1 hr
Step 3: Build the homepage with all sections                                 → 1.5 hr
Step 4: Create page layout template (breadcrumb + sidebar + content)         → 30 min
Step 5: Build all 42 content pages using the template                        → 2-3 hr
Step 6: Add animations, dark mode, responsive polish                         → 1 hr
Step 7: Final testing                                                        → 30 min
```

---

*Generated on: July 15, 2026 | Source: https://seaedu.ac.in/ | 43 pages scraped, 242 images cataloged*

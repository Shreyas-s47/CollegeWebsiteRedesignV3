import { programmes } from "./programmes";
import { streams } from "./streams";

export type SearchEntry = {
  title: string;
  href: string;
  kind: "Page" | "Institution" | "Stream" | "Programme";
  detail: string;
  /** Lower-cased haystack, built once at module load. */
  haystack: string;
};

const PAGES: { title: string; href: string; detail: string }[] = [
  { title: "Home", href: "/", detail: "One campus, twelve institutions" },
  { title: "Explore institutions", href: "/explore/", detail: "All 12 institutions by stream" },
  { title: "Academics & programmes", href: "/academics/", detail: "Filter every programme by level and field" },
  { title: "Campus life", href: "/campus-life/", detail: "Life beyond the classroom" },
  { title: "Facilities & hostel", href: "/campus-life/facilities/", detail: "Library, labs, sports, accommodation, digital services" },
  { title: "Placements", href: "/placements/", detail: "Recruiters, process and the Career Advancement Cell" },
  { title: "About SEA", href: "/about/", detail: "Founder, chairman, director and trustees" },
  { title: "Admissions", href: "/admissions/", detail: "How to apply, accreditations and brochures" },
  { title: "International & NRI admission", href: "/admissions/international/", detail: "Documents, visa steps and eligibility" },
  { title: "Gallery", href: "/gallery/", detail: "Photographs from campus" },
  { title: "Contact", href: "/contact/", detail: "Address, phone and email" },
];

function entry(e: Omit<SearchEntry, "haystack">): SearchEntry {
  return { ...e, haystack: `${e.title} ${e.detail} ${e.kind}`.toLowerCase() };
}

export const searchIndex: SearchEntry[] = [
  ...PAGES.map((p) => entry({ ...p, kind: "Page" })),

  ...streams.map((s) =>
    entry({
      title: s.title,
      href: `/explore/#${s.slug}`,
      kind: "Stream",
      detail: `${s.institutions.length} institution${s.institutions.length > 1 ? "s" : ""} · ${s.tagline}`,
    }),
  ),

  ...streams.flatMap((s) =>
    s.institutions.map((i) =>
      entry({
        title: i.name,
        href: `/explore/${i.slug}/`,
        kind: "Institution",
        detail: i.summary,
      }),
    ),
  ),

  ...programmes.map((p) =>
    entry({
      title: p.name,
      href: p.institutionSlug ? `/explore/${p.institutionSlug}/` : "/academics/",
      kind: "Programme",
      detail: `${p.level} · ${p.field}${p.duration ? ` · ${p.duration}` : ""}`,
    }),
  ),
];

/** Simple substring scoring — good enough for a few dozen entries, no network call. */
export function search(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return searchIndex
    .map((e) => {
      const title = e.title.toLowerCase();
      let score = 0;
      if (title === q) score = 100;
      else if (title.startsWith(q)) score = 80;
      else if (title.includes(q)) score = 60;
      else if (e.haystack.includes(q)) score = 30;
      return { e, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.e.title.localeCompare(b.e.title))
    .slice(0, limit)
    .map((r) => r.e);
}

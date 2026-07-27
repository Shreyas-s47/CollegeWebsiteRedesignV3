/**
 * Canonical origin for the deployed site.
 *
 * Set NEXT_PUBLIC_SITE_URL at build time to the real domain before publishing —
 * sitemap.xml and robots.txt are generated from this value, and a wrong origin
 * there is worse than none at all.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.invalid").replace(/\/$/, "");

import { institutions } from "./streams";

/** Static routes. Institution routes are appended from the registry below. */
const STATIC_ROUTES = [
  "/",
  "/explore/",
  "/academics/",
  "/campus-life/",
  "/campus-life/facilities/",
  "/placements/",
  "/about/",
  "/admissions/",
  "/admissions/international/",
  "/gallery/",
  "/contact/",
] as const;

/**
 * Every route generated, including one per institution. Derived from the
 * registry so the sitemap cannot fall out of step with the pages that exist.
 */
export const ROUTES: string[] = [
  ...STATIC_ROUTES,
  ...institutions.map((i) => `/explore/${i.slug}/`),
];

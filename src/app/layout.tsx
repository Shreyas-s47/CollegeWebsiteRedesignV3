import type { Metadata } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";
import { PageTransition } from "@/components/page-transition";
import { SiteHeader } from "@/components/site-header";

const SITE_NAME = "SEA Group of Institutions";
const SITE_DESCRIPTION =
  "Twelve institutions on one Bengaluru campus — engineering, management, nursing, law, pre-university and schools. Explore programmes and admissions at SEA Group of Institutions.";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Bengaluru`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Bengaluru`,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Bengaluru`,
    description: SITE_DESCRIPTION,
  },
  // No explicit `icons` block: src/app/icon.png is Next.js's file-based
  // favicon convention and generates the correct <link> tags on its own.
  // Duplicating it here as a manual "/icon.png" URL is what caused
  // "conflicting public file and page file" — see git history / chat log.
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <MotionProvider>
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>
            <PageTransition>{children}</PageTransition>
          </main>
        </MotionProvider>
      </body>
    </html>
  );
}

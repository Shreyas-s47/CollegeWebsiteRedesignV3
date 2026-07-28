"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "./mobile-menu";
import { SearchModal } from "./search-modal";
import { MagneticLink } from "./motion";
import { WordmarkText } from "./wordmark";

const links = [
  ["Explore", "/explore/"],
  ["Academics", "/academics/"],
  ["Campus life", "/campus-life/"],
  ["About", "/about/"],
  ["Placements", "/placements/"],
  ["Admissions", "/admissions/"],
  ["Gallery", "/gallery/"],
  ["Contact", "/contact/"],
];

export function SiteHeader() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const isActive = (href: string) => pathname === href || pathname === href.slice(0, -1);

  useEffect(() => {
    const update = () => setCondensed(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header${condensed ? " is-condensed" : ""}`}>
      <Link href="/" className="wordmark" aria-label="SEA Group of Institutions home">
        <div className="wordmark-badge">
          <img src="/images/crest.png" alt="" aria-hidden="true" className="wordmark-mark" width={56} height={56} />
          <WordmarkText />
        </div>
      </Link>
      <nav aria-label="Main navigation">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? "page" : undefined}
            className={isActive(href) ? "active" : ""}
          >
            {label}
          </Link>
        ))}
      </nav>
      <SearchModal />
      <MagneticLink href="/admissions/" className="apply-button">Apply <span aria-hidden="true">↗</span></MagneticLink>
      <MobileMenu links={links} pathname={pathname} />
    </header>
  );
}

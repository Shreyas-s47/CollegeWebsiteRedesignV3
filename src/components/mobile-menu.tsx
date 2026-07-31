"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDialogBehaviour } from "@/lib/use-dialog-behaviour";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Every sub-link must resolve to a DISTINCT, real destination.
 *
 * Listing several differently-labelled items that all land on the same page
 * tells a visitor there are several places to go when there is one — and,
 * because these were keyed by href, the repeats also produced React duplicate-key
 * errors. Labels are unique within a group, so they are used as keys.
 */
const menuGroups = [
  {
    label: "Explore",
    href: "/explore/",
    items: [
      ["All institutions", "/explore/"],
      ["Engineering & Technology", "/explore/#engineering-technology"],
      ["Management & Commerce", "/explore/#management-commerce"],
      ["Schools & Pre-University", "/explore/#schools"],
    ],
  },
  {
    label: "Academics",
    href: "/academics/",
    items: [
      ["All programmes", "/academics/"],
      ["Research centre", "/explore/sea-college-of-research-development-center/"],
    ],
  },
  {
    label: "Campus life",
    href: "/campus-life/",
    items: [
      ["Campus overview", "/campus-life/"],
      ["Facilities & hostels", "/campus-life/facilities/"],
      ["Photo gallery", "/gallery/"],
    ],
  },
  {
    label: "About SEA",
    href: "/about/",
    // Accreditations are rendered on the admissions page, not on /about/.
    items: [
      ["Our story & leadership", "/about/"],
      ["Accreditations", "/admissions/"],
    ],
  },
  {
    label: "Placements",
    href: "/placements/",
    items: [["Placements & Career Advancement Cell", "/placements/"]],
  },
  {
    label: "Admissions",
    href: "/admissions/",
    items: [
      ["How to apply", "/admissions/"],
      ["International & NRI", "/admissions/international/"],
    ],
  },
] as const;

export function MobileMenu({
  links,
  pathname,
}: {
  links: string[][];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => { setOpen(false); setExpanded(null); }, []);

  useDialogBehaviour({ open, containerRef: panelRef, onClose: close });

  // Close when the route changes so the panel never survives navigation.
  useEffect(() => { setOpen(false); }, [pathname]);

  // The overlay portals to <body> (see below) so document must exist first.
  useEffect(() => { setMounted(true); }, []);

  const isActive = (href: string) => pathname === href || pathname === href.slice(0, -1);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="menu-toggle-bars" data-open={open || undefined} aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="menu-toggle-text">{open ? "Close" : "Menu"}</span>
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {open && (
            <>
            <motion.div
              className="menu-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />
            <motion.div
              id="mobile-menu"
              ref={panelRef}
              className="menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <div className="menu-panel-top">
                <span>EXPLORE SEA</span>
                <button type="button" className="menu-close" onClick={close} aria-label="Close menu">×</button>
              </div>
              <nav className="menu-directory" aria-label="Site">
                {menuGroups.map((group) => {
                  const isOpen = expanded === group.label;
                  return <div className="menu-group" key={group.href}>
                    <div className="menu-group-heading">
                      <Link href={group.href} aria-current={isActive(group.href) ? "page" : undefined} onClick={close}>{group.label}</Link>
                      <button type="button" aria-expanded={isOpen} aria-label={`Show ${group.label} links`} onClick={() => setExpanded(isOpen ? null : group.label)}><span>{isOpen ? "−" : "+"}</span></button>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && <motion.div className="menu-sub-links" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: EASE }}>
                        {group.items.map(([label, href]) => <Link href={href} key={label} onClick={close}>{label}<span aria-hidden="true">↗</span></Link>)}
                      </motion.div>}
                    </AnimatePresence>
                  </div>;
                })}
                <div className="menu-direct-links">
                  {links.slice(6).map(([label, href]) => <Link key={href} href={href} onClick={close}>{label}<span aria-hidden="true">↗</span></Link>)}
                </div>
              </nav>
              <Link href="/admissions/" className="primary-cta menu-panel-cta" onClick={close}>
                Apply <span aria-hidden="true">↗</span>
              </Link>
              <div className="menu-panel-contact">
                <a href="tel:+916366453030">+91 63664 53030</a>
                <a href="mailto:seaeduinfo@seaedu.ac.in">seaeduinfo@seaedu.ac.in</a>
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

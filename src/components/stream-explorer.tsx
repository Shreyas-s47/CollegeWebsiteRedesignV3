"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { streams } from "@/lib/streams";
import { Photo } from "./photo";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Named grid-area per stream, matched 1:1 against the bento layout defined in
 * globals.css (`.stream-grid { grid-template-areas: ... }`, applied via the
 * `.slot-<name>` classes just below it). Rendered as a class rather than an
 * inline `style={{ gridArea }}` on purpose: an inline value wins over every
 * stylesheet rule regardless of media query, so the mobile layout — which
 * drops the named areas entirely for a single stacked column — couldn't
 * override it. Every card ended up placed in the same cell.
 */
const GRID_AREA: Record<string, string> = {
  "engineering-technology": "eng",
  "management-commerce": "mgmt",
  "nursing-health-sciences": "nurs",
  law: "law",
  schools: "sch",
  "pu-teacher-education": "pu",
};

/**
 * Six streams laid out as an asymmetric bento grid — replaces what used to be
 * six near-full-viewport photo rows (~4,200px of scroll on its own). Clicking
 * a card doesn't navigate away; it's a proper ARIA tabs pattern (grid = 6
 * tabs, one shared panel below lists that stream's actual institutions),
 * which is the "6 streams → 12 institutions" explorer — you see the real
 * programme names before deciding where to click through.
 *
 * The panel is the one deliberate liquid-glass surface on the homepage. It
 * works here specifically because it sits on a flat --ink background rather
 * than a photo: with a known, controlled backdrop the glass can stay
 * genuinely transparent (no dark scrim needed to protect text contrast, the
 * way the photo cards would).
 */
export function StreamExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelId = useId();

  const active = streams[activeIndex];

  function focusTab(index: number) {
    const next = (index + streams.length) % streams.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusTab(index + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusTab(index - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTab(streams.length - 1);
    }
  }

  return (
    <div className="stream-explorer">
      <div className="stream-grid" role="tablist" aria-label="Academic streams">
        {streams.map((stream, index) => {
          const count = stream.institutions.length;
          const isActive = index === activeIndex;
          return (
            <button
              key={stream.slug}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              id={`${panelId}-tab-${stream.slug}`}
              aria-selected={isActive}
              aria-controls={`${panelId}-panel`}
              tabIndex={isActive ? 0 : -1}
              className={`stream-card slot-${GRID_AREA[stream.slug]} ${stream.color}${isActive ? " is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => onKeyDown(e, index)}
            >
              <Photo
                name={`streams/${stream.slug}`}
                compact={700}
                full={1000}
                alt=""
                className="stream-card-photo"
                sizes="(max-width: 800px) 96px, (max-width: 1200px) 40vw, 26vw"
              />
              <span className="stream-card-scrim" aria-hidden="true" />
              <span className="stream-card-body">
                <span className="stream-card-count">
                  {count} institution{count > 1 ? "s" : ""}
                </span>
                <span className="stream-card-title">{stream.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* backdrop-filter only samples what's already painted behind an element —
          never its own children — so on a flat --ink section the glass had
          nothing to visibly bend. This glow is a sibling that paints first,
          in the active stream's own colour, so the refraction (and the
          panel's translucency generally) has something real to show. */}
      <div className={`stream-panel-wrap ${active.color}`}>
        <div className="stream-panel-glow" aria-hidden="true" />
        <div
          role="tabpanel"
          id={`${panelId}-panel`}
          aria-labelledby={`${panelId}-tab-${active.slug}`}
          className="stream-panel glass-panel"
        >
          <svg className="glass-defs" aria-hidden="true" focusable="false">
            <defs>
              <filter id="liquid-glass" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
                <feImage href="/images/ui/lens-map.png" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="rim" />
                <feDisplacementMap in="SourceGraphic" in2="rim" scale="30" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>
          <div className="glass-sheen" aria-hidden="true" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              className="stream-panel-inner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="stream-panel-head">
                <span className="stream-panel-eyebrow">{active.title}</span>
                <p>{active.tagline}</p>
              </div>
              <ul className="stream-panel-institutions">
                {active.institutions.map((inst) => (
                  <li key={inst.slug}>
                    <Link href={`/explore/${inst.slug}/`}>
                      <span>{inst.name}</span>
                      <i aria-hidden="true">↗</i>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Link href="/explore/" className="text-link stream-explorer-all">
        Browse the full academic directory ↗
      </Link>
    </div>
  );
}

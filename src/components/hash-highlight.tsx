"use client";

import { useEffect } from "react";

/**
 * Scrolls to and briefly highlights the element matching the URL hash.
 *
 * Listens for `hashchange` as well as running on mount — navigating from
 * /explore/#law to /explore/#schools while already on the page changes the
 * hash without remounting, and previously did nothing.
 */
export function HashHighlight() {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let highlighted: HTMLElement | undefined;

    const clear = () => {
      if (timeout) clearTimeout(timeout);
      highlighted?.classList.remove("hash-active");
      highlighted = undefined;
    };

    const run = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;

      clear();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      el.classList.add("hash-active");
      highlighted = el;
      timeout = setTimeout(() => {
        el.classList.remove("hash-active");
        highlighted = undefined;
      }, 1800);
    };

    run();
    window.addEventListener("hashchange", run);
    return () => {
      window.removeEventListener("hashchange", run);
      clear();
    };
  }, []);

  return null;
}

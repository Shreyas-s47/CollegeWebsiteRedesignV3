"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { search } from "@/lib/search-index";
import { useDialogBehaviour } from "@/lib/use-dialog-behaviour";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SearchModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const results = useMemo(() => search(query), [query]);

  useDialogBehaviour({ open, containerRef: panelRef, onClose: close });

  // Ctrl+K / Cmd+K to open. Ignored while typing in another field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        const el = document.activeElement;
        const typing =
          el instanceof HTMLInputElement ||
          el instanceof HTMLTextAreaElement ||
          el instanceof HTMLSelectElement ||
          (el instanceof HTMLElement && el.isContentEditable);
        if (typing && el !== inputRef.current) return;
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(href: string) {
    close();
    router.push(href);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[active];
      if (hit) go(hit.href);
    }
  }

  return (
    <>
      <button type="button" className="search-trigger" onClick={() => setOpen(true)}>
        <span aria-hidden="true">⌕</span>
        <span className="search-trigger-label">Search</span>
        <kbd aria-hidden="true">Ctrl K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={close}
          >
            <motion.div
              ref={panelRef}
              className="search-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Search this site"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.985 }}
              transition={{ duration: 0.24, ease: EASE }}
            >
              <label htmlFor="site-search" className="sr-only">
                Search institutions, programmes and pages
              </label>
              <input
                id="site-search"
                ref={inputRef}
                type="search"
                className="search-input"
                placeholder="Search institutions, programmes, pages…"
                value={query}
                autoComplete="off"
                onChange={(e) => { setQuery(e.target.value); setActive(0); }}
                onKeyDown={onInputKeyDown}
                aria-controls="search-results"
                aria-describedby="search-status"
              />

              <p id="search-status" className="sr-only" role="status">
                {query.trim() === ""
                  ? "Type to search."
                  : results.length === 0
                    ? "No results."
                    : `${results.length} result${results.length === 1 ? "" : "s"}. Use arrow keys to browse, Enter to open.`}
              </p>

              {query.trim() === "" ? (
                <p className="search-hint">
                  Try &ldquo;nursing&rdquo;, &ldquo;data science&rdquo;, &ldquo;hostel&rdquo; or &ldquo;placements&rdquo;.
                </p>
              ) : results.length === 0 ? (
                <p className="search-hint">No matches. Try a shorter or different word.</p>
              ) : (
                <ul id="search-results" className="search-results">
                  {results.map((r, i) => (
                    <li key={`${r.kind}-${r.href}-${r.title}`}>
                      <button
                        type="button"
                        className={i === active ? "search-result active" : "search-result"}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(r.href)}
                      >
                        <span className="search-result-main">
                          <b>{r.title}</b>
                          <small>{r.detail}</small>
                        </span>
                        <span className="search-kind">{r.kind}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FIELDS, LEVELS, type Programme } from "@/lib/programmes";

const ALL = "All";

export function ProgrammeDirectory({ programmes }: { programmes: Programme[] }) {
  const [level, setLevel] = useState<string>(ALL);
  const [field, setField] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programmes.filter((p) => {
      if (level !== ALL && p.level !== level) return false;
      if (field !== ALL && p.field !== field) return false;
      if (q && !(`${p.name} ${p.summary} ${p.field}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [programmes, level, field, query]);

  const filtered = level !== ALL || field !== ALL || query.trim() !== "";

  function reset() {
    setLevel(ALL);
    setField(ALL);
    setQuery("");
  }

  return (
    <>
      <section className="directory-controls" aria-label="Filter programmes">
        <div className="control">
          <label htmlFor="prog-search">Search</label>
          <input
            id="prog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. nursing, data science, law"
          />
        </div>
        <div className="control">
          <label htmlFor="prog-level">Level</label>
          <select id="prog-level" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value={ALL}>All levels</option>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="control">
          <label htmlFor="prog-field">Field</label>
          <select id="prog-field" value={field} onChange={(e) => setField(e.target.value)}>
            <option value={ALL}>All fields</option>
            {FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        {filtered && (
          <button type="button" className="reset-filters" onClick={reset}>
            Clear filters
          </button>
        )}
      </section>

      <p className="result-count" role="status">
        {results.length === 0
          ? "No programmes match those filters."
          : `Showing ${results.length} of ${programmes.length} programmes.`}
      </p>

      {results.length === 0 ? (
        <div className="empty-state">
          <p>Try removing a filter, or browse every institution instead.</p>
          <Link href="/explore/" className="primary-cta">
            Explore institutions <span aria-hidden="true">↗</span>
          </Link>
        </div>
      ) : (
        <ul className="programme-list">
          {results.map((p) => (
            <li key={`${p.name}-${p.field}`} className="programme-card">
              <div className="programme-head">
                <h2>{p.name}</h2>
                <span className="level-chip">{p.level}</span>
              </div>
              <p>{p.summary}</p>
              <div className="programme-meta">
                <span>{p.field}</span>
                {p.duration && <span>{p.duration}</span>}
                {p.institutionSlug && (
                  <Link href={`/explore/${p.institutionSlug}/`}>
                    View institution <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

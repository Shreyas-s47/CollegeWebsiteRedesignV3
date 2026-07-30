"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `layout.tsx` has to stay a server component (it exports `metadata`), and
 * `MotionConfig` needs a client boundary — so this thin wrapper is the
 * boundary. `reducedMotion="user"` makes every Framer Motion `animate` /
 * `whileInView` / spring in the app read the OS-level preference itself, one
 * place, instead of each component (Reveal, TiltCard, the hero parallax,
 * page-transition wipe...) re-implementing the same check.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

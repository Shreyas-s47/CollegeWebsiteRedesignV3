"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "./motion";
import { Photo } from "./photo";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The one signature motion moment on the homepage — every other scroll effect
 * was cut in the "use motion selectively" pass. A single full-bleed photo
 * drifts a little as the page scrolls past it, plus a one-time settle-in on
 * arrival; nothing else about this section moves continuously.
 */
export function HeroParallax() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "12%"]);

  return (
    <div ref={sceneRef} className="hero-bg" aria-hidden="true">
      <motion.div
        className="hero-bg-pan"
        style={{ y: bgY }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1.02 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <Photo
          name="hero/gate"
          compact={900}
          full={1600}
          alt="SEA Group of Institutions main gate"
          className="hero-bg-image"
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="hero-bg-scrim" />
    </div>
  );
}

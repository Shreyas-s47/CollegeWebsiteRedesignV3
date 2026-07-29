"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [reducedMotion ? 0 : 38, reducedMotion ? 0 : -38]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.06]);
  const captionY = useTransform(scrollYProgress, [0, 1], [reducedMotion ? 0 : 18, reducedMotion ? 0 : -18]);

  return (
    <div
      ref={ref}
      className="hero-scene hero-editorial-scene"
      role="img"
      aria-label="SEA Group of Institutions campus"
    >
      <motion.div className="hero-editorial-image" style={{ y: imageY, scale: reducedMotion ? 1 : imageScale }} />
      <motion.div className="hero-editorial-caption" style={{ y: captionY }}>
        <span>SEA / BENGALURU</span>
        <b>Find your direction.</b>
      </motion.div>
      <div className="hero-scene-edge" aria-hidden="true" />
    </div>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "./motion";
import { Photo } from "./photo";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The one signature motion moment on the page (per the "use motion
 * selectively" pass — every other scroll effect on the homepage was cut).
 * Background drifts a little; the foreground gate cutout drifts more and in
 * the opposite direction — that speed gap is what reads as depth on scroll.
 */
export function HeroParallax() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "9%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "-18%"]);

  return (
    <div
      ref={sceneRef}
      className="hero-scene hero-depth-scene"
      role="img"
      aria-label="SEA Group of Institutions campus gate"
    >
      <motion.div
        className="hero-layer hero-layer-bg"
        style={{ y: bgY }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        <Photo name="hero/bg" compact={1000} full={2200} alt="" className="hero-layer-img" priority sizes="100vw" />
      </motion.div>
      <div className="hero-haze" />
      <motion.div
        className="hero-layer hero-layer-fg"
        style={{ y: fgY }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
      >
        <Photo name="hero/fg" compact={900} full={2000} alt="" className="hero-layer-img" priority alpha sizes="70vw" />
      </motion.div>
      <div className="hero-editorial-caption">
        <span>SEA / BENGALURU</span>
        <b>Twelve institutions. One gate in.</b>
      </div>
      <div className="hero-scene-edge" aria-hidden="true" />
    </div>
  );
}

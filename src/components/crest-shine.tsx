"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";

export function CrestShine({ size = 96, className }: { size?: number; className?: string }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spotOpacity = useMotionValue(0);
  const spring = { stiffness: 260, damping: 20, mass: 0.5 };

  const rotateX = useSpring(useTransform(py, [0, 1], [12, -12]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-12, 12]), spring);
  const spotX = useTransform(px, (v) => `${v * 100}%`);
  const spotY = useTransform(py, (v) => `${v * 100}%`);
  const opacity = useSpring(spotOpacity, spring);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <div
      className={`crest-shine ${className ?? ""}`}
      style={{ width: size, height: size, perspective: size * 6 }}
      onPointerMove={handleMove}
      onPointerEnter={() => spotOpacity.set(1)}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
        spotOpacity.set(0);
      }}
    >
      <motion.div className="crest-shine-inner" style={{ rotateX, rotateY }}>
        <img src="/images/logo.png" alt="" aria-hidden="true" className="crest-shine-img" width={284} height={89} />
        <motion.div className="crest-shine-spot" style={{ ["--mx" as string]: spotX, ["--my" as string]: spotY, opacity }} />
      </motion.div>
    </div>
  );
}

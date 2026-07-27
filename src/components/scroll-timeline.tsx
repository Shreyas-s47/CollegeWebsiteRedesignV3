"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function ScrollTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.4"] });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="timeline-wrap" ref={ref}>
      <div className="timeline-track">
        <motion.div className="timeline-fill" style={{ height: fillHeight }} />
      </div>
      {children}
    </div>
  );
}

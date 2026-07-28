"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ACCENTS = ["#4B0082", "#D9491F", "#D4A72C", "#0E8F52", "#7C4DDC"];

function accentFor(path: string) {
  let hash = 0;
  for (let i = 0; i < path.length; i++) hash = (hash * 31 + path.charCodeAt(i)) | 0;
  return ACCENTS[Math.abs(hash) % ACCENTS.length];
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <>
      <motion.div
        key={`${pathname}-wipe`}
        className="page-wipe"
        style={{ background: accentFor(pathname) }}
        initial={{ x: "-100%" }}
        animate={{ x: ["-100%", "0%", "100%"] }}
        transition={{ duration: 0.9, times: [0, 0.45, 1], ease: [0.76, 0, 0.24, 1] }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

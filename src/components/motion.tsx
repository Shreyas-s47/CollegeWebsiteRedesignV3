"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";

const MotionLink = motion.create(Link);

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className,
  step = 0.08,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 30 }: { children: ReactNode; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
    >
      {children}
    </motion.div>
  );
}

export function TiltCard({
  children,
  className,
  style,
  max = 9,
  id,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  max?: number;
  id?: string;
}) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 300, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const scale = useSpring(1, spring);
  const glowX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(py, [0, 1], ["0%", "100%"]);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <motion.div
      id={id}
      className={`tilt-card ${className ?? ""}`}
      style={{ ...style, rotateX, rotateY, scale, ["--glow-x" as string]: glowX, ["--glow-y" as string]: glowY }}
      onPointerMove={handleMove}
      onPointerEnter={() => scale.set(1.035)}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
        scale.set(1);
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollParallax({
  children,
  range = 100,
  className,
}: {
  children: ReactNode;
  range?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useParallaxY(ref, range);
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

export function ParallaxPhoto({
  className,
  style,
  range = 40,
  ariaLabel,
}: {
  className?: string;
  style?: CSSProperties;
  range?: number;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useParallaxY(ref, range);
  return <motion.div ref={ref} className={className} style={{ ...style, y }} role="img" aria-label={ariaLabel} />;
}

function useParallaxY(ref: React.RefObject<HTMLDivElement | null>, range: number) {
  const scrollProgress = useMotionValue(0);
  useEffect(() => {
    function update() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = (vh - rect.top) / (vh + rect.height);
      scrollProgress.set(Math.min(Math.max(progress, 0), 1));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref, scrollProgress]);
  return useTransform(scrollProgress, [0, 1], [-range, range]);
}

export function RevealList({
  children,
  className,
  step = 0.08,
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
}) {
  return (
    <motion.ol
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}
    >
      {children.map((child, index) => (
        <motion.li
          key={index}
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
        >
          {child}
        </motion.li>
      ))}
    </motion.ol>
  );
}

export function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Reduced motion: show the real figure immediately, no tween.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  // Assistive tech reads the final figure once; only the visual tween animates.
  return (
    <span ref={ref}>
      <span aria-hidden="true">{value.toLocaleString()}{suffix}</span>
      <span className="sr-only">{to.toLocaleString()}{suffix}</span>
    </span>
  );
}

const CHIP_ACCENTS = ["indigo", "orange", "yellow", "green", "purple"] as const;

export function LogoChip({ src, alt, index }: { src: string; alt: string; index: number }) {
  const accent = CHIP_ACCENTS[index % CHIP_ACCENTS.length];
  return (
    <div
      className="logo-chip"
      style={{
        ["--chip-accent" as string]: `var(--${accent})`,
        ["--chip-rot" as string]: `${index % 2 === 0 ? -2 : 2}deg`,
      }}
    >
      <img src={src} alt={alt} width={150} height={78} />
    </div>
  );
}

export function Marquee({ children, duration = 26 }: { children: ReactNode; duration?: number }) {
  return (
    <div className="marquee">
      <motion.div
        className="marquee-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export function MagneticLink({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  const x = useSpring(0, { stiffness: 250, damping: 18 });
  const y = useSpring(0, { stiffness: 250, damping: 18 });

  function handleMove(e: PointerEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }

  return (
    <MotionLink
      href={href}
      className={className}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </MotionLink>
  );
}

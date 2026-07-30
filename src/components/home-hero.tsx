"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { CrestShine } from "@/components/crest-shine";
import { Counter } from "@/components/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINE_1 = ["One", "campus."];
const LINE_2 = [
  { text: "Twelve", em: false },
  { text: "institutions.", em: true },
];

const wordVariants: Variants = {
  hidden: { y: "110%", rotate: 4, opacity: 0.15 },
  show: (i: number) => ({
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.95, delay: 0.28 + i * 0.09, ease: EASE },
  }),
};

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: EASE },
  },
});

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const instant = !!reduceMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 0.55], [0, instant ? 0 : -48]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.45], [1, instant ? 1 : 0.35]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, instant ? 0 : 90]);

  return (
    <section ref={sectionRef} className="hero hero-bleed">
      <motion.div className="hero-bg" style={{ y: bgY }} aria-hidden="true">
        <div className="hero-bg-image" role="img" aria-label="SEA Group of Institutions campus gate" />
        <div className="hero-bg-scrim" />
      </motion.div>

      <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
        <motion.div
          className="hero-crest-row"
          initial={instant ? false : "hidden"}
          animate="show"
          variants={fadeUp(0.05)}
        >
          <CrestShine size={44} />
          <span className="eyebrow">SEA GROUP OF INSTITUTIONS / BENGALURU</span>
        </motion.div>

        <h1 className="hero-title" aria-label="One campus. Twelve institutions.">
          <span className="hero-title-line" aria-hidden="true">
            {LINE_1.map((word, i) => (
              <span key={word} className="hero-title-word-mask">
                <motion.span
                  className="hero-title-word"
                  custom={i}
                  variants={wordVariants}
                  initial={instant ? false : "hidden"}
                  animate="show"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="hero-title-line" aria-hidden="true">
            {LINE_2.map((word, i) => (
              <span key={word.text} className="hero-title-word-mask">
                <motion.span
                  className={`hero-title-word${word.em ? " is-em" : ""}`}
                  custom={LINE_1.length + i}
                  variants={wordVariants}
                  initial={instant ? false : "hidden"}
                  animate="show"
                >
                  {word.em ? <em>{word.text}</em> : word.text}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p initial={instant ? false : "hidden"} animate="show" variants={fadeUp(0.78)}>
          From engineering to nursing to law — find the programme that&rsquo;s actually you.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={instant ? false : "hidden"}
          animate="show"
          variants={fadeUp(0.92)}
        >
          <Link href="/academics/" className="primary-cta">
            Find a programme <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/explore/" className="ghost-cta">
            Browse all 12 institutions
          </Link>
        </motion.div>
      </motion.div>

      <div className="hero-stamp">
        <motion.div
          className="hero-stamp-inner"
          initial={instant ? false : { opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: instant ? 0 : 1.05, ease: EASE }}
        >
          <div className="hero-stamp-cell">
            <b>
              <Counter to={12} />
            </b>
            <span>Institutions</span>
          </div>
          <div className="hero-stamp-cell">
            <b>
              <Counter to={160} suffix="+" />
            </b>
            <span>Recruiters</span>
          </div>
          <div className="hero-stamp-cell">
            <b>
              <Counter to={2000} suffix="+" />
            </b>
            <span>Alumni network</span>
          </div>
          <div className="hero-stamp-cell">
            <b>
              <Counter to={26} />
            </b>
            <span>Years since 2000</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

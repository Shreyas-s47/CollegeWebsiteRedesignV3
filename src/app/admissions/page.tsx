import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { Footer } from "@/components/footer";
import { LogoChip, Marquee, Reveal, RevealItem, RevealList, RevealStagger } from "@/components/motion";
import { ScrollTimeline } from "@/components/scroll-timeline";

const steps = [["01", "Say hello", "Begin with the online or offline application form and tell us a little about yourself."], ["02", "Let's talk", "Our admissions team schedules an interview to understand your interests and aspirations."], ["03", "Share your story", "Submit the academic records and documents required for the programme you choose."], ["04", "Make it official", "After review, the admissions committee shares the decision and next steps."]];

const accreditations = Array.from({ length: 6 }, (_, i) => `/images/associations/${i + 1}.jpg`);

/** Real PDFs published by SEA — see content/other/brochures.md. */
const brochures: [string, string][] = [
  ["SEA College of Engineering", "https://seaedu.ac.in/backend/themes/pixel/images/pdf/seacet.pdf"],
  ["SEA College of Nursing", "https://seaedu.ac.in/backend/themes/pixel/images/pdf/nursing.pdf"],
  ["SEA College of Science, Commerce & Arts", "https://seaedu.ac.in/backend/themes/pixel/images/pdf/Degree.pdf"],
  ["SEA Composite PU College", "https://seaedu.ac.in/backend/themes/pixel/images/pdf/seapu.pdf"],
  ["Placements", "https://seaedu.ac.in/backend/themes/pixel/images/pdf/placements.pdf"],
];

export const metadata: Metadata = {
  title: "Admissions",
  description: "How to apply to SEA Group of Institutions — the four-step admissions journey, accreditations and how to reach the admissions office.",
};

export default function Admissions() {
  return <>
    <section className="admission-hero">
      <Reveal><span className="eyebrow">ADMISSIONS / 2026–27</span><h1>Your next move<br />starts <em>here.</em></h1><p>Whatever direction you choose, it starts with a conversation.</p><a href="mailto:seaeduinfo@seaedu.ac.in" className="primary-cta">Talk to admissions <span>↗</span></a></Reveal>
    </section>
    <section className="admission-steps">
      <Reveal><span className="eyebrow">THE JOURNEY</span><h2>Four moves.<br />One big future.</h2></Reveal>
      <ScrollTimeline>
        <RevealList>
          {steps.map(([number, title, copy]) => (
            <Fragment key={number}><b>{number}</b><div><h3>{title}</h3><p>{copy}</p></div><span>↘</span></Fragment>
          ))}
        </RevealList>
      </ScrollTimeline>
    </section>
    <section className="accreditation-strip">
      <span className="eyebrow section-index">RECOGNISED &amp; ACCREDITED BY</span>
      <Marquee>{accreditations.map((src, i) => <LogoChip key={src} src={src} alt="Accrediting body logo" index={i} />)}</Marquee>
    </section>

    <section className="brochure-section">
      <Reveal>
        <span className="eyebrow">PROSPECTUS</span>
        <h2>Download a brochure.</h2>
      </Reveal>
      <RevealStagger className="brochure-grid" step={0.05}>
        {brochures.map(([label, href]) => (
          <RevealItem key={href}>
            <a className="brochure-card" href={href} target="_blank" rel="noreferrer">
              <b>{label}</b>
              <span>PDF <span aria-hidden="true">↗</span></span>
            </a>
          </RevealItem>
        ))}
      </RevealStagger>
      <Reveal delay={0.1}>
        <p className="figures-note">
          Brochures are hosted on seaedu.ac.in and open in a new tab. Check the printed fee and
          intake details against the admissions office before relying on them.
        </p>
      </Reveal>
    </section>

    <Reveal>
      <section className="split-cta">
        <div>
          <h2>Applying from outside India?</h2>
          <p>The documents and visa steps for international and NRI applicants are set out separately.</p>
        </div>
        <Link href="/admissions/international/" className="primary-cta">
          International &amp; NRI admission <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </Reveal>
    <Reveal>
      <section className="contact-card"><div><span className="eyebrow">OFFICE OF ADMISSIONS</span><h2>Questions are<br />a good start.</h2></div><div><a href="tel:+917353945999">+91 73539 45999</a><a href="tel:+916366453030">+91 63664 53030</a><a href="mailto:seaeduinfo@seaedu.ac.in">seaeduinfo@seaedu.ac.in</a><p>Monday–Saturday<br />10:00 AM–5:00 PM</p></div><Link href="/contact/" className="white-cta">Full contact details ↗</Link></section>
    </Reveal>
    <Footer />
  </>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Counter, Marquee, Reveal, RevealItem, RevealStagger } from "@/components/motion";

export const metadata: Metadata = {
  title: "Placements",
  description:
    "Placement highlights, the Career Advancement Cell and how recruitment works at SEA Group of Institutions, Bengaluru.",
};

/**
 * Every figure below is taken verbatim from content/placements/placement-overview.md.
 * Do not add a metric that is not in an approved source — see UPDATED_MASTER_PLAN.md §6.
 */
const highlights: { value: number; suffix: string; label: string }[] = [
  { value: 160, suffix: "+", label: "Recruiters" },
  { value: 80, suffix: "+", label: "Companies offering internships" },
  { value: 23, suffix: "%", label: "Salary hike from previous year" },
  { value: 422, suffix: "+", label: "IRE talk series sessions" },
  { value: 2000, suffix: "+", label: "Alumni network" },
  { value: 10, suffix: "+", label: "Start-ups from campus" },
];

const process = [
  ["01", "Register", "Register with the Placement Department, giving academic performance, skills and contact details. Registration is done both digitally and manually, and details should be kept up to date."],
  ["02", "Enrol for a drive", "Companies share a job description with the placement office, which circulates it to registered students. Read the JD and the company's site, assess suitability, then enrol in the prescribed format."],
  ["03", "Meet the criteria", "Eligibility varies by company. Generally: all academic requirements for your programme completed, the specified minimum percentage or CGPA, no backlogs, and good communication skills."],
  ["04", "Attend the selection process", "Once enrolled you are expected to appear for the selection process without fail, following the rules and policies of the Placement Department."],
];

const panel = [
  ["Dr. Chidanand Prasad R", "Director, Placements — SEA Group"],
  ["Prof. Bhuvaneshwari", "Co-ordinator, Placements — CSE Department"],
  ["Prof. Amith Kumar", "Co-ordinator, Placements — ISE Department"],
  ["Prof. Asha V K R", "Co-ordinator, Placements — ECE Department"],
  ["Prof. Kuber Gowda", "Co-ordinator, Placements — Mechanical Department"],
];

const recruiters = Array.from({ length: 12 }, (_, i) => `/images/recruiters/r${i + 1}.jpg`);

export default function Placements() {
  return <>
    <section className="page-intro">
      <Reveal>
        <span className="eyebrow">PLACEMENTS / CAREER SUPPORT</span>
        <h1>Where preparation<br /><em>meets opportunity.</em></h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p>
          The campus placement policy is defined so that recruitment at SEA is transparent, fair
          and beneficial for students and companies alike.
        </p>
      </Reveal>
    </section>

    <section className="placement-pulse">
      <Reveal>
        <span className="eyebrow">PLACEMENT HIGHLIGHTS</span>
        <h2>The numbers<br />behind the support.</h2>
      </Reveal>
      <RevealStagger className="highlight-grid" step={0.06}>
        {highlights.map((h) => (
          <RevealItem key={h.label}>
            <div className="highlight-card">
              <b><Counter to={h.value} suffix={h.suffix} /></b>
              <span>{h.label}</span>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
      <Reveal delay={0.1}>
        <p className="figures-note">
          Figures as published by SEA Group of Institutions. Confirm the current year&rsquo;s
          numbers and their basis with the Placement Department before relying on them.
        </p>
      </Reveal>
    </section>

    <section className="recruiters-strip">
      <span className="eyebrow section-index">A SELECTION OF RECRUITERS</span>
      <Marquee>
        {recruiters.map((src) => (
          <div className="logo-chip" key={src}>
            <img src={src} alt="Recruiter logo" width={150} height={78} />
          </div>
        ))}
      </Marquee>
    </section>

    <section className="admission-steps">
      <Reveal>
        <span className="eyebrow">HOW RECRUITMENT WORKS</span>
        <h2>From register<br />to offer.</h2>
      </Reveal>
      <ol className="process-list">
        {process.map(([number, title, copy]) => (
          <li key={number}>
            <b>{number}</b>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </li>
        ))}
      </ol>
    </section>

    <section className="panel-section">
      <Reveal>
        <span className="eyebrow">CAREER ADVANCEMENT CELL</span>
        <h2>The placement panel.</h2>
        <p className="large-copy">
          The placement selection panel is made up of members drawn from across the SEA Group.
        </p>
      </Reveal>
      <RevealStagger className="panel-grid" step={0.05}>
        {panel.map(([name, role]) => (
          <RevealItem key={name}>
            <div className="panel-card"><b>{name}</b><span>{role}</span></div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>

    <Reveal>
      <section className="contact-card">
        <div>
          <span className="eyebrow">PLACEMENT ENQUIRIES</span>
          <h2>Talk to the<br />placement team.</h2>
        </div>
        <div>
          <a href="mailto:directorplacements@seaedu.ac.in">directorplacements@seaedu.ac.in</a>
          <a href="tel:+916366453030">+91 63664 53030</a>
          <p>Monday–Saturday<br />10:00 AM–5:00 PM</p>
        </div>
        <Link href="/contact/" className="white-cta">All contact details ↗</Link>
      </section>
    </Reveal>

    <Footer />
  </>;
}

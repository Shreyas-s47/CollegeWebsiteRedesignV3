import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Reveal, RevealList } from "@/components/motion";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "International & NRI admission",
  description:
    "Admission process, required documents and contacts for international and NRI applicants to SEA Group of Institutions, Bengaluru.",
};

/**
 * Sourced from content/admissions/nri-admission.md and
 * content/admissions/foreign-national.md — both SEA-specific.
 *
 * NOTE: content/admissions/financial-aid.md is deliberately NOT used here.
 * That file describes a loan tie-up belonging to Krupanidhi Group of
 * Institutions, a different college, and must not be published as SEA's.
 * See UPDATED_MASTER_PLAN.md §4.
 */

const steps = [
  ["01", "Apply", "Apply online or offline — the procedure is common to all students. You can contact the Admission Cell at the campus directly, or fill in the admission form on the website."],
  ["02", "Selection", "Selection is based purely on academic merit and aptitude. There is no entrance test; the college conducts an interview and assessment before granting admission."],
  ["03", "Part payment", "Once selected you are informed, and part of the tuition fee is paid at this stage based on the amount intimated."],
  ["04", "Visa processing", "After payment, the college issues the details needed for visa processing."],
  ["05", "Complete admission", "Submit all required documents and the balance tuition fee before the due date."],
];

const documents = [
  "Mark sheets for 10th and 12th (or equivalent), plus the UG degree mark sheet if applying for a PG course, as issued by the board or university",
  "Eligibility certificate issued by a relevant Indian university",
  "Conduct or character certificate, with the transfer certificate from the last institution attended",
  "Copies of a valid passport and student visa or residential permit",
  "HIV clearance certificate",
  "Ten passport-size and ten stamp-size photographs",
];

export default function InternationalAdmission() {
  return <>
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/admissions/">Admissions</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">International &amp; NRI</span>
    </nav>

    <section className="page-intro">
      <Reveal>
        <span className="eyebrow">ADMISSIONS / INTERNATIONAL &amp; NRI</span>
        <h1>Applying from<br /><em>outside India.</em></h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p>
          The process is the same as for every other applicant — the differences are the documents
          you submit and the visa step that follows selection.
        </p>
      </Reveal>
    </section>

    <section className="admission-steps">
      <Reveal>
        <span className="eyebrow">THE PROCESS</span>
        <h2>Five steps,<br />start to finish.</h2>
      </Reveal>
      <RevealList>
        {steps.map(([number, title, copy]) => (
          <Fragment key={number}>
            <b>{number}</b>
            <div><h3>{title}</h3><p>{copy}</p></div>
            <span aria-hidden="true">↘</span>
          </Fragment>
        ))}
      </RevealList>
    </section>

    <section className="documents-section">
      <Reveal>
        <div>
          <span className="eyebrow">WHAT TO SUBMIT</span>
          <h2>Documents for international admission.</h2>
          <p className="doc-note">
            Where the medium of instruction was not English, applicants may be asked to take an
            intensive six-month English course during their programme.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <ul className="tick-list">
          {documents.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </Reveal>
    </section>

    <section className="eligibility-section">
      <Reveal>
        <span className="eyebrow">ENGINEERING ELIGIBILITY</span>
        <h2>B.E. entry requirement.</h2>
        <p className="large-copy">
          A pass in PUC or the 10+2 equivalent examination with a minimum of 45% aggregate (40% for
          SC/ST and OBC groups) in Physics and Mathematics, plus one of Biology, Chemistry,
          Computer Science or Electronics.
        </p>
        <p className="figures-note">
          This criterion applies irrespective of seat category. Confirm the requirements for other
          programmes, and current fees, with the admissions office before applying.
        </p>
      </Reveal>
    </section>

    <Reveal>
      <section className="contact-card">
        <div>
          <span className="eyebrow">INTERNATIONAL ADMISSIONS</span>
          <h2>Our counsellors<br />can guide you.</h2>
        </div>
        <div>
          <a href="mailto:seaeduinfo@seaedu.ac.in">seaeduinfo@seaedu.ac.in</a>
          <a href="tel:+917353945999">+91 73539 45999</a>
          <a href="tel:08029730681">080 2973 0681</a>
          <p>Monday–Saturday<br />10:00 AM–5:00 PM</p>
        </div>
        <Link href="/contact/" className="white-cta">All contact details ↗</Link>
      </section>
    </Reveal>

    <Footer />
  </>;
}

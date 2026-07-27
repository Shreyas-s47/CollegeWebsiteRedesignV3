import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion";
import { ProgrammeDirectory } from "@/components/programme-directory";
import { programmes } from "@/lib/programmes";

export const metadata: Metadata = {
  title: "Academics & programmes",
  description:
    "Every programme at SEA Group of Institutions — pre-university, undergraduate, postgraduate, diploma and value-added certificate courses. Filter by level and field.",
};

export default function Academics() {
  return <>
    <section className="page-intro">
      <Reveal>
        <span className="eyebrow">ACADEMICS / {programmes.length} PROGRAMMES</span>
        <h1>Find the course,<br /><em>not just the college.</em></h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p>
          Filter by level or field to see what SEA offers — from pre-university through
          postgraduate diplomas and value-added certificates.
        </p>
      </Reveal>
    </section>

    <div className="directory-wrap">
      <ProgrammeDirectory programmes={programmes} />
      <p className="figures-note">
        Programme details are drawn from SEA&rsquo;s published material. Confirm current intake,
        eligibility and fees with the admissions office before applying.
      </p>
    </div>

    <Footer />
  </>;
}

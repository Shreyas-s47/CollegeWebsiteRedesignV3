import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Reveal, RevealItem, RevealStagger, TiltCard } from "@/components/motion";

export const metadata: Metadata = {
  title: "Facilities & hostel",
  description:
    "Campus infrastructure, library, laboratories, hostel accommodation, sports facilities and digital services at SEA Group of Institutions, Bengaluru.",
};

/**
 * Sourced from:
 *   content/campus/campus-infrastructure.md
 *   content/campus/accommodation-hostel-facilities.md
 *   content/campus/digital-infrastructure.md
 *   content/campus/sports.md
 * Nothing here is inferred — if the source did not state it, it is not on this page.
 */

const facilities = [
  {
    title: "Classrooms & laboratories",
    body: "Classrooms are well-designed and well-ventilated. Computer laboratories are available to students and faculty, with regular hardware and software training sessions. All labs are network-enabled and connected to the internet through a centralised server room.",
  },
  {
    title: "Central library",
    body: "The central library is stocked with books, magazines, journals and newspapers. Students and faculty have their own reading rooms, alongside a computer zone, a microfilming space, a documentation centre and an audio-visual room.",
  },
  {
    title: "Grounds & green campus",
    body: "The campus has a rich green environment, properly built internal roadways and street lighting. Planted gardens give students somewhere to clear their heads between classes.",
  },
  {
    title: "Sports",
    body: "A multipurpose indoor stadium and ground host indoor and outdoor games. The campus has a gym, football and cricket fields, and basketball, volleyball and badminton courts.",
  },
];

const hostel = [
  "Separate hostels for boys and girls inside the college campus",
  "Comfortable, well-furnished rooms",
  "Separate hostel for international students",
  "Campus cafeteria serving a variety of cuisines",
  "Round-the-clock medical facilities",
  "24-hour security and housekeeping",
  "A campus guest house for visiting faculty and guests",
];

const digital = [
  ["SEA App", "Alumni relationships and industry connections"],
  ["AICTE Portal", "Academic standards and infrastructure"],
  ["Google Meet", "Virtual webinars and panel discussions"],
  ["Campus Wi-Fi", "High-speed internet across the campus"],
  ["ICT tools", "Classroom teaching technology"],
  ["Firewall", "Network security and data monitoring"],
  ["CCTV", "Video surveillance across campus blocks"],
  ["Google Workspace", "Official email on the institute domain"],
];

const cells = [
  "Student Counselling Cell",
  "Anti Sexual Harassment Cell",
  "Anti Ragging Cell",
  "Parents Relation Centre",
  "Students/Teacher Welfare Cell",
];

export default function Facilities() {
  return <>
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/campus-life/">Campus life</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">Facilities &amp; hostel</span>
    </nav>

    <section className="page-intro">
      <Reveal>
        <span className="eyebrow">CAMPUS / FACILITIES &amp; HOSTEL</span>
        <h1>What&rsquo;s actually<br /><em>on campus.</em></h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p>
          The campus is built to give a clean, accessible environment for study — landscaped
          grounds, network-enabled labs, a central library, sports facilities and separate
          residential blocks.
        </p>
      </Reveal>
    </section>

    <RevealStagger className="facility-grid" step={0.07}>
      {facilities.map((f) => (
        <RevealItem key={f.title}>
          <TiltCard max={4} className="facility-card">
            <h2>{f.title}</h2>
            <p>{f.body}</p>
          </TiltCard>
        </RevealItem>
      ))}
    </RevealStagger>

    <section className="hostel-section">
      <Reveal>
        <div className="hostel-copy">
          <span className="eyebrow">ACCOMMODATION</span>
          <h2>Hostel &amp; residential life.</h2>
          <ul className="tick-list">
            {hostel.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="hostel-photos">
          <div style={{ backgroundImage: "url(/images/campus/hostel-1.jpg)" }} role="img" aria-label="Hostel room with study desk" />
          <div style={{ backgroundImage: "url(/images/campus/hostel-2.jpg)" }} role="img" aria-label="Students in a hostel room" />
        </div>
      </Reveal>
    </section>

    <section className="safety-section">
      <Reveal>
        <span className="eyebrow">STUDENT SAFETY</span>
        <h2>Anti-ragging &amp; student cells.</h2>
        <p className="large-copy">
          Ragging is strictly prohibited both inside and outside the college campus and in the
          hostels, under section 116 of the Karnataka Education Act 1983. An anti-ragging
          committee and anti-ragging squads of senior faculty and wardens deal with any incident,
          and students found guilty are liable for action under the law.
        </p>
      </Reveal>
      <RevealStagger className="cell-list" step={0.05}>
        {cells.map((c) => <RevealItem key={c}><span className="cell-chip">{c}</span></RevealItem>)}
      </RevealStagger>
    </section>

    <section className="digital-section">
      <Reveal>
        <span className="eyebrow">DIGITAL INFRASTRUCTURE</span>
        <h2>The systems behind<br />the classroom.</h2>
      </Reveal>
      <RevealStagger className="digital-grid" step={0.04}>
        {digital.map(([name, use]) => (
          <RevealItem key={name}>
            <div className="digital-card"><b>{name}</b><span>{use}</span></div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>

    <Footer />
  </>;
}

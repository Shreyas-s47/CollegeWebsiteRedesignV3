import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Counter, Reveal, RevealItem, RevealStagger, TiltCard } from "@/components/motion";

const cards = [
  ["Learn", "Modern classrooms, network-enabled computer laboratories and subject-specific learning spaces.", "/images/institutions/pu.jpg", "indigo"],
  ["Gather", "A campus designed with gardens, internal roads and open space for connection and a clear mind.", "/images/about/aboutus.jpg", "orange"],
  ["Move", "Common rooms and everyday spaces to recharge, unwind and connect between classes.", "/images/campus/hostel-2.jpg", "green"],
  ["Grow", "Quiet corners, reading nooks and study spaces for the work that needs a clear head.", "/images/campus/hostel-1.jpg", "purple"],
];

export const metadata: Metadata = {
  title: "Campus life",
  description: "Classrooms, labs, common rooms and study spaces on the SEA campus in K R Puram, Bengaluru.",
};

export default function CampusLife() {
  return <>
    <section className="page-intro campus-intro">
      <Reveal><span className="eyebrow">CAMPUS LIFE / BEYOND THE CLASSROOM</span><h1>The things you learn<br /><em>between classes.</em></h1></Reveal>
      <Reveal delay={0.1}><p>SEA is built as a place to study, meet, make, play, and build a life with purpose.</p></Reveal>
    </section>
    <RevealStagger className="life-grid" step={0.1}>
      <RevealItem>
        <TiltCard max={4} className={`life-card-feature ${cards[0][3]}`}>
          <div className="life-photo" style={{ backgroundImage: `url(${cards[0][2]})` }} />
          <div><span>01</span><h2>{cards[0][0]}</h2><p>{cards[0][1]}</p></div>
        </TiltCard>
      </RevealItem>
      {cards.slice(1).map(([title, copy, image, color], i) => (
        <RevealItem key={title}>
          <TiltCard max={4} className={`life-tile ${color}`} style={{ backgroundImage: `url(${image})` }}>
            <span>0{i + 2}</span>
            <b>{title}</b>
          </TiltCard>
        </RevealItem>
      ))}
    </RevealStagger>
    <section className="placement-pulse">
      <Reveal><span className="eyebrow">PLACEMENT PULSE</span><h2>Future-ready<br />looks good on you.</h2></Reveal>
      <div>
        <b><Counter to={23} suffix="%" /><small>salary hike, YoY</small></b>
        <b><Counter to={160} suffix="+" /><small>recruiters</small></b>
        <b><Counter to={80} suffix="+" /><small>internship companies</small></b>
        <b><Counter to={2000} suffix="+" /><small>alumni network</small></b>
        <b><Counter to={10} suffix="+" /><small>campus start-ups</small></b>
      </div>
    </section>
    <Reveal>
      <section className="split-cta">
        <div>
          <h2>Facilities, hostel and campus services</h2>
          <p>Library, laboratories, sports, residential blocks, student safety cells and digital infrastructure — set out in detail.</p>
        </div>
        <Link href="/campus-life/facilities/" className="primary-cta">
          Facilities &amp; hostel <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </Reveal>
    <Footer />
  </>;
}

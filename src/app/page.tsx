import Link from "next/link";
import { CrestShine } from "@/components/crest-shine";
import { Footer } from "@/components/footer";
import { HeroParallax } from "@/components/hero-parallax";
import { Counter, LogoChip, MagneticLink, Marquee, PointerGlow, Reveal, RevealItem, RevealStagger } from "@/components/motion";
import { Photo } from "@/components/photo";
import { StreamExplorer } from "@/components/stream-explorer";

const leaders = [
  { name: "Sri A. Krishnappa", role: "Founder, S.E.A.E.T.", photoName: "leadership/founder", quote: "We believe education is the bedrock of all transformation and progress." },
  { name: "Mrs. Manjula A Krishnappa", role: "Chairman, SEA Group of Institutions", photoName: "leadership/chairman", quote: "Success is not a one-shot process — it is continuous improvement after every failure." },
  { name: "Prof(Dr) K Viyyanna Rao", role: "Director, SEA Group of Institutions", photoName: "leadership/director", quote: "Our aim is to make students autonomous, socially responsible, and ready for the world." },
];

const campusFacts = [
  { label: "Central library", detail: "Reading halls open through exam season" },
  { label: "Science & engineering labs", detail: "Equipped across all twelve institutions" },
  { label: "Residential hostels", detail: "Separate blocks, on-campus" },
  { label: "Sports grounds", detail: "Athletics, courts and a play field" },
];

const recruiters = Array.from({ length: 12 }, (_, i) => `/images/recruiters/r${i + 1}.jpg`);

export default function Home() {
  return <>
    <section className="hero hero-parallax">
      <HeroParallax />
      <RevealStagger className="hero-copy" step={0.12}>
        <RevealItem className="hero-crest-row">
          <CrestShine size={44} />
          <span className="eyebrow">SEA GROUP OF INSTITUTIONS / BENGALURU</span>
        </RevealItem>
        <RevealItem><h1>One Bengaluru campus.<br />A future built <em>around you.</em></h1></RevealItem>
        <RevealItem><p>Explore engineering, management, nursing, law, education and schools — then compare programmes, eligibility and admission routes.</p></RevealItem>
        <RevealItem className="hero-actions">
          <Link href="/academics/" className="primary-cta">
            Explore programmes <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/admissions/" className="ghost-cta">
            Admissions 2026–27
          </Link>
        </RevealItem>
      </RevealStagger>
      <div className="hero-stamp">
        <div><b><Counter to={12} /></b><span>Institutions</span></div>
        <div><b><Counter to={160} suffix="+" /></b><span>Recruiters</span></div>
        <div><b><Counter to={2000} suffix="+" /></b><span>Alumni network</span></div>
        <div><b><Counter to={26} /></b><span>Years since 2000</span></div>
      </div>
    </section>
    <section className="manifesto split-section">
      <p className="section-index">01 / THE SEA WAY</p>
      <RevealStagger className="manifesto-copy">
        <RevealItem><h2 className="editorial-heading">Education should feel<br />like <em>possibility.</em></h2></RevealItem>
        <RevealItem><p className="large-copy editorial-copy">S.E.A. Education Trust was established to make academic excellence accessible to every section of society. Today, it is a place where ambitions find their direction.</p></RevealItem>
        <RevealItem><Link href="/campus-life/" className="text-link">Step inside the campus ↗</Link></RevealItem>
      </RevealStagger>
    </section>
    <section className="streams-intro">
      <Reveal className="section-heading"><span className="eyebrow">02 / SIX STREAMS, TWELVE INSTITUTIONS</span><h2>Pick a stream.<br />See who&rsquo;s in it.</h2><p>Every institution on campus, grouped into six academic streams — select one to see its programmes.</p></Reveal>
      <StreamExplorer />
    </section>
    <section className="image-story">
      <div className="campus-photo-frame">
        <Photo name="about/campus" compact={800} full={1800} alt="SEA campus gardens" className="campus-photo" sizes="(max-width: 800px) 100vw, 55vw" />
      </div>
      <div className="story-panel">
        <Reveal>
          <span className="eyebrow">03 / THE CAMPUS</span>
          <h2 className="editorial-heading">Room to think.<br />Space to become.</h2>
          <p className="editorial-copy">The SEA campus blends landscaped gardens, modern labs, a central library, sports facilities and residential spaces into a learning environment that extends beyond the classroom.</p>
          <p className="campus-fact"><b><Counter to={50} suffix="+" /></b> <span>students from different nationalities study on this campus</span></p>
          <ul className="campus-quick-facts">
            {campusFacts.map((f) => <li key={f.label}><b>{f.label}</b><span>{f.detail}</span></li>)}
          </ul>
        </Reveal>
      </div>
    </section>
    <section className="leaders-section">
      <Reveal className="section-heading" style={{ padding: "6vw 6.4vw 0" }}><span className="eyebrow">04 / WHO GUIDES SEA</span><h2 className="editorial-heading">Voices behind<br />the vision.</h2><p>Meet the people shaping SEA&rsquo;s direction — and read their full messages on the About page.</p></Reveal>
      <RevealStagger className="leaders-grid">{leaders.map((leader) => <RevealItem key={leader.name}><div className="leader-card"><Photo name={leader.photoName} compact={480} full={900} alt={leader.name} className="leader-photo" sizes="(max-width: 800px) 90vw, 30vw" /><div><span>LEADERSHIP</span><h3>{leader.name}</h3><p className="role">{leader.role}</p><p className="quote editorial-copy">&ldquo;{leader.quote}&rdquo;</p></div></div></RevealItem>)}</RevealStagger>
      <div style={{ padding: "0 6.4vw 6vw", textAlign: "right" }}><Link href="/about/" className="text-link">Read full messages ↗</Link></div>
    </section>
    <section className="recruiters-strip">
      <span className="eyebrow section-index">05 / WHERE OUR GRADUATES GO</span>
      <Marquee>{recruiters.map((src, i) => <LogoChip key={src} src={src} alt="Recruiter logo" index={i} />)}</Marquee>
    </section>
    <Reveal><PointerGlow className="admission-banner"><span>YOUR NEXT CHAPTER<br />STARTS HERE</span><MagneticLink href="/admissions/" className="admission-link">Explore admissions <i>↗</i></MagneticLink></PointerGlow></Reveal>
    <Footer />
  </>;
}

import Link from "next/link";
import { CrestShine } from "@/components/crest-shine";
import { Footer } from "@/components/footer";
import { HeroParallax } from "@/components/hero-parallax";
import { Counter, LogoChip, Marquee, Reveal, RevealItem, RevealStagger, ScrollParallax, TiltCard } from "@/components/motion";
import { streams } from "@/lib/streams";

const leaders = [
  { name: "Sri A. Krishnappa", role: "Founder, S.E.A.E.T.", photo: "/images/leadership/founder.jpg", quote: "We believe education is the bedrock of all transformation and progress." },
  { name: "Mrs. Manjula A Krishnappa", role: "Chairman, SEA Group of Institutions", photo: "/images/leadership/chairman.jpg", quote: "Success is not a one-shot process — it is continuous improvement after every failure." },
  { name: "Prof(Dr) K Viyyanna Rao", role: "Director, SEA Group of Institutions", photo: "/images/leadership/director.jpg", quote: "Our aim is to make students autonomous, socially responsible, and ready for the world." },
];

const recruiters = Array.from({ length: 12 }, (_, i) => `/images/recruiters/r${i + 1}.jpg`);

export default function Home() {
  return <>
    <section className="hero hero-parallax">
      <div className="hero-copy">
        <div className="hero-crest-row">
          <CrestShine size={44} />
          <span className="eyebrow">SEA GROUP OF INSTITUTIONS / BENGALURU</span>
        </div>
        <h1>One campus.<br />Twelve <em>institutions.</em></h1>
        <p>From engineering to nursing to law — find the programme that&rsquo;s actually you.</p>
        <div className="hero-actions">
          <Link href="/academics/" className="primary-cta">
            Find a programme <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/explore/" className="ghost-cta">
            Browse all 12 institutions
          </Link>
        </div>
      </div>
      <HeroParallax />
      <div className="hero-stamp">
        <div><b><Counter to={12} /></b><span>Institutions</span></div>
        <div><b><Counter to={160} suffix="+" /></b><span>Recruiters</span></div>
        <div><b><Counter to={2000} suffix="+" /></b><span>Alumni network</span></div>
        <div><b><Counter to={26} /></b><span>Years since 2000</span></div>
      </div>
    </section>
    <section className="manifesto split-section">
      <p className="section-index">01 / THE SEA WAY</p>
      <Reveal><h2>Education should feel<br />like <em>possibility.</em></h2><p className="large-copy">S.E.A. Education Trust was established to make academic excellence accessible to every section of society. Today, it is a place where ambitions find their direction.</p><Link href="/campus-life/" className="text-link">Step inside the campus ↗</Link></Reveal>
    </section>
    <section className="directions-section">
      <Reveal className="section-heading"><span className="eyebrow">02 / SIX STREAMS, ONE CAMPUS</span><h2>Every institution.<br />Clearly grouped.</h2><p>Twelve real institutions, organised into six academic streams — pick the one that fits.</p></Reveal>
      <RevealStagger className="direction-grid">{streams.map((stream) => <RevealItem key={stream.slug}><TiltCard className="direction-tilt"><Link href={`/explore/#${stream.slug}`} className={`direction-card ${stream.color}`} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.15),rgba(0,0,0,.55)), url(${stream.photo})` }}><span>{stream.institutions.length} institution{stream.institutions.length > 1 ? "s" : ""}</span><b>{stream.title}</b><p>{stream.tagline}</p><i>↗</i></Link></TiltCard></RevealItem>)}</RevealStagger>
    </section>
    <section className="image-story">
      <ScrollParallax range={70}><div className="campus-photo" style={{ backgroundImage: "url(/images/about/campus-img.jpg)" }} role="img" aria-label="SEA campus gardens" /></ScrollParallax>
      <div className="story-panel"><Reveal><span className="eyebrow">03 / THE CAMPUS</span><h2>Room to think.<br />Space to become.</h2><p>The SEA campus blends landscaped gardens, modern labs, a central library, sports facilities and residential spaces into a learning environment that extends beyond the classroom.</p><p className="campus-fact"><b><Counter to={50} suffix="+" /></b> <span>students from different nationalities study on this campus</span></p></Reveal></div>
    </section>
    <section className="leaders-section">
      <Reveal className="section-heading" style={{ padding: "6vw 6.4vw 0" }}><span className="eyebrow">04 / WHO GUIDES SEA</span><h2>Voices behind<br />the vision.</h2><p>Meet the people shaping SEA's direction — and read their full messages on the About page.</p></Reveal>
      <RevealStagger className="leaders-grid">{leaders.map((leader) => <RevealItem key={leader.name}><TiltCard className="leader-card" max={5}><div className="leader-photo" style={{ backgroundImage: `url(${leader.photo})` }} /><div><span>LEADERSHIP</span><h3>{leader.name}</h3><p className="role">{leader.role}</p><p className="quote">&ldquo;{leader.quote}&rdquo;</p></div></TiltCard></RevealItem>)}</RevealStagger>
      <div style={{ padding: "0 6.4vw 6vw", textAlign: "right" }}><Link href="/about/" className="text-link">Read full messages ↗</Link></div>
    </section>
    <section className="recruiters-strip">
      <span className="eyebrow section-index">05 / WHERE OUR GRADUATES GO</span>
      <Marquee>{recruiters.map((src, i) => <LogoChip key={src} src={src} alt="Recruiter logo" index={i} />)}</Marquee>
    </section>
    <Reveal><section className="admission-banner"><span>YOUR NEXT CHAPTER<br />STARTS HERE</span><Link href="/admissions/">Explore admissions <i>↗</i></Link></section></Reveal>
    <Footer />
  </>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { HashHighlight } from "@/components/hash-highlight";
import { Reveal, RevealItem, RevealStagger, TiltCard } from "@/components/motion";
import { streams } from "@/lib/streams";

export const metadata: Metadata = {
  title: "Explore institutions",
  description: "All twelve SEA institutions grouped into six academic streams — engineering, management, nursing, law, schools and pre-university.",
};

export default function Explore() {
  return <>
    <section className="page-intro">
      <Reveal><span className="eyebrow">EXPLORE SEA / 12 INSTITUTIONS, 6 STREAMS</span><h1>Every institution.<br /><em>Clearly grouped.</em></h1></Reveal>
      <Reveal delay={0.1}><p>Twelve real SEA institutions, organised into six academic streams. Start with what moves you.</p></Reveal>
    </section>
    <HashHighlight />
    <RevealStagger className="pathways" step={0.1}>
      {streams.map((stream, index) => (
        <RevealItem key={stream.slug}>
          <TiltCard id={stream.slug} max={3} className={`pathway ${stream.color}`} style={{ backgroundImage: `url(${stream.photo})` }}>
            <div className="pathway-overlay" />
            <div className="pathway-number">0{index + 1}</div>
            <div><h2>{stream.title}</h2><p>{stream.tagline}</p></div>
            <ul>
              {stream.institutions.map((item) => (
                <li key={item.slug}>
                  <Link href={`/explore/${item.slug}/`}>
                    {item.name}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </TiltCard>
        </RevealItem>
      ))}
    </RevealStagger>
    <Footer />
  </>;
}

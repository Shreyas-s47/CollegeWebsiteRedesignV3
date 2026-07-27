import type { Metadata } from "next";
import { CrestShine } from "@/components/crest-shine";
import { Footer } from "@/components/footer";
import { Reveal, RevealItem, RevealStagger, TiltCard } from "@/components/motion";

const leaders = [
  {
    name: "Sri A. Krishnappa",
    role: "Founder, S.E.A.E.T. · Ex-Minister, Government of Karnataka",
    photo: "/images/leadership/founder.jpg",
    paragraphs: [
      "We believe that education is the bedrock of all transformation and progress. In pursuance of our belief, we forayed into the field of education in the year 1972 with the Sri Venugopalswamy Educational Trust. In the year 2000, South East Asian Education Trust was formed.",
      "The teaching-learning technique in the institution is mainly based on Do, Feel, Learn, Reflect and Be — children learn through exploration, experimentation, critical examination and suggesting alternatives.",
      "Throughout their lives, our students continue to draw inspiration from the institution's motto: Arise! Awake! And Stop Not Till The Goal Is Reached.",
    ],
  },
  {
    name: "Mrs. Manjula A Krishnappa",
    role: "Chairman, S.E.A Group of Institutions",
    photo: "/images/leadership/chairman.jpg",
    paragraphs: [
      "Success is not a one-shot process. It is the result of continuous improvement after each failure. The fear of failure needs to be captured in order for a person to learn from it too.",
      "Over the years, S.E.A. Education Trust has built quite a special position in the private higher education sector, providing a clear student-centered environment to explore existing technical knowledge and gain new learning at the leading edges of technology development.",
      "The aim is to make our students autonomous and socially responsible human beings, capable of self-direction and ready for employment the day they graduate.",
    ],
  },
  {
    name: "Prof(Dr) K Viyyanna Rao",
    role: "Director, SEA Group of Institutions",
    photo: "/images/leadership/director.jpg",
    paragraphs: [
      "Former Vice-Chancellor of Acharya Nagarjuna University, with 35 years of teaching experience in Commerce & Management Studies. Guided 10 Ph.D.s and 14 M.Phil.s, authored 10 books, and published 121 research papers in national and international journals.",
      "Received the Best Research Paper Award twice from the Institute of Company Secretaries of India, the Best Teacher Award from the Government of Andhra Pradesh, and the Outstanding Excellence in Academic Leadership Award from Nexus Eclat Honours Society, Maryland, USA.",
    ],
  },
];

const trustees = [
  { name: "Sri A. Krishnappa", role: "Founder", photo: "/images/board/founder1.jpg" },
  { name: "Mrs. Manjula Krishnappa", role: "Chairman", photo: "/images/board/chairman1.jpg" },
  { name: "Mr. D.T Srinivas", role: "Secretary", photo: "/images/board/secretary1.jpg" },
  { name: "Mrs. Poornima K", role: "CEO", photo: "/images/board/ceo1.jpg" },
  { name: "Mrs. Anupama K", role: "Joint Secretary", photo: "/images/board/joint-secretary1.jpg" },
  { name: "Ms. Vinisha Yadav", role: "Vice President", photo: "/images/board/vice-president1.jpg" },
  { name: "Dr. Brijesh Yadav", role: "Member", photo: "/images/board/member1.jpg" },
  { name: "Mr. Rohan Yadav", role: "Member", photo: "/images/board/member2.jpg" },
];

/** From content/about/principals.md. */
const principals = [
  { name: "Dr. B Venkata Narayana", role: "Principal, SEA College of Engineering & Technology", photo: "/images/principals/seacet.png" },
  { name: "Dr. Hemam Sangeeta Devi", role: "Principal, SEA College of Nursing", photo: "/images/principals/seacon.png" },
  { name: "Ms. Sneha BR Gowda", role: "Principal, SEA Composite PU College", photo: "/images/principals/seapu.png" },
  { name: "Mrs. T.C. Thriveni", role: "Principal, SEA College of Law", photo: "/images/principals/sealaw.png" },
  { name: "Mrs. Hemamalini", role: "Principal, SEA International School (ICSE)", photo: "/images/principals/seaicse.png" },
  { name: "Mrs. Asha A", role: "Principal, SEA Primary & Higher Secondary School", photo: "/images/principals/seasb.png" },
  { name: "Mr. N. Padmaraju", role: "Principal, SEA Industrial Training Institute", photo: "/images/principals/seaiti.png" },
  { name: "Dr. Gopal M", role: "Principal, SEA College of B.Ed", photo: "/images/principals/seabed.png" },
];

export const metadata: Metadata = {
  title: "About SEA",
  description: "The founder, chairman, director and board of trustees behind South East Asian Education Trust, established in 2000.",
};

export default function About() {
  return <>
    <section className="page-intro">
      <Reveal><span className="eyebrow">ABOUT SEA / SINCE 2000</span><h1>The people<br /><em>behind the vision.</em></h1></Reveal>
      <Reveal delay={0.1}><p>South East Asian Education Trust was founded to make academic excellence accessible to every section of society. Here are the voices who carry that forward.</p></Reveal>
      <Reveal delay={0.15} className="legacy-seal"><CrestShine size={108} /><span>Est. 2000<br />26 years strong</span></Reveal>
    </section>

    {leaders.map((leader) => (
      <article className="leader-feature" key={leader.name}>
        <Reveal><div className="leader-feature-photo" style={{ backgroundImage: `url(${leader.photo})` }} /></Reveal>
        <Reveal delay={0.1}>
          <h2>{leader.name}</h2>
          <span className="role">{leader.role}</span>
          {leader.paragraphs.map((p, i) => <p className="body-copy" key={i}>{p}</p>)}
        </Reveal>
      </article>
    ))}

    <section style={{ padding: "6vw 6.4vw 0" }}>
      <Reveal><span className="eyebrow">BOARD OF TRUSTEES</span><h2 style={{ fontSize: "clamp(38px,4.5vw,68px)", marginBottom: 0 }}>Steering the trust<br />forward, together.</h2></Reveal>
    </section>
    <RevealStagger className="trustees-grid" step={0.06}>
      {trustees.map((trustee) => (
        <RevealItem key={trustee.name}>
          <TiltCard max={6} className="trustee-card">
            <div className="trustee-photo" style={{ backgroundImage: `url(${trustee.photo})` }} />
            <div><b>{trustee.name}</b><span>{trustee.role}</span></div>
          </TiltCard>
        </RevealItem>
      ))}
    </RevealStagger>

    <section style={{ padding: "5vw 6.4vw 0" }}>
      <Reveal>
        <span className="eyebrow">PRINCIPALS</span>
        <h2 style={{ fontSize: "clamp(38px,4.5vw,68px)", marginBottom: 0 }}>Leading each<br />institution.</h2>
      </Reveal>
    </section>
    <RevealStagger className="trustees-grid" step={0.05}>
      {principals.map((p) => (
        <RevealItem key={p.name}>
          <TiltCard max={6} className="trustee-card">
            <div className="trustee-photo" style={{ backgroundImage: `url(${p.photo})` }} />
            <div><b>{p.name}</b><span>{p.role}</span></div>
          </TiltCard>
        </RevealItem>
      ))}
    </RevealStagger>

    <Footer />
  </>;
}

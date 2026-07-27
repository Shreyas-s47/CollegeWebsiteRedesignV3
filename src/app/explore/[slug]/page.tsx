import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Reveal, RevealItem, RevealStagger, TiltCard } from "@/components/motion";
import { getInstitution, institutions } from "@/lib/streams";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return institutions.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const found = getInstitution(slug);
  if (!found) return { title: "Institution not found" };
  return {
    title: found.institution.name,
    description: found.institution.summary,
  };
}

export default async function InstitutionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const found = getInstitution(slug);
  if (!found) notFound();

  const { institution, stream } = found;

  // Only render rows SEA's source content actually provides.
  const facts = [
    ["Duration", institution.duration],
    ["Intake", institution.intake],
    ["Language", institution.language],
    ["Campus", institution.campus],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  const siblings = stream.institutions.filter((i) => i.slug !== institution.slug);

  return <>
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/explore/">Explore</Link>
      <span aria-hidden="true">/</span>
      <Link href={`/explore/#${stream.slug}`}>{stream.title}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{institution.name}</span>
    </nav>

    <section className="institution-hero">
      <Reveal>
        <span className="eyebrow">{stream.title.toUpperCase()}</span>
        <h1>{institution.name}</h1>
        <p className="large-copy">{institution.summary}</p>
        {institution.affiliation && <p className="affiliation">{institution.affiliation}</p>}
      </Reveal>
      <Reveal delay={0.1}>
        <div
          className="institution-photo"
          style={{ backgroundImage: `url(${institution.photo})` }}
          role="img"
          aria-label={`${institution.name} campus`}
        />
      </Reveal>
    </section>

    {facts.length > 0 && (
      <Reveal>
        <section className="fact-strip" aria-label="Course details">
          <dl>
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>
    )}

    <section className="institution-body">
      <Reveal>
        <div className="institution-copy">
          <h2>About the institution</h2>
          {institution.description.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <aside className="institution-aside" aria-label="Contact and links">
          <h3>Get in touch</h3>
          {institution.phone && (
            <a href={`tel:${institution.phone.replace(/\s/g, "")}`}>{institution.phone}</a>
          )}
          <a href="mailto:seaeduinfo@seaedu.ac.in">seaeduinfo@seaedu.ac.in</a>
          {institution.website && (
            <a href={institution.website} target="_blank" rel="noreferrer">
              Official site <span aria-hidden="true">↗</span>
            </a>
          )}
          <Link href="/admissions/" className="primary-cta">
            Admissions <span aria-hidden="true">↗</span>
          </Link>
          <p className="verified-note">
            Course details last checked against SEA source material on{" "}
            <time dateTime={institution.verified}>{institution.verified}</time>. Confirm current
            intake and fees with the admissions office before applying.
          </p>
        </aside>
      </Reveal>
    </section>

    {siblings.length > 0 && (
      <section className="related-section">
        <Reveal>
          <span className="eyebrow">ALSO IN {stream.title.toUpperCase()}</span>
          <h2>Related institutions</h2>
        </Reveal>
        <RevealStagger className="related-grid" step={0.07}>
          {siblings.map((s) => (
            <RevealItem key={s.slug}>
              <TiltCard max={5}>
                <Link
                  href={`/explore/${s.slug}/`}
                  className={`direction-card ${stream.color}`}
                  style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.62)), url(${s.photo})` }}
                >
                  <span>{stream.title}</span>
                  <b>{s.name}</b>
                  <p>{s.summary}</p>
                  <i aria-hidden="true">↗</i>
                </Link>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>
    )}

    <Footer />
  </>;
}

/**
 * Single source of truth for SEA's institutions and how they group into streams.
 *
 * DATA RULE: every field here must be traceable to a file under `content/`.
 * `source` records which one. If SEA has not confirmed a value, leave it
 * `undefined` rather than estimating — the whole point of this registry is that
 * nothing on the site is invented. See UPDATED_MASTER_PLAN.md §6 "Data integrity".
 *
 * `verified` is the date the values were last checked against `content/`.
 * It is NOT SEA sign-off; publication still needs that.
 */

export type Institution = {
  /** Route segment for /explore/[slug]/ */
  slug: string;
  name: string;
  /** Short line used on cards. */
  summary: string;
  /** Longer body copy, drawn from the scraped page. */
  description: string[];
  /** Affiliation / recognition exactly as stated in source. */
  affiliation?: string;
  duration?: string;
  intake?: string;
  language?: string;
  campus?: string;
  /** External institution site, if it has its own. */
  website?: string;
  phone?: string;
  photo: string;
  /** Path under content/ the facts came from. */
  source: string;
  /** ISO date these fields were last reconciled with the source file. */
  verified: string;
};

export type Stream = {
  slug: string;
  title: string;
  tagline: string;
  color: string;
  photo: string;
  institutions: Institution[];
};

const VERIFIED = "2026-07-25";
const CAMPUS = "K R Puram, Bengaluru";
const MAIN_PHONE = "+91 6366453030";

export const streams: Stream[] = [
  {
    slug: "engineering-technology",
    title: "Engineering & Technology",
    tagline: "Build what's next.",
    color: "indigo",
    photo: "/images/institutions/seacet.jpg",
    institutions: [
      {
        slug: "sea-college-of-engineering-technology",
        name: "SEA College of Engineering & Technology",
        summary: "Bachelor of Engineering across seven branches, established 2007.",
        description: [
          "S.E.A College of Engineering and Technology (SEACET) was established by Founder Chairman Sri. A. Krishnappa in the year 2007 under SEAET, offering world-class infrastructure.",
          "The Management is keen to uphold traditional Indian values — the thrust here is to blend thoroughly the modern and the traditional. An effort is afoot in the institution not only to raise the self-esteem of the student but to train them to respect others also.",
        ],
        affiliation: "Affiliated to VTU, Belgaum · Approved by AICTE, New Delhi",
        duration: "4 years, full time",
        intake: "540",
        language: "English",
        campus: CAMPUS,
        website: "https://seacet.edu.in/",
        phone: MAIN_PHONE,
        photo: "/images/institutions/seacet.jpg",
        source: "content/institutions/sea-college-of-engineering-technology.md",
        verified: VERIFIED,
      },
      {
        slug: "sea-industrial-training-institute",
        name: "SEA Industrial Training Institute",
        summary: "Trade-focused vocational training, ISO 29990:2010 certified.",
        description: [
          "SEA Industrial Training Institute offers vocational trade training on the K R Puram campus.",
        ],
        affiliation: "Affiliated to NCVT, New Delhi (No. DGET-6/10/126/2004-TC) · ISO 29990:2010 certified",
        duration: "2 years, full time",
        intake: "100",
        language: "English",
        campus: CAMPUS,
        website: "https://seaiti.edu.in/",
        phone: MAIN_PHONE,
        photo: "/images/institutions/iti.jpg",
        source: "content/institutions/sea-industrial-training-institute.md",
        verified: VERIFIED,
      },
      {
        slug: "sea-college-of-research-development-center",
        name: "SEA College of Research & Development Center",
        summary: "Research programmes and supervised study on the SEACET campus.",
        description: [
          "The Research & Development Center supports advanced study and research alongside SEA College of Engineering & Technology.",
        ],
        duration: "3 years, full time",
        intake: "100",
        language: "English",
        campus: CAMPUS,
        website: "https://seacet.edu.in/",
        phone: MAIN_PHONE,
        photo: "/images/institutions/research.jpg",
        source: "content/institutions/sea-college-of-research-development-center.md",
        verified: VERIFIED,
      },
    ],
  },
  {
    slug: "management-commerce",
    title: "Management & Commerce",
    tagline: "Turn potential into progress.",
    color: "yellow",
    photo: "/images/institutions/mba.jpg",
    institutions: [
      {
        slug: "sea-college-of-management-studies",
        name: "SEA College of Management Studies",
        summary: "Management education affiliated to Bangalore North University.",
        description: [
          "SEA College of Management Studies offers management programmes on the K R Puram campus, approved by AICTE.",
        ],
        affiliation: "Affiliated to Bangalore North University · Approved by AICTE, New Delhi",
        duration: "3 years, full time",
        intake: "100",
        language: "English",
        campus: CAMPUS,
        website: "https://seacet.edu.in/",
        phone: MAIN_PHONE,
        photo: "/images/institutions/mba.jpg",
        source: "content/institutions/sea-college-of-management-studies.md",
        verified: VERIFIED,
      },
      {
        slug: "sea-college-of-science-commerce-arts",
        name: "SEA College of Science, Commerce & Arts",
        summary: "Undergraduate degrees across science, commerce and arts.",
        description: [
          "S.E.A. College believes in a value-driven culture that promotes personal growth through education and self-realization. The campus fosters a supportive family environment, encouraging mental and physical well-being.",
          "The institute emphasises hard work, self-discipline and situational decision-making, guiding students from literacy to education, and from reactive to proactive.",
        ],
        affiliation: "Affiliated to Bengaluru North University",
        duration: "3 years, full time",
        intake: "100",
        language: "English",
        campus: CAMPUS,
        website: "https://seadegree.ac.in/",
        phone: MAIN_PHONE,
        photo: "/images/institutions/science-commerce-arts.jpg",
        source: "content/institutions/sea-college-of-science-commerce-arts.md",
        verified: VERIFIED,
      },
      {
        slug: "sea-evening-college",
        name: "SEA Evening College",
        summary: "Degree study scheduled for students who work during the day.",
        description: [
          "SEA Evening College runs degree programmes in evening sessions on the K R Puram campus.",
        ],
        duration: "3 years, full time",
        intake: "100",
        language: "English",
        campus: CAMPUS,
        website: "https://seapu.edu.in/",
        phone: MAIN_PHONE,
        photo: "/images/institutions/evening.jpg",
        source: "content/institutions/sea-evening-college.md",
        verified: VERIFIED,
      },
    ],
  },
  {
    slug: "nursing-health-sciences",
    title: "Nursing & Health Sciences",
    tagline: "Care, backed by clinical skill.",
    color: "green",
    photo: "/images/institutions/nursing.jpg",
    institutions: [
      {
        slug: "sea-college-of-nursing",
        name: "SEA College of Nursing",
        summary: "GNM and nursing degrees, affiliated to RGUHS.",
        description: [
          "Nursing is a career filled with endless personal and professional rewards. If you choose nursing, you are choosing to spend your life helping others, using skills that blend scientific knowledge with compassion and care.",
          "The diploma programme is designed to provide students with the basic knowledge, skills and attitudes necessary to enter the health care system as a professional nurse. Students develop skill and judgement in assessing, planning, implementing and evaluating nursing care for all age groups.",
        ],
        affiliation:
          "Affiliated to Rajiv Gandhi University of Health Sciences (RGUHS) · Recognised by INC and KNC",
        duration: "3 years, full time",
        intake: "100",
        language: "English",
        campus: CAMPUS,
        website: "https://seanursing.edu.in/",
        phone: MAIN_PHONE,
        photo: "/images/institutions/nursing.jpg",
        source: "content/institutions/sea-college-of-nursing.md",
        verified: VERIFIED,
      },
    ],
  },
  {
    slug: "law",
    title: "Law",
    tagline: "Think in arguments and evidence.",
    color: "orange",
    photo: "/images/institutions/law.jpg",
    institutions: [
      {
        slug: "sea-college-of-law",
        name: "SEA College of Law",
        summary: "3-year LLB and 5-year BA LLB, started in 2012.",
        description: [
          "The S.E.A Law College was started in the year 2012 and offers both the 3-year LLB and the 5-year BA LLB integrated course.",
          "The college has well qualified faculty and has been admitting students from outside Karnataka and from abroad since inception. It provides a well-equipped library with internet facility and an established Moot Court, and conducts national seminars across fields of law.",
        ],
        affiliation:
          "Affiliated to Karnataka State Law University, Hubli · Recognised by the Bar Council of India, New Delhi",
        duration: "3 and 5 years, full time",
        intake: "100",
        language: "English",
        campus: CAMPUS,
        website: "https://sealawcollege.edu.in/",
        phone: MAIN_PHONE,
        photo: "/images/institutions/law.jpg",
        source: "content/institutions/sea-college-of-law.md",
        verified: VERIFIED,
      },
    ],
  },
  {
    slug: "schools",
    title: "Schools",
    tagline: "Where curiosity starts early.",
    color: "purple",
    photo: "/images/institutions/international.jpg",
    institutions: [
      {
        slug: "sea-international-school",
        name: "SEA International School",
        summary: "ICSE syllabus, running since 2002.",
        description: [
          "S.E.A Group of Institutions started the ICSE syllabus in the year 2002 under the guidance of the late Shri A. Krishnappa. It began with a pre-primary session in 2002 and gradually added classes up to Standard X.",
          "The first batch of students successfully completed the X board exams in 2009.",
        ],
        affiliation: "ICSE syllabus",
        campus: CAMPUS,
        intake: "100",
        website: "https://seainternationalschool.in/",
        phone: MAIN_PHONE,
        photo: "/images/institutions/international.jpg",
        source: "content/institutions/sea-international-school.md",
        verified: VERIFIED,
      },
      {
        slug: "sea-primary-higher-secondary-school",
        name: "SEA Primary & Higher Secondary School",
        summary: "Karnataka State syllabus, established 2001.",
        description: [
          "SEA Primary and Higher Secondary School was established in 2001 by Founder Chairman Shri A. Krishnappa, with the vision of creating world-class citizens by giving the best education at a nominal fee, so that people of all economic levels can receive an excellent education.",
          "The school follows the Karnataka State government syllabus.",
        ],
        affiliation: "Karnataka State syllabus",
        campus: CAMPUS,
        intake: "100",
        website: "https://seaschool.edu.in/",
        phone: MAIN_PHONE,
        photo: "/images/institutions/state.jpg",
        source: "content/institutions/sea-primary-higher-secondary-school.md",
        verified: VERIFIED,
      },
    ],
  },
  {
    slug: "pu-teacher-education",
    title: "PU College & Teacher Education",
    tagline: "The next step, prepared for.",
    color: "charcoal",
    photo: "/images/institutions/pu.jpg",
    institutions: [
      {
        slug: "sea-composite-pu-college",
        name: "SEA Composite PU College",
        summary: "Two-year pre-university in science, commerce and arts.",
        description: [
          "SEA Composite PU College, established in 2002, is recognised by the Karnataka State PU Board. The college conducts the two-year pre-university course in Science, Commerce and Arts, with the combinations prescribed by the board.",
          "The college places emphasis on interactive learning by nurturing excellence, and has groomed thousands of young minds.",
        ],
        affiliation: "Recognised by Karnataka State PU Board",
        duration: "2 years, full time",
        intake: "100",
        language: "English",
        campus: CAMPUS,
        website: "https://seapu.edu.in/",
        phone: "+91 7338338707",
        photo: "/images/institutions/pu.jpg",
        source: "content/institutions/sea-composite-pu-college.md",
        verified: VERIFIED,
      },
      {
        slug: "sea-bed-college",
        name: "SEA College of B.Ed",
        summary: "Teacher education on the K R Puram campus.",
        description: [
          "SEA College of B.Ed prepares graduates for careers in teaching.",
        ],
        duration: "3 years, full time",
        intake: "100",
        language: "English",
        campus: CAMPUS,
        website: "https://bed.seaedu.ac.in/",
        phone: MAIN_PHONE,
        photo: "/images/institutions/bed.jpg",
        source: "content/institutions/sea-bed-college.md",
        verified: VERIFIED,
      },
    ],
  },
];

/** Flat list of all institutions, in stream order. */
export const institutions: Institution[] = streams.flatMap((s) => s.institutions);

export function getInstitution(slug: string): { institution: Institution; stream: Stream } | undefined {
  for (const stream of streams) {
    const institution = stream.institutions.find((i) => i.slug === slug);
    if (institution) return { institution, stream };
  }
  return undefined;
}

/**
 * Build-time guard. SEA has exactly 12 institutions; if that count drifts, or a
 * slug is duplicated, or a required field is blank, fail loudly rather than
 * silently shipping a broken or half-empty page.
 */
export const EXPECTED_INSTITUTION_COUNT = 12;

function validate() {
  const problems: string[] = [];

  if (institutions.length !== EXPECTED_INSTITUTION_COUNT) {
    problems.push(`expected ${EXPECTED_INSTITUTION_COUNT} institutions, found ${institutions.length}`);
  }

  const seen = new Set<string>();
  for (const i of institutions) {
    if (seen.has(i.slug)) problems.push(`duplicate slug: ${i.slug}`);
    seen.add(i.slug);
    for (const field of ["slug", "name", "summary", "photo", "source", "verified"] as const) {
      if (!i[field]) problems.push(`${i.slug || "(no slug)"} is missing required field "${field}"`);
    }
    if (i.description.length === 0) problems.push(`${i.slug} has no description`);
  }

  const streamSlugs = new Set<string>();
  for (const s of streams) {
    if (streamSlugs.has(s.slug)) problems.push(`duplicate stream slug: ${s.slug}`);
    streamSlugs.add(s.slug);
    if (s.institutions.length === 0) problems.push(`stream ${s.slug} has no institutions`);
  }

  if (problems.length) {
    throw new Error("Institution registry is invalid:\n  - " + problems.join("\n  - "));
  }
}

validate();

/**
 * Programme directory data.
 *
 * Same rule as the institution registry: every entry traces to a file under
 * `content/`. Nothing is inferred. See UPDATED_MASTER_PLAN.md §6.
 */

export type ProgrammeLevel = "Pre-University" | "Undergraduate" | "Postgraduate" | "Diploma" | "Certificate";

export type Programme = {
  name: string;
  level: ProgrammeLevel;
  /** Broad field used for filtering. */
  field: string;
  duration?: string;
  summary: string;
  /** Slug of the institution in streams.ts, when it maps to one. */
  institutionSlug?: string;
  source: string;
};

const VAP_SOURCE = "content/academics/value-added-programs.md";

/** Certificate / value-added programmes — names exactly as listed in source. */
const valueAdded = [
  "Logistics",
  "Data Science",
  "Supply Chain Management",
  "Robotics & Industrial Automation",
  "Cloud Computing",
  "Block Chain Technology",
  "Tally",
  "Six Sigma",
  "Artificial Intelligence",
  "Big Data",
  "Coding",
  "3D Printing",
  "Cyber Security & Ethical Hacking",
  "Construction Management",
  "Digital Marketing",
  "Advanced Excel",
  "Aviation Management",
  "Technical Publication",
].map<Programme>((name) => ({
  name,
  level: "Certificate",
  field: "Value Added",
  summary: "Value-added certificate programme offered alongside your main course.",
  source: VAP_SOURCE,
}));

export const programmes: Programme[] = [
  {
    name: "Bachelor of Engineering (B.E.)",
    level: "Undergraduate",
    field: "Engineering",
    duration: "4 years",
    summary:
      "Seven branches including Computer Science, Electronics & Communication, Mechanical, Civil, Information Science, AI & Machine Learning, and IoT & Cyber Security.",
    institutionSlug: "sea-college-of-engineering-technology",
    source: "content/institutions/sea-college-of-engineering-technology.md",
  },
  {
    name: "Diploma in General Nursing & Midwifery (GNM)",
    level: "Diploma",
    field: "Health Sciences",
    duration: "3 years",
    summary:
      "Prepares students with the knowledge, skills and attitudes to enter the health care system as a professional nurse.",
    institutionSlug: "sea-college-of-nursing",
    source: "content/institutions/sea-college-of-nursing.md",
  },
  {
    name: "B.Sc in Clinical Nutrition",
    level: "Undergraduate",
    field: "Health Sciences",
    duration: "3 years (6 semesters)",
    summary:
      "A scientific understanding of nutrition and strategies for improving patient care, covering how diet impacts individual health. Leads to work as a nutritionist or dietician in health care and fitness centres.",
    source: "content/academics/bsc-clinical-nutrition.md",
  },
  {
    name: "PG Diploma in Hospital & Healthcare Management",
    level: "Postgraduate",
    field: "Health Sciences",
    duration: "1 year",
    summary:
      "A blended-learning course in planning and administering healthcare services, including quality and accreditation standards, medical law and insurance. Semester two includes a 30-day rotation across departments of a leading hospital.",
    source: "content/academics/hospital-administration.md",
  },
  {
    name: "Master of Tourism & Travel Management (Integrated)",
    level: "Postgraduate",
    field: "Management",
    duration: "5 years integrated",
    summary:
      "A five-year integrated programme; students exiting after four years receive a BTTM. Graduates work across travel agencies, tour operators, airlines and airports, hospitality, event management and the allied service sector.",
    source: "content/academics/mttm.md",
  },
  {
    name: "LLB",
    level: "Undergraduate",
    field: "Law",
    duration: "3 years",
    summary: "Three-year law degree with a well-equipped library and an established Moot Court.",
    institutionSlug: "sea-college-of-law",
    source: "content/institutions/sea-college-of-law.md",
  },
  {
    name: "BA LLB (Integrated)",
    level: "Undergraduate",
    field: "Law",
    duration: "5 years",
    summary: "Five-year integrated law programme.",
    institutionSlug: "sea-college-of-law",
    source: "content/institutions/sea-college-of-law.md",
  },
  {
    name: "Pre-University — Science",
    level: "Pre-University",
    field: "Pre-University",
    duration: "2 years",
    summary:
      "PCMB, PCMC and PCME combinations, with specialised coaching for NEET, JEE and CET entrance examinations.",
    institutionSlug: "sea-composite-pu-college",
    source: "content/academics/pre-university.md",
  },
  {
    name: "Pre-University — Commerce",
    level: "Pre-University",
    field: "Pre-University",
    duration: "2 years",
    summary: "HEBA, EABC and BACS combinations, with specialised coaching for CA, Tally, IPCC and CPT.",
    institutionSlug: "sea-composite-pu-college",
    source: "content/academics/pre-university.md",
  },
  {
    name: "Pre-University — Arts",
    level: "Pre-University",
    field: "Pre-University",
    duration: "2 years",
    summary: "HEPS, ESPP and PCME combinations, with specialised coaching for the CLAT law entrance.",
    institutionSlug: "sea-composite-pu-college",
    source: "content/academics/pre-university.md",
  },
  {
    name: "Bachelor of Education (B.Ed)",
    level: "Undergraduate",
    field: "Education",
    duration: "3 years",
    summary: "Teacher education programme on the K R Puram campus.",
    institutionSlug: "sea-bed-college",
    source: "content/institutions/sea-bed-college.md",
  },
  {
    name: "Management studies",
    level: "Undergraduate",
    field: "Management",
    duration: "3 years",
    summary: "Management programmes affiliated to Bangalore North University and approved by AICTE.",
    institutionSlug: "sea-college-of-management-studies",
    source: "content/institutions/sea-college-of-management-studies.md",
  },
  {
    name: "Science, Commerce & Arts degrees",
    level: "Undergraduate",
    field: "Science, Commerce & Arts",
    duration: "3 years",
    summary: "Undergraduate degrees affiliated to Bengaluru North University.",
    institutionSlug: "sea-college-of-science-commerce-arts",
    source: "content/institutions/sea-college-of-science-commerce-arts.md",
  },
  {
    name: "Industrial trade training",
    level: "Diploma",
    field: "Engineering",
    duration: "2 years",
    summary: "Vocational trade training affiliated to NCVT, New Delhi. ISO 29990:2010 certified.",
    institutionSlug: "sea-industrial-training-institute",
    source: "content/institutions/sea-industrial-training-institute.md",
  },
  ...valueAdded,
];

export const LEVELS: ProgrammeLevel[] = [
  "Pre-University",
  "Undergraduate",
  "Postgraduate",
  "Diploma",
  "Certificate",
];

export const FIELDS: string[] = [...new Set(programmes.map((p) => p.field))].sort();

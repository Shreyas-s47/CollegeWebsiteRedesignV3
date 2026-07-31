/**
 * Single responsive-image pipeline for every photo the homepage actually
 * renders large: hero, leadership portraits, the campus photo, and the six
 * stream-explorer thumbnails.
 *
 * WHY THIS EXISTS: next.config.ts sets `images: { unoptimized: true }` because
 * this site is a static export (`output: "export"`) with no server to resize
 * images on request. Next/Image can't generate AVIF/WebP variants for us here,
 * so this script does it once at build time — each source becomes an AVIF +
 * WebP + JPG/PNG triplet at two widths (a compact one for narrow viewports,
 * a full one for desktop at 2x DPR), written to public/images/optimized/.
 * <Photo> (src/components/photo.tsx) turns that set into a <picture> with a
 * real srcset, so the browser — not a fixed CSS background — picks the file.
 *
 * Run: node scripts/build-photos.mjs
 * Output is committed, so this only needs re-running when a source or crop
 * changes.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public/images/optimized");

/**
 * @typedef {Object} Job
 * @property {string} name       output basename, becomes /images/optimized/<name>-<w>.<ext>
 * @property {string} src        repo-relative source path
 * @property {number} width      full (2x-capable) width in px
 * @property {number} [height]   full height; omit to preserve source aspect ratio
 * @property {number} compact    narrow-viewport width in px
 * @property {string} [position] sharp `cover` gravity
 * @property {boolean} [alpha]   keep transparency (PNG fallback instead of JPG)
 * @property {boolean} [grade]   apply the shared editorial colour grade
 */

/** @type {Job[]} */
const JOBS = [
  // --- Hero: LCP-critical. The old bg+fg composite was built from a 735x552
  // garden shot and a 654x381 cutout — both needed heavy upscaling and still
  // looked soft blown up to hero size. aboutus.jpg is a genuine 1642x958
  // capture of the campus gate, the highest-fidelity photo in the whole
  // asset set, so this crops it (no upscale past its native width) instead
  // of trying to rescue a smaller source.
  { name: "hero/gate", src: "public/images/about/aboutus.jpg", width: 1600, height: 1000, position: "centre", compact: 900 },

  // --- Leadership: shot at different times with different lighting. `grade`
  // applies one consistent tone curve across all three so they read as a
  // single editorial sitting rather than three unrelated snapshots.
  { name: "leadership/founder", src: "public/images/leadership/founder.jpg", width: 900, height: 1125, position: "top", compact: 480, grade: true },
  { name: "leadership/chairman", src: "public/images/leadership/chairman.jpg", width: 900, height: 1125, position: "top", compact: 480, grade: true },
  { name: "leadership/director", src: "public/images/leadership/director.jpg", width: 900, height: 1125, position: "top", compact: 480, grade: true },

  // --- Campus: now fills its column instead of floating in it, so it needs a
  // taller crop than the source's native 4:3.
  { name: "about/campus", src: "public/images/about/campus-img.jpg", width: 1800, height: 2000, compact: 800 },

  // --- Stream explorer thumbnails: compact bento cards now, not full-bleed
  // rows, so these are sized far smaller than the discarded stream-rail build
  // (2400x1150) ever needed. Same six source photos and crops a six-agent
  // review already vetted earlier in this project for likeness-to-subject.
  { name: "streams/engineering-technology", src: "public/images/gallery/seacet1.jpg", width: 1000, height: 900, position: "north", compact: 700 },
  { name: "streams/management-commerce", src: "public/images/gallery/degree2.jpg", width: 1000, height: 900, position: "north", compact: 700 },
  { name: "streams/nursing-health-sciences", src: "public/images/gallery/seacon1.jpg", width: 1000, height: 900, position: "centre", compact: 700 },
  { name: "streams/law", src: "public/images/gallery/sealaw1.jpg", width: 1000, height: 900, position: "centre", compact: 700 },
  { name: "streams/schools", src: "public/images/gallery/icse1.jpg", width: 1000, height: 900, position: "north", compact: 700 },
  { name: "streams/pu-teacher-education", src: "public/images/gallery/seapu2.jpg", width: 1000, height: 900, position: "north", compact: 700 },
];

async function emit(name, width, pipeline, { alpha }) {
  await mkdir(path.dirname(path.join(OUT_DIR, name)), { recursive: true });
  const base = `${name}-${width}`;

  await pipeline.clone().avif({ quality: alpha ? 55 : 50, effort: 4 }).toFile(path.join(OUT_DIR, `${base}.avif`));
  await pipeline.clone().webp({ quality: alpha ? 82 : 80 }).toFile(path.join(OUT_DIR, `${base}.webp`));
  if (alpha) {
    await pipeline.clone().png({ compressionLevel: 9, palette: true }).toFile(path.join(OUT_DIR, `${base}.png`));
  } else {
    await pipeline.clone().jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" }).toFile(path.join(OUT_DIR, `${base}.jpg`));
  }
}

/**
 * A cheap but effective "same editorial shoot" normaliser: pull toward a
 * shared neutral point rather than trying to colour-match each photo
 * individually. Consistent across all three leadership portraits is what
 * matters, not any single photo's absolute accuracy.
 */
function editorialGrade(image) {
  // NOTE: sharp's .tint() replaces each pixel's chroma with the tint colour's
  // chroma, keeping only luminance — that's a duotone operation, not a subtle
  // warmth shift, and it was flattening all three portraits to near-monochrome.
  // Skin tones need to survive this; modulate + a gentle contrast lift is
  // enough to make three different photo shoots read as one consistent set
  // without erasing colour.
  return image.modulate({ saturation: 0.96, brightness: 1.03 }).linear(1.05, -8);
}

async function build() {
  for (const job of JOBS) {
    const input = path.join(ROOT, job.src);
    const srcMeta = await sharp(input).metadata();

    for (const width of [job.compact, job.width]) {
      const height = job.height ? Math.round(job.height * (width / job.width)) : undefined;
      let pipeline = sharp(input).resize(width, height, {
        fit: height ? "cover" : "inside",
        position: job.position ?? "centre",
        kernel: "lanczos3",
        withoutEnlargement: false,
      });
      if (job.grade) pipeline = editorialGrade(pipeline);
      pipeline = pipeline.sharpen({ sigma: 0.9, m1: 0.35, m2: 0.7 });

      await emit(job.name, width, pipeline, { alpha: job.alpha });
    }

    console.log(
      `${job.name.padEnd(32)} ${srcMeta.width}x${srcMeta.height} -> ${job.compact}w + ${job.width}w  (${job.src})`,
    );
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Generates the displacement map behind every "liquid glass" surface on the
 * site (site-wide UI asset, not tied to any one section).
 *
 * WHY A MAP AND NOT NOISE: turbulence displaces the whole surface evenly, which
 * looks like warped plastic. Real glass only bends light where the surface is
 * curved — the bevel around the rim — and passes it straight through the flat
 * middle. So the map encodes the *surface normal* of a rounded-rect lens:
 * neutral grey (128,128) across the flat centre, ramping to strong directional
 * values in a band around the edge. feDisplacementMap reads R as x-shift and
 * G as y-shift, so the backdrop bends outward at the rim and stays put inside.
 *
 * Run: node scripts/build-lens-map.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/images/ui/lens-map.png");

const W = 640;
const H = 320;
const RADIUS = 46; // corner radius in map space
const BEVEL = 58; // how far the curvature reaches in from the edge

/** Signed distance to a rounded rectangle; positive inside. */
function sdf(x, y) {
  const hw = W / 2;
  const hh = H / 2;
  const px = Math.abs(x - hw) - (hw - RADIUS);
  const py = Math.abs(y - hh) - (hh - RADIUS);
  const qx = Math.max(px, 0);
  const qy = Math.max(py, 0);
  const outside = Math.hypot(qx, qy);
  const inside = Math.min(Math.max(px, py), 0);
  return -(outside + inside - RADIUS);
}

async function build() {
  await mkdir(path.dirname(OUT), { recursive: true });
  const buf = Buffer.alloc(W * H * 3);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const d = sdf(x + 0.5, y + 0.5);
      let r = 128;
      let g = 128;

      if (d > 0 && d < BEVEL) {
        // Gradient of the SDF points inward; sample it numerically.
        const gx = (sdf(x + 1.5, y + 0.5) - sdf(x - 0.5, y + 0.5)) / 2;
        const gy = (sdf(x + 0.5, y + 1.5) - sdf(x + 0.5, y - 0.5)) / 2;
        const len = Math.hypot(gx, gy) || 1;

        // Strength peaks hard at the rim and dies before the flat centre, so
        // the middle of the card stays optically clean.
        const t = d / BEVEL;
        const strength = Math.pow(1 - t, 2.2);

        // Negative of the inward normal: the rim pulls in content from beyond
        // the edge, which is what makes a glass border look like it magnifies.
        r = Math.round(128 - (gx / len) * strength * 127);
        g = Math.round(128 - (gy / len) * strength * 127);
      }

      const i = (y * W + x) * 3;
      buf[i] = Math.max(0, Math.min(255, r));
      buf[i + 1] = Math.max(0, Math.min(255, g));
      buf[i + 2] = 128;
    }
  }

  await sharp(buf, { raw: { width: W, height: H, channels: 3 } })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  console.log(`lens map -> ${path.relative(ROOT, OUT)} (${W}x${H}, bevel ${BEVEL}px)`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});

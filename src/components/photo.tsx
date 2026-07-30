import type { CSSProperties } from "react";

/**
 * Renders one image emitted by scripts/build-photos.mjs as a real <picture>:
 * AVIF and WebP sources with explicit srcset, a JPG/PNG fallback, and native
 * lazy loading. This site is a static export (next.config.ts sets
 * `images.unoptimized`), so next/image cannot generate these variants itself —
 * this component is the client-side half of that pipeline.
 *
 * `compact`/`full` must match the widths that name was built at — see the
 * JOBS manifest in scripts/build-photos.mjs. Kept as explicit props rather
 * than inferred so a mismatch 404s loudly in dev instead of silently serving
 * the wrong crop.
 */
export function Photo({
  name,
  compact,
  full,
  alt,
  className,
  style,
  sizes = "100vw",
  priority = false,
  alpha = false,
}: {
  name: string;
  compact: number;
  full: number;
  alt: string;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
  alpha?: boolean;
}) {
  const base = `/images/optimized/${name}`;
  const fallbackExt = alpha ? "png" : "jpg";

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${base}-${compact}.avif ${compact}w, ${base}-${full}.avif ${full}w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${base}-${compact}.webp ${compact}w, ${base}-${full}.webp ${full}w`}
        sizes={sizes}
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- static export has no image server to hand this to next/image */}
      <img
        src={`${base}-${full}.${fallbackExt}`}
        srcSet={`${base}-${compact}.${fallbackExt} ${compact}w, ${base}-${full}.${fallbackExt} ${full}w`}
        sizes={sizes}
        alt={alt}
        className={className}
        style={style}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { useDialogBehaviour } from "@/lib/use-dialog-behaviour";

const EASE = [0.16, 1, 0.3, 1] as const;

type GalleryImage = { src: string; alt: string; className: string };

export function LightboxGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => setActive((i) => (i === null ? i : (i + 1) % images.length)), [images.length]);
  const prev = useCallback(() => setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length)), [images.length]);

  useDialogBehaviour({
    open: active !== null,
    containerRef: dialogRef,
    onClose: close,
    onNext: next,
    onPrev: prev,
  });

  const current = active === null ? null : images[active];

  return (
    <>
      <section className="gallery-grid">
        {images.map((img, i) => (
          <motion.figure
            key={img.src}
            className={img.className}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: EASE }}
          >
            {/* A real button so keyboard and screen-reader users can open the lightbox. */}
            <button type="button" className="gallery-trigger" onClick={() => setActive(i)}>
              <img src={img.src} alt={img.alt} loading="lazy" width={1200} height={800} />
              <span className="gallery-caption">
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                {img.alt}
                <span className="sr-only"> — open larger view</span>
                <b aria-hidden="true">↗</b>
              </span>
            </button>
          </motion.figure>
        ))}
      </section>

      <AnimatePresence>
        {current && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              ref={dialogRef}
              className="lightbox-dialog"
              role="dialog"
              aria-modal="true"
              aria-label={`Image ${(active ?? 0) + 1} of ${images.length}: ${current.alt}`}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <button type="button" className="lightbox-close" onClick={close}>
                Close <span aria-hidden="true">✕</span>
              </button>

              <button type="button" className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Previous image">
                <span aria-hidden="true">←</span>
              </button>

              <img className="lightbox-image" src={current.src} alt={current.alt} />

              <button type="button" className="lightbox-nav lightbox-next" onClick={next} aria-label="Next image">
                <span aria-hidden="true">→</span>
              </button>

              <p className="lightbox-caption" role="status">
                {current.alt}
                <span className="lightbox-count"> · {(active ?? 0) + 1} of {images.length}</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Shared modal behaviour: Escape to close, Tab trapped inside the dialog,
 * background scroll locked, and focus returned to whatever opened it.
 *
 * Used by both the mobile menu and the gallery lightbox so the two cannot
 * drift apart.
 */
export function useDialogBehaviour({
  open,
  containerRef,
  onClose,
  onNext,
  onPrev,
}: {
  open: boolean;
  containerRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const opener = document.activeElement as HTMLElement | null;

    // Lock background scroll without causing a layout jump.
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    // Move focus into the dialog.
    const focusFirst = () => {
      const node = containerRef.current;
      if (!node) return;
      const target = node.querySelector<HTMLElement>(FOCUSABLE) ?? node;
      target.focus();
    };
    const raf = requestAnimationFrame(focusFirst);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowRight" && onNext) {
        e.preventDefault();
        onNext();
        return;
      }
      if (e.key === "ArrowLeft" && onPrev) {
        e.preventDefault();
        onPrev();
        return;
      }
      if (e.key !== "Tab") return;

      const node = containerRef.current;
      if (!node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (active === first || !node.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      opener?.focus?.();
    };
  }, [open, containerRef, onClose, onNext, onPrev]);
}

"use client";

import { useState, type FormEvent } from "react";

const ADMISSIONS_EMAIL = "seaeduinfo@seaedu.ac.in";

/**
 * Optional hosted form endpoint (Formspree, Basin, Netlify Forms, an SEA API…).
 *
 * Static export cannot receive a POST itself, so until this is set the form
 * falls back to composing the enquiry in the visitor's own mail client — which
 * genuinely sends, unlike the fake success message this replaced.
 *
 * To switch to a real backend: set NEXT_PUBLIC_FORM_ENDPOINT at build time.
 * No other change is needed here. Server-side validation, spam protection and
 * a retention/consent policy are the provider's responsibility — confirm all
 * three before going live (UPDATED_MASTER_PLAN.md §2, P0-3).
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

type Status = "idle" | "opened" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    if (FORM_ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
      }
      return;
    }

    const subject = `Website enquiry: ${get("subject") || "General"}`;
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone") || "—"}`,
      "",
      get("message"),
    ].join("\n");

    window.location.href =
      `mailto:${ADMISSIONS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("opened");
  }

  const statusMessage =
    status === "sending" ? "Sending…"
    : status === "sent" ? "Thank you — your enquiry has been received. The admissions team will reply by email."
    : status === "error" ? `That didn't go through. Please email ${ADMISSIONS_EMAIL} or call +91 63664 53030.`
    : status === "opened" ? `Your email app should have opened with this message ready to send. If nothing happened, email us directly at ${ADMISSIONS_EMAIL}.`
    : "";

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <p className="form-intro">
        {FORM_ENDPOINT
          ? "Send your enquiry straight to the admissions office. Prefer another way? Email "
          : "This form opens a pre-filled message in your email app so you can send it directly to the admissions office. Prefer to skip it? Email "}
        <a href={`mailto:${ADMISSIONS_EMAIL}`}>{ADMISSIONS_EMAIL}</a> or call{" "}
        <a href="tel:+916366453030">+91 63664 53030</a>.
      </p>
      <div><label htmlFor="name">Name</label><input id="name" name="name" required placeholder="Your full name" autoComplete="name" /></div>
      <div><label htmlFor="email">Email</label><input id="email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" /></div>
      <div><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" pattern="[0-9+\-\s]{7,15}" placeholder="+91 00000 00000" autoComplete="tel" /></div>
      <div><label htmlFor="subject">Subject</label><input id="subject" name="subject" required placeholder="What's this about?" /></div>
      <div><label htmlFor="message">Message</label><textarea id="message" name="message" rows={4} required placeholder="Tell us more" /></div>
      <button type="submit" className="primary-cta" disabled={status === "sending"}>
        {FORM_ENDPOINT ? "Send message" : "Compose email"} <span aria-hidden="true">↗</span>
      </button>
      <p className="form-status" role="status">{statusMessage}</p>
    </form>
  );
}

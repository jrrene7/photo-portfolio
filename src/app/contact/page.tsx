"use client";

import React, { useState } from "react";
import CalendlyPopupButton from "../components/CalendlyPopupButton";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const sessionTypes = [
  "Portrait",
  "Couples",
  "Editorial",
  "Travel",
  "Corporate Headshots",
  "Brand / Retainer",
  "Event",
  "Other",
];

const goodToKnow = [
  "Based in NYC — shooting worldwide.",
  "Fully edited galleries within 1–2 weeks.",
  "Reschedule free up to 24 hours before your session.",
];

const inputClasses =
  "w-full border-b border-ink/20 bg-transparent py-3 text-base text-ink outline-none transition-colors duration-300 placeholder:text-ink/30 focus:border-ink";

export default function ContactPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const [form, setForm] = useState({
    name: "",
    email: "",
    sessionType: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      setStatus("done");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl grow px-5 pb-24 pt-36 sm:px-8 sm:pb-32">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">
          Contact & booking
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Let&apos;s talk about <span className="italic">it.</span>
        </h1>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          {/* ---------- Form ---------- */}
          <Reveal>
            {status === "done" ? (
              <div className="flex min-h-[320px] flex-col justify-center border-t border-ink/10 pt-8">
                <p className="font-display text-3xl text-ink">Message sent.</p>
                <p className="mt-3 max-w-sm text-sm leading-7 text-muted">
                  Check your inbox for a confirmation. I&apos;ll be in touch
                  within 1–2 business days.
                </p>
                <button
                  onClick={() => {
                    setForm({
                      name: "",
                      email: "",
                      sessionType: "",
                      message: "",
                      website: "",
                    });
                    setStatus("idle");
                  }}
                  className="link-underline is-active mt-6 self-start text-[13px] uppercase tracking-[0.18em] text-ink"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 border-t border-ink/10 pt-10"
              >
                {/* Honeypot — hidden from humans, bots fill it in */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted">
                      Name
                    </span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your name"
                      required
                      className={inputClasses}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted">
                      Email
                    </span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      required
                      className={inputClasses}
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">
                    Session type
                  </span>
                  <select
                    value={form.sessionType}
                    onChange={(e) => update("sessionType", e.target.value)}
                    className={`${inputClasses} cursor-pointer appearance-none`}
                  >
                    <option value="">Select a session type</option>
                    {sessionTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">
                    Message
                  </span>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell me about your shoot — timing, location, vibe, anything relevant."
                    required
                    rows={4}
                    className={`${inputClasses} resize-none`}
                  />
                </label>

                {status === "error" && (
                  <p className="text-sm text-red-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="self-start rounded-full bg-ink px-8 py-3.5 text-[13px] uppercase tracking-[0.18em] text-paper transition-all duration-300 hover:-translate-y-px hover:shadow-lg hover:shadow-ink/20 disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </Reveal>

          {/* ---------- Book directly ---------- */}
          <Reveal delay={150}>
            <div className="flex flex-col gap-10 border-t border-ink/10 pt-10">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-muted">
                  Know what you want?
                </p>
                <p className="mt-4 font-display text-2xl leading-snug text-ink">
                  Skip the form and pick a time that fits to discuss your idea.
                </p>
                <CalendlyPopupButton
                  url={calendlyUrl}
                  label="Open the scheduler"
                  className="mt-6 rounded-full border border-ink px-7 py-3.5 text-[13px] uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:bg-ink hover:text-paper"
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-muted">
                  Or reach out directly
                </p>
                <div className="mt-4 flex flex-col items-start gap-2">
                  <a
                    href="mailto:j-r@renevision.net"
                    className="link-underline text-sm text-ink"
                  >
                    j-r@renevision.net
                  </a>
                  <a
                    href="https://instagram.com/rene.vision"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm text-ink"
                  >
                    @rene.vision on Instagram
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

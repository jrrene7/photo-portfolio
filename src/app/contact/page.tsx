"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const sessionTypes = [
  "Portrait",
  "Couples",
  "Editorial",
  "Corporate Headshots",
  "Brand / Retainer",
  "Event",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", sessionType: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

      setStatus("done");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="flex min-h-screen flex-col bg-[url('/photo-portfolio-bg.jpg')] bg-center bg-cover bg-fixed">
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-black/75 via-black/65 to-black/80">
        <SiteHeader />

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-5 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
          <section className="grid gap-10 rounded-[2rem] border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur lg:grid-cols-[1fr_1.2fr] lg:p-8">

            {/* Left — intro */}
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-stone-300">Contact</p>
                <h1 className="font-display text-4xl text-white sm:text-5xl">
                  Let's talk about your shoot.
                </h1>
                <p className="text-base leading-7 text-stone-200">
                  Fill out the form and I'll get back to you within 1–2 business days.
                  If you already know what you want, you can book directly.
                </p>
              </div>

              <div className="space-y-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-stone-300">Or reach out directly</p>
                <a
                  href="mailto:renevision.media@gmail.com"
                  className="block text-sm text-stone-200 transition hover:text-white"
                >
                  renevision.media@gmail.com
                </a>
                <a
                  href="https://instagram.com/rene.vision"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-stone-200 transition hover:text-white"
                >
                  @rene.vision on Instagram
                </a>
              </div>

              <Link
                href="/book"
                className="rounded-full border border-white/35 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
              >
                Skip to booking
              </Link>
            </div>

            {/* Right — form */}
            <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-6">
              {status === "done" ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <p className="font-display text-2xl text-white">Message sent.</p>
                  <p className="text-sm leading-6 text-stone-300">
                    Check your inbox for a confirmation. I'll be in touch within 1–2 business days.
                  </p>
                  <button
                    onClick={() => { setForm({ name: "", email: "", sessionType: "", message: "" }); setStatus("idle"); }}
                    className="mt-2 rounded-full border border-white/25 px-5 py-2 text-sm text-white transition hover:border-white hover:bg-white/10"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="text-xs uppercase tracking-[0.2em] text-stone-300">Name</span>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Your name"
                        required
                        className="rounded-full border border-white/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-xs uppercase tracking-[0.2em] text-stone-300">Email</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="rounded-full border border-white/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-stone-300">Session type</span>
                    <select
                      value={form.sessionType}
                      onChange={(e) => update("sessionType", e.target.value)}
                      className="rounded-full border border-white/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
                    >
                      <option value="">Select a session type</option>
                      {sessionTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-stone-300">Message</span>
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell me about your shoot — timing, location, vibe, anything relevant."
                      required
                      rows={5}
                      className="resize-none rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
                    />
                  </label>

                  {status === "error" && (
                    <p className="text-sm text-red-400">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:-translate-y-[1px] hover:shadow-xl disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

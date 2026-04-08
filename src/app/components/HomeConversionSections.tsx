"use client";

import React, { useState } from "react";
import CalendlyPopupButton from "./CalendlyPopupButton";


const packages = [
  {
    name: "Starter",
    price: "$250",
    badge: "Introductory",
    tagline: "A focused session for when you know what you want — one strong look, sharp and done.",
    calendlyUrl:
      "https://calendly.com/renevision-media/15-minute-meeting-clone-clone",
    details: [
      "Up to one hour, in-studio or on location",
      "5 professionally retouched high-res images",
      "Private photo gallery",
    ],
  },
  {
    name: "Signature",
    price: "$450",
    badge: "Most Popular",
    featured: true,
    tagline: "Room to explore. Enough time to find the frame that actually feels like you.",
    calendlyUrl:
      "https://calendly.com/renevision-media/30-minute-meeting-clone",
    details: [
      "Two hours tailored to your vision",
      "10 carefully retouched high-res images",
      "Pre-session consultation included",
    ],
  },
  {
    name: "Travel",
    price: "Custom",
    badge: "Worldwide",
    tagline: "Anywhere you need me.",
    calendlyUrl: "https://calendly.com/renevision-media/30min",
    details: [
      "On-location shoots anywhere in the world",
      "Destination portraits, editorial travel stories, and brand campaigns",
      "Full-day or multi-day coverage available",
      "Custom quote based on destination and scope",
    ],
  },
  {
    name: "Brand Retainer",
    price: "$900/mo",
    badge: "Ongoing Content",
    tagline: "For people who show up consistently. Content that builds a visual identity over time.",
    calendlyUrl: "https://calendly.com/renevision-media/30min",
    details: [
      "Monthly session with flexible scheduling",
      "25 professionally edited images per month",
      "Priority booking and creative planning",
    ],
  },
  {
    name: "Corporate Headshots",
    price: "$600",
    badge: "Teams",
    tagline: "Sharp, modern, and consistent across the whole team — on your turf.",
    calendlyUrl: "https://calendly.com/renevision-media/30min",
    details: [
      "On-site session up to 1.5 hours, teams up to 10",
      "Portable studio lighting and backdrop included",
      "Individually retouched high-res headshots",
    ],
  },
  {
    name: "Events",
    price: "$800+",
    badge: "Event Coverage",
    tagline: "The moments that disappear the fastest are the ones worth keeping.",
    calendlyUrl: "https://calendly.com/renevision-media/30min",
    details: [
      "Up to three hours of event coverage",
      "50+ expertly edited photos",
      "Pre-event consultation and shot list",
      "Custom packages for longer events",
    ],
  },
];

export default function HomeConversionSections() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("Add your email address first.");
      return;
    }

    setStatus("Sending…");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("Done! Check your inbox — the guide is on its way.");
      setEmail("");
    } catch {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-12">
      {/* Packages */}
      <section className="w-full rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur sm:p-8">
        <div className="mb-8 flex flex-col gap-2 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-stone-400">
            Packages
          </p>
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            Find what fits your inspiration.
          </h2>
          <p className="mx-auto max-w-xl text-base leading-7 text-stone-400">
            From a single session to ongoing brand content — or anywhere in the world.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((pack) => (
            <article
              key={pack.name}
              className={`flex h-full flex-col rounded-[1.75rem] border p-6 transition ${
                pack.featured
                  ? "border-white/30 bg-white/[0.08] shadow-[0_24px_60px_rgba(255,255,255,0.07)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="space-y-3">
                <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-stone-300">
                  {pack.badge}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-white">{pack.name}</h3>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {pack.price}
                  </p>
                </div>
                {pack.tagline && (
                  <p className="text-sm leading-6 text-stone-400">{pack.tagline}</p>
                )}
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-white/10 pt-5">
                {pack.details.map((detail) => (
                  <li key={detail} className="flex gap-2 text-sm leading-6 text-stone-300">
                    <span className="mt-1 shrink-0 text-white/30">—</span>
                    {detail}
                  </li>
                ))}
              </ul>

              <CalendlyPopupButton
                url={pack.calendlyUrl ?? calendlyUrl}
                label="Start inquiry"
                className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] transition ${
                  pack.featured
                    ? "bg-white text-black hover:-translate-y-[1px] hover:shadow-xl"
                    : "border border-white/25 text-white hover:border-white hover:bg-white/10"
                }`}
              />
            </article>
          ))}
        </div>
      </section>

      {/* Session prep guide */}
      <section className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-2xl backdrop-blur sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-400">
              Free resource
            </p>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Show up ready for your session.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-stone-300">
              Drop your email and I'll send over the prep guide — outfit ideas,
              timing advice, and practical ways to make the most of your shoot.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-400">
                Your email
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-full border border-white/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:-translate-y-[1px] hover:shadow-xl"
            >
              Get the guide
            </button>

            <p className="text-xs leading-6 text-stone-500">
              No spam. You'll hear back within 24 hours.
            </p>

            {status && <p className="text-sm text-white">{status}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
"use client";

import { FormEvent, useState } from "react";
import CalendlyPopupButton from "./CalendlyPopupButton";

const testimonials = [
  {
    quote:
      "Jean-Robert captured our engagement with style and calm direction. We felt taken care of from the first message to the final gallery.",
    author: "Sarah L.",
    context: "Engagement session",
  },
  {
    quote:
      "The headshots looked sharp, modern, and consistent across the whole team. The process was smooth enough that we booked again.",
    author: "ACME Studio",
    context: "Corporate portraits",
  },
  {
    quote:
      "The session felt relaxed, personal, and intentional. The final edits looked elevated without losing who we are.",
    author: "Michael & Laura",
    context: "Couples session",
  },
];

const packages = [
  {
    name: "Starter",
    price: "$250",
    badge: "Entry point",
    calendlyUrl:
      "https://calendly.com/renevision-media/15-minute-meeting-clone-clone",
    details: [
      "1-hour session",
      "5 edited photos",
      "Online gallery delivery",
      "Ideal for professional headshots/portraits and social media profile refreshes",
    ],
  },
  {
    name: "Signature",
    price: "$450",
    badge: "Most booked",
    featured: true,
    calendlyUrl:
      "https://calendly.com/renevision-media/30-minute-meeting-clone",
    details: [
      "2-hour session",
      "10 edited photos",
      "Creative planning call",
      "Best for couples, editorials, and personal brands",
    ],
  },
  {
    name: "Brand Retainer",
    price: "$900/mo",
    badge: "Recurring Services",
    calendlyUrl: "https://calendly.com/renevision-media/30min",
    details: [
      "Monthly content session",
      "25 edited images each month",
      "Priority scheduling",
      "Built for founders, creators, and local businesses",
    ],
  },
];

export default function HomeConversionSections() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("Add your email address first.");
      return;
    }

    const mailtoHref =
      "mailto:renevision.media@gmail.com?subject=" +
      encodeURIComponent("Send me the session prep guide") +
      "&body=" +
      encodeURIComponent(
        `Please send the photo-session prep guide to ${email.trim()}.`
      );

    window.location.href = mailtoHref;
    setStatus("Your email app should open with the guide request.");
  };

  return (
    <div className="flex w-full flex-col gap-12">
      <section className="w-full rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur sm:p-8">
        <div className="mb-8 flex flex-col gap-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-stone-300">
            Social Proof
          </p>
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            Clients remember the experience as much as the images.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.author}
              className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="space-y-4">
                <span className="font-display text-5xl leading-none text-white/25">
                  &ldquo;
                </span>
                <p className="text-base leading-7 text-stone-100">{item.quote}</p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-display text-lg text-white">{item.author}</p>
                <p className="text-sm uppercase tracking-[0.2em] text-stone-400">
                  {item.context}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur sm:p-8">
        <div className="mb-8 flex flex-col gap-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-stone-300">
            Packages
          </p>
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            Clear offers make booking easier.
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-stone-300">
            Structured pricing keeps inquiries focused and helps clients see the
            difference between a one-off session and a repeat-content investment.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((pack) => (
            <article
              key={pack.name}
              className={`flex h-full flex-col rounded-[1.75rem] border p-6 ${
                pack.featured
                  ? "border-white/30 bg-white/[0.08] shadow-[0_24px_60px_rgba(255,255,255,0.08)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.28em] text-stone-300">
                  {pack.badge}
                </p>
                <div>
                  <h3 className="font-display text-2xl text-white">{pack.name}</h3>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {pack.price}
                  </p>
                </div>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {pack.details.map((detail) => (
                  <li key={detail} className="text-sm leading-6 text-stone-200">
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

      <section className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 shadow-2xl backdrop-blur sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-300">
              Lead Magnet
            </p>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Free guide: how to show up ready for your session.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-stone-200">
              Request the prep guide for outfit ideas, timing advice, and practical
              ways to make the most of your shoot. This keeps the call-to-action
              active now, even before a full email platform is connected.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-300">
                Email address
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-full border border-white/15 bg-white px-4 py-3 text-black outline-none transition focus:border-black"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:-translate-y-[1px] hover:shadow-xl"
            >
              Get the guide
            </button>

            <p className="text-sm leading-6 text-stone-300">
              We respect your inbox. For now, the request opens a direct email so
              the guide can be sent personally.
            </p>

            {status && <p className="text-sm text-white">{status}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}

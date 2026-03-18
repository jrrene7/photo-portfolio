import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CalendlyPopupButton from "../components/CalendlyPopupButton";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jean-Robert is a portrait and editorial photographer based in New York City, creating sharp, intentional visual stories for individuals, couples, and brands.",
  openGraph: {
    title: "About | René Vision",
    description:
      "Jean-Robert is a portrait and editorial photographer based in New York City, creating sharp, intentional visual stories for individuals, couples, and brands.",
    url: "https://renevision.net/about",
  },
};

export default function AboutPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <div className="flex min-h-screen flex-col bg-[url('/photo-portfolio-bg.jpg')] bg-center bg-cover bg-fixed">
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-black/75 via-black/65 to-black/80">
        <SiteHeader />

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-5 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
          {/* Hero */}
          <section className="rounded-[2rem] border border-white/10 bg-black/30 shadow-2xl backdrop-blur">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-stretch">
              <div className="flex flex-col gap-8 p-6 sm:p-8 lg:py-12">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-300">
                    About
                  </p>
                  <h1 className="font-display text-4xl text-white sm:text-5xl lg:text-6xl">
                    The version of you worth keeping.
                  </h1>
                  <p className="max-w-xl text-base leading-7 text-stone-200">
                    I'm Jean-Robert, a portrait, editorial, and special events
                    photographer based in New York City. I shoot with honesty
                    and intention — no performative poses, no awkward direction.
                    Just light, composition, and you on a genuinely good day.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <CalendlyPopupButton
                    url={calendlyUrl}
                    label="Book a session"
                    className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:-translate-y-[1px] hover:shadow-xl"
                  />
                  <Link
                    href="/"
                    className="rounded-full border border-white/35 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
                  >
                    View portfolio
                  </Link>
                </div>
              </div>

              {/* Portrait — desktop only */}
              <div className="relative hidden w-[280px] overflow-hidden rounded-r-[2rem] lg:block">
                <Image
                  src="/my-portrait.png"
                  alt="Jean-Robert — René Vision"
                  fill
                  sizes="280px"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </section>

          {/* Approach (portrait bg) + Stats */}
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-black/25 shadow-2xl backdrop-blur">
              <div className="flex h-full flex-col space-y-4 p-6 sm:p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-stone-300">
                  Approach
                </p>
                <h2 className="font-display text-2xl text-white sm:text-3xl">
                  Every session starts before the camera comes out.
                </h2>
                <div className="space-y-4 text-base leading-7 text-stone-200">
                  <p>
                    Most people feel awkward in front of a lens. That's not a
                    client problem — it's a photographer problem. I spend the
                    first part of every session just talking: about the vibe
                    you're after, what you're excited about, what you're
                    dreading.
                  </p>
                  <p>
                    By the time we start shooting, you've forgotten I'm behind
                    the camera. What's left is you — on a good day, in good
                    light, with someone who actually gives a damn about the
                    difference.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row lg:flex-col">
              {[
                { stat: "7+", label: "Years behind the lens" },
                { stat: "125+", label: "Sessions delivered" },
                { stat: "1-2 wks", label: "Typical turnaround" },
              ].map(({ stat, label }) => (
                <div
                  key={label}
                  className="flex flex-1 flex-col justify-center rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur"
                >
                  <p className="font-display text-4xl text-white">{stat}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.24em] text-stone-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* What to expect */}
          <section className="rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur sm:p-8">
            <div className="mb-8 space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-stone-300">
                What to expect
              </p>
              <h2 className="font-display text-2xl text-white sm:text-3xl">
                No guesswork. Just a clear process.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "We align before anything",
                  body: "Before your session I'll share a prep guide and we'll sync on concept, different looks, and location so nothing is left to chance.",
                },
                {
                  step: "02",
                  title: "The session moves at your pace",
                  body: "I direct when direction helps and step back when you're in a flow. The goal is be natural, no feelings of uncertainty.",
                },
                {
                  step: "03",
                  title: "Your gallery arrives edited",
                  body: "Fully retouched, high-resolution images delivered to you within 1-2 weeks.",
                },
              ].map(({ step, title, body }) => (
                <div
                  key={step}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"
                >
                  <p className="font-display text-4xl leading-none text-white/20">
                    {step}
                  </p>
                  <h3 className="mt-3 font-display text-lg text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-300">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
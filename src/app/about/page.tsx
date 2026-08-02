import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CalendlyPopupButton from "../components/CalendlyPopupButton";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jean-Robert is a portrait and editorial photographer based in New York City, creating sharp, intentional visual stories for individuals, couples, and brands.",
  alternates: { canonical: "https://renevision.net/about" },
  openGraph: {
    title: "About | René Vision",
    description:
      "Jean-Robert is a portrait and editorial photographer based in New York City, creating sharp, intentional visual stories for individuals, couples, and brands.",
    url: "https://renevision.net/about",
  },
};

const stats = [
  { stat: "7+", label: "Years behind the lens" },
  { stat: "125+", label: "Sessions delivered" },
  { stat: "1–2 wks", label: "Typical turnaround" },
];

const steps = [
  {
    step: "01",
    title: "We align before anything",
    body: "Before your session I'll share a prep guide and we'll sync on concept, looks, and location so nothing is left to chance.",
  },
  {
    step: "02",
    title: "The session moves at your pace",
    body: "I direct when direction helps and step back when you're in a flow. The goal is natural — no uncertainty.",
  },
  {
    step: "03",
    title: "Your gallery arrives edited",
    body: "Fully retouched, high-resolution images delivered within 1–2 weeks.",
  },
];

export default function AboutPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="grow">
        {/* ---------- Intro ---------- */}
        <section className="mx-auto w-full max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pb-28">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-muted">
                About
              </p>
              <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                I am here for <span className="italic">your service.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-muted">
                I&apos;m J-R, a portrait, events,travel, and editorial
                photographer based in New York City, servicing a community in a
                city near you. <br />I work with honesty and intention —
                genuinely wanting the best for you. Just light, composition, and
                you on any given day.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <CalendlyPopupButton
                  url={calendlyUrl}
                  label="Book a session"
                  className="rounded-full bg-ink px-7 py-3.5 text-[13px] uppercase tracking-[0.18em] text-paper transition-all duration-300 hover:-translate-y-px hover:shadow-lg hover:shadow-ink/20"
                />
                <Link
                  href="/#work"
                  className="link-underline text-[13px] uppercase tracking-[0.18em] text-ink"
                >
                  View the work
                </Link>
              </div>
            </div>

            <Reveal
              delay={150}
              className="relative mx-auto w-full max-w-sm lg:max-w-none"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src="/my-portrait-transparent.png"
                  alt="Jean-Robert — René Vision"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-contain"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

"use client";

import Link from "next/link";
import Reveal from "./Reveal";

const services = [
  {
    name: "Portraits",
    blurb: "Individuals and couples — one strong look or a full creative session.",
  },
  {
    name: "Events",
    blurb: "The moments that disappear the fastest are the ones worth keeping.",
  },
  {
    name: "Brands & Editorial",
    blurb: "Campaigns, content, and headshots that build a visual identity.",
  },
  {
    name: "Travel",
    blurb: "On location, anywhere in the world.",
  },
];

export default function HomeConversionSections() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
      <Reveal>
        <div className="border-t border-ink/10 pt-8">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            What I shoot
          </h2>
        </div>
      </Reveal>

      <div className="mt-10">
        {services.map((service, i) => (
          <Reveal key={service.name} delay={i * 60}>
            <Link
              href="/contact"
              className="group flex flex-col gap-2 border-b border-ink/10 py-7 transition-colors duration-300 hover:bg-ink/[0.02] sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
            >
              <span className="font-display text-2xl text-ink transition-transform duration-500 ease-editorial group-hover:translate-x-2 sm:text-3xl">
                {service.name}
              </span>
              <span className="flex items-center gap-4 text-sm leading-6 text-muted sm:max-w-md sm:text-right">
                {service.blurb}
                <span
                  aria-hidden
                  className="hidden shrink-0 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:inline"
                >
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={100}>
        <p className="mt-8 text-sm text-muted">
          Every project is scoped individually —{" "}
          <Link href="/contact" className="link-underline is-active text-ink">
            tell me what you have in mind
          </Link>
          .
        </p>
      </Reveal>

      {/*
        ------------------------------------------------------------------
        PACKAGES — temporarily disabled (kept for easy re-enable).
        To bring pricing back, restore the `packages` array and the grid
        below, and re-import CalendlyPopupButton from "./CalendlyPopupButton".
        ------------------------------------------------------------------

        const packages = [
          {
            name: "Starter",
            price: "$250",
            badge: "Introductory",
            tagline: "A focused session for when you know what you want — one strong look, sharp and done.",
            calendlyUrl: "https://calendly.com/renevision-media/15-minute-meeting-clone-clone",
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
            calendlyUrl: "https://calendly.com/renevision-media/30-minute-meeting-clone",
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

        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((pack) => (
            <article key={pack.name} className={pack.featured ? "featured" : ""}>
              <span>{pack.badge}</span>
              <h3>{pack.name}</h3>
              <p>{pack.price}</p>
              <p>{pack.tagline}</p>
              <ul>
                {pack.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <CalendlyPopupButton url={pack.calendlyUrl} label="Start inquiry" />
            </article>
          ))}
        </div>
      */}
    </section>
  );
}

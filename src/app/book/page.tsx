import type { Metadata } from "next";
import Link from "next/link";
import CalendlyEmbed from "../components/CalendlyEmbed";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Book | René Vision",
  description: "Book a photography session with René Vision.",
};

export default function BookPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <div className="flex min-h-screen flex-col bg-[url('/photo-portfolio-bg.jpg')] bg-center bg-cover">
      <div className="min-h-screen bg-gradient-to-b from-black/75 via-black/65 to-black/80">
        <SiteHeader />

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-5 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
          <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-stone-300">
                  Booking
                </p>
                <h1 className="font-display text-4xl text-white sm:text-5xl">
                  Reserve your shoot in one place.
                </h1>
                <p className="max-w-xl text-base leading-7 text-stone-200">
                  Use the Calendly embed to pick a time, confirm your details,
                  and move your project forward. If you would rather discuss the
                  brief first, send an email instead.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
                <Link
                  href="mailto:hello@renevizion.com"
                  className="rounded-full border border-white/35 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
                >
                  Email instead
                </Link>
                <Link
                  href="/"
                  className="rounded-full px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-stone-200 transition hover:text-white"
                >
                  Back to portfolio
                </Link>
              </div>
            </div>

            <CalendlyEmbed url={calendlyUrl} />
          </section>
        </main>
      </div>
    </div>
  );
}

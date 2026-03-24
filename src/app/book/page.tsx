import type { Metadata } from "next";
import Link from "next/link";
import CalendlyPopupButton from "../components/CalendlyPopupButton";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Book a portrait, editorial, headshot, or brand photography session in New York City. Simple scheduling, clear packages, and a process built around you.",
  openGraph: {
    title: "Book a Session | René Vision",
    description:
      "Book a portrait, editorial, headshot, or brand photography session in New York City.",
    url: "https://renevision.net/book",
  },
};

export default function BookPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <div className="flex min-h-screen flex-col bg-[url('/photo-portfolio-bg.jpg')] bg-center bg-cover bg-fixed">
      <div className="min-h-screen bg-gradient-to-b from-black/75 via-black/65 to-black/80">
        <SiteHeader />

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-5 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
          <section className="grid gap-10 rounded-[2rem] border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-stone-300">
                  Book a session
                </p>
                <h1 className="font-display text-4xl text-white sm:text-5xl">
                  Choose a time that fits your shoot.
                </h1>
                <p className="max-w-xl text-base leading-7 text-stone-200">
                  Use the scheduler to lock in your date and time in a few clicks.
                  You will receive calendar invites, reminders, and all the details
                  by email.
                </p>
              </div>

              <div className="space-y-4 rounded-[1.5rem] border border-white/15 bg-black/50 p-5">
                <p className="text-sm uppercase tracking-[0.26em] text-stone-300">
                  How booking works
                </p>
                <ol className="space-y-3 text-sm leading-6 text-stone-200">
                  <li>
                    <span className="font-semibold text-white">1. Pick a slot.</span>{" "}
                    Open the Calendly popup, choose a time, and answer a few quick
                    questions about the session.
                  </li>
                  <li>
                    <span className="font-semibold text-white">2. Confirm by email.</span>{" "}
                    You will get a confirmation with all details and the option to
                    reschedule if something changes.
                  </li>
                  <li>
                    <span className="font-semibold text-white">3. Prepare together.</span>{" "}
                    Before the shoot, I will share guidance on outfits, locations,
                    and timing so you feel ready when you arrive.
                  </li>
                </ol>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <CalendlyPopupButton
                  url={calendlyUrl}
                  label="Open scheduler"
                  className="w-full rounded-full bg-white px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:-translate-y-[1px] hover:shadow-xl sm:w-auto"
                />
                <Link
                  href="mailto:j-r@renevision.net"
                  className="w-full rounded-full border border-white/35 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
                >
                  Ask a question first
                </Link>
                <Link
                  href="/"
                  className="w-full rounded-full px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-stone-200 transition hover:text-white sm:w-auto"
                >
                  Back to portfolio
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.28em] text-stone-300">
                  Before you book
                </p>
                <ul className="space-y-2 text-sm leading-6 text-stone-200">
                  <li>
                    <span className="font-semibold text-white">Session types:</span>{" "}
                    portraits, couples, small editorial stories, and brand sessions.
                  </li>
                  <li>
                    <span className="font-semibold text-white">Location:</span>{" "}
                    on-location in the local area, with studio options available on
                    request.
                  </li>
                  <li>
                    <span className="font-semibold text-white">Typical investment:</span>{" "}
                    see packages on the home page for starting points; we can tailor
                    a quote for bigger projects.
                  </li>
                  <li>
                    <span className="font-semibold text-white">Rescheduling:</span>{" "}
                    life happens — you can move your booking through Calendly up to
                    24 hours before your session.
                  </li>
                </ul>
              </div>

              <div className="space-y-3 rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-stone-300">
                  Frequently asked
                </p>
                <div className="space-y-4 text-sm leading-6 text-stone-200">
                  <div>
                    <p className="font-semibold text-white">
                      How long are sessions?
                    </p>
                    <p className="mt-1">
                      Most portrait and couple sessions run 60–120 minutes. Brand
                      or content retainers can be structured as half-day blocks.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      When will I receive images?
                    </p>
                    <p className="mt-1">
                      A typical turnaround is 1-2 weeks for fully edited galleries.
                      If you need a rush delivery, mention it in your booking notes.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Can we talk before booking?
                    </p>
                    <p className="mt-1">
                      Yes. Use the email option above to share what you have in
                      mind, and we can align on concept, budget, and timing before
                      you pick a slot.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

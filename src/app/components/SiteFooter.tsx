import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://instagram.com/rene.vision", label: "Instagram" },
  { href: "mailto:j-r@renevision.net", label: "Email" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="eyebrow text-xs uppercase tracking-[0.3em] text-paper/50">
            New York City — worldwide
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">
            Let&apos;s make something{" "}
            <span className="italic text-accent-soft">worth remembering.</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="rounded-full bg-paper px-7 py-3.5 text-[13px] uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:-translate-y-px hover:shadow-xl hover:shadow-black/40"
            >
              Start a conversation
            </Link>
            <a
              href="mailto:j-r@renevision.net"
              className="link-underline text-sm text-paper/70 hover:text-paper"
            >
              j-r@renevision.net
            </a>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col gap-8 border-t border-paper/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/">
            <Image
              src="/renevision-logo-white.png"
              alt="René Vision logo"
              width={3510}
              height={2421}
              className="h-auto w-[96px] object-contain opacity-80"
            />
          </Link>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline text-xs uppercase tracking-[0.24em] text-paper/60 transition hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="link-underline text-xs uppercase tracking-[0.24em] text-paper/60 transition hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-paper/40">
          © {new Date().getFullYear()} René Vision. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

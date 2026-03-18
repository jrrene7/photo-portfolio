"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CalendlyPopupButton from "./CalendlyPopupButton";

const navItems = [
  { href: "/", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Booking" },
];

function navItemClass(isActive: boolean) {
  return isActive
    ? "text-white"
    : "text-stone-300 transition hover:text-white";
}

export default function SiteHeader() {
  const pathname = usePathname();
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/15 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/renevision-logo-white.png"
            alt="René Vision logo"
            width={3510}
            height={2421}
            className="h-auto w-[124px] object-contain sm:w-[150px]"
            priority
          />
          <span className="hidden font-display text-xs uppercase tracking-[0.32em] text-stone-200 sm:inline">
            Photography
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-display text-sm uppercase tracking-[0.22em] ${navItemClass(isActive)}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <CalendlyPopupButton
            url={calendlyUrl}
            label="Book a session"
            className="rounded-full border border-white/50 px-4 py-2 text-sm text-white transition hover:-translate-y-[1px] hover:border-white hover:bg-white/10 hover:shadow-lg"
          />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 p-3 text-white transition hover:border-white/40 hover:bg-white/10 md:hidden"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M6 6l12 12M18 6l-12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/75 px-5 py-5 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-5">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-2xl border px-4 py-3 font-display text-sm uppercase tracking-[0.22em] ${
                      isActive
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-white/10 bg-white/[0.03] text-stone-200"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-3">
              <CalendlyPopupButton
                url={calendlyUrl}
                label="Open scheduler"
                className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black"
                onOpen={() => setIsMenuOpen(false)}
              />
              <Link
                href="mailto:renevision.media@gmail.com"
                className="rounded-full border border-white/25 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Email instead
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

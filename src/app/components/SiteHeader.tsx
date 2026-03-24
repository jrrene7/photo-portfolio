"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CalendlyPopupButton from "./CalendlyPopupButton";

const navItems = [
  { href: "/", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Booking" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/50 backdrop-blur-xl"
            : "bg-transparent backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5 sm:px-6 md:px-8">
          {/* Logo */}
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/renevision-logo-white.png"
              alt="René Vision"
              width={3510}
              height={2421}
              className="h-auto w-[110px] object-contain sm:w-[130px]"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <CalendlyPopupButton
              url={calendlyUrl}
              label="Book"
              className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:border-white hover:bg-white/10"
            />
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="relative z-50 p-1 text-white md:hidden"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <svg
              className="h-6 w-6 transition-all"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <path d="M6 6l12 12M18 6l-12 12" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 flex flex-col bg-black/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`font-display text-3xl transition-colors ${
                  isActive ? "text-white" : "text-stone-400 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 px-8 pb-12">
          <CalendlyPopupButton
            url={calendlyUrl}
            label="Open scheduler"
            className="rounded-full bg-white px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black"
            onOpen={() => setIsMenuOpen(false)}
          />
          <Link
            href="mailto:j-r@renevision.net"
            className="rounded-full border border-white/20 px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Email instead
          </Link>
        </div>
      </div>
    </>
  );
}

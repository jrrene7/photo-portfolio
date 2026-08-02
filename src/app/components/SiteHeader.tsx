"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CalendlyPopupButton from "./CalendlyPopupButton";

const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** "/#work" is active on the homepage; other items match the pathname exactly. */
const isItemActive = (href: string, pathname: string) =>
  href === "/#work" ? pathname === "/" : pathname === href;

export default function SiteHeader() {
  const pathname = usePathname();
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
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
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          {/* Logo — white asset inverted to ink */}
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/renevision-logo-white.png"
              alt="René Vision"
              width={3510}
              height={2421}
              className="h-auto w-[104px] object-contain brightness-0 sm:w-[120px]"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => {
              const isActive = isItemActive(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-underline text-[13px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                    isActive ? "is-active text-ink" : "text-muted hover:text-ink"
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
              label="Book a session"
              className="rounded-full bg-ink px-5 py-2.5 text-[13px] uppercase tracking-[0.18em] text-paper transition-all duration-300 hover:-translate-y-px hover:shadow-lg hover:shadow-ink/15"
            />
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="relative z-50 p-1 text-ink md:hidden"
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
        className={`fixed inset-0 z-30 flex flex-col bg-paper transition-all duration-500 ease-editorial md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-1 flex-col items-start justify-center gap-2 px-10">
          {navItems.map((item, i) => {
            const isActive = isItemActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: isMenuOpen ? `${120 + i * 70}ms` : "0ms" }}
                className={`font-display text-5xl leading-tight transition-all duration-500 ease-editorial ${
                  isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                } ${isActive ? "italic text-ink" : "text-ink/60 hover:text-ink"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div
          className={`flex flex-col gap-3 px-10 pb-14 transition-all duration-500 ease-editorial ${
            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: isMenuOpen ? "340ms" : "0ms" }}
        >
          <CalendlyPopupButton
            url={calendlyUrl}
            label="Book a session"
            className="rounded-full bg-ink px-5 py-4 text-center text-sm uppercase tracking-[0.18em] text-paper"
            onOpen={() => setIsMenuOpen(false)}
          />
          <Link
            href="mailto:j-r@renevision.net"
            className="rounded-full border border-ink/20 px-5 py-4 text-center text-sm uppercase tracking-[0.18em] text-ink"
            onClick={() => setIsMenuOpen(false)}
          >
            Email instead
          </Link>
        </div>
      </div>
    </>
  );
}

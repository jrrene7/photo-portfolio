import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Booking" },
];

const socialLinks = [
  { href: "https://instagram.com/rene.vision", label: "Instagram" },
  { href: "mailto:renevision.media@gmail.com", label: "Email" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-6 md:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/renevision-logo-white.png"
              alt="René Vision logo"
              width={3510}
              height={2421}
              className="h-auto w-[110px] object-contain opacity-90"
            />
          </Link>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-xs uppercase tracking-[0.28em] text-stone-400 transition hover:text-white"
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
                className="font-display text-xs uppercase tracking-[0.28em] text-stone-400 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} René Vision. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

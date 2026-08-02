import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Get in touch or book a portrait, editorial, brand, or event photography session with René Vision — New York City and worldwide.",
  alternates: { canonical: "https://renevision.net/contact" },
  openGraph: {
    title: "Contact & Booking | René Vision",
    description:
      "Get in touch or book a portrait, editorial, brand, or event photography session with René Vision — New York City and worldwide.",
    url: "https://renevision.net/contact",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}

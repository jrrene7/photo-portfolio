import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with René Vision to book a portrait, editorial, brand, or event photography session in New York City or worldwide.",
  alternates: { canonical: "https://renevision.net/contact" },
  openGraph: {
    title: "Contact | René Vision",
    description:
      "Get in touch with René Vision to book a portrait, editorial, brand, or event photography session in New York City or worldwide.",
    url: "https://renevision.net/contact",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}

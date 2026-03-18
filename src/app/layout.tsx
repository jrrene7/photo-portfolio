import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const baseUrl = "https://renevision.net";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "René Vision | NYC Portrait & Editorial Photographer",
    template: "%s | René Vision",
  },
  description:
    "NYC-based portrait, editorial, and brand photographer. Sharp visuals, intentional direction, and a process built around you. Book a session in New York City.",
  keywords: [
    "NYC photographer",
    "New York City portrait photographer",
    "editorial photographer NYC",
    "brand photographer New York",
    "headshot photographer NYC",
    "couples photographer New York",
    "René Vision",
  ],
  authors: [{ name: "Jean-Robert", url: baseUrl }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "René Vision",
    title: "René Vision | NYC Portrait & Editorial Photographer",
    description:
      "NYC-based portrait, editorial, and brand photographer. Sharp visuals, intentional direction, and a process built around you.",
    images: [{ url: "/my-portrait.png", width: 1200, height: 630, alt: "René Vision — NYC Photographer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "René Vision | NYC Portrait & Editorial Photographer",
    description:
      "NYC-based portrait, editorial, and brand photographer. Sharp visuals, intentional direction, and a process built around you.",
    images: ["/my-portrait.png"],
  },
  icons: {
    icon: "/renevision-logo-white.png",
    apple: "/renevision-logo-white.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
      </head>
      <body className={`${GeistSans.variable} antialiased`}>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WTTRHDXBXB"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WTTRHDXBXB');
          `}
        </Script>
      </body>
    </html>
  );
}

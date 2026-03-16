import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "René Vision",
  description: "Photography portfolio for René Vision.",
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
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Space_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { profile } from "@/lib/data";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, pageMetadata } from "@/lib/site";
import { graph, personNode, websiteNode } from "@/lib/structured-data";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

/** Search-console ownership codes, set as Vercel environment variables when the owner has them */
const GOOGLE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;
const BING_VERIFICATION = process.env.BING_SITE_VERIFICATION;

/** Share defaults for any page that sets none; each real page sets its own canonical address */
const SHARE_DEFAULTS = pageMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  description: SITE_DESCRIPTION,
  openGraph: SHARE_DEFAULTS.openGraph,
  twitter: SHARE_DEFAULTS.twitter,
  title: {
    default: SITE_TITLE,
    template: `%s | ${profile.name}`,
  },
  applicationName: profile.name,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  keywords: [
    profile.name,
    "Saeed Malakzai",
    "Android developer Afghanistan",
    "iOS developer Afghanistan",
    "mobile app developer Kabul",
    "full-stack developer Kabul",
    "Next.js developer",
    "24Tabib",
    "SayHello",
    "Peygham",
    "Abaseen",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: GOOGLE_VERIFICATION,
    other: BING_VERIFICATION ? { "msvalidate.01": BING_VERIFICATION } : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${spaceMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={graph(websiteNode(), personNode())} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:font-mono focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

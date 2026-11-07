import type { Metadata } from "next";
import { Geist, Space_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { profile } from "@/lib/data";

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

const DESCRIPTION =
  "Saeed Ahmad Malakzai builds native Android and iOS apps, web platforms and small tools in Kabul: 24Tabib, SayHello, Peygham, Kaar.af and more.";

export const metadata: Metadata = {
  metadataBase: new URL("https://saeedmalakzai.vercel.app"),
  title: {
    default: `${profile.name} | ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Saeed Ahmad Malakzai",
    "Full-Stack Developer",
    "Mobile Developer",
    "Android",
    "iOS",
    "Next.js",
    "Afghanistan",
  ],
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description: DESCRIPTION,
    type: "website",
    url: "/",
    images: [{ url: "/images/saeed-illustration.jpg", width: 1000, height: 1000, alt: profile.name }],
  },
  twitter: {
    card: "summary",
    images: ["/images/saeed-illustration.jpg"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${spaceMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { profile } from "@/lib/data";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saeedmalakzai.vercel.app"),
  title: {
    default: `${profile.name} | ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Full-stack & mobile developer building production web, Android, iOS and desktop applications — Next.js, React, Node.js, Kotlin, Python and Swift/SwiftUI.",
  keywords: [
    "Saeed Ahmad Malakzai",
    "Full-Stack Developer",
    "Mobile Developer",
    "Next.js",
    "React",
    "SwiftUI",
    "Afghanistan",
  ],
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description:
      "Full-stack & mobile developer building production web, Android, iOS and desktop applications.",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

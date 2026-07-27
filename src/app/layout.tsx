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
  metadataBase: new URL("https://saeed-portfolio-amber.vercel.app"),
  title: {
    default: `${profile.name} | ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Full-stack & mobile developer building production web, iOS, and desktop applications — Next.js, React, Node.js, Python, and Swift/SwiftUI.",
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
      "Full-stack & mobile developer building production web, iOS, and desktop applications.",
    type: "website",
    images: ["/images/profile.jpg"],
  },
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

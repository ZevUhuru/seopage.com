import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Serious, professional grotesque for display — not rounded or playful.
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const TITLE = "Local SEO Landing Pages, Built to Rank | SEOPage";
const DESCRIPTION =
  "SEOPage builds local SEO landing pages that rank on Google and get found by AI. Researched copy, a clean design, and schema markup. Preview free, yours to publish for $29.";

export const metadata: Metadata = {
  metadataBase: new URL("https://seopage.com"),
  title: {
    default: TITLE,
    template: "%s | SEOPage",
  },
  description: DESCRIPTION,
  applicationName: "SEOPage",
  authors: [{ name: "SEOPage" }],
  creator: "SEOPage",
  publisher: "SEOPage",
  category: "technology",
  keywords: [
    "seo landing pages",
    "seo landing page",
    "local seo landing pages",
    "seo for landing pages",
    "landing pages for seo",
    "best seo landing pages",
    "seo optimized landing pages",
    "local seo city landing pages",
    "do landing pages help seo",
    "seo best practices for landing pages",
    "local landing pages",
    "landing page seo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description:
      "Local SEO landing pages that rank on Google and get found by AI. Researched copy, a clean design, and schema markup. Preview free, yours to publish for $29.",
    url: "https://seopage.com",
    siteName: "SEOPage",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Local SEO landing pages that rank on Google and get found by AI. Researched copy, a polished design, and schema markup. Preview free, yours to publish for $29.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-ink">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo, Newsreader } from "next/font/google";
import "./globals.css";
import { PRICE_LABEL } from "@/lib/config";

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

// The page's one soft voice. Newsreader is a reading serif with a low-contrast
// stroke and a genuinely warm italic — used only where a person is speaking.
const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const TITLE = "SEO Landing Pages That Get Cited by AI and Rank on Google | SEOPage";
const DESCRIPTION = `An SEO page is a page built to win one search. Build yours with AI — researched, written, and engineered to rank on Google and get cited by ChatGPT, Perplexity, and AI Overviews. Free to preview, ${PRICE_LABEL} to publish.`;

// Shared by both the OpenGraph and Twitter cards.
const SOCIAL_DESCRIPTION = `Describe your business. Get a finished SEO page — researched, written, and engineered for Google and AI search. Free to preview, ${PRICE_LABEL} to publish.`;

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
    "seo page",
    "done for you seo pages",
    "seo landing page",
    "landing page seo",
    "on page seo services",
    "on page seo service",
    "seo optimized landing pages",
    "local seo landing pages",
    "seo page writing service",
    "buy seo page",
    "seo content service",
    "one page seo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
    url: "https://seopage.com",
    siteName: "SEOPage",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
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
      className={`${sans.variable} ${display.variable} ${mono.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-ink">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seopage.com"),
  title: {
    default: "SEOPage — Generate Competitive SEO Landing Pages",
    template: "%s — SEOPage",
  },
  description:
    "Generate competitive SEO landing pages for alternatives, comparison, best-of, FAQ, and category searches. Export the SEO landing page and publish it on your own site.",
  keywords: [
    "SEO landing pages",
    "programmatic SEO",
    "alternative pages",
    "vs pages",
    "best of lists",
    "AI SEO tool",
    "SERP analysis",
    "bottom of funnel SEO",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "SEOPage — Generate Competitive SEO Landing Pages",
    description:
      "Turn a website and competitor context into structured SEO landing pages you can export and publish.",
    url: "https://seopage.com",
    siteName: "SEOPage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEOPage — Generate Competitive SEO Landing Pages",
    description:
      "Generate alternatives, comparison, best-of, FAQ, and category SEO landing pages from your website.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}

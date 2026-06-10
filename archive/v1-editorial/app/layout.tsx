import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GTM_ID = "GTM-MBV8RKDD";

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
    default: "SEOPage — See How Your Page Ranks in AI Search",
    template: "%s — SEOPage",
  },
  description:
    "Paste a URL and get an AI Rank Report: 20 buyer prompts run across ChatGPT, Google AI Overviews, Perplexity, and Claude — where you're cited, who gets cited instead, and what to fix. First report free, then $149/mo.",
  keywords: [
    "AI rank report",
    "AI page ranking",
    "AI search visibility",
    "AI visibility tracking",
    "ChatGPT citation checker",
    "ChatGPT brand visibility",
    "Perplexity citation tracking",
    "Google AI Overviews tracking",
    "Claude AI visibility",
    "AEO answer engine optimization",
    "GEO generative engine optimization",
    "AI SEO report",
    "LLM visibility tool",
    "AI citation tracking",
    "AI search rank tracker",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "SEOPage — See How Your Page Ranks in AI Search",
    description:
      "An AI Rank Report for any URL: cited, mentioned, or absent across ChatGPT, Google AI Overviews, Perplexity, and Claude — with evidence, competitor gaps, and a fix list. First report free.",
    url: "https://seopage.com",
    siteName: "SEOPage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEOPage — See How Your Page Ranks in AI Search",
    description:
      "Is your page in the AI answer, or is your competitor's? One report, 4 AI channels, evidence included. First report free.",
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
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}

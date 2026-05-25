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
    default: "SEOPage — SEO Landing Pages Built to Get Cited by ChatGPT",
    template: "%s — SEOPage",
  },
  description:
    "Five competitive SEO landing pages engineered for AI search citation and Google rank. Researched by AI from your URL, signed off by a real editor. $699 per pack, or $150 per page — no subscription.",
  keywords: [
    "SEO landing page",
    "SEO landing pages",
    "landing page SEO",
    "what is an SEO landing page",
    "SEO page",
    "AI SEO landing page generator",
    "AI search optimization",
    "ChatGPT citation",
    "AEO answer engine optimization",
    "GEO generative engine optimization",
    "AI Overviews optimization",
    "competitive landing pages",
    "alternatives pages",
    "best-of pages",
    "SaaS landing page SEO",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "SEOPage — SEO Landing Pages Built to Get Cited by ChatGPT",
    description:
      "Five competitive SEO landing pages engineered for ChatGPT, Perplexity, and Google AI Overviews — researched by AI, signed off by a real editor.",
    url: "https://seopage.com",
    siteName: "SEOPage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEOPage — SEO Landing Pages Built to Get Cited by ChatGPT",
    description:
      "Five SEO landing pages engineered for AI search citation and Google rank. Researched by AI, signed off by a human.",
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

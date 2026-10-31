import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo, Newsreader } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GA_MEASUREMENT_ID, SITE_DESCRIPTION, SITE_TITLE, SOCIAL_DESCRIPTION } from "@/lib/config";
import { TrackClicks } from "@/components/TrackClicks";

// Google Analytics runs on the production deploy only, so local dev and Vercel previews stay out of the numbers
const ANALYTICS = process.env.VERCEL_ENV === "production";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Archivo and Newsreader are variable fonts, loaded with no weight list (one file covers every
// weight): a weight list makes the bundler's Google Fonts loader fail some builds. See components/home/fonts.ts.

// Serious, professional grotesque for display — not rounded or playful.
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
});

// The page's one soft voice. Newsreader is a reading serif with a low-contrast
// stroke and a genuinely warm italic — used only where a person is speaking.
const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// The site's default title and description, and the social cards' text: the positioning in lib/config.ts
const TITLE = SITE_TITLE;
const DESCRIPTION = SITE_DESCRIPTION;

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
      <body className="min-h-full bg-bg text-ink">
        {children}
        {/* The Google tag (gtag.js), loaded after the page is interactive so it never slows the first paint */}
        {ANALYTICS && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
            {/* start_free and book_call, from one click listener (lib/events.ts lists every event) */}
            <TrackClicks />
          </>
        )}
      </body>
    </html>
  );
}

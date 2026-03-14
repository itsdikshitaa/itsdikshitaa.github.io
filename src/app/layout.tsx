import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";
import { personalInfo, socialLinks } from "@/lib/data";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const sameAs = socialLinks.map((link) => link.url);
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description: personalInfo.subheadline,
  keywords: [
    "portfolio",
    "personal website",
    "case studies",
    "design",
    "frontend",
    "creative portfolio",
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.subheadline,
    siteName: personalInfo.name,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.subheadline,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  description: personalInfo.subheadline,
  url: siteUrl,
  sameAs,
  knowsAbout: [
    "Portfolio design",
    "Frontend development",
    "Case study presentation",
    "Visual systems",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: personalInfo.name,
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${manrope.variable} ${fraunces.variable} ${ibmPlexMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import ClientLayout from "@/components/ui/ClientLayout";

export const metadata: Metadata = {
  title: "Transparency Hub",
  description: "Explore how major apps and technology companies change their privacy policies, terms and platform rules over time.",
  openGraph: {
    title: "Transparency Hub",
    siteName: "Transparency Hub",
    locale: "en-US",
    description: "Explore how major apps and technology companies change their privacy policies, terms and platform rules over time.",
    url: "https://hub.transparency.berkmancenter.org/",
    type: "website",
    images: [
      {
        url: "https://hub.transparency.berkmancenter.org/OGIMG.png",
        secureUrl: "https://hub.transparency.berkmancenter.org/OGIMG.png",
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Transparency Hub, a resource for tracking changes to app and technology company policies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transparency Hub",
    description: "Explore how major apps and technology companies change their privacy policies, terms and platform rules over time.",
    images: [
      {
        url: "https://hub.transparency.berkmancenter.org/OGIMG.png",
        secureUrl: "https://hub.transparency.berkmancenter.org/OGIMG.png",
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Transparency Hub, a resource for tracking changes to app and technology company policies",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Project",
              "name": "Transparency Hub",
              "url": "https://hub.transparency.berkmancenter.org/",
              "logo": "https://hub.transparency.berkmancenter.org/bordered_icon.svg",
              "description": "An educational resource for learning about how apps and tech companies' legal and privacy policies change over time.",
              "sameAs": ["https://cyber.harvard.edu/projects/transparency-hub", "https://asml.cyber.harvard.edu/transparency-hub/"],
            })
          }}
        />
        <link rel="apple-touch-icon" href="/bordered_icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Google Site Verification - DO NOT EDIT */}
        <meta name="google-site-verification" content="KScDTbln5xjwB5pd-vGG89VKoLEZsktu8gngYCDaDUA" />
        {/* Import Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/pea5xxg.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ClientLayout >
          {children}
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}

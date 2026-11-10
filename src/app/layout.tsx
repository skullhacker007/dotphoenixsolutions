import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const viewport: Viewport = {
  themeColor: "#0e0f12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dotphoenixsolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "Dot Phoenix Solutions | AI-Driven Digital Automation",
    template: "%s | Dot Phoenix Solutions",
  },

  description:
    "Dot Phoenix Solutions is an AI-Driven Digital Automation Company delivering scalable, secure, and intelligent technology solutions for modern enterprises.",

  keywords: [
    "AI automation",
    "digital transformation",
    "enterprise software development",
    "SaaS product development",
    "web application development",
    "mobile application development",
    "intelligent workflows",
    "payroll and enterprise systems",
    "FinTech platforms",
    "Dot Phoenix Solutions",
  ],

  authors: [{ name: "Dot Phoenix Solutions", url: baseUrl }],
  creator: "Dot Phoenix Solutions",
  publisher: "Dot Phoenix Solutions",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Dot Phoenix Solutions",
    title: "Dot Phoenix Solutions | AI-Driven Digital Automation",
    description:
      "Empowering enterprises with AI-driven digital automation, scalable software engineering, and intelligent systems.",
    images: [
      {
        url: "/phoenixlogo.svg",
        width: 1200,
        height: 630,
        alt: "Dot Phoenix Solutions - AI-Driven Digital Automation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dot Phoenix Solutions | AI-Driven Digital Automation",
    description:
      "Dot Phoenix Solutions is an AI-Driven Digital Automation Company delivering scalable, secure, and intelligent technology solutions.",
    images: ["/phoenixlogo.svg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/phoenixlogo.svg",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Dot Phoenix Solutions",
      url: baseUrl,
      logo: `${baseUrl}/phoenixlogo.svg`,
      description:
        "AI-Driven Digital Automation Company delivering scalable, secure, and intelligent technology solutions for modern enterprises.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91 9346622679",
        contactType: "customer service",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tirupati",
        addressRegion: "AP",
        addressCountry: "IN",
      },
      sameAs: [
        "https://dotphoenixsolutions.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Dot Phoenix Solutions",
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />

        <ClientLayout>
          <main id="main-content" role="main">
            {children}
          </main>
        </ClientLayout>

        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://dotphoenixsolutions.com",
  ),

  title: {
    default: "Dot Phoenix Solutions | AI-Driven Digital Automation",
    template: "%s | Dot Phoenix Solutions",
  },

  description:
    "Dot Phoenix Solutions is an AI-Driven Digital Automation Company delivering scalable, secure, and intelligent technology solutions for modern enterprises.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dotphoenixsolutions.com",
    siteName: "Dot Phoenix Solutions",
    title: "Dot Phoenix Solutions | AI-Driven Digital Automation",
    description:
      "Dot Phoenix Solutions is an AI-Driven Digital Automation Company delivering scalable, secure, and intelligent technology solutions for modern enterprises.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dot Phoenix Solutions | AI-Driven Digital Automation",
    description:
      "Dot Phoenix Solutions is an AI-Driven Digital Automation Company delivering scalable, secure, and intelligent technology solutions for modern enterprises.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
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

import type { Metadata } from "next";
import Hero from "../components/Hero";
import Services from "@/components/Services";
import Process from "../components/Process";
import Solutions from "@/components/Solutions";
import Digital from "@/components/Digital";
import WhyChoose from "@/components/WhyChoose";

export const metadata: Metadata = {
  title: "Dot Phoenix Solutions | AI-Driven Digital Automation",
  description:
    "Dot Phoenix Solutions accelerates enterprise digital transformation with cutting-edge AI automation, scalable web & mobile software, SaaS platforms, and intelligent operations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dot Phoenix Solutions | AI-Driven Digital Automation",
    description:
      "Empowering enterprises through AI automation, enterprise software engineering, SaaS platforms, and intelligent workflows.",
    url: "/",
    siteName: "Dot Phoenix Solutions",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="homepage-wrapper">
      <Hero />
      <Services />
      <Process />
      <Solutions />
      <Digital />
    </div>
  );
}

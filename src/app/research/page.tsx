import type { Metadata } from "next";
import ResearchClient from "./ResearchClient";

export const metadata: Metadata = {
  title: "AI Systems Research | Dot Phoenix Solutions",
  description:
    "Explore our systems-level research in artificial intelligence: autonomous agent networks, generative reasoning architectures, and AI operating systems.",
  alternates: {
    canonical: "/research",
  },
  openGraph: {
    title: "AI Systems Research | Dot Phoenix Solutions",
    description:
      "Researching the foundations of Networked Artificial Versatile Intelligence (NAVI): Generative AI, Autonomous Agents, and AI-native Operating Systems.",
    url: "/research",
  },
};

export default function ResearchPage() {
  return <ResearchClient />;
}

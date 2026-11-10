import type { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
  title: "Industry Solutions & Platforms | Dot Phoenix Solutions",
  description:
    "Explore enterprise industry solutions: FinTech, HealthTech, Insurance, Retail, Manufacturing, and Education platforms engineered for scale and intelligence.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "Industry Solutions & Platforms | Dot Phoenix Solutions",
    description:
      "Enterprise digital solutions engineered for high-impact industries: Technology, FinTech, Healthcare, Insurance, Commerce, and Manufacturing.",
    url: "/solutions",
  },
};

export default function SolutionsPage() {
  return <SolutionsClient />;
}

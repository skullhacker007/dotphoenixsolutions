"use client";

import { useEffect, useRef, useState } from "react";
import "./solutions.css";
import WhyChoose from "@/components/WhyChoose";

type Section = {
  title: string;
  headline: string;
  description: string;
  valuePoints: string[];
  emphasisLine: string;
};

const sections: Section[] = [
  {
    title: "Technology",
    headline: "Technology & Product Platforms",
    description:
      "We design core technology platforms that become the backbone of digital businesses — engineered for scale, resilience, and long-term growth.",
    valuePoints: [
      "Future-proof architecture that reduces rework and accelerates feature delivery",
      "CI/CD pipelines and automated testing for safe, frequent releases",
      "Modular APIs and microservices to enable parallel development",
      "Built-in observability (logs, metrics, tracing) for fast incident resolution",
      "Security-by-design: identity, encryption, and least-privilege access",
      "Cost optimization through autoscaling and resource governance",
      "Developer experience tooling to increase team productivity",
    ],
    emphasisLine: "Strong platforms don’t support growth — they enable it.",
  },
  {
    title: "Business & Legal",
    headline: "Business Process & Legal Systems",
    description:
      "We simplify complex business and legal workflows with intelligent systems that improve efficiency, compliance, and visibility.",
    valuePoints: [
      "End-to-end workflow automation to remove manual handoffs",
      "Role-based access and approvals for governance and security",
      "Audit trails and tamper-evident logs for compliance readiness",
      "Contract lifecycle management with automated expiry alerts",
      "Business rules engines for rapid policy updates",
      "Operational dashboards for SLA and bottleneck tracking",
      "Integration-ready connectors to enterprise systems",
    ],
    emphasisLine: "Efficiency is not optional — it’s a competitive advantage.",
  },
  {
    title: "FinTech",
    headline: "Financial Services & FinTech Platforms",
    description:
      "We build secure, high-performance financial platforms designed for trust, scale, and regulatory confidence.",
    valuePoints: [
      "Low-latency transaction processing",
      "Ledger consistency and reconciliation",
      "Fraud detection and anomaly scoring",
      "High availability with disaster recovery",
      "Automated regulatory reporting",
      "Pluggable payments infrastructure",
    ],
    emphasisLine: "In finance, reliability defines reputation.",
  },
  {
    title: "Healthcare",
    headline: "Healthcare & Medical Systems",
    description:
      "We design healthcare platforms that improve outcomes, streamline operations, and protect sensitive data.",
    valuePoints: [
      "EHR and EMR integrations",
      "Secure patient portals",
      "Telemedicine workflows",
      "Compliance-first system design",
      "Clinical analytics and insights",
      "FHIR and HL7 interoperability",
      "Operational capacity planning tools",
    ],
    emphasisLine: "Healthcare systems must perform when it matters most.",
  },
  {
    title: "Insurance",
    headline: "Insurance Platforms",
    description:
      "We design insurance systems that simplify policy management, claims, and customer journeys.",
    valuePoints: [
      "Policy lifecycle automation",
      "Claims intake and adjudication",
      "Underwriting engines",
      "Customer self-service portals",
      "Fraud detection",
      "Partner integrations",
      "Audit-ready compliance systems",
    ],
    emphasisLine: "Speed and trust define modern insurance.",
  },
  {
    title: "Retail",
    headline: "Retail & E-commerce Platforms",
    description:
      "We build commerce platforms that convert traffic into revenue and customers into loyal advocates.",
    valuePoints: [
      "Personalized shopping experiences",
      "Frictionless checkout",
      "Real-time inventory sync",
      "Omnichannel commerce",
      "Pricing and promotions engines",
      "Peak load performance optimization",
      "Customer analytics integrations",
    ],
    emphasisLine: "Every interaction is an opportunity to convert.",
  },
  {
    title: "Manufacturing",
    headline: "Manufacturing & Industrial Systems",
    description:
      "We connect industrial operations with intelligent platforms that deliver clarity and efficiency.",
    valuePoints: [
      "IIoT telemetry integrations",
      "Predictive maintenance",
      "MES and MRP integrations",
      "Supply chain visibility",
      "Quality control automation",
      "Production scheduling optimization",
      "Energy and resource monitoring",
    ],
    emphasisLine: "Operational clarity drives industrial growth.",
  },
  {
    title: "Education",
    headline: "Education & Research Platforms",
    description:
      "We design digital learning platforms that support collaboration, engagement, and scale.",
    valuePoints: [
      "Scalable learning management systems",
      "Assessment and grading automation",
      "Collaborative learning workflows",
      "Curriculum content management",
      "Learner analytics",
      "SSO and SIS integrations",
      "Low-bandwidth and offline support",
    ],
    emphasisLine: "Education platforms shape future generations.",
  },
];

export default function SolutionsClient() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -30% 0px" },
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="solutionspage">
      <header className="solutionspage-header">
        <h1 className="fade-in-left">Dot Phoenix Solutions</h1>
        <p
          className="solutionspage-intro fade-in-right"
          style={{ animationDelay: "0.12s" }}
        >
          We design and deliver secure, scalable digital platforms that help
          organizations operate efficiently, grow confidently, and adapt without
          friction.
        </p>
      </header>

      <section className="solutionspage-wrapper">
        <div className="solutionspage-layout">
          <aside className="solutionspage-rail">
            <div className="rail-line" />
            <div
              className="rail-indicator"
              style={{ transform: `translateY(${progress * 60}vh)` }}
            />
          </aside>

          <section className="solutions-wrapper">
            {sections.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                data-index={index}
                className={`solution-slide ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div className="solution-content">
                  <span className="solution-tag">{item.title}</span>
                  <h2 className="solution-headline">{item.headline}</h2>
                  <p className="solution-description">{item.description}</p>

                  <ul className="solution-points">
                    {item.valuePoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>

                  <button
                    className="solutionspage-button"
                    onClick={() =>
                      window.dispatchEvent(new Event("open-sidebar"))
                    }
                  >
                    Request a Demo →
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>

      <WhyChoose />
    </main>
  );
}

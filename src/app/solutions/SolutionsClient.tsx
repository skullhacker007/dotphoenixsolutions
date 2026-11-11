"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardContentRefs = useRef<(HTMLElement | null)[]>([]);
  const wrapperRef = useRef<HTMLElement | null>(null);
  const railContainerRef = useRef<HTMLDivElement | null>(null);

  const railBallRef = useRef<HTMLDivElement | null>(null);
  const railFillRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Position of rail container aligned with card tops
  const [railTop, setRailTop] = useState<number>(0);
  const [railHeight, setRailHeight] = useState<number>(0);
  const railHeightRef = useRef<number>(0);

  // Smooth lerp physics state
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);

  // Calculate pixel-perfect alignment of the rail line spanning from top of Card 0 to top of Card 7
  const updateRailAlignment = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const firstCard = cardContentRefs.current[0];
    const lastCard = cardContentRefs.current[sections.length - 1];

    if (!firstCard || !lastCard) return;

    const firstCardRect = firstCard.getBoundingClientRect();
    const lastCardRect = lastCard.getBoundingClientRect();

    const topOffset = firstCardRect.top - wrapperRect.top;
    const bottomOffset = lastCardRect.top - wrapperRect.top;
    const height = Math.max(0, bottomOffset - topOffset);

    setRailTop(topOffset);
    setRailHeight(height);
    railHeightRef.current = height;
  }, []);

  useEffect(() => {
    updateRailAlignment();
    window.addEventListener("resize", updateRailAlignment);
    return () => window.removeEventListener("resize", updateRailAlignment);
  }, [updateRailAlignment]);

  // Ultra-smooth GPU-accelerated LERP RAF loop for rail ball and fill
  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const scrollableDistance = (sections.length - 1) * window.innerHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const p = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      targetProgressRef.current = p;
    };

    const tick = () => {
      // 60/120fps fluid damped interpolation
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.14;

      const p = Math.min(Math.max(currentProgressRef.current, 0), 1);
      const h = railHeightRef.current;

      if (railBallRef.current && h > 0) {
        railBallRef.current.style.transform = `translate3d(-50%, ${p * h}px, 0)`;
      }
      if (railFillRef.current) {
        railFillRef.current.style.transform = `scaleY(${p})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    currentProgressRef.current = targetProgressRef.current;
    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Focus the card centered in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!isNaN(idx)) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        threshold: 0.45,
      }
    );

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to center a card
  const scrollToCard = (index: number) => {
    const slide = slideRefs.current[index];
    if (!slide) return;

    const slideTop = slide.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: slideTop,
      behavior: "smooth",
    });
  };

  // Click on rail line to jump smoothly to that scroll position
  const handleRailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rail = railContainerRef.current;
    if (!rail) return;

    const rect = rail.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.min(Math.max(clickY / rect.height, 0), 1);

    const targetIndex = Math.min(
      Math.round(ratio * (sections.length - 1)),
      sections.length - 1
    );
    scrollToCard(targetIndex);
  };

  return (
    <main className="solutionspage">
      {/* Intro Header */}
      <header className="solutionspage-header">
        <span className="solutionspage-badge">Enterprise Solutions</span>
        <h1 className="solutionspage-title">Dot Phoenix Solutions</h1>
        <p className="solutionspage-intro">
          We design and deliver secure, scalable digital platforms that help
          organizations operate efficiently, grow confidently, and adapt without
          friction.
        </p>
      </header>

      {/* Solutions Section with Traveling Rail & Centered Same-Size Cards */}
      <section className="solutionspage-wrapper" ref={wrapperRef}>
        <div className="solutionspage-layout">
          {/* Silky Smooth Rail Container */}
          <aside className="solutionspage-rail">
            <div
              className="rail-container"
              ref={railContainerRef}
              onClick={handleRailClick}
              style={{
                top: railTop > 0 ? `${railTop}px` : "calc(50vh - 18.5rem)",
                height:
                  railHeight > 0
                    ? `${railHeight}px`
                    : `calc(${(sections.length - 1) * 100}vh)`,
              }}
              role="slider"
              aria-label="Solutions scroll rail"
            >
              <div className="rail-line" />
              <div className="rail-fill" ref={railFillRef} />

              {/* Smooth Liquid Traveling Scroll Ball */}
              <div className="rail-ball" ref={railBallRef} />
            </div>
          </aside>

          {/* Vertical Stack: Each card has the SAME SIZE and points in SERIES */}
          <div className="solutions-cards-wrapper">
            {sections.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                  data-index={index}
                  className={`solution-slide ${isActive ? "active" : ""}`}
                >
                  <article
                    className="solution-content"
                    ref={(el) => {
                      cardContentRefs.current[index] = el;
                    }}
                  >
                    <div className="solution-card-header">
                      <span className="solution-tag">{item.title}</span>
                      <h2 className="solution-headline">{item.headline}</h2>
                      <p className="solution-description">{item.description}</p>
                      <div className="solution-divider" />
                    </div>

                    <div className="solution-card-body">
                      {/* All points in SERIES (vertical list) */}
                      <ul className="solution-points">
                        {item.valuePoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="solution-card-footer">
                      {item.emphasisLine && (
                        <blockquote className="solution-emphasis">
                          “{item.emphasisLine}”
                        </blockquote>
                      )}

                      <button
                        type="button"
                        className="solutionspage-button"
                        onClick={() =>
                          window.dispatchEvent(new Event("open-sidebar"))
                        }
                      >
                        Request a Demo →
                      </button>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

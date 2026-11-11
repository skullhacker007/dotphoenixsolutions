"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Container } from "./ui";
import {
  Globe,
  Smartphone,
  Layers,
  BrainCircuit,
  Megaphone,
  Building2,
  Bot,
  Database,
  TrendingUp,
} 
from "lucide-react";
import "./services.css";

interface ServiceItem {
  id: string;
  title: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PillarItem {
  id: string;
  code: string;
  badge: string;
  title: string;
  services: ServiceItem[];
}

interface ChannelPath {
  id: string;
  path: string;
  activeId: string;
}

interface SourceDot {
  id: string;
  x: number;
  y: number;
  active: boolean;
}

const TREE_DATA: PillarItem[] = [
  {
    id: "pillar-ai",
    code: "CLUSTER 01",
    badge: "COGNITIVE",
    title: "Agentic AI & Neural Systems",
    services: [
      {
        id: "svc-agents",
        title: "Agent-to-Agent Autonomous Swarms",
        tag: "AGENTIC",
        icon: Bot,
      },
      {
        id: "svc-rag",
        title: "Enterprise RAG & Vector Search",
        tag: "RAG & LLM",
        icon: Database,
      },
      {
        id: "svc-models",
        title: "Custom LLM & Neural Workflows",
        tag: "NEURAL MESH",
        icon: BrainCircuit,
      },
    ],
  },
  {
    id: "pillar-platforms",
    code: "CLUSTER 02",
    badge: "ENGINEERING",
    title: "Digital Platforms & Mobility",
    services: [
      {
        id: "svc-web",
        title: "Web Application Development",
        tag: "FULL-STACK",
        icon: Globe,
      },
      {
        id: "svc-mobile",
        title: "Mobile App Development",
        tag: "iOS & ANDROID",
        icon: Smartphone,
      },
      {
        id: "svc-saas",
        title: "Multi-Tenant SaaS Platforms",
        tag: "CLOUD SAAS",
        icon: Layers,
      },
    ],
  },
  {
    id: "pillar-operations",
    code: "CLUSTER 03",
    badge: "ENTERPRISE",
    title: "Enterprise Systems & Growth",
    services: [
      {
        id: "svc-payroll",
        title: "Payroll & Enterprise ERP Systems",
        tag: "ERP SUITE",
        icon: Building2,
      },
      {
        id: "svc-automation",
        title: "Intelligent Process Automation",
        tag: "WORKFLOW",
        icon: TrendingUp,
      },
      {
        id: "svc-marketing",
        title: "AI Digital Marketing & Growth",
        tag: "PREDICTIVE",
        icon: Megaphone,
      },
    ],
  },
];

const ALL_SERVICE_IDS = TREE_DATA.flatMap((p) => p.services.map((s) => s.id));

export default function Services() {
  const [autoActiveId, setAutoActiveId] = useState<string>(ALL_SERVICE_IDS[0]);
  const [userHoveredId, setUserHoveredId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [channels, setChannels] = useState<ChannelPath[]>([]);
  const [sourceDots, setSourceDots] = useState<SourceDot[]>([]);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const activeId = userHoveredId ?? autoActiveId;

  const treeLayoutRef = useRef<HTMLDivElement>(null);
  const parentNodeRef = useRef<HTMLDivElement>(null);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Automatic one-by-one sequential flow
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoActiveId((prev) => {
        const currIndex = ALL_SERVICE_IDS.indexOf(prev);
        const nextIndex = (currIndex + 1) % ALL_SERVICE_IDS.length;
        return ALL_SERVICE_IDS[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const updateConnections = useCallback(() => {
    if (!treeLayoutRef.current || !parentNodeRef.current) return;

    const layoutRect = treeLayoutRef.current.getBoundingClientRect();
    const parentRect = parentNodeRef.current.getBoundingClientRect();

    if (layoutRect.width < 50 || layoutRect.height < 50) return;

    const pLeft = parentRect.left - layoutRect.left;
    const pWidth = parentRect.width;
    const pCenterX = pLeft + pWidth / 2;
    const pStartY = parentRect.bottom - layoutRect.top;

    // Get the center X of the center pillar to ensure 100% vertical center line
    const centerPillarEl = pillarRefs.current[1];
    const centerPillarX = centerPillarEl
      ? centerPillarEl.getBoundingClientRect().left +
        centerPillarEl.getBoundingClientRect().width / 2 -
        layoutRect.left
      : pCenterX;

    // Symmetrical source point offsets on the bottom of parent card
    const sourceOffset = Math.min(pWidth * 0.28, 125);
    const sourceXs = [
      pCenterX - sourceOffset, // Left Cluster port
      centerPillarX,           // Center Cluster port (exact vertical alignment)
      pCenterX + sourceOffset, // Right Cluster port
    ];

    const newChannels: ChannelPath[] = [];
    const newSourceDots: SourceDot[] = [];

    TREE_DATA.forEach((pillar, pIdx) => {
      const pEl = pillarRefs.current[pIdx];
      if (!pEl) return;
      const pRect = pEl.getBoundingClientRect();
      const bTopX = pRect.left + pRect.width / 2 - layoutRect.left;
      const bTopY = pRect.top - layoutRect.top;
      const bBottomY = pRect.bottom - layoutRect.top;

      // Exact start point for this path
      const pStartX = sourceXs[pIdx];

      // Midpoint Y for crisp orthogonal right-angle step
      const dy = Math.max(bTopY - pStartY, 30);
      const midY = pStartY + dy * 0.48;

      let pillarChannelPath = "";

      if (pIdx === 0) {
        // Left Cluster: Down from bottom port -> 90° horizontal left -> 90° down into cluster
        pillarChannelPath = `M ${pStartX} ${pStartY} L ${pStartX} ${midY} L ${bTopX} ${midY} L ${bTopX} ${bTopY}`;
      } else if (pIdx === 1) {
        // Center Cluster: Direct pure vertical line down from center port
        pillarChannelPath = `M ${pStartX} ${pStartY} L ${bTopX} ${bTopY}`;
      } else {
        // Right Cluster: Down from bottom port -> 90° horizontal right -> 90° down into cluster
        pillarChannelPath = `M ${pStartX} ${pStartY} L ${pStartX} ${midY} L ${bTopX} ${midY} L ${bTopX} ${bTopY}`;
      }

      newChannels.push({
        id: `channel-root-${pillar.id}`,
        path: pillarChannelPath,
        activeId: pillar.id,
      });

      // Exact source dot rendered at (pStartX, pStartY) - 100% centered on path
      const isPillarActive =
        activeId === pillar.id ||
        pillar.services.some((s) => s.id === activeId);

      newSourceDots.push({
        id: `source-dot-${pillar.id}`,
        x: pStartX,
        y: pStartY,
        active: isPillarActive,
      });

      // Sequential straight vertical channels down through cards
      let prevBottomY = bBottomY;
      let prevX = bTopX;

      pillar.services.forEach((service) => {
        const cardEl = cardRefs.current[service.id];
        if (!cardEl) return;
        const cRect = cardEl.getBoundingClientRect();
        const cTopX = cRect.left + cRect.width / 2 - layoutRect.left;
        const cTopY = cRect.top - layoutRect.top;
        const cBottomY = cRect.bottom - layoutRect.top;

        newChannels.push({
          id: `channel-${pillar.id}-${service.id}`,
          path: `M ${prevX} ${prevBottomY} L ${cTopX} ${cTopY}`,
          activeId: service.id,
        });

        prevX = cTopX;
        prevBottomY = cBottomY;
      });
    });

    setChannels(newChannels);
    setSourceDots(newSourceDots);
    setSvgDimensions({ width: layoutRect.width, height: layoutRect.height });
    setMounted(true);
  }, [activeId]);

  useEffect(() => {
    updateConnections();

    const handleResize = () => updateConnections();
    window.addEventListener("resize", handleResize);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && treeLayoutRef.current) {
      observer = new ResizeObserver(() => updateConnections());
      observer.observe(treeLayoutRef.current);
    }

    const rafId = requestAnimationFrame(() => updateConnections());
    const timeoutId = setTimeout(updateConnections, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [updateConnections]);

  return (
    <section className="services-tree-section" id="services">
      <div className="services-grid-backdrop" aria-hidden="true" />

      <Container className="services-tree-container">
        <div className="services-tree-layout" ref={treeLayoutRef}>
          {/* Dynamic SVG Conduit Channels with Exact-Center Source Dots */}
          {mounted && svgDimensions.width > 0 && (
            <svg
              className="services-tree-svg"
              width={svgDimensions.width}
              height={svgDimensions.height}
              viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
              aria-hidden="true"
            >
              {channels.map((chan) => {
                const isChannelActive =
                  activeId === "parent" ||
                  activeId === chan.activeId ||
                  TREE_DATA.find((p) =>
                    p.services.some((s) => s.id === activeId)
                  )?.id === chan.activeId;

                return (
                  <g key={chan.id} className="service-channel-group">
                    <path
                      d={chan.path}
                      className={`service-channel-base ${isChannelActive ? "active" : ""}`}
                    />
                    <path
                      d={chan.path}
                      className={`service-channel-glow ${isChannelActive ? "active" : ""}`}
                    />
                  </g>
                );
              })}

              {/* Source Dots Centered Exactly on the Path Coordinates */}
              {sourceDots.map((dot) => (
                <circle
                  key={dot.id}
                  cx={dot.x}
                  cy={dot.y}
                  r={dot.active ? 4.5 : 3.5}
                  className={`service-source-dot ${dot.active ? "active" : ""}`}
                />
              ))}
            </svg>
          )}

          {/* PARENT ROOT NODE — MASTER COMMAND CENTER */}
          <div className="services-parent-node-wrap">
            <div
              ref={parentNodeRef}
              className={`services-parent-node ${activeId === "parent" ? "active" : ""}`}
              onMouseEnter={() => setUserHoveredId("parent")}
              onMouseLeave={() => setUserHoveredId(null)}
            >
              <div className="parent-node-main">
                <div className="parent-node-text-wrap">
                  <h3 className="parent-node-title">Dot Phoenix Services</h3>
                </div>
              </div>
            </div>
          </div>

          {/* 3 EQUALLY SPACED PILLARS WITH AUTOMATIC FLOW */}
          <div className="services-pillars-row">
            {TREE_DATA.map((pillar, pIdx) => {
              const isPillarActive =
                activeId === pillar.id ||
                pillar.services.some((s) => s.id === activeId);

              return (
                <div key={pillar.id} className="services-pillar-column">
                  {/* Pillar Gateway Card */}
                  <div
                    ref={(el) => {
                      pillarRefs.current[pIdx] = el;
                    }}
                    className={`services-pillar-hub ${isPillarActive ? "active" : ""}`}
                    onMouseEnter={() => setUserHoveredId(pillar.id)}
                    onMouseLeave={() => setUserHoveredId(null)}
                  >
                    <div className="pillar-hub-top">
                      <span className="pillar-hub-code">{pillar.code}</span>
                      <span className="pillar-hub-badge">{pillar.badge}</span>
                    </div>
                    <h4 className="pillar-hub-title">{pillar.title}</h4>
                  </div>

                  {/* Service Cards Stack */}
                  <div className="services-cards-stack">
                    {pillar.services.map((service) => {
                      const Icon = service.icon;
                      const isCardActive = activeId === service.id;

                      return (
                        <div
                          key={service.id}
                          ref={(el) => {
                            cardRefs.current[service.id] = el;
                          }}
                          className={`services-node-card ${isCardActive ? "active" : ""}`}
                          onMouseEnter={() => setUserHoveredId(service.id)}
                          onMouseLeave={() => setUserHoveredId(null)}
                        >
                          <div className="service-card-inner">
                            <Icon className="service-icon-svg" />

                            <div className="service-card-body">
                              <span className="service-single-line-title">
                                {service.title}
                              </span>
                            </div>

                            <span className="service-card-micro-tag">
                              {service.tag}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

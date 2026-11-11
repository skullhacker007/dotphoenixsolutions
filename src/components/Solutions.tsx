"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Card, Container, Text } from "./ui";
import "./solutions.css";

interface SolutionItem {
  id: string;
  title: string;
}

interface ConnectionPath {
  id: string;
  path: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  index: number;
}

const LEFT_SOLUTIONS: SolutionItem[] = [
  { id: "left-0", title: "Technology & Product Platforms" },
  { id: "left-1", title: "Business Process & Legal Solutions" },
  { id: "left-2", title: "Financial Services & FinTech Systems" },
  { id: "left-3", title: "Healthcare & Medical Systems" },
];

const RIGHT_SOLUTIONS: SolutionItem[] = [
  { id: "right-0", title: "Insurance Platforms" },
  { id: "right-1", title: "Retail & E-commerce Solutions" },
  { id: "right-2", title: "Manufacturing & Industrial Systems" },
  { id: "right-3", title: "Education, Training & Research Platforms" },
];

export default function Solutions() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [leftConnections, setLeftConnections] = useState<ConnectionPath[]>([]);
  const [rightConnections, setRightConnections] = useState<ConnectionPath[]>([]);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const [centerSockets, setCenterSockets] = useState<{
    left: { x: number; y: number };
    right: { x: number; y: number };
  } | null>(null);

  const layoutRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateConnections = useCallback(() => {
    if (!layoutRef.current || !centerRef.current) return;

    const layoutRect = layoutRef.current.getBoundingClientRect();
    const centerRect = centerRef.current.getBoundingClientRect();

    if (layoutRect.width < 50 || layoutRect.height < 50) return;

    // Anchor points on left and right edges of the center card
    const cLeftX = centerRect.left - layoutRect.left;
    const cLeftY = centerRect.top + centerRect.height / 2 - layoutRect.top;

    const cRightX = centerRect.right - layoutRect.left;
    const cRightY = centerRect.top + centerRect.height / 2 - layoutRect.top;

    // Calculate smooth S-curves for left items
    const newLeftPaths: ConnectionPath[] = [];
    LEFT_SOLUTIONS.forEach((item, index) => {
      const cardEl = leftRefs.current[index];
      if (!cardEl) return;
      const cardRect = cardEl.getBoundingClientRect();
      const cardX = cardRect.right - layoutRect.left;
      const cardY = cardRect.top + cardRect.height / 2 - layoutRect.top;

      const dx = Math.max(cLeftX - cardX, 30);
      const cp1X = cLeftX - dx * 0.5;
      const cp1Y = cLeftY;
      const cp2X = cardX + dx * 0.5;
      const cp2Y = cardY;

      newLeftPaths.push({
        id: item.id,
        path: `M ${cLeftX} ${cLeftY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${cardX} ${cardY}`,
        startX: cLeftX,
        startY: cLeftY,
        endX: cardX,
        endY: cardY,
        index,
      });
    });

    // Calculate smooth S-curves for right items
    const newRightPaths: ConnectionPath[] = [];
    RIGHT_SOLUTIONS.forEach((item, index) => {
      const cardEl = rightRefs.current[index];
      if (!cardEl) return;
      const cardRect = cardEl.getBoundingClientRect();
      const cardX = cardRect.left - layoutRect.left;
      const cardY = cardRect.top + cardRect.height / 2 - layoutRect.top;

      const dx = Math.max(cardX - cRightX, 30);
      const cp1X = cRightX + dx * 0.5;
      const cp1Y = cRightY;
      const cp2X = cardX - dx * 0.5;
      const cp2Y = cardY;

      newRightPaths.push({
        id: item.id,
        path: `M ${cRightX} ${cRightY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${cardX} ${cardY}`,
        startX: cRightX,
        startY: cRightY,
        endX: cardX,
        endY: cardY,
        index,
      });
    });

    setLeftConnections(newLeftPaths);
    setRightConnections(newRightPaths);
    setCenterSockets({
      left: { x: cLeftX, y: cLeftY },
      right: { x: cRightX, y: cRightY },
    });
    setSvgDimensions({ width: layoutRect.width, height: layoutRect.height });
    setMounted(true);
  }, []);

  useEffect(() => {
    updateConnections();

    const handleResize = () => {
      updateConnections();
    };

    window.addEventListener("resize", handleResize);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && layoutRef.current) {
      observer = new ResizeObserver(() => {
        updateConnections();
      });
      observer.observe(layoutRef.current);
    }

    const rafId = requestAnimationFrame(() => {
      updateConnections();
    });
    const timeoutId = setTimeout(updateConnections, 120);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [updateConnections]);

  return (
    <section className="solutions-section">
      <div className="solutions-ambient-glow" aria-hidden="true" />

      <Container className="solutions-container">
        <Text as="h2" className="solutions-title">
          Do More With Us
        </Text>

        <div className="solutions-layout" ref={layoutRef}>
          {/* Animated Centralized Connection Bus (SVG) */}
          {mounted && svgDimensions.width > 0 && (
            <svg
              className="solutions-connections-svg"
              width={svgDimensions.width}
              height={svgDimensions.height}
              viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
              aria-hidden="true"
            >
              <defs>
                <filter id="hubGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Left connection lines */}
              {leftConnections.map((conn) => {
                const isConnActive =
                  hoveredId === "center" || hoveredId === conn.id;
                return (
                  <g key={conn.id} className="solution-wire-group">
                    {/* Background glowing line */}
                    <path
                      d={conn.path}
                      className={`solution-wire-base ${
                        isConnActive ? "active" : ""
                      }`}
                    />
                    {/* Animated pulse flowing outward */}
                    <path
                      d={conn.path}
                      className={`solution-wire-pulse ${
                        isConnActive ? "active" : ""
                      }`}
                      style={{ animationDelay: `${conn.index * 0.35}s` }}
                    />
                    {/* Terminal connection dot on card edge */}
                    <circle
                      cx={conn.endX}
                      cy={conn.endY}
                      r={isConnActive ? 4 : 3}
                      className={`solution-terminal-dot ${
                        isConnActive ? "active" : ""
                      }`}
                    />
                  </g>
                );
              })}

              {/* Right connection lines */}
              {rightConnections.map((conn) => {
                const isConnActive =
                  hoveredId === "center" || hoveredId === conn.id;
                return (
                  <g key={conn.id} className="solution-wire-group">
                    {/* Background glowing line */}
                    <path
                      d={conn.path}
                      className={`solution-wire-base ${
                        isConnActive ? "active" : ""
                      }`}
                    />
                    {/* Animated pulse flowing outward */}
                    <path
                      d={conn.path}
                      className={`solution-wire-pulse ${
                        isConnActive ? "active" : ""
                      }`}
                      style={{ animationDelay: `${conn.index * 0.35}s` }}
                    />
                    {/* Terminal connection dot on card edge */}
                    <circle
                      cx={conn.endX}
                      cy={conn.endY}
                      r={isConnActive ? 4 : 3}
                      className={`solution-terminal-dot ${
                        isConnActive ? "active" : ""
                      }`}
                    />
                  </g>
                );
              })}

              {/* Center card socket nodes */}
              {centerSockets && (
                <>
                  <circle
                    cx={centerSockets.left.x}
                    cy={centerSockets.left.y}
                    r={hoveredId ? 5 : 4}
                    className={`solution-socket-dot ${
                      hoveredId ? "active" : ""
                    }`}
                  />
                  <circle
                    cx={centerSockets.right.x}
                    cy={centerSockets.right.y}
                    r={hoveredId ? 5 : 4}
                    className={`solution-socket-dot ${
                      hoveredId ? "active" : ""
                    }`}
                  />
                </>
              )}
            </svg>
          )}

          {/* Left Solution Cards */}
          <div className="solutions-list solutions-list-left">
            {LEFT_SOLUTIONS.map((item, idx) => {
              const isHovered = hoveredId === item.id;
              return (
                <Card
                  key={item.id}
                  ref={(el) => {
                    leftRefs.current[idx] = el;
                  }}
                  className={`solution-item ${isHovered ? "active" : ""}`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {item.title}
                </Card>
              );
            })}
          </div>

          {/* Central Subject: Dot Phoenix Solutions */}
          <div
            ref={centerRef}
            className={`solutions-center ${hoveredId === "center" ? "active" : ""}`}
            onMouseEnter={() => setHoveredId("center")}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Text as="h3">Dot Phoenix Solutions</Text>
          </div>

          {/* Right Solution Cards */}
          <div className="solutions-list solutions-list-right">
            {RIGHT_SOLUTIONS.map((item, idx) => {
              const isHovered = hoveredId === item.id;
              return (
                <Card
                  key={item.id}
                  ref={(el) => {
                    rightRefs.current[idx] = el;
                  }}
                  className={`solution-item ${isHovered ? "active" : ""}`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {item.title}
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

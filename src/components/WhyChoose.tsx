"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { Text, Container } from "./ui";
import "./why-choose.css";

const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });

export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState<[number, number, number]>([0, 0, 0]);

  const animationRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const targets = [500, 7, 9];
    const duration = 900;

    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;

      const progress = Math.min((timestamp - startRef.current) / duration, 1);

      setStats([
        Math.round(targets[0] * progress),
        Math.round(targets[1] * progress),
        Math.round(targets[2] * progress),
      ]);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        startRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="why-section"
      aria-labelledby="why-choose-title"
    >
      {visible &&
        typeof window !== "undefined" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches && (
          <div className="particles-bg" aria-hidden="true">
            <Particles
              init={particlesInit}
              options={{
                fullScreen: { enable: false },
                fpsLimit: 30,
                detectRetina: true,
                particles: {
                  number: { value: 40 },
                  color: { value: "#ffffff" },
                  opacity: { value: 0.25 },
                  size: { value: 2 },
                  move: { enable: true, speed: 0.2 },
                },
              }}
            />
          </div>
        )}

      <Container>
        <h1 id="why-choose-title">
          <Text as="span">Your One-Stop Solution</Text>
        </h1>

        <Text className="why-description">
          Dot Phoenix Solutions is an AI-driven Digital Automation platform that
          helps organizations execute Digital Transformation by automating,
          optimizing, and scaling critical digital operations.
        </Text>

        <div className="why-actions">
          <span className="why-action-text">
            We’re here to help — reach out anytime{" "}
            <a
              href="#"
              className="why-action-link"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new Event("open-sidebar"));
              }}
            >
              Connect with Experts
            </a>
          </span>
        </div>

        <div className="why-grid">
          <div className={`why-stats reveal ${visible ? "visible" : ""}`}>
            <span className="trust-line">
              Trusted by startups and enterprises worldwide.
            </span>

            <dl className="stats-grid">
              <div className="stat-card">
                <dt className="stat-label">Successful Projects Delivered</dt>
                <dd className="stat-number">{stats[0]}+</dd>
              </div>

              <div className="stat-card">
                <dt className="stat-label">Countries Served Globally</dt>
                <dd className="stat-number">{stats[1]}+</dd>
              </div>

              <div className="stat-card">
                <dt className="stat-label">Years of Industry Experience</dt>
                <dd className="stat-number">{stats[2]}+</dd>
              </div>
            </dl>
          </div>

          <div
            className={`why-left reveal ${visible ? "visible" : ""}`}
            role="group"
            aria-label="Key advantages"
          >
            <div className="why-card">
              <span className="index">01</span>
              <h2>
                Uncompromised
                <br />
                Quality
              </h2>
              <p>
                High-quality solutions built with precision and best practices.
              </p>
            </div>

            <div className="why-card">
              <span className="index">02</span>
              <h2>
                Cost-Effective
                <br />
                Solutions
              </h2>
              <p>
                Smart automation that reduces cost without sacrificing results.
              </p>
            </div>

            <div className="why-card">
              <span className="index">03</span>
              <h2>
                Scalable
                <br />
                Architecture
              </h2>
              <p>Solutions designed to grow seamlessly with your business.</p>
            </div>

            <div className="why-card">
              <span className="index">04</span>
              <h2>
                Faster
                <br />
                Time-to-Market
              </h2>
              <p>Streamlined execution for quicker deployment and impact.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

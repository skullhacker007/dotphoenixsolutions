"use client";

import { ReactNode } from "react";
import "./research.css";

import GenerativeDemo from "@/components/research/GenerativeDemo";
import AgentsDemo from "@/components/research/AgentsDemo";
import AIOsDemo from "@/components/research/AIOsDemo";

type ResearchVariant = "generative" | "agents" | "os";

interface ResearchBlockProps {
  title: ReactNode;
  description: string;
  points: string[];
  variant: ResearchVariant;
}

export default function ResearchClient() {
  return (
    <main className="research-page">
      <section className="research-hero">
        <div className="research-hero-content">
          <h1 className="research-title fade-in-left">
            Researching the Foundations of
            <br />
            <span className="highlight-words">
              <span className="word">Networked</span>{" "}
              <span className="word">Artificial</span>{" "}
              <span className="word">Versatile</span>{" "}
              <span className="word">Intelligence</span>
            </span>
          </h1>

          <p className="research-subtitle fade-in-right">
            We conduct systems-level research in artificial intelligence,
            spanning autonomous agent networks, generative reasoning
            architectures, and AI-native operating systems engineered close to
            the kernel.
          </p>
        </div>
      </section>

      <section className="research-sections">
        <ResearchBlock
          title={<span className="navi-title">Generative AI</span>}
          description="A generative intelligence platform designed for reasoning, adaptation, and real-world execution."
          points={[
            "LLM orchestration and reasoning pipelines",
            "Retrieval-augmented generation (RAG)",
            "Evaluation, alignment, and safety",
            "Multi-modal intelligence systems",
          ]}
          variant="generative"
        />

        <ResearchBlock
          title="AI Agents"
          description="Autonomous agents that collaborate, reason, and execute over long horizons."
          points={[
            "Multi-agent coordination protocols",
            "Autonomous planning and delegation",
            "Emergent collective intelligence",
            "Resilient communication models",
          ]}
          variant="agents"
        />

        <ResearchBlock
          title="AI Operating System"
          description="AI-native operating systems with intelligence embedded at execution level."
          points={[
            "AI-aware process scheduling",
            "Secure AI execution environments",
            "System-level intelligence primitives",
            "Human-AI co-processing models",
          ]}
          variant="os"
        />
      </section>
    </main>
  );
}

function ResearchBlock({
  title,
  description,
  points,
  variant,
}: ResearchBlockProps) {
  return (
    <div className="research-block">
      <div className="research-text">
        <h2>{title}</h2>

        <p className="research-desc">{description}</p>

        <ul className="research-points">
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>

        <div className="research-actions">
          <button
            className="research-btn"
            onClick={() => window.dispatchEvent(new Event("open-sidebar"))}
          >
            Explore Platform →
          </button>
        </div>
      </div>

      <div className="research-visual">
        <div className="monitor-frame">
          <div className="monitor-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="window-title">NAVI / System Diagnostics</span>
          </div>

          <div className="monitor-content">
            {variant === "generative" && <GenerativeDemo />}
            {variant === "agents" && <AgentsDemo />}
            {variant === "os" && <AIOsDemo />}
          </div>
        </div>
      </div>
    </div>
  );
}

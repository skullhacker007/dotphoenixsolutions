"use client";

import { useState } from "react";
import { Container, Text } from "./ui";
import {
  Cpu,
  Zap,
  ArrowUpRight,
  Sparkles,
  Bot,
  Layers,
  Database,
  Lock,
  Eye,
  Activity,
  Workflow,
  Radio,
} from "lucide-react";
import "./why-choose.css";

interface GunshotProject {
  id: string;
  code: string;
  title: string;
  category: string;
  metric: string;
  metricLabel: string;
  color: string;
  icon: typeof Cpu;
  bullets: string[];
  stack: string[];
}

const AI_PROJECTS: GunshotProject[] = [
  {
    id: "agents",
    code: "ARCH-01",
    title: "Autonomous Multi-Agent Swarms",
    category: "AGENTIC WORKFLOWS",
    metric: "99.4%",
    metricLabel: "Execution Accuracy",
    color: "#00f2fe",
    icon: Bot,
    bullets: [
      "Self-orchestrating task agents with recursive reasoning loops",
      "Sandboxed Python code execution & dynamic tool-calling",
      "Replaces brittle RPA scripts with adaptive cognitive swarms",
    ],
    stack: ["LangGraph", "DeepSeek-R1", "Claude 3.5", "DSPy"],
  },
  {
    id: "graphrag",
    code: "ARCH-02",
    title: "Enterprise GraphRAG & Vector Mesh",
    category: "ENTERPRISE SEARCH",
    metric: "0%",
    metricLabel: "Hallucination Rate",
    color: "#38bdf8",
    icon: Database,
    bullets: [
      "Hybrid vector search united with Neo4j entity knowledge graphs",
      "Mathematically verifiable source citations across internal silos",
      "Sub-80ms contextual retrieval over multi-million document repos",
    ],
    stack: ["Neo4j", "Qdrant", "ColBERT v2", "Hybrid Search"],
  },
  {
    id: "slm",
    code: "ARCH-03",
    title: "Domain-Adapted Private SLMs",
    category: "MODEL DISTILLATION",
    metric: "70%+",
    metricLabel: "Cloud Cost Cut",
    color: "#10b981",
    icon: Cpu,
    bullets: [
      "Bespoke models distilled from frontier weights & fine-tuned via LoRA/DPO",
      "100% hosted in private client VPC enclaves with zero external leakage",
      "Outperforms generalized commercial APIs on proprietary business logic",
    ],
    stack: ["Llama 3.3", "Mistral Nemo", "QLoRA", "vLLM"],
  },
  {
    id: "vllm",
    code: "ARCH-04",
    title: "Sub-Millisecond vLLM Inference",
    category: "INFERENCE OPTIMIZATION",
    metric: "< 18ms",
    metricLabel: "Time-to-First-Token",
    color: "#f59e0b",
    icon: Zap,
    bullets: [
      "High-throughput TensorRT-LLM & FP8/AWQ quantization engines",
      "Autoscaling Kubernetes clusters with continuous GPU batching",
      "Cuts cloud inference infrastructure spend by more than half",
    ],
    stack: ["vLLM", "TensorRT", "Triton", "Ray Serve"],
  },
  {
    id: "vision",
    code: "ARCH-05",
    title: "Real-Time Multimodal & Edge Vision",
    category: "COMPUTER VISION",
    metric: "99.85%",
    metricLabel: "Defect Catch Rate",
    color: "#ec4899",
    icon: Eye,
    bullets: [
      "Quantized Vision Transformers (ViT) compiled for NVIDIA Jetson rigs",
      "Sub-14ms micro-defect inspection & spatial safety analytics",
      "Continuous multi-camera RTSP stream inference at the edge",
    ],
    stack: ["ViT", "YOLO-World", "DeepStream", "ONNX"],
  },
  {
    id: "reasoning",
    code: "ARCH-06",
    title: "DeepSeek-R1 & Reasoning Engines",
    category: "COGNITIVE REASONING",
    metric: "14x",
    metricLabel: "Analysis Velocity",
    color: "#8b5cf6",
    icon: Workflow,
    bullets: [
      "Multi-step chain-of-thought verification for complex logic audits",
      "Autonomous financial reconciliation, code review & contract reasoning",
      "Fine-tuned reasoning distillation for regulated industry compliance",
    ],
    stack: ["DeepSeek-R1", "Claude 3.5 Sonnet", "Function Calling"],
  },
  {
    id: "security",
    code: "ARCH-07",
    title: "Deterministic AI Guardrails",
    category: "ENTERPRISE SECURITY",
    metric: "100%",
    metricLabel: "Air-Gapped Isolation",
    color: "#14b8a6",
    icon: Lock,
    bullets: [
      "Constitutional AI boundaries preventing jailbreaks & data exfiltration",
      "SOC2, HIPAA & GDPR-compliant client-dedicated private VPCs",
      "Zero prompt leakage, strict attribute-level ACLs & full audit logs",
    ],
    stack: ["NeMo Guardrails", "DeepEval", "DSPy", "Private VPC"],
  },
  {
    id: "decision",
    code: "ARCH-08",
    title: "Streaming Predictive Decision Cores",
    category: "EVENT-DRIVEN AI",
    metric: "< 6ms",
    metricLabel: "Scoring Latency",
    color: "#f43f5e",
    icon: Activity,
    bullets: [
      "Temporal Graph Neural Networks ingesting continuous Kafka streams",
      "Real-time operational anomaly detection with automated rollback triggers",
      "Continuous self-learning decision intelligence without downtime",
    ],
    stack: ["Temporal GNN", "Apache Kafka", "Feast Store", "CUDA"],
  },
];

export default function WhyChoose() {
  const [activeProject, setActiveProject] = useState<GunshotProject>(AI_PROJECTS[0]);

  const handleOpenContact = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-sidebar"));
    }
  };

  return (
    <section className="why-ai-hud-section">
      {/* Background Cybernetic Ambient Glow & Grid */}
      <div className="why-ai-hud-bg" aria-hidden="true">
        <div className="why-ai-hud-mesh" />
        <div className="why-ai-hud-glow orb-left" />
        <div className="why-ai-hud-glow orb-right" />
      </div>

      <Container className="why-ai-hud-container">
        {/* Section Header with High-Tech Status Pill */}
        <header className="why-ai-hud-header">
          <div className="why-ai-hud-pill">
            <Radio className="why-ai-hud-pill-icon" />
            <span>AI STARTUP LAB // PRODUCTION BLUEPRINTS</span>
            <span className="why-ai-hud-pill-live" />
          </div>

          <Text as="h2" className="why-ai-hud-title">
            Enterprise AI Project Matrix
          </Text>

          <p className="why-ai-hud-subtitle">
            We are an applied AI startup. We engineer, fine-tune, and deploy bespoke
            production-grade AI systems for B2B enterprises — built for speed, scale, and
            absolute data sovereignty.
          </p>
        </header>

        {/* 8-Card High-Tech Gunshot Project Grid */}
        <div className="why-ai-hud-grid" role="list">
          {AI_PROJECTS.map((project) => {
            const Icon = project.icon;
            const isSelected = activeProject.id === project.id;

            return (
              <div
                key={project.id}
                role="listitem"
                tabIndex={0}
                className={`why-ai-hud-card ${isSelected ? "selected" : ""}`}
                style={{ "--card-accent": project.color } as React.CSSProperties}
                onMouseEnter={() => setActiveProject(project)}
                onClick={handleOpenContact}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleOpenContact();
                  }
                }}
              >
                {/* HUD Crosshairs in 4 corners */}
                <span className="hud-corner top-left" aria-hidden="true" />
                <span className="hud-corner top-right" aria-hidden="true" />
                <span className="hud-corner bottom-left" aria-hidden="true" />
                <span className="hud-corner bottom-right" aria-hidden="true" />

                {/* Card Top Bar: Code + Category + Metric */}
                <div className="why-ai-card-top">
                  <div className="why-ai-card-id-group">
                    <span className="why-ai-card-code">{project.code}</span>
                    <span className="why-ai-card-cat">{project.category}</span>
                  </div>

                  <div className="why-ai-card-metric-badge">
                    <span className="why-ai-metric-num">{project.metric}</span>
                    <span className="why-ai-metric-lbl">{project.metricLabel}</span>
                  </div>
                </div>

                {/* Card Title with Icon */}
                <div className="why-ai-card-title-row">
                  <div className="why-ai-card-icon-box">
                    <Icon className="why-ai-card-icon" />
                  </div>
                  <h3 className="why-ai-card-heading">{project.title}</h3>
                </div>

                {/* Gunshot Bullet Points */}
                <ul className="why-ai-gunshot-list">
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="why-ai-gunshot-item">
                      <span className="why-ai-bullet-point" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Card Footer: Tech Stack Chips + Action Arrow */}
                <div className="why-ai-card-footer">
                  <div className="why-ai-stack-chips">
                    {project.stack.map((tech, tIdx) => (
                      <span key={tIdx} className="why-ai-stack-chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="why-ai-card-cta-arrow" aria-label="Deploy Project">
                    <ArrowUpRight className="why-ai-arrow-icon" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Live Telemetry / Deployment Status Bar */}
        <div className="why-ai-telemetry-bar">
          <div className="why-ai-telemetry-left">
            <span className="why-ai-telemetry-radar" />
            <div className="why-ai-telemetry-info">
              <span className="why-ai-telemetry-tag">ACTIVE ARCHITECTURE</span>
              <span className="why-ai-telemetry-name">{activeProject.title}</span>
            </div>
          </div>

          <div className="why-ai-telemetry-center">
            <div className="why-ai-telemetry-stat">
              <span className="stat-label">DEPLOYMENT TIME</span>
              <span className="stat-val">2 – 4 WEEKS</span>
            </div>
            <div className="why-ai-telemetry-stat">
              <span className="stat-label">DATA SECURITY</span>
              <span className="stat-val">100% PRIVATE VPC</span>
            </div>
            <div className="why-ai-telemetry-stat">
              <span className="stat-label">AUDIT RIG</span>
              <span className="stat-val">ZERO DATA LEAKAGE</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenContact}
            className="why-ai-telemetry-btn"
          >
            <span>Launch This Architecture</span>
            <Sparkles className="why-ai-btn-sparkle" />
          </button>
        </div>
      </Container>
    </section>
  );
}

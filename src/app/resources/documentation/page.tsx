import type { Metadata } from "next";
import "./docs.css";

export const metadata: Metadata = {
  title: "Documentation & Architecture | Dot Phoenix Solutions",
  description:
    "Explore Dot Phoenix Solutions technical documentation, core architecture, platform capabilities, services, and operational dashboards.",
  alternates: {
    canonical: "/resources/documentation",
  },
  openGraph: {
    title: "Documentation & Architecture | Dot Phoenix Solutions",
    description:
      "Explore Dot Phoenix Solutions technical documentation, core architecture, platform capabilities, services, and operational dashboards.",
    url: "/resources/documentation",
  },
};

export default function DocumentationPage() {
  return (
    <main className="doc-wrapper">
      {/* =====================
         HEADER
      ====================== */}
      <header className="doc-header">
        <h1 className="fade-in-left">Documentation</h1>
        <p>
          Dot Phoenix Solutions is an AI-driven digital automation platform that
          enables organizations to design, modernize, automate, and scale
          digital operations with speed, intelligence, and reliability.
        </p>
      </header>

      {/* =====================
         AI DRIVEN
      ====================== */}
      <section className="doc-section">
        <h2>AI-Driven Digital Automation</h2>
        <p>
          Dot Phoenix Solutions applies Artificial Intelligence to automate and
          scale digital operations, enabling organizations to move seamlessly
          from idea to deployment with precision, speed, and intelligence.
        </p>
      </section>

      {/* =====================
         PLATFORM CAPABILITIES
      ====================== */}
      <section className="doc-section">
        <h2>Platform Capabilities</h2>
        <ul>
          <li>Workflow automation across digital systems</li>
          <li>AI-driven analytics and decision intelligence</li>
          <li>Role-based access control and permissions</li>
          <li>Secure data processing and system integrations</li>
          <li>Cloud-native, scalable architecture</li>
        </ul>
      </section>

      {/* =====================
         SERVICES
      ====================== */}
      <section className="doc-section">
        <h2>Dot Phoenix Services</h2>

        <h3>Web Application Development</h3>
        <p>
          Scalable, secure, and high-performance web platforms tailored to meet
          modern business requirements.
        </p>

        <h3>Mobile Application Development</h3>
        <p>
          Native and cross-platform mobile applications designed for usability,
          performance, and long-term growth.
        </p>

        <h3>SaaS Product Development</h3>
        <p>
          End-to-end SaaS solutions, from system architecture to cloud
          deployment, built for scale, resilience, and reliability.
        </p>

        <h3>AI & Intelligent Automation</h3>
        <p>
          AI-powered systems that analyze data, automate workflows, and enable
          intelligent decision-making across digital operations.
        </p>

        <h3>Digital Marketing</h3>
        <p>
          Data-driven digital marketing strategies integrated with automation to
          deliver measurable and sustainable business growth.
        </p>

        <h3>Payroll & Enterprise Systems</h3>
        <p>
          Robust payroll and enterprise platforms designed with compliance,
          security, and operational efficiency at scale.
        </p>
      </section>

      {/* =====================
         DASHBOARDS
      ====================== */}
      <section className="doc-section">
        <h2>Intelligent Dashboards for Modern Digital Operations</h2>
        <p>
          Dot Phoenix enables organizations to visualize, automate, and scale
          their digital operations using secure, enterprise-grade intelligent
          dashboards.
        </p>
        <ul>
          <li>Real-time operational and business insights</li>
          <li>AI-driven automation workflows</li>
          <li>Secure, enterprise-ready architecture</li>
        </ul>
      </section>

      {/* =====================
         TECHNOLOGY STACK
      ====================== */}
      <section className="doc-section">
        <h2>Technology Stack</h2>
        <ul>
          <li>Frontend: React, Next.js</li>
          <li>Backend: Node.js, scalable APIs</li>
          <li>AI & Automation: ML pipelines, data processing systems</li>
          <li>Cloud & DevOps: CI/CD pipelines, containerized deployments</li>
          <li>
            Security: Authentication, authorization, compliance-ready design
          </li>
        </ul>
      </section>

      {/* =====================
         SECURITY & COMPLIANCE
      ====================== */}
      <section className="doc-section">
        <h2>Security & Compliance</h2>
        <p>
          Dot Phoenix Solutions follows industry best practices to ensure data
          protection, system integrity, and regulatory compliance.
        </p>
        <ul>
          <li>Data encryption at rest and in transit</li>
          <li>Secure authentication and authorization mechanisms</li>
          <li>Role-based access control</li>
          <li>Compliance-ready enterprise architecture</li>
        </ul>
      </section>

      {/* =====================
         SUPPORT & MAINTENANCE (ADDED)
      ====================== */}
      <section className="doc-section">
        <h2>Support & Maintenance</h2>
        <ul>
          <li>Continuous monitoring and proactive system health checks</li>
          <li>Performance optimization and reliability improvements</li>
          <li>Feature enhancements and platform upgrades</li>
          <li>Long-term operational support and maintenance</li>
        </ul>
      </section>

      {/* =====================
         ENGAGEMENT MODEL
      ====================== */}
      <section className="doc-section">
        <h2>Engagement Model</h2>
        <ul>
          <li>Discovery & requirements analysis</li>
          <li>Architecture & solution design</li>
          <li>Development & intelligent automation</li>
          <li>Testing & deployment</li>
          <li>Ongoing support & continuous optimization</li>
        </ul>
      </section>

      {/* =====================
         INDUSTRIES
      ====================== */}
      <section className="doc-section">
        <h2>Industries & Domains We Serve</h2>
        <ul>
          <li>Technology & Product Platforms</li>
          <li>Business Process & Legal Solutions</li>
          <li>Financial Services & FinTech Systems</li>
          <li>Healthcare & Medical Systems</li>
          <li>Insurance Platforms</li>
          <li>Retail & E-commerce Solutions</li>
          <li>Manufacturing & Industrial Systems</li>
          <li>Education, Training & Research Platforms</li>
        </ul>
      </section>

      {/* =====================
         VALUE
      ====================== */}
      <section className="doc-section">
        <h2>Your One-Stop Digital Transformation Partner</h2>
        <p>
          Dot Phoenix Solutions helps organizations execute digital
          transformation by automating, optimizing, and scaling critical digital
          operations using AI-driven platforms.
        </p>
      </section>

      {/* =====================
         EXPERIENCE
      ====================== */}
      <section className="doc-section">
        <h2>Proven Experience</h2>
        <ul>
          <li>500+ successful projects delivered</li>
          <li>7+ countries served globally</li>
          <li>9+ years of industry experience</li>
        </ul>
      </section>

      {/* =====================
         WHY CHOOSE
      ====================== */}
      <section className="doc-section">
        <h2>Why Choose Dot Phoenix Solutions</h2>

        <h3>Uncompromised Quality</h3>
        <p>
          High-quality solutions engineered with precision, security, and best
          industry practices.
        </p>

        <h3>Cost-Effective Solutions</h3>
        <p>
          Intelligent automation that reduces operational cost without
          sacrificing performance or outcomes.
        </p>

        <h3>Scalable Architecture</h3>
        <p>Solutions designed to scale seamlessly as your business grows.</p>

        <h3>Faster Time-to-Market</h3>
        <p>
          Streamlined execution and deployment processes that accelerate
          delivery and business impact.
        </p>
      </section>
    </main>
  );
}

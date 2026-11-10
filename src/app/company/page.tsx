import type { Metadata } from "next";
import Image from "next/image";
import {
  Quote,
  ShieldCheck,
  TrendingUp,
  Globe,
  Heart,
  Wallet,
  Stethoscope,
  Utensils,
  Train,
  Calendar,
  GraduationCap,
  Baby,
  Eye,
  Target,
  Compass,
  LucideIcon,
} from "lucide-react";
import WhyChoose from "@/components/WhyChoose";

import "./company.css";

export const metadata: Metadata = {
  title: "About Our Company | Dot Phoenix Solutions",
  description:
    "Learn about Dot Phoenix Solutions: our mission, leadership, core values, and vision for AI-driven digital automation.",
  alternates: {
    canonical: "/company",
  },
  openGraph: {
    title: "About Dot Phoenix Solutions | AI-Driven Automation",
    description:
      "Leading the future of intelligent automation. Learn about our vision, values, and enterprise technology services.",
    url: "/company",
  },
};

type ValueProps = {
  icon: LucideIcon;
  title: string;
  text: string;
};

type ReviewProps = {
  quote: string;
  author: string;
  industry: string;
};

type BenefitProps = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export default function CompanyPage() {
  return (
    <main className="company">
      <section className="company-story company-intro">
        <div className="company-container">
          <div className="company-intro-grid">
            {/* LEFT */}
            <div className="company-intro-text">
              <h2 className="fade-in-left">
                Leading the Future of <br />
                Intelligent Automation
              </h2>

              <p className="fade-in-left">
                We build intelligent automation platforms that redefine
                efficiency, reliability, and scale. Designed for high-impact
                environments, our systems eliminate operational friction, unlock
                continuous innovation, and empower businesses to move faster
                with absolute confidence.
              </p>
            </div>

            <div className="company-intro-image">
              <div className="phoenix-image-wrapper">
                <Image
                  src="/phoenixlogo.svg"
                  alt="Dot Phoenix Solutions logo"
                  fill
                  priority
                  sizes="(max-width: 48rem) 11.25rem, 20rem"
                  className="phoenix-image"
                />
              </div>

              <h2 className="phoenix-title fade-in-right">
                Dot Phoenix Solutions
              </h2>
              <p className="phoenix-tagline fade-in-right">
                Powering the World’s Digital Evolution
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="vmv-section">
        <div className="company-container">
          <h2 className="center">The Foundation of Everything We Build</h2>
          <p className="section-subtitle center">
            The principles that shape our thinking, engineering, and long-term
            partnerships.
          </p>

          <div className="vmv-grid">
            <article className="vmv-card">
              <Eye className="vmv-icon" />
              <h3>Vision</h3>
              <p>
                To be a globally trusted technology partner, enabling
                organizations to build resilient digital systems that evolve
                alongside industry demands.
              </p>
            </article>

            <article className="vmv-card">
              <Target className="vmv-icon" />
              <h3>Mission</h3>
              <p>
                To design and deliver secure, scalable, and thoughtfully
                engineered platforms by combining technical excellence with deep
                business understanding.
              </p>
            </article>

            <article className="vmv-card">
              <Compass className="vmv-icon" />
              <h3>Values</h3>
              <p>
                We believe great engineering is built on excellence,
                accountability, and transparency paired with deep respect for
                people, time, and outcomes.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="company-offer">
        <div className="company-container">
          <h2 className="center">What Sets Us Apart</h2>
          <p className="section-subtitle center">
            Outcome-driven, accountable, and focused on long-term value
          </p>
          <div className="offer-grid">
            <Value
              icon={ShieldCheck}
              title="Reliability by Design"
              text="Systems engineered for stability, security, and predictable performance under real operational pressure."
            />
            <Value
              icon={TrendingUp}
              title="Future-Ready Thinking"
              text="Architectures and processes designed to support growth, change, and innovation over time."
            />
            <Value
              icon={Globe}
              title="Global Perspective"
              text="Experience delivering solutions across regions, industries, and regulatory environments."
            />
          </div>
        </div>
      </section>

      <section className="company-reviews">
        <div className="company-container">
          <h2 className="center">Client Perspectives</h2>
          <p className="section-subtitle center">
            Built on trust and long-term partnerships, driven by shared success.
          </p>
          <div className="reviews-grid">
            <Review
              quote="The team approached our platform with a clear understanding of scale, risk, and long-term maintainability."
              author="Technology Director"
              industry="Financial Services"
            />
            <Review
              quote="Communication was clear, delivery was disciplined, and the final system exceeded our expectations."
              author="Product Lead"
              industry="SaaS Platform"
            />
            <Review
              quote="A dependable partner who understands how technology supports real operational goals."
              author="Operations Head"
              industry="Healthcare Organization"
            />
          </div>
        </div>
      </section>

      <section className="company-benefits">
        <div className="company-container">
          <h2 className="center">Our Culture & Benefits</h2>
          <p className="section-subtitle center">
            Sustainable teams are the foundation of sustainable systems.
          </p>

          <div className="benefits-grid">
            <Benefit
              icon={Wallet}
              title="Financial Security"
              text="Retirement planning support with company-backed contribution programs."
            />
            <Benefit
              icon={Stethoscope}
              title="Health Coverage"
              text="Comprehensive healthcare options supporting employees and their families."
            />
            <Benefit
              icon={Utensils}
              title="Daily Wellness"
              text="Office-supported meals designed to promote convenience and well-being."
            />
            <Benefit
              icon={Train}
              title="Commute Support"
              text="Monthly assistance to help offset commuting expenses."
            />
            <Benefit
              icon={Calendar}
              title="Flexible Time Off"
              text="Generous paid time off policies that respect personal time and balance."
            />
            <Benefit
              icon={GraduationCap}
              title="Continuous Learning"
              text="Ongoing support for professional development and skill advancement."
            />
            <Benefit
              icon={Baby}
              title="Family Support"
              text="Paid parental leave programs supporting growing families."
            />
            <Benefit
              icon={Heart}
              title="People-First Culture"
              text="An environment built on respect, inclusion, and shared ownership."
            />
          </div>
        </div>
      </section>
      <div>
        <WhyChoose></WhyChoose>
      </div>
    </main>
  );
}

function Value({ icon: Icon, title, text }: ValueProps) {
  return (
    <div className="offer-card">
      <Icon className="offer-icon" />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Review({ quote, author, industry }: ReviewProps) {
  return (
    <div className="review-card">
      <Quote className="review-icon" />
      <p className="review-text">“{quote}”</p>
      <div className="review-author">
        <span className="author-name">{author}</span>
        <span className="author-separator">·</span>
        <span className="author-industry">{industry}</span>
      </div>
    </div>
  );
}

function Benefit({ icon: Icon, title, text }: BenefitProps) {
  return (
    <div className="benefit-card">
      <Icon className="benefit-icon" />
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

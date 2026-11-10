"use client";

import { useEffect } from "react";

export default function CareersClient() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -80px 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="careers-wrapper">
      <header className="careers-header reveal fade-up">
        <h1>Careers at Dot Phoenix Solutions</h1>
        <p>
          Dot Phoenix Solutions is growing—join us to grow your career while
          building impactful digital ecosystems for the world.
        </p>
        <p className="careers-sub">
          We welcome experienced professionals, fresh graduates, and interns who
          are passionate about technology, innovation, and building real-world
          digital products in a collaborative environment.
        </p>
      </header>

      <section className="careers-list">
        <article className="career-role reveal slide-left">
          <h2>Web Application Developer</h2>
          <p className="role-desc">
            Design, build, and maintain scalable web applications that power
            modern digital experiences.
          </p>

          <h3>Key Responsibilities</h3>
          <ul>
            <li>Develop modern, responsive web applications</li>
            <li>Translate UI/UX designs into reusable components</li>
            <li>Integrate frontend with backend APIs</li>
            <li>Ensure performance, security, and scalability</li>
          </ul>

          <h3>Tools & Technologies</h3>
          <ul className="skills">
            <li>React</li>
            <li>TypeScript</li>
            <li>REST APIs</li>
          </ul>
        </article>

        <article className="career-role reveal slide-left">
          <h2>Mobile Application Developer</h2>
          <p className="role-desc">
            Build high-quality mobile applications for Android and iOS with
            strong focus on performance and usability.
          </p>

          <h3>Key Responsibilities</h3>
          <ul>
            <li>Develop native or cross-platform mobile apps</li>
            <li>Integrate apps with backend services</li>
            <li>Optimize performance and memory usage</li>
          </ul>

          <h3>Tools & Technologies</h3>
          <ul className="skills">
            <li>React Native</li>
            <li>Java</li>
            <li>Firebase</li>
          </ul>
        </article>

        <article className="career-role reveal slide-left">
          <h2>SaaS Product Engineer</h2>
          <p className="role-desc">
            Build and scale SaaS platforms used by global customers with
            reliability and performance in mind.
          </p>

          <h3>Key Responsibilities</h3>
          <ul>
            <li>Design scalable architectures</li>
            <li>Build backend services and APIs</li>
            <li>Ensure uptime and system reliability</li>
          </ul>

          <h3>Tools & Technologies</h3>
          <ul className="skills">
            <li>Next.js</li>
            <li>MySQL</li>
            <li>Highcharts</li>
          </ul>
        </article>

        <article className="career-role reveal slide-left">
          <h2>AI & Intelligent Automation Engineer</h2>
          <p className="role-desc">
            Design and implement AI-powered automation systems to solve
            real-world business problems.
          </p>

          <h3>Key Responsibilities</h3>
          <ul>
            <li>Develop AI automation pipelines</li>
            <li>Deploy ML models to production</li>
            <li>Monitor model performance</li>
          </ul>

          <h3>Tools & Technologies</h3>
          <ul className="skills">
            <li>Python</li>
            <li>PyTorch / LangChain</li>
            <li>LLM APIs & RAG</li>
          </ul>
        </article>

        <article className="career-role reveal slide-left">
          <h2>Digital Marketing Specialist</h2>
          <p className="role-desc">
            Drive growth through data-driven digital marketing strategies.
          </p>

          <h3>Key Responsibilities</h3>
          <ul>
            <li>Run SEO and paid campaigns</li>
            <li>Analyze performance metrics</li>
            <li>Optimize conversion funnels</li>
          </ul>

          <h3>Tools & Technologies</h3>
          <ul className="skills">
            <li>Google Analytics 4</li>
            <li>Meta & Google Ads</li>
            <li>SEO / SEMrush</li>
          </ul>
        </article>
      </section>

      <section className="careers-cta reveal fade-up">
        <div className="careers-cols">
          <div className="careers-col">
            <h2>Ready to Build the Future With Us?</h2>
          </div>

          <div className="careers-col careers-col-action">
            <p className="cta-inline">
              Send your resume to{" "}
              <a href="mailto:info@dotphoenixsolutions.com">
                info@dotphoenixsolutions.com
              </a>
            </p>
            <a
              href="mailto:info@dotphoenixsolutions.com"
              className="cta-button"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

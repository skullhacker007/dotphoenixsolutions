import Link from "next/link";
import Container from "@/components/ui/Container";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <Container>
        <div className="footer-container">
          <div className="footer-column">
            <h3>Dot Phoenix Solutions</h3>
            <p>
              Trusted Digital Transformation Partner Helping Global
              Organizations Design, Modernize, Optimize, and Scale Digital
              Solutions With Reliability &amp; Precision.
            </p>
          </div>

          <div className="footer-column">
            <h3>Services</h3>
            <ul>
              <li>
                <Link href="/services#web">Web &amp; App Development</Link>
              </li>
              <li>
                <Link href="/services#saas">SaaS Product Development</Link>
              </li>
              <li>
                <Link href="/services#enterprise">
                  Payroll &amp; Enterprise Systems
                </Link>
              </li>
              <li>
                <Link href="/services#ai">AI &amp; Intelligent Automation</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li>
                <Link href="/resources/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/resources/terms-and-conditions">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/resources/documentation">Documentation</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contact</h3>
            <ul className="footer-contact">
              <li>
                <span>Email:</span>{" "}
                <a href="mailto:info@dotphoenixsolutions.com">
                  info@dotphoenixsolutions.com
                </a>
              </li>
              <li>
                <span>Phone:</span>{" "}
                <a href="tel:+919346622679">+91 9346622679</a>
              </li>
              <li>
                <span>Address:</span>
                Tirupati, AP, India
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Dot Phoenix Solutions. All Rights
          Reserved.
        </div>
      </Container>
    </footer>
  );
}

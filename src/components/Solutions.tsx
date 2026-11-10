import Link from "next/link";
import { Card, Container, Text } from "./ui";
import "./solutions.css";

export default function Solutions() {
  return (
    <section className="solutions-section">
      <Container>
        <Text as="h2" className="solutions-title">
          Do More With Us
        </Text>

        <div className="solutions-layout">
          <div className="solutions-list">
            <Link href="/solutions" style={{ textDecoration: "none", color: "inherit" }}>
              <Card className="solution-item">
                Technology & Product Platforms
              </Card>
            </Link>
            <Link href="/solutions" style={{ textDecoration: "none", color: "inherit" }}>
              <Card className="solution-item">
                Business Process & Legal Solutions
              </Card>
            </Link>
            <Link href="/solutions" style={{ textDecoration: "none", color: "inherit" }}>
              <Card className="solution-item">
                Financial Services & FinTech Systems
              </Card>
            </Link>
            <Link href="/solutions" style={{ textDecoration: "none", color: "inherit" }}>
              <Card className="solution-item">Healthcare & Medical Systems</Card>
            </Link>
          </div>

          <div className="solutions-center">
            <Text as="h3">Dot Phoenix Solutions</Text>
          </div>

          <div className="solutions-list">
            <Link href="/solutions" style={{ textDecoration: "none", color: "inherit" }}>
              <Card className="solution-item">Insurance Platforms</Card>
            </Link>
            <Link href="/solutions" style={{ textDecoration: "none", color: "inherit" }}>
              <Card className="solution-item">Retail & E-commerce Solutions</Card>
            </Link>
            <Link href="/solutions" style={{ textDecoration: "none", color: "inherit" }}>
              <Card className="solution-item">
                Manufacturing & Industrial Systems
              </Card>
            </Link>
            <Link href="/solutions" style={{ textDecoration: "none", color: "inherit" }}>
              <Card className="solution-item">
                Education, Training & Research Platforms
              </Card>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

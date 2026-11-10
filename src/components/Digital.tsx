import { Card, Container, Text } from "./ui";
import {
  Search,
  MousePointerClick,
  Share2,
  Mail,
  Users,
  Star,
} from "lucide-react";
import "./digital.css";

export default function Digital() {
  return (
    <section className="digital-marketing-section">
      <Container>
        <Text as="h2" className="digital-marketing-title">
          Digital Marketing
        </Text>

        <div className="digital-marketing-grid">
          <Card className="digital-marketing-card">
            <div className="digital-marketing-row">
              <Search className="digital-marketing-icon" />
              <h3>Search Engine Optimization (SEO)</h3>
            </div>
            <p>
              We plan and execute strategic SEO initiatives that improve search
              visibility, keyword rankings, and site performance.
            </p>
          </Card>

          <Card className="digital-marketing-card">
            <div className="digital-marketing-row">
              <MousePointerClick className="digital-marketing-icon" />
              <h3>Pay-Per-Click Advertising (PPC)</h3>
            </div>
            <p>
              ROI-focused paid advertising campaigns designed with precise
              targeting, optimized bidding, and conversion tracking.
            </p>
          </Card>

          <Card className="digital-marketing-card">
            <div className="digital-marketing-row">
              <Share2 className="digital-marketing-icon" />
              <h3>Social Media Marketing</h3>
            </div>
            <p>
              Strategic social media content and campaigns built to increase
              engagement, consistency, and long-term brand trust.
            </p>
          </Card>

          <Card className="digital-marketing-card">
            <div className="digital-marketing-row">
              <Mail className="digital-marketing-icon" />
              <h3>Email Marketing</h3>
            </div>
            <p>
              Automated email marketing campaigns and lead nurturing workflows
              that improve retention and drive conversions.
            </p>
          </Card>

          <Card className="digital-marketing-card">
            <div className="digital-marketing-row">
              <Users className="digital-marketing-icon" />
              <h3>Affiliate Marketing</h3>
            </div>
            <p>
              Performance-driven affiliate marketing programs designed to scale
              reach, partnerships, revenue, and growth fast.
            </p>
          </Card>

          <Card className="digital-marketing-card">
            <div className="digital-marketing-row">
              <Star className="digital-marketing-icon" />
              <h3>Online Reputation Management</h3>
            </div>
            <p>
              Brand monitoring and review management strategies that strengthen
              credibility, trust, and online presence today.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}

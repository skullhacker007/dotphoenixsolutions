"use client";

import { useSyncExternalStore } from "react";
import { Button, Container } from "./ui";
import "./process.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { dashboardChartData } from "./ui/chartData";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Process() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  return (
    <section className="process-section">
      <Container>
        <div className="process-inner">
          <div className="process-content">
            <h2 className="process-heading">
              Intelligent Dashboards for <br />
              Modern Digital Operations
            </h2>

            <p className="process-description">
              Dot Phoenix helps organizations visualize, automate, and scale
              their digital operations using intelligent, enterprise-grade
              dashboards.
            </p>

            <ul className="process-points">
              <li>Real-time operational insights</li>
              <li>AI-driven automation workflows</li>
              <li>Secure, enterprise-ready architecture</li>
            </ul>

            <div className="hero-actions">
              <Button
                className="hero-button"
                onClick={() => window.dispatchEvent(new Event("open-sidebar"))}
              >
                Request a Demo →
              </Button>
            </div>
          </div>

          <div className="process-visual">
            <div className="dashboard-mock">
              <aside className="dashboard-sidebar">
                <div className="sidebar-logo">RevenueDesk</div>
                <nav className="sidebar-nav">
                  <span className="sidebar-item active">Dashboard</span>
                  <span className="sidebar-item">Invoices</span>
                  <span className="sidebar-item">Payments</span>
                  <span className="sidebar-item">Subscriptions</span>
                  <span className="sidebar-item">Customers</span>
                  <span className="sidebar-item">Plans & Pricing</span>
                  <span className="sidebar-item">Reports</span>
                </nav>
              </aside>

              <div className="dashboard-main">
                <div className="dashboard-top">
                  <div className="dashboard-title">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="dashboard-cards">
                  <div className="dashboard-metric">
                    <span className="metric-label">Revenue</span>
                    <span className="metric-value">$124k</span>
                  </div>

                  <div className="dashboard-metric">
                    <span className="metric-label">Orders</span>
                    <span className="metric-value">2,430</span>
                  </div>

                  <div className="dashboard-metric">
                    <span className="metric-label">Growth</span>
                    <span className="metric-value positive">+18%</span>
                  </div>
                </div>

                <div className="dashboard-chart dashboard-chart-real">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={160}>
                      <LineChart data={dashboardChartData}>
                        <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                        <XAxis
                          dataKey="month"
                          stroke="#9aa0a6"
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis
                          width={25}
                          stroke="#9aa0a6"
                          tick={{ fontSize: 10 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#ffffff"
                          strokeWidth={2.5}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="orders"
                          stroke="#9aa0a6"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="growth"
                          stroke="rgba(255, 255, 255, 0.35)"
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ width: "100%", height: "100%" }} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

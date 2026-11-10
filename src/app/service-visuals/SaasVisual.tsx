"use client";

import React, { useSyncExternalStore } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { dashboardChartData } from "@/components/ui/chartData";
import "./servicevisuals.css";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function SaasVisual() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  return (
    <div className="saas-visual">
      <div className="saas-visual-frame">
        {/* SIDEBAR */}
        <aside className="saas-visual-sidebar">
          <div className="saas-visual-logo">RevenueDesk</div>

          <nav className="saas-visual-nav">
            {[
              "Dashboard",
              "Invoices",
              "Payments",
              "Subscriptions",
              "Customers",
              "Plans & Pricing",
              "Reports",
              "Settings",
            ].map((item, idx) => (
              <span
                key={item}
                className={`saas-visual-nav-item ${idx === 0 ? "active" : ""}`}
              >
                {item}
              </span>
            ))}
          </nav>
        </aside>

        {/* MAIN */}
        <div className="saas-visual-main">
          {/* TOP BAR */}
          <div className="saas-visual-top">
            <div className="saas-visual-date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </div>

            <div className="saas-visual-user">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4z" />
              </svg>
            </div>
          </div>

          {/* METRICS */}
          <div className="saas-visual-metrics">
            <Metric label="Revenue" value="$124k" />
            <Metric label="Orders" value="2,430" />
            <Metric label="Growth" value="+18%" positive />
          </div>

          {/* CHART */}
          <div className="saas-visual-chart">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={160}>
                <LineChart data={dashboardChartData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10 }}
                    stroke="#94a3b8"
                  />
                  <YAxis width={28} tick={{ fontSize: 10 }} stroke="#94a3b8" />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6d9cff"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="rgba(120,160,255,0.6)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="growth"
                    stroke="rgba(255,255,255,0.35)"
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
  );
}

/* =====================
   SMALL SUB-COMPONENT
===================== */
function Metric({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="saas-visual-metric">
      <span className="saas-visual-metric-label">{label}</span>
      <span
        className={`saas-visual-metric-value ${positive ? "positive" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

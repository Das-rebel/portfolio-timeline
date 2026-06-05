"use client";

import { useState } from "react";
import { caseStudies } from "@/lib/timeline-data";

type Category = "revenue" | "efficiency" | "team" | "innovation" | "metrics";

const CATEGORY_COLORS: Record<Category, string> = {
  revenue: "#d4af37",    // gold — $ amounts, growth multiples
  efficiency: "#3b82f6", // blue — time reduction, cost savings
  team: "#6b6b7b",        // neutral gray — team size, hiring
  innovation: "#8b5cf6",  // purple — first-of-kind, pilots
  metrics: "#22c55e",     // green — %, ratios, NPS, DAU
};

function inferCategory(text: string): Category {
  const lower = text.toLowerCase();
  if (/(\$\d|₹|crore|million|growth|revenue|scale|disbursal|aov)/i.test(lower)) return "revenue";
  if (/tat|reduce|hours?|seconds?|cost|savings|onboarding time| sla /i.test(lower)) return "efficiency";
  if (/team|led|hire|manage|budget/i.test(lower)) return "team";
  if (/first|pilot|launch|new (customer|product|market)/i.test(lower)) return "innovation";
  return "metrics";
}

function AchievementRow({ text }: { text: string }) {
  const category = inferCategory(text);
  const color = CATEGORY_COLORS[category];
  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
      <div
        style={{
          width: "3px",
          height: "20px",
          background: color,
          borderRadius: "2px",
          flexShrink: 0,
          marginTop: "2px",
        }}
      />
      <span style={{ fontSize: "14px", color: "#a0a0a0", lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

// Parse outcome into bullet-like achievements
function parseAchievements(outcome: string): string[] {
  // Split on periods and sentence breaks, filter empty
  const parts = outcome.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10);
  return parts.length > 0 ? parts : [outcome];
}

export default function SelectedWork() {
  return (
    <section id="work" style={{ background: "#0a0a0a", padding: "120px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.3em", color: "#333333", marginBottom: "64px" }}>
          Selected Work
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "48px" }}>
          {caseStudies.map((study) => {
            const achievements = parseAchievements(study.outcome);
            const [hovered, setHovered] = useState(false);
            return (
              <div
                key={study.company}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  transition: "transform 200ms ease",
                  transform: hovered ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#333333", marginBottom: "16px" }}>
                  {study.company}
                </p>
                <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#666666", maxWidth: "400px", marginBottom: "24px" }}>
                  {study.problem}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "8px 48px", marginBottom: "20px" }}>
                  {achievements.map((a, i) => (
                    <AchievementRow key={i} text={a} />
                  ))}
                </div>
                {study.impactMetric && (
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#ffffff" }}>
                    {study.impactMetric}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
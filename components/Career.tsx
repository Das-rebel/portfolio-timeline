import { timelineData } from "@/lib/timeline-data";

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

// Styled wordmarks for professional companies
function CompanyWordmark({ company }: { company: string }) {
  switch (company) {
    case "NIRO":
      return (
        <span style={{
          fontSize: "18px",
          fontWeight: 600,
          letterSpacing: "0.15em",
          color: "#ffffff",
          textTransform: "uppercase"
        }}>NIRO</span>
      );
    case "GROWW":
      return (
        <span style={{
          fontSize: "18px",
          fontWeight: 500,
          color: "#1a6b3a"  // muted green matching their brand
        }}>GROWW</span>
      );
    case "Axis Bank":
      return (
        <span style={{ fontSize: "18px", fontWeight: 600 }}>
          <span style={{ color: "#3b82f6", letterSpacing: "0.1em", textTransform: "uppercase" }}>AXIS</span>
          <span style={{ color: "#666666", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 400 }}>BANK</span>
        </span>
      );
    case "Aditya Birla Capital":
      return (
        <span>
          <span style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#d4af37",
            letterSpacing: "0.05em"
          }}>ABC</span>
          <span style={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#888888",
            marginLeft: "8px"
          }}>Aditya Birla Capital</span>
        </span>
      );
    case "ICICI Bank":
      return (
        <span style={{
          fontSize: "18px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          color: "#3b82f6",
          textTransform: "uppercase"
        }}>ICICI</span>
      );
    case "Tenovia Solutions":
      return (
        <span style={{
          fontSize: "18px",
          fontWeight: 400,
          color: "#888888"
        }}>Tenovia</span>
      );
    default:
      return (
        <span style={{ fontSize: "18px", fontWeight: 500, color: "#ffffff" }}>
          {company}
        </span>
      );
  }
}

export default function Career() {
  return (
    <section id="career" style={{ background: "#000000", padding: "120px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#333333",
            marginBottom: "64px",
          }}
        >
          Experience
        </p>

        {timelineData.map((entry, i) => (
          <div
            key={i}
            style={{
              paddingBottom: "48px",
              marginBottom: "48px",
              borderBottom: i < timelineData.length - 1 ? "1px solid #1a1a1a" : "none",
            }}
          >
            {/* Company header */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <CompanyWordmark company={entry.company} />
              <span style={{ fontSize: "14px", color: "#666666" }}>— {entry.role}</span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#333333",
                  marginLeft: "auto",
                }}
              >
                {entry.startDate} – {entry.endDate}
              </span>
            </div>

            {/* Key metric — large, bold, gold */}
            {entry.impactMetric && (
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#d4af37",
                  marginBottom: "24px",
                }}
              >
                {entry.impactMetric}
              </div>
            )}

            {/* Achievement blocks — 2-column grid with color indicators */}
            {entry.bullets && entry.bullets.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "12px 48px",
                  marginBottom: "24px",
                }}
              >
                {entry.bullets.map((b, idx) => (
                  <AchievementRow key={idx} text={b} />
                ))}
              </div>
            )}

            {/* Team note — muted, at bottom */}
            <p
              style={{
                fontSize: "12px",
                fontStyle: "italic",
                color: "#444444",
                margin: 0,
              }}
            >
              {entry.teamSize}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
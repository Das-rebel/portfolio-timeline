"use client";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { timelineData } from "../lib/timeline-data";
import Logo from "./Logo";

export default function NarrativeTimeline() {
  const { colors } = useTheme();

  const getCategory = (text) => {
    const map = {
      "latency": "PERF",
      "revenue": "GROWTH",
      "cost": "EFF",
      "architecture": "ENG",
      "led": "LEAD",
      "managed": "LEAD",
      "implemented": "ENG",
      "reduced": "EFF",
      "increased": "GROWTH",
      "scaling": "ENG",
      "optimised": "PERF"
    };
    const lower = text.toLowerCase();
    for (const [key, val] of Object.entries(map)) {
      if (lower.includes(key)) return val;
    }
    return "GEN";
  };

  return (
    <section id="timeline" style={{ padding: "120px 24px", background: colors.background }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-end", 
          marginBottom: "80px",
          borderBottom: `2px solid ${colors.border}`,
          paddingBottom: "24px"
        }}>
          <h2 style={{ 
            color: colors.textPrimary, 
            fontSize: "64px", 
            fontWeight: 900, 
            letterSpacing: "-0.05em",
            lineHeight: "0.9"
          }}>
            CAREER<br/>ARCHIVE
          </h2>
          <span style={{ color: colors.textMuted, fontSize: "14px", fontWeight: 600, textTransform: "uppercase" }}>
            Chronological Record / 2024-2026
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          {timelineData.map((entry, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ 
                display: "grid", 
                gridTemplateColumns: "200px 1fr", 
                borderBottom: `1px solid ${colors.border}`,
                padding: "48px 0"
              }}
            >
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "12px",
                paddingRight: "40px"
              }}>
                <Logo company={entry.company} size="small" />
                <span style={{ color: colors.textPrimary, fontWeight: 800, fontSize: "18px" }}>{entry.company}</span>
                <span style={{ color: colors.textMuted, fontSize: "13px" }}>{entry.startDate} — {entry.endDate}</span>
              </div>
              
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <span style={{ color: colors.textPrimary, fontSize: "24px", fontWeight: 700 }}>{entry.role}</span>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {entry.bullets?.map((bullet, j) => (
                    <div key={j} style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                      <span style={{ 
                        fontSize: "11px", 
                        fontWeight: 900, 
                        backgroundColor: colors.border, 
                        color: colors.background, 
                        padding: "2px 6px",
                        borderRadius: "2px",
                        marginTop: "4px"
                      }}>
                        {getCategory(bullet)}
                      </span>
                      <span style={{ color: colors.textSecondary, fontSize: "16px", lineHeight: "1.6", maxWidth: "60ch" }}>
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

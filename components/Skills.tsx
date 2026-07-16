"use client";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const SKILL_MATRIX = [
  {
    domain: "Engineering",
    skills: ["Next.js", "TypeScript", "Python", "Go", "Rust", "Distributed Systems", "K8s", "Docker"]
  },
  {
    domain: "AI / ML",
    skills: ["LLM Orchestration", "PyTorch", "RAG", "Vector DBs", "LangChain", "Prompt Engineering"]
  },
  {
    domain: "Infrastructure",
    skills: ["GCP", "AWS", "Terraform", "CI/CD", "OCI Vault", "Linux Kernel", "Networking"]
  }
];

export default function Skills() {
  const { colors } = useTheme();

  return (
    <section id="skills" style={{ padding: "120px 24px", background: colors.background }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-end", 
          marginBottom: "60px",
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
            TECH<br/>STACK
          </h2>
          <span style={{ color: colors.textMuted, fontSize: "14px", fontWeight: 600, textTransform: "uppercase" }}>
            Competency Matrix / v1.0
          </span>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "0px",
          borderTop: `1px solid ${colors.border}`,
          borderLeft: `1px solid ${colors.border}`
        }}>
          {SKILL_MATRIX.map((cat, i) => (
            <div key={i} style={{ 
              borderRight: `1px solid ${colors.border}`, 
              borderBottom: `1px solid ${colors.border}`,
              padding: "40px"
            }}>
              <h3 style={{ 
                color: colors.textPrimary, 
                fontSize: "14px", 
                fontWeight: 900, 
                textTransform: "uppercase", 
                marginBottom: "32px",
                letterSpacing: "0.1em"
              }}>
                {cat.domain}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {cat.skills.map((skill, j) => (
                  <div key={j} style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    fontSize: "16px",
                    color: colors.textSecondary,
                    paddingBottom: "8px",
                    borderBottom: `1px solid ${colors.border}`,
                    opacity: 0.8
                  }}>
                    <span>{skill}</span>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: colors.textMuted }}>[✓]</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

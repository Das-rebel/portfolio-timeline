"use client";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { caseStudies } from "../lib/timeline-data";
import CountUp from "./CountUp";
import Logo from "./Logo";

function BentoItem({ title, metric, description, size, index }: any) {
  const { colors } = useTheme();

  const sizeStyles = {
    small: { gridColumn: "span 1", gridRow: "span 1" },
    medium: { gridColumn: "span 2", gridRow: "span 1" },
    large: { gridColumn: "span 2", gridRow: "span 2" },
  };

  const numericValue = parseInt(metric.replace(/[^0-9]/g, "")) || 0;
  const suffix = metric.replace(/[0-9]/g, "");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        ...sizeStyles[size],
        background: colors.background,
        border: `1px solid ${colors.border}`,
        padding: "32px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "background 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = colors.surfaceHover}
      onMouseLeave={(e) => e.currentTarget.style.background = colors.background}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <Logo company={title} size="small" />
          <span style={{ 
            color: colors.textPrimary, 
            fontSize: "12px", 
            fontWeight: 700, 
            textTransform: "uppercase",
            letterSpacing: "0.1em" 
          }}>
            {title}
          </span>
        </div>
        
        <div style={{ 
          color: colors.textPrimary, 
          fontSize: size === "large" ? "72px" : "48px", 
          fontWeight: 900, 
          marginBottom: "12px",
          lineHeight: "0.9",
          fontFamily: "Inter, system-ui, sans-serif"
        }}>
          <CountUp end={numericValue} suffix={suffix} />
        </div>
      </div>

      <p style={{ 
        color: colors.textSecondary, 
        fontSize: "15px", 
        lineHeight: "1.5",
        maxWidth: "400px",
        fontWeight: 400,
        borderTop: `1px solid ${colors.border}`,
        paddingTop: "16px",
        marginTop: "16px"
      }}>
        {description}
      </p>
    </motion.div>
  );
}

export default function BentoGrid() {
  const { colors } = useTheme();
  const items = caseStudies.map((cs, i) => ({
    title: cs.company,
    metric: cs.impactMetric || "0",
    description: cs.outcome,
    size: i === 0 ? "large" : i === 1 ? "medium" : "small",
    index: i,
  }));

  return (
    <section id="work" style={{ padding: "120px 24px", background: colors.background }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gridAutoRows: "240px", 
          gap: "0px", // Strict grid, no gaps
          gridAutoFlow: "dense",
          borderTop: `1px solid ${colors.border}`,
          borderLeft: `1px solid ${colors.border}`
        }}>
          {items.map((item, i) => (
            <BentoItem key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

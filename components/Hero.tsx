"use client";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Hero() {
  const { colors, theme, setTheme } = useTheme();

  return (
    <section style={{ 
      padding: "120px 24px", 
      background: colors.background, 
      borderBottom: `1px solid ${colors.border}`,
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      position: "relative"
    }}>
      {/* Theme Toggle Button - Minimalist Nexu Style */}
      <div style={{ 
        position: "absolute", 
        top: "40px", 
        right: "24px", 
        zIndex: 100 
      }}>
        <button 
          onClick={() => setTheme(theme === "nexu" ? "noir" : "nexu")}
          style={{ 
            background: colors.background, 
            color: colors.textPrimary, 
            border: `1px solid ${colors.border}`, 
            padding: "8px 12px", 
            fontSize: "12px", 
            fontWeight: 800, 
            textTransform: "uppercase", 
            cursor: "pointer",
            fontFamily: "Inter, sans-serif"
          }}
        >
          Mode: {theme === "nexu" ? "Light (Nexu)" : "Dark (Noir)"}
        </button>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 300px", 
          gap: "40px",
          alignItems: "start"
        }}>
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{ 
                color: colors.textPrimary, 
                fontSize: "clamp(64px, 12vw, 140px)", 
                fontWeight: 900, 
                lineHeight: "0.85", 
                letterSpacing: "-0.06em",
                margin: 0,
                textTransform: "uppercase"
              }}
            >
              Subhajit<br/>Das.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ 
                color: colors.textSecondary, 
                fontSize: "24px", 
                fontWeight: 500, 
                marginTop: "40px",
                maxWidth: "60ch",
                lineHeight: "1.4"
              }}
            >
              Software Engineer specializing in high-scale distributed systems and autonomous AI orchestration.
            </motion.p>
          </div>

          <div style={{ 
            borderLeft: `1px solid ${colors.border}`, 
            paddingLeft: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "32px"
          }}>
            <div>
              <span style={{ color: colors.textMuted, fontSize: "12px", fontWeight: 800, textTransform: "uppercase" }}>Location</span>
              <div style={{ color: colors.textPrimary, fontSize: "16px", fontWeight: 600 }}>Bangalore, IN</div>
            </div>
            <div>
              <span style={{ color: colors.textMuted, fontSize: "12px", fontWeight: 800, textTransform: "uppercase" }}>Status</span>
              <div style={{ color: colors.textPrimary, fontSize: "16px", fontWeight: 600 }}>Available for Architecture / Lead roles</div>
            </div>
            <div>
              <span style={{ color: colors.textMuted, fontSize: "12px", fontWeight: 800, textTransform: "uppercase" }}>Focus</span>
              <div style={{ color: colors.textPrimary, fontSize: "16px", fontWeight: 600 }}>AI Agents • LLM Ops • Distributed Systems</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

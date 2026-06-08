"use client";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { colors } = useTheme();

  return (
    <section id="contact" style={{ padding: "120px 24px", background: colors.background, borderTop: `1px solid ${colors.border}` }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "left", marginBottom: "60px" }}>
          <h2 style={{ 
            color: colors.textPrimary, 
            fontSize: "64px", 
            fontWeight: 900, 
            letterSpacing: "-0.05em",
            lineHeight: "0.9"
          }}>
            ESTABLISH<br/>CONTACT
          </h2>
          <p style={{ color: colors.textSecondary, marginTop: "24px", fontSize: "18px" }}>
            Open for collaboration on high-impact engineering challenges.
          </p>
        </div>

        <form style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", color: colors.textMuted }}>Name</label>
              <input 
                type="text" 
                style={{ 
                  background: "transparent", 
                  border: "none", 
                  borderBottom: `1px solid ${colors.border}`, 
                  padding: "8px 0", 
                  color: colors.textPrimary, 
                  fontSize: "18px", 
                  outline: "none" 
                }} 
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", color: colors.textMuted }}>Email</label>
              <input 
                type="email" 
                style={{ 
                  background: "transparent", 
                  border: "none", 
                  borderBottom: `1px solid ${colors.border}`, 
                  padding: "8px 0", 
                  color: colors.textPrimary, 
                  fontSize: "18px", 
                  outline: "none" 
                }} 
              />
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", color: colors.textMuted }}>Message</label>
            <textarea 
              rows={4}
              style={{ 
                background: "transparent", 
                border: "none", 
                borderBottom: `1px solid ${colors.border}`, 
                padding: "8px 0", 
                color: colors.textPrimary, 
                fontSize: "18px", 
                outline: "none",
                resize: "none"
              }} 
            />
          </div>

          <motion.button 
            whileHover={{ background: colors.textPrimary, color: colors.background }}
            style={{ 
              background: "transparent", 
              color: colors.textPrimary, 
              border: `2px solid ${colors.border}`, 
              padding: "20px", 
              fontSize: "16px", 
              fontWeight: 900, 
              textTransform: "uppercase", 
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            Send Transmission
          </motion.button>
        </form>
      </div>
    </section>
  );
}

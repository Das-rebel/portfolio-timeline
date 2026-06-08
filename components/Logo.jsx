"use client";
import { LOGO_MAP, BRAND_COLORS } from "@/lib/logo-map";

export default function Logo({ company, size = "medium" }) {
  const logoPath = LOGO_MAP[company];
  const brandColor = BRAND_COLORS[company] || "#ccc";
  
  const dimensions = {
    small: "32px",
    medium: "64px",
    large: "128px",
  };

  if (logoPath) {
    return (
      <img 
        src={logoPath} 
        alt={`${company} logo`} 
        style={{ 
          width: dimensions[size], 
          height: dimensions[size], 
          objectFit: "contain",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
        }} 
      />
    );
  }

  return (
    <div style={{ 
      width: dimensions[size], 
      height: dimensions[size], 
      borderRadius: "16px", 
      backgroundColor: brandColor, 
      color: "white", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      fontWeight: 900, 
      fontSize: size === "small" ? "12px" : "20px",
      boxShadow: `0 4px 12px ${brandColor}44`
    }}>
      {company.charAt(0)}
    </div>
  );
}

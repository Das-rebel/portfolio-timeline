export default function Impact() {
  const metrics = [
    { value: "$44M+", label: "Revenue Scaled", desc: "Total pipeline driven across lending & fintech products" },
    { value: "10 yrs", label: "Experience", desc: "Across growth, AI systems, and fintech scale" },
    { value: "6 cos", label: "Companies", desc: "From early-stage startups to large NBFCs" },
    { value: "150+", label: "A/B Tests", desc: "Experiments across conversion, retention, and funnel optimization" },
    { value: "$36M", label: "Largest Portfolio", desc: "Single lending product scaled from $5M to $36M" },
  ];

  return (
    <section style={{ background: "#000000", padding: "160px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(48px, 8vw, 120px)", flexWrap: "wrap" }}>
          {metrics.map((m) => (
            <div key={m.label} style={{ textAlign: "center", minWidth: "120px" }}>
              <div style={{ fontSize: "clamp(48px, 10vw, 96px)", fontWeight: 300, color: "#ffffff", lineHeight: 1 }}>
                {m.value}
              </div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.25em", color: "#333333", marginTop: "12px" }}>
                {m.label}
              </div>
              <div style={{ fontSize: "11px", color: "#555555", marginTop: "6px", maxWidth: "140px", margin: "6px auto 0" }}>
                {m.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
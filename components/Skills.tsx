const skillGroups = [
  {
    category: "Growth",
    skills: ["Lending", "Partnerships", "Lifecycle CRM", "A/B Testing", "Funnel Optimization"],
  },
  {
    category: "AI Systems",
    skills: ["LLM Routing", "Model Training", "Prompt Design", "Agent Orchestration", "RAG"],
  },
  {
    category: "Fintech",
    skills: ["Scale", "P&L Ownership", "Regulation", "Risk Management", "Disbursal Systems"],
  },
];

export default function Skills() {
  return (
    <section id="skills" style={{ background: "#000000", padding: "120px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.3em", color: "#333333", marginBottom: "64px" }}>
          Skills
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "48px" }}>
          {skillGroups.map((group) => (
            <div key={group.category}>
              <p style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#333333",
                marginBottom: "16px",
                paddingBottom: "8px",
                borderBottom: "1px solid #1a1a1a",
              }}>
                {group.category}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {group.skills.map((skill) => (
                  <span key={skill} style={{ fontSize: "13px", color: "#666666" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
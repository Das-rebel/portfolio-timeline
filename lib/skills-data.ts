export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    name: "Growth",
    skills: [
      "Performance Marketing",
      "Lifecycle CRM",
      "A/B Testing",
      "SEO / GEO",
      "User Journey Design",
      "Cross-sell & Upsell",
      "Funnel Optimization",
    ],
  },
  {
    name: "AI & ML",
    skills: [
      "LLM Orchestration",
      "Prompt Engineering",
      "RAG Systems",
      "Fine-tuning",
      "Multi-model Routing",
      "Agent Pipelines",
      "MLOps",
    ],
  },
  {
    name: "Technical",
    skills: [
      "Python",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Supabase",
      "Docker",
      "GCP",
      "API Design",
    ],
  },
  {
    name: "Domain",
    skills: [
      "Fintech Lending",
      "Credit Products",
      "UPI / Payments",
      "D2C GTM",
      "Platform Partnerships",
      "Digital Banking",
      "Insurance Distribution",
    ],
  },
];
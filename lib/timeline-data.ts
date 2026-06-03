export interface TimelineEntry {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  teamSize: string;
  impactMetric?: string;
  bullets?: string[];
}

export interface CaseStudy {
  company: string;
  problem: string;
  outcome: string;
  impactMetric?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    company: "NIRO",
    problem: "Partner onboarding taking 48+ hours with high drop-off rates across 18 lending partners",
    outcome: "Reduced onboarding from 48 hours to 4 hours. Scaled to ₹70 crore monthly disbursals within six months.",
    impactMetric: "Scaled to $8M monthly disbursals",
  },
  {
    company: "GROWW",
    problem: "Lending portfolio at $5M with low cross-sell conversion and suboptimal lifetime value",
    outcome: "Scaled from $5M to $36M — 7x growth. 60% revenue boost, 28% lower cost per funded loan.",
    impactMetric: "$5M → $36M ARR (7x growth)",
  },
  {
    company: "Aditya Birla Capital",
    problem: "Siloed data across 12 product lines, NPS at 32, no unified customer journey",
    outcome: "Scaled to ₹100Cr+/month. NPS improved from 32 to 58. Query resolution SLA reduced by 80%.",
    impactMetric: "₹100Cr+/month disbursals, NPS 32→58",
  },
];

export const timelineData: TimelineEntry[] = [
  {
    company: "NIRO",
    role: "AVP, Lead Growth & Partnerships",
    startDate: "Sep 2023",
    endDate: "Jul 2024",
    teamSize: "Led team of 8 + cross-functional team of 15",
    impactMetric: "Scaled to $8M (~₹70Cr) monthly disbursals",
    bullets: [
      "Scaled embedded lending platform to $8M monthly disbursals",
      "Achieved 2x top-of-funnel growth through D2C and platform partners",
      "Reduced partner onboarding time by 50%",
      "Reduced TAT from 48 hours to 4 hours",
      "Expanded market by 30% with WebEngage CRM strategies",
    ],
  },
  {
    company: "GROWW",
    role: "Lead Growth, Credit",
    startDate: "May 2022",
    endDate: "Sep 2023",
    teamSize: "Led cross-functional growth team of 12",
    impactMetric: "$5M → $36M ARR (7x growth), 60% revenue boost",
    bullets: [
      "Scaled from $5M to $36M ARR — 7x growth",
      "60% revenue boost through data-led growth experiments",
      "28% lower cost per funded loan",
      "App DAU improved 80%",
      "Designed lifecycle journeys for 2M+ credit-ready users",
    ],
  },
  {
    company: "Axis Bank",
    role: "AVP Growth Marketing, Digital Sales & Transformation",
    startDate: "Jan 2020",
    endDate: "Sep 2023",
    teamSize: "Managed matrix team of 20+",
    impactMetric: "₹2,000Cr+ annual originations, 200% revenue surge",
    bullets: [
      "₹2,000Cr+ annual originations",
      "200% quarterly revenue surge",
      "Digital collection cost reduced 34%",
      "50+ A/B tests improving activation 22%",
      "New customer acquisition +20% for credit cards",
    ],
  },
  {
    company: "Aditya Birla Capital",
    role: "Lead Growth Marketing & Customer Experience",
    startDate: "Apr 2017",
    endDate: "Dec 2019",
    teamSize: "Built and led team of 6+",
    impactMetric: "₹100Cr+/month disbursals, NPS 32→58",
    bullets: [
      "Scaled to ₹100Cr+/month in 18 months",
      "NPS improvement from 32 to 58",
      "Query resolution SLA reduced 80%",
      "EMI query reduction 3X",
      "Managed ₹15Cr+ annual performance marketing budget",
    ],
  },
  {
    company: "ICICI Bank",
    role: "Digital Manager, Salary & Privilege Banking",
    startDate: "Sep 2015",
    endDate: "Mar 2017",
    teamSize: "Owned salary banking digital engagement for 500K+ customers",
    impactMetric: "Digital adoption 45%→72%",
    bullets: [
      "Digital transactions share 45% → 72%",
      "Video KYC pilot — first in industry",
      "500K+ salary banking customers",
    ],
  },
  {
    company: "Tenovia Solutions",
    role: "D2C & Marketplace Strategy Consultant",
    startDate: "Apr 2014",
    endDate: "Sep 2015",
    teamSize: "Consultant role",
    impactMetric: "6 brands advised, AOV +35%",
    bullets: [
      "6 D2C brands advised",
      "AOV increase 35%",
    ],
  },
];

"use client";
import { useEffect, useState } from "react";
import { timelineData, caseStudies } from "@/lib/timeline-data";
import { motion } from "framer-motion";
import {
  IconBrandGithub, IconBrandLinkedin, IconMail, IconExternalLink,
  IconChevronDown, IconChevronUp, IconMailForward,
} from "@tabler/icons-react";

/* ─── DATA ─────────────────────────────── */
const JOBS = [
  {
    company: "Tenovia Solutions", role: "D2C & Marketplace Strategy Consultant", period: "2014 – 2015",
    color: "#e07d52", metric: "6 brands", metricLabel: "advised",
    tagline: "Advised 6 D2C brands on marketplace strategy and growth.",
    highlights: [
      "6 D2C brands advised on marketplace strategy",
      "Increased average order value by 35%",
      "Built performance marketing frameworks for brands",
    ],
    capabilities: [
      "D2C Strategy", "Marketplace Optimization", "Performance Marketing",
      "AOV Improvement", "Brand Advisory", "Growth Frameworks",
    ],
  },
  {
    company: "NIRO", role: "AVP, Lead Growth & Partnerships", period: "2023 – 2024",
    color: "#c44a47", metric: "₹70Cr/mo", metricLabel: "peak disbursals",
    tagline: "Built embedded lending from zero to ₹70Cr/month.",
    highlights: [
      "Scaled platform from launch to ₹70Cr/month disbursals",
      "Reduced partner onboarding TAT from 48 hrs → 4 hrs",
      "Led cross-functional team of 8 engineers + 15 stakeholders",
    ],
    capabilities: [
      "Embedded Finance", "Partner Onboarding", "D2C Growth", "Platform Partnerships",
      "WebEngage CRM", "Growth Experiments", "TAT Reduction", "Disbursal Systems",
      "Cross-functional Leadership", "Go-to-Market", "API-first Architecture",
    ],
  },
  {
    company: "GROWW", role: "Lead Growth, Credit", period: "2022 – 2023",
    color: "#1a6b3a", metric: "7×", metricLabel: "revenue growth",
    tagline: "Scaled credit portfolio from $5M → $36M ARR.",
    highlights: [
      "Grew lending portfolio $5M → $36M ARR (7× in 16 months)",
      "Designed lifecycle journeys for 2M+ credit-ready users",
      "Led cross-functional growth team of 12",
    ],
    capabilities: [
      "Credit Growth", "Lifecycle Marketing", "A/B Testing", "Funnel Optimization",
      "Product Led Growth", "Activation Engineering", "Retention Loops",
      "Cross-sell Optimization", "Data-Driven Experiments",
    ],
  },
  {
    company: "Axis Bank", role: "AVP Growth Marketing", period: "2020 – 2023",
    color: "#3b82f6", metric: "₹2,000Cr+", metricLabel: "annual originations",
    tagline: "Drove ₹2,000Cr+ annual originations across digital channels.",
    highlights: [
      "Drove ₹2,000Cr+ annual originations",
      "Reduced digital collection cost by 34%",
      "Managed matrix team of 20+ across channels",
    ],
    capabilities: [
      "Digital Lending", "Growth Marketing", "Digital Sales", "Transformation",
      "Performance Marketing", "Credit Cards", "Customer Acquisition",
      "Omnichannel Strategy", "API Banking", "B2C Growth",
    ],
  },
  {
    company: "Aditya Birla Capital", role: "Lead Growth Marketing", period: "2017 – 2019",
    color: "#d4af37", metric: "+58", metricLabel: "NPS improvement",
    tagline: "Scaled disbursals to ₹100Cr/month and improved NPS 32→58.",
    highlights: [
      "Scaled to ₹100Cr+/month disbursals in 18 months",
      "Improved NPS from 32 → 58",
      "Built and led team of 6+",
    ],
    capabilities: [
      "NPS Improvement", "Growth Marketing", "Customer Experience",
      "₹15Cr+ Annual Budget Management", "Multi-product Strategy",
      "EMI Optimization", "Brand Strategy", "Digital Engagement",
    ],
  },
  {
    company: "ICICI Bank", role: "Digital Manager", period: "2015 – 2017",
    color: "#8b5cf6", metric: "+27pp", metricLabel: "digital adoption lift",
    tagline: "Increased digital transactions share from 45% → 72%.",
    highlights: [
      "Increased digital transactions share 45% → 72%",
      "Launched industry-first Video KYC pilot",
      "Owned digital engagement for 500K+ salary customers",
    ],
    capabilities: [
      "Digital Banking", "Video KYC", "Salary Banking", "Mobile Banking",
      "UX Optimization", "Digital-first Products", "Customer Onboarding",
    ],
  },
];

const PROJECTS = [
  {
    name: "A3M Router", repo: "Das-rebel/a3m-router",
    desc: "Best-in-class open-source LLM router across 80+ providers with Evolution-inspired routing: EXP3 diversity, MVT rate-limit rotation, optimal-defense verification. Top-ranked on RouterArena (96.77% accuracy).",
    stack: ["Go", "Python", "MCTS Routing"], fallbackStars: 15, fallbackLang: "Go", status: "Active",
    topics: ["llm-routing", "mcts", "multi-provider"], demoUrl: "https://das-rebel.github.io/routerarena-benchmark/",
  },
  {
    name: "OmniClaw", repo: "Das-rebel/omniclaw",
    desc: "Multi-provider LLM router (8+ models) with WhatsApp, Telegram, Alexa integrations, Hindi/Bengali support, and 18 MCP browser tools. Production-deployed on GCP.",
    stack: ["Node.js", "Python", "Agent Orchestration"], fallbackStars: 2, fallbackLang: "TypeScript", status: "Active",
    topics: ["whatsapp", "alexa", "browser-automation"], demoUrl: null,
  },
  {
    name: "ChuckleNet", repo: "Das-rebel/chucklenet",
    desc: "ML audience-intelligence: BERT/XLM-R fine-tuned on 120K+ samples for laughter & humor detection. 98.78% Val F1, cross-cultural benchmarks. ACL/EMNLP 2026 research track.",
    stack: ["Python", "XLM-R", "PyTorch"], fallbackStars: 1, fallbackLang: "Python", status: "Research",
    topics: ["xlm-r", "humor-detection", "transformers"], demoUrl: null,
  },
];

/* ─── LIVE GITHUB DATA ──────────────────── */
function useGitHubRepos() {
  const [data, setData] = useState<Record<string, { stars: number; lang: string | null; pushed: string | null }>>({});
  useEffect(() => {
    let alive = true;
    Promise.all(
      PROJECTS.map(p =>
        fetch(`https://api.github.com/repos/${p.repo}`, { headers: { Accept: "application/vnd.github.v3+json" } })
          .then(r => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    ).then(results => {
      if (!alive) return;
      const map: typeof data = {};
      results.forEach((r: any, i) => {
        if (r) map[PROJECTS[i].name] = { stars: r.stargazers_count, lang: r.language, pushed: r.pushed_at?.slice(0, 10) ?? null };
      });
      setData(map);
    });
    return () => { alive = false; };
  }, []);
  return data;
}

/* ─── VISITOR COUNTER (Abacus — free, no signup) ── */
function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    fetch("https://abacus.jasoncameron.dev/hit/portfolio-timeline-dasrebel")
      .then(r => r.text())
      .then(t => setCount(parseInt(t.replace(/\D/g, ""), 10) || null))
      .catch(() => {});
  }, []);
  return count;
}

const STACK = [
  { cat: "Languages", items: "Python · Go · Rust · TypeScript · SQL" },
  { cat: "Frameworks", items: "Next.js · FastAPI · LangChain · PyTorch · Framer Motion" },
  { cat: "Infrastructure", items: "GCP · AWS · Kubernetes · Docker · Terraform" },
  { cat: "AI / ML", items: "LLM Routing · RAG · Vector DBs · Model Training" },
  { cat: "Databases", items: "PostgreSQL · Redis · BigQuery · Firestore" },
];

/* ─── LOGO COMPONENT ────────────────────── */
function CompanyLogo({ company, color }: { company: string; color: string }) {
  // Map company names to logo files
  const logoMap: Record<string, string> = {
    "GROWW": "/logos/groww.png",
    "Axis Bank": "/logos/axisbank.jpg",
    "ICICI Bank": "/logos/icici.jpg",
    "Aditya Birla Capital": "/logos/adityabilacapital.png",
    "NIRO": "/logos/niro.png",
    "Tenovia Solutions": "/logos/tenovia.png",
  };
  const src = logoMap[company];

  if (!src) {
    // Fallback: styled letter mark
    const initial = company.charAt(0);
    return (
      <div style={{
        width: "40px",
        height: "40px",
        borderRadius: "6px",
        background: `${color}18`,
        border: `1.5px solid ${color}40`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 700,
          fontSize: "18px",
          color: color,
          lineHeight: 1,
        }}>
          {initial}
        </span>
      </div>
    );
  }

  return (
    <div style={{
      width: "40px",
      height: "40px",
      borderRadius: "6px",
      background: "#fff",
      border: "1.5px solid #d3c9b3",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      overflow: "hidden",
      padding: "4px",
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${company} logo`}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
        onError={e => {
          // Fall back to letter mark on error
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = "none";
          if (target.parentElement) {
            target.parentElement.innerHTML = `<div style="width:40px;height:40px;border-radius:6px;background:${color}18;border:1.5px solid ${color}40;display:flex;align-items:center;justify-content:center;"><span style="font-family:'Cormorant Garamond',serif;font-weight:700;font-size:18px;color:${color};line-height:1;">${company.charAt(0)}</span></div>`;
          }
        }}
      />
    </div>
  );
}

/* ─── KB TOOLTIP ────────────────────────── */
function KBTooltip({ bullets, color }: { bullets: string[]; color: string }) {
  return (
    <div style={{
      position: "absolute",
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      marginTop: "8px",
      background: "#fff",
      border: `1px solid ${color}40`,
      borderRadius: "8px",
      padding: "12px 16px",
      boxShadow: `0 8px 32px ${color}25`,
      zIndex: 100,
      minWidth: "320px",
      maxWidth: "480px",
    }}>
      <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "9px", color: color, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
        All Resume Points
      </p>
      <ul style={{ margin: 0, padding: "0 0 0 14px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ fontFamily: "'DM Serif Text',serif", fontSize: "12px", lineHeight: 1.4, color: "#1f1c14" }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── COMPONENTS ────────────────────────── */
function JobCard({ job, isOpen, onToggle, onHoverOpen, onHoverClose }: { job: typeof JOBS[0]; isOpen: boolean; onToggle: () => void; onHoverOpen: () => void; onHoverClose: () => void }) {
  const kbBullets = timelineData.find(t => t.company === job.company)?.bullets || job.highlights;
  const [showTooltip, setShowTooltip] = useState(false);
  const expanded = isOpen || showTooltip;

  return (
    <div
      style={{
        border: `1px solid ${job.color}25`,
        borderLeft: `3px solid ${job.color}`,
        borderRadius: "6px",
        position: "relative",
        marginBottom: "10px",
        background: "#faf3ea",
        transition: "transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${job.color}20`;
        setShowTooltip(true);
        onHoverOpen();
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        setShowTooltip(false);
        onHoverClose();
      }}
    >
      {showTooltip && !expanded && <KBTooltip bullets={kbBullets} color={job.color} />}
      {/* Header — always visible, clickable */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "14px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          textAlign: "left",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
          <CompanyLogo company={job.company} color={job.color} />
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "18px", color: job.color }}>
                {job.company}
              </span>
              <span style={{ fontFamily: "'DM Serif Text',serif", fontSize: "13px", color: "#837964" }}>{job.role}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "10px", color: job.color, letterSpacing: "0.06em" }}>
                {job.metric} — {job.metricLabel}
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "9px", color: "#837964", letterSpacing: "0.1em" }}>
                {job.period}
              </span>
            </div>
          </div>
        </div>
        <div style={{ color: job.color, flexShrink: 0 }}>
          {isOpen ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        </div>
      </button>

      {/* Expandable content — using maxHeight for smooth animation */}
      <div
        style={{
          maxHeight: expanded ? "600px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
          opacity: expanded ? 1 : 0,
        }}
      >
        <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${job.color}18` }}>
          <p style={{ fontFamily: "'DM Serif Text',serif", fontStyle: "italic", fontSize: "13px", color: "#1f1c14", margin: "10px 0 8px" }}>
            {job.tagline}
          </p>
          <ul style={{ margin: "0 0 10px 0", padding: "0 0 0 14px", display: "flex", flexDirection: "column", gap: "3px" }}>
            {job.highlights.map((h, i) => (
              <li key={i} style={{ fontFamily: "'DM Serif Text',serif", fontSize: "12.5px", lineHeight: "1.5", color: "#1f1c14" }}>{h}</li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {job.capabilities.map(cap => (
              <span key={cap} style={{
                fontFamily: "'IBM Plex Mono',monospace",
                fontSize: "9px",
                color: "#1f1c14",
                background: `${job.color}12`,
                border: `1px solid ${job.color}30`,
                padding: "3px 8px",
                borderRadius: "3px",
                letterSpacing: "0.04em",
              }}>
                {cap}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── REPO CARDS (live GitHub data, old-design style) ── */
function RepoCard({ p, live }: { p: typeof PROJECTS[0]; live?: { stars: number; lang: string | null; pushed: string | null } }) {
  const [hovered, setHovered] = useState(false);
  const stars = live?.stars ?? p.fallbackStars;
  const lang = live?.lang ?? p.fallbackLang;
  return (
    <motion.a
      href={p.demoUrl ?? `https://github.com/${p.repo}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ y: hovered ? -4 : 0 }}
      transition={{ duration: 0.2 }}
      style={{
        display: "block",
        padding: "16px 18px",
        border: "1px solid #d3c9b3",
        borderTop: "3px solid #1a6b3a",
        borderRadius: "6px",
        background: hovered ? "#fff" : "#faf3ea",
        boxShadow: hovered ? "0 8px 24px rgba(31,28,20,0.12)" : "none",
        textDecoration: "none",
        transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "17px", color: "#1f1c14" }}>
            {p.name}
          </span>
          <span style={{
            fontFamily: "'IBM Plex Mono',monospace", fontSize: "8px",
            color: "#1a6b3a", background: "rgba(26,107,58,0.1)", border: "1px solid rgba(26,107,58,0.25)",
            padding: "2px 6px", borderRadius: "10px", letterSpacing: "0.1em",
          }}>
            {p.status}
          </span>
        </div>
        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "9px", color: "#837964", flexShrink: 0 }}>
          ★ {stars} · {lang}
          {live?.pushed && <span style={{ color: "#d3c9b3", margin: "0 4px" }}>·</span>}
          {live?.pushed && <span title="last push">{live.pushed}</span>}
        </span>
      </div>
      <p style={{ fontFamily: "'DM Serif Text',serif", fontSize: "12px", lineHeight: "1.5", color: "#837964", marginBottom: "8px" }}>
        {p.desc}
      </p>
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
        {[...p.stack, ...p.topics].map((t, i, arr) => (
          <span key={t} style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "9px", color: "#837964" }}>
            {t}{i < arr.length - 1 && <span style={{ color: "#d3c9b3", margin: "0 2px" }}>·</span>}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

function RepoCards() {
  const live = useGitHubRepos();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {PROJECTS.map(p => <RepoCard key={p.name} p={p} live={live[p.name]} />)}
    </div>
  );
}

/* ─── PAGE ──────────────────────────────── */
export default function Page() {
  const [openJob, setOpenJob] = useState<string | null>("NIRO");
  const visits = useVisitorCount();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #e8dfd5 0%, #ddd5cb 100%)",
      padding: "0",
      fontFamily: "'Inter',system-ui,sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500;1,700&family=DM+Serif+Text:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #e8dfd5; }
        ::-webkit-scrollbar-thumb { background: #c44a47; border-radius: 3px; }
        ::selection { background: #c44a47; color: white; }
        body { -webkit-font-smoothing: antialiased; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ background: "#faf3ea", borderBottom: "1px solid #d3c9b3", padding: "60px 24px 48px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#c44a47", display: "inline-block" }} />
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "9px", letterSpacing: "0.22em", color: "#837964", textTransform: "uppercase" }}>
              Portfolio 2026 · subhajitdas.com
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
            <div>
              <h1 style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 700,
                fontSize: "clamp(52px, 8vw, 88px)",
                lineHeight: "0.9",
                letterSpacing: "-0.02em",
                color: "#1f1c14",
                marginBottom: "8px",
              }}>
                Subhajit<br/>
                <span style={{ color: "#c44a47", fontStyle: "italic" }}>Das.</span>
              </h1>
              <div style={{
                fontFamily: "'IBM Plex Mono',monospace",
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "#837964",
                textTransform: "uppercase",
                marginTop: "14px",
                marginBottom: "20px",
              }}>
                Software Engineer · <span style={{ color: "#1f1c14", fontWeight: 500 }}>Bangalore, IN</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0", flexWrap: "wrap" }}>
              {[
                { num: "10", lbl: "Years Exp." },
                { num: "$44M+", lbl: "Revenue Scaled" },
                { num: "6", lbl: "Companies" },
              ].map((s, i) => (
                <div key={s.lbl} style={{
                  textAlign: "center",
                  padding: "12px 24px",
                  borderRight: i < 2 ? "1px solid #d3c9b3" : "none",
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "36px", color: "#1f1c14", lineHeight: 1 }}>
                    {s.num}
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "8.5px", color: "#837964", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "4px" }}>
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "#1f1c14",
            marginBottom: "10px",
            lineHeight: "1.2",
          }}>
            From <span style={{ color: "#c44a47" }}>scaling</span> products to building <span style={{ color: "#c44a47" }}>AI systems</span> that route themselves.
          </h2>
          <p style={{
            fontFamily: "'DM Serif Text',serif",
            fontStyle: "italic",
            fontSize: "14px",
            color: "#837964",
            marginBottom: "24px",
            maxWidth: "54ch",
          }}>
            10 years across fintech, lending, and AI orchestration — from $5M to $44M portfolios. Building multi-LLM systems that vote on results.
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              { icon: <IconMail size={13} />, label: "sdas22@gmail.com", href: "mailto:sdas22@gmail.com" },
              { icon: <IconBrandGithub size={13} />, label: "Das-rebel", href: "https://github.com/Das-rebel" },
              { icon: <IconBrandLinkedin size={13} />, label: "subhajitdas", href: "https://linkedin.com/in/subhajitdas" },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontFamily: "'IBM Plex Mono',monospace", fontSize: "10px",
                  color: "#837964", textDecoration: "none",
                  letterSpacing: "0.08em",
                  padding: "6px 12px",
                  border: "1px solid #d3c9b3",
                  borderRadius: "20px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#c44a47";
                  e.currentTarget.style.color = "#1f1c14";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(196,74,71,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#d3c9b3";
                  e.currentTarget.style.color = "#837964";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span style={{ color: "#c44a47" }}>{l.icon}</span>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOATING SECTION NAV ── */}
      <div style={{
        position: "fixed",
        right: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 100,
      }}>
        {[
          { id: "experience", label: "Experience", color: "#c44a47" },
          { id: "focus", label: "Focus Areas", color: "#1a6b3a" },
          { id: "opensource", label: "Open Source", color: "#3b82f6" },
          { id: "stack", label: "Tech Stack", color: "#d4af37" },
        ].map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            title={s.label}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: s.color,
              opacity: 0.5,
              transition: "opacity 0.2s, transform 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.transform = "scale(1)"; }}
          />
        ))}
      </div>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c44a47", display: "inline-block", flexShrink: 0 }} />
            <h2 style={{
              fontFamily: "'IBM Plex Mono',monospace",
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "#837964",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              Experience
            </h2>
            <div style={{ flex: 1, height: "1px", background: "#d3c9b3" }} />
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "9px", color: "#c44a47", letterSpacing: "0.1em" }}>
              click to expand
            </span>
          </div>

          {JOBS.map(job => (
            <JobCard
              key={job.company}
              job={job}
              isOpen={openJob === job.company}
              onToggle={() => setOpenJob(openJob === job.company ? null : job.company)}
              onHoverOpen={() => setOpenJob(job.company)}
              onHoverClose={() => setOpenJob(null)}
            />
          ))}
        </div>
      </section>

      {/* ── FOCUS AREAS ── */}
      <section id="focus" style={{ background: "#f4ecdf", padding: "48px 24px", borderTop: "1px solid #d3c9b3", borderBottom: "1px solid #d3c9b3" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c44a47", display: "inline-block", flexShrink: 0 }} />
            <h2 style={{
              fontFamily: "'IBM Plex Mono',monospace",
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "#837964",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              Focus Areas
            </h2>
            <div style={{ flex: 1, height: "1px", background: "#d3c9b3" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            {[
              { icon: "📈", label: "Growth", text: "Scaled products from $5M to $44M ARR across 5 companies", color: "#c44a47" },
              { icon: "🤖", label: "AI Systems", text: "Built autonomous research loops and multi-agent orchestrators", color: "#e07d52" },
              { icon: "🏗️", label: "Platforms", text: "Embedded lending, partner APIs, and neo-banking platforms", color: "#3b82f6" },
              { icon: "⭐", label: "Open Source", text: "A3M Router, OmniClaw, ChuckleNet on GitHub", color: "#1a6b3a" },
            ].map(card => (
              <motion.div
                key={card.label}
                whileHover={{ y: -2 }}
                style={{
                  padding: "14px 16px",
                  background: "#faf3ea",
                  border: `1px solid ${card.color}20`,
                  borderTop: `2px solid ${card.color}`,
                  borderRadius: "4px",
                }}
              >
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: card.color, marginBottom: "6px" }}>
                  {card.icon} {card.label}
                </div>
                <p style={{ fontFamily: "'DM Serif Text',serif", fontSize: "12px", lineHeight: "1.5", color: "#1f1c14" }}>
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section id="impact" style={{ background: "#faf3ea", padding: "80px 24px", borderTop: "1px solid #d3c9b3", borderBottom: "1px solid #d3c9b3" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c44a47", display: "inline-block", flexShrink: 0 }} />
            <h2 style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "10px", letterSpacing: "0.22em", color: "#837964", textTransform: "uppercase", fontWeight: 500 }}>
              Impact
            </h2>
            <div style={{ flex: 1, height: "1px", background: "#d3c9b3" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: "24px",
                  background: "#fff",
                  border: "1px solid #d3c9b3",
                  borderTop: `3px solid ${i === 0 ? "#c44a47" : i === 1 ? "#1a6b3a" : "#d4af37"}`,
                  borderRadius: "6px",
                }}
              >
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "9px", color: "#837964", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                  {cs.company}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#1f1c14", marginBottom: "8px", lineHeight: 1.1 }}>
                  {cs.impactMetric}
                </div>
                <p style={{ fontFamily: "'DM Serif Text',serif", fontSize: "13px", color: "#837964", lineHeight: 1.5 }}>
                  {cs.outcome}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN SOURCE ── */}
      <section id="opensource" style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c44a47", display: "inline-block", flexShrink: 0 }} />
            <h2 style={{
              fontFamily: "'IBM Plex Mono',monospace",
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "#837964",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              Open Source
            </h2>
            <div style={{ flex: 1, height: "1px", background: "#d3c9b3" }} />
          </div>

          <RepoCards />
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="stack" style={{ background: "#faf3ea", padding: "48px 24px", borderTop: "1px solid #d3c9b3" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c44a47", display: "inline-block", flexShrink: 0 }} />
            <h2 style={{
              fontFamily: "'IBM Plex Mono',monospace",
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "#837964",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              Technical Stack
            </h2>
            <div style={{ flex: 1, height: "1px", background: "#d3c9b3" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0 32px" }}>
            {STACK.map(row => (
              <div key={row.cat} style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "8px",
                padding: "8px 0",
                borderBottom: "1px dotted #d3c9b3",
                alignItems: "baseline",
              }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono',monospace",
                  fontSize: "9px",
                  fontWeight: 500,
                  color: "#c44a47",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}>
                  {row.cat}
                </span>
                <span style={{
                  fontFamily: "'DM Serif Text',serif",
                  fontSize: "12px",
                  color: "#1f1c14",
                  lineHeight: "1.5",
                }}>
                  {row.items}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#1f1c14", padding: "32px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "20px", color: "#faf3ea", marginBottom: "4px" }}>
              Subhajit Das
            </p>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "9px", color: "#837964", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Software Engineer · Bangalore · 2026
              {visits !== null && (
                <span style={{ marginLeft: "12px", textTransform: "none", letterSpacing: "0.08em", opacity: 0.7 }}>
                  ◉ {visits.toLocaleString()} visits
                </span>
              )}
            </p>
          </div>
          <a
            href="mailto:sdas22@gmail.com"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontFamily: "'IBM Plex Mono',monospace", fontSize: "10px",
              color: "#faf3ea", textDecoration: "none",
              letterSpacing: "0.08em",
              padding: "8px 16px",
              border: "1px solid rgba(250,243,234,0.2)",
              borderRadius: "20px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#c44a47";
              e.currentTarget.style.borderColor = "#c44a47";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(250,243,234,0.2)";
            }}
          >
            <IconMailForward size={12} />
            Request CV
          </a>
        </div>
      </footer>
    </div>
  );
}
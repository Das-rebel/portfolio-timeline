"use client";

import { useEffect, useState } from "react";

interface RepoData {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  html_url: string;
}

const PROJECTS = [
  {
    name: "OmniClaw",
    repo: "Das-rebel/omniclaw",
    description: "Universal AI orchestration across platforms",
    fallbackStars: 48,
    fallbackLang: "Python",
    topics: ["multi-provider", "alexa", "whatsapp", "telegram", "browser-automation"],
    demoUrl: null,
  },
  {
    name: "ChuckleNet",
    repo: "Das-rebel/ChuckleNet",
    description: "ML humor recognition with XLM-R backbone",
    fallbackStars: 8,
    fallbackLang: "Python",
    topics: ["xlm-r", "transformers", "audio", "humor-detection"],
    demoUrl: null,
  },
  {
    name: "Growth Workflow OS",
    repo: "Das-rebel/growth-workflow-os",
    description: "AI-enabled growth workflow system",
    fallbackStars: 3,
    fallbackLang: "Python",
    topics: ["automation", "rag", "knowledge-management"],
    demoUrl: "https://fusion-dashboard-338789220059.asia-south1.run.app",
  },
];

async function getGitHubRepo(owner: string, repo: string): Promise<RepoData | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

function ProjectCard({ project, data }: { project: typeof PROJECTS[0]; data: RepoData | null }) {
  const stars = data?.stargazers_count ?? project.fallbackStars;
  const lang = data?.language ?? project.fallbackLang;

  return (
    <div
      style={{
        background: "#0d0d0d",
        border: "1px solid #1a1a1a",
        borderRadius: "8px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "border-color 0.2s",
      }}
    >
      {/* Header row: name + stars */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3 style={{
          fontSize: "16px",
          fontWeight: 500,
          color: "#ffffff",
          margin: 0,
        }}>
          {project.name}
        </h3>
        <div style={{
          fontSize: "11px",
          color: "#666666",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {stars}
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: "13px",
        color: "#888888",
        margin: 0,
        lineHeight: 1.5,
      }}>
        {project.description}
      </p>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #1a1a1a", margin: "4px 0" }} />

      {/* Tech stack */}
      <div style={{
        fontSize: "11px",
        color: "#444444",
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        alignItems: "center",
      }}>
        <span style={{ color: "#666666" }}>{lang}</span>
        <span style={{ color: "#333333" }}>·</span>
        {project.topics.slice(0, 3).map((t) => (
          <span key={t} style={{ color: "#555555" }}>{t}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
        <a
          href={`https://github.com/${project.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "12px",
            color: "#555555",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#888888")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#555555")}
        >
          View Repo →
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "12px",
              color: "#555555",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#888888")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555555")}
          >
            Live Demo →
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [repoData, setRepoData] = useState<(RepoData | null)[]>([null, null, null]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      const results = await Promise.all(
        PROJECTS.map((p) => {
          const [owner, repo] = p.repo.split("/");
          return getGitHubRepo(owner, repo);
        })
      );
      setRepoData(results);
      setLoaded(true);
    }
    fetchRepos();
  }, []);

  return (
    <section id="projects" style={{ background: "#000000", padding: "80px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#333333",
            marginBottom: "48px",
          }}
        >
          Open Source
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} data={repoData[i]} />
          ))}
        </div>

        {/* Footer note */}
        <p style={{
          fontSize: "11px",
          color: "#333333",
          marginTop: "32px",
          textAlign: "center",
        }}>
          {loaded ? `${repoData.filter(Boolean).length} repos loaded via GitHub API` : "Loading from GitHub..."}
        </p>
      </div>
    </section>
  );
}
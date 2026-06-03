export interface Project {
  name: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projectsData: Project[] = [
  {
    name: "OmniClaw",
    description: "Multi-channel AI assistant orchestrating 8+ LLM providers",
    longDescription:
      "Universal AI orchestration platform deployed across WhatsApp, Telegram, and Alexa. Routes requests across OpenAI, Anthropic, Gemini, Groq, and Cerebras using parallel execution and confidence-weighted voting. Handles Hindi, Bengali, and Hinglish with native code-switching support.",
    techStack: ["Next.js", "Python", "FastAPI", "Supabase", "Docker", "GCP", "twscrape", "Telethon"],
    githubUrl: "https://github.com/Das-rebel/omniclaw",
  },
  {
    name: "Growth Twitter Bot",
    description: "Autonomous agent pipeline for Twitter research and engagement",
    longDescription:
      "Self-sustaining agent that monitors keywords, engages with relevant content, and builds thought leadership automatically. Integrates with Twitter API v2 with GraphQL fallback. Daily bookmark ingestion into personal knowledge vault with semantic search.",
    techStack: ["Python", "TypeScript", "Temporal", "Supabase", "GCP Cloud Run", "httpx"],
    githubUrl: "https://github.com/Das-rebel/twitter-automation",
  },
  {
    name: "ChuckleNet",
    description: "ML system for standup comedy audience prediction",
    longDescription:
      "Research platform analyzing 500K+ audio segments from 70+ hours of standup comedy. Uses XLM-R for text classification and WavLM + MFCC for prosodic features. Achieves 0.82 F1 on binary laughter detection. Training pipeline with automated hyperparameter sweeps.",
    techStack: ["Python", "PyTorch", "XLM-RoBERTa", "WavLM", "Whisper", "MLflow", "GCP"],
    githubUrl: "https://github.com/Das-rebel/ChuckleNet",
  },
  {
    name: "Brain Spark Platform",
    description: "Knowledge management with AI-powered retrieval",
    longDescription:
      "Personal knowledge base spanning 16K+ nodes from Twitter bookmarks, articles, and research notes. Features semantic search via embeddings, cross-session memory for AI agents, and a real-time query interface. Deployed as a production Flask API on GCP Cloud Run.",
    techStack: ["Python", "Flask", "Chroma", "Sentence Transformers", "GCP Cloud Run", "SQLite"],
  },
];
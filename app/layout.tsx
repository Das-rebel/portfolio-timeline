import { ThemeProvider } from "../context/ThemeContext";
import "./globals.css";

// ============================================================
// Umami Analytics Configuration
// ============================================================
//
// MODE 1: Umami Cloud (DEFAULT - uncomment to use)
// - Sign up at https://umami.is/cloud
// - Free tier: 10K pageviews/month
// - No server deployment needed
//
// MODE 2: Self-hosted (see umami/ directory for DO/Railway configs)
// - Deploy to DigitalOcean App Platform or Railway
// - Full control, unlimited pageviews
// ============================================================

// Umami Cloud Configuration (uncomment when using Umami Cloud)
// const UMAMI_CLOUD_WEBSITE_ID = "YOUR_UMAMI_CLOUD_WEBSITE_ID";

// Self-hosted Configuration (set in GitHub Secrets)
// const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL || "";
// const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Font stylesheet — non-render-blocking via preload */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500;1,700&family=DM+Serif+Text:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap"
        />

        {/* ================================================ */}
        {/* UNCOMMENT ONE OF THE FOLLOWING ANALYTICS BLOCKS */}
        {/* ================================================ */}

        {/* OPTION A: Umami Cloud (easiest - no deploy needed) */}
        {/* Sign up at https://umami.is/cloud, get your Website ID, uncomment below */}
        {/*
        <script
          src="https://cloud.umami.is/script.js"
          data-website-id={UMAMI_CLOUD_WEBSITE_ID}
          async
          defer
        />
        */}

        {/* OPTION B: Self-hosted Umami (DO/Railway) */}
        {/* Set NEXT_PUBLIC_UMAMI_URL and NEXT_PUBLIC_UMAMI_WEBSITE_ID in GitHub Secrets */}
        {/* Then uncomment the script below and remove the self-hosted component in page.tsx */}
        {/*
        <script
          src={`${UMAMI_URL}/script.js`}
          data-website-id={UMAMI_WEBSITE_ID}
          async
          defer
        />
        */}
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

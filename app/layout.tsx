import { ThemeProvider } from "../context/ThemeContext";
import UmamiAnalytics from "@/components/UmamiAnalytics";
import "./globals.css";

// Umami configuration — set these environment variables
// NEXT_PUBLIC_UMAMI_URL = your Umami instance URL (e.g., https://umami.example.com)
// NEXT_PUBLIC_UMAMI_WEBSITE_ID = the website ID from Umami dashboard

const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL || "";
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "";

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
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* Umami Analytics — only renders when configured */}
        {UMAMI_URL && UMAMI_WEBSITE_ID && (
          <UmamiAnalytics umamiUrl={UMAMI_URL} websiteId={UMAMI_WEBSITE_ID} />
        )}
      </body>
    </html>
  );
}

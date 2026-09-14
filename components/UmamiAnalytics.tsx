"use client";
import { useEffect } from "react";

interface UmamiAnalyticsProps {
  umamiUrl: string;
  websiteId: string;
}

export default function UmamiAnalytics({ umamiUrl, websiteId }: UmamiAnalyticsProps) {
  useEffect(() => {
    // Dynamically inject the Umami script
    const script = document.createElement("script");
    script.src = `${umamiUrl}/script.js`;
    script.setAttribute("data-website-id", websiteId);
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      document.body.removeChild(script);
    };
  }, [umamiUrl, websiteId]);

  return null;
}

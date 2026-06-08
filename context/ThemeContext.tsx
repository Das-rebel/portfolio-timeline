"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { NOIR_THEME } from "../lib/noir-theme";
import { NEXU_THEME } from "../lib/nexu-theme";

type ThemeType = "noir" | "nexu";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: typeof NOIR_THEME;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Hardcoded to 'nexu' to override any potential issues
  const [theme, setTheme] = useState<ThemeType>("nexu");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as ThemeType;
    if (savedTheme === "noir" || savedTheme === "nexu") {
      setTheme(savedTheme);
    } else {
      setTheme("nexu");
      localStorage.setItem("portfolio-theme", "nexu");
    }
  }, []);

  const toggleTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  const colors = theme === "noir" ? NOIR_THEME : NEXU_THEME;

  return (
    <ThemeContext.Provider value={{ theme, setTheme: toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

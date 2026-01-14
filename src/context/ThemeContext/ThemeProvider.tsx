import { ReactNode, useEffect, useState } from "react";
import { Theme, ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider = ({ children, defaultTheme = "light" }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = window.localStorage.getItem("theme") as Theme;

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return defaultTheme;
  });

  useEffect(() => {
    window.localStorage.setItem("theme", theme);

    document.documentElement.classList.remove("theme-dark", "theme-light");
    document.documentElement.classList.add(`theme-${theme}`);

    return () => {
      document.documentElement.classList.remove("theme-dark", "theme-light");
    };
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const hasManualPreference = window.localStorage.getItem("theme");
      if (!hasManualPreference) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    if (mediaQuery) {
      mediaQuery.addEventListener("change", handleChange);
    }

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

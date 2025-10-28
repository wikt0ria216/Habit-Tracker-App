import { ReactNode, useEffect, useState } from "react";
import { Theme, ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider = ({ children, defaultTheme = "light" }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = window.localStorage.getItem("theme") as Theme;

    //sprawdz czy zapisany motyw jest prawidlowy
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
      //sprawdz preference systemowe jako fallback
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return defaultTheme; //fallback do domyslnego motywu
  });

  useEffect(() => {
    //zapisz w localstorage
    window.localStorage.setItem("theme", theme);

    //ustaw klasy css
    document.documentElement.classList.remove("theme-dark", "theme-light");
    document.documentElement.classList.add(`theme-${theme}`);

    //usun klasy przy unmount
    return () => {
      document.documentElement.classList.remove("theme-dark", "theme-light");
    };
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    //reaguje na zmiane preferencji systemowych dot. motywu
    const handleChange = (e: MediaQueryListEvent) => {
      // Zmień motyw TYLKO jeśli użytkownik nie ustawił go ręcznie
      // (można to sprawdzić przez flagę lub sprawdzenie czy localStorage jest pusty)
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

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext } from "react";

export const Context = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("THEME", "system");

  function changeTheme(theme) {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDark);
    setTheme(theme);
  }

  return (
    <Context.Provider
      value={{
        theme,
        setTheme: changeTheme,
        isDark: document.documentElement.classList.contains("dark"),
      }}
    >
      {children}
    </Context.Provider>
  );
}

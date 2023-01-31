import { useEffect, useState } from "react";
import { theme } from "../../../constants";

const { DARK, LIGHT } = theme;

export default function useTheme() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)")?.matches
    ? DARK
    : LIGHT;
  const localStorageTheme = localStorage.getItem("theme") || null;
  const initialTheme = localStorageTheme ? localStorageTheme : defaultDark;
  const [theme, setTheme] = useState(initialTheme);
  const handleChangeTheme = () => {
    setTheme((prevTheme) => {
      localStorage.setItem("theme", prevTheme === DARK ? LIGHT : DARK);
      return prevTheme === DARK ? LIGHT : DARK;
    });
  };

  useEffect(() => {
    if (theme === DARK) {
      document.body.classList.add(DARK);
      document.body.classList.remove(LIGHT);
    } else {
      document.body.classList.add(LIGHT);
      document.body.classList.remove(DARK);
    }
  }, [theme]);

  return {
    handleChangeTheme,
    theme,
  };
}

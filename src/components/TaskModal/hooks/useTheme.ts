import { useEffect } from "react";
import { theme } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { onChangeTheme } from "../../../reducer/theme";

const { DARK, LIGHT } = theme;

export default function useTheme() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.themeReducers.theme);
  const handleChangeTheme = () => dispatch(onChangeTheme());

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

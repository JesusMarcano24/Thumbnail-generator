import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

type ThemeProp = {
  children: JSX.Element;
};

export enum themePalette {
  BG = "#12181b",
}

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: themePalette.BG,
      paper: themePalette.BG,
    },
  },
});

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header/>
      {children}
      <Footer/>
    </ThemeProvider>
  );
};

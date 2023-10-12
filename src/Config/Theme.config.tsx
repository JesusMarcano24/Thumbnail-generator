import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { SVGImg } from "../Common/Styled";

type ThemeProp = {
  children: JSX.Element;
};

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <SVGImg>{children}</SVGImg>
      <Footer />
    </ThemeProvider>
  );
};

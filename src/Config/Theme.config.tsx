import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import backgroundSVG from "./parabolic-pentagon.svg";

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
      <div
        style={{
          backgroundImage: `url(${backgroundSVG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
      <Footer />
    </ThemeProvider>
  );
};

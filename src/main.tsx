import React from "react";
import ReactDOM from "react-dom/client";

//App
import App from "./App.tsx";

//General styles
import "./index.css";

//MUI
import { ThemeConfig } from "./Config/Theme.config.tsx";

//Tanstack
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//React Router Dom
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeConfig>
          <App />
        </ThemeConfig>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);

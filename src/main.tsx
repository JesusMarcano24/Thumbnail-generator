import React from "react";
import ReactDOM from "react-dom/client";

//App
import App from "./App.tsx";

//General styles
import "./index.css";

//MUI
import { ThemeConfig } from "./Config/Theme.config.tsx";

//Auth0
import { Auth0Provider } from "@auth0/auth0-react";

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
        <Auth0Provider
          domain="dev-4md570zn738nadsg.us.auth0.com"
          clientId="CFdKDaH5VYB5N9Frwmh4LAL8H4lvpRl5"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <ThemeConfig>
            <App />
          </ThemeConfig>
        </Auth0Provider>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);

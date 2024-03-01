import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { ThemeProvider } from "./context/theme-provider";
import AuthProviderWithNavigate from "./features/auth/context/auth-provider-with-navigate";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProviderWithNavigate>
          <App />
        </AuthProviderWithNavigate>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

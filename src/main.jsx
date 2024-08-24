import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <Router>
          <App />
        </Router>
      </StyledEngineProvider>
      {<ReactQueryDevtools buttonPosition="top-left" />}
    </QueryClientProvider>
  </StrictMode>
);

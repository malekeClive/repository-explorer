import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster richColors />
  </StrictMode>
);

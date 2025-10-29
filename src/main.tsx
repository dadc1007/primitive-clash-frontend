import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import "@styles/index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@utils/icon.utils.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <ThemeProvider attribute="class" defaultTheme="system">
          <App />
        </ThemeProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  </StrictMode>
);

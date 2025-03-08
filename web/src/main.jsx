import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./pages/router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { create } from "zustand";

const queryClient = new QueryClient();

export const useAppStore = create((set) => ({
  token: null,
  profile: { id: "", name: "", rating: 0 },
  setProfile: (data) => set((state) => ({ profile: data })),
  setToken: (newToken) => set((state) => ({ token: newToken })),
}));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </StrictMode>
);

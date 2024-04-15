import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMounted } from "./hooks";
import { ROUTES } from "./routes/constants";
import Dashboard from "./pages/Dashboard";
import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";

const helmetContext = {};
const queryClient = new QueryClient();

const App = () => {
  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <Router>
          <Routes>
            <Route path={ROUTES.HOME} element={<Dashboard />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;

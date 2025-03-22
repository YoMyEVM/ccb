// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThirdwebProvider } from "thirdweb/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";

import XPZone from "./pages/XPZone";
import Leaderboard from "./pages/Leaderboard";
import Layout from "./Layout";
import FunAppPage from "./pages/FunAppPage";
import ProAppPage from "./pages/ProAppPage";
import DataAppPage from "./pages/DataAppPage";
import IsaiAppPage from "./pages/IsaiAppPage";
import Claim from "./pages/ClaimPage";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="xp-zone" element={<XPZone />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="Claim" element={<Claim />} /> {/* ✅ Add this line */}

            <Route path="fun" element={<FunAppPage />} />
            <Route path="pro" element={<ProAppPage />} />
            <Route path="data" element={<DataAppPage />} />
            <Route path="isai" element={<IsaiAppPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
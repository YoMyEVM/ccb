// src/main.tsx

import React from "react";
import { createRoot } from "react-dom/client";
import { ThirdwebProvider } from "thirdweb/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";

import About from "./pages/About";
import Layout from "./Layout";
import ComplaintPage from "./components/ComplaintPage"; // Import your new complaint page component

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="about" element={<About />} />
            <Route path="complaint/:id" element={<ComplaintPage />} /> {/* Dynamic route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);

// src/Layout.tsx
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-white">
      <Navbar />
      <main className="pt-4">
        <Outlet />
      </main>
    </div>
  );
}

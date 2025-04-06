// src/App.tsx

import { CardRow } from "./components/CardRow";
import { complaintData } from "./data";  // Import mock data

export function App() {
  // Mock data categorization (First 5 as trending, next 5 as newest)
  const trendingComplaints = complaintData.slice(0, 5);  // First 5 complaints for "Trending Complaints"
  const newestComplaints = complaintData.slice(5, 10);  // Next 5 complaints for "Newest Complaints"

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-start gap-12 px-6 py-10">
      {/* Render the "Trending Complaints" row */}
      <CardRow title="Trending Complaints" cards={trendingComplaints} />

      {/* Render the "Newest Complaints" row */}
      <CardRow title="Newest Complaints" cards={newestComplaints} />
    </main>
  );
}

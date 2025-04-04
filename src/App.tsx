// src/App.tsx

import { CardRow } from "./components/CardRow";
import { complaintData } from "./data";  // Import mock data

export function App() {
  // Mock data categorization (First 5 as trending, next 5 as newest)
  const trendingComplaints = complaintData.slice(0, 5);  // First 5 complaints for "Trending Complaints"
  const newestComplaints = complaintData.slice(5, 10);  // Next 5 complaints for "Newest Complaints"

  return (
    <main className="min-h-[100vh] flex flex-col items-center justify-start container max-w-screen-lg mx-auto">
      <div className="py-4 w-full">
        {/* Render the "Trending Complaints" row */}
        <CardRow title="Trending Complaints" cards={trendingComplaints} />

        {/* Render the "Newest Complaints" row */}
        <CardRow title="Newest Complaints" cards={newestComplaints} />
      </div>
    </main>
  );
}

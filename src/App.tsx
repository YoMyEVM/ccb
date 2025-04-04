// src/App.tsx

import { ComplaintCard } from "./components/ComplaintCard";
import { complaintData } from "./data";

export function App() {
  // Mock data categorization
  const trendingComplaints = complaintData.slice(0, 3); // First 3 as trending
  const newestComplaints = complaintData.slice(3); // Rest as newest

  return (
    <main className="min-h-[100vh] flex flex-col items-center justify-start container max-w-screen-lg mx-auto">
      <div className="py-10">
       
        <ThirdwebResources trendingComplaints={trendingComplaints} newestComplaints={newestComplaints} />
      </div>
    </main>
  );
}



function ThirdwebResources({ trendingComplaints, newestComplaints }: any) {
  return (
    <div className="space-y-8">
      {/* Trending Complaints Row */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Trending Complaints</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {trendingComplaints.map((item: any, i: number) => (
            <ComplaintCard key={i} {...item} />
          ))}
        </div>
      </div>

      {/* Newest Complaints Row */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Newest Complaints</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {newestComplaints.map((item: any, i: number) => (
            <ComplaintCard key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

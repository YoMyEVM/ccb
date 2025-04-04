// src/App.tsx

import { ComplaintCard } from "./components/ComplaintCard";
import { complaintData } from "./data";

export function App() {
  // Mock data categorization
  const trendingComplaints = complaintData.slice(0, 3); // First 3 as trending
  const newestComplaints = complaintData.slice(3); // Rest as newest

  return (
    <main className="min-h-[100vh] flex flex-col items-center justify-start container max-w-screen-lg mx-auto">
      <div className="py-4">
        <Header />
        <ThirdwebResources
          trendingComplaints={trendingComplaints}
          newestComplaints={newestComplaints}
        />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center -mt-10 mb-4 md:mb-10">    
      <span className="inline-block -skew-x-6 text-2xl" style={{ color: 'hsl(0, 0.00%, 93.70%)' }}>Got a Complaint?</span>      
    </header>
  );
}

function ThirdwebResources({ trendingComplaints, newestComplaints }: any) {
  return (
    <div className="space-y-4">
      {/* Trending Complaints Row */}
      <div className="flex flex-col items-start gap-2 mb-4">
        <h2 className="text-2xl font-semibold text-white mb-2">Trending Complaints</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
          {trendingComplaints.map((item: any, i: number) => (
            <ComplaintCard key={i} {...item} />
          ))}
        </div>
      </div>

      {/* Newest Complaints Row */}
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-2xl font-semibold text-white mb-2">Newest Complaints</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
          {newestComplaints.map((item: any, i: number) => (
            <ComplaintCard key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

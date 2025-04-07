// src/pages/ComplaintPage.tsx
import { useParams } from "react-router-dom";
import { complaintData } from "../data";
import { useEffect, useState } from "react";

const ComplaintPage = () => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id!);
  const complaint = complaintData.find((c) => c.subject === decodedId);

  const [votes, setVotes] = useState(0);
  const [isAppealed, setIsAppealed] = useState(false);
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
        const data = await res.json();
        setEthPrice(data.ethereum.usd);
      } catch (err) {
        console.error("Failed to fetch ETH price:", err);
      }
    };
    fetchPrice();
  }, []);

  const formatUsd = (ethAmount: number) => {
    return ethPrice ? ` ($${(ethAmount * ethPrice).toFixed(2)})` : "";
  };

  if (!complaint) {
    return <div>Complaint not found!</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{complaint.subject}</h1>
      <p className="text-xl mt-4">
        <strong>Complaint Against:</strong> {complaint.accused}
      </p>
      <p className="text-xl mt-4">
        <strong>By:</strong> {complaint.submittedBy}
      </p>
      <p className="text-lg mt-4">
        <strong>Description:</strong> {complaint.description}
      </p>

      <div className="mt-6">
        <h2 className="text-lg">Votes: {votes}</h2>
        <div className="flex gap-4 mt-4 flex-wrap">
          {/* Upvote button with tooltip */}
          <div className="relative group">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => setVotes(votes + 1)}
            >
              Upvote
            </button>
            <div className="absolute top-full left-0 mt-2 sm:left-1/4 w-[90vw] max-w-xs sm:w-60 p-2 text-sm text-white bg-zinc-800 border border-zinc-700 rounded shadow z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span style={{ color: "#0edbe5" }}>Cost: 0.00075 ETH{formatUsd(0.00075)}</span>
              <br />
              I agree with this complaint or found it helpful
            </div>
          </div>

          {/* Downvote button with tooltip */}
          <div className="relative group">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setVotes(votes - 1)}
            >
              Downvote
            </button>
            <div className="absolute top-full left-0 mt-2 sm:left-1/4 w-[90vw] max-w-xs sm:w-60 p-2 text-sm text-white bg-zinc-800 border border-zinc-700 rounded shadow z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span style={{ color: "#0edbe5" }}>Cost: 0.00075 ETH{formatUsd(0.00075)}</span>
              <br />
              I disagree with this complaint or didn't find it helpful
            </div>
          </div>

          {/* Appeal button with tooltip (Disabled) */}
          <div className="relative group">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded opacity-50 cursor-not-allowed"
              disabled
            >
              Appeal
            </button>
            <div className="absolute top-full left-0 mt-2 sm:left-1/4 w-[90vw] max-w-xs sm:w-64 p-2 text-sm text-white bg-zinc-800 border border-zinc-700 rounded shadow z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span style={{ color: "#0edbe5" }}>Cost: 0.125 ETH{formatUsd(0.12)}</span>
              <br />
              Appeal to the DAO for site removal (currently disabled)
            </div>
          </div>
        </div>
      </div>

      {isAppealed && (
        <p className="mt-4 text-yellow-500">
          This complaint is now under appeal.
        </p>
      )}
      <a href={complaint.href} className="text-blue-500 mt-4 block">
        View more details
      </a>
    </div>
  );
};

export default ComplaintPage;
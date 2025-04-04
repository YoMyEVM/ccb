// src/components/ComplaintPage.tsx

import { useParams } from "react-router-dom";
import { complaintData } from "../data";
import { useState } from "react";

const ComplaintPage = () => {
  const { id } = useParams();  // Extract the id from the URL params
  const complaint = complaintData.find((complaint) => complaint.subject === id);  // Find the specific complaint

  // State for votes
  const [votes, setVotes] = useState(0);
  const [isAppealed, setIsAppealed] = useState(false);

  // Handle upvote
  const handleUpvote = () => setVotes(votes + 1);

  // Handle downvote
  const handleDownvote = () => setVotes(votes - 1);

  // Handle appeal
  const handleAppeal = () => setIsAppealed(true);

  // If complaint not found, show loading or not found message
  if (!complaint) {
    return <div>Complaint not found!</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{complaint.subject}</h1>
      <p className="text-xl mt-4"><strong>Complaint Against:</strong> {complaint.accused}</p>
      <p className="text-xl mt-4"><strong>By:</strong> {complaint.submittedBy}</p>
      <p className="text-lg mt-4"><strong>Description:</strong> {complaint.description}</p>

      <div className="mt-6">
        <h2 className="text-lg">Votes: {votes}</h2>
        <div className="flex gap-4 mt-4">
          {/* Upvote button with tooltip */}
          <div className="relative group">
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" 
              onClick={handleUpvote}
            >
              Upvote
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-36 p-2 text-sm text-white bg-zinc-800 border border-zinc-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              I Agree With This
            </div>
          </div>

          {/* Downvote button with tooltip */}
          <div className="relative group">
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" 
              onClick={handleDownvote}
            >
              Downvote
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-36 p-2 text-sm text-white bg-zinc-800 border border-zinc-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              I Disagree With This
            </div>
          </div>

          {/* Appeal button with tooltip */}
          <div className="relative group">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
              onClick={handleAppeal}
            >
              Appeal
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 text-sm text-white bg-zinc-800 border border-zinc-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Submit to DAO for removal (coming soon)
            </div>
          </div>
        </div>
      </div>

      {isAppealed && (
        <p className="mt-4 text-yellow-500">This complaint is now under appeal.</p>
      )}

      <a href={complaint.href} className="text-blue-500 mt-4 block">View more details</a>
    </div>
  );
};

export default ComplaintPage;

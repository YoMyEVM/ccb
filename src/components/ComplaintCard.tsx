// ComplaintCard.tsx
import { Link } from "react-router-dom";

interface ComplaintCardProps {
  subject: string;
  submittedBy: string;
  accused: string;
}

export function ComplaintCard({ submittedBy, accused, subject }: ComplaintCardProps) {
  const truncateAddress = (address: string) =>
    `${address.slice(0, 10)}...${address.slice(-4)}`;

  const accentPink = "hsl(294, 100%, 60%)";

  return (
    <Link
      to={`/complaint/${encodeURIComponent(subject)}`} // <-- Dynamic URL with complaint subject
      className="flex flex-col p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full max-w-[350px] h-[280px] justify-between"
      style={{ background: "linear-gradient(to right, #2a2a2a, #1f1f1f)" }}
    >
      <div className="text-lg font-bold text-white mb-4 line-clamp-3 h-[72px] overflow-hidden">
        {subject}
      </div>

      <div>
        <div className="text-md text-gray-300 mb-2">
          <span className="font-semibold" style={{ color: accentPink }}>Against:</span>
          <div className="text-sm text-teal-400 mb-4">
            {truncateAddress(accused)}
          </div>
        </div>

        <div className="text-md text-gray-300 mb-2">
          <span className="font-semibold" style={{ color: accentPink }}>By:</span>
          <div className="text-sm text-teal-400 mb-4">
            {truncateAddress(submittedBy)}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          className="text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
          style={{ backgroundColor: accentPink }}
        >
          View Details
        </button>
      </div>
    </Link>
  );
}

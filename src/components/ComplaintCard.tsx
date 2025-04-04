// src/components/ComplaintCard.tsx

import { Link } from "react-router-dom";  // Import Link from react-router-dom

interface ComplaintCardProps {
  subject: string;
  accused: string;
  submittedBy: string;
  href: string;
}

export function ComplaintCard({ subject, accused, submittedBy, href }: ComplaintCardProps) {
  return (
    <Link
      to={`/complaint/${subject}`}  // Link to dynamic complaint page
      className="flex flex-col rounded-lg hover:bg-zinc-900 transition-colors overflow-hidden"
      style={{ border: '1px solid hsl(294, 100%, 60%)', width: '100%', maxWidth: '350px' }}
    >
      <article className="p-4 text-center">        
        {/* Display the accused with neon pink */}
        <p className="text-xl" style={{ color: '#fd01f5' }}>
          <strong>Complaint Against:</strong> {accused}
        </p>

        <h2 className="text-2xl font-semibold mb-2 text-white">{subject}</h2>

        {/* Display the submitter with cyan color */}
        <p className="text-xl" style={{ color: '#01fcfc' }}>
          <strong>By:</strong> {submittedBy}
        </p>
      </article>
    </Link>
  );
}

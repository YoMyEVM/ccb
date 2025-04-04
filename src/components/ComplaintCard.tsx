// src/components/ComplaintCard.tsx

import { Link } from "react-router-dom";  // Import Link from react-router-dom

interface ComplaintCardProps {
  subject: string;
  accused: string;
  submittedBy: string;
  href: string;
}

// Inside ComplaintCard.tsx, adjust the width if necessary:
export function ComplaintCard({ subject, accused, submittedBy, href }: ComplaintCardProps) {
  return (
    <Link
      to={`/complaint/${subject}`}
      className="flex flex-col rounded-lg hover:bg-zinc-900 transition-colors overflow-hidden"
      style={{ border: '1px solid hsl(294, 100%, 60%)', width: '280px', maxWidth: '100%' }} // Adjust width as needed
    >
      <article className="p-4 text-center">
        <p className="text-xl" style={{ color: '#fd01f5' }}>
          <strong>Complaint Against:</strong> {accused}
        </p>
        <h2 className="text-2xl font-semibold mb-2 text-white">{subject}</h2>
        <p className="text-xl" style={{ color: '#01fcfc' }}>
          <strong>By:</strong> {submittedBy}
        </p>
      </article>
    </Link>
  );
}

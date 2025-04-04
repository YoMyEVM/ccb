// src/components/ComplaintCard.tsx

interface ComplaintCardProps {
  subject: string;    // Complaint subject
  accused: string;    // Name or address of the accused
  submittedBy: string; // Name or address of the submitter
  href: string;       // URL to navigate when clicking on the card
}

// Utility function to truncate addresses
const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function ComplaintCard({ subject, accused, submittedBy, href }: ComplaintCardProps) {
  return (
    <a
      href={href}
      className="flex flex-col rounded-lg hover:bg-zinc-900 transition-colors overflow-hidden"
      style={{ border: '1px solid hsl(294, 100%, 60%)', width: '100%', maxWidth: '350px' }}
      rel="noreferrer"
    >
      <article className="p-4 text-center">        
        {/* Display the accused with neon pink, truncated */}
        <p className="text-xl" style={{ color: '#fd01f5' }}>
          <strong>Complaint Against:</strong> {truncateAddress(accused)}
        </p>

        <h2 className="text-2xl font-semibold mb-2 text-white">{subject}</h2>

        {/* Display the submitter with cyan color, truncated */}
        <p className="text-xl" style={{ color: '#01fcfc' }}>
          <strong>By:</strong> {truncateAddress(submittedBy)}
        </p>
      </article>
    </a>
  );
}

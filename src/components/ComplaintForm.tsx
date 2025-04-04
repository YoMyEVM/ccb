// src/components/ComplaintForm.tsx

import React, { useState } from "react";

// Define ComplaintData type explicitly
interface ComplaintData {
  subject: string;
  accused: string;
  contractAddr: string;
  chain: string;
  evidenceUrl: string;
  description: string;
}

interface ComplaintFormProps {
  onSubmit: (data: ComplaintData) => void;
  error: string | null;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ onSubmit, error }) => {
  // form state
  const [subject, setSubject] = useState("");
  const [accused, setAccused] = useState("");
  const [contractAddr, setContractAddr] = useState("");
  const [chain, setChain] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleFormSubmit = () => {
    if (!subject.trim() || !description.trim()) {
      alert("Please fill out Subject and Description.");
      return;
    }

    const complaintData: ComplaintData = {
      subject,
      accused,
      contractAddr,
      chain,
      evidenceUrl,
      description,
    };

    onSubmit(complaintData);  // Pass correct ComplaintData to the parent
  };

  return (
    <div className="flex flex-col w-full items-center space-y-3">
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Complaint Subject"
        className="w-full p-2 rounded bg-black text-white border border-zinc-700"
      />

      <input
        type="text"
        value={accused}
        onChange={(e) => setAccused(e.target.value)}
        placeholder="Accused Party"
        className="w-full p-2 rounded bg-black text-white border border-zinc-700"
      />

      <input
        type="text"
        value={contractAddr}
        onChange={(e) => setContractAddr(e.target.value)}
        placeholder="Contract Address (optional)"
        className="w-full p-2 rounded bg-black text-white border border-zinc-700"
      />

      <input
        type="text"
        value={chain}
        onChange={(e) => setChain(e.target.value)}
        placeholder="Chain (e.g. Ethereum, Polygon)"
        className="w-full p-2 rounded bg-black text-white border border-zinc-700"
      />

      <input
        type="text"
        value={evidenceUrl}
        onChange={(e) => setEvidenceUrl(e.target.value)}
        placeholder="Evidence URL (tweet, tx hash, etc.)"
        className="w-full p-2 rounded bg-black text-white border border-zinc-700"
      />

      <textarea
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the issue in detail"
        className="w-full p-2 rounded bg-black text-white border border-zinc-700"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}


    </div>
  );
};

export default ComplaintForm;

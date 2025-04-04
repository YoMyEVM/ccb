// src/components/CreateModal.tsx

import React, { useEffect, useState, useRef } from "react";
import { useActiveWallet } from "thirdweb/react";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // states for user fields
  const [subject, setSubject] = useState("");
  const [accused, setAccused] = useState("");
  const [contractAddr, setContractAddr] = useState("");
  const [chain, setChain] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [description, setDescription] = useState("");

  const [ethPrice, setEthPrice] = useState<string | null>(null);

  // thirdweb hooks
  const wallet = useActiveWallet();

  // State to manage any potential error message
  const [error, setError] = useState<string | null>(null);

  // fetch approximate cost for 0.0026 ETH in USD
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await res.json();
        const usdValue = (data.ethereum.usd * 0.0026).toFixed(2);
        setEthPrice(usdValue);
      } catch (err) {
        console.error("Failed to fetch ETH price:", err);
        setError("Failed to fetch ETH price.");
      }
    };
    fetchPrice();
  }, []);

  // close modal on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // handle submission without NFT or blockchain transaction
  const handleSubmit = async () => {
    if (!wallet) {
      alert("Connect your wallet first!");
      return;
    }

    const account = await wallet.getAccount();
    if (!account?.address) {
      alert("No wallet address found!");
      return;
    }

    // basic check for required fields
    if (!subject.trim() || !description.trim()) {
      setError("Please fill out Subject and Description.");
      return;
    }

    try {
      // 1) create user complaint object
      const complaintData = {
        subject,
        description,
        accused,
        contractAddr,
        chain,
        evidenceUrl,
        submittedBy: account.address,
      };

      // 2) Here you would handle the complaint data (e.g., send it to a server or smart contract endpoint)
      // For now, we'll just log it to the console
      console.log("Complaint submitted:", complaintData);

      // Simulate a successful submission
      alert("Complaint submitted successfully!");
      // Reset form fields
      setSubject("");
      setAccused("");
      setContractAddr("");
      setChain("");
      setEvidenceUrl("");
      setDescription("");
      setError(null); // Reset error state on successful submission
      onClose();
    } catch (err) {
      console.error("Submission error:", err);
      setError("Could not finish the submission process.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div
        ref={modalRef}
        className="bg-zinc-900 text-white p-3 rounded-2xl shadow-2xl max-w-md w-full border"
        style={{ borderColor: "hsl(294, 100%, 60%)" }}
      >
        <div className="flex flex-col items-center space-y-3">
          <h2
            className="text-2xl -mt-12 font-bold text-center"
            style={{ color: "#0edbe5" }}
          >
            Create Complaint
          </h2>

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

          <button
            onClick={handleSubmit}
            className="mt-2 w-full py-3 text-lg font-bold text-black border rounded hover:bg-zinc-800"
            style={{
              background: "hsl(136, 61.30%, 50.40%)",
              borderColor: "hsl(294, 100%, 60%)",
            }}
          >
            Submit Complaint for 0.0026 ETH{ethPrice ? ` ($${ethPrice})` : ""}
          </button>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            onClick={onClose}
            className="w-full py-2 text-sm border rounded hover:bg-zinc-800"
            style={{ borderColor: "hsl(294, 100%, 60%)" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

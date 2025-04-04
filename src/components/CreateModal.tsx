// src/components/CreateModal.tsx

import React, { useEffect, useState, useRef } from "react";
import { useActiveWallet } from "thirdweb/react";
import ComplaintForm from "./ComplaintForm";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [ethPrice, setEthPrice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // thirdweb hooks
  const wallet = useActiveWallet();

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

  const handleSubmit = (complaintData: { subject: string, accused: string, contractAddr: string, chain: string, evidenceUrl: string, description: string }) => {
    if (!wallet) {
      alert("Connect your wallet first!");
      return;
    }

    const account = wallet.getAccount();
    if (!account?.address) {
      alert("No wallet address found!");
      return;
    }

    // Add complaint submission logic here (e.g., send to server or smart contract)

    console.log("Complaint submitted:", complaintData);

    alert("Complaint submitted successfully!");
    onClose();
  };

  if (!isOpen) return null;

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

          <ComplaintForm onSubmit={handleSubmit} error={error} />

          <button
            onClick={() => handleSubmit({ subject: '', accused: '', contractAddr: '', chain: '', evidenceUrl: '', description: '' })}
            className="mt-2 w-full py-3 text-lg font-bold text-black border rounded hover:bg-zinc-800"
            style={{
              background: "hsl(136, 61.30%, 50.40%)",
              borderColor: "hsl(294, 100%, 60%)",
            }}
          >
            Submit Complaint for 0.0026 ETH{ethPrice ? ` ($${ethPrice})` : ""}
          </button>

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

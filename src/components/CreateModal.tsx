// src/components/DailyModal.tsx
import React, { useEffect, useState, useRef } from "react";

interface DailyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyModal: React.FC<DailyModalProps> = ({ isOpen, onClose }) => {
  const [ethPrice, setEthPrice] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
        const data = await res.json();
        const usdValue = (data.ethereum.usd * 0.0026).toFixed(2);
        setEthPrice(usdValue);
      } catch (err) {
        console.error("Failed to fetch ETH price", err);
      }
    };

    fetchPrice();
  }, []);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div
        ref={modalRef}
        className="bg-zinc-900 text-white p-3 rounded-2xl shadow-2xl max-w-md w-full border"
        style={{ borderColor: "hsl(294, 100%, 60%)" }}
      >
        <div className="flex flex-col items-center space-y-3">

          <h2 className="text-2xl -mt-12 font-bold text-center" style={{ color: '#0edbe5' }}>Create Complaint</h2>


          <button
            className="mt-2 w-full py-3 text-lg font-bold text-black border rounded hover:bg-zinc-800"
            style={{ background: "hsl(136, 61.30%, 50.40%)", borderColor: "hsl(294, 100%, 60%)" }}
          >
            Create for 0.0026 ETH{ethPrice ? ` ($${ethPrice})` : ""}
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
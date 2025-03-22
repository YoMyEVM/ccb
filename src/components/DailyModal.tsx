// src/components/DailyModal.tsx
import React from "react";

interface DailyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyModal: React.FC<DailyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-zinc-900 text-white p-2 rounded-lg shadow-lg max-w-md w-full border" style={{ borderColor: "hsl(294, 100%, 60%)" }}>
        <img src="/xpnft.png" alt="XP NFT" className="w-full aspect-square object-contain mb-1" />
        <h2 className="text-xl font-bold mb-1 text-center" style={{ color: "hsl(294, 100%, 60%)" }}>Check-In to Earn</h2>
        <p className="text-lg text-center text-white mb-1">300 XP</p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="mt-1 mb-3 px-4 py-2 bg-black border rounded hover:bg-zinc-800"
            style={{ borderColor: "hsl(294, 100%, 60%)" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
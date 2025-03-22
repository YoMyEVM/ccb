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
      <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-md w-full border border-pink-500">
        <h2 className="text-xl font-bold mb-4 text-center" style={{ color: "hsl(294, 100%, 60%)" }}>Daily Check-In</h2>
        <p className="text-sm text-center mb-4">
          You’ve successfully opened the Daily Check-In!<br />
          (Here you can add your daily logic like XP, tokens, rewards, etc.)
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="mt-2 px-4 py-2 bg-black border border-pink-500 rounded hover:bg-zinc-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
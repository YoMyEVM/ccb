// src/components/CreateModal.tsx
import React, { useEffect, useState, useRef } from "react";
import { ComplaintForm } from "./ComplaintForm";
import { contract } from "../client";
import { useActiveWallet, useSendTransaction } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc721";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const [ethPrice, setEthPrice] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Pull in user's wallet & the transaction sender
  const wallet = useActiveWallet();
  const { mutate: sendTransaction, status, error } = useSendTransaction();

  // Fetch approximate cost in USD (0.0026 ETH)
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
        console.error("Failed to fetch ETH price", err);
      }
    };
    fetchPrice();
  }, []);

  // Close the modal if user clicks outside
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

  // If modal is closed, don't render anything
  if (!isOpen) return null;

  // The function that triggers an actual mint/claim
  const handleMint = async () => {
    // Check if user has connected a wallet
    if (!wallet) {
      alert("Please connect your wallet first.");
      return;
    }

    // Get the real address
    const account = await wallet.getAccount();
    if (!account?.address) {
      alert("Could not resolve wallet address.");
      return;
    }

    try {
      // Prepare the transaction for 'claimTo'
      const tx = claimTo({
        contract,              // from ../client
        to: account.address,   // send to user's own wallet
        quantity: BigInt(1),
      });

      // Send the transaction from user’s wallet
      sendTransaction(tx, {
        onSuccess: () => {
          alert("Complaint NFT minted successfully!");
          onClose();
        },
        onError: (err) => {
          console.error("Claim transaction failed:", err);
          alert("Mint failed.");
        },
      });
    } catch (err) {
      console.error("Failed to build claimTo transaction:", err);
      alert("Transaction building failed.");
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

          {/* The complaint form with all fields */}
          <ComplaintForm />

          <button
            onClick={handleMint}
            disabled={status === "pending"}
            className="mt-2 w-full py-3 text-lg font-bold text-black border rounded hover:bg-zinc-800"
            style={{
              background: "hsl(136, 61.30%, 50.40%)",
              borderColor: "hsl(294, 100%, 60%)",
              opacity: status === "pending" ? 0.6 : 1,
            }}
          >
            {status === "pending" ? "Minting..." : "Create for 0.0026 ETH"}
            {ethPrice ? ` ($${ethPrice})` : ""}
          </button>

          {error && (
            <p className="text-red-500 text-sm">Error: {error.message}</p>
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

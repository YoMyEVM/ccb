// src/components/CreateModal.tsx

import React, { useEffect, useState, useRef } from "react";
import { prepareContractCall } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc721";
import { upload } from "thirdweb/storage";
import { useSendTransaction, useActiveWallet } from "thirdweb/react";
import { contract } from "../client"; // the recognized drop contract

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
  const [file, setFile] = useState<File | null>(null);

  const [ethPrice, setEthPrice] = useState<string | null>(null);

  // thirdweb hooks
  const wallet = useActiveWallet();
  const { mutate: sendTransaction, status, error } = useSendTransaction();

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

  // the function that does lazyMint + claim
  const handleMint = async () => {
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
      alert("Please fill out Subject and Description.");
      return;
    }

    try {
      // 1) create user metadata object
      const metadata = {
        name: subject,
        description,
        attributes: [
          { trait_type: "accused", value: accused },
          { trait_type: "contract_address", value: contractAddr },
          { trait_type: "chain", value: chain },
          { trait_type: "submitted_by", value: account.address },
          { trait_type: "evidence", value: evidenceUrl },
        ],
        image: file?.name,
      };

      // 2) upload metadata (and optional file) to IPFS
      const toUpload = file ? [file, metadata] : [metadata];
      const uris = await upload({ client: contract.client, files: toUpload });
      // if user provided a file, the second item is your JSON. if no file, just item 0
      const finalMetadataURI = file ? uris[1] : uris[0];

      // 3) prepare the raw lazyMint call with your contract
      const lazyTx = prepareContractCall({
        contract,
        method: "function lazyMint(uint256, string, bytes) returns (uint256)",
        params: [
          BigInt(1),           // _amount = 1
          finalMetadataURI,    // _baseURIForTokens
          "0x",               // _data
        ],
      });

      // 4) send lazyMint transaction
      sendTransaction(lazyTx, {
        onSuccess: () => {
          console.log("lazyMint success, now let's claim the newly minted token...");

          // 5) then claim that minted token to user
          const claimTx = claimTo({
            contract,
            to: account.address,
            quantity: BigInt(1),
          });

          sendTransaction(claimTx, {
            onSuccess: () => {
              alert("Complaint NFT minted with custom metadata!");
              // reset form states
              setSubject("");
              setAccused("");
              setContractAddr("");
              setChain("");
              setEvidenceUrl("");
              setDescription("");
              setFile(null);
              onClose();
            },
            onError: (err) => {
              console.error("Claim failed:", err);
              alert("Failed to claim newly minted token.");
            },
          });
        },
        onError: (err) => {
          console.error("lazyMint error:", err);
          alert("Failed to lazy-mint new token metadata.");
        },
      });
    } catch (err) {
      console.error("Mint process error:", err);
      alert("Could not finish the minting process.");
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

          {/* Simplified inline form, you can integrate ComplaintForm states if you prefer. */}
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

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 rounded bg-black text-white border border-zinc-700"
          />

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
            {status === "pending" ? "Minting..." : `Create for 0.0026 ETH${ethPrice ? ` ($${ethPrice})` : ""}`}
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
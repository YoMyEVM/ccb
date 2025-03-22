// src/Navbar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { ConnectButton, darkTheme, useActiveWallet } from "thirdweb/react";
import { client } from "./client";
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";
import { DailyModal } from "./components/DailyModal";

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "telegram",
        "facebook",
        "email",
        "x",
        "passkey",
        "phone",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("com.trustwallet.app"),
  createWallet("xyz.abs"),
];

export function Navbar() {
  const wallet = useActiveWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const handleCheckIn = () => {
    if (!wallet) {
      setShowSignInPrompt(true);
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="sticky top-0 z-50 w-full bg-zinc-900 py-4 px-6 shadow-md flex items-center justify-between gap-4"
        style={{ borderBottom: "1px solid hsl(294, 100%, 60%)" }}
      >
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src="/myevmlogo.png" alt="My EVM Logo" className="h-11 w-auto" />
          </Link>
          <Link to="/" className="text-2xl md:text-3xl font-bold tracking-tighter -mb-1 text-zinc-100">
            MyEVM
          </Link>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
          <Link to="/xp-zone" className="text-white text-2xl hover:text-[#0edbe5]">
            XP Zone
          </Link>
          <Link to="/Claim" className="text-white text-2xl hover:text-[#0edbe5]">
            Claim
          </Link>
          <Link to="/leaderboard" className="text-white text-2xl hover:text-[#0edbe5]">
            Leaders
          </Link>

        </div>

        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 border rounded text-sm text-white bg-black"
            style={{ borderColor: "hsl(294, 100%, 60%)", borderWidth: 1 }}
            onClick={handleCheckIn}
          >
            Daily Check-In
          </button>

          <div className="relative group">
            <ConnectButton
              client={client}
              wallets={wallets}
              theme={darkTheme({
                colors: { accentText: "hsl(294, 100%, 60%)" },
              })}
              connectButton={{ label: "Sign In" }}
              connectModal={{
                size: "compact",
                showThirdwebBranding: false,
              }}
            />
            <div className="absolute right-0 mt-2 w-64 p-3 text-sm text-white bg-zinc-800 border border-zinc-700 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              <span style={{ color: "#0edbe5" }}>
                Network transactions cost ~3 cents.
              </span>{" "}
              <br /><br />
              <span>
                Please add & keep at least a dollar worth of ETH in your account for this.
                <br /><br />
                <span style={{ color: "#ff6fff" }}>You can click "Buy" to get ETH.</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <DailyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {showSignInPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-md w-full border border-pink-500">
            <h2 className="text-xl font-bold mb-4 text-center" style={{ color: "hsl(294, 100%, 60%)" }}>Please Sign In</h2>
            <p className="text-sm text-center mb-4">
              You must be connected to your wallet to Check-In.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowSignInPrompt(false)}
                className="mt-2 px-4 py-2 bg-black border border-pink-500 rounded hover:bg-zinc-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
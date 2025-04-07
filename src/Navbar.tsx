import { useState } from "react";
import { Link } from "react-router-dom";
import { ConnectButton, darkTheme, useActiveWallet } from "thirdweb/react";
import { client } from "./client";
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";
import { CreateModal } from "./components/CreateModal";

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
      <div className="sticky top-0 z-50 w-full bg-zinc-900 py-4 px-6 shadow-md border-b border-[hsl(294,100%,60%)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/">
              <img src="/web3beeflogo.png" alt="Web3 Beef Logo" className="h-16 w-auto" />
            </Link>
            <Link
              to="/"
              className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter text-[#ff6fff]"
            >
              Web3 Beef
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="w-full sm:w-auto flex justify-center gap-6 mt-2 sm:mt-0">
            <Link to="/dashboard" className="text-white text-lg sm:text-2xl hover:text-[#0edbe5]">
              Dashboard
            </Link>
            <Link to="/leaderboard" className="text-white text-lg sm:text-2xl hover:text-[#0edbe5]">
              Leaderboard
            </Link>
            <Link to="/about" className="text-white text-lg sm:text-2xl hover:text-[#0edbe5]">
              About
            </Link>
          </div>

          {/* Wallet + CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 sm:mt-0 w-full sm:w-auto justify-center sm:justify-end sm:flex-nowrap">
            <div className="flex flex-row gap-3 w-full sm:w-auto">
              <button
                className="px-4 py-2 border rounded text-sm text-white bg-black w-full sm:w-auto"
                style={{ borderColor: "hsl(294, 100%, 60%)", borderWidth: 1 }}
                onClick={handleCheckIn}
              >
                Got Beef?
              </button>

              <div className="relative group w-full sm:w-auto">
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
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 max-w-xs w-[90vw] sm:w-64 p-3 text-sm text-white bg-zinc-800 border border-zinc-700 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  <span style={{ color: "#0edbe5" }}>
                    Network transactions cost ~3 cents.
                  </span>
                  <br />
                  <br />
                  <span>
                    Please keep at least $1 worth of ETH in your wallet.
                    <br />
                    <br />
                    <span style={{ color: "#ff6fff" }}>
                      Use “Buy” to get or bridge ETH.
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {showSignInPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-md w-full border border-pink-500">
            <h2
              className="text-xl font-bold mb-4 text-center"
              style={{ color: "hsl(294, 100%, 60%)" }}
            >
              Please Sign In
            </h2>
            <p className="text-sm text-center mb-4">
              You must be connected to your wallet to Submit.
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
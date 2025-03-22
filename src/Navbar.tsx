// src/Navbar.tsx
import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "./client";
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";

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
  return (
    <div className="sticky top-0 z-50 w-full bg-zinc-900 py-4 px-6 shadow-md border-b border-zinc-800 flex items-center justify-end">
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
          <span style={{ color: "hsl(294, 69.90%, 59.60%)" }}>
            Network transactions cost ~3 cents. Please add & keep a dollar worth of ETH in your account for this.
          </span>
          <br /><br />
          You can click "Buy" to get ETH.
        </div>
      </div>
    </div>
  );
}
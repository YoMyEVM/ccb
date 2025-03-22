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
    </div>
  );
}
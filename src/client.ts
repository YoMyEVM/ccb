// src/client.ts
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const client = createThirdwebClient({
  // can keep your environment variable here
  clientId: import.meta.env.VITE_TEMPLATE_CLIENT_ID!,
});

export const contract = getContract({
  client,
  chain: defineChain(8453),
  address: "0x6bAdC7509d058eA0ed6665FbCc4b06dB50dFa61e",
});
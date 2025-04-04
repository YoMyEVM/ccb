// src/data.ts

export interface ComplaintData {
  subject: string;
  accused: string;
  submittedBy: string;
  href: string;
  description: string;
}

export const complaintData: ComplaintData[] = [
  {
    subject: "Unlawful Smart Contract Exploit",
    accused: "0xB1fD29b0b7Bd0D15A8f7d8a5a5b3D4D7892A5573",
    submittedBy: "0xAbcdef1234567890abcdeF1234567890abcdef12",
    href: "#",  // Link for more details (this can be any URL)
    description: "The contract was exploited due to a vulnerability in the withdraw function that allowed unauthorized withdrawals."
  },
  {
    subject: "DeFi Protocol Vulnerability",
    accused: "0xC1fD29b0b7Bd0D15A8f7d8a5a5b3D4D7892A5573",
    submittedBy: "0xBbcdef1234567890abcdeF1234567890abcdef13",
    href: "#",  // Link for more details (this can be any URL)
    description: "A vulnerability was found in the staking mechanism of the protocol allowing for excessive withdrawals."
  },
  {
    subject: "Phishing Scam on Uniswap",
    accused: "0xD2fD29b0b7Bd0D15A8f7d8a5a5b3D4D7892A5574",
    submittedBy: "0xCbcdef1234567890abcdeF1234567890abcdef14",
    href: "#",  // Link for more details (this can be any URL)
    description: "A phishing attack was conducted through a fake Uniswap interface, stealing users' private keys and funds."
  },
  {
    subject: "Unauthorized Token Transfer",
    accused: "0xA2fD29b0b7Bd0D15A8f7d8a5a5b3D4D7892A5575",
    submittedBy: "0xDdcdef1234567890abcdeF1234567890abcdef15",
    href: "#",  // Link for more details (this can be any URL)
    description: "An unauthorized transfer was made from the user's wallet due to a vulnerability in the wallet's smart contract."
  },
  {
    subject: "Oracle Manipulation Attack",
    accused: "0xF3fD29b0b7Bd0D15A8f7d8a5a5b3D4D7892A5576",
    submittedBy: "0xEecdef1234567890abcdeF1234567890abcdef16",
    href: "#",  // Link for more details (this can be any URL)
    description: "An oracle manipulation attack was carried out where the price feed was altered to exploit the DeFi protocol."
  },
  {
    subject: "Pump and Dump Scheme on DEX",
    accused: "0xA3fD29b0b7Bd0D15A8f7d8a5a5b3D4D7892A5577",
    submittedBy: "0xFdcdef1234567890abcdeF1234567890abcdef17",
    href: "#",  // Link for more details (this can be any URL)
    description: "A pump and dump scheme was executed on a decentralized exchange (DEX), artificially inflating the price of a token."
  },
  {
    subject: "Insider Trading on NFT Marketplace",
    accused: "0xB3fD29b0b7Bd0D15A8f7d8a5a5b3D4D7892A5578",
    submittedBy: "0xGecdef1234567890abcdeF1234567890abcdef18",
    href: "#",  // Link for more details (this can be any URL)
    description: "An insider trading incident occurred on an NFT marketplace where a person used privileged information to front-run transactions."
  },
  {
    subject: "Flash Loan Attack on Lending Platform",
    accused: "0xC3fD29b0b7Bd0D15A8f7d8a5a5b3D4D7892A5579",
    submittedBy: "0xHecdef1234567890abcdeF1234567890abcdef19",
    href: "#",  // Link for more details (this can be any URL)
    description: "A flash loan attack was carried out on a lending platform, exploiting a vulnerability in the interest rate calculation logic."
  },
  {
    subject: "Staking Reward Mismanagement",
    accused: "0xD3fD29b0b7Bd0D15A8f7d8a5a5b3D4D7892A5580",
    submittedBy: "0xIecdef1234567890abcdeF1234567890abcdef20",
    href: "#",  // Link for more details (this can be any URL)
    description: "The staking rewards for participants in the DeFi protocol were mismanaged, leading to incorrect payouts."
  },
  {
    subject: "NFT Market Manipulation",
    accused: "0xE3fD29b0b7Bd0D15A8f7d8a5a5b3D4D7892A5581",
    submittedBy: "0xJecdef1234567890abcdeF1234567890abcdef21",
    href: "#",  // Link for more details (this can be any URL)
    description: "A market manipulation scheme took place on a popular NFT platform where prices of certain NFTs were artificially inflated."
  },
];


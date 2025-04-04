// src/data.ts

export interface ComplaintData {
  subject: string;
  accused: string;
  submittedBy: string;
  href: string;

}

export const complaintData: ComplaintData[] = [
  {
    subject: "Unlawful Smart Contract Exploit",
    accused: "0xB1fD29b0b7Bd0D15A8f7d8a5a5b3D4D7892A5573",
    submittedBy: "0xAbcdef1234567890abcdeF1234567890abcdef12",
    href: "#",  // Link for more details (this can be any URL)
  
  },
  {
    subject: "DeFi Protocol Vulnerability",
    accused: "0xC1fD29b0b7Bd0D15A8f7d8a5a5b3D4D7892A5573",
    submittedBy: "0xBbcdef1234567890abcdeF1234567890abcdef13",
    href: "#",  // Link for more details (this can be any URL)
  
  },
  // Add more mock complaints as needed
];

// src/pages/About.tsx

export default function About() {
  return (
    <div className="text-white text-center mt-5 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">About Web3 Beef</h1>
      <p className="text-xs text-zinc-400 mt-1 mb-5">
        Built for transparency. Powered by Ethereum.
      </p>

      <p className="text-md mb-4">
        Web3 Beef is a decentralized public registry for reporting and browsing complaints in the blockchain ecosystem.
        Whether you've encountered bad actors, malicious contracts, or untrustworthy services, this platform gives you a place to speak up—and gives the community the tools to respond.
      </p>

      <h2 className="text-xl font-semibold text-[#ff6fff] mb-2">💸 Submission Fees</h2>
      <p className="text-sm mb-4">
        Posting a complaint requires a <strong>0.003 ETH</strong> fee. This fee exists to prevent spam and potential fraud.
        Only serious submissions with valid evidence are encouraged.
      </p>

      <h2 className="text-xl font-semibold text-[#0edbe5] mb-2">📈 Voting System</h2>
      <p className="text-sm mb-4">
        Each upvote or downvote costs <strong>0.00075 ETH</strong>. When someone upvotes your complaint, <strong>0.00025 ETH</strong> is automatically rewarded to you as the original poster.
        That means once <strong>12 users</strong> find your complaint helpful, you break even. After that, you earn with every upvote that follows.
      </p>

      <h2 className="text-xl font-semibold text-yellow-400 mb-2">🪙 Token + DAO (Coming Soon)</h2>
      <p className="text-sm mb-4">
        A governance token and DAO will be launched in the near future. Token holders will be able to vote on appeals, feature requests,
        and platform improvements to make Web3 Beef fully community-driven.
      </p>
      <p className="text-sm mb-4">
        All participants—both voters and reporters—will receive token allocations based on their engagement and contribution to the platform’s ecosystem.
        This ensures that both accountability and active participation are rewarded.
      </p>

    </div>
  );
}
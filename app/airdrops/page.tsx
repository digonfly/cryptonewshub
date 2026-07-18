const airdrops = [
  {
    name: "Layer3",
    reward: "XP / Potential Token",
    type: "Quest Platform",
    url: "https://layer3.xyz",
    description:
      "Complete on-chain and social tasks across multiple ecosystems.",
  },
  {
    name: "Galxe",
    reward: "Campaign Rewards / Potential Airdrops",
    type: "Community Platform",
    url: "https://galxe.com",
    description:
      "Join crypto campaigns, collect credentials, and participate in reward programs.",
  },
  {
    name: "Zealy",
    reward: "XP / Whitelist / Token Chances",
    type: "Quest Platform",
    url: "https://zealy.io",
    description:
      "Projects run engagement tasks here for early community members.",
  },
  {
    name: "Intract",
    reward: "On-chain Task Rewards",
    type: "Web3 Discovery",
    url: "https://www.intract.io",
    description:
      "Discover new crypto ecosystems and complete interactive tasks.",
  },
  {
    name: "QuestN",
    reward: "NFT / Token Campaigns",
    type: "Task Platform",
    url: "https://questn.com",
    description:
      "Join promotional quests and Web3 campaign tasks from new projects.",
  },
  {
    name: "CoinMarketCap Airdrops",
    reward: "Listed Airdrop Campaigns",
    type: "Airdrop Listing",
    url: "https://coinmarketcap.com/airdrop/",
    description:
      "Track public airdrop campaigns from listed crypto projects.",
  },
];

const safetyTips = [
  "Never share your seed phrase or private key.",
  "Use a separate wallet for airdrop hunting.",
  "Only use official project links from website / X / Discord.",
  "Do not approve unknown smart contracts blindly.",
  "Avoid sending funds unless you fully understand the risk.",
];

export default function AirdropsPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          🎁 Crypto Airdrops
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover popular platforms where new crypto projects run quests,
          campaigns, and reward programs.
        </p>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 mb-10">
        <h2 className="text-xl font-bold text-yellow-400 mb-3">
          ⚠️ Safety First
        </h2>
        <ul className="space-y-2 text-gray-300">
          {safetyTips.map((tip) => (
            <li key={tip}>• {tip}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {airdrops.map((item) => (
          <div
            key={item.name}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-green-500 transition"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-green-400 text-sm font-semibold">
                {item.type}
              </span>
              <span className="text-xs bg-gray-800 px-3 py-1 rounded-full text-gray-300">
                {item.reward}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-3">{item.name}</h2>
            <p className="text-gray-400 mb-5">{item.description}</p>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold px-5 py-3 rounded-xl transition"
            >
              Visit Platform →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
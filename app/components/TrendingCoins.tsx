export default function TrendingCoins() {
  const coins = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$118,450",
      change: "+2.3%",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,180",
      change: "+1.8%",
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$168",
      change: "+5.1%",
    },
    {
      name: "BNB",
      symbol: "BNB",
      price: "$705",
      change: "+1.2%",
    },
  ];

  return (
    <section className="bg-[#111827] text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">
          🔥 Trending Coins
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {coins.map((coin) => (
            <div
              key={coin.symbol}
              className="bg-[#1F2937] rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition"
            >
              <h3 className="text-2xl font-bold">
                {coin.name}
              </h3>

              <p className="text-gray-400 mt-2">
                {coin.symbol}
              </p>

              <p className="text-3xl font-bold mt-5">
                {coin.price}
              </p>

              <p className="text-green-400 mt-2">
                {coin.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
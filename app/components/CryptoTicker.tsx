export default function CryptoTicker() {
  const coins = [
    { name: "BTC", price: "$118,450", change: "+2.3%" },
    { name: "ETH", price: "$3,180", change: "+1.8%" },
    { name: "SOL", price: "$168", change: "+5.1%" },
    { name: "BNB", price: "$705", change: "+1.2%" },
    { name: "XRP", price: "$2.65", change: "+3.4%" },
  ];

  return (
    <section className="bg-black border-y border-gray-800">
      <div className="max-w-7xl mx-auto flex gap-8 overflow-x-auto px-6 py-4">
        {coins.map((coin) => (
          <div
            key={coin.name}
            className="flex items-center gap-3 whitespace-nowrap"
          >
            <span className="font-bold text-cyan-400">{coin.name}</span>
            <span>{coin.price}</span>
            <span className="text-green-400">{coin.change}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
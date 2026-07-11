export default function TradingTips() {
  const tips = [
    {
      title: "Always Use Stop Loss",
      desc: "Protect your capital by setting a stop loss on every trade.",
    },
    {
      title: "Don't FOMO",
      desc: "Never buy a coin just because everyone is talking about it.",
    },
    {
      title: "Take Profits",
      desc: "Book profits regularly instead of waiting for the perfect top.",
    },
  ];

  return (
    <section className="bg-[#111827] text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">
          📈 Trading Tips
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-[#1F2937] p-6 rounded-xl border border-gray-700 hover:border-cyan-400 transition"
            >
              <h3 className="text-2xl font-bold mb-4">
                {tip.title}
              </h3>

              <p className="text-gray-400">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
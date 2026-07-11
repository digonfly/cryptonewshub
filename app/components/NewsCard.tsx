export default function NewsCard() {
  const news = [
    {
      title: "Bitcoin Hits New High 🚀",
      desc: "Bitcoin reaches another all-time high as institutional investors continue buying.",
    },
    {
      title: "Ethereum ETF Update",
      desc: "Ethereum ETFs continue attracting investors across the world.",
    },
    {
      title: "Solana Price Prediction",
      desc: "Experts expect strong growth in Solana over the coming months.",
    },
  ];

  return (
    <section className="bg-[#0B0F19] text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">
          📰 Latest Crypto News
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-gray-700 rounded-xl p-6 hover:border-cyan-400 transition"
            >
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>

              <p className="text-gray-400 mb-6">{item.desc}</p>

              <button className="text-cyan-400 font-semibold hover:underline">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
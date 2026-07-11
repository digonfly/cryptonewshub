export default function AirdropSection() {
  const airdrops = [
    {
      project: "LayerZero",
      reward: "$500 Potential",
      status: "Live",
    },
    {
      project: "zkSync",
      reward: "$300 Potential",
      status: "Upcoming",
    },
    {
      project: "Monad",
      reward: "Early Access",
      status: "New",
    },
  ];

  return (
    <section className="bg-[#0B0F19] text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">
          🎁 Latest Airdrops
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {airdrops.map((item, index) => (
            <div
              key={index}
              className="bg-[#111827] rounded-xl border border-gray-700 p-6 hover:border-cyan-400 transition"
            >
              <h3 className="text-2xl font-bold">
                {item.project}
              </h3>

              <p className="text-cyan-400 mt-4">
                Reward: {item.reward}
              </p>

              <span className="inline-block mt-6 bg-green-600 px-4 py-2 rounded-full text-sm">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
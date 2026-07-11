export default function Hero() {
  return (
    <main className="bg-[#0B0F19] min-h-screen text-white px-8 py-20">
      <span className="bg-cyan-900 text-cyan-300 px-5 py-2 rounded-full">
        🚀 AI Powered Crypto Platform
      </span>

      <h1 className="text-6xl font-bold mt-8 leading-tight">
        Latest Crypto News <br />
        Airdrops &{" "}
        <span className="text-cyan-400">Trading Tips</span>
      </h1>

      <p className="text-gray-400 mt-6 text-xl">
        Stay updated with crypto news, airdrops, trading tips and live market
        data.
      </p>

      <div className="mt-10 flex gap-5">
        <button className="bg-cyan-500 px-8 py-4 rounded-xl font-semibold">
          Explore News
        </button>

        <button className="border border-cyan-500 px-8 py-4 rounded-xl">
          Join Telegram
        </button>
      </div>
    </main>
  );
}
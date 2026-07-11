export default function Newsletter() {
  return (
    <section className="bg-cyan-500 py-20">
      <div className="max-w-4xl mx-auto text-center px-8">
        <h2 className="text-4xl font-bold text-black">
          📬 Subscribe for Daily Crypto Updates
        </h2>

        <p className="text-black mt-4 text-lg">
          Get the latest crypto news, airdrops and trading tips directly in your inbox.
        </p>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-4 rounded-lg w-full md:w-96 text-black"
          />

          <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-900">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
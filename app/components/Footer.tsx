export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">

        <div>
          <h2 className="text-3xl font-bold text-cyan-400">
            CryptoNewsHub
          </h2>

          <p className="text-gray-400 mt-2">
            Your trusted crypto news platform.
          </p>
        </div>

        <div className="flex gap-6 mt-6 md:mt-0">
          <a href="#">Home</a>
          <a href="#">News</a>
          <a href="#">Airdrops</a>
          <a href="#">Trading Tips</a>
        </div>

      </div>

      <p className="text-center text-gray-500 mt-8">
        © 2026 CryptoNewsHub. All Rights Reserved.
      </p>
    </footer>
  );
}
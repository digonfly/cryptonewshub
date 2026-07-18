"use client";

import { useState } from "react";

interface Props {
  coinId: string;
  coinName: string;
  coinSymbol: string;
  currentPrice: number;
}

export default function PriceAlertButton({
  coinId,
  coinName,
  coinSymbol,
  currentPrice,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [targetPrice, setTargetPrice] = useState(currentPrice.toString());
  const [condition, setCondition] = useState<"above" | "below">("above");
  const [success, setSuccess] = useState(false);

  const handleSaveAlert = () => {
    const alert = {
      id: Date.now().toString(),
      coinId,
      coinName,
      coinSymbol,
      targetPrice: parseFloat(targetPrice),
      condition,
      createdAt: new Date().toISOString(),
      triggered: false,
    };

    const stored = localStorage.getItem("priceAlerts");
    const alerts = stored ? JSON.parse(stored) : [];
    alerts.push(alert);
    localStorage.setItem("priceAlerts", JSON.stringify(alerts));

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowModal(false);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg transition shadow-[0_0_15px_rgba(59,130,246,0.4)]"
      >
        🔔 Set Alert
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">🔔 Set Price Alert</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {success ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-3">✅</div>
                <p className="text-green-400 text-xl font-bold">
                  Alert Saved!
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-400 mb-4">
                  Get notified when <span className="text-white font-bold">{coinName}</span> price goes {condition} target.
                </p>

                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Current Price</p>
                  <p className="text-2xl font-bold text-green-400">
                    ${currentPrice.toLocaleString()}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-2">
                    Condition
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCondition("above")}
                      className={`flex-1 py-2 rounded-lg font-bold transition ${
                        condition === "above"
                          ? "bg-green-500 text-black"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      📈 Above
                    </button>
                    <button
                      onClick={() => setCondition("below")}
                      className={`flex-1 py-2 rounded-lg font-bold transition ${
                        condition === "below"
                          ? "bg-red-500 text-white"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      📉 Below
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">
                    Target Price (USD)
                  </label>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Enter target price"
                  />
                </div>

                <button
                  onClick={handleSaveAlert}
                  disabled={!targetPrice || parseFloat(targetPrice) <= 0}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition"
                >
                  Save Alert
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
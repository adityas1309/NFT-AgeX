import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";

const NFTGoAutoTrade = () => {
  const [tradeData, setTradeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTradeDecision = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://nft-age-x.vercel.app/api/auto-trade/nftgo");
      setTradeData(response.data);
    } catch (err) {
      setError("Failed to fetch trade decision.");
      console.error("❌ Fetch Error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTradeDecision();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex gap-4">
            <FiTrendingUp className="w-8 h-8 text-black" />
            <h2 className="text-2xl font-bold text-black">
              AI Trading Signals  
            </h2>
          </div>

          <p className="text-gray-600 mt-1 text-sm">
            Real-time NFT market intelligence powered by AI
          </p>
        </div>

        <button
          onClick={fetchTradeDecision}
          className={`relative overflow-hidden px-6 py-3 font-medium transition-all border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] ${
            loading ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.02]"
          }`}
          disabled={loading}
        >
          <span className="text-black flex items-center gap-2">
            {loading ? (
              <>
                <span className="animate-pulse">Analyzing</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-200" />
                </div>
              </>
            ) : (
              <>
                Refresh Signals
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </>
            )}
          </span>
        </button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-red-100 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] flex items-center gap-3"
        >
          <div className="flex-1">
            <p className="text-red-600 font-medium">Analysis Error</p>
            <p className="text-red-800/80 text-sm mt-1">{error}</p>
          </div>
        </motion.div>
      )}

      {tradeData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 mt-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {tradeData.tradeResponses?.length > 0 ? (
              tradeData.tradeResponses.map((trade, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative bg-white p-4 border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-black truncate">
                        {trade.nft}
                      </h4>
                    </div>
                    <span
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 border-2 border-black shadow-[2px_2px_0_0_#000] ${
                        trade.action === "BUY"
                          ? "bg-green-100 text-black"
                          : trade.action === "SELL"
                          ? "bg-red-100 text-black"
                          : "bg-gray-100 text-black"
                      }`}
                    >
                      {trade.action === "BUY" ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      {trade.action}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-800 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border-2 border-black">
                      {trade.reason}
                    </p>

                    {trade.tradeResponse?.message && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border-2 border-black flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-black flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-black text-sm flex-1">
                          {trade.tradeResponse.message}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : loading ? (
              <div className="col-span-full">
                <div className="animate-pulse space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="h-32 bg-gray-100 rounded-lg border-2 border-black"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="col-span-full p-6 text-center border-2 border-black rounded-lg flex flex-col items-center justify-center gap-3 min-h-[200px] shadow-[4px_4px_0_0_#000]">
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-black font-medium">
                  No active trading signals detected
                </p>
                <p className="text-gray-600 text-sm">
                  New recommendations will appear here
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NFTGoAutoTrade;
import { useState, useEffect } from "react";
import OpenSea from "./OpenSea";
import AiAnalysis from "./AiAnalysis";
import TwitterMsg from "./TwitterMsg";
import AiTrade from "./AiTrade";

const AISection = () => {
  const [tradeData, setTradeData] = useState(() => {
    const savedData = localStorage.getItem("tradeData");
    return savedData ? JSON.parse(savedData) : null;
  });
  const [loading, setLoading] = useState(!tradeData);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch("https://nft-age-x.vercel.app/api/auto-trade");
      if (!response.ok) {
        throw new Error("Failed to fetch AI analysis");
      }
      const data = await response.json();

      console.log("📡 Received Trade Data:", data);
      setTradeData(data);

      if (data && data.token) {
        setTradeData(data);
      }
      setError(null);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setError("Failed to fetch AI analysis");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!tradeData) {
      fetchData();
    }
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4 border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xl font-bold">LOADING AI ANALYSIS</p>
          <p className="text-gray-600 font-medium">Analyzing market data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4 border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
          <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl font-bold">!</span>
          </div>
          <p className="text-xl font-bold">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-white border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all font-bold"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  if (!tradeData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4 border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
          <p className="text-xl font-bold">NO TRADE DATA</p>
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-white border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all font-bold"
          >
            FETCH DATA
          </button>
        </div>
      </div>
    );
  }

  const {
    token = "N/A",
    telegramMessage = "No message found",
    twitterMessages = [],
    openSeaData = null,
    aiDecision = { action: "No Action", reason: "No AI analysis available" },
  } = tradeData;

  return (
    <div className="w-full min-h-screen bg-white p-4 sm:p-8 relative">
      {isRefreshing && (
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] z-10">
          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-bold">REFRESHING DATA...</span>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-12 col h-fit">
          <div className="lg:col-start-1 lg:col-end-2 lg:row-span-1 lg:order-1">
            <AiAnalysis aiAnalysis={aiDecision.reason} />
          </div>
          <div className="lg:col-start-1 lg:col-end-2 lg:row-span-1 lg:order-3">
            <AiTrade
              token={token}
              action={aiDecision.action}
              telegramMessage={telegramMessage}
            />
          </div>
          <div className="lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3 h-full lg:order-2">
            <OpenSea openSeaData={openSeaData} />
          </div>
        </div>

        <div>
          <TwitterMsg twitterMessages={twitterMessages} />
        </div>
      </div>
    </div>
  );
};

export default AISection;

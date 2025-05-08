export const fetchMarketVolume = async () => {
    try {
      const response = await fetch("https://nft-age-x.vercel.app/api/analytics/market-volume");
      return await response.json();
    } catch (error) {
      console.error("❌ Error Fetching Market Volume:", error);
      return { dates: [], volume: [] };
    }
  };
  
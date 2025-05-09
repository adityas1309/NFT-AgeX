import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const API_KEY = process.env.OPENSEA_API_KEY;

if (!API_KEY) {
  console.error("❌ ERROR: OpenSea API Key is missing! Check your .env file.");
  process.exit(1);
}

const fetchHistoricalData = async (collectionSlug) => {
  try {
    console.log(`🔍 Fetching stats for collection: ${collectionSlug}`);

    const response = await axios.get(`https://api.opensea.io/api/v2/collections/${collectionSlug}/stats`, {
      headers: {
        "Accept": "application/json",
        "x-api-key": API_KEY
      }
    });

    const data = response.data;
    if (!data || !data.total) {
      console.log("⚠️ No valid stats found. Check the collection slug.");
      return null;
    }

    const stats = {
      collection: collectionSlug,
      floor_price: data.total.floor_price || 0,
      floor_price_symbol: data.total.floor_price_symbol || "ETH",
      total_sales: data.total.sales || 0,
      average_price: data.total.average_price || 0,
      num_owners: data.total.num_owners || 0,
      market_cap: data.total.market_cap || 0,
      one_day_volume: data.intervals?.[0]?.volume || 0,
      one_day_sales: data.intervals?.[0]?.sales || 0,
      seven_day_volume: data.intervals?.[1]?.volume || 0,
      seven_day_sales: data.intervals?.[1]?.sales || 0,
      thirty_day_volume: data.intervals?.[2]?.volume || 0,
      thirty_day_sales: data.intervals?.[2]?.sales || 0,
    };

    console.log("✅ Processed Collection Stats:", stats);
    return stats;

  } catch (error) {
    console.error("❌ OpenSea API Error:", error.response?.data || error.message);
    return null;
  }
};

export default fetchHistoricalData;

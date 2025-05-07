import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const NFTGO_API_KEY1 = process.env.NFTGO_API_KEY1;
const NFTGO_API_KEY2 = process.env.NFTGO_API_KEY2;
const BASE_URL = "https://data-api.nftgo.io/eth/v1";

const convertTimestamps = (timestamps) => {
  return timestamps.map(ts => new Date(ts * 1000).toISOString().split("T")[0]);
};

const getISODate = (daysAgo) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysAgo);
  return date.toISOString().split(".")[0] + "+00:00";
};

router.get("/whale-activity", async (req, res) => {
  try {
    const url = new URL("https://data-api.nftgo.io/eth/v1/whale/");
    url.searchParams.append("sort_by", "portfolio_value");
    url.searchParams.append("include_contract", "false");
    url.searchParams.append("asc", "false");
    url.searchParams.append("offset", "0");
    url.searchParams.append("limit", "20");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": NFTGO_API_KEY1,
      },
    });

    const data = await response.json();

    console.log("🔹 API Raw Response:", data);

    if (!data || !data.whale_list) {
      throw new Error("Invalid whale activity data structure");
    }

    res.json(data.whale_list);
  } catch (error) {
    console.error(
      "❌ Error Fetching Whale Activity:",
      error.message
    );
    res.status(500).json({ error: "Failed to fetch whale activity" });
  }
});

router.get("/top-collections", async (req, res) => {
  try {
    const response = await fetch("https://data-api.nftgo.io/eth/v1/market/rank/nft/24h?by=price&category=ALL&offset=0&limit=10", {
      headers: { "X-API-KEY": NFTGO_API_KEY2 },
    });
    const data = await response.json();
    console.log("🔹 AlI Raw Response:", data.nfts);
    if (!data.nfts) {
      throw new Error("Invalid top collections data");
    }

    res.json(data.nfts);
  } catch (error) {
    console.error("❌ Error Fetching Top Collections:", error.message);
    res.status(500).json({ error: "Failed to fetch top collections" });
  }
});

router.get("/market-volume", async (req, res) => {
  try {
    const start_time = getISODate(29);
    const end_time = getISODate(0);

    const url = `${BASE_URL}/market/chart/volume?start_time=${encodeURIComponent(start_time)}&end_time=${encodeURIComponent(end_time)}&unit=USD`;

    const response = await fetch(url, {
      headers: { "X-API-KEY": NFTGO_API_KEY2 },
    });

    const data = await response.json();

    const formattedData = {
      dates: convertTimestamps(data.x),
      volume: data.y,
    };

    res.json(formattedData);
  } catch (error) {
    console.error("❌ Error Fetching Market Volume Chart:", error.message);
    res.status(500).json({ error: "Failed to fetch market volume data." });
  }
});

export default router;


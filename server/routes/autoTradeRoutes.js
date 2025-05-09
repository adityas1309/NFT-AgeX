import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import getAIAnalysis from "../utils/getAIAnalysis.js";
import Transaction from "../models/Transaction.js";
import { buyNFT, sellNFT } from "../utils/buy_nft.js";
import { getLiveTweets } from "../utils/twitter_sentiment.js";
import { getFakeTweets } from "../utils/fake_tweets.js";
import Message from "../models/Message.js";
import fetchHistoricalData from "../utils/fetchHistoricalData.js";

dotenv.config();

const autoTradeRouter = express.Router();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;

const getLastUpdateId = async () => {
  try {
    const lastMessage = await Message.findOne().sort({ update_id: -1 }).select("update_id");
    return lastMessage ? lastMessage.update_id : 0;
  } catch (error) {
    console.error("⚠️ Error fetching last update ID:", error.message);
    return 0;
  }
};

const getTelegramMessages = async () => {
  try {
    const lastUpdateId = await getLastUpdateId();
    console.log(`🚀 Fetching Telegram messages since update ID: ${lastUpdateId}`);

    const response = await axios.get(`${TELEGRAM_URL}?offset=${lastUpdateId + 1}&timeout=10`);
    if (!response.data.result || response.data.result.length === 0) {
      console.log("🔄 No new messages.");
      return [];
    }

    const messages = response.data.result
      .filter((msg) => msg.message && msg.message.text)
      .map((msg) => ({
        text: msg.message.text,
        username: msg.message.from?.username || "Unknown",
        timestamp: new Date(msg.message.date * 1000),
        update_id: msg.update_id,
        telegram_data: msg
      }))
      .filter((msg) => msg.text.toLowerCase().includes("nft"));

    if (messages.length > 0) {
      console.log(`✅ NFT Telegram messages fetched: ${messages.length}`);
    } else {
      console.log("🔄 No new NFT messages detected.");
    }

    return messages;
  } catch (error) {
    console.error("❌ Error Fetching Telegram Messages:", error.message);
    return [];
  }
};

const getTwitterSentiment = async (nftToken) => {
  try {
    const liveTweets = await getLiveTweets(nftToken);
    const parsed = JSON.parse(liveTweets);

    if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
      throw new Error("No tweets found or parsing failed");
    }

    return parsed;
  } catch (err) {
    console.warn(
      "⚠️ Twitter fetch failed, falling back to AI-generated tweets."
    );
    try {
      const fallbackTweets = await getFakeTweets(nftToken);
      return JSON.parse(fallbackTweets);
    } catch (fallbackError) {
      console.error("❌ Groq AI fallback also failed:", fallbackError);
      throw new Error("Failed to retrieve both live and fake tweets.");
    }
  }
};

autoTradeRouter.get("/nftgo", async (req, res) => {
  try {
    console.log("🚀 Fetching NFTGo Data for AI Trading Decision...");

    let topCollections = [],
      marketVolume = {},
      whaleActivity = {};
    try {
      const [topCollectionsRes, marketVolumeRes, whaleActivityRes] =
        await Promise.all([
          axios.get("https://nft-age-x.vercel.app/api/analytics/top-collections"),
          axios.get("https://nft-age-x.vercel.app/api/analytics/market-volume"),
          axios.get("https://nft-age-x.vercel.app/api/analytics/whale-activity"),
        ]);

      topCollections = topCollectionsRes.data.slice(0, 5);
      marketVolume = marketVolumeRes.data;
      whaleActivity = whaleActivityRes.data;
    } catch (error) {
      console.error("❌ NFTGo API Fetch Error:", error);
    }

    if (!topCollections.length) {
      return res.json({ message: "No NFT data available for trading." });
    }

    const analysisPrompt = `
      You are an expert AI trader. Analyze the summarized NFTGo data and return only JSON.

      **Top NFT Collections:**
      ${topCollections
        .map((tc) => {
          const lastPrice = tc.last_price?.value ?? "N/A";
          const currency = tc.last_price?.crypto_unit ?? "Unknown";
          const rarityRank = tc.rarity?.rank ?? "Unknown";
          const priceChangeETH = tc.price_change_eth ?? "N/A";
          return `${tc.name}: Last Price ${lastPrice} ${currency}, Rarity Rank ${rarityRank}, Price Change ${priceChangeETH} ETH`;
        })
        .join("; ")}

      **Market Volume Summary:**
      Total Volume: ${marketVolume.total}, 7-day Trend: ${marketVolume.trend_7d}

      **Whale Activity Summary:**
      Active Whales: ${whaleActivity.active_whales}, Top Whale Holdings: ${
      whaleActivity.top_holdings
    }

      **IMPORTANT: Return JSON in this format:**
      \`\`\`json
      [
        { "nft": "NFT Name", "action": "BUY" | "SELL" | "HOLD", "reason": "Your explanation here" }
      ]
      \`\`\`
    `;

    let aiDecision = [];
    try {
      let aiResponse = await getAIAnalysis(analysisPrompt);
      console.log("📝 Raw AI Response:", aiResponse);

      let extractedJson = "";

      const jsonMatch = aiResponse.match(/```json([\s\S]*?)```/);
      if (jsonMatch && jsonMatch[1]) {
        extractedJson = jsonMatch[1].trim();
      } else {
        const jsonStartIndex = aiResponse.indexOf("[");
        const jsonEndIndex = aiResponse.lastIndexOf("]");

        if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
          extractedJson = aiResponse.substring(
            jsonStartIndex,
            jsonEndIndex + 1
          );
        } else {
          throw new Error("AI response did not contain valid JSON.");
        }
      }

      aiDecision = JSON.parse(extractedJson);

      if (!Array.isArray(aiDecision)) {
        throw new Error("AI response must be an array of trade decisions.");
      }
    } catch (error) {
      console.error("❌ AI Analysis Failed:", error.message);
      aiDecision = [
        { nft: "N/A", action: "HOLD", reason: "AI analysis unavailable." },
      ];
    }

    console.log("🤖 AI Decisions:");
    aiDecision.forEach((decision) => {
      console.log(`${decision.action} - ${decision.nft} - ${decision.reason}`);
    });

    let tradeResponses = [];

    for (const decision of aiDecision) {
      let tradeResponse = { message: `No trade executed for ${decision.nft}.` };

      if (decision.action === "BUY" || decision.action === "SELL") {
        try {
          const existingTrade = await Transaction.findOne({
            nft: decision.nft,
            action: decision.action,
          });
      
          if (existingTrade) {
            console.log(`⚠️ Duplicate ${decision.action} action detected for ${decision.nft}. Skipping trade.`);
            tradeResponse = {
              message: `Duplicate ${decision.action} action detected. Trade skipped.`,
            };
          } else {
            tradeResponse = decision.action === "BUY" 
              ? await buyNFT(decision.nft) 
              : await sellNFT(decision.nft);
      
            await Transaction.create({
              nft: decision.nft,
              action: decision.action,
              status: tradeResponse.status || "Completed",
              timestamp: new Date(),
              txHash: tradeResponse.txHash,
              explorerLink: tradeResponse.explorerLink,
              price: tradeResponse.price || "0",
              reason: decision.reason
            });
      
            console.log(`✅ ${decision.action} transaction recorded for ${decision.nft}`);
          }
        } catch (tradeError) {
          console.error(`❌ ${decision.action} Failed for ${decision.nft}:`, tradeError.message);
          tradeResponse = {
            error: `${decision.action} attempt failed for ${decision.nft}`,
          };
          
          await Transaction.create({
            nft: decision.nft,
            action: decision.action,
            status: "Failed",
            timestamp: new Date(),
            error: tradeError.message
          });
        }
      }

      tradeResponses.push({
        nft: decision.nft,
        action: decision.action,
        reason: decision.reason,
        tradeResponse,
      });
    }

    return res.json({
      aiDecisions: aiDecision,
      tradeResponses,
      marketVolume,
      whaleActivity,
    });
  } catch (error) {
    console.error("❌ Auto Trade Error:", error);
    return res.status(500).json({ error: "Failed to execute auto-trade" });
  }
});

export default autoTradeRouter;
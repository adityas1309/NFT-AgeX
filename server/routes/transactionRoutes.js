import express from "express";
import dotenv from "dotenv";
import Transaction from "../models/Transaction.js";


dotenv.config();

const transactionRouter = express.Router();

transactionRouter.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ timestamp: -1 })
      .limit(10);

    const uniqueTransactions = [];
    const seen = new Set();

    for (const tx of transactions) {
      const key = `${tx.nft}-${tx.action}`;
      if (!seen.has(key)) {
        uniqueTransactions.push(tx);
        seen.add(key);
      }
    }

    res.json(uniqueTransactions);
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

export default transactionRouter;
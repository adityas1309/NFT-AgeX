import express from "express";
import { verifyMessage } from "ethers";
import ApprovedWallet from "../models/ApprovedWallet.js";

const router = express.Router();

router.post("/revoke-auto-trading", async (req, res) => {
  try {
    const { walletAddress, signature } = req.body;

    if (!walletAddress || !signature) {
      return res.status(400).json({ error: "Missing wallet address or signature" });
    }

    const message = "Revoke auto-trading";
    const recoveredAddress = verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ error: "Signature verification failed" });
    }

    await ApprovedWallet.findOneAndUpdate(
      { wallet: walletAddress },
      { approved: false },
      { upsert: true, new: true }
    );

    return res.json({ message: "✅ Auto-trading has been revoked." });
  } catch (err) {
    console.error("Error revoking auto-trading:", err);
    return res.status(500).json({ error: "Failed to revoke auto-trading" });
  }
});

export default router;

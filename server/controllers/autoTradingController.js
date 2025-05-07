import { ethers } from "ethers";
import ApprovedWallet from "../models/ApprovedWallet.js";

export const approveAutoTrading = async (req, res) => {
  const { walletAddress, signature } = req.body;
  const message = "Approve auto-trading";

  try {
    const recovered = ethers.verifyMessage(message, signature);

    if (recovered.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ error: "Signature verification failed" });
    }

    await ApprovedWallet.findOneAndUpdate(
      { wallet: walletAddress },
      { wallet: walletAddress, approved: true },
      { upsert: true }
    );

    res.json({ message: "Auto-trading approved" });
  } catch (error) {
    console.error("Approval error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

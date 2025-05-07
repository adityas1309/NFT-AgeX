import mongoose from "mongoose";

const approvedWalletSchema = new mongoose.Schema({
  wallet: { type: String, required: true, unique: true },
  approved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("ApprovedWallet", approvedWalletSchema);

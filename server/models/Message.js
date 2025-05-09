import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  username: { type: String, default: "Unknown" },
  timestamp: { type: Date, default: Date.now },
  update_id: { type: Number, unique: true, required: true },
  telegram_data: { type: mongoose.Schema.Types.Mixed, default: {} },

  twitter_sentiment: [{
    tweet: String,
    sentiment: { type: String, enum: ["positive", "negative", "neutral"], default: "neutral" }
  }],

  openSea_data: { type: mongoose.Schema.Types.Mixed, default: {} },

  ai_decision: {
    action: { type: String, enum: ["BUY", "SELL", "HOLD"], default: "HOLD" },
    reason: { type: String, default: "" }
  },

  nft_token: { type: String, default: "" },

  tradeResponse : {
    message: { type: String, default: "" },
    txhash: { type: String, default: "" },
  }
});

MessageSchema.index({ timestamp: -1 });
MessageSchema.index({ nft_token: 1 });

export default mongoose.model("Message", MessageSchema);

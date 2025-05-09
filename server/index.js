import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import autoTradingRoutes from "./routes/autoTradingRoutes.js";
import revokeAutoTradingRoute from "./routes/revokeAutoTrading.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import autoTradeRouter from "./routes/autoTradeRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});

app.use("/api", autoTradingRoutes);
app.use("/api", revokeAutoTradingRoute);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auto-trade", autoTradeRouter);
app.use("/api/transactions", transactionRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app; 
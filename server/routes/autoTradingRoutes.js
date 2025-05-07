import express from "express";
import { approveAutoTrading } from "../controllers/autoTradingController.js";

const router = express.Router();
router.post("/approve-auto-trading", approveAutoTrading);
export default router;

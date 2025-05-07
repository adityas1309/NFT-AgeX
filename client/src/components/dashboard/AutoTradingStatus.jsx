import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../context/WalletContext";
import DummyNFTTraderABI from "../../abi/DummyNFTTrader.js";
import { ethers } from "ethers";
import { motion } from "framer-motion";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export default function AutoTradingStatus() {
  const { account, approveWithMetaMask, revokeApprovalWithMetaMask } = useContext(WalletContext);
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchApprovalStatus = async () => {
    if (!account || !window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, DummyNFTTraderABI, provider);
    const isApproved = await contract.isApproved(account);
    setApproved(isApproved);
  };

  useEffect(() => {
    fetchApprovalStatus();
  }, [account]);

  const toggleApproval = async () => {
    setLoading(true);
    try {
      if (!approved) {
        const res = await approveWithMetaMask();
        if (res.message) {
          alert(res.message);
        }
      } else {
        const res = await revokeApprovalWithMetaMask();
        if (res.message) {
          alert(res.message);
        }
      }
      await fetchApprovalStatus();
    } catch (err) {
      console.error(err);
      alert("Error while updating approval.");
    }
    setLoading(false);
  };

  return (
    <div
      className="p-6 bg-white border-2 border-black"
      style={{ boxShadow: "8px 8px 0 0 #000" }}
    >
      <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
        <span className="text-[#FF3E3E]">⚙️</span>
        <span style={{ textShadow: "2px 2px 0 #d2d2d2" }}>
          Auto-Trading Status
        </span>
      </h2>

      <div className="flex items-center justify-between">
        <span className="font-bold text-black">
          {approved ? (
            <span className="text-green-600">✅ ACTIVE</span>
          ) : (
            <span className="text-[#FF3E3E]">❌ DISABLED</span>
          )}
        </span>

        <motion.button
          onClick={toggleApproval}
          disabled={loading}
          className={`border-2 border-black px-4 py-2 font-bold ${
            approved ? "bg-[#FF3E3E] text-white" : "bg-[#3E6BFF] text-white"
          }`}
          style={{ boxShadow: "4px 4px 0 0 #000" }}
          whileHover={{
            y: -2,
            boxShadow: "6px 6px 0 0 #000",
          }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white rounded-full animate-spin" />
              PROCESSING
            </div>
          ) : approved ? (
            "REVOKE"
          ) : (
            "APPROVE"
          )}
        </motion.button>
      </div>
    </div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import {
  FiDollarSign,
  FiActivity,
  FiMessageSquare,
  FiCopy,
} from "react-icons/fi";

const AiTrade = ({ token, action, telegramMessage }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(telegramMessage);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all"
    >
      <div className="flex items-center gap-3 mb-6 pb-2 border-b-2 border-black">
        <div className="p-2 bg-[#FF3E3E] border-2 border-black shadow-[4px_4px_0_0_#000]">
          <FaRocket className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-black">AI TRADING SIGNAL</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg border-2  shadow-[4px_4px_0_0_#000]">
          <div className="p-1 bg-[#3E6BFF] border-2 border-black shadow-[2px_2px_0_0_#000]">
            <FiDollarSign className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600 font-bold">
              TRACKING TOKEN
            </p>
            <p className="font-bold text-base sm:text-lg text-black truncate">
              {token || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg border-2 shadow-[4px_4px_0_0_#000]">
          <div className="p-1 bg-[#FFD700] border-2 border-black shadow-[2px_2px_0_0_#000]">
            <FiActivity className="w-4 h-4 text-black" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600 font-bold">
              RECOMMENDED ACTION
            </p>
            <p
              className={`font-bold text-base sm:text-lg ${
                action?.toLowerCase() === "buy"
                  ? "text-green-800"
                  : "text-red-800"
              }`}
            >
              {action || "ANALYZING..."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className="p-1 bg-[#FF3E3E] border-2 border-black shadow-[2px_2px_0_0_#000]">
            <FiMessageSquare className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-gray-600">
            MARKET SIGNAL
          </h3>
          <motion.button
            onClick={copyToClipboard}
            className="ml-auto p-1 bg-white border-2 border-black rounded shadow-[2px_2px_0_0_#000]"
            title="Copy message"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiCopy className="w-4 h-4 text-black" />
          </motion.button>
        </div>
        <div className="p-3 sm:p-4 bg-white rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] max-h-40 overflow-y-auto">
          <p className="text-black font-mono text-xs sm:text-sm leading-relaxed font-medium">
            {telegramMessage || "WAITING FOR MARKET SIGNALS..."}
          </p>
        </div>
      </div>
      
    </motion.div>
  );
};

export default AiTrade;

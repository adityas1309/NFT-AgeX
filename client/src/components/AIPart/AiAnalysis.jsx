import React from "react";
import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";

const AiAnalysis = ({ aiAnalysis }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all h-full"
    >
      <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-black">
        <div className="p-2 bg-[#FF3E3E] border-2 border-black shadow-[4px_4px_0_0_#000]">
          <FiActivity className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-black">
          PREDICTIVE ANALYSIS ENGINE
        </h3>
      </div>

      <div className="pl-2 sm:pl-9">
        <p className="text-black leading-relaxed text-base sm:text-lg font-medium">
          {aiAnalysis || (
            <span className="opacity-90">
              Analyzing market patterns and historical data...
            </span>
          )}
        </p>

        {!aiAnalysis && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="mt-4 h-2 bg-[#3E6BFF] rounded-full border-2 border-black shadow-[2px_2px_0_0_#000]"
          />
        )}
      </div>

      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#3E6BFF] border-2 border-black"></div>
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#FFD700] border-2 border-black"></div>
    </motion.div>
  );
};

export default AiAnalysis;

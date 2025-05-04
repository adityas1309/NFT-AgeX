import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden pt-30 lg:pt-15 px-4 sm:px-6">
      <motion.div
        className="z-10 text-center w-full px-4 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 tracking-tight">
          <span
            className="block text-[#FF3E3E] mb-2"
            style={{ textShadow: "4px 4px 0 #000" }}
          >
            Next-Gen
          </span>
          <span
            className="block text-[#3E6BFF]"
            style={{ textShadow: "4px 4px 0 #000" }}
          >
            NFT Trading
          </span>
        </h1>

        <p className="text-gray-700 text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 font-medium">
          AI-Powered Insights for Decentralized Markets
        </p>

        <motion.button
          onClick={() => navigate("/login")}
          className="bg-[#FFD700] border-2 border-black text-black px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg font-bold transition-all duration-300 hover:shadow-[8px_8px_0_0_#000] relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ boxShadow: "4px 4px 0 0 #000" }}
        >
          Start Trading
          <FiArrowRight className="inline ml-2" />
        </motion.button>
      </motion.div>

      <div className="w-full left-0 right-0 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <motion.div
          className="text-center bg-white py-6 sm:py-8 border-2 border-black rounded-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ boxShadow: "8px 8px 0 0 #000" }}
        >
          <div className="text-[#FF3E3E] text-xl sm:text-2xl font-bold mb-1">
            $12.4M
          </div>
          <div className="text-gray-700 text-sm sm:text-md font-medium">
            24h Volume
          </div>
          <div className="text-green-600 text-xs sm:text-sm font-bold">
            +1.7%
          </div>
        </motion.div>

        <motion.div
          className="text-center bg-white py-6 sm:py-8 border-2 border-black rounded-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ boxShadow: "8px 8px 0 0 #000" }}
        >
          <div className="text-[#3E6BFF] text-xl sm:text-2xl font-bold mb-1">
            2.1k
          </div>
          <div className="text-gray-700 text-sm sm:text-md font-medium">
            Collections
          </div>
          <div className="text-green-600 text-xs sm:text-sm font-bold">
            +11%
          </div>
        </motion.div>

        <motion.div
          className="text-center bg-white py-6 sm:py-8 border-2 border-black rounded-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ boxShadow: "8px 8px 0 0 #000" }}
        >
          <div className="text-[#FFD700] text-xl sm:text-2xl font-bold mb-1">
            48.2k
          </div>
          <div className="text-gray-700 text-sm sm:text-md font-medium">
            Trades
          </div>
          <div className="text-green-600 text-xs sm:text-sm font-bold">+4%</div>
        </motion.div>
      </div>

      <div
        className="absolute top-10 left-4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-2 border-black bg-[#FF3E3E]"
        style={{ boxShadow: "8px 8px 0 0 #000" }}
      ></div>
      <div
        className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-black bg-[#3E6BFF] -z-10 md:z-0"
        style={{ boxShadow: "8px 8px 0 0 #000" }}
      ></div>
      <div
        className="hidden sm:block absolute top-1/3 right-1/4 w-12 h-12 md:w-16 md:h-16 border-2 border-black bg-[#FFD700]"
        style={{ boxShadow: "8px 8px 0 0 #000" }}
      ></div>
    </section>
  );
};

export default Hero;

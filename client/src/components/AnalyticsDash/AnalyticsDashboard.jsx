import React from "react";
import { motion } from "framer-motion";
import ErrorMessage from "../ErrorMessage";
import useAnalyticsData from "../../hooks/useAnalyticsData";
import TopCollections from "./TopCollections";
import WhaleActivity from "./WhaleActivity";
import NFTMarketChart from "./NFTMarketChart";
import { FiTrendingUp, FiImage } from "react-icons/fi";

const AnalyticsDashboard = () => {
  const { whaleActivity, topCollections, error } = useAnalyticsData();

  return (
    <div className="w-full min-h-screen bg-white p-4 sm:p-8 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 max-w-[95%] space-y-8"
      >
        <ErrorMessage error={error} />
        <div className="grid grid-cols-1 gap-12 w-full">
          <div className="relative bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <FiTrendingUp className="w-8 h-8 text-black" />
              <h2 className="text-2xl font-bold text-black">
                Market Volume Trends
              </h2>
            </div>
            <NFTMarketChart />
          </div>
          <div>
            <TopCollections topCollections={topCollections} />
          </div>

          <div>
            <WhaleActivity whaleActivity={whaleActivity} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
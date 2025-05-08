import React from "react";
import { motion } from "framer-motion";
import ErrorMessage from "../ErrorMessage";
import useAnalyticsData from "../../hooks/useAnalyticsData";

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
  
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
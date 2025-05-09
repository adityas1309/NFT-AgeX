import React from "react";
import { motion } from "framer-motion";
import {
  FiBox,
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiPieChart,
  FiActivity,
} from "react-icons/fi";

const OpenSea = ({ openSeaData }) => {
  const formatETH = (value) => {
    const num = Number(value);
    return isNaN(num)
      ? "0.00"
      : num.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });
  };

  const MetricCard = ({ icon, title, value, accentColor = "bg-[#3E6BFF]" }) => (
    <div className="p-3 bg-white rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000]">
      <div className="flex items-center gap-2 mb-1">
        <div
          className={`p-1 ${accentColor} border-2 border-black shadow-[2px_2px_0_0_#000]`}
        >
          {icon}
        </div>
        <span className="text-xs sm:text-sm text-gray-600 font-bold">
          {title}
        </span>
      </div>
      <p className="text-base sm:text-lg font-bold text-black truncate">
        {value}
      </p>
    </div>
  );

  const VolumeCard = ({ title, value, change, sales, color }) => (
    <div className="p-3 bg-white rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000]">
      <div className="flex flex-col gap-1">
        <span className="text-xs sm:text-sm text-gray-600 font-bold truncate">
          {title}
        </span>
        <div className="flex justify-between items-center">
          <span className="text-base sm:text-lg font-bold text-black truncate">
            {value}
          </span>
          {change && (
            <span
              className={`text-xs px-2 py-1 rounded-md border-2 border-black font-bold ${
                change > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
              style={{ boxShadow: "2px 2px 0 0 #000" }}
            >
              {change > 0 ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
            </span>
          )}
        </div>
        <span className="text-xs text-gray-600 mt-1 font-medium">
          {sales.toLocaleString()} SALES
        </span>
      </div>
    </div>
  );

  const StatCard = ({ icon, title, value, borderColor = "border-black" }) => (
    <div
      className={`p-3 bg-white rounded-lg border-2 ${borderColor} shadow-[4px_4px_0_0_#000]`}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs sm:text-sm text-gray-600 font-bold">
          {title}
        </span>
      </div>
      <p className="text-base sm:text-lg font-bold text-black">{value}</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all h-full"
    >
      <div className="flex items-center gap-3 mb-6 pb-2 border-b-2 border-black">
        <div className="p-2 bg-[#FF3E3E] border-2 border-black shadow-[4px_4px_0_0_#000]">
          <FiBox className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-black">NFT MARKET ANALYTICS</h3>
      </div>

      {openSeaData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <MetricCard
            icon={<FiUsers className="w-4 h-4 text-white" />}
            title="COLLECTION"
            value={openSeaData.collection || "UNKNOWN"}
            accentColor="bg-[#3E6BFF]"
          />

          <MetricCard
            icon={<FiDollarSign className="w-4 h-4 text-white" />}
            title="FLOOR PRICE"
            value={`${openSeaData.floor_price} ${openSeaData.floor_price_symbol}`}
            accentColor="bg-[#FFD700]"
          />

          <MetricCard
            icon={<FiPieChart className="w-4 h-4 text-white" />}
            title="MARKET CAP"
            value={`${openSeaData.market_cap.toFixed(2)} ETH`}
            accentColor="bg-[#FF3E3E]"
          />

          <div className="col-span-full p-4 bg-white rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1 bg-[#FF3E3E] border-2 border-black shadow-[2px_2px_0_0_#000]">
                <FiTrendingUp className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm font-bold text-gray-600">VOLUME TRENDS</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <VolumeCard
                title="24H VOLUME"
                value={`${formatETH(openSeaData.one_day_volume)} ETH`}
                change={openSeaData.one_day_change}
                sales={openSeaData.one_day_sales}
                color="#FF3E3E"
              />
              <VolumeCard
                title="7D VOLUME"
                value={`${formatETH(openSeaData.seven_day_volume)} ETH`}
                change={openSeaData.seven_day_change}
                sales={openSeaData.seven_day_sales}
                color="#3E6BFF"
              />
              <VolumeCard
                title="30D VOLUME"
                value={`${formatETH(openSeaData.thirty_day_volume)} ETH`}
                change={openSeaData.thirty_day_change}
                sales={openSeaData.thirty_day_sales}
                color="#FFD700"
              />
            </div>
          </div>

          <div className="col-span-full grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              icon={<FiActivity className="w-5 h-5 text-[#FF3E3E]" />}
              title="TOTAL SALES"
              value={openSeaData.total_sales.toLocaleString()}
              borderColor="border-[#FF3E3E]"
            />
            <StatCard
              icon={<FiUsers className="w-5 h-5 text-[#3E6BFF]" />}
              title="UNIQUE OWNERS"
              value={openSeaData.num_owners.toLocaleString()}
              borderColor="border-[#3E6BFF]"
            />
            <StatCard
              icon={<FiDollarSign className="w-5 h-5 text-[#FFD700]" />}
              title="AVG PRICE"
              value={`${openSeaData.average_price.toFixed(2)} ETH`}
              borderColor="border-[#FFD700]"
            />
          </div>
        </div>
      ) : (
        <div className="p-6 text-center border-2 border-black shadow-[4px_4px_0_0_#000]">
          <p className="text-black font-bold">FETCHING MARKET DATA...</p>
          <div className="mt-3 h-2 bg-black rounded-full shadow-[2px_2px_0_0_#000]" />
        </div>
      )}

    </motion.div>
  );
};

export default OpenSea;

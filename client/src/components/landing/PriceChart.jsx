import React from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const PriceChart = () => {
  const labels = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#000",
        titleColor: "#FF3E3E",
        bodyColor: "#fff",
        borderColor: "#000",
        borderWidth: 2,
        padding: 12,
        displayColors: false,
        bodyFont: {
          weight: "bold",
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#000",
          font: {
            size: 10,
            weight: "bold",
          },
        },
      },
      y: {
        position: "right",
        grid: {
          color: "#e5e7eb",
          drawBorder: false,
        },
        ticks: {
          color: "#000",
          font: {
            size: 10,
            weight: "bold",
          },
          callback: (value) => `$${value}`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: [
          3300, 3450, 3400, 3500, 3450, 3500, 3550, 3600, 3650, 3700, 3750,
          3780,
        ],
        borderColor: "#FF3E3E",
        backgroundColor: "rgba(255, 62, 62, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#FF3E3E",
        pointHoverBorderColor: "#000",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  return (
    <section className="relative py-8 sm:py-12 px-4 sm:px-6 bg-white">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="bg-white border-2 border-black p-4 sm:p-6"
          style={{ boxShadow: "8px 8px 0 0 #000" }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 bg-[#FF3E3E] border-2 border-black" />
                <span className="text-black font-bold text-sm sm:text-base">
                  ETH/USD
                </span>
              </div>
              <span className="text-[#FF3E3E] font-bold text-sm sm:text-base">
                $3,675.25
              </span>
              <span className="text-green-600 text-xs sm:text-sm font-bold">
                +5.8%
              </span>
            </div>
          </div>

          <div className="h-[250px] sm:h-[350px] md:h-[400px]">
            <Line options={options} data={data} />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <motion.button
              className="px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2 bg-green-400/70 border-2 border-black text-black font-bold text-sm sm:text-base"
              style={{ boxShadow: "4px 4px 0 0 #000" }}
              whileHover={{
                y: -3,
                boxShadow: "6px 6px 0 0 #000",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Buy Position
            </motion.button>
            <motion.button
              className="px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2 bg-red-400 border-2 border-black text-white font-bold text-sm sm:text-base"
              style={{ boxShadow: "4px 4px 0 0 #000" }}
              whileHover={{
                y: -3,
                boxShadow: "6px 6px 0 0 #000",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Sell Position
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PriceChart;

import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import useMarketVolume from "../../hooks/useMarketVolume";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NFTMarketChart = () => {
  const chartData = useMarketVolume();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { 
          color: "#000", 
          font: { 
            size: 14,
            weight: 'bold'
          },
          padding: 20
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#000",
        borderWidth: 2,
        titleFont: {
          weight: 'bold'
        },
        padding: 12,
        boxShadow: '4px 4px 0 0 #000',
        usePointStyle: true,
      },
    },
    scales: {
      x: { 
        grid: { 
          color: "rgba(0, 0, 0, 0.1)",
          drawBorder: true,
          borderColor: '#000',
          borderWidth: 2
        }, 
        ticks: { 
          color: "#000",
          font: {
            weight: 'bold'
          }
        } 
      },
      y: {
        grid: { 
          color: "rgba(0, 0, 0, 0.1)",
          drawBorder: true,
          borderColor: '#000',
          borderWidth: 2
        },
        ticks: {
          color: "#000",
          font: {
            weight: 'bold'
          },
          callback: (value) => `${value} USD`,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
        tension: 0.1
      },
      point: {
        radius: 5,
        borderWidth: 2,
        hoverRadius: 7
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white p-6"
    >
      <div className="h-96">
        {chartData ? (
          <Line 
            data={chartData} 
            options={chartOptions} 
          />
        ) : (
          <div className="animate-pulse h-full w-full bg-gray-100 border-2 border-black" />
        )}
      </div>
    </motion.div>
  );
};

export default NFTMarketChart;
import { useEffect, useState } from "react";
import { fetchMarketVolume } from "../api/nftApi";

const useMarketVolume = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMarketVolume();
      setChartData({
        labels: data.dates,
        datasets: [
          {
            label: "Market Volume (USD)",
            data: data.volume,
            borderColor: "#22d3ee",
            backgroundColor: "rgba(34, 211, 238, 0.1)",
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.3,
            fill: true,
          },
        ],
      });
    };

    loadData();
  }, []);

  return chartData;
};

export default useMarketVolume;

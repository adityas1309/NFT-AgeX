import { React, useEffect, useState } from "react";

const API_BASE_URL = "https://nft-age-x.vercel.app";

const useAnalyticsData = () => {
  const [whaleActivity, setWhaleActivity] = useState([]);
  const [topCollections, setTopCollections] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [whaleRes, collectionsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/analytics/whale-activity`),
          fetch(`${API_BASE_URL}/api/analytics/top-collections`),
        ]);

        if (!whaleRes.ok || !collectionsRes.ok) {
          throw new Error("API response not OK");
        }

        const whaleData = await whaleRes.json();
        const collectionsData = await collectionsRes.json();

        setWhaleActivity(Array.isArray(whaleData) ? whaleData : []);
        setTopCollections(Array.isArray(collectionsData) ? collectionsData : []);
      } catch (error) {
        console.error("❌ Error fetching analytics:", error.message);
        setError("Failed to fetch analytics data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return { whaleActivity, topCollections, error };
};

export default useAnalyticsData;

import axios from "axios";

const API_URL = "https://nft-age-x.vercel.app";


export const fetchRecentTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch transactions:", error);
    return [];
  }
};

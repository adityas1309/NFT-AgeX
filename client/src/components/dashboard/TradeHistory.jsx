import { useEffect, useState } from "react";

import { motion } from "framer-motion";
export default function TradeHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchTx = async () => {
      const res = await fetch("https://nft-age-x.vercel.app/api/transactions");
      const data = await res.json();
      setHistory(data);
    };

    fetchTx();
  }, []);

  return (
    <div
      className="p-6 bg-white border-2 border-black"
      style={{ boxShadow: "8px 8px 0 0 #000" }}
    >
      <h2
        className="text-xl font-bold text-black mb-4 flex items-center gap-2"
        style={{ textShadow: "2px 2px 0 #d2d2d2" }}
      >
        <span className="text-[#FF3E3E]">📈</span>
        <span>Trade History</span>
      </h2>

      {history.length ? (
        <ul className="space-y-3">
          {history.map((tx, i) => (
            <motion.li
              key={i}
              className="p-3 border-2 border-black"
              style={{ boxShadow: "4px 4px 0 0 #000" }}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`font-bold ${
                    tx.action === "Buy" ? "text-green-600" : "text-[#FF3E3E]"
                  }`}
                >
                  {tx.action.toUpperCase()}
                </span>
                <span className="font-medium text-black">{tx.nft}</span>
                <span className="text-gray-700 font-mono">
                  @ {new Date(tx.timestamp).toLocaleString()}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      ) : (
        <div className="p-4 border-2 border-dashed border-black text-center">
          <p className="font-bold text-gray-800">NO TRADES FOUND</p>
        </div>
      )}
    </div>
  );
}
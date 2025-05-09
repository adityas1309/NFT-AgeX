import React, { useEffect, useState } from "react";
import { fetchRecentTransactions } from "../api/transactions";
import { motion } from "framer-motion";
import { 
  FiActivity, 
  FiArrowUpRight, 
  FiArrowDownLeft, 
  FiClock,
  FiExternalLink,
  FiCheckCircle,
  FiXCircle,
  FiLoader
} from "react-icons/fi";

const statusIcons = {
  Completed: <FiCheckCircle className="text-green-500" />,
  Failed: <FiXCircle className="text-red-500" />,
  Pending: <FiLoader className="text-yellow-500 animate-spin" />
};

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [expandedTx, setExpandedTx] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchRecentTransactions();
      setTransactions(data);
    };
    getTransactions();
  }, []);

  const toggleExpand = (index) => {
    if (expandedTx === index) {
      setExpandedTx(null);
    } else {
      setExpandedTx(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all"
    >
      <div className="flex items-center gap-3 mb-6">
        <FiActivity className="w-6 h-6 text-black" />
        <h2 className="text-2xl font-bold text-black">RECENT ACTIVITY</h2>
      </div>

      {transactions.length === 0 ? (
        <div className="p-4 text-center border-2 border-black shadow-[4px_4px_0_0_#000]">
          <p className="text-black font-bold">NO RECENT TRANSACTIONS</p>
          <div className="mt-3 h-2 bg-black rounded-full shadow-[2px_2px_0_0_#000]" />
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col p-4 bg-white rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg border-2 border-black ${
                      tx.action.toLowerCase() === "buy"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {tx.action.toLowerCase() === "buy" ? (
                      <FiArrowUpRight className="w-5 h-5" />
                    ) : (
                      <FiArrowDownLeft className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-black">{tx.nft}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1 font-medium">
                      {statusIcons[tx.status]}
                      <span>{tx.status}</span>
                      <FiClock className="w-4 h-4" />
                      <span>{new Date(tx.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-black">
                    {isNaN(parseFloat(tx.price))
                      ? "0.00"
                      : parseFloat(tx.price).toFixed(2)}{" "}
                    AVAX
                  </p>
                  <span
                    className={`text-sm font-bold ${
                      tx.action.toLowerCase() === "buy"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {tx.action.toUpperCase()}
                  </span>
                </div>
              </div>

              {expandedTx === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t-2 border-black"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-bold text-gray-500">
                        TRANSACTION HASH
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="font-mono text-sm truncate max-w-[180px]">
                          {tx.txHash}
                        </p>
                        <a
                          href={tx.explorerLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:text-blue-600"
                        >
                          <FiExternalLink />
                        </a>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500">STATUS</p>
                      <div className="flex items-center gap-2 mt-1">
                        {statusIcons[tx.status]}
                        <p className="font-medium">{tx.status}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500">ACTION</p>
                      <p className="font-medium mt-1">{tx.action}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500">
                        TIMESTAMP
                      </p>
                      <p className="font-medium mt-1">
                        {new Date(tx.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {tx.additionalDetails && (
                    <div className="mt-4">
                      <p className="text-sm font-bold text-gray-500">DETAILS</p>
                      <p className="font-medium mt-1">{tx.additionalDetails}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RecentTransactions;
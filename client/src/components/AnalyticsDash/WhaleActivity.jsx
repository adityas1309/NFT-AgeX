import { motion } from "framer-motion";
import { FiDollarSign, FiActivity, FiGrid, FiClock, FiArrowUpRight } from "react-icons/fi";
import { FaEthereum } from "react-icons/fa";
import { format } from "date-fns";
import { GiSpermWhale } from "react-icons/gi";

const shortenAddress = (address) => 
  `${address.slice(0, 6)}...${address.slice(-4)}`;

const WhaleActivity = ({ whaleActivity }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all"
    ><div className="flex items-center gap-3 mb-4">
                  <GiSpermWhale className="w-8 h-8 text-black" />
                  <h3 className="text-2xl font-bold text-black">
                    Whale Activity
                  </h3>
                </div>
      <div className="mb-6">
        <p className="text-gray-600 mt-2 font-bold">Recent high-value NFT transactions</p>
      </div>

      {whaleActivity.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {whaleActivity.map((whale, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-4 bg-white border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaEthereum className="text-black w-5 h-5" />
                    <span className="font-mono text-black font-bold">
                      {shortenAddress(whale.address)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {whale.activities} trades
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-black font-medium">
                    <FiDollarSign className="text-black flex-shrink-0" />
                    <span>
                      ${Number(whale.portfolio_usd).toLocaleString()}
                    </span>
                    <span className="text-gray-400">|</span>
                    <FaEthereum className="text-black" />
                    <span>
                      {Number(whale.portfolio_eth).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-50 rounded-lg border-2 border-black shadow-[2px_2px_0_0_#000]">
                    <p className="text-xs text-gray-600 mb-1 font-bold">Realized P&L</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-green-800">
                        +${Number(whale.realized_profit_usd).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border-2 border-black shadow-[2px_2px_0_0_#000]">
                    <p className="text-xs text-gray-600 mb-1 font-bold">Unrealized P&L</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-blue-800">
                        ${Number(whale.unrealized_profit_usd).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-black font-medium">
                  <div className="flex items-center gap-2">
                    <FiGrid className="text-black" />
                    <span className="text-sm">{whale.nft_num}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiActivity className="text-black" />
                    <span className="text-sm">{whale.collection_num}</span>
                  </div>
                </div>

                {whale.last_trade && (
                  <div className="pt-4 border-t-2 border-black">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <FiClock className="flex-shrink-0" />
                        <span>
                          {format(new Date(whale.last_trade.time), "MMM dd, HH:mm")}
                        </span>
                      </div>
                      <a
                        href={`https://etherscan.io/tx/${whale.last_trade.tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-black hover:text-gray-800 transition-colors font-bold"
                      >
                        <span>Details</span>
                        <FiArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000]">
          <p className="text-gray-600 font-bold">No whale activity detected</p>
        </div>
      )}
    </motion.div>
  );
};

export default WhaleActivity;
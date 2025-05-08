import { motion } from "framer-motion";
import { FiArrowUpRight, FiImage } from "react-icons/fi";
import { FaEthereum } from "react-icons/fa";

const TopCollections = ({ topCollections }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all"
    >
      <div className="flex items-center gap-3 mb-4">
        <FiImage className="w-6 h-6 text-black" />
        <h3 className="text-xl font-bold text-black">Top Collections</h3>
      </div>  
      <div className="mb-6">
        <p className="text-gray-600 mt-2 font-medium">
          Most valuable NFT collections this week
        </p>
      </div>

      {topCollections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCollections.map((nft, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-4 bg-white border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-black shadow-[2px_2px_0_0_#000] group-hover:shadow-[1px_1px_0_0_#000] transition-all">
                      {nft.image ? (
                        <img
                          src={nft.image}
                          alt={nft.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold text-black truncate">
                      {nft.name || "Unknown NFT"}
                    </h4>
                    <p className="text-sm text-gray-600 truncate font-medium">
                      {nft.collection?.name || "Unknown Collection"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg border-2 border-black shadow-[2px_2px_0_0_#000]">
                    <p className="text-xs text-gray-600 mb-1 font-bold">
                      Floor Price
                    </p>
                    <div className="flex items-center gap-1">
                      <FaEthereum className="text-black" />
                      <span className="text-sm font-bold text-black">
                        {nft.last_price?.value
                          ? Number(nft.last_price.value).toFixed(2)
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg border-2 border-black shadow-[2px_2px_0_0_#000] ${
                      nft.price_change_eth >= 0 ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    <p className="text-xs text-gray-600 mb-1 font-bold">
                      24h Change
                    </p>
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-sm font-bold ${
                          nft.price_change_eth >= 0
                            ? "text-green-800"
                            : "text-red-800"
                        }`}
                      >
                        {nft.price_change_eth?.toFixed(2) || "N/A"} ETH
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <span className="px-2 py-1 bg-gray-100 rounded-md border border-black">
                      #{nft.rarity?.rank ?? "N/A"}
                    </span>
                    <span className="text-black">
                      Rarity: {nft.rarity?.score?.toFixed(2) || "N/A"}
                    </span>
                  </div>
                </div>

                {nft.owner?.address && (
                  <div className="pt-4 border-t-2 border-black">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <span className="truncate">
                          {nft.owner.address.slice(0, 6)}...
                          {nft.owner.address.slice(-4)}
                        </span>
                      </div>
                      <a
                        href={`https://etherscan.io/address/${nft.owner.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-black hover:text-gray-800 transition-colors font-bold"
                      >
                        <span>Profile</span>
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
          <p className="text-gray-600 font-bold">
            No collection data available
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default TopCollections;

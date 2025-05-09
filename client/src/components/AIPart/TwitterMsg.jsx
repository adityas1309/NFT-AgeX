import React from "react";
import { motion } from "framer-motion";
import { FiTwitter, FiHeart, FiAlertTriangle, FiMeh, FiCopy } from "react-icons/fi";

const TwitterMsg = ({ twitterMessages }) => {
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return <FiHeart className="w-4 h-4 text-white" />;
      case "negative":
        return <FiAlertTriangle className="w-4 h-4 text-white" />;
      default:
        return <FiMeh className="w-4 h-4 text-black" />;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const randomAuthors = [
    { name: "CryptoWhale", handle: "crypto_whale", avatar: "/avatars/avatar1.png" },
    { name: "NFTGenius", handle: "nft_genius", avatar: "/avatars/avatar2.png" },
    { name: "Web3Wizard", handle: "web3_wizard", avatar: "/avatars/avatar3.png" },
    { name: "DeFiDegen", handle: "defi_degen", avatar: "/avatars/avatar4.png" },
    { name: "BlockchainBae", handle: "blockchain_bae", avatar: "/avatars/avatar5.png" },
    { name: "SmartContractX", handle: "smart_contract_x", avatar: "/avatars/avatar6.png" },
    { name: "MetaverseMogul", handle: "metaverse_mogul", avatar: "/avatars/avatar7.png" }
  ];
  
  const getRandomAuthor = () => randomAuthors[Math.floor(Math.random() * randomAuthors.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all"
    >
      <div className="flex items-center gap-3 mb-6 pb-2 border-b-2 border-black">
        <div className="p-2 bg-[#3E6BFF] border-2 border-black shadow-[4px_4px_0_0_#000]">
          <FiTwitter className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-black">
          SOCIAL SENTIMENT ANALYSIS
        </h3>
      </div>

      {twitterMessages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {twitterMessages.map((tweet, index) => {
            const randomAuthor = getRandomAuthor();
            const sentimentColor = tweet.sentiment === "positive" 
              ? "bg-green-500" 
              : tweet.sentiment === "negative" 
                ? "bg-red-500" 
                : "bg-yellow-400";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-4 bg-white rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={randomAuthor.avatar}
                        alt="author"
                        className="w-8 h-8 rounded-full border-2 border-black"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 ${sentimentColor} rounded-full border-2 border-black flex items-center justify-center`}
                      >
                        {getSentimentIcon(tweet.sentiment)}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-black">
                        {randomAuthor.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">
                        @{randomAuthor.handle}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => copyToClipboard(tweet.tweet)}
                    className="p-1 bg-white border-2 border-black rounded shadow-[2px_2px_0_0_#000]"
                    title="Copy tweet"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiCopy className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                  </motion.button>
                </div>

                <p className="text-black mb-4 text-sm sm:text-base font-medium">
                  "{tweet.tweet}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        tweet.sentiment === "positive"
                          ? "text-green-800"
                          : tweet.sentiment === "negative"
                          ? "text-red-800"
                          : "text-yellow-800"
                      }`}
                    >
                      {tweet.sentiment.charAt(0).toUpperCase() +
                        tweet.sentiment.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 h-2 rounded-full border-2 border-black overflow-hidden shadow-[2px_2px_0_0_#000]">
                  <div
                    className={`h-full ${
                      tweet.sentiment === "positive"
                        ? "bg-green-200"
                        : tweet.sentiment === "negative"
                        ? "bg-red-200"
                        : "bg-yellow-200"
                    }`}
                    style={{ width: `${(tweet.sentiment_score + 1) * 50}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="p-6 text-center border-2 border-black shadow-[4px_4px_0_0_#000]">
          <p className="text-black font-bold">NO SOCIAL SIGNALS DETECTED</p>
          <div className="mt-3 h-2 bg-black rounded-full shadow-[2px_2px_0_0_#000]" />
        </div>
      )}

      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#FF3E3E] border-2 border-black"></div>
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#FFD700] border-2 border-black"></div>
    </motion.div>
  );
};

export default TwitterMsg;
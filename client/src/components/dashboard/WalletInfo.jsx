import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../context/WalletContext";
import DummyNFTTraderABI from "../../abi/DummyNFTTrader.js";
import { ethers } from "ethers";

import { motion } from "framer-motion";
const CONTRACT_ADDRESS = localStorage.getItem("walletAddress");

export default function WalletInfo() {
  const { account, balance } = useContext(WalletContext);
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!account || !window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DummyNFTTraderABI, provider);

      const symbols = ["APE", "DOGE", "MOON", "PEPE", "AI"];
      const ownedNFTs = [];

      for (const symbol of symbols) {
        const nft = await contract.nfts(symbol);
        if (nft.owner.toLowerCase() === account.toLowerCase()) {
          ownedNFTs.push({ ...nft, symbol });
        }
      }

      setNFTs(ownedNFTs);
    };

    fetchNFTs();
  }, [account]);

  return (
    <div
      className="p-6 bg-white border-2 border-black"
      style={{ boxShadow: "8px 8px 0 0 #000" }}
    >
      <h2
        className="text-xl font-bold text-black mb-4 flex items-center gap-2 "
        style={{ textShadow: "2px 2px 0 #d2d2d2" }}
      >
        <span className="text-[#FF3E3E]">💳</span>
        <span>Wallet Info</span>
      </h2>

      <div className="space-y-4">
        <div
          className="p-3 border-2 border-black"
          style={{ boxShadow: "4px 4px 0 0 #000" }}
        >
          <p className="font-bold text-black mb-1">ADDRESS:</p>
          <p className="font-mono text-sm text-gray-800 break-all">{account}</p>
        </div>

        <div
          className="p-3 border-2 border-black bg-[#FFD700]"
          style={{ boxShadow: "4px 4px 0 0 #000" }}
        >
          <p className="font-bold text-black">BALANCE:</p>
          <p className="text-2xl font-bold text-black">
            {parseFloat(balance).toFixed(3)} AVAX
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
            <span className="text-[#3E6BFF]">🎨</span>
            <span>Your NFTs</span>
          </h3>

          {nfts.length > 0 ? (
            <ul className="space-y-2">
              {nfts.map((nft, i) => (
                <motion.li
                  key={i}
                  className="p-3 border-2 border-black"
                  style={{ boxShadow: "4px 4px 0 0 #000" }}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-black">{nft.symbol}</span>
                    <span className="font-mono text-[#FF3E3E] font-bold">
                      {ethers.formatEther(nft.price)} AVAX
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="p-4 border-2 border-dashed border-black text-center">
              <p className="font-bold text-gray-800">NO NFTS HELD</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
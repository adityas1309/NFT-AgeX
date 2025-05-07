import { useContext, useState } from "react";
import { WalletContext } from "../context/WalletContext";
import { FaPlug, FaWallet, FaSignOutAlt } from "react-icons/fa";
import { FiDroplet, FiCopy } from "react-icons/fi";
import { motion } from "framer-motion";

const Navbar = () => {
  const {
    account,
    balance,
    connectWallet,
    disconnectWallet,
  } = useContext(WalletContext);

  const copyAddress = () => {
    navigator.clipboard.writeText(account);
  };

  return (
    <nav className="w-full p-4 bg-white border-b-2 border-black flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div
          className="w-12 h-12 border-2 border-black bg-[#FFf] flex items-center justify-center"
          style={{ boxShadow: "4px 4px 0 0 #000" }}
        >
          <img src="logo.png" alt="" className="h-8 w-8" />
        </div>
        <h1
          className="text-2xl font-bold text-black"
          style={{ textShadow: "2px 2px 0 #d2d2d2" }}
        >
          NFT-AgeX
        </h1>
      </div>

      {account ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <motion.div
            className="flex items-center gap-2 p-3 border-2 border-black font-bold"
            style={{ boxShadow: "4px 4px 0 0 #000" }}
            whileHover={{ y: -2 }}
          >
            <FiDroplet className="text-[#3E6BFF]" strokeWidth={2.5} />
            <span className="font-mono text-black">
              {parseFloat(balance).toFixed(3)} AVAX
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 p-3 border-2 border-black font-bold cursor-pointer"
            style={{ boxShadow: "4px 4px 0 0 #000" }}
            onClick={copyAddress}
            whileHover={{ y: -2 }}
          >
            <FaWallet className="text-[#FF3E3E]" />
            <span className="font-mono text-black">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
            <FiCopy className="text-black" strokeWidth={2.5} />
          </motion.div>

          <motion.button
            onClick={disconnectWallet}
            className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-[#FF3E3E] text-white font-bold"
            style={{ boxShadow: "4px 4px 0 0 #000" }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt />
            Logout
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "6px 6px 0 0 #000",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={connectWallet}
          className="flex items-center gap-2 bg-[#3E6BFF] border-2 border-black px-6 py-3 font-bold text-white"
          style={{ boxShadow: "4px 4px 0 0 #000" }}
        >
          <FaPlug className="text-lg" />
          <span>Connect Wallet</span>
        </motion.button>
      )}
    </nav>
  );
};

export default Navbar;
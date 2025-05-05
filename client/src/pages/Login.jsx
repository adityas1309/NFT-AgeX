import { useContext, useEffect } from "react";  
import { WalletContext } from "../context/WalletContext";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiLock } from "react-icons/fi";

const Login = () => {
  const { account, connectWallet, isConnecting } = useContext(WalletContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (account) navigate("/home");
  }, [account, navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden border-2 border-black">
      <motion.div
        className="relative z-10 bg-white border-2 border-black p-12 max-w-md w-full"
        style={{ boxShadow: "8px 8px 0 0 #000" }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-8 flex justify-center">
              <div
                className="p-6 border-2 border-black"
                style={{
                  backgroundColor: "#FF3E3E",
                  boxShadow: "4px 4px 0 0 #000",
                }}
              >
                <FiLock className="w-12 h-12 text-black" strokeWidth="2.5" />
              </div>
            </div>

            <h1
              className="text-4xl font-bold text-black mb-4"
              style={{ textShadow: "3px 3px 0 #d2d2d2" }}
            >
              <span className="text-[#3E6BFF]">Secure</span> Web3 Access
            </h1>
            <p className="text-gray-800 text-lg font-medium">
              Connect your wallet to unlock AI-powered NFT trading insights
            </p>
          </motion.div>

          <motion.button
            onClick={connectWallet}
            disabled={isConnecting}
            className="group relative w-full border-2 border-black p-1 overflow-hidden"
            style={{ boxShadow: "4px 4px 0 0 #000" }}
            whileHover={{
              y: -3,
              boxShadow: "6px 6px 0 0 #000",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative z-10 bg-white p-5">
              <div className="flex items-center justify-center gap-3">
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black rounded-full animate-spin" />
                    <span className="text-lg font-bold text-black">
                      Connecting...
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-lg font-bold text-black">
                      Connect Wallet
                    </span>
                    <FiArrowRight className="w-5 h-5 text-black stroke-2 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </div>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-700 mt-8 font-medium"
          >
            Supports MetaMask, Coinbase Wallet, and WalletConnect
          </motion.p>
        </div>

        <div
          className="absolute -bottom-10 -left-10 w-24 h-24 border-2 border-black bg-[#FFD700]"
          style={{ boxShadow: "4px 4px 0 0 #000" }}
        />
        <div
          className="absolute -top-10 -right-10 w-20 h-20 border-2 border-black bg-[#3E6BFF]"
          style={{ boxShadow: "4px 4px 0 0 #000" }}
        />
      </motion.div>
    </div>
  );
};

export default Login;

import { ethers } from "ethers";
import Transaction from "../models/Transaction.js";
import contractABI from "../abi/DummyNFTTrader.js";


const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const provider = new ethers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");


const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("⚠️ PRIVATE_KEY is not set in environment variables");

const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

const getBalance = async (address) => {
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
};

export const buyNFT = async (nftSymbol) => {
  try {
    console.log(`🛒 Simulating BUY on Fuji: ${nftSymbol}`);

    const userBalance = await getBalance(signer.address);
    console.log(`💰 User AVAX Balance: ${userBalance} AVAX`);

    if (parseFloat(userBalance) < 1) {
      return { error: "Insufficient AVAX balance to buy NFT" };
    }

    const tx = await contract.simulateBuy(nftSymbol);
    await tx.wait();

    const newTransaction = new Transaction({
      nft: nftSymbol,
      action: "BUY",
      status: "Completed",
      timestamp: new Date(),
      txHash: tx.hash,
      explorerLink: `https://testnet.snowtrace.io/tx/${tx.hash}`,
    });
    await newTransaction.save();

    console.log(`✅ Bought NFT: ${nftSymbol}, TX: ${tx.hash}`);
    return {
      message: `Bought NFT: ${nftSymbol}`,
      txHash: tx.hash,
      explorerLink: newTransaction.explorerLink,
    };
  } catch (error) {
    console.error("❌ NFT Buy Failed:", error.message);
    return { error: "Failed to simulate buy" };
  }
};

export const sellNFT = async (nftSymbol) => {
  try {
    console.log(`📉 Simulating SELL on Fuji: ${nftSymbol}`);

    const tx = await contract.simulateSell(nftSymbol);
    await tx.wait();

    const newTransaction = new Transaction({
      nft: nftSymbol,
      action: "SELL",
      status: "Completed",
      timestamp: new Date(),
      txHash: tx.hash,
      explorerLink: `https://testnet.snowtrace.io/tx/${tx.hash}`,
    });
    await newTransaction.save();

    console.log(`✅ Sold NFT: ${nftSymbol}, TX: ${tx.hash}`);
    return {
      message: `Sold NFT: ${nftSymbol}`,
      txHash: tx.hash,
      explorerLink: newTransaction.explorerLink,
    };
  } catch (error) {
    console.error("❌ NFT Sell Failed:", error.message);
    return { error: "Failed to simulate sell" };
  }
};

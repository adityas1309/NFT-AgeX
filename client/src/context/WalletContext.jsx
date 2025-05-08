import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import DummyNFTTraderABI from "../abi/DummyNFTTrader.js";

export const WalletContext = createContext();

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(
    localStorage.getItem("walletAddress") || null
  );
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is required to connect your wallet.");
        return;
      }

      const newProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await newProvider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        const walletAddress = accounts[0];
        setAccount(walletAddress);
        localStorage.setItem("walletAddress", walletAddress);

        const newSigner = await newProvider.getSigner();
        const newContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          DummyNFTTraderABI,
          newSigner
        );
        const bal = await newProvider.getBalance(walletAddress);

        setBalance(ethers.formatEther(bal));
        setProvider(newProvider);
        setSigner(newSigner);
        setContract(newContract);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setProvider(null);
    setSigner(null);
    setContract(null);
    localStorage.removeItem("walletAddress");
  };

  const approveWithMetaMask = async () => {
    try {
      if (!signer || !contract) throw new Error("Wallet not connected.");

      const message = "Approve auto-trading";
      const walletAddress = await signer.getAddress();
      const signature = await signer.signMessage(message);

      const res = await fetch(
        "https://nft-age-x.vercel.app/api/approve-auto-trading",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletAddress, signature }),
        }
      );

      const data = await res.json();
      if (data.error) return data;

      const tx = await contract.approveAutoTrading();
      await tx.wait();

      return { message: "✅ Approved auto-trading via MetaMask and contract." };
    } catch (err) {
      console.error("MetaMask approval error:", err);
      return { error: "MetaMask approval failed" };
    }
  };

  const revokeApprovalWithMetaMask = async () => {
    try {
      if (!signer || !contract) throw new Error("Wallet not connected.");

      const message = "Revoke auto-trading";
      const walletAddress = await signer.getAddress();
      const signature = await signer.signMessage(message);

      const res = await fetch("https://nft-age-x.vercel.app/api/revoke-auto-trading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, signature }),
      });

      const data = await res.json();
      if (data.error) return data;

      const tx = await contract.revokeAutoTrading();
      await tx.wait();

      return { message: "❌ Revoked auto-trading via MetaMask and contract." };
    } catch (err) {
      console.error("MetaMask revoke error:", err);
      return { error: "MetaMask revoke failed" };
    }
  };

  useEffect(() => {
    const initializeWallet = async () => {
      if (window.ethereum && account && !signer) {
        try {
          const newProvider = new ethers.BrowserProvider(window.ethereum);
          const newSigner = await newProvider.getSigner();
          const newContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            DummyNFTTraderABI,
            newSigner
          );
          const bal = await newProvider.getBalance(account);

          setProvider(newProvider);
          setSigner(newSigner);
          setContract(newContract);
          setBalance(ethers.formatEther(bal));
        } catch (error) {
          console.error("Error restoring wallet state:", error);
        }
      }
    };

    initializeWallet();
  }, [account]);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          const walletAddress = accounts[0];
          setAccount(walletAddress);
          localStorage.setItem("walletAddress", walletAddress);
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (account && window.ethereum) {
        try {
          const newProvider = new ethers.BrowserProvider(window.ethereum);
          const bal = await newProvider.getBalance(account);
          setBalance(ethers.formatEther(bal));
        } catch (err) {
          console.error("Failed to fetch balance:", err);
        }
      }
    };

    fetchBalance();
  }, [account]);

  return (
    <WalletContext.Provider
      value={{
        account,
        balance,
        connectWallet,
        disconnectWallet,
        approveWithMetaMask,
        revokeApprovalWithMetaMask,
        provider,
        signer,
        contract,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

---

# 🚀 NFT-AgeX – AI-Powered NFT Trading Agent

[![Vercel Deployment](https://img.shields.io/badge/Live%20Site-Deployed-green?style=flat\&logo=vercel)](https://nft-agex.vercel.app/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**NFT-AgeX** is an advanced, AI-powered NFT trading platform built for **NFT traders**, **Web3 enthusiasts**, and **analytics-driven investors**.
It combines **blockchain smart contracts**, **real-time market sentiment**, and **AI-powered strategies** to automate and optimize NFT trades.

🌐 **Live Website:** [https://nft-agex.vercel.app](https://nft-agex.vercel.app/)

---

## 🧠 Project Overview

NFT-AgeX empowers users to:

* Analyze real-time NFT market trends
* Track whale movements and social sentiment
* Auto-trade NFTs using AI agents
* Visualize trading strategies via a rich dashboard
* Connect wallets, simulate trades, and execute logic-based buys/sells

Whether you're flipping NFTs or building portfolios, NFT-AgeX helps you trade faster, safer, and smarter.

---

## ⚙️ Tech Stack

| Layer                 | Technologies                              |
| --------------------- | ----------------------------------------- |
| **Smart Contracts**   | Solidity                                  |
| **Backend**           | Node.js, Express.js, MongoDB, Twitter API |
| **Blockchain & Web3** | Web3.js                                   |
| **Frontend**          | React.js, Tailwind CSS, Framer Motion     |
| **Tooling**           | Hardhat, Vercel, Ethers.js                |

---

## 💡 Features

* 🎯 **AI-Powered Auto Trading** – Autonomous decision-making using analytics & trends
* 📈 **Real-time Analytics Dashboard** – View whale activity, top collections, market volumes
* 🧠 **AI Market Predictions** – Leverage AI to predict potential price trends
* 🧵 **Twitter Sentiment Tracking** – Gauge community emotions across collections
* 💼 **Wallet Integration** – Connect with MetaMask for real trades
* 🧪 **Strategy Simulator** – Simulate AI logic without actual trades
* 📊 **Charts & Insights** – Historical and live price charts from OpenSea/NFTGo

---

## 🗂 Project Structure

```bash
adityas1309-nft-agex/
├── blockchain/        # Smart contracts (Solidity + Hardhat)
├── client/            # React frontend (Vite, Tailwind, Framer Motion)
├── server/            # Express.js backend (MongoDB, Twitter sentiment, trading logic)
└── package.json       # Root project file
```

<details>
<summary>Click to expand full folder structure</summary>

```bash
adityas1309-nft-agex/
├── package.json
├── blockchain/
│   ├── contracts/
│   │   └── DummyNFTTrader.sol
│   └── scripts/
│       └── deploy.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIPart/               # AI trading logic UI
│   │   │   ├── AnalyticsDash/       # Dashboards & charts
│   │   │   ├── dashboard/           # Wallet & trade management
│   │   │   └── landing/             # Landing page components
│   │   ├── context/WalletContext.jsx
│   │   ├── api/                     # API integration (OpenSea, NFTGo, etc.)
│   │   ├── hooks/                   # Custom data fetching & logic
│   │   └── pages/                   # App routing pages
├── server/
│   ├── routes/                      # REST API routes
│   ├── models/                      # MongoDB models
│   ├── controllers/                # Trade & analysis controllers
│   └── utils/                       # AI, trading, and Twitter logic
```

</details>

---


## 🧑‍💻 Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/adityas1309/nft-agex.git
cd nft-agex
```

### 2. Set Up Environment Variables

Create `.env` files in the following directories based on the provided `.env.example` files:

* `client/.env`
* `server/.env`
* (Optional) `blockchain/.env` for contract deployment

> Make sure to add your **MongoDB URI**, **Twitter API keys**, and any other necessary secrets.

### 3. Install All Dependencies

From the **root directory**:

```bash
npm install
```

### 4. Start the Full Stack App

```bash
npm run dev
```

This will concurrently run both the **client** and **server** using `workspaces`.

* Frontend → [http://localhost:5173](http://localhost:5173)
* Backend API → [http://localhost:3000](http://localhost:3000)

> *Note: Ensure Hardhat and smart contracts are running if using blockchain interactions locally.*

---


## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📁 Project Structure

```bash
Directory structure:
└── adityas1309-nft-agex/
    ├── package.json
    ├── blockchain/
    │   ├── README.md
    │   ├── hardhat.config.js
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── .env.example
    │   ├── .gitignore
    │   ├── contracts/
    │   │   └── DummyNFTTrader.sol
    │   └── scripts/
    │       └── deploy.js
    ├── client/
    │   ├── README.md
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── vercel.json
    │   ├── vite.config.js
    │   ├── .env.example
    │   ├── .gitignore
    │   ├── public/
    │   └── src/
    │       ├── App.jsx
    │       ├── index.css
    │       ├── main.jsx
    │       ├── abi/
    │       │   └── DummyNFTTrader.js
    │       ├── api/
    │       │   ├── nftApi.js
    │       │   └── transactions.js
    │       ├── components/
    │       │   ├── ErrorMessage.jsx
    │       │   ├── Navbar.jsx
    │       │   ├── RecentTransactions.jsx
    │       │   ├── AIPart/
    │       │   │   ├── AiAnalysis.jsx
    │       │   │   ├── AISection.jsx
    │       │   │   ├── AiTrade.jsx
    │       │   │   ├── OpenSea.jsx
    │       │   │   └── TwitterMsg.jsx
    │       │   ├── AnalyticsDash/
    │       │   │   ├── AnalyticsDashboard.jsx
    │       │   │   ├── NFTGoAutoTrade.jsx
    │       │   │   ├── NFTMarketChart.jsx
    │       │   │   ├── TopCollections.jsx
    │       │   │   └── WhaleActivity.jsx
    │       │   ├── dashboard/
    │       │   │   ├── AutoTradingStatus.jsx
    │       │   │   ├── TradeHistory.jsx
    │       │   │   └── WalletInfo.jsx
    │       │   └── landing/
    │       │       ├── CTA.jsx
    │       │       ├── Features.jsx
    │       │       ├── Footer.jsx
    │       │       ├── Hero.jsx
    │       │       ├── LandingNavbar.jsx
    │       │       └── PriceChart.jsx
    │       ├── context/
    │       │   └── WalletContext.jsx
    │       ├── hooks/
    │       │   ├── useAnalyticsData.jsx
    │       │   └── useMarketVolume.jsx
    │       └── pages/
    │           ├── 404.jsx
    │           ├── Dashboard.jsx
    │           ├── Home.jsx
    │           ├── Landing.jsx
    │           └── Login.jsx
    └── server/
        ├── index.js
        ├── package.json
        ├── vercel.json
        ├── .env.example
        ├── abi/
        │   └── DummyNFTTrader.js
        ├── config/
        │   └── db.js
        ├── controllers/
        │   └── autoTradingController.js
        ├── models/
        │   ├── ApprovedWallet.js
        │   ├── Message.js
        │   └── Transaction.js
        ├── routes/
        │   ├── analyticsRoutes.js
        │   ├── autoTradeRoutes.js
        │   ├── autoTradingRoutes.js
        │   ├── revokeAutoTrading.js
        │   └── transactionRoutes.js
        └── utils/
            ├── buy_nft.js
            ├── fake_tweets.js
            ├── fetchHistoricalData.js
            ├── getAIAnalysis.js
            └── twitter_sentiment.js

```

---

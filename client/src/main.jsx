import { createRoot } from "react-dom/client";
import "./index.css";
import { WalletProvider } from "./context/WalletContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <WalletProvider>
    <App />
  </WalletProvider>
);

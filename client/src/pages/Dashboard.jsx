import WalletInfo from "../components/dashboard/WalletInfo";
import AutoTradingStatus from "../components/dashboard/AutoTradingStatus";
import TradeHistory from "../components/dashboard/TradeHistory";

export default function Dashboard() {
  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <WalletInfo />
      <AutoTradingStatus />
      <TradeHistory />
    </div>
  );
}

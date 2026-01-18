import { Header } from "@/components/layout/Header";
import { ChartArea } from "@/components/trading/ChartArea";
import { TradingPanel } from "@/components/trading/TradingPanel";
import { TokenInfo } from "@/components/trading/TokenInfo";
import { WalletPanel } from "@/components/trading/WalletPanel";

export function TradingPage() {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Wallet Panel - Left Side */}
        <WalletPanel />
        
        {/* Main Chart + Token Info */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChartArea />
          <TokenInfo />
        </div>

        {/* Trading Panel - Right Side */}
        <TradingPanel />
      </div>
    </div>
  );
}

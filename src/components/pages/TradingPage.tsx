import { Header } from "@/components/layout/Header";
import { ChartArea } from "@/components/trading/ChartArea";
import { TradingPanel } from "@/components/trading/TradingPanel";
import { TokenInfo } from "@/components/trading/TokenInfo";

export function TradingPage() {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Header 
        walletBalance="12.50" 
        pnl="0.85" 
        pnlPercent={2.4}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Chart + Token Info */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChartArea
            tokenSymbol="PFP"
            tokenName="Penny Flying Pig"
            price="0.00004035"
            priceChange={5.24}
            ohlc={{ o: "4,035", h: "4,041", l: "4,030", c: "4,035" }}
            volume="125.4K"
          />
          <TokenInfo />
        </div>

        {/* Trading Panel */}
        <TradingPanel />
      </div>
    </div>
  );
}
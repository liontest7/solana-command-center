import { Header } from "@/components/layout/Header";
import { ChartArea } from "@/components/trading/ChartArea";
import { TradingPanel } from "@/components/trading/TradingPanel";
import { TokenInfo } from "@/components/trading/TokenInfo";

export function TradingPage() {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Header walletBalance="0.0" pnl="0.00" />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Chart + Token Info */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChartArea
            tokenSymbol="PFP"
            tokenName="Penny Flying Pig"
            price="4,035"
            ohlc={{ o: "4,035", h: "4,035", l: "4,035", c: "4,035" }}
            volume="0.11"
          />
          <TokenInfo />
        </div>

        {/* Trading Panel */}
        <TradingPanel />
      </div>
    </div>
  );
}

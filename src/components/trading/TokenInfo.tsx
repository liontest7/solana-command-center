import { ExternalLink, Filter, Copy, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Trade {
  time: string;
  type: "buy" | "sell";
  marketcap: string;
  amount: string;
  totalSol: string;
  trader: string;
}

const mockTrades: Trade[] = [
  { time: "00:32:27", type: "buy", marketcap: "64.0k", amount: "3.9M", totalSol: "0.113", trader: "4Hg...EzQ" },
  { time: "00:32:25", type: "sell", marketcap: "63.8k", amount: "1.2M", totalSol: "0.034", trader: "7Kx...Mnp" },
  { time: "00:32:22", type: "buy", marketcap: "63.5k", amount: "5.1M", totalSol: "0.147", trader: "2Qr...Xyz" },
  { time: "00:32:18", type: "buy", marketcap: "63.2k", amount: "2.8M", totalSol: "0.082", trader: "9Lp...Abc" },
  { time: "00:32:15", type: "sell", marketcap: "63.0k", amount: "0.8M", totalSol: "0.023", trader: "5Nv...Def" },
];

const tabs = ["Trades", "Holders", "My Trades", "Info"];

export function TokenInfo() {
  const [activeTab, setActiveTab] = useState("Trades");
  const [copiedTrader, setCopiedTrader] = useState<string | null>(null);

  const handleCopy = (trader: string) => {
    setCopiedTrader(trader);
    setTimeout(() => setCopiedTrader(null), 2000);
  };

  return (
    <div className="border-t border-border bg-card/30 h-[240px] flex flex-col">
      {/* Header Tabs */}
      <div className="flex items-center border-b border-border">
        <div className="flex items-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-3 text-xs font-medium transition-all relative",
                activeTab === tab 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 px-4">
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Filter className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-6 px-4 py-2 border-b border-border bg-muted/20">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{mockTrades.length}</div>
            <div className="text-[10px] text-muted-foreground uppercase">Trades</div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">3</div>
            <div className="text-[10px] text-muted-foreground uppercase">Traders</div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <div className="text-lg font-bold text-primary">+12.5%</div>
            <div className="text-[10px] text-muted-foreground uppercase">1h Change</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto scrollbar-thin">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-card/90 backdrop-blur-sm">
            <tr className="text-muted-foreground border-b border-border/50">
              <th className="text-left py-2 px-4 font-medium">TIME</th>
              <th className="text-left py-2 px-3 font-medium">TYPE</th>
              <th className="text-right py-2 px-3 font-medium">MCAP</th>
              <th className="text-right py-2 px-3 font-medium">AMOUNT</th>
              <th className="text-right py-2 px-3 font-medium">SOL</th>
              <th className="text-left py-2 px-3 font-medium">TRADER</th>
              <th className="text-right py-2 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {mockTrades.map((trade, i) => (
              <tr 
                key={i} 
                className="border-b border-border/30 hover:bg-muted/30 transition-colors group"
              >
                <td className="py-2.5 px-4 text-muted-foreground font-mono">{trade.time}</td>
                <td className="py-2.5 px-3">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-semibold uppercase",
                    trade.type === "buy" 
                      ? "text-primary bg-primary/15" 
                      : "text-destructive bg-destructive/15"
                  )}>
                    {trade.type}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right text-foreground">{trade.marketcap}</td>
                <td className="py-2.5 px-3 text-right text-muted-foreground">{trade.amount}</td>
                <td className="py-2.5 px-3 text-right">
                  <span className={cn(
                    "font-medium",
                    trade.type === "buy" ? "text-primary" : "text-destructive"
                  )}>
                    {trade.totalSol}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-mono text-muted-foreground">{trade.trader}</td>
                <td className="py-2.5 px-4">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleCopy(trade.trader)}
                      className="p-1 rounded text-muted-foreground hover:text-foreground"
                    >
                      {copiedTrader === trade.trader ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button className="p-1 rounded text-muted-foreground hover:text-foreground">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
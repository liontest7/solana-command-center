import { useState, useMemo } from "react";
import { ExternalLink, Filter, Copy, CheckCircle2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import type { Trade } from "@/types";

const mockTrades: Trade[] = [
  { id: "1", time: "00:32:27", type: "buy", marketcap: "64.0k", amount: "3.9M", totalSol: "0.113", trader: "4Hg...EzQ" },
  { id: "2", time: "00:32:25", type: "sell", marketcap: "63.8k", amount: "1.2M", totalSol: "0.034", trader: "7Kx...Mnp" },
  { id: "3", time: "00:32:22", type: "buy", marketcap: "63.5k", amount: "5.1M", totalSol: "0.147", trader: "2Qr...Xyz" },
  { id: "4", time: "00:32:18", type: "buy", marketcap: "63.2k", amount: "2.8M", totalSol: "0.082", trader: "9Lp...Abc" },
  { id: "5", time: "00:32:15", type: "sell", marketcap: "63.0k", amount: "0.8M", totalSol: "0.023", trader: "5Nv...Def" },
  { id: "6", time: "00:32:10", type: "buy", marketcap: "62.8k", amount: "1.5M", totalSol: "0.044", trader: "3Rt...Ghi" },
];

const tabs = ["Trades", "Holders", "My Trades", "Info"] as const;
type TabType = typeof tabs[number];

interface TokenInfoStats {
  totalTrades: number;
  uniqueTraders: number;
  hourlyChange: number;
  buyVolume: string;
  sellVolume: string;
}

export function TokenInfo() {
  const { currentToken } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>("Trades");
  const [copiedTrader, setCopiedTrader] = useState<string | null>(null);
  const [tradeFilter, setTradeFilter] = useState<"all" | "buy" | "sell">("all");

  const filteredTrades = useMemo(() => {
    if (tradeFilter === "all") return mockTrades;
    return mockTrades.filter(t => t.type === tradeFilter);
  }, [tradeFilter]);

  const stats: TokenInfoStats = useMemo(() => ({
    totalTrades: mockTrades.length,
    uniqueTraders: new Set(mockTrades.map(t => t.trader)).size,
    hourlyChange: 12.5,
    buyVolume: mockTrades.filter(t => t.type === "buy").reduce((acc, t) => acc + parseFloat(t.totalSol), 0).toFixed(3),
    sellVolume: mockTrades.filter(t => t.type === "sell").reduce((acc, t) => acc + parseFloat(t.totalSol), 0).toFixed(3),
  }), []);

  const handleCopy = (trader: string) => {
    navigator.clipboard.writeText(trader);
    setCopiedTrader(trader);
    setTimeout(() => setCopiedTrader(null), 2000);
  };

  return (
    <div className="h-full border-t border-border bg-card/20 flex flex-col overflow-hidden">
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

        <div className="ml-auto flex items-center gap-1 px-4">
          {/* Trade Filter */}
          <div className="flex items-center gap-0.5 p-0.5 bg-muted/50 rounded-lg mr-2">
            {(["all", "buy", "sell"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTradeFilter(filter)}
                className={cn(
                  "px-2 py-1 text-[10px] font-medium rounded-md transition-all capitalize",
                  tradeFilter === filter
                    ? filter === "buy" 
                      ? "bg-primary/20 text-primary"
                      : filter === "sell"
                      ? "bg-destructive/20 text-destructive"
                      : "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Filter className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-5 px-4 py-2.5 border-b border-border bg-muted/10">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">{stats.totalTrades}</span>
          <span className="text-[10px] text-muted-foreground uppercase">Trades</span>
        </div>
        <div className="h-5 w-px bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">{stats.uniqueTraders}</span>
          <span className="text-[10px] text-muted-foreground uppercase">Traders</span>
        </div>
        <div className="h-5 w-px bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">+{stats.hourlyChange}%</span>
          <span className="text-[10px] text-muted-foreground uppercase">1h Change</span>
        </div>
        <div className="h-5 w-px bg-border" />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">{stats.buyVolume}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ArrowDownRight className="w-3.5 h-3.5 text-destructive" />
            <span className="text-xs font-medium text-destructive">{stats.sellVolume}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto scrollbar-thin">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-card/95 backdrop-blur-sm">
            <tr className="text-muted-foreground border-b border-border/50">
              <th className="text-left py-2.5 px-4 font-medium">TIME</th>
              <th className="text-left py-2.5 px-3 font-medium">TYPE</th>
              <th className="text-right py-2.5 px-3 font-medium">MCAP</th>
              <th className="text-right py-2.5 px-3 font-medium">AMOUNT</th>
              <th className="text-right py-2.5 px-3 font-medium">SOL</th>
              <th className="text-left py-2.5 px-3 font-medium">TRADER</th>
              <th className="text-right py-2.5 px-4 font-medium w-16"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade) => (
              <tr 
                key={trade.id} 
                className="border-b border-border/30 hover:bg-muted/30 transition-colors group"
              >
                <td className="py-2.5 px-4 text-muted-foreground font-mono">{trade.time}</td>
                <td className="py-2.5 px-3">
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase",
                    trade.type === "buy" 
                      ? "text-primary bg-primary/15" 
                      : "text-destructive bg-destructive/15"
                  )}>
                    {trade.type === "buy" ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
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
                      className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      {copiedTrader === trade.trader ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
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

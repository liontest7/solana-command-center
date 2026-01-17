import { ChevronLeft, ExternalLink, Filter, Settings } from "lucide-react";
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
];

const tabs = ["trades", "holders", "traders", "holdings"];

export function TokenInfo() {
  const [activeTab, setActiveTab] = useState("trades");

  return (
    <div className="border-t border-border bg-card/30">
      {/* Token Stats */}
      <div className="flex items-stretch border-b border-border">
        <div className="px-4 py-3 border-r border-border">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground">TOKEN INFO</span>
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg border border-border">
              <div className="text-lg font-semibold text-primary">3</div>
              <div className="text-[10px] text-muted-foreground uppercase">Total Trades</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg border border-border">
              <div className="text-lg font-semibold text-foreground">3</div>
              <div className="text-[10px] text-muted-foreground uppercase">Traders</div>
            </div>
          </div>
        </div>

        {/* Tabs and Table */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center px-4 h-10 border-b border-border gap-4">
            <button className="p-1 text-muted-foreground hover:text-foreground">
              <Settings className="w-4 h-4" />
            </button>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "text-xs uppercase transition-colors",
                  activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button className="p-1 text-muted-foreground hover:text-foreground">
                <Settings className="w-4 h-4" />
              </button>
              <button className="p-1 text-muted-foreground hover:text-foreground">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="px-4 py-2 overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="text-left py-2 font-normal">TIME</th>
                  <th className="text-left py-2 font-normal">TYPE</th>
                  <th className="text-left py-2 font-normal">MARKETCAP</th>
                  <th className="text-left py-2 font-normal">AMOUNT</th>
                  <th className="text-left py-2 font-normal">
                    TOTAL SOL <span className="text-primary">○</span>
                  </th>
                  <th className="text-left py-2 font-normal flex items-center gap-1">
                    TRADER <Filter className="w-3 h-3" />
                  </th>
                  <th className="text-left py-2 font-normal">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {mockTrades.map((trade, i) => (
                  <tr key={i} className="border-t border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-2 text-muted-foreground">{trade.time}</td>
                    <td className={cn(
                      "py-2 uppercase font-medium",
                      trade.type === "buy" ? "text-primary" : "text-destructive"
                    )}>
                      {trade.type}
                    </td>
                    <td className="py-2">{trade.marketcap}</td>
                    <td className="py-2">{trade.amount}</td>
                    <td className="py-2">{trade.totalSol}</td>
                    <td className="py-2 text-muted-foreground">{trade.trader}</td>
                    <td className="py-2">
                      <div className="flex items-center gap-1">
                        <button className="p-1 text-muted-foreground hover:text-foreground">
                          <Filter className="w-3 h-3" />
                        </button>
                        <button className="p-1 text-muted-foreground hover:text-foreground">
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

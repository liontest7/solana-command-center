import { useState } from "react";
import { motion } from "framer-motion";
import { 
  RefreshCw, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Filter,
  Download,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Holding {
  id: string;
  token: string;
  symbol: string;
  balance: string;
  value: string;
  price: string;
  change24h: number;
  pnl: number;
  wallet: string;
}

const mockHoldings: Holding[] = [
  { id: "1", token: "Solana", symbol: "SOL", balance: "45.5", value: "$4,550", price: "$100.00", change24h: 2.5, pnl: 350, wallet: "Main" },
  { id: "2", token: "Bonk", symbol: "BONK", balance: "50M", value: "$1,250", price: "$0.000025", change24h: -5.2, pnl: -120, wallet: "Trading" },
  { id: "3", token: "Jupiter", symbol: "JUP", balance: "2,500", value: "$3,000", price: "$1.20", change24h: 8.3, pnl: 580, wallet: "Main" },
  { id: "4", token: "Raydium", symbol: "RAY", balance: "500", value: "$900", price: "$1.80", change24h: 1.2, pnl: 45, wallet: "Sniper" },
  { id: "5", token: "Marinade", symbol: "MNDE", balance: "3,000", value: "$420", price: "$0.14", change24h: -2.1, pnl: -35, wallet: "Trading" },
];

export function HoldingsPage() {
  const [filter, setFilter] = useState<"all" | "profit" | "loss">("all");

  const filteredHoldings = mockHoldings.filter(h => {
    if (filter === "profit") return h.pnl > 0;
    if (filter === "loss") return h.pnl < 0;
    return true;
  });

  const totalValue = mockHoldings.reduce((acc, h) => acc + parseFloat(h.value.replace(/[$,]/g, "")), 0);
  const totalPnl = mockHoldings.reduce((acc, h) => acc + h.pnl, 0);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1 tracking-wide">HOLDINGS</h1>
            <p className="text-sm text-muted-foreground">Track your portfolio performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-border">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-border">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-border bg-card/30">
            <div className="text-xs text-muted-foreground mb-1">TOTAL VALUE</div>
            <div className="text-xl font-bold text-foreground">${totalValue.toLocaleString()}</div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card/30">
            <div className="text-xs text-muted-foreground mb-1">TOTAL PNL</div>
            <div className={cn(
              "text-xl font-bold flex items-center gap-1",
              totalPnl >= 0 ? "text-primary" : "text-destructive"
            )}>
              {totalPnl >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
              ${Math.abs(totalPnl).toLocaleString()}
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card/30">
            <div className="text-xs text-muted-foreground mb-1">TOKENS</div>
            <div className="text-xl font-bold text-foreground">{mockHoldings.length}</div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card/30">
            <div className="text-xs text-muted-foreground mb-1">WALLETS</div>
            <div className="text-xl font-bold text-foreground">
              {new Set(mockHoldings.map(h => h.wallet)).size}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b border-border flex items-center gap-4">
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          {(["all", "profit", "loss"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md transition-all capitalize",
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </div>

      {/* Holdings Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-background border-b border-border">
            <tr className="text-xs text-muted-foreground">
              <th className="text-left py-3 px-6 font-normal">TOKEN</th>
              <th className="text-right py-3 px-4 font-normal">BALANCE</th>
              <th className="text-right py-3 px-4 font-normal">PRICE</th>
              <th className="text-right py-3 px-4 font-normal">VALUE</th>
              <th className="text-right py-3 px-4 font-normal">24H</th>
              <th className="text-right py-3 px-4 font-normal">PNL</th>
              <th className="text-right py-3 px-4 font-normal">WALLET</th>
              <th className="text-right py-3 px-6 font-normal">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredHoldings.map((holding, index) => (
              <motion.tr
                key={holding.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border/50 hover:bg-muted/20 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {holding.symbol[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{holding.token}</div>
                      <div className="text-xs text-muted-foreground">{holding.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm text-foreground">{holding.balance}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm text-muted-foreground">{holding.price}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm font-medium text-foreground">{holding.value}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={cn(
                    "text-sm flex items-center justify-end gap-1",
                    holding.change24h >= 0 ? "text-primary" : "text-destructive"
                  )}>
                    {holding.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(holding.change24h)}%
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={cn(
                    "text-sm font-medium",
                    holding.pnl >= 0 ? "text-primary" : "text-destructive"
                  )}>
                    {holding.pnl >= 0 ? "+" : ""}{holding.pnl >= 0 ? "$" : "-$"}{Math.abs(holding.pnl)}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                    {holding.wallet}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Trade
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

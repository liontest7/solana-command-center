import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Zap, 
  Clock, 
  CheckCircle2,
  XCircle,
  RefreshCw,
  Filter,
  Pause,
  Play,
  ExternalLink,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "buy" | "sell" | "swap";
  token: string;
  amount: string;
  status: "success" | "pending" | "failed";
  time: string;
  wallet: string;
  txHash: string;
}

const mockTransactions: Transaction[] = [
  { id: "1", type: "buy", token: "BONK", amount: "0.5 SOL", status: "success", time: "2 min ago", wallet: "Main", txHash: "5Kx...Mnp" },
  { id: "2", type: "sell", token: "JUP", amount: "100 JUP", status: "pending", time: "5 min ago", wallet: "Trading", txHash: "3Qr...Xyz" },
  { id: "3", type: "swap", token: "RAY → SOL", amount: "50 RAY", status: "success", time: "8 min ago", wallet: "Sniper", txHash: "7Lp...Abc" },
  { id: "4", type: "buy", token: "WIF", amount: "0.1 SOL", status: "failed", time: "12 min ago", wallet: "Bundle #1", txHash: "9Nv...Def" },
  { id: "5", type: "buy", token: "POPCAT", amount: "0.25 SOL", status: "success", time: "15 min ago", wallet: "Main", txHash: "2Hg...Ghi" },
];

export function MonitorPage() {
  const [isLive, setIsLive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const stats = {
    total: mockTransactions.length,
    success: mockTransactions.filter(t => t.status === "success").length,
    pending: mockTransactions.filter(t => t.status === "pending").length,
    failed: mockTransactions.filter(t => t.status === "failed").length,
  };

  const filteredTransactions = mockTransactions.filter(tx =>
    tx.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.wallet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-foreground mb-1.5 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Transaction Monitor
              </h1>
              <p className="text-sm text-muted-foreground">Real-time transaction tracking</p>
            </div>
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
              isLive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
            )}>
              <div className={cn(
                "w-2 h-2 rounded-full",
                isLive ? "bg-primary status-pulse" : "bg-muted-foreground"
              )} />
              {isLive ? "LIVE" : "PAUSED"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className="gap-2 border-border h-9"
            >
              {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isLive ? "Pause" : "Resume"}
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-border h-9">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-border h-9">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card/40 flex items-center gap-4 card-hover">
            <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Total</div>
              <div className="text-xl font-bold text-foreground">{stats.total}</div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card/40 flex items-center gap-4 card-hover">
            <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Success</div>
              <div className="text-xl font-bold text-primary">{stats.success}</div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card/40 flex items-center gap-4 card-hover">
            <div className="w-11 h-11 rounded-xl bg-warning/15 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Pending</div>
              <div className="text-xl font-bold text-warning">{stats.pending}</div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card/40 flex items-center gap-4 card-hover">
            <div className="w-11 h-11 rounded-xl bg-destructive/15 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Failed</div>
              <div className="text-xl font-bold text-destructive">{stats.failed}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 py-3 border-b border-border">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transactions..."
            className="h-9 pl-9 bg-muted/50 border-border text-sm"
          />
        </div>
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-auto p-6 scrollbar-thin">
        <div className="space-y-2">
          {filteredTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="p-4 rounded-xl border border-border bg-card/30 hover:border-primary/30 transition-all card-hover group"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center",
                  tx.type === "buy" && "bg-primary/15",
                  tx.type === "sell" && "bg-destructive/15",
                  tx.type === "swap" && "bg-warning/15"
                )}>
                  <Zap className={cn(
                    "w-5 h-5",
                    tx.type === "buy" && "text-primary",
                    tx.type === "sell" && "text-destructive",
                    tx.type === "swap" && "text-warning"
                  )} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md",
                      tx.type === "buy" && "bg-primary/15 text-primary",
                      tx.type === "sell" && "bg-destructive/15 text-destructive",
                      tx.type === "swap" && "bg-warning/15 text-warning"
                    )}>
                      {tx.type}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{tx.token}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {tx.amount} • {tx.wallet}
                  </div>
                </div>

                <div className="text-right">
                  <div className={cn(
                    "flex items-center gap-1.5 text-xs font-medium",
                    tx.status === "success" && "text-primary",
                    tx.status === "pending" && "text-warning",
                    tx.status === "failed" && "text-destructive"
                  )}>
                    {tx.status === "success" && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {tx.status === "pending" && <Clock className="w-3.5 h-3.5 status-pulse" />}
                    {tx.status === "failed" && <XCircle className="w-3.5 h-3.5" />}
                    {tx.status.toUpperCase()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{tx.time}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">{tx.txHash}</span>
                  <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 opacity-0 group-hover:opacity-100 transition-all">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
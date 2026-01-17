import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Zap, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Filter,
  Pause,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const stats = {
    total: mockTransactions.length,
    success: mockTransactions.filter(t => t.status === "success").length,
    pending: mockTransactions.filter(t => t.status === "pending").length,
    failed: mockTransactions.filter(t => t.status === "failed").length,
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-foreground mb-1 tracking-wide">TRANSACTION MONITOR</h1>
              <p className="text-sm text-muted-foreground">Real-time transaction tracking</p>
            </div>
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
              isLive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
            )}>
              <div className={cn(
                "w-2 h-2 rounded-full",
                isLive ? "bg-primary animate-pulse" : "bg-muted-foreground"
              )} />
              {isLive ? "LIVE" : "PAUSED"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className="gap-2 border-border"
            >
              {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isLive ? "Pause" : "Resume"}
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-border">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-border">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-border bg-card/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">TOTAL</div>
              <div className="text-xl font-bold text-foreground">{stats.total}</div>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">SUCCESS</div>
              <div className="text-xl font-bold text-primary">{stats.success}</div>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">PENDING</div>
              <div className="text-xl font-bold text-warning">{stats.pending}</div>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">FAILED</div>
              <div className="text-xl font-bold text-destructive">{stats.failed}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-3">
          {mockTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-lg border border-border bg-card/30 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  tx.type === "buy" && "bg-primary/10",
                  tx.type === "sell" && "bg-destructive/10",
                  tx.type === "swap" && "bg-warning/10"
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
                      "text-xs font-medium uppercase px-2 py-0.5 rounded",
                      tx.type === "buy" && "bg-primary/20 text-primary",
                      tx.type === "sell" && "bg-destructive/20 text-destructive",
                      tx.type === "swap" && "bg-warning/20 text-warning"
                    )}>
                      {tx.type}
                    </span>
                    <span className="text-sm font-medium text-foreground">{tx.token}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {tx.amount} • {tx.wallet}
                  </div>
                </div>

                <div className="text-right">
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    tx.status === "success" && "text-primary",
                    tx.status === "pending" && "text-warning",
                    tx.status === "failed" && "text-destructive"
                  )}>
                    {tx.status === "success" && <CheckCircle2 className="w-3 h-3" />}
                    {tx.status === "pending" && <Clock className="w-3 h-3 animate-pulse" />}
                    {tx.status === "failed" && <XCircle className="w-3 h-3" />}
                    {tx.status.toUpperCase()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{tx.time}</div>
                </div>

                <div className="text-xs text-muted-foreground font-mono">{tx.txHash}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Download, 
  Upload, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff,
  RefreshCw,
  Wallet,
  MoreVertical,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface WalletItem {
  id: string;
  address: string;
  name: string;
  balance: string;
  group: string;
  status: "active" | "paused";
}

const mockWallets: WalletItem[] = [
  { id: "1", address: "7Kx3...Mnpq", name: "Main Wallet", balance: "12.5", group: "Trading", status: "active" },
  { id: "2", address: "4Hg2...EzQr", name: "Sniper #1", balance: "5.2", group: "Sniping", status: "active" },
  { id: "3", address: "9Lp8...Wzst", name: "Bundle #1", balance: "2.1", group: "Bundler", status: "active" },
  { id: "4", address: "2Qr5...Xyza", name: "Bundle #2", balance: "1.8", group: "Bundler", status: "paused" },
  { id: "5", address: "5Nv9...Cdef", name: "Cold Storage", balance: "50.0", group: "Storage", status: "paused" },
];

const groups = ["All", "Trading", "Sniping", "Bundler", "Storage"];

export function WalletsPage() {
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedWallets, setSelectedWallets] = useState<string[]>([]);
  const [showBalances, setShowBalances] = useState(true);

  const filteredWallets = selectedGroup === "All" 
    ? mockWallets 
    : mockWallets.filter(w => w.group === selectedGroup);

  const toggleWallet = (id: string) => {
    setSelectedWallets(prev => 
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedWallets.length === filteredWallets.length) {
      setSelectedWallets([]);
    } else {
      setSelectedWallets(filteredWallets.map(w => w.id));
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1 tracking-wide">WALLET MANAGER</h1>
            <p className="text-sm text-muted-foreground">Manage your wallets and groups</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-border">
              <Download className="w-4 h-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-border">
              <Upload className="w-4 h-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground">
              <Plus className="w-4 h-4" />
              New Wallet
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-md transition-all",
                  selectedGroup === group
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {group}
              </button>
            ))}
          </div>
          <div className="flex-1">
            <Input
              placeholder="Search wallets..."
              className="max-w-xs h-8 bg-muted border-border text-sm"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
            className="gap-2 text-muted-foreground"
          >
            {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showBalances ? "Hide" : "Show"} Balances
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Wallet List */}
      <div className="flex-1 overflow-auto p-6">
        {/* Select All */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={selectAll}
            className={cn(
              "w-5 h-5 rounded border flex items-center justify-center transition-colors",
              selectedWallets.length === filteredWallets.length
                ? "bg-primary border-primary text-primary-foreground"
                : "border-border hover:border-primary"
            )}
          >
            {selectedWallets.length === filteredWallets.length && <Check className="w-3 h-3" />}
          </button>
          <span className="text-sm text-muted-foreground">
            {selectedWallets.length > 0 
              ? `${selectedWallets.length} selected`
              : "Select all"
            }
          </span>
          {selectedWallets.length > 0 && (
            <div className="flex items-center gap-2 ml-4">
              <Button variant="outline" size="sm" className="h-7 text-xs border-border gap-1">
                <Copy className="w-3 h-3" />
                Copy
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs border-destructive/50 text-destructive gap-1">
                <Trash2 className="w-3 h-3" />
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Wallets Grid */}
        <div className="grid gap-3">
          {filteredWallets.map((wallet, index) => (
            <motion.div
              key={wallet.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "p-4 rounded-lg border transition-all cursor-pointer",
                selectedWallets.includes(wallet.id)
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card/30 hover:border-primary/50"
              )}
              onClick={() => toggleWallet(wallet.id)}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWallet(wallet.id);
                  }}
                  className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0",
                    selectedWallets.includes(wallet.id)
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  )}
                >
                  {selectedWallets.includes(wallet.id) && <Check className="w-3 h-3" />}
                </button>

                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{wallet.name}</span>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full uppercase font-medium",
                      wallet.status === "active"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {wallet.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground font-mono">{wallet.address}</span>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {showBalances ? `${wallet.balance} SOL` : "••••••"}
                  </div>
                  <div className="text-xs text-muted-foreground">{wallet.group}</div>
                </div>

                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-muted-foreground hover:text-foreground"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-card/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-muted-foreground">Total Wallets:</span>
              <span className="text-foreground ml-2 font-medium">{mockWallets.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Active:</span>
              <span className="text-primary ml-2 font-medium">
                {mockWallets.filter(w => w.status === "active").length}
              </span>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Total Balance:</span>
            <span className="text-primary ml-2 font-medium">
              {showBalances 
                ? `${mockWallets.reduce((acc, w) => acc + parseFloat(w.balance), 0).toFixed(1)} SOL`
                : "••••••"
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

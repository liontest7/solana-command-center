import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Check,
  Search,
  Sparkles
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWallets = mockWallets.filter(w => {
    const matchesGroup = selectedGroup === "All" || w.group === selectedGroup;
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         w.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

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

  const totalBalance = mockWallets.reduce((acc, w) => acc + parseFloat(w.balance), 0);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1.5 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Wallet Manager
            </h1>
            <p className="text-sm text-muted-foreground">Manage your wallets and groups</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-border h-9">
              <Download className="w-4 h-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-border h-9">
              <Upload className="w-4 h-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground h-9 shadow-lg glow-primary-subtle">
              <Plus className="w-4 h-4" />
              New Wallet
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-xl">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={cn(
                  "px-3.5 py-2 text-xs font-medium rounded-lg transition-all",
                  selectedGroup === group
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {group}
              </button>
            ))}
          </div>
          
          <div className="flex-1 max-w-xs relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wallets..."
              className="h-9 pl-9 bg-muted/50 border-border text-sm"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalances(!showBalances)}
              className="gap-2 text-muted-foreground h-9"
            >
              {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showBalances ? "Hide" : "Show"}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground h-9">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Wallet List */}
      <div className="flex-1 overflow-auto p-6 scrollbar-thin">
        {/* Select All */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={selectAll}
            className={cn(
              "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
              selectedWallets.length === filteredWallets.length && filteredWallets.length > 0
                ? "bg-primary border-primary text-primary-foreground"
                : "border-border hover:border-primary/50"
            )}
          >
            {selectedWallets.length === filteredWallets.length && filteredWallets.length > 0 && (
              <Check className="w-3 h-3" />
            )}
          </button>
          <span className="text-sm text-muted-foreground">
            {selectedWallets.length > 0 
              ? `${selectedWallets.length} selected`
              : `${filteredWallets.length} wallets`
            }
          </span>
          
          <AnimatePresence>
            {selectedWallets.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 ml-2"
              >
                <Button variant="outline" size="sm" className="h-7 text-xs border-border gap-1">
                  <Copy className="w-3 h-3" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs border-destructive/50 text-destructive gap-1 hover:bg-destructive/10">
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wallets Grid */}
        <div className="grid gap-2">
          {filteredWallets.map((wallet, index) => (
            <motion.div
              key={wallet.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={cn(
                "p-4 rounded-xl border transition-all cursor-pointer group",
                selectedWallets.includes(wallet.id)
                  ? "border-primary/50 bg-primary/5"
                  : "border-border bg-card/30 hover:border-primary/30 card-hover"
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
                    "w-5 h-5 rounded-md border flex items-center justify-center transition-all flex-shrink-0",
                    selectedWallets.includes(wallet.id)
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border group-hover:border-primary/50"
                  )}
                >
                  {selectedWallets.includes(wallet.id) && <Check className="w-3 h-3" />}
                </button>

                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{wallet.name}</span>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full uppercase font-medium",
                      wallet.status === "active"
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {wallet.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground font-mono">{wallet.address}</span>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">
                    {showBalances ? (
                      <span className="flex items-center gap-1 justify-end">
                        <span className="text-primary">◎</span>
                        {wallet.balance}
                      </span>
                    ) : "••••••"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{wallet.group}</div>
                </div>

                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredWallets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mb-4 border border-border">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No wallets found</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-card/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Wallets:</span>
              <span className="text-foreground font-medium">{mockWallets.length}</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Active:</span>
              <span className="text-primary font-medium">
                {mockWallets.filter(w => w.status === "active").length}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Total Balance:</span>
            <span className="text-primary font-semibold flex items-center gap-1">
              <span>◎</span>
              {showBalances ? totalBalance.toFixed(1) : "••••••"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
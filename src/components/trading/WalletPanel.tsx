import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, 
  RefreshCw, 
  Eye,
  EyeOff,
  Check,
  ChevronDown,
  Filter,
  MoreHorizontal,
  Copy,
  Send,
  ArrowDownToLine
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function WalletPanel() {
  const { 
    wallets, 
    selectedWalletIds,
    toggleWalletSelection,
    selectAllWallets,
    clearWalletSelection,
    totalBalance
  } = useApp();
  
  const [hideBalances, setHideBalances] = useState(false);
  const [filterGroup, setFilterGroup] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredWallets = useMemo(() => {
    if (filterGroup === "all") return wallets;
    return wallets.filter(w => w.group.toLowerCase() === filterGroup.toLowerCase());
  }, [wallets, filterGroup]);

  const activeWallets = useMemo(() => 
    wallets.filter(w => w.status === "active"),
    [wallets]
  );

  const selectedBalance = useMemo(() => {
    return wallets
      .filter(w => selectedWalletIds.includes(w.id))
      .reduce((acc, w) => acc + parseFloat(w.balance), 0);
  }, [wallets, selectedWalletIds]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleSelectAll = () => {
    if (selectedWalletIds.length === activeWallets.length) {
      clearWalletSelection();
    } else {
      selectAllWallets();
    }
  };

  const allSelected = selectedWalletIds.length === activeWallets.length && activeWallets.length > 0;

  const groups = ["all", "trading", "sniping", "bundler", "storage"];

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-full border-r border-border bg-card/20 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-3 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-foreground">Wallets</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-medium">
                {activeWallets.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleRefresh}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin")} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Refresh</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setHideBalances(!hideBalances)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    {hideBalances ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{hideBalances ? "Show" : "Hide"} Balances</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Total Balance */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              {hideBalances ? "••••" : `◎ ${totalBalance.toFixed(2)}`}
            </span>
            <span className="text-[10px] text-muted-foreground">SOL</span>
          </div>
        </div>

        {/* Filter & Select All */}
        <div className="p-2 border-b border-border flex items-center justify-between gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors">
                <Filter className="w-3 h-3" />
                <span className="capitalize">{filterGroup}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[100px]">
              {groups.map(group => (
                <DropdownMenuItem 
                  key={group} 
                  onClick={() => setFilterGroup(group)}
                  className="text-xs capitalize"
                >
                  {group}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={handleSelectAll}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 text-[10px] rounded-md transition-colors",
              allSelected 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Check className="w-3 h-3" />
            {allSelected ? "Deselect All" : "Select All"}
          </button>
        </div>

        {/* Selected Info */}
        <AnimatePresence>
          {selectedWalletIds.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-border"
            >
              <div className="p-2 bg-primary/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-primary font-medium">
                      {selectedWalletIds.length} selected
                    </span>
                    <span className="text-[10px] text-muted-foreground">•</span>
                    <span className="text-[10px] text-foreground font-medium">
                      {hideBalances ? "••••" : `◎ ${selectedBalance.toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wallet List */}
        <div className="flex-1 overflow-auto scrollbar-thin">
          <div className="p-1.5 space-y-0.5">
            {filteredWallets.map((wallet) => {
              const isSelected = selectedWalletIds.includes(wallet.id);
              const isActive = wallet.status === "active";
              
              return (
                <motion.div
                  key={wallet.id}
                  layout
                  className={cn(
                    "group flex items-center gap-2 p-2 rounded-lg transition-all cursor-pointer",
                    isSelected 
                      ? "bg-primary/8 border border-primary/20" 
                      : "hover:bg-muted/30 border border-transparent",
                    !isActive && "opacity-50"
                  )}
                  onClick={() => isActive && toggleWalletSelection(wallet.id)}
                >
                  {/* Checkbox */}
                  <Checkbox
                    checked={isSelected}
                    disabled={!isActive}
                    onCheckedChange={() => toggleWalletSelection(wallet.id)}
                    className={cn(
                      "w-4 h-4 border-border",
                      isSelected && "border-primary bg-primary"
                    )}
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* Status Dot */}
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    isActive ? "bg-primary" : "bg-muted-foreground"
                  )} />

                  {/* Address & Balance */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-foreground truncate">
                        {wallet.address}
                      </span>
                      <span className={cn(
                        "text-xs font-medium flex-shrink-0",
                        parseFloat(wallet.balance) > 0 ? "text-foreground" : "text-destructive"
                      )}>
                        {hideBalances ? "••••" : wallet.balance}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button 
                        className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 opacity-0 group-hover:opacity-100 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-xs gap-2">
                        <Copy className="w-3 h-3" />
                        Copy Address
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs gap-2">
                        <Send className="w-3 h-3" />
                        Transfer
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs gap-2">
                        <ArrowDownToLine className="w-3 h-3" />
                        Deposit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Range Info */}
        <div className="p-2 border-t border-border bg-muted/10">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Range</span>
            <span className="text-foreground font-mono">
              ◎ 0.400 - 0.600
            </span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

import { Search, Bell, Wallet, TrendingUp, TrendingDown, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { useFormatters } from "@/hooks/useFormatters";

export function Header() {
  const { totalBalance, isConnected } = useApp();
  const { formatSol } = useFormatters();
  
  // Mock PNL data
  const pnl = 0.85;
  const pnlPercent = 2.4;
  const isProfitable = pnlPercent >= 0;

  return (
    <header className="h-14 border-b border-border bg-card/40 glass flex items-center px-5 gap-6">
      {/* Balance Display */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <Wallet className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Balance</div>
            <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <span className="text-primary">◎</span>
              {formatSol(totalBalance)}
            </div>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-2.5">
          <div className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center border",
            isProfitable 
              ? "bg-primary/10 border-primary/20" 
              : "bg-destructive/10 border-destructive/20"
          )}>
            {isProfitable ? (
              <TrendingUp className="w-4 h-4 text-primary" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">PNL (24h)</div>
            <div className={cn(
              "text-sm font-semibold flex items-center gap-1.5",
              isProfitable ? "text-primary" : "text-destructive"
            )}>
              {isProfitable ? "+" : ""}{formatSol(pnl)} SOL
              <span className="text-[10px] opacity-75">
                ({isProfitable ? "+" : ""}{pnlPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search tokens by name, symbol, or address..."
            className="h-9 pl-10 bg-muted/50 border-border text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:bg-muted transition-all rounded-lg"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-background/50 px-1.5 py-0.5 rounded border border-border font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary status-pulse" />
        </Button>
        
        <div className="h-6 w-px bg-border" />
        
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg border",
          isConnected 
            ? "border-primary/30 bg-primary/5" 
            : "border-destructive/30 bg-destructive/5"
        )}>
          {isConnected ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-medium">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-destructive" />
              <span className="text-xs text-destructive font-medium">Disconnected</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

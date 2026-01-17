import { Search, Bell, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  walletBalance: string;
  pnl: string;
  pnlPercent?: number;
}

export function Header({ walletBalance, pnl, pnlPercent = 0 }: HeaderProps) {
  const isProfitable = pnlPercent >= 0;

  return (
    <header className="h-14 border-b border-border bg-card/40 glass flex items-center px-5 gap-6">
      {/* Balance Display */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Balance</div>
            <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <span className="text-primary">◎</span>
              {walletBalance}
            </div>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-2.5">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            isProfitable ? "bg-primary/10" : "bg-destructive/10"
          )}>
            {isProfitable ? (
              <TrendingUp className="w-4 h-4 text-primary" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">PNL (24h)</div>
            <div className={cn(
              "text-sm font-semibold flex items-center gap-1",
              isProfitable ? "text-primary" : "text-destructive"
            )}>
              {isProfitable ? "+" : ""}{pnl} SOL
              {pnlPercent !== 0 && (
                <span className="text-[10px] opacity-75">
                  ({isProfitable ? "+" : ""}{pnlPercent.toFixed(1)}%)
                </span>
              )}
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
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-background/50 px-1.5 py-0.5 rounded border border-border">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary status-pulse" />
        </Button>
        
        <div className="h-6 w-px bg-border" />
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary status-pulse" />
          <span className="text-xs text-muted-foreground">Connected</span>
        </div>
      </div>
    </header>
  );
}
import { Search, Bell, Menu, Wallet, Activity, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  walletBalance: string;
  pnl: string;
}

export function Header({ walletBalance, pnl }: HeaderProps) {
  return (
    <header className="h-12 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-4 gap-4">
      {/* Refresh & Quick Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-primary hover:text-primary">
          <Activity className="w-3.5 h-3.5" />
          REFRESH
        </Button>
        <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs hover:text-primary">
          <Wallet className="w-3.5 h-3.5" />
          WALLETS
        </Button>
      </div>

      {/* Balance Display */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-primary">◎</span>
          <span className="text-foreground">{walletBalance}</span>
          <span className="text-muted-foreground">({walletBalance})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">◎</span>
          <span className="text-foreground">{pnl}</span>
          <span className="text-muted-foreground">({pnl})</span>
        </div>
      </div>

      {/* Quick Tabs */}
      <div className="flex items-center gap-1 ml-4">
        <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 border-border">
          <Activity className="w-3 h-3" />
          MONITOR
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 border-border">
          <Briefcase className="w-3 h-3" />
          HOLDINGS
        </Button>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-lg mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tokens..."
            className="h-8 pl-10 bg-muted border-border text-sm placeholder:text-muted-foreground focus:border-primary/50"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 text-xs border-border gap-2">
          <Menu className="w-3.5 h-3.5" />
          ADVANCED
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-xs border-border gap-2">
          <Menu className="w-3.5 h-3.5" />
          MENU
        </Button>
      </div>
    </header>
  );
}

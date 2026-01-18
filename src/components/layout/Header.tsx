import { Search, Settings, Wallet, Star, Download, Zap, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  const { isConnected } = useApp();

  return (
    <TooltipProvider delayDuration={0}>
      <header className="h-12 border-b border-border bg-card/50 flex items-center px-4 gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center border border-primary/25">
            <Zap className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Token Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative group">
            <Input
              placeholder="TOKEN ADDRESS"
              className="h-9 bg-muted/30 border-border text-xs font-mono placeholder:text-muted-foreground focus:border-primary/50 transition-all rounded-lg pr-16"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-medium px-1.5 py-0.5 rounded bg-muted/50 border border-border">
              SOL
            </span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              >
                <Download className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Export</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Settings</TooltipContent>
          </Tooltip>
          
          {/* Connection Status */}
          <div className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium",
            isConnected 
              ? "bg-primary/10 text-primary border border-primary/20" 
              : "bg-destructive/10 text-destructive border border-destructive/20"
          )}>
            <span className={cn(
              "w-2 h-2 rounded-full",
              isConnected ? "bg-primary status-pulse" : "bg-destructive"
            )} />
            {isConnected ? "DE" : "OFF"}
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs gap-1.5 border-primary text-primary hover:bg-primary/10"
          >
            61ms
          </Button>
        </div>
      </header>
    </TooltipProvider>
  );
}

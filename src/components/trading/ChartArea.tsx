import { useState, useMemo } from "react";
import { 
  Search,
  BarChart2,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import type { Timeframe } from "@/types";

const timeframes: Timeframe[] = ["1s", "1m", "5m", "15m", "1h", "4h", "1d"];

export function ChartArea() {
  const { currentToken } = useApp();
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("1m");

  if (!currentToken) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-card/10">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-muted/20 flex items-center justify-center mx-auto mb-6 border border-border">
            <Search className="w-10 h-10 text-muted-foreground/50" />
          </div>
          <h3 className="text-base font-medium text-foreground mb-2">Set token address</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Enter a valid token address in the search bar above to view the token frame
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/20">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              No token selected
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-card/10">
      {/* Chart Canvas - Full Area */}
      <div className="flex-1 relative bg-gradient-to-b from-transparent via-transparent to-muted/5">
        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-[0.07]">
          {[...Array(8)].map((_, i) => (
            <div 
              key={`h-${i}`} 
              className="absolute left-0 right-0 h-px bg-border"
              style={{ top: `${(i + 1) * 12}%` }}
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="absolute top-0 bottom-0 w-px bg-border"
              style={{ left: `${(i + 1) * 8}%` }}
            />
          ))}
        </div>
        
        {/* Center Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-muted/20 flex items-center justify-center mx-auto mb-4 border border-border">
              <BarChart2 className="w-7 h-7 text-muted-foreground/40" />
            </div>
            <p className="text-sm text-muted-foreground">TradingView Chart</p>
          </div>
        </div>

        {/* Price Axis (Right) */}
        <div className="absolute right-0 top-0 bottom-10 w-14 flex flex-col justify-between py-4 border-l border-border/50">
          {["0.00005", "0.00004", "0.00003", "0.00002", "0.00001"].map((p, i) => (
            <span key={i} className="text-[9px] text-muted-foreground/60 text-right pr-2 font-mono">{p}</span>
          ))}
        </div>

        {/* Time Axis (Bottom) */}
        <div className="absolute left-0 right-14 bottom-0 h-10 flex items-center justify-between px-4 border-t border-border/50">
          {["09:00", "12:00", "15:00", "18:00", "21:00", "00:00"].map((t, i) => (
            <span key={i} className="text-[9px] text-muted-foreground/60 font-mono">{t}</span>
          ))}
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="h-10 border-t border-border flex items-center px-3 gap-1 bg-muted/5">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={cn(
              "px-2.5 py-1 text-[11px] font-medium rounded-md transition-all",
              selectedTimeframe === tf
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tf}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>UTC+2</span>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { 
  Settings, 
  Maximize2, 
  Camera, 
  TrendingUp,
  Plus,
  LineChart,
  BarChart2,
  Crosshair,
  Clock,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const timeframes = ["1s", "1m", "5m", "15m", "1h", "4h", "1d"];

interface ChartAreaProps {
  tokenSymbol: string;
  tokenName: string;
  price: string;
  priceChange?: number;
  ohlc: { o: string; h: string; l: string; c: string };
  volume: string;
}

export function ChartArea({ tokenSymbol, tokenName, price, priceChange = 0, ohlc, volume }: ChartAreaProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  const isPriceUp = priceChange >= 0;

  return (
    <div className="flex-1 flex flex-col bg-card/20">
      {/* Token Header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-4">
        <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-sm font-bold text-primary border border-primary/20">
            {tokenSymbol[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{tokenName}</span>
              <span className="text-xs text-muted-foreground">({tokenSymbol})</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">fury.bot</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{selectedTimeframe}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-4">
          <div className={cn(
            "text-lg font-bold",
            isPriceUp ? "text-primary" : "text-destructive"
          )}>
            ${price}
          </div>
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded",
            isPriceUp ? "text-primary bg-primary/10" : "text-destructive bg-destructive/10"
          )}>
            <TrendingUp className={cn(
              "w-3 h-3",
              !isPriceUp && "rotate-180"
            )} />
            {isPriceUp ? "+" : ""}{priceChange.toFixed(2)}%
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
            <Camera className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* OHLC Bar */}
      <div className="px-4 py-2 border-b border-border flex items-center gap-6 text-xs">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">O <span className="text-foreground ml-1">{ohlc.o}</span></span>
          <span className="text-muted-foreground">H <span className="text-primary ml-1">{ohlc.h}</span></span>
          <span className="text-muted-foreground">L <span className="text-destructive ml-1">{ohlc.l}</span></span>
          <span className="text-muted-foreground">C <span className="text-foreground ml-1">{ohlc.c}</span></span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <BarChart2 className="w-3 h-3" />
          <span>Vol</span>
          <span className="text-primary">{volume}</span>
        </div>
      </div>

      {/* Chart Content */}
      <div className="flex-1 flex">
        {/* Drawing Tools */}
        <div className="w-11 border-r border-border flex flex-col items-center py-3 gap-1">
          {[Crosshair, TrendingUp, LineChart, Clock].map((Icon, i) => (
            <button
              key={i}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                i === 0 
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Chart Canvas */}
        <div className="flex-1 relative bg-gradient-to-b from-transparent to-muted/20">
          {/* Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4 border border-border">
                <BarChart2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">TradingView Chart</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Real-time price data</p>
            </div>
          </div>

          {/* Price Axis */}
          <div className="absolute right-0 top-0 bottom-0 w-16 border-l border-border flex flex-col justify-between py-4 text-right pr-3">
            {["4,050", "4,045", "4,040", "4,035", "4,030"].map((p, i) => (
              <span key={i} className="text-[10px] text-muted-foreground">{p}</span>
            ))}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded-md font-semibold shadow-lg">
              4,035
            </div>
          </div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="h-10 border-t border-border flex items-center px-3 gap-1 bg-muted/20">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={cn(
              "px-2.5 py-1 text-xs font-medium rounded-md transition-all",
              selectedTimeframe === tf
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {tf}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="text-primary">UTC+2</span>
          <Clock className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { 
  Settings, 
  Maximize2, 
  Camera, 
  RotateCcw,
  TrendingUp,
  Plus,
  Minus,
  LineChart,
  BarChart2,
  Crosshair,
  Type,
  Clock,
  Pencil,
  Hash,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

const timeframes = ["3m", "1m", "5d", "1d"];

interface ChartAreaProps {
  tokenSymbol: string;
  tokenName: string;
  price: string;
  ohlc: { o: string; h: string; l: string; c: string };
  volume: string;
}

export function ChartArea({ tokenSymbol, tokenName, price, ohlc, volume }: ChartAreaProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1s");

  return (
    <div className="flex-1 flex flex-col bg-card/20">
      {/* Toolbar */}
      <div className="h-10 border-b border-border flex items-center px-3 gap-2 text-xs">
        <span className="text-muted-foreground">1s</span>
        <button className="px-2 py-1 text-muted-foreground hover:text-foreground flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          Indicators
        </button>
        <button className="px-2 py-1 text-muted-foreground hover:text-foreground flex items-center gap-1">
          <Hash className="w-3 h-3 text-primary" />
          CC6x9x...Vdpump
        </button>
        <div className="flex items-center gap-1 ml-2">
          <button className="p-1 text-muted-foreground hover:text-foreground">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 text-muted-foreground hover:text-foreground">
            <RotateCcw className="w-3.5 h-3.5 transform scale-x-[-1]" />
          </button>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <button className="p-1 text-muted-foreground hover:text-foreground">
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 text-muted-foreground hover:text-foreground">
            <Clock className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 text-muted-foreground hover:text-foreground">
            <Camera className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 text-muted-foreground hover:text-foreground">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chart Header */}
      <div className="px-3 py-2 border-b border-border">
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
              {tokenSymbol[0]}
            </div>
            <span className="text-sm font-medium text-foreground">{tokenName} ({tokenSymbol})</span>
            <span className="text-xs text-muted-foreground">· 1s · fury.bot</span>
          </div>
          <div className="text-xs text-muted-foreground ml-4">
            O<span className="text-foreground ml-1">{ohlc.o}</span>
            <span className="ml-3">H</span><span className="text-foreground ml-1">{ohlc.h}</span>
            <span className="ml-3">L</span><span className="text-foreground ml-1">{ohlc.l}</span>
            <span className="ml-3">C</span><span className="text-foreground ml-1">{ohlc.c}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Pencil className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Volume</span>
          <span className="text-xs text-primary">{volume}</span>
          <button className="text-muted-foreground hover:text-foreground">
            <Minus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Chart Drawing Tools */}
      <div className="flex">
        <div className="w-10 border-r border-border flex flex-col items-center py-2 gap-1">
          {[Crosshair, TrendingUp, LineChart, Type, Clock, Pencil, Layers, Plus].map((Icon, i) => (
            <button
              key={i}
              className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Chart Canvas Placeholder */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                <BarChart2 className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">TradingView Chart</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Real-time price data</p>
            </div>
          </div>

          {/* Price Axis */}
          <div className="absolute right-0 top-0 bottom-8 w-16 border-l border-border flex flex-col justify-between py-4 text-right pr-2">
            {["4,041", "4,040", "4,039", "4,038", "4,037", "4,036"].map((price, i) => (
              <span key={i} className="text-[10px] text-muted-foreground">{price}</span>
            ))}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-medium">
              4,035
            </div>
          </div>

          {/* Current Price Badge */}
          <div className="absolute right-20 top-1/2 bg-primary/20 text-primary text-xs px-2 py-1 rounded border border-primary/30">
            0.11
          </div>

          {/* Time Axis */}
          <div className="absolute bottom-0 left-0 right-16 h-8 border-t border-border flex items-center justify-between px-4 text-[10px] text-muted-foreground">
            <span>00:32:27</span>
            <span>00:32:28 UTC+2</span>
            <div className="flex items-center gap-2">
              <span>%</span>
              <span>log</span>
              <span className="text-primary">auto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="h-8 border-t border-border flex items-center px-3 gap-2">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={cn(
              "px-2 py-1 text-xs rounded transition-colors",
              selectedTimeframe === tf
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tf}
          </button>
        ))}
        <button className="p-1 text-muted-foreground hover:text-foreground">
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

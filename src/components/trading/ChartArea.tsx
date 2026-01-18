import { useState, useMemo } from "react";
import { 
  Settings, 
  Maximize2, 
  Camera, 
  TrendingUp,
  TrendingDown,
  Plus,
  LineChart,
  BarChart2,
  Crosshair,
  Clock,
  RefreshCw,
  Star,
  Copy,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { useFormatters } from "@/hooks/useFormatters";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Timeframe } from "@/types";

const timeframes: Timeframe[] = ["1s", "1m", "5m", "15m", "1h", "4h", "1d"];

const drawingTools = [
  { icon: Crosshair, label: "Crosshair" },
  { icon: TrendingUp, label: "Trend Line" },
  { icon: LineChart, label: "Horizontal Line" },
  { icon: Clock, label: "Alert" },
];

export function ChartArea() {
  const { currentToken } = useApp();
  const { formatPrice, formatPercent } = useFormatters();
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("1m");
  const [selectedTool, setSelectedTool] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const isPriceUp = (currentToken?.priceChange24h ?? 0) >= 0;

  // Mock OHLC data
  const ohlc = useMemo(() => ({
    o: currentToken ? formatPrice(currentToken.price * 0.998) : "0",
    h: currentToken ? formatPrice(currentToken.price * 1.002) : "0",
    l: currentToken ? formatPrice(currentToken.price * 0.995) : "0",
    c: currentToken ? formatPrice(currentToken.price) : "0",
  }), [currentToken, formatPrice]);

  if (!currentToken) {
    return (
      <div className="flex-1 flex items-center justify-center bg-card/20">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4 border border-border">
            <BarChart2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Select a token to view chart</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex-1 flex flex-col bg-card/20">
        {/* Token Header */}
        <div className="px-4 py-3 border-b border-border flex items-center gap-3">
          {/* Add to favorites */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isFavorite 
                    ? "bg-warning/10 text-warning" 
                    : "bg-muted/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <Star className={cn("w-4 h-4", isFavorite && "fill-current")} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Token Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-sm font-bold text-primary border border-primary/20">
              {currentToken.symbol[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{currentToken.name}</span>
                <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-muted/50 rounded">
                  {currentToken.symbol}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono truncate max-w-[100px]">{currentToken.address}</span>
                <button className="hover:text-primary transition-colors">
                  <Copy className="w-3 h-3" />
                </button>
                <button className="hover:text-primary transition-colors">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Price & Change */}
          <div className="flex items-center gap-4 ml-4">
            <div className={cn(
              "text-xl font-bold",
              isPriceUp ? "text-primary" : "text-destructive"
            )}>
              ${formatPrice(currentToken.price)}
            </div>
            <div className={cn(
              "flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg",
              isPriceUp ? "text-primary bg-primary/10" : "text-destructive bg-destructive/10"
            )}>
              {isPriceUp ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {formatPercent(currentToken.priceChange24h)}
            </div>
          </div>

          {/* Chart Actions */}
          <div className="ml-auto flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p className="text-xs">Refresh</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                  <Camera className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p className="text-xs">Screenshot</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                  <Settings className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p className="text-xs">Settings</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p className="text-xs">Fullscreen</p></TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* OHLC Bar */}
        <div className="px-4 py-2.5 border-b border-border flex items-center gap-8 text-xs bg-muted/10">
          <div className="flex items-center gap-5">
            <span className="text-muted-foreground">
              O <span className="text-foreground font-medium ml-1">{ohlc.o}</span>
            </span>
            <span className="text-muted-foreground">
              H <span className="text-primary font-medium ml-1">{ohlc.h}</span>
            </span>
            <span className="text-muted-foreground">
              L <span className="text-destructive font-medium ml-1">{ohlc.l}</span>
            </span>
            <span className="text-muted-foreground">
              C <span className="text-foreground font-medium ml-1">{ohlc.c}</span>
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Vol</span>
            <span className="text-primary font-medium">{currentToken.volume24h}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>MCap</span>
            <span className="text-foreground font-medium">{currentToken.marketCap}</span>
          </div>
        </div>

        {/* Chart Content */}
        <div className="flex-1 flex">
          {/* Drawing Tools */}
          <div className="w-12 border-r border-border flex flex-col items-center py-3 gap-1 bg-muted/5">
            {drawingTools.map((tool, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setSelectedTool(i)}
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                      selectedTool === i
                        ? "text-primary bg-primary/10 border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <tool.icon className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs">{tool.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Chart Canvas */}
          <div className="flex-1 relative bg-gradient-to-b from-transparent via-transparent to-muted/10">
            {/* Grid Lines (visual) */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={`h-${i}`} 
                  className="absolute left-0 right-16 h-px bg-border"
                  style={{ top: `${(i + 1) * 20}%` }}
                />
              ))}
            </div>
            
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
            <div className="absolute right-0 top-0 bottom-0 w-16 border-l border-border flex flex-col justify-between py-4">
              {["0.00005", "0.000045", "0.00004", "0.000035", "0.00003"].map((p, i) => (
                <span key={i} className="text-[10px] text-muted-foreground text-right pr-2">{p}</span>
              ))}
              <div className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 text-[10px] px-2 py-1 rounded-md font-semibold shadow-lg",
                isPriceUp ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"
              )}>
                {formatPrice(currentToken.price)}
              </div>
            </div>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="h-11 border-t border-border flex items-center px-4 gap-1 bg-muted/10">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                selectedTimeframe === tf
                  ? "text-primary bg-primary/10 border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {tf}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-[10px] text-muted-foreground">
            <span className="text-primary font-medium">UTC+2</span>
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

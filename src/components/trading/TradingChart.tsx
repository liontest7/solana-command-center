import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, CandlestickData, Time, CandlestickSeries } from "lightweight-charts";
import { Clock, TrendingUp, TrendingDown, Maximize2, Minimize2, Camera, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import type { Timeframe } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const timeframes: Timeframe[] = ["1s", "1m", "5m", "15m", "1h", "4h", "1d"];

// Generate realistic mock candlestick data
function generateCandlestickData(count: number = 100): CandlestickData<Time>[] {
  const data: CandlestickData<Time>[] = [];
  let baseTime = Math.floor(Date.now() / 1000) - count * 60;
  let lastClose = 0.00003 + Math.random() * 0.00002;

  for (let i = 0; i < count; i++) {
    const volatility = 0.05 + Math.random() * 0.1;
    const trend = Math.random() > 0.48 ? 1 : -1;
    const change = lastClose * volatility * trend;
    
    const open = lastClose;
    const close = open + change;
    const high = Math.max(open, close) + Math.abs(change) * Math.random() * 0.5;
    const low = Math.min(open, close) - Math.abs(change) * Math.random() * 0.5;

    data.push({
      time: baseTime as Time,
      open: parseFloat(open.toFixed(8)),
      high: parseFloat(high.toFixed(8)),
      low: parseFloat(low.toFixed(8)),
      close: parseFloat(close.toFixed(8)),
    });

    lastClose = close;
    baseTime += 60;
  }

  return data;
}

export function TradingChart() {
  const { currentToken } = useApp();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ReturnType<ReturnType<typeof createChart>["addSeries"]> | null>(null);
  
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("1m");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number>(0.0000342);
  const [priceChange, setPriceChange] = useState<number>(12.45);
  const [ohlc, setOhlc] = useState({ o: 0, h: 0, l: 0, c: 0 });

  useEffect(() => {
    if (!chartContainerRef.current || !currentToken) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'rgba(255, 255, 255, 0.5)',
        fontSize: 10,
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.04)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.04)' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: 'rgba(0, 255, 136, 0.3)',
          width: 1,
          style: 2,
          labelBackgroundColor: 'rgba(0, 255, 136, 0.2)',
        },
        horzLine: {
          color: 'rgba(0, 255, 136, 0.3)',
          width: 1,
          style: 2,
          labelBackgroundColor: 'rgba(0, 255, 136, 0.2)',
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScale: {
        axisPressedMouseMove: true,
      },
      handleScroll: {
        vertTouchDrag: true,
      },
    });

    chartRef.current = chart;

    // Add candlestick series using v5 API
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#00ff88',
      downColor: '#ff4757',
      borderUpColor: '#00ff88',
      borderDownColor: '#ff4757',
      wickUpColor: '#00ff88',
      wickDownColor: '#ff4757',
    });

    seriesRef.current = candlestickSeries;

    // Set data
    const data = generateCandlestickData(150);
    candlestickSeries.setData(data);

    // Set OHLC from last candle
    const lastCandle = data[data.length - 1];
    if (lastCandle) {
      setOhlc({
        o: lastCandle.open,
        h: lastCandle.high,
        l: lastCandle.low,
        c: lastCandle.close,
      });
      setCurrentPrice(lastCandle.close);
    }

    // Crosshair move handler
    chart.subscribeCrosshairMove((param) => {
      if (param.seriesData && param.seriesData.size > 0) {
        const candleData = param.seriesData.get(candlestickSeries) as CandlestickData;
        if (candleData) {
          setOhlc({
            o: candleData.open,
            h: candleData.high,
            l: candleData.low,
            c: candleData.close,
          });
        }
      }
    });

    // Fit content
    chart.timeScale().fitContent();

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0 || !chartContainerRef.current) return;
      const { width, height } = entries[0].contentRect;
      chart.applyOptions({ width, height });
    });

    resizeObserver.observe(chartContainerRef.current);

    // Simulate live updates
    const interval = setInterval(() => {
      const lastData = data[data.length - 1];
      const newTime = (lastData.time as number) + 60;
      const volatility = 0.02 + Math.random() * 0.05;
      const trend = Math.random() > 0.48 ? 1 : -1;
      const change = lastData.close * volatility * trend;
      
      const newCandle: CandlestickData = {
        time: newTime as Time,
        open: lastData.close,
        high: Math.max(lastData.close, lastData.close + change) * (1 + Math.random() * 0.02),
        low: Math.min(lastData.close, lastData.close + change) * (1 - Math.random() * 0.02),
        close: lastData.close + change,
      };

      data.push(newCandle);
      candlestickSeries.update(newCandle);
      setCurrentPrice(newCandle.close);
      
      // Update price change randomly
      setPriceChange(prev => prev + (Math.random() - 0.48) * 2);
    }, 3000);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [currentToken, selectedTimeframe]);

  if (!currentToken) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-muted/5 to-transparent">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-muted/10 flex items-center justify-center mx-auto mb-6 border border-border/50">
            <TrendingUp className="w-10 h-10 text-muted-foreground/30" />
          </div>
          <h3 className="text-sm font-medium text-foreground mb-2">No Token Selected</h3>
          <p className="text-xs text-muted-foreground max-w-xs">
            Enter a token address in the search bar to view the chart
          </p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex-1 flex flex-col min-h-0 h-full">
        {/* Token Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/5">
          <div className="flex items-center gap-4">
            {/* Token Info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20">
                <span className="text-xs font-bold text-primary">
                  {currentToken.symbol?.charAt(0) || "T"}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">{currentToken.symbol || "TOKEN"}</span>
                  <span className="text-xs text-muted-foreground">/SOL</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">
                    ${currentPrice.toFixed(8)}
                  </span>
                  <span className={cn(
                    "flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded",
                    priceChange >= 0 
                      ? "text-primary bg-primary/10" 
                      : "text-destructive bg-destructive/10"
                  )}>
                    {priceChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* OHLC */}
            <div className="flex items-center gap-4 pl-4 border-l border-border">
              {[
                { label: "O", value: ohlc.o.toFixed(8) },
                { label: "H", value: ohlc.h.toFixed(8), className: "text-primary" },
                { label: "L", value: ohlc.l.toFixed(8), className: "text-destructive" },
                { label: "C", value: ohlc.c.toFixed(8) },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground">{item.label}</span>
                  <span className={cn("text-xs font-mono", item.className || "text-foreground")}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Actions */}
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Screenshot</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
                  <Settings2 className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Chart Container */}
        <div ref={chartContainerRef} className="flex-1 min-h-[200px] w-full" />

        {/* Timeframe Selector */}
        <div className="h-10 border-t border-border flex items-center px-3 gap-1 bg-muted/5">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={cn(
                "px-2.5 py-1.5 text-[11px] font-medium rounded-md transition-all",
                selectedTimeframe === tf
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              {tf}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span className="font-mono">LIVE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
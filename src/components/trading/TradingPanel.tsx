import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, ChevronDown, Percent, Zap, Sparkles, Trash2, Rocket, LayoutGrid, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useApp } from "@/context/AppContext";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const quickAmounts = [
  { label: "DEGEN", value: "0.01", variant: "primary" },
  { label: "DIAMOND", value: "0.05", variant: "default" },
  { label: "YOLO", value: "0.1", variant: "default" },
];

const presetAmounts = ["0.01", "0.05", "0.1", "0.5"];

const quickActions = [
  { icon: Sparkles, label: "CLEANER", action: "cleaner" },
  { icon: Rocket, label: "DEPLOY", action: "deploy" },
  { icon: Trash2, label: "BURN", action: "burn" },
  { icon: LayoutGrid, label: "STAGGER", action: "stagger" },
];

export function TradingPanel() {
  const { 
    tradeMode, 
    setTradeMode, 
    tradeAmount, 
    setTradeAmount,
    settings,
    updateTradingSettings,
    selectedWalletIds,
    currentToken,
    selectedBalance
  } = useApp();
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [autoMode, setAutoMode] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<string | null>("DEGEN");

  const handleAmountChange = (value: string) => {
    setTradeAmount(value);
    setSelectedPreset(null);
  };

  const handlePresetClick = (preset: typeof quickAmounts[0]) => {
    setTradeAmount(preset.value);
    setSelectedPreset(preset.label);
  };

  const handleQuickAmountClick = (amount: string) => {
    setTradeAmount(amount);
    setSelectedPreset(null);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-full border-l border-border bg-card/20 flex flex-col overflow-hidden">
        {/* Mode Toggle */}
        <div className="p-3 border-b border-border">
          <div className="flex items-center gap-1">
            {/* Wallet Icon */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Batch Mode</TooltipContent>
            </Tooltip>

            {/* Buy/Sell Toggle */}
            <div className="flex-1 flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
              <button
                onClick={() => setTradeMode("buy")}
                className={cn(
                  "flex-1 py-2 text-xs font-semibold rounded-md transition-all duration-200",
                  tradeMode === "buy"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                BUY
              </button>
              <button
                onClick={() => setTradeMode("sell")}
                className={cn(
                  "flex-1 py-2 text-xs font-semibold rounded-md transition-all duration-200",
                  tradeMode === "sell"
                    ? "bg-destructive text-destructive-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                SELL
              </button>
            </div>

            {/* Selected Wallets Count */}
            <div className="px-2.5 py-2 rounded-lg border border-border bg-muted/30 text-xs font-medium text-foreground">
              {selectedWalletIds.length} <span className="text-muted-foreground">≡</span>
            </div>
          </div>
        </div>

        {/* Order Type + Auto */}
        <div className="p-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOrderType("market")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                orderType === "market"
                  ? "text-foreground bg-muted/50"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              MARKET
            </button>
            <button
              onClick={() => setOrderType("limit")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                orderType === "limit"
                  ? "text-foreground bg-muted/50"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              LIMIT
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setAutoMode(!autoMode)}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all border",
                autoMode 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              ★ AUTO
            </button>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Advanced</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-3 space-y-4 scrollbar-thin">
          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Amount</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  value={tradeAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="h-10 text-sm font-medium bg-muted/30 border-border pr-20"
                  placeholder="0.0"
                  type="number"
                  step="0.01"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                  SOL/WALLET
                </span>
              </div>
              <Button
                className={cn(
                  "h-10 px-4 text-xs font-semibold",
                  tradeMode === "buy"
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                )}
                disabled={!tradeAmount || parseFloat(tradeAmount) <= 0}
              >
                {tradeMode === "buy" ? "BUY" : "SELL"}
              </Button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2">
            {quickAmounts.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePresetClick(preset)}
                className={cn(
                  "flex-1 py-2 text-xs font-semibold rounded-lg border transition-all",
                  selectedPreset === preset.label
                    ? preset.variant === "primary"
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-primary/50 bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground bg-muted/20"
                )}
              >
                {preset.label}
              </button>
            ))}
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
                  <Settings2 className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Edit Presets</TooltipContent>
            </Tooltip>
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickAmountClick(amount)}
                className={cn(
                  "py-2 rounded-lg text-xs font-medium border transition-all",
                  tradeAmount === amount
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground bg-muted/20"
                )}
              >
                {amount}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action) => (
              <Tooltip key={action.action}>
                <TooltipTrigger asChild>
                  <button className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-muted/20 transition-all">
                    <action.icon className="w-5 h-5" />
                    <span className="text-[9px] font-medium">{action.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{action.label}</TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Advanced Settings */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 p-3 rounded-xl border border-border bg-muted/10">
                  {/* Slippage */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Slippage</span>
                      <span className="text-primary font-medium">{settings.trading.slippage}%</span>
                    </div>
                    <Slider
                      value={[settings.trading.slippage]}
                      onValueChange={([v]) => updateTradingSettings({ slippage: v })}
                      min={0.1}
                      max={15}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Priority Fee */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Priority Fee</span>
                      <span className="text-foreground font-medium">{settings.trading.priorityFee} SOL</span>
                    </div>
                    <Slider
                      value={[settings.trading.priorityFee * 10000]}
                      onValueChange={([v]) => updateTradingSettings({ priorityFee: v / 10000 })}
                      min={1}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                    <span className="text-muted-foreground">Compute Units</span>
                    <span className="text-foreground font-medium">{settings.trading.computeUnits.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Data Footer */}
        <div className="p-3 border-t border-border bg-muted/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] text-primary font-medium uppercase tracking-wider">Live Data</span>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 border-primary text-primary hover:bg-primary/10">
              ✎ Share PNL
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Bought", value: "0.00" },
              { label: "Sold", value: "0.00" },
              { label: "Holding", value: "0.00" },
              { label: "PNL", value: "+0.00", highlight: true },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[9px] text-muted-foreground uppercase mb-0.5">{stat.label}</div>
                <div className={cn(
                  "text-xs font-medium",
                  stat.highlight ? "text-primary" : "text-foreground"
                )}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

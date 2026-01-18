import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, ChevronDown, Percent, Zap, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useApp } from "@/context/AppContext";
import { useFormatters } from "@/hooks/useFormatters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const presetAmounts = ["0.1", "0.25", "0.5", "1.0"];
const percentPresets = [25, 50, 75, 100];

export function TradingPanel() {
  const { 
    tradeMode, 
    setTradeMode, 
    tradeAmount, 
    setTradeAmount,
    settings,
    updateTradingSettings,
    wallets,
    selectedWalletId,
    setSelectedWalletId,
    currentToken 
  } = useApp();
  
  const { formatSol } = useFormatters();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedPercent, setSelectedPercent] = useState<number | null>(null);

  const selectedWallet = useMemo(() => 
    wallets.find(w => w.id === selectedWalletId),
    [wallets, selectedWalletId]
  );

  const activeWallets = useMemo(() => 
    wallets.filter(w => w.status === "active"),
    [wallets]
  );

  const handlePercentClick = (percent: number) => {
    setSelectedPercent(percent);
    if (selectedWallet) {
      const balance = parseFloat(selectedWallet.balance);
      const amount = (balance * percent / 100).toFixed(4);
      setTradeAmount(amount);
    }
  };

  const handleAmountChange = (value: string) => {
    setTradeAmount(value);
    setSelectedPercent(null);
  };

  return (
    <div className="w-80 border-l border-border bg-card/30 flex flex-col">
      {/* Mode Toggle */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-xl">
          <button
            onClick={() => setTradeMode("buy")}
            className={cn(
              "flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200",
              tradeMode === "buy"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            BUY
          </button>
          <button
            onClick={() => setTradeMode("sell")}
            className={cn(
              "flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200",
              tradeMode === "sell"
                ? "bg-destructive text-destructive-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            SELL
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-5 scrollbar-thin">
        {/* Wallet Selector */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5" />
            Wallet
          </label>
          <Select value={selectedWalletId || ""} onValueChange={setSelectedWalletId}>
            <SelectTrigger className="h-10 bg-muted/50 border-border">
              <SelectValue placeholder="Select wallet" />
            </SelectTrigger>
            <SelectContent>
              {activeWallets.map((wallet) => (
                <SelectItem key={wallet.id} value={wallet.id}>
                  <div className="flex items-center justify-between gap-4">
                    <span>{wallet.name}</span>
                    <span className="text-primary text-xs">◎ {wallet.balance}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount Input */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground font-medium">
              Amount (SOL)
            </label>
            <span className="text-[10px] text-muted-foreground">
              Balance: <span className="text-primary">{selectedWallet?.balance || "0"}</span> SOL
            </span>
          </div>
          <div className="relative">
            <Input
              value={tradeAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="h-12 text-lg font-semibold bg-muted/50 border-border pr-16 focus:border-primary/50"
              placeholder="0.0"
              type="number"
              step="0.01"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              SOL
            </span>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              onClick={() => handleAmountChange(preset)}
              className={cn(
                "py-2 rounded-lg text-xs font-medium border transition-all",
                tradeAmount === preset
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground bg-muted/30"
              )}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Percentage Selector */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground font-medium">% of Balance</label>
            <span className="text-xs text-primary font-medium">
              {selectedPercent !== null ? `${selectedPercent}%` : "-"}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {percentPresets.map((pct) => (
              <button
                key={pct}
                onClick={() => handlePercentClick(pct)}
                className={cn(
                  "py-2 text-xs font-medium rounded-lg border transition-all",
                  selectedPercent === pct
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground bg-muted/30"
                )}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {/* Slippage Control */}
        <div className="p-3.5 rounded-xl bg-muted/30 border border-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Slippage</span>
            </div>
            <span className="text-xs text-primary font-semibold">{settings.trading.slippage}%</span>
          </div>
          <Slider
            value={[settings.trading.slippage]}
            onValueChange={([v]) => updateTradingSettings({ slippage: v })}
            min={0.1}
            max={15}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>0.1%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Advanced Settings Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl border border-border bg-muted/20 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
        >
          <div className="flex items-center gap-2">
            <Settings2 className="w-3.5 h-3.5" />
            <span>Advanced Settings</span>
          </div>
          <ChevronDown className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            showAdvanced && "rotate-180"
          )} />
        </button>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 p-4 rounded-xl border border-border bg-muted/20">
                <div className="space-y-2.5">
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
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Compute Units</span>
                  <span className="text-foreground font-medium">{settings.trading.computeUnits.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Jito Tip</span>
                  <span className="text-primary font-medium capitalize">{settings.trading.jitoTip}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trade Summary */}
        {currentToken && (
          <div className="p-3.5 rounded-xl border border-border/50 bg-muted/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Estimated Output</span>
              <span className="text-foreground font-medium">
                ~{(parseFloat(tradeAmount || "0") / currentToken.price).toLocaleString()} {currentToken.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Price Impact</span>
              <span className="text-primary font-medium">{"<"}0.01%</span>
            </div>
          </div>
        )}

        {/* Execute Button */}
        <Button
          className={cn(
            "w-full h-12 text-sm font-semibold gap-2 shadow-lg transition-all",
            tradeMode === "buy"
              ? "bg-primary hover:bg-primary/90 text-primary-foreground glow-primary-subtle"
              : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          )}
          disabled={!tradeAmount || parseFloat(tradeAmount) <= 0}
        >
          <Zap className="w-4 h-4" />
          {tradeMode === "buy" ? "BUY" : "SELL"} {currentToken?.symbol || "TOKEN"}
        </Button>
      </div>

      {/* Live Stats Footer */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-primary status-pulse" />
          <span className="text-[10px] text-primary font-medium uppercase tracking-wider">Live Stats</span>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Bought", value: "0.00" },
            { label: "Sold", value: "0.00" },
            { label: "Holding", value: "0.00" },
            { label: "PNL", value: "+0.00", highlight: true },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-[10px] text-muted-foreground uppercase mb-0.5">{stat.label}</div>
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
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, ChevronDown, Percent, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

const presetAmounts = [
  { label: "0.1", value: "0.1" },
  { label: "0.25", value: "0.25" },
  { label: "0.5", value: "0.5" },
  { label: "1.0", value: "1.0" },
];

export function TradingPanel() {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("0.1");
  const [slippage, setSlippage] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="w-80 border-l border-border bg-card/30 flex flex-col">
      {/* Header with tabs */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-xl">
          <button
            onClick={() => setMode("buy")}
            className={cn(
              "flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200",
              mode === "buy"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            BUY
          </button>
          <button
            onClick={() => setMode("sell")}
            className={cn(
              "flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200",
              mode === "sell"
                ? "bg-destructive text-destructive-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            SELL
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-5">
        {/* Amount Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground font-medium">Amount (SOL)</label>
            <span className="text-[10px] text-muted-foreground">Balance: 12.5 SOL</span>
          </div>
          <div className="relative">
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 text-lg font-semibold bg-muted/50 border-border pr-16 focus:border-primary/50"
              placeholder="0.0"
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
              key={preset.value}
              onClick={() => setAmount(preset.value)}
              className={cn(
                "py-2 rounded-lg text-xs font-medium border transition-all",
                amount === preset.value
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground bg-muted/30"
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Percentage Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground font-medium">% of Balance</label>
            <span className="text-xs text-primary font-medium">25%</span>
          </div>
          <div className="flex gap-2 items-center">
            {[25, 50, 75, 100].map((pct) => (
              <button
                key={pct}
                className="flex-1 py-1.5 text-[10px] font-medium rounded border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all bg-muted/30"
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {/* Slippage */}
        <div className="p-3 rounded-xl bg-muted/30 border border-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Slippage</span>
            </div>
            <span className="text-xs text-primary font-medium">{slippage}%</span>
          </div>
          <Slider
            value={[slippage]}
            onValueChange={([v]) => setSlippage(v)}
            min={0.1}
            max={10}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Advanced Settings Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg border border-border bg-muted/20 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
        >
          <div className="flex items-center gap-2">
            <Settings2 className="w-3.5 h-3.5" />
            <span>Advanced Settings</span>
          </div>
          <ChevronDown className={cn(
            "w-3.5 h-3.5 transition-transform",
            showAdvanced && "rotate-180"
          )} />
        </button>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 p-3 rounded-xl border border-border bg-muted/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Priority Fee</span>
                  <span className="text-foreground">0.0001 SOL</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Max Compute</span>
                  <span className="text-foreground">200,000</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Jito Tip</span>
                  <span className="text-primary">Auto</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Execute Button */}
        <Button
          className={cn(
            "w-full h-12 text-sm font-semibold gap-2 shadow-lg transition-all",
            mode === "buy"
              ? "bg-primary hover:bg-primary/90 text-primary-foreground glow-primary-subtle"
              : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          )}
        >
          <Zap className="w-4 h-4" />
          {mode === "buy" ? "BUY TOKEN" : "SELL TOKEN"}
        </Button>
      </div>

      {/* Live Stats Footer */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-primary status-pulse" />
          <span className="text-[10px] text-primary font-medium uppercase tracking-wider">Live Data</span>
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
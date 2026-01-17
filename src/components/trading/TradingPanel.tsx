import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Share2, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const presetAmounts = [
  { label: "DEGEN", value: "0.01" },
  { label: "DIAMOND", value: "0.05" },
  { label: "YOLO", value: "0.1" },
];

const quickAmounts = ["0.01", "0.05", "0.1", "0.5"];

export function TradingPanel() {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [amount, setAmount] = useState("0.0");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  return (
    <div className="w-80 border-l border-border bg-card/30 flex flex-col">
      {/* Header with tabs */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setMode("buy")}
            className={cn(
              "flex-1 py-2 text-xs font-medium rounded-md transition-all duration-200",
              mode === "buy"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            BUY
          </button>
          <button
            onClick={() => setMode("sell")}
            className={cn(
              "flex-1 py-2 text-xs font-medium rounded-md transition-all duration-200",
              mode === "sell"
                ? "bg-destructive text-destructive-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            SELL
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground rounded-md">
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Order Type */}
      <div className="px-3 pt-3">
        <div className="flex items-center gap-4 text-xs mb-4">
          <button
            onClick={() => setOrderType("market")}
            className={cn(
              "pb-1 border-b-2 transition-colors",
              orderType === "market"
                ? "text-foreground border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            MARKET
          </button>
          <button
            onClick={() => setOrderType("limit")}
            className={cn(
              "pb-1 border-b-2 transition-colors",
              orderType === "limit"
                ? "text-foreground border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            LIMIT
          </button>
          <button className="ml-auto text-muted-foreground hover:text-foreground">
            <Settings2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Amount Input */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>AMOUNT</span>
            <span>SOL/WALLET</span>
          </div>
          <div className="flex gap-2">
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 h-10 bg-muted border-border text-foreground"
              placeholder="0.0"
            />
            <Button
              className={cn(
                "h-10 px-6 text-xs font-medium",
                mode === "buy"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              )}
            >
              {mode.toUpperCase()}
            </Button>
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="flex gap-2 mb-3">
          {presetAmounts.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setSelectedPreset(preset.label);
                setAmount(preset.value);
              }}
              className={cn(
                "flex-1 py-2 px-3 rounded-md text-xs font-medium border transition-all",
                selectedPreset === preset.label
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {preset.label}
            </button>
          ))}
          <button className="p-2 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
            <Settings2 className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Amounts */}
        <div className="flex gap-2 mb-6">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              className="flex-1 py-1.5 rounded-md text-xs border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-all"
            >
              {amt}
            </button>
          ))}
        </div>
      </div>

      {/* Live Data Section */}
      <div className="px-3 border-t border-border pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs text-primary">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            LIVE DATA
          </div>
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10">
            <Share2 className="w-3 h-3" />
            Share PNL
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs text-muted-foreground mb-1">BOUGHT</div>
            <div className="text-sm text-foreground">0.00 ≡</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">SOLD</div>
            <div className="text-sm text-foreground">0.00 ≡</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">HOLDING</div>
            <div className="text-sm text-foreground">0.00 ≡</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">PNL</div>
            <div className="text-sm text-primary">+0.00 ≡</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Layers, 
  Plus, 
  Play, 
  Pause,
  Settings,
  Trash2,
  Copy,
  Zap,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface BundleConfig {
  id: string;
  name: string;
  wallets: number;
  amountPerWallet: string;
  delayRange: [number, number];
  status: "ready" | "running" | "completed";
}

const mockBundles: BundleConfig[] = [
  { id: "1", name: "Quick Buy Bundle", wallets: 5, amountPerWallet: "0.1", delayRange: [50, 150], status: "ready" },
  { id: "2", name: "Launch Snipe", wallets: 10, amountPerWallet: "0.05", delayRange: [0, 50], status: "completed" },
  { id: "3", name: "DCA Bundle", wallets: 3, amountPerWallet: "0.5", delayRange: [1000, 2000], status: "ready" },
];

export function BundlesPage() {
  const [selectedWallets, setSelectedWallets] = useState<string[]>([]);
  const [amountPerWallet, setAmountPerWallet] = useState("0.1");
  const [delayMin, setDelayMin] = useState(50);
  const [delayMax, setDelayMax] = useState(150);

  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-background">
      {/* Left: Bundle Config */}
      <div className="flex-1 flex flex-col border-r border-border">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground mb-1 tracking-wide">BUNDLE EXECUTOR</h1>
          <p className="text-sm text-muted-foreground">Execute multi-wallet transactions</p>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Wallet Selection */}
          <div className="mb-6">
            <label className="block text-xs text-muted-foreground mb-3">
              {">"} SELECT WALLETS {"<"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["Main", "Sniper #1", "Bundle #1", "Bundle #2", "Bundle #3"].map((wallet) => (
                <button
                  key={wallet}
                  onClick={() => setSelectedWallets(prev => 
                    prev.includes(wallet) ? prev.filter(w => w !== wallet) : [...prev, wallet]
                  )}
                  className={cn(
                    "p-3 rounded-lg border text-left transition-all flex items-center gap-3",
                    selectedWallets.includes(wallet)
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card/30 hover:border-primary/50"
                  )}
                >
                  <Wallet className={cn(
                    "w-4 h-4",
                    selectedWallets.includes(wallet) ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "text-sm",
                    selectedWallets.includes(wallet) ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {wallet}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {selectedWallets.length} wallets selected
            </p>
          </div>

          {/* Amount Per Wallet */}
          <div className="mb-6">
            <label className="block text-xs text-muted-foreground mb-3">
              {">"} AMOUNT PER WALLET (SOL) {"<"}
            </label>
            <Input
              value={amountPerWallet}
              onChange={(e) => setAmountPerWallet(e.target.value)}
              placeholder="0.1"
              className="bg-muted border-border text-primary"
            />
          </div>

          {/* Delay Configuration */}
          <div className="mb-6">
            <label className="block text-xs text-muted-foreground mb-3">
              {">"} DELAY RANGE (MS) {"<"}
            </label>
            <div className="flex items-center gap-4 mb-4">
              <Input
                value={delayMin}
                onChange={(e) => setDelayMin(parseInt(e.target.value) || 0)}
                className="w-24 bg-muted border-border text-center"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                value={delayMax}
                onChange={(e) => setDelayMax(parseInt(e.target.value) || 0)}
                className="w-24 bg-muted border-border text-center"
              />
            </div>
            <Slider
              value={[delayMin, delayMax]}
              onValueChange={([min, max]) => {
                setDelayMin(min);
                setDelayMax(max);
              }}
              min={0}
              max={2000}
              step={10}
              className="w-full"
            />
          </div>

          {/* Anti-Detection Settings */}
          <div className="p-4 rounded-lg border border-border bg-muted/20 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4 text-primary" />
              <span className="text-xs text-foreground font-medium">ANTI-DETECTION</span>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Variable compute units</span>
                <span className="text-primary">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Random fee jitter</span>
                <span className="text-primary">±5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Amount variation</span>
                <span className="text-primary">±2%</span>
              </div>
            </div>
          </div>

          {/* Execute Button */}
          <Button 
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            disabled={selectedWallets.length === 0}
          >
            <Zap className="w-5 h-5" />
            EXECUTE BUNDLE
          </Button>
        </div>
      </div>

      {/* Right: Saved Bundles */}
      <div className="w-96 flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground">SAVED BUNDLES</h2>
          <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary">
            <Plus className="w-3 h-3" />
            New
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {mockBundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-lg border border-border bg-card/30 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-medium text-foreground">{bundle.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {bundle.wallets} wallets • {bundle.amountPerWallet} SOL each
                  </div>
                </div>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full uppercase font-medium",
                  bundle.status === "ready" && "bg-primary/20 text-primary",
                  bundle.status === "running" && "bg-warning/20 text-warning",
                  bundle.status === "completed" && "bg-muted text-muted-foreground"
                )}>
                  {bundle.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 h-7 text-xs border-border gap-1">
                  <Play className="w-3 h-3" />
                  Run
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <Copy className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

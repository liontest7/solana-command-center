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
  Wallet,
  Shield,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
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

const walletOptions = ["Main", "Sniper #1", "Bundle #1", "Bundle #2", "Bundle #3"];

export function BundlesPage() {
  const [selectedWallets, setSelectedWallets] = useState<string[]>(["Main", "Bundle #1"]);
  const [amountPerWallet, setAmountPerWallet] = useState("0.1");
  const [delayMin, setDelayMin] = useState(50);
  const [delayMax, setDelayMax] = useState(150);

  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-background">
      {/* Left: Bundle Config */}
      <div className="flex-1 flex flex-col border-r border-border">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground mb-1.5 flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            Bundle Executor
          </h1>
          <p className="text-sm text-muted-foreground">Execute multi-wallet transactions</p>
        </div>

        <div className="flex-1 overflow-auto p-6 scrollbar-thin space-y-6">
          {/* Wallet Selection */}
          <div>
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3 block">
              Select Wallets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {walletOptions.map((wallet) => (
                <button
                  key={wallet}
                  onClick={() => setSelectedWallets(prev => 
                    prev.includes(wallet) ? prev.filter(w => w !== wallet) : [...prev, wallet]
                  )}
                  className={cn(
                    "p-3.5 rounded-xl border text-left transition-all flex items-center gap-3",
                    selectedWallets.includes(wallet)
                      ? "border-primary/50 bg-primary/8"
                      : "border-border bg-card/30 hover:border-primary/30 card-hover"
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center",
                    selectedWallets.includes(wallet) ? "bg-primary/20" : "bg-muted/50"
                  )}>
                    <Wallet className={cn(
                      "w-4 h-4",
                      selectedWallets.includes(wallet) ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    selectedWallets.includes(wallet) ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {wallet}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {selectedWallets.length} wallets selected
            </p>
          </div>

          {/* Amount Per Wallet */}
          <div>
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3 block">
              Amount Per Wallet (SOL)
            </label>
            <Input
              value={amountPerWallet}
              onChange={(e) => setAmountPerWallet(e.target.value)}
              placeholder="0.1"
              className="bg-muted/50 border-border h-11"
            />
          </div>

          {/* Delay Configuration */}
          <div>
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3 block">
              Delay Range (ms)
            </label>
            <div className="flex items-center gap-3 mb-4">
              <Input
                value={delayMin}
                onChange={(e) => setDelayMin(parseInt(e.target.value) || 0)}
                className="w-24 bg-muted/50 border-border text-center h-10"
              />
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Input
                value={delayMax}
                onChange={(e) => setDelayMax(parseInt(e.target.value) || 0)}
                className="w-24 bg-muted/50 border-border text-center h-10"
              />
              <span className="text-xs text-muted-foreground">ms</span>
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
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-foreground uppercase tracking-wider">Anti-Detection</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Variable compute units</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Random fee jitter (±5%)</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Amount variation (±2%)</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Execute Button */}
          <Button 
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-lg glow-primary-subtle font-semibold"
            disabled={selectedWallets.length === 0}
          >
            <Zap className="w-5 h-5" />
            EXECUTE BUNDLE
          </Button>
        </div>
      </div>

      {/* Right: Saved Bundles */}
      <div className="w-96 flex flex-col bg-card/20">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Saved Bundles</h2>
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-primary h-8">
            <Plus className="w-3.5 h-3.5" />
            New
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-2 scrollbar-thin">
          {mockBundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl border border-border bg-card/30 hover:border-primary/30 transition-all card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">{bundle.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {bundle.wallets} wallets • {bundle.amountPerWallet} SOL each
                  </div>
                </div>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full uppercase font-semibold",
                  bundle.status === "ready" && "bg-primary/15 text-primary",
                  bundle.status === "running" && "bg-warning/15 text-warning",
                  bundle.status === "completed" && "bg-muted text-muted-foreground"
                )}>
                  {bundle.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 h-8 text-xs border-border gap-1.5">
                  <Play className="w-3 h-3" />
                  Run
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Copy className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
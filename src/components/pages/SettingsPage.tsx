import { useState } from "react";
import { 
  Settings, 
  Zap, 
  Globe, 
  Bell, 
  Palette,
  Save,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface SettingSection {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}

const sections: SettingSection[] = [
  { id: "rpc", icon: Globe, title: "RPC Configuration" },
  { id: "trading", icon: Zap, title: "Trading Defaults" },
  { id: "notifications", icon: Bell, title: "Notifications" },
  { id: "appearance", icon: Palette, title: "Appearance" },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("rpc");
  const [rpcEndpoint, setRpcEndpoint] = useState("https://api.mainnet-beta.solana.com");
  const [defaultSlippage, setDefaultSlippage] = useState("1");
  const [priorityFee, setPriorityFee] = useState("0.0001");

  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border p-4">
        <h1 className="text-sm font-bold text-foreground mb-6 px-3 tracking-wide">SETTINGS</h1>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                activeSection === section.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <section.icon className="w-4 h-4" />
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-2xl">
          {activeSection === "rpc" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">RPC Configuration</h2>
                <p className="text-sm text-muted-foreground">Configure your Solana RPC endpoints</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">Primary RPC Endpoint</label>
                  <Input
                    value={rpcEndpoint}
                    onChange={(e) => setRpcEndpoint(e.target.value)}
                    placeholder="https://..."
                    className="bg-muted border-border font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-2">Backup RPC Endpoint</label>
                  <Input
                    placeholder="https://..."
                    className="bg-muted border-border font-mono text-sm"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">Use Jito Block Engine</div>
                    <div className="text-xs text-muted-foreground">For MEV protection & fast execution</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">Auto-failover</div>
                    <div className="text-xs text-muted-foreground">Switch to backup if primary fails</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          )}

          {activeSection === "trading" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">Trading Defaults</h2>
                <p className="text-sm text-muted-foreground">Set your default trading parameters</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">Default Slippage (%)</label>
                    <Input
                      value={defaultSlippage}
                      onChange={(e) => setDefaultSlippage(e.target.value)}
                      className="bg-muted border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">Priority Fee (SOL)</label>
                    <Input
                      value={priorityFee}
                      onChange={(e) => setPriorityFee(e.target.value)}
                      className="bg-muted border-border"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">Simulation Before Send</div>
                    <div className="text-xs text-muted-foreground">Simulate transactions before broadcasting</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">Auto-retry on Failure</div>
                    <div className="text-xs text-muted-foreground">Retry failed transactions up to 3 times</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">Confirm Large Trades</div>
                    <div className="text-xs text-muted-foreground">Require confirmation for trades &gt; 1 SOL</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">Notifications</h2>
                <p className="text-sm text-muted-foreground">Configure alerts and notifications</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">Transaction Success</div>
                    <div className="text-xs text-muted-foreground">Notify on successful transactions</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">Transaction Failed</div>
                    <div className="text-xs text-muted-foreground">Notify on failed transactions</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">Price Alerts</div>
                    <div className="text-xs text-muted-foreground">Notify on price movements</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">Sound Effects</div>
                    <div className="text-xs text-muted-foreground">Play sound on events</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">Appearance</h2>
                <p className="text-sm text-muted-foreground">Customize the look and feel</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">Compact Mode</div>
                    <div className="text-xs text-muted-foreground">Reduce spacing for more data</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">Show Animations</div>
                    <div className="text-xs text-muted-foreground">Enable UI animations</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">Show Tooltips</div>
                    <div className="text-xs text-muted-foreground">Display helpful tooltips</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          )}

          {/* Save Actions */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            <Button variant="outline" className="gap-2 border-border">
              <RotateCcw className="w-4 h-4" />
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

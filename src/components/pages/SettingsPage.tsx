import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Zap, 
  Globe, 
  Bell, 
  Palette,
  Save,
  RotateCcw,
  Check
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
      <div className="w-64 border-r border-border p-5">
        <div className="flex items-center gap-2 mb-6 px-3">
          <Settings className="w-5 h-5 text-primary" />
          <h1 className="text-sm font-bold text-foreground uppercase tracking-wider">Settings</h1>
        </div>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                activeSection === section.id
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <section.icon className={cn(
                "w-4 h-4",
                activeSection === section.id && "text-primary"
              )} />
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 scrollbar-thin">
        <div className="max-w-2xl">
          {activeSection === "rpc" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">RPC Configuration</h2>
                <p className="text-sm text-muted-foreground">Configure your Solana RPC endpoints</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">Primary RPC Endpoint</label>
                  <Input
                    value={rpcEndpoint}
                    onChange={(e) => setRpcEndpoint(e.target.value)}
                    placeholder="https://..."
                    className="bg-muted/50 border-border font-mono text-sm h-11"
                  />
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">Backup RPC Endpoint</label>
                  <Input
                    placeholder="https://..."
                    className="bg-muted/50 border-border font-mono text-sm h-11"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/30 card-hover">
                  <div>
                    <div className="text-sm font-medium text-foreground">Use Jito Block Engine</div>
                    <div className="text-xs text-muted-foreground mt-0.5">For MEV protection & fast execution</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/30 card-hover">
                  <div>
                    <div className="text-sm font-medium text-foreground">Auto-failover</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Switch to backup if primary fails</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "trading" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">Trading Defaults</h2>
                <p className="text-sm text-muted-foreground">Set your default trading parameters</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">Default Slippage (%)</label>
                    <Input
                      value={defaultSlippage}
                      onChange={(e) => setDefaultSlippage(e.target.value)}
                      className="bg-muted/50 border-border h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">Priority Fee (SOL)</label>
                    <Input
                      value={priorityFee}
                      onChange={(e) => setPriorityFee(e.target.value)}
                      className="bg-muted/50 border-border h-11"
                    />
                  </div>
                </div>

                {[
                  { title: "Simulation Before Send", desc: "Simulate transactions before broadcasting", checked: true },
                  { title: "Auto-retry on Failure", desc: "Retry failed transactions up to 3 times", checked: true },
                  { title: "Confirm Large Trades", desc: "Require confirmation for trades > 1 SOL", checked: true },
                ].map((setting) => (
                  <div key={setting.title} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/30 card-hover">
                    <div>
                      <div className="text-sm font-medium text-foreground">{setting.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{setting.desc}</div>
                    </div>
                    <Switch defaultChecked={setting.checked} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "notifications" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">Notifications</h2>
                <p className="text-sm text-muted-foreground">Configure alerts and notifications</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Transaction Success", desc: "Notify on successful transactions", checked: true },
                  { title: "Transaction Failed", desc: "Notify on failed transactions", checked: true },
                  { title: "Price Alerts", desc: "Notify on price movements", checked: false },
                  { title: "Sound Effects", desc: "Play sound on events", checked: false },
                ].map((setting) => (
                  <div key={setting.title} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/30 card-hover">
                    <div>
                      <div className="text-sm font-medium text-foreground">{setting.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{setting.desc}</div>
                    </div>
                    <Switch defaultChecked={setting.checked} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "appearance" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">Appearance</h2>
                <p className="text-sm text-muted-foreground">Customize the look and feel</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Compact Mode", desc: "Reduce spacing for more data", checked: false },
                  { title: "Show Animations", desc: "Enable UI animations", checked: true },
                  { title: "Show Tooltips", desc: "Display helpful tooltips", checked: true },
                ].map((setting) => (
                  <div key={setting.title} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/30 card-hover">
                    <div>
                      <div className="text-sm font-medium text-foreground">{setting.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{setting.desc}</div>
                    </div>
                    <Switch defaultChecked={setting.checked} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Save Actions */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
            <Button className="gap-2 h-10 shadow-lg glow-primary-subtle">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            <Button variant="outline" className="gap-2 border-border h-10">
              <RotateCcw className="w-4 h-4" />
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { motion } from "framer-motion";
import { 
  Shield, 
  Key, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Download,
  FileKey,
  Fingerprint
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SecurityCheck {
  id: string;
  name: string;
  description: string;
  status: "pass" | "warning" | "fail";
}

const securityChecks: SecurityCheck[] = [
  { id: "1", name: "Vault Encryption", description: "AES-256 encryption active", status: "pass" },
  { id: "2", name: "Key Isolation", description: "Keys stored in secure vault", status: "pass" },
  { id: "3", name: "Session Lock", description: "Auto-lock after 15 minutes", status: "pass" },
  { id: "4", name: "RPC Connection", description: "Using private RPC endpoint", status: "pass" },
  { id: "5", name: "Backup Status", description: "Last backup: 2 days ago", status: "warning" },
];

export function SecurityPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1.5 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security Center
            </h1>
            <p className="text-sm text-muted-foreground">Manage vault, keys, and security settings</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-border h-9">
              <Download className="w-4 h-4" />
              Export Backup
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Vault Status */}
          <div className="p-6 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <div>
                <div className="text-base font-semibold text-foreground">Vault Status</div>
                <div className="flex items-center gap-2 text-xs text-primary mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary status-pulse" />
                  SECURED & ENCRYPTED
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Wallets", value: "5" },
                { label: "Encryption", value: "AES-256", highlight: true },
                { label: "Key Derivation", value: "Argon2" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-background/60 backdrop-blur-sm text-center">
                  <div className={cn(
                    "text-lg font-bold",
                    stat.highlight ? "text-primary" : "text-foreground"
                  )}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Checks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Security Checks</h2>
              <Button variant="ghost" size="sm" className="gap-2 text-xs text-muted-foreground h-8">
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </Button>
            </div>

            <div className="space-y-2">
              {securityChecks.map((check, index) => (
                <motion.div
                  key={check.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="p-4 rounded-xl border border-border bg-card/30 flex items-center gap-4 card-hover"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    check.status === "pass" && "bg-primary/15",
                    check.status === "warning" && "bg-warning/15",
                    check.status === "fail" && "bg-destructive/15"
                  )}>
                    {check.status === "pass" && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    {check.status === "warning" && <AlertTriangle className="w-5 h-5 text-warning" />}
                    {check.status === "fail" && <AlertTriangle className="w-5 h-5 text-destructive" />}
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{check.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{check.description}</div>
                  </div>

                  <span className={cn(
                    "text-[10px] px-2.5 py-1 rounded-full uppercase font-semibold",
                    check.status === "pass" && "bg-primary/15 text-primary",
                    check.status === "warning" && "bg-warning/15 text-warning",
                    check.status === "fail" && "bg-destructive/15 text-destructive"
                  )}>
                    {check.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Change Vault Password */}
          <div>
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Change Vault Password</h2>
            <div className="p-6 rounded-2xl border border-border bg-card/30">
              <div className="grid gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="pl-10 pr-10 bg-muted/50 border-border h-11"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">New Password</label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="pl-10 bg-muted/50 border-border h-11"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">Confirm New Password</label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="pl-10 bg-muted/50 border-border h-11"
                    />
                  </div>
                </div>
                <Button className="w-full h-11 mt-2 font-medium">Update Password</Button>
              </div>
            </div>
          </div>

          {/* Recovery */}
          <div>
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Recovery Options</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-5 rounded-2xl border border-border bg-card/30 text-left hover:border-primary/40 transition-all card-hover group">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <FileKey className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm font-semibold text-foreground">Export Keys</div>
                <div className="text-xs text-muted-foreground mt-1">Encrypted key backup</div>
              </button>
              <button className="p-5 rounded-2xl border border-border bg-card/30 text-left hover:border-primary/40 transition-all card-hover group">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Download className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm font-semibold text-foreground">Full Backup</div>
                <div className="text-xs text-muted-foreground mt-1">Wallets + settings</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
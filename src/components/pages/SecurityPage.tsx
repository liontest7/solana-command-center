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
  FileKey
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
  const [vaultPassword, setVaultPassword] = useState("");

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1 tracking-wide">SECURITY CENTER</h1>
            <p className="text-sm text-muted-foreground">Manage vault, keys, and security settings</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-border">
              <Download className="w-4 h-4" />
              Export Backup
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Vault Status */}
          <div className="mb-8">
            <div className="p-6 rounded-xl border border-primary/30 bg-primary/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">VAULT STATUS</div>
                  <div className="flex items-center gap-2 text-xs text-primary mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    SECURED & ENCRYPTED
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-background/50">
                  <div className="text-lg font-bold text-foreground">5</div>
                  <div className="text-[10px] text-muted-foreground uppercase">WALLETS</div>
                </div>
                <div className="p-3 rounded-lg bg-background/50">
                  <div className="text-lg font-bold text-primary">AES-256</div>
                  <div className="text-[10px] text-muted-foreground uppercase">ENCRYPTION</div>
                </div>
                <div className="p-3 rounded-lg bg-background/50">
                  <div className="text-lg font-bold text-foreground">Argon2</div>
                  <div className="text-[10px] text-muted-foreground uppercase">KEY DERIVATION</div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Checks */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-foreground">SECURITY CHECKS</h2>
              <Button variant="ghost" size="sm" className="gap-2 text-xs text-muted-foreground">
                <RefreshCw className="w-3 h-3" />
                Refresh
              </Button>
            </div>

            <div className="space-y-2">
              {securityChecks.map((check, index) => (
                <motion.div
                  key={check.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-lg border border-border bg-card/30 flex items-center gap-4"
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    check.status === "pass" && "bg-primary/10",
                    check.status === "warning" && "bg-warning/10",
                    check.status === "fail" && "bg-destructive/10"
                  )}>
                    {check.status === "pass" && <CheckCircle2 className="w-4 h-4 text-primary" />}
                    {check.status === "warning" && <AlertTriangle className="w-4 h-4 text-warning" />}
                    {check.status === "fail" && <AlertTriangle className="w-4 h-4 text-destructive" />}
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{check.name}</div>
                    <div className="text-xs text-muted-foreground">{check.description}</div>
                  </div>

                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full uppercase font-medium",
                    check.status === "pass" && "bg-primary/20 text-primary",
                    check.status === "warning" && "bg-warning/20 text-warning",
                    check.status === "fail" && "bg-destructive/20 text-destructive"
                  )}>
                    {check.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Change Vault Password */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-foreground mb-4">CHANGE VAULT PASSWORD</h2>
            <div className="p-6 rounded-xl border border-border bg-card/30">
              <div className="grid gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="pl-10 pr-10 bg-muted border-border"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">New Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="pl-10 bg-muted border-border"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="pl-10 bg-muted border-border"
                    />
                  </div>
                </div>
                <Button className="w-full mt-2">Update Password</Button>
              </div>
            </div>
          </div>

          {/* Recovery */}
          <div>
            <h2 className="text-sm font-medium text-foreground mb-4">RECOVERY OPTIONS</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-xl border border-border bg-card/30 text-left hover:border-primary/50 transition-colors">
                <FileKey className="w-5 h-5 text-primary mb-3" />
                <div className="text-sm font-medium text-foreground">Export Keys</div>
                <div className="text-xs text-muted-foreground mt-1">Encrypted key backup</div>
              </button>
              <button className="p-4 rounded-xl border border-border bg-card/30 text-left hover:border-primary/50 transition-colors">
                <Download className="w-5 h-5 text-primary mb-3" />
                <div className="text-sm font-medium text-foreground">Full Backup</div>
                <div className="text-xs text-muted-foreground mt-1">Wallets + settings</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

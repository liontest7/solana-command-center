import { useState } from "react";
import { motion } from "framer-motion";
import { 
  RefreshCw, 
  Wallet, 
  Activity, 
  Briefcase, 
  Rocket, 
  Settings, 
  BarChart3,
  Layers,
  Shield,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { icon: BarChart3, label: "Trading", id: "trading" },
  { icon: Wallet, label: "Wallets", id: "wallets" },
  { icon: Activity, label: "Monitor", id: "monitor" },
  { icon: Briefcase, label: "Holdings", id: "holdings" },
  { icon: Rocket, label: "Deploy", id: "deploy" },
  { icon: Layers, label: "Bundles", id: "bundles" },
  { icon: Shield, label: "Security", id: "security" },
  { icon: Settings, label: "Settings", id: "settings" },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-14 h-screen bg-sidebar border-r border-sidebar-border flex flex-col items-center py-3 gap-1">
      {/* Logo */}
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
        <Zap className="w-5 h-5 text-primary" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg border border-primary/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <item.icon className="w-5 h-5 relative z-10" />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Refresh button */}
      <button className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
        <RefreshCw className="w-4 h-4" />
      </button>
    </aside>
  );
}

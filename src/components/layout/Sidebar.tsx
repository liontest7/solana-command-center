import { motion } from "framer-motion";
import { 
  Wallet, 
  Activity, 
  Briefcase, 
  Rocket, 
  Settings, 
  BarChart3,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  id: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: BarChart3, label: "Trading", id: "trading" },
  { icon: Wallet, label: "Wallets", id: "wallets" },
  { icon: Activity, label: "Monitor", id: "monitor" },
  { icon: Briefcase, label: "Holdings", id: "holdings" },
  { icon: Rocket, label: "Deploy", id: "deploy" },
  { icon: Shield, label: "Security", id: "security" },
  { icon: Settings, label: "Settings", id: "settings" },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside 
        className={cn(
          "h-screen bg-sidebar border-r border-sidebar-border flex flex-col py-4 transition-all duration-300 relative",
          isExpanded ? "w-48" : "w-16"
        )}
        initial={false}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center gap-3 mb-6 transition-all duration-300",
          isExpanded ? "px-4" : "px-3 justify-center"
        )}>
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/25 glow-primary-subtle">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          {isExpanded && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-bold text-foreground tracking-wide"
            >
              FURY
            </motion.span>
          )}
        </div>

        {/* Navigation */}
        <nav className={cn(
          "flex-1 flex flex-col gap-1",
          isExpanded ? "px-2" : "px-3"
        )}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            
            const button = (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "relative flex items-center gap-3 rounded-lg transition-all duration-200 group",
                  isExpanded ? "px-3 py-2.5 w-full" : "w-10 h-10 justify-center",
                  isActive
                    ? "bg-primary/12 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg border border-primary/30 bg-primary/8"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <item.icon className={cn(
                  "w-[18px] h-[18px] relative z-10 transition-transform",
                  isActive && "scale-110"
                )} />
                
                {isExpanded && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-medium relative z-10"
                  >
                    {item.label}
                  </motion.span>
                )}

                {item.badge && isExpanded && (
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                    {item.badge}
                  </span>
                )}
              </button>
            );

            if (!isExpanded) {
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    {button}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-popover border-border">
                    <p className="text-xs">{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return button;
          })}
        </nav>

        {/* Expand/Collapse Toggle */}
        <div className={cn(
          "pt-4 border-t border-sidebar-border",
          isExpanded ? "px-4" : "px-3"
        )}>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "w-full flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
              isExpanded ? "py-2" : "w-10 h-10"
            )}
          >
            {isExpanded ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
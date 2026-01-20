import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { TradingChart } from "@/components/trading/TradingChart";
import { TradingPanel } from "@/components/trading/TradingPanel";
import { TokenInfo } from "@/components/trading/TokenInfo";
import { WalletPanel } from "@/components/trading/WalletPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { GripVertical, GripHorizontal } from "lucide-react";

export function TradingPage() {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      <Header />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Wallet Panel - Left Side */}
        <ResizablePanel
          defaultSize={18}
          minSize={14}
          maxSize={28}
          collapsible
          collapsedSize={0}
          onCollapse={() => setLeftPanelCollapsed(true)}
          onExpand={() => setLeftPanelCollapsed(false)}
          className="transition-all duration-200"
        >
          <WalletPanel />
        </ResizablePanel>
        
        <ResizableHandle withHandle className="w-1.5 bg-border/50 hover:bg-primary/30 transition-colors group">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center">
            <GripVertical className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary transition-colors" />
          </div>
        </ResizableHandle>

        {/* Main Chart + Token Info */}
        <ResizablePanel defaultSize={52} minSize={35}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={65} minSize={40}>
              <TradingChart />
            </ResizablePanel>
            
            <ResizableHandle withHandle className="h-1.5 bg-border/50 hover:bg-primary/30 transition-colors group">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
                <GripHorizontal className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary transition-colors" />
              </div>
            </ResizableHandle>
            
            <ResizablePanel defaultSize={35} minSize={20} maxSize={50}>
              <TokenInfo />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle withHandle className="w-1.5 bg-border/50 hover:bg-primary/30 transition-colors group">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center">
            <GripVertical className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary transition-colors" />
          </div>
        </ResizableHandle>

        {/* Trading Panel - Right Side */}
        <ResizablePanel
          defaultSize={22}
          minSize={18}
          maxSize={32}
          collapsible
          collapsedSize={0}
          onCollapse={() => setRightPanelCollapsed(true)}
          onExpand={() => setRightPanelCollapsed(false)}
          className="transition-all duration-200"
        >
          <TradingPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
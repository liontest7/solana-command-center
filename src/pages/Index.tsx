import { useState } from "react";
import { AppProvider } from "@/context/AppContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { TradingPage } from "@/components/pages/TradingPage";
import { WalletsPage } from "@/components/pages/WalletsPage";
import { DeployPage } from "@/components/pages/DeployPage";
import { HoldingsPage } from "@/components/pages/HoldingsPage";
import { MonitorPage } from "@/components/pages/MonitorPage";
import { SecurityPage } from "@/components/pages/SecurityPage";
import { SettingsPage } from "@/components/pages/SettingsPage";

const Index = () => {
  const [activeTab, setActiveTab] = useState("trading");

  const renderPage = () => {
    switch (activeTab) {
      case "trading":
        return <TradingPage />;
      case "wallets":
        return <WalletsPage />;
      case "monitor":
        return <MonitorPage />;
      case "holdings":
        return <HoldingsPage />;
      case "deploy":
        return <DeployPage />;
      case "security":
        return <SecurityPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <TradingPage />;
    }
  };

  return (
    <AppProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        {renderPage()}
      </div>
    </AppProvider>
  );
};

export default Index;

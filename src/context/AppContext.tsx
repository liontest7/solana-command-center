import React, { createContext, useContext, useState, useCallback } from "react";
import type { Wallet, Token, AppSettings, TradingSettings } from "@/types";

// Default settings
const defaultTradingSettings: TradingSettings = {
  slippage: 1,
  priorityFee: 0.0001,
  computeUnits: 200000,
  jitoTip: "auto",
};

const defaultSettings: AppSettings = {
  rpcEndpoint: "mainnet",
  customRpc: "",
  trading: defaultTradingSettings,
  notifications: {
    trades: true,
    priceAlerts: true,
    transactions: true,
  },
  appearance: {
    compactMode: false,
    animations: true,
  },
};

// Mock data
const mockWallets: Wallet[] = [
  { id: "1", address: "7Kx3...Mnpq", name: "Main Wallet", balance: "12.5", group: "Trading", status: "active" },
  { id: "2", address: "4Hg2...EzQr", name: "Sniper #1", balance: "5.2", group: "Sniping", status: "active" },
  { id: "3", address: "9Lp8...Wzst", name: "Bundle #1", balance: "2.1", group: "Bundler", status: "active" },
  { id: "4", address: "2Qr5...Xyza", name: "Bundle #2", balance: "1.8", group: "Bundler", status: "paused" },
  { id: "5", address: "5Nv9...Cdef", name: "Cold Storage", balance: "50.0", group: "Storage", status: "paused" },
];

const mockCurrentToken: Token = {
  address: "PFP...xyz123",
  symbol: "PFP",
  name: "Penny Flying Pig",
  price: 0.00004035,
  priceChange24h: 5.24,
  volume24h: "125.4K",
  marketCap: "64.0K",
};

interface AppContextType {
  // Wallets
  wallets: Wallet[];
  selectedWalletId: string | null;
  setSelectedWalletId: (id: string | null) => void;
  
  // Current Token
  currentToken: Token | null;
  setCurrentToken: (token: Token | null) => void;
  
  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  updateTradingSettings: (settings: Partial<TradingSettings>) => void;
  
  // Trading state
  tradeMode: "buy" | "sell";
  setTradeMode: (mode: "buy" | "sell") => void;
  tradeAmount: string;
  setTradeAmount: (amount: string) => void;
  
  // Connection
  isConnected: boolean;
  
  // Computed values
  totalBalance: number;
  activeWalletsCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Wallets state
  const [wallets] = useState<Wallet[]>(mockWallets);
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>("1");
  
  // Token state
  const [currentToken, setCurrentToken] = useState<Token | null>(mockCurrentToken);
  
  // Settings
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  
  // Trading state
  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy");
  const [tradeAmount, setTradeAmount] = useState("0.1");
  
  // Connection
  const isConnected = true;
  
  // Update functions
  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);
  
  const updateTradingSettings = useCallback((newSettings: Partial<TradingSettings>) => {
    setSettings(prev => ({
      ...prev,
      trading: { ...prev.trading, ...newSettings }
    }));
  }, []);
  
  // Computed values
  const totalBalance = wallets.reduce((acc, w) => acc + parseFloat(w.balance), 0);
  const activeWalletsCount = wallets.filter(w => w.status === "active").length;
  
  const value: AppContextType = {
    wallets,
    selectedWalletId,
    setSelectedWalletId,
    currentToken,
    setCurrentToken,
    settings,
    updateSettings,
    updateTradingSettings,
    tradeMode,
    setTradeMode,
    tradeAmount,
    setTradeAmount,
    isConnected,
    totalBalance,
    activeWalletsCount,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
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

// Mock data - more wallets for demo
const mockWallets: Wallet[] = [
  { id: "1", address: "7R75...c5pH", name: "Main", balance: "0.775", group: "Trading", status: "active" },
  { id: "2", address: "7MCG...XALp", name: "Snipe 1", balance: "0.680", group: "Sniping", status: "active" },
  { id: "3", address: "6ndK...DcN3", name: "Bundle 1", balance: "0.000", group: "Bundler", status: "active" },
  { id: "4", address: "Fqmo...GU4W", name: "Bundle 2", balance: "0.000", group: "Bundler", status: "active" },
  { id: "5", address: "3AUy...VehT", name: "Bundle 3", balance: "0.000", group: "Bundler", status: "active" },
  { id: "6", address: "BYpH...iFoq", name: "Bundle 4", balance: "0.000", group: "Bundler", status: "active" },
  { id: "7", address: "BNX8...xGQy", name: "Bundle 5", balance: "0.000", group: "Bundler", status: "active" },
  { id: "8", address: "HnyW...xBie", name: "Snipe 2", balance: "0.327", group: "Sniping", status: "active" },
  { id: "9", address: "4AEh...7WwZ", name: "Trade 2", balance: "0.543", group: "Trading", status: "active" },
  { id: "10", address: "EvPV...cYja", name: "Trade 3", balance: "0.419", group: "Trading", status: "active" },
  { id: "11", address: "FeUb...d7PU", name: "Trade 4", balance: "0.512", group: "Trading", status: "active" },
  { id: "12", address: "2jd8...CqeU", name: "Snipe 3", balance: "0.338", group: "Sniping", status: "active" },
  { id: "13", address: "Drmq...eXSg", name: "Storage", balance: "0.163", group: "Storage", status: "paused" },
  { id: "14", address: "BZMi...jZEV", name: "Cold", balance: "0.651", group: "Storage", status: "paused" },
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
  selectedWalletIds: string[];
  toggleWalletSelection: (id: string) => void;
  selectAllWallets: () => void;
  clearWalletSelection: () => void;
  
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
  selectedBalance: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Wallets state
  const [wallets] = useState<Wallet[]>(mockWallets);
  const [selectedWalletIds, setSelectedWalletIds] = useState<string[]>(["1"]);
  
  // Token state
  const [currentToken, setCurrentToken] = useState<Token | null>(mockCurrentToken);
  
  // Settings
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  
  // Trading state
  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy");
  const [tradeAmount, setTradeAmount] = useState("0.1");
  
  // Connection
  const isConnected = true;
  
  // Wallet selection functions
  const toggleWalletSelection = useCallback((id: string) => {
    setSelectedWalletIds(prev => 
      prev.includes(id) 
        ? prev.filter(wId => wId !== id)
        : [...prev, id]
    );
  }, []);

  const selectAllWallets = useCallback(() => {
    const activeIds = wallets.filter(w => w.status === "active").map(w => w.id);
    setSelectedWalletIds(activeIds);
  }, [wallets]);

  const clearWalletSelection = useCallback(() => {
    setSelectedWalletIds([]);
  }, []);
  
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
  const totalBalance = useMemo(() => 
    wallets.reduce((acc, w) => acc + parseFloat(w.balance), 0),
    [wallets]
  );
  
  const activeWalletsCount = useMemo(() => 
    wallets.filter(w => w.status === "active").length,
    [wallets]
  );

  const selectedBalance = useMemo(() => 
    wallets
      .filter(w => selectedWalletIds.includes(w.id))
      .reduce((acc, w) => acc + parseFloat(w.balance), 0),
    [wallets, selectedWalletIds]
  );
  
  const value: AppContextType = {
    wallets,
    selectedWalletIds,
    toggleWalletSelection,
    selectAllWallets,
    clearWalletSelection,
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
    selectedBalance,
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

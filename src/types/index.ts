// Wallet Types
export interface Wallet {
  id: string;
  address: string;
  name: string;
  balance: string;
  group: WalletGroup;
  status: "active" | "paused";
}

export type WalletGroup = "Trading" | "Sniping" | "Bundler" | "Storage";

// Token Types
export interface Token {
  address: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  volume24h: string;
  marketCap: string;
  logoUrl?: string;
}

// Trade Types
export interface Trade {
  id: string;
  time: string;
  type: "buy" | "sell";
  marketcap: string;
  amount: string;
  totalSol: string;
  trader: string;
  token?: Token;
}

// Transaction Types
export interface Transaction {
  id: string;
  type: "buy" | "sell" | "transfer" | "deploy";
  token: string;
  amount: string;
  status: "success" | "pending" | "failed";
  time: string;
  hash?: string;
  wallet?: string;
}

// Holding Types
export interface Holding {
  id: string;
  token: Token;
  balance: string;
  value: string;
  pnl: string;
  pnlPercent: number;
  walletId: string;
}

// Bundle Types
export interface Bundle {
  id: string;
  name: string;
  wallets: string[];
  amountPerWallet: string;
  delayMin: number;
  delayMax: number;
  status: "ready" | "running" | "completed";
  antiDetection: boolean;
}

// Settings Types
export interface TradingSettings {
  slippage: number;
  priorityFee: number;
  computeUnits: number;
  jitoTip: "auto" | "manual";
  jitoTipAmount?: number;
}

export interface AppSettings {
  rpcEndpoint: string;
  customRpc: string;
  trading: TradingSettings;
  notifications: {
    trades: boolean;
    priceAlerts: boolean;
    transactions: boolean;
  };
  appearance: {
    compactMode: boolean;
    animations: boolean;
  };
}

// Chart Types
export interface OHLC {
  open: number;
  high: number;
  low: number;
  close: number;
}

export type Timeframe = "1s" | "1m" | "5m" | "15m" | "1h" | "4h" | "1d";

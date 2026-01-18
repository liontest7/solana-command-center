import { useCallback } from "react";

export function useFormatters() {
  const formatPrice = useCallback((price: number): string => {
    if (price < 0.0001) {
      return price.toFixed(10).replace(/\.?0+$/, "");
    }
    if (price < 1) {
      return price.toFixed(6);
    }
    if (price < 1000) {
      return price.toFixed(2);
    }
    return price.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }, []);

  const formatSol = useCallback((amount: number | string): string => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(num)) return "0.00";
    return num.toFixed(num < 1 ? 4 : 2);
  }, []);

  const formatPercent = useCallback((percent: number): string => {
    const sign = percent >= 0 ? "+" : "";
    return `${sign}${percent.toFixed(2)}%`;
  }, []);

  const formatNumber = useCallback((num: number | string): string => {
    const n = typeof num === "string" ? parseFloat(num) : num;
    if (isNaN(n)) return "0";
    
    if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
    return n.toFixed(2);
  }, []);

  const formatAddress = useCallback((address: string, length: number = 4): string => {
    if (address.length <= length * 2 + 3) return address;
    return `${address.slice(0, length)}...${address.slice(-length)}`;
  }, []);

  const formatTime = useCallback((timestamp: Date | string): string => {
    const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    return date.toLocaleTimeString("en-US", { 
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }, []);

  return {
    formatPrice,
    formatSol,
    formatPercent,
    formatNumber,
    formatAddress,
    formatTime,
  };
}

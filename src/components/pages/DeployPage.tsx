import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Twitter, Send, Globe, Check, Rocket, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Token Details" },
  { id: 2, label: "Select Wallets" },
  { id: 3, label: "Review & Deploy" },
];

const platforms = [
  { id: "pump", name: "PUMP.FUN", desc: "Fast deployment with bonding curve", icon: "◆" },
  { id: "bonk", name: "BONK.FUN", desc: "Advanced bot integration", icon: "🔥" },
  { id: "meteora", name: "METEORA", desc: "Dynamic bonding curve", icon: "◇" },
];

const deploymentModes = [
  { id: "simple", name: "Simple", desc: "Up to 5 wallets", icon: "⚡" },
  { id: "advanced", name: "Advanced", desc: "Up to 20 wallets", icon: "🚀" },
];

export function DeployPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState("pump");
  const [deploymentMode, setDeploymentMode] = useState("simple");
  const [tokenData, setTokenData] = useState({
    name: "",
    symbol: "",
    description: "",
    twitter: "",
    telegram: "",
    website: "",
  });

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      <div className="flex-1 overflow-auto p-8 scrollbar-thin">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-foreground mb-1.5 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              Token Deployment
            </h1>
            <p className="text-sm text-muted-foreground">
              Deploy your token on Pump.fun, Bonk.fun, or Meteora
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-10 max-w-md">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold transition-all",
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className={cn(
                    "text-xs mt-2 font-medium",
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-16 h-0.5 mx-3 rounded-full",
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="space-y-8">
            {/* Token Details Card */}
            <div className="p-6 rounded-2xl border border-border bg-card/30">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Info className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">Token Details</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">
                    Name *
                  </label>
                  <Input
                    value={tokenData.name}
                    onChange={(e) => setTokenData({ ...tokenData, name: e.target.value })}
                    placeholder="My Token"
                    className="bg-muted/50 border-border h-11"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">
                    Symbol *
                  </label>
                  <Input
                    value={tokenData.symbol}
                    onChange={(e) => setTokenData({ ...tokenData, symbol: e.target.value.toUpperCase() })}
                    placeholder="MTK"
                    className="bg-muted/50 border-border h-11 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">
                    Logo *
                  </label>
                  <Button variant="outline" className="w-full h-11 border-border text-muted-foreground gap-2 hover:text-foreground">
                    <Upload className="w-4 h-4" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">
                  Description
                </label>
                <Textarea
                  value={tokenData.description}
                  onChange={(e) => setTokenData({ ...tokenData, description: e.target.value })}
                  placeholder="Describe your token..."
                  className="bg-muted/50 border-border min-h-[100px] resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">
                    Twitter
                  </label>
                  <div className="relative">
                    <Twitter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={tokenData.twitter}
                      onChange={(e) => setTokenData({ ...tokenData, twitter: e.target.value })}
                      placeholder="https://x.com/..."
                      className="pl-10 bg-muted/50 border-border h-11"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">
                    Telegram
                  </label>
                  <div className="relative">
                    <Send className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={tokenData.telegram}
                      onChange={(e) => setTokenData({ ...tokenData, telegram: e.target.value })}
                      placeholder="https://t.me/..."
                      className="pl-10 bg-muted/50 border-border h-11"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2.5 uppercase tracking-wider">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={tokenData.website}
                      onChange={(e) => setTokenData({ ...tokenData, website: e.target.value })}
                      placeholder="https://..."
                      className="pl-10 bg-muted/50 border-border h-11"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">
                Platform *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all card-hover",
                      selectedPlatform === platform.id
                        ? "border-primary/50 bg-primary/8"
                        : "border-border bg-card/30 hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{platform.icon}</span>
                      <span className={cn(
                        "text-sm font-semibold",
                        selectedPlatform === platform.id ? "text-primary" : "text-foreground"
                      )}>
                        {platform.name}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{platform.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Deployment Mode */}
            <div>
              <label className="block text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">
                Deployment Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                {deploymentModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setDeploymentMode(mode.id)}
                    className={cn(
                      "p-5 rounded-xl border text-center transition-all",
                      deploymentMode === mode.id
                        ? "border-primary bg-primary text-primary-foreground shadow-lg"
                        : "border-border bg-card/30 hover:border-primary/30 card-hover"
                    )}
                  >
                    <div className="text-2xl mb-2">{mode.icon}</div>
                    <div className="text-sm font-semibold mb-1">{mode.name}</div>
                    <div className={cn(
                      "text-xs",
                      deploymentMode === mode.id ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      {mode.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" className="border-border h-10">
                Cancel
              </Button>
              <Button className="h-10 shadow-lg glow-primary-subtle font-medium">
                Next Step
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Info, Twitter, Send, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Platform & Token" },
  { id: 2, label: "Select Wallets" },
  { id: 3, label: "Review" },
];

const platforms = [
  { id: "pump", name: "PUMP.FUN", desc: "Fast deployment with bonding curve", icon: "◆" },
  { id: "bonk", name: "BONK.FUN", desc: "Advanced bot integration", icon: "🔥" },
  { id: "meteora", name: "METEORA", desc: "Dynamic bonding curve", icon: "◇" },
];

const deploymentModes = [
  { id: "simple", name: "SIMPLE", desc: "Up to 5 wallets" },
  { id: "advanced", name: "ADVANCED", desc: "Up to 20 wallets" },
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
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-foreground mb-2 tracking-wide">TOKEN DEPLOYMENT</h1>
            <p className="text-sm text-muted-foreground">
              Deploy your token on Pump.fun, Bonk.fun, or Meteora
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-10 max-w-xl">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className={cn(
                    "text-xs mt-2",
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-24 h-px mx-4",
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="space-y-8">
            {/* Token Details */}
            <div className="p-6 rounded-xl border border-border bg-card/30">
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{">"}</span>
                <span className="text-sm font-medium text-primary">TOKEN DETAILS</span>
                <span className="text-sm text-muted-foreground">{"<"}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">
                    {">"} NAME * {"<"}
                  </label>
                  <Input
                    value={tokenData.name}
                    onChange={(e) => setTokenData({ ...tokenData, name: e.target.value })}
                    placeholder="TOKEN NAME"
                    className="bg-muted border-border text-primary placeholder:text-primary/50 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">
                    {">"} SYMBOL * {"<"}
                  </label>
                  <Input
                    value={tokenData.symbol}
                    onChange={(e) => setTokenData({ ...tokenData, symbol: e.target.value })}
                    placeholder="SYMBOL"
                    className="bg-muted border-border text-primary placeholder:text-primary/50 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">
                    {">"} LOGO * {"<"}
                  </label>
                  <Button variant="outline" className="w-full h-10 border-border text-foreground gap-2">
                    <Upload className="w-4 h-4" />
                    UPLOAD
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs text-muted-foreground mb-2">
                  {">"} DESCRIPTION {"<"}
                </label>
                <Textarea
                  value={tokenData.description}
                  onChange={(e) => setTokenData({ ...tokenData, description: e.target.value })}
                  placeholder="DESCRIBE YOUR TOKEN"
                  className="bg-muted border-border text-primary placeholder:text-primary/50 min-h-[100px] resize-none uppercase"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">
                    {">"} TWITTER {"<"}
                  </label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={tokenData.twitter}
                      onChange={(e) => setTokenData({ ...tokenData, twitter: e.target.value })}
                      placeholder="https://x.com/..."
                      className="pl-10 bg-muted border-border text-primary placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">
                    {">"} TELEGRAM {"<"}
                  </label>
                  <div className="relative">
                    <Send className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={tokenData.telegram}
                      onChange={(e) => setTokenData({ ...tokenData, telegram: e.target.value })}
                      placeholder="https://t.me/..."
                      className="pl-10 bg-muted border-border text-primary placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">
                    {">"} WEBSITE {"<"}
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={tokenData.website}
                      onChange={(e) => setTokenData({ ...tokenData, website: e.target.value })}
                      placeholder="https://..."
                      className="pl-10 bg-muted border-border text-primary placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-xs text-muted-foreground mb-3">
                {">"} PLATFORM * {"<"}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={cn(
                      "p-4 rounded-lg border text-left transition-all",
                      selectedPlatform === platform.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card/30 hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{platform.icon}</span>
                      <span className={cn(
                        "text-sm font-medium",
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
              <label className="block text-xs text-muted-foreground mb-3">
                {">"} DEPLOYMENT MODE {"<"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {deploymentModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setDeploymentMode(mode.id)}
                    className={cn(
                      "p-4 rounded-lg border text-center transition-all",
                      deploymentMode === mode.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card/30 hover:border-primary/50 text-foreground"
                    )}
                  >
                    <div className="text-sm font-medium mb-1">{mode.name}</div>
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

            {/* Mode Info */}
            <div className="p-4 rounded-lg border border-border bg-muted/20">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">SIMPLE MODE</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Single bundle deployment. Fast and simple for up to 5 wallets.
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="border-border">
                Cancel
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Next Step
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

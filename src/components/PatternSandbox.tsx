import { useState, useRef } from "react";
import { Sliders, RotateCcw, Sparkles, Eye, Download, Check, Upload, ShieldCheck } from "lucide-react";
import { PatternSpecimen } from "../types";
import { WatermarkedImage, WatermarkShieldOverlay } from "./WatermarkedImage";

interface PatternSandboxProps {
  specimens: PatternSpecimen[];
  activeSpecimen: PatternSpecimen;
  onSelectSpecimen: (specimen: PatternSpecimen) => void;
  onOpenInquiry: (notes?: string) => void;
  onUpdateSpecimenImage?: (specimenId: string, newImageUrl: string) => void;
}

export default function PatternSandbox({
  specimens,
  activeSpecimen,
  onSelectSpecimen,
  onOpenInquiry,
  onUpdateSpecimenImage,
}: PatternSandboxProps) {
  const [scale, setScale] = useState<number>(3); // 1 to 6
  const [alignment, setAlignment] = useState<"half-drop" | "straight">("half-drop");
  const [filterMode, setFilterMode] = useState<string>("none");
  const [isHypnoticSway, setIsHypnoticSway] = useState<boolean>(false);
  const [bgTheme, setBgTheme] = useState<"dark" | "light">("dark");
  const [copiedPreset, setCopiedPreset] = useState<boolean>(false);
  const sandboxFileInputRef = useRef<HTMLInputElement>(null);

  const filterOptions = [
    { label: "Original Pure", value: "none" },
    { label: "Acid Boost", value: "saturate(160%) contrast(115%)" },
    { label: "Cyan Voltage", value: "hue-rotate(90deg) saturate(140%)" },
    { label: "Ultraviolet", value: "hue-rotate(180deg) saturate(130%)" },
    { label: "Monochrome Steel", value: "grayscale(100%) contrast(130%)" },
    { label: "Solar Flare", value: "hue-rotate(270deg) saturate(150%)" },
  ];

  const handleReset = () => {
    setScale(3);
    setAlignment("half-drop");
    setFilterMode("none");
    setIsHypnoticSway(false);
    setBgTheme("dark");
  };

  const handleCopyConfig = () => {
    const config = `KAT-MADE CUSTOM TILE PRESET:
Specimen: ${activeSpecimen.title} (#${activeSpecimen.number})
Scale: ${scale}x repeat density
Alignment: ${alignment}
Filter: ${filterOptions.find((f) => f.value === filterMode)?.label}
Background: ${bgTheme}`;
    navigator.clipboard.writeText(config);
    setCopiedPreset(true);
    setTimeout(() => setCopiedPreset(false), 2000);
  };

  // Calculate background size based on scale
  const bgSizePercent = 100 / scale;

  return (
    <section id="sandbox" className="py-24 border-b border-[#f5f4ef]/20 bg-[#070707] text-[#f5f4ef]">
      <div className="max-w-[1440px] mx-auto px-[4vw]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#f5f4ef]/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans-grotesk tracking-widest uppercase text-[#30E6FF] font-bold">
              <span className="w-6 h-px bg-[#30E6FF]" />
              <span>INTERACTIVE TOOL</span>
              <span className="text-[#adb2bd]">/</span>
              <span>LIVE REPEAT SIMULATOR</span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-6xl font-serif-display font-bold uppercase tracking-tight text-[#f5f4ef]">
              PATTERN <span className="text-[#d8ff43] italic font-normal">SANDBOX</span>
            </h2>
            <p className="mt-3 text-sm text-[#adb2bd] font-sans-grotesk max-w-xl">
              Test how Kathleen Raft's botanical specimens tile across large architectural planes. Adjust scale density, seam alignment, and chromatic shifts in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-transparent text-[#adb2bd] hover:text-[#f5f4ef] border border-[#f5f4ef]/20 font-sans-grotesk text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Settings</span>
            </button>
          </div>
        </div>

        {/* Sandbox Workspace: 2 Column Controls + Canvas */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls Pane (4 cols) */}
          <div className="lg:col-span-4 p-6 bg-[#111217] border border-[#f5f4ef]/20 flex flex-col gap-6">
            
            {/* Specimen Picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-sans-grotesk uppercase tracking-wider text-[#d8ff43] font-bold">
                  1. Select Specimen
                </label>
                
                <input
                  type="file"
                  ref={sandboxFileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && onUpdateSpecimenImage) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        const dataUrl = reader.result as string;
                        onUpdateSpecimenImage(activeSpecimen.id, dataUrl);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  accept="image/*"
                  className="hidden"
                />

                <button
                  onClick={() => sandboxFileInputRef.current?.click()}
                  className="text-[10px] font-mono uppercase tracking-wider text-[#d8ff43] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  title="Upload your own pattern image to test in the simulator"
                >
                  <Upload className="w-3 h-3 text-[#ff67bd]" />
                  <span>Upload Your Own</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {specimens.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectSpecimen(item)}
                    className={`p-1.5 border text-center transition-all cursor-pointer ${
                      activeSpecimen.id === item.id
                        ? "border-[#d8ff43] bg-[#070707] shadow-[2px_2px_0_#d8ff43]"
                        : "border-[#f5f4ef]/10 bg-[#17191F] hover:border-[#f5f4ef]/30"
                    }`}
                  >
                    <div className="aspect-square overflow-hidden bg-[#000] mb-1 relative">
                      <WatermarkedImage
                        src={item.imageUrl}
                        alt={item.title}
                        watermarkDensity="subtle"
                        badgePosition="none"
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-sans-grotesk font-bold text-[#f5f4ef] truncate block">
                      #{item.number} {item.title.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scale Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] font-sans-grotesk uppercase tracking-wider text-[#d8ff43] font-bold">
                  2. Repeat Density (Scale)
                </label>
                <span className="font-mono text-xs text-[#30E6FF]">{scale}x Tile Repeat</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-[#d8ff43] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-[#adb2bd] mt-1 uppercase">
                <span>Macro Mural (1x)</span>
                <span>Micro Silk Print (6x)</span>
              </div>
            </div>

            {/* Chromatic Filter Mode */}
            <div>
              <label className="text-[11px] font-sans-grotesk uppercase tracking-wider text-[#d8ff43] font-bold block mb-2">
                3. Chromatic Shift
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setFilterMode(opt.value)}
                    className={`px-2.5 py-1.5 text-[10px] font-sans-grotesk uppercase font-bold tracking-wider text-left border cursor-pointer ${
                      filterMode === opt.value
                        ? "bg-[#d8ff43] text-[#070707] border-[#d8ff43]"
                        : "bg-[#070707] text-[#adb2bd] border-[#f5f4ef]/10 hover:border-[#f5f4ef]/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas Toggles */}
            <div className="space-y-3 pt-3 border-t border-[#f5f4ef]/10">
              <label className="text-[11px] font-sans-grotesk uppercase tracking-wider text-[#d8ff43] font-bold block">
                4. Environment Options
              </label>

              {/* Hypnotic Sway toggle */}
              <button
                onClick={() => setIsHypnoticSway(!isHypnoticSway)}
                className={`w-full py-2 px-3 text-xs font-sans-grotesk uppercase font-bold tracking-wider border flex items-center justify-between cursor-pointer transition-colors ${
                  isHypnoticSway
                    ? "bg-[#ff67bd] text-[#070707] border-[#ff67bd]"
                    : "bg-[#070707] text-[#f5f4ef] border-[#f5f4ef]/20"
                }`}
              >
                <span>Hypnotic Breathing Sway</span>
                <span>{isHypnoticSway ? "ON" : "OFF"}</span>
              </button>

              {/* Background Theme toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#adb2bd] font-sans-grotesk">Canvas Underlay:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setBgTheme("dark")}
                    className={`px-3 py-1 text-[10px] font-sans-grotesk uppercase font-bold border cursor-pointer ${
                      bgTheme === "dark" ? "bg-[#f5f4ef] text-[#070707]" : "text-[#adb2bd] border-[#f5f4ef]/20"
                    }`}
                  >
                    Obsidian
                  </button>
                  <button
                    onClick={() => setBgTheme("light")}
                    className={`px-3 py-1 text-[10px] font-sans-grotesk uppercase font-bold border cursor-pointer ${
                      bgTheme === "light" ? "bg-[#d8ff43] text-[#070707]" : "text-[#adb2bd] border-[#f5f4ef]/20"
                    }`}
                  >
                    Paper White
                  </button>
                </div>
              </div>
            </div>

            {/* Export / Inquire from Preset */}
            <div className="pt-4 border-t border-[#f5f4ef]/15 space-y-2">
              <button
                onClick={() => onOpenInquiry(`Custom commission scaled to ${scale}x density (${activeSpecimen.title})`)}
                className="w-full py-3 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0_#ff67bd] cursor-pointer"
              >
                Inquire With This Configuration
              </button>

              <button
                onClick={handleCopyConfig}
                className="w-full py-2 bg-transparent text-[#adb2bd] hover:text-[#f5f4ef] border border-[#f5f4ef]/20 font-sans-grotesk text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedPreset ? <Check className="w-3.5 h-3.5 text-[#d8ff43]" /> : <Download className="w-3.5 h-3.5" />}
                <span>{copiedPreset ? "Config Copied!" : "Copy Preset Data"}</span>
              </button>
            </div>

          </div>

          {/* Right Live Wallpaper Canvas (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Canvas Frame */}
            <div
              className={`relative aspect-[16/10] sm:aspect-[16/11] w-full border-2 border-[#f5f4ef] overflow-hidden shadow-[14px_14px_0_#d8ff43] transition-all duration-500 ${
                bgTheme === "dark" ? "bg-[#050505]" : "bg-[#F3F0E8]"
              }`}
            >
              {/* Tiling pattern background */}
              <div
                className={`w-full h-full transition-all duration-300 select-none ${isHypnoticSway ? "animate-pulse-glow" : ""}`}
                style={{
                  backgroundImage: `url(${activeSpecimen.imageUrl})`,
                  backgroundSize: `${bgSizePercent}% ${bgSizePercent}%`,
                  backgroundRepeat: "repeat",
                  filter: filterMode,
                  userSelect: "none",
                }}
              />

              {/* Anti-Save Watermark Shield Overlay */}
              <WatermarkShieldOverlay density="subtle" specimenNumber={activeSpecimen.number} />

              {/* Reticle coordinate HUD */}
              <div className="absolute top-3 left-3 bg-[#070707]/85 backdrop-blur-xs text-[#d8ff43] px-3 py-1 text-[10px] font-mono border border-[#d8ff43]/30 flex items-center gap-2 z-25">
                <span className="w-2 h-2 rounded-full bg-[#d8ff43] animate-ping" />
                <span>ACTIVE SIMULATION: {activeSpecimen.title}</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-[#070707]/85 backdrop-blur-xs text-[#f5f4ef] px-3 py-1 text-[10px] font-mono border border-[#f5f4ef]/20 z-25 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#30E6FF]" />
                <span>GRID: {scale}×{scale} TILES · WATERMARKED</span>
              </div>
            </div>

            {/* Canvas Footer Note */}
            <div className="p-4 bg-[#111217] border border-[#f5f4ef]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-sans-grotesk text-[#adb2bd]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d8ff43]" />
                <span>
                  All Kat-Made patterns tile with zero seam artifacts. Perfect for Continuous Roll Wallpapers, Silk Scarf borders, and acoustic panels.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

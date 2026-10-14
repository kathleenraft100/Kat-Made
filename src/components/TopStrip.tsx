import { Sparkles, ArrowUpRight, Lock } from "lucide-react";

interface TopStripProps {
  onOpenInquiry: () => void;
  onOpenPatternManager: () => void;
}

export default function TopStrip({ onOpenInquiry, onOpenPatternManager }: TopStripProps) {
  return (
    <aside aria-label="Announcement" className="w-full min-h-[32px] px-[3.5vw] py-1.5 bg-[#d8ff43] text-[#070707] flex items-center justify-between text-[11px] font-sans-grotesk tracking-wider uppercase font-semibold border-b border-[#070707]/10 z-40 relative">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#17191F] ring-2 ring-[#070707]/20" />
        <span className="font-bold">KAT-MADE</span>
        <span className="opacity-40">/</span>
        <span className="tracking-widest">HYPNO CHROME GARDEN</span>
        <span className="hidden md:inline-block opacity-40">·</span>
        <span className="hidden md:inline-block font-normal">10 SPECIMEN ASSET REGISTER (2026-10-05)</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Pattern Manager Trigger button */}
        <button
          onClick={onOpenPatternManager}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#070707] text-[#d8ff43] hover:bg-[#ff67bd] hover:text-[#070707] transition-colors font-bold text-[10px] font-mono cursor-pointer shadow-[2px_2px_0_#ff67bd]"
          title="Open pattern image locker to save and lock all 10 patterns"
        >
          <Lock className="w-3 h-3" />
          <span>LOCK & MANAGE 10 PATTERNS</span>
        </button>

        <button
          onClick={onOpenInquiry}
          className="hidden sm:inline-flex items-center gap-1 hover:underline font-bold text-[11px] cursor-pointer"
        >
          <span>COMMISSIONS</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}

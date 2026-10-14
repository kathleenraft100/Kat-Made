import { useState } from "react";
import { ArrowDown, ExternalLink, SlidersHorizontal, Sparkles, Eye, Check } from "lucide-react";
import { PatternSpecimen } from "../types";
import { WatermarkedImage } from "./WatermarkedImage";

interface HeroProps {
  heroSpecimen: PatternSpecimen;
  onSelectSpecimen: (specimen: PatternSpecimen) => void;
  onOpenInquiry: () => void;
}

export default function Hero({ heroSpecimen, onSelectSpecimen, onOpenInquiry }: HeroProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden border-b border-[#f5f4ef]/20 bg-[#050505]/75 backdrop-blur-[2px]">
      {/* Subtle architectural background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(245,244,239,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(245,244,239,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 40% 50%, black 20%, transparent 80%)"
        }}
      />

      {/* Decorative ambient blurred ring */}
      <div className="absolute -left-36 top-1/3 w-[500px] h-[500px] rounded-full border border-[#d8ff43]/15 opacity-50 blur-[90px] pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full border border-[#ff67bd]/15 opacity-40 blur-[80px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-[4vw] pt-12 lg:pt-20 pb-16">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Typographic core */}
          <div className="lg:col-span-6 z-10 flex flex-col justify-center">
            {/* Clean unboxed kicker */}
            <div className="flex items-center gap-2.5 text-[11px] font-sans-grotesk tracking-widest uppercase text-[#d8ff43]">
              <span className="font-bold">COLLECTION N°07</span>
              <span className="text-[#adb2bd]">/</span>
              <span className="text-[#adb2bd]">SURFACE ARCHITECTURE</span>
              <span className="text-[#adb2bd]">/</span>
              <span className="text-[#ff67bd] flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3" />
                2026 EDITION
              </span>
            </div>

            {/* Display Headline in Bodoni Moda */}
            <h1 className="mt-5 text-[54px] sm:text-[76px] lg:text-[96px] leading-[0.88] font-serif-display font-bold uppercase tracking-[-0.05em] text-[#f5f4ef]">
              HYPNO<br />
              <span className="text-[#d8ff43] italic font-normal">CHROME</span><br />
              GARDEN
              <span className="text-[#ff67bd] text-[0.45em] align-top ml-2 font-normal font-sans-grotesk">✦</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-7 text-base sm:text-lg text-[#adb2bd] leading-relaxed max-w-xl font-sans-grotesk">
              Surreal surface design, liquid-chrome botanicals, and high-voltage pattern architecture created by{" "}
              <strong className="text-[#f5f4ef] font-semibold">Kathleen Raft</strong> for spaces that refuse to be ordinary. Available as fine art metal plates on Displate and archival silks on Contrado.
            </p>

            {/* Action buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => scrollTo("specimens")}
                className="px-6 py-3.5 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider border border-[#d8ff43] shadow-[4px_4px_0_#ff67bd] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#ff67bd] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explore Garden Specimens</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo("sandbox")}
                className="px-5 py-3.5 bg-transparent text-[#f5f4ef] font-sans-grotesk font-semibold text-xs uppercase tracking-wider border border-[#f5f4ef]/30 hover:border-[#d8ff43] hover:text-[#d8ff43] transition-colors cursor-pointer flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#30E6FF]" />
                <span>Open Pattern Sandbox</span>
              </button>

              <button
                onClick={handleShare}
                className="px-4 py-3.5 bg-[#17191F] text-[#adb2bd] hover:text-[#f5f4ef] font-sans-grotesk text-xs uppercase tracking-wider border border-[#f5f4ef]/10 hover:border-[#f5f4ef]/30 transition-colors cursor-pointer"
                title="Copy share link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-[#d8ff43]" /> : "Share Archive"}
              </button>
            </div>

            {/* Transmission signal footnote */}
            <div className="mt-12 pt-5 border-t border-[#f5f4ef]/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] font-sans-grotesk text-[#adb2bd]/80 tracking-wider uppercase">
              <span>EXHIBITION STATUS: CURRENT</span>
              <span>·</span>
              <span>SUBSTRATES: METAL / SILK / VINYL</span>
              <span>·</span>
              <button 
                onClick={onOpenInquiry}
                className="text-[#d8ff43] hover:underline font-semibold cursor-pointer"
              >
                TRADE & ARCHITECTURAL LICENSING →
              </button>
            </div>
          </div>

          {/* Right Column: Hero Art Window */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Ambient rotating ring */}
            <div className="absolute -inset-4 rounded-full border border-[#d8ff43]/20 animate-rotate-ring pointer-events-none" />

            {/* The Window Box with Brutalist Shadow */}
            <div className="w-full max-w-[620px] bg-[#111217] border-2 border-[#f5f4ef] p-3 shadow-[16px_16px_0_#d8ff43] transition-transform duration-300 hover:rotate-[-0.5deg]">
              
              {/* Window Bar */}
              <div className="h-8 bg-[#d8ff43] text-[#070707] px-3 flex items-center justify-between text-[11px] font-sans-grotesk font-bold uppercase tracking-wider border-b border-[#070707]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#070707]" />
                  <span className="w-2.5 h-2.5 rounded-full border border-[#070707]" />
                  <span className="w-2.5 h-2.5 rounded-full border border-[#070707]" />
                  <span className="ml-1 tracking-widest">SPECIMEN_01.RAW</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] bg-[#070707] text-[#d8ff43] px-1.5 py-0.5">300 DPI</span>
                  <span>×</span>
                </div>
              </div>

              {/* Artwork Media Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#070707] group">
                <WatermarkedImage
                  src={heroSpecimen.imageUrl}
                  alt={heroSpecimen.title}
                  specimenNumber={heroSpecimen.number}
                  watermarkDensity="subtle"
                  badgePosition="bottom-right"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Scrim overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-80" />

                {/* Inspect overlay button */}
                <button
                  onClick={() => onSelectSpecimen(heroSpecimen)}
                  className="absolute inset-0 flex items-center justify-center bg-[#070707]/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs cursor-pointer"
                >
                  <span className="px-4 py-2 bg-[#d8ff43] text-[#070707] text-xs font-sans-grotesk font-bold uppercase tracking-widest flex items-center gap-2 shadow-[4px_4px_0_#070707]">
                    <Eye className="w-4 h-4" />
                    Inspect Specimen N°01
                  </span>
                </button>

                {/* Floating sticker badge 1 */}
                <div className="absolute top-3 right-3 bg-[#ff67bd] text-[#070707] font-sans-grotesk text-[10px] font-bold uppercase px-3 py-1.5 border border-[#070707] shadow-[3px_3px_0_#070707] rotate-3 pointer-events-none">
                  LIMITED METAL RUN
                </div>

                {/* Bottom caption inside frame */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-sans-grotesk text-[#f5f4ef] font-medium uppercase">
                  <div className="flex items-center gap-2">
                    <span className="text-[#d8ff43] font-bold">N°{heroSpecimen.number}</span>
                    <span className="truncate">{heroSpecimen.title}</span>
                  </div>
                  <span className="text-[#30E6FF] text-[10px] shrink-0 font-mono">300 DPI MASTER</span>
                </div>
              </div>

              {/* Window Footer Information */}
              <div className="mt-3 pt-2.5 border-t border-[#f5f4ef]/10 flex items-center justify-between text-[10px] font-sans-grotesk text-[#adb2bd] uppercase">
                <div className="flex items-center gap-3">
                  <span>CHROMATIC SPECULARITY</span>
                  <span>·</span>
                  <span className="text-[#d8ff43]">DISPLATE METAL APPROVED</span>
                </div>
                <button
                  onClick={() => onSelectSpecimen(heroSpecimen)}
                  className="text-[#f5f4ef] hover:text-[#d8ff43] flex items-center gap-1 cursor-pointer font-bold"
                >
                  <span>FULL SPECS</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-Column KPI Strip below the hero split (Mandatory Layout Math Rule 13) */}
        <div className="mt-20 pt-10 border-t border-[#f5f4ef]/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 border border-[#f5f4ef]/15 bg-[#111217]">
            <div className="text-[10px] font-sans-grotesk text-[#d8ff43] uppercase tracking-wider font-bold">
              01 // VECTOR ARCHITECTURE
            </div>
            <div className="mt-2 text-2xl font-serif-display font-bold text-[#f5f4ef]">
              Infinite Scale
            </div>
            <p className="mt-1 text-xs text-[#adb2bd] font-sans-grotesk leading-relaxed">
              Every specimen is crafted as lossless vector paths, capable of scaling to 30-meter architectural mural wraps without pixelation.
            </p>
          </div>

          <div className="p-4 border border-[#f5f4ef]/15 bg-[#111217]">
            <div className="text-[10px] font-sans-grotesk text-[#ff67bd] uppercase tracking-wider font-bold">
              02 // DISPLATE PRINTS
            </div>
            <div className="mt-2 text-2xl font-serif-display font-bold text-[#f5f4ef]">
              Aircraft Metal
            </div>
            <p className="mt-1 text-xs text-[#adb2bd] font-sans-grotesk leading-relaxed">
              Magnet-mounted heavy steel plates with scratch-resistant matte, gloss, or holographic 3D finish. Zero wall drilling.
            </p>
          </div>

          <div className="p-4 border border-[#f5f4ef]/15 bg-[#111217]">
            <div className="text-[10px] font-sans-grotesk text-[#30E6FF] uppercase tracking-wider font-bold">
              03 // CONTRADO SILKS
            </div>
            <div className="mt-2 text-2xl font-serif-display font-bold text-[#f5f4ef]">
              London Cut Silk
            </div>
            <p className="mt-1 text-xs text-[#adb2bd] font-sans-grotesk leading-relaxed">
              Custom-printed 100% natural Mulberry silk, velvet, and cotton drill crafted sustainably in London for couture and drapery.
            </p>
          </div>

          <div className="p-4 border border-[#f5f4ef]/15 bg-[#111217]">
            <div className="text-[10px] font-sans-grotesk text-[#ffad58] uppercase tracking-wider font-bold">
              04 // STUDIO COMMISSIONS
            </div>
            <div className="mt-2 text-2xl font-serif-display font-bold text-[#f5f4ef]">
              Kathleen Raft
            </div>
            <p className="mt-1 text-xs text-[#adb2bd] font-sans-grotesk leading-relaxed">
              Direct artist collaboration for bespoke colorways, hospitality site-specific scaling, and luxury trade interior programs.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

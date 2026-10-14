import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowUpRight, Sparkles, Sliders, ExternalLink, Mail, Eye } from "lucide-react";
import KatMadeLogo from "./KatMadeLogo";
import { SPECIMENS } from "../data/patterns";
import { PatternSpecimen } from "../types";
import { WatermarkedImage } from "./WatermarkedImage";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (initialNote?: string) => void;
  onSelectSpecimen: (specimen: PatternSpecimen) => void;
  activeSection: string;
  specimens?: PatternSpecimen[];
}

interface NavItem {
  id: string;
  href: string;
  number: string;
  title: string;
  subtitle: string;
  accent: string;
  previewImage: string;
  previewBadge: string;
  previewDescription: string;
}

export default function NavigationOverlay({
  isOpen,
  onClose,
  onOpenInquiry,
  onSelectSpecimen,
  activeSection,
  specimens,
}: NavigationOverlayProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);
  const activeSpecimens = specimens && specimens.length > 0 ? specimens : SPECIMENS;

  const navItems: NavItem[] = [
    {
      id: "specimens",
      href: "#specimens",
      number: "01",
      title: "Specimen Garden",
      subtitle: "10 surreal liquid-chrome & bioluminescent botanicals",
      accent: "#d8ff43",
      previewImage: "/patterns/01-chrome-garden-vortex.jpg",
      previewBadge: "COLLECTION ARCHIVE",
      previewDescription: "Explore high-voltage vector specimens engineered for architectural wallcoverings and museum prints.",
    },
    {
      id: "shops",
      href: "#shops",
      number: "02",
      title: "Metal & Silk Stores",
      subtitle: "Displate aircraft steel posters & Contrado London Mulberry silks",
      accent: "#ff67bd",
      previewImage: "/patterns/03-checker-bloom-tunnel.jpg",
      previewBadge: "OFFICIAL PARTNERS",
      previewDescription: "Magnet-mounted metal wall art with zero drilling + ethically handmade wearable couture textiles.",
    },
    {
      id: "lookbook",
      href: "#lookbook",
      number: "03",
      title: "Spatial Lookbook",
      subtitle: "TriBeCa Penthouse, Kreuzberg Sound Bar & Milan Salon",
      accent: "#30E6FF",
      previewImage: "/images/lookbook_interior_penthouse_1791955072029.jpg",
      previewBadge: "IN SITU ARCHITECTURE",
      previewDescription: "Architectural installations showcasing dramatic 9-meter continuous panel drops in luxury interiors.",
    },
    {
      id: "sandbox",
      href: "#sandbox",
      number: "04",
      title: "Pattern Sandbox",
      subtitle: "Interactive tile density, chromatic shifts & hypnotic sway",
      accent: "#d8ff43",
      previewImage: "/patterns/02-prismatic-portal.jpg",
      previewBadge: "LIVE TOOL",
      previewDescription: "Test scale density from 1x macro statements to 6x fine apparel prints in real time.",
    },
    {
      id: "about",
      href: "#about",
      number: "05",
      title: "Kathleen Raft",
      subtitle: "Artist bio, philosophy of refusal & trade discount program",
      accent: "#ffad58",
      previewImage: "/patterns/01-chrome-garden-vortex.jpg",
      previewBadge: "STUDIO FOUNDER",
      previewDescription: "Direct trade program with bespoke Pantone proofing for interior designers and architects.",
    },
    {
      id: "blog",
      href: "#blog",
      number: "06",
      title: "Trend Report 2026",
      subtitle: "The Rise of Psychedelic Maximalism",
      accent: "#ff67bd",
      previewImage: "/images/trend_report_cover_1791959946542.jpg",
      previewBadge: "2026 WHITEPAPER",
      previewDescription: "20-page market analysis, asset modularization engine, and 7-stream creative business architecture.",
    },
  ];

  // Prevent background scroll when navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPreview = navItems[hoveredIdx] || navItems[0];

  const handleNavigate = (href: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const handleQuickSpecimen = (specimen: PatternSpecimen) => {
    onClose();
    setTimeout(() => {
      onSelectSpecimen(specimen);
    }, 150);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation Hub"
      className="fixed inset-0 z-50 flex flex-col bg-[#050505]/98 backdrop-blur-2xl text-[#f5f4ef] animate-in fade-in duration-200"
    >
      {/* Background Reticle Grid Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(216,255,67,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(216,255,67,0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top Header of the Navigation Hub */}
      <div className="relative z-10 w-full min-h-[74px] px-[4vw] border-b border-[#f5f4ef]/20 flex items-center justify-between gap-4 bg-[#070707]/90 shrink-0">
        <div className="flex items-center gap-3">
          <KatMadeLogo size={32} animate={true} />
          <div className="flex flex-col">
            <span className="font-sans-grotesk text-lg font-bold tracking-tight text-[#f5f4ef] leading-none">
              KAT<span className="text-[#ff67bd]">·</span>MADE
            </span>
            <span className="text-[10px] font-mono text-[#d8ff43] tracking-widest uppercase mt-0.5">
              HYPNO CHROME NAVIGATION HUB
            </span>
          </div>
        </div>

        {/* Center Live Status */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#adb2bd] uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#d8ff43] animate-ping" />
          <span>PORTAL ACTIVE // SELECT DESTINATION</span>
        </div>

        {/* Big Close Button */}
        <button
          onClick={onClose}
          className="group px-4 py-2 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-[#d8ff43] shadow-[3px_3px_0_#ff67bd] hover:bg-transparent hover:text-[#d8ff43] transition-all cursor-pointer"
        >
          <span>CLOSE (ESC)</span>
          <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
        </button>
      </div>

      {/* Center Body: 2-Column Desktop / Responsive 1-Column */}
      <div className="relative z-10 flex-1 overflow-y-auto px-[4vw] py-8 lg:py-12">
        <div className="max-w-[1440px] mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column (7 cols): The Big Bold Nav List */}
          <nav className="lg:col-span-7 flex flex-col justify-center space-y-2">
            <div className="text-[11px] font-mono text-[#adb2bd] uppercase tracking-widest pb-3 border-b border-[#f5f4ef]/10 flex items-center justify-between">
              <span>EXPLORE THE HYPNO CHROME ARCHIVE</span>
              <span className="text-[#d8ff43]">[5 DESTINATIONS]</span>
            </div>

            {navItems.map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.href)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onFocus={() => setHoveredIdx(idx)}
                  className={`group relative text-left py-3.5 px-4 rounded-sm transition-all duration-200 border cursor-pointer flex items-center justify-between ${
                    isHovered
                      ? "bg-[#111217] border-[#d8ff43] shadow-[6px_6px_0_#ff67bd] translate-x-2"
                      : "bg-transparent border-transparent hover:border-[#f5f4ef]/20"
                  }`}
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    {/* Index Number */}
                    <span
                      className="font-mono text-xs sm:text-sm font-bold tracking-widest transition-colors"
                      style={{ color: isHovered ? item.accent : "#adb2bd" }}
                    >
                      {item.number}
                    </span>

                    {/* Title + Subtitle */}
                    <div className="flex flex-col">
                      <span
                        className={`text-2xl sm:text-4xl lg:text-[42px] font-serif-display font-bold uppercase tracking-tight transition-colors ${
                          isHovered
                            ? "text-[#f5f4ef]"
                            : isActive
                            ? "text-[#d8ff43]"
                            : "text-[#f5f4ef]/80 group-hover:text-[#f5f4ef]"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="text-xs sm:text-sm font-sans-grotesk text-[#adb2bd] mt-1 transition-colors group-hover:text-[#f5f4ef]">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                      isHovered
                        ? "bg-[#d8ff43] text-[#070707] border-[#d8ff43] scale-110"
                        : "border-[#f5f4ef]/20 text-[#adb2bd] group-hover:border-[#f5f4ef]"
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Right Column (5 cols): Dynamic Interactive Spotlight Portal */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center">
            <div className="p-4 bg-[#111217] border-2 border-[#f5f4ef] shadow-[12px_12px_0_#d8ff43] transition-all duration-300">
              
              {/* Window Bar */}
              <div className="h-7 px-3 bg-[#d8ff43] text-[#070707] flex items-center justify-between font-sans-grotesk font-bold text-[10px] uppercase tracking-wider border-b border-[#070707]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#070707]" />
                  <span>TARGET PREVIEW // {currentPreview.previewBadge}</span>
                </div>
                <span>300 DPI</span>
              </div>

              {/* Artwork Media Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#070707] border border-[#f5f4ef]/20 group">
                <WatermarkedImage
                  src={currentPreview.previewImage}
                  alt={currentPreview.title}
                  watermarkDensity="subtle"
                  badgePosition="bottom-right"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-80" />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 bg-[#070707]/90 text-[#d8ff43] font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#d8ff43]/40">
                  SECTION {currentPreview.number}
                </div>

                {/* Bottom title */}
                <div className="absolute bottom-3 left-3 right-3 text-xs font-serif-display font-bold text-[#f5f4ef] uppercase">
                  {currentPreview.title}
                </div>
              </div>

              {/* Preview Description */}
              <div className="p-4 bg-[#070707] border-t border-[#f5f4ef]/10 mt-3">
                <p className="text-xs text-[#adb2bd] font-sans-grotesk leading-relaxed">
                  {currentPreview.previewDescription}
                </p>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#f5f4ef]/10 text-[10px] font-mono text-[#d8ff43]">
                  <span>ENTER DESTINATION →</span>
                  <button
                    onClick={() => handleNavigate(currentPreview.href)}
                    className="hover:underline font-bold text-[#f5f4ef] cursor-pointer"
                  >
                    GO TO SECTION
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Ribbon of Navigation Hub: Specimen Quick Jump & Direct Actions */}
      <div className="relative z-10 w-full px-[4vw] py-4 border-t border-[#f5f4ef]/20 bg-[#070707] shrink-0">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Horizontal Quick Specimen Launcher */}
          <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-[10px] font-mono text-[#d8ff43] uppercase tracking-widest whitespace-nowrap shrink-0 flex items-center gap-1 font-bold">
              <Sparkles className="w-3 h-3 text-[#ff67bd]" />
              10-SPECIMEN LAUNCHER:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {activeSpecimens.slice(0, 10).map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => handleQuickSpecimen(sp)}
                  className="px-2.5 py-1 text-[10px] font-mono text-[#f5f4ef] hover:text-[#070707] hover:bg-[#d8ff43] bg-[#111217] border border-[#f5f4ef]/20 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
                >
                  <span className="text-[#ff67bd]">#{sp.number}</span>
                  <span className="max-w-[110px] truncate">{sp.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Actions: Commission + Direct Stores */}
          <div className="w-full md:w-auto flex flex-wrap items-center justify-end gap-2.5">
            <button
              onClick={() => {
                onClose();
                onOpenInquiry("Navigation Portal Commission Request");
              }}
              className="flex-1 md:flex-initial px-4 py-2 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0_#ff67bd] hover:shadow-[5px_5px_0_#ff67bd] cursor-pointer whitespace-nowrap"
            >
              Start Commission Inquiry
            </button>

            <a
              href="https://displate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-[#17191F] hover:bg-[#22242c] text-[#f5f4ef] text-xs font-sans-grotesk uppercase tracking-wider border border-[#f5f4ef]/20 flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <span>Displate Metal</span>
              <ExternalLink className="w-3 h-3 text-[#d8ff43]" />
            </a>

            <a
              href="https://www.contrado.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-[#17191F] hover:bg-[#22242c] text-[#f5f4ef] text-xs font-sans-grotesk uppercase tracking-wider border border-[#f5f4ef]/20 flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <span>Contrado Silks</span>
              <ExternalLink className="w-3 h-3 text-[#ff67bd]" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

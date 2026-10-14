import { Mail, Sparkles, Award, ArrowUpRight } from "lucide-react";
import KatMadeLogo from "./KatMadeLogo";

interface AboutSectionProps {
  onOpenInquiry: () => void;
}

export default function AboutSection({ onOpenInquiry }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 border-b border-[#f5f4ef]/20 bg-[#050505]/85 backdrop-blur-[2px] text-[#f5f4ef]">
      <div className="max-w-[1440px] mx-auto px-[4vw]">
        
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): Geometric emblem & artist facts */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center border-2 border-[#d8ff43] rounded-full bg-[#111217] shadow-[12px_12px_0_#ff67bd]">
              {/* Rotating outer ring */}
              <div className="absolute inset-2 border border-dashed border-[#30E6FF]/50 rounded-full animate-rotate-ring" />
              
              {/* Center Kat-Made Logo */}
              <KatMadeLogo size={130} animate={true} />
            </div>

            <div className="mt-8">
              <span className="text-xs font-sans-grotesk text-[#d8ff43] uppercase tracking-widest font-bold block mb-1">
                FOUNDER & CREATIVE DIRECTOR
              </span>
              <h3 className="text-3xl font-serif-display font-bold text-[#f5f4ef]">
                Kathleen Raft
              </h3>
              <p className="text-xs text-[#adb2bd] font-mono mt-1">
                Kat-Made Surface Design Studio
              </p>
            </div>

            {/* Direct contact badge */}
            <div className="mt-6 flex flex-col gap-2 w-full max-w-sm">
              <a
                href="mailto:kathleenraft100@gmail.com"
                className="p-3 bg-[#111217] border border-[#f5f4ef]/15 hover:border-[#d8ff43] text-xs font-sans-grotesk text-[#adb2bd] hover:text-[#f5f4ef] flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#d8ff43]" />
                  <span>kathleenraft100@gmail.com</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </a>
            </div>
          </div>

          {/* Right Column (7 cols): Philosophy & Studio Bio */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 text-xs font-sans-grotesk tracking-widest uppercase text-[#d8ff43] font-bold">
              <span className="w-6 h-px bg-[#d8ff43]" />
              <span>THE PHILOSOPHY</span>
              <span className="text-[#adb2bd]">/</span>
              <span>REFUSAL OF THE ORDINARY</span>
            </div>

            <h2 className="mt-4 text-4xl sm:text-6xl font-serif-display font-bold uppercase tracking-tight text-[#f5f4ef] leading-[0.95]">
              SURREAL BOTANICALS <br />
              <span className="text-[#d8ff43] italic font-normal">FORGED IN</span> CHROME
            </h2>

            {/* Pull Quote */}
            <blockquote className="mt-8 pl-6 border-l-2 border-[#ff67bd] font-serif-display italic text-lg sm:text-2xl text-[#f5f4ef] leading-snug">
              "I don't make wallpaper to blend politely into a living room. I make surface art that turns your space into an otherworldly botanical dimension."
            </blockquote>

            <div className="mt-6 space-y-4 text-sm text-[#adb2bd] font-sans-grotesk leading-relaxed">
              <p>
                Kat-Made was created by artist Kathleen Raft as an unapologetic rebellion against beige minimalism and predictable floral wallpaper. Every piece begins with biological botanical anatomy—petals, stamens, carnivorous traps, and chrysalis leaf venation—before being translated into high-voltage mathematical vectors coated in liquid chrome, electric lime, and hot magenta.
              </p>
              <p>
                Through partnerships with Displate (metal posters) and Contrado (London-cut luxury silks and velvets), Kat-Made surfaces exist across both rigid architectural planes and fluid wearable couture.
              </p>
            </div>

            {/* Studio Guarantees */}
            <div className="mt-8 pt-6 border-t border-[#f5f4ef]/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#111217] border border-[#f5f4ef]/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#d8ff43] uppercase font-sans-grotesk">
                  <Award className="w-4 h-4" />
                  <span>Trade Discount Program</span>
                </div>
                <p className="mt-1 text-xs text-[#adb2bd] font-sans-grotesk">
                  Exclusive trade pricing and custom scale adaptations available for interior designers, boutique hospitality, and architects.
                </p>
              </div>

              <div className="p-4 bg-[#111217] border border-[#f5f4ef]/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#ff67bd] uppercase font-sans-grotesk">
                  <Sparkles className="w-4 h-4" />
                  <span>Custom Colorway Proofs</span>
                </div>
                <p className="mt-1 text-xs text-[#adb2bd] font-sans-grotesk">
                  Match your architectural paint chips or brand guidelines with custom Pantone/CMYK specimen proofs within 48 hours.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={onOpenInquiry}
                className="px-6 py-3.5 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider shadow-[4px_4px_0_#ff67bd] hover:shadow-[6px_6px_0_#ff67bd] cursor-pointer inline-flex items-center gap-2"
              >
                <span>Initiate Custom Commission</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

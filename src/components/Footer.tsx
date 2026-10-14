import { ArrowUpRight, Mail } from "lucide-react";
import KatMadeLogo from "./KatMadeLogo";

interface FooterProps {
  onOpenInquiry: () => void;
}

export default function Footer({ onOpenInquiry }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-[#f5f4ef]/20 text-[#adb2bd] py-14">
      <div className="max-w-[1440px] mx-auto px-[4vw]">
        
        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#f5f4ef]/10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <KatMadeLogo size={28} />
              <span className="font-sans-grotesk text-xl font-bold tracking-tight text-[#f5f4ef]">
                KAT<span className="text-[#ff67bd]">·</span>MADE
              </span>
            </div>
            <p className="text-xs text-[#adb2bd] font-sans-grotesk max-w-sm leading-relaxed">
              Surreal surface design, liquid-chrome botanicals, and high-voltage pattern architecture created by Kathleen Raft. Designed for spaces that refuse to be ordinary.
            </p>
            <div className="pt-1">
              <a
                href="mailto:kathleenraft100@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs text-[#d8ff43] hover:underline font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>kathleenraft100@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-sans-grotesk">
            
            {/* Col 1: Garden Archive */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#f5f4ef] font-bold block mb-3">
                Collections
              </span>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollTo("specimens")} className="hover:text-[#d8ff43] cursor-pointer">
                    Specimen Archive (01–10)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("specimens")} className="hover:text-[#d8ff43] cursor-pointer">
                    Chrome Botanicals
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("specimens")} className="hover:text-[#d8ff43] cursor-pointer">
                    Hypno Psychedelia
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("sandbox")} className="hover:text-[#d8ff43] cursor-pointer">
                    Pattern Repeat Sandbox
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 2: Official Stores */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#f5f4ef] font-bold block mb-3">
                Official Stores
              </span>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://displate.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#d8ff43] inline-flex items-center gap-1"
                  >
                    <span>Displate Metal</span>
                    <ArrowUpRight className="w-3 h-3 text-[#d8ff43]" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.contrado.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#ff67bd] inline-flex items-center gap-1"
                  >
                    <span>Contrado Silks</span>
                    <ArrowUpRight className="w-3 h-3 text-[#ff67bd]" />
                  </a>
                </li>
                <li>
                  <button onClick={() => scrollTo("lookbook")} className="hover:text-[#d8ff43] cursor-pointer">
                    Interior Lookbook
                  </button>
                </li>
                <li>
                  <button onClick={onOpenInquiry} className="hover:text-[#d8ff43] cursor-pointer">
                    Sample Swatch Box
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Studio & Trade */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#f5f4ef] font-bold block mb-3">
                Studio & Trade
              </span>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollTo("about")} className="hover:text-[#d8ff43] cursor-pointer">
                    About Kathleen Raft
                  </button>
                </li>
                <li>
                  <button onClick={onOpenInquiry} className="hover:text-[#d8ff43] cursor-pointer">
                    Trade Licensing
                  </button>
                </li>
                <li>
                  <button onClick={onOpenInquiry} className="hover:text-[#d8ff43] cursor-pointer">
                    Hospitality Commissions
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:kathleenraft100@gmail.com"
                    className="hover:text-[#d8ff43]"
                  >
                    Direct Artist Inquiry
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans-grotesk text-[#adb2bd]/70">
          <div>
            © {new Date().getFullYear()} KAT-MADE · Created by Kathleen Raft · All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider">
            <span>VECTORS ARCHIVAL 300 DPI</span>
            <span>·</span>
            <span>PARIS · LONDON · TOKYO · NYC</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

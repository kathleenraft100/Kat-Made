import { useState } from "react";
import { ArrowUpRight, Bot, Sparkles, User as UserIcon, LogIn } from "lucide-react";
import KatMadeLogo from "./KatMadeLogo";
import NavigationOverlay from "./NavigationOverlay";
import { PatternSpecimen } from "../types";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  onOpenInquiry: (initialNote?: string) => void;
  onSelectSpecimen: (specimen: PatternSpecimen) => void;
  activeSection: string;
  specimens?: PatternSpecimen[];
  onOpenChat?: () => void;
  onOpenAccount?: () => void;
}

export default function Header({
  onOpenInquiry,
  onSelectSpecimen,
  activeSection,
  specimens,
  onOpenChat,
  onOpenAccount,
}: HeaderProps) {
  const { user, signInWithGoogle } = useAuth();
  const [navOverlayOpen, setNavOverlayOpen] = useState(false);

  const navLinks = [
    { href: "#specimens", label: "Specimens", num: "01" },
    { href: "#shops", label: "Displate & Contrado", num: "02" },
    { href: "#lookbook", label: "Lookbook", num: "03" },
    { href: "#sandbox", label: "Pattern Sandbox", num: "04" },
    { href: "#about", label: "Kathleen Raft", num: "05" },
    { href: "#blog", label: "Trend Report", num: "06" },
  ];

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full min-h-[74px] px-[3.5vw] border-b border-[#f5f4ef]/20 bg-[#0c0d10]/95 backdrop-blur-md flex items-center justify-between gap-8 transition-colors">
        {/* Zone 1: Single element brand wordmark */}
        <a
          href="#"
          className="flex items-center gap-3.5 whitespace-nowrap shrink-0 group"
        >
          <KatMadeLogo size={32} animate={true} />
          <span className="font-sans-grotesk text-[19px] font-bold tracking-tight text-[#f5f4ef] flex items-center">
            KAT<span className="text-[#ff67bd] font-normal mx-0.5">·</span>MADE
          </span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] font-sans-grotesk tracking-wider uppercase font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`group flex items-baseline gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive ? "text-[#d8ff43]" : "text-[#adb2bd] hover:text-[#f5f4ef]"
                }`}
              >
                <span className="text-[9px] text-[#6c727f] group-hover:text-[#d8ff43] transition-colors">
                  {link.num}
                </span>
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d8ff43] ml-0.5" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions + AI Concierge + Account Vault + Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* AI Concierge Chatbot Trigger */}
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              title="Open Kat-Made AI Concierge"
              className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all rounded shadow-[0_0_12px_rgba(6,182,212,0.25)] cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden md:inline">AI Concierge</span>
            </button>
          )}

          {/* Account & Firestore Vault Trigger */}
          {onOpenAccount && (
            <button
              onClick={onOpenAccount}
              title={user ? `Signed in as ${user.displayName || user.email}` : "Sign in / Database Vault"}
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono uppercase tracking-wider border rounded transition-all cursor-pointer ${
                user
                  ? "bg-zinc-900 border-emerald-500/50 text-emerald-300 hover:bg-zinc-800"
                  : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
              }`}
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-4 h-4 rounded-full object-cover" />
              ) : (
                <UserIcon className="w-3.5 h-3.5 text-zinc-400" />
              )}
              <span className="hidden md:inline">{user ? "Vault" : "Sign In"}</span>
            </button>
          )}

          <button
            onClick={() => onOpenInquiry("Header Bespoke Inquiry")}
            className="hidden xl:inline-flex items-center justify-center gap-2 px-3.5 py-2 text-[11px] font-sans-grotesk uppercase font-bold tracking-wider text-[#070707] bg-[#d8ff43] border border-[#d8ff43] hover:bg-transparent hover:text-[#d8ff43] transition-all duration-200 cursor-pointer shadow-[2px_2px_0_#ff67bd] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none whitespace-nowrap shrink-0"
          >
            <span>Bespoke</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Trendy, Advanced Dynamic Menu Button (Opens Full Immersive Navigation) */}
          <button
            onClick={() => setNavOverlayOpen(true)}
            aria-label="Open Navigation Hub"
            className="group relative flex items-center gap-2.5 py-2 px-3 sm:px-3.5 bg-[#111217] text-[#d8ff43] border border-[#d8ff43]/50 hover:border-[#d8ff43] hover:bg-[#d8ff43] hover:text-[#070707] transition-all duration-200 cursor-pointer shadow-[3px_3px_0_#ff67bd] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            {/* Visual 3-bar animated hamburger symbol */}
            <div className="flex flex-col gap-1 w-4 sm:w-4.5 justify-center">
              <span className="block h-[2px] w-full bg-current transition-transform duration-200 group-hover:translate-x-0.5" />
              <span className="block h-[2px] w-3/4 bg-current transition-transform duration-200 group-hover:w-full" />
              <span className="block h-[2px] w-full bg-current transition-transform duration-200 group-hover:-translate-x-0.5" />
            </div>

            {/* Clear label */}
            <span className="font-sans-grotesk text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
              MENU
            </span>
          </button>
        </div>
      </header>

      {/* Full-Screen Dynamic Immersive Navigation Hub */}
      <NavigationOverlay
        isOpen={navOverlayOpen}
        onClose={() => setNavOverlayOpen(false)}
        onOpenInquiry={onOpenInquiry}
        onSelectSpecimen={onSelectSpecimen}
        activeSection={activeSection}
        specimens={specimens}
      />
    </>
  );
}

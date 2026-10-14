import { useState, useEffect } from "react";
import { MessageSquare, Bot, Sparkles } from "lucide-react";
import TopStrip from "./components/TopStrip";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PatternGarden from "./components/PatternGarden";
import ShopIntegration from "./components/ShopIntegration";
import LookbookSection from "./components/LookbookSection";
import PatternSandbox from "./components/PatternSandbox";
import AboutSection from "./components/AboutSection";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import SpecimenModal from "./components/SpecimenModal";
import InquiryModal from "./components/InquiryModal";
import PatternManagerModal from "./components/PatternManagerModal";
import ChatbotDrawer from "./components/ChatbotDrawer";
import AccountDrawer from "./components/AccountDrawer";
import HypnoWaveBackground from "./components/HypnoWaveBackground";
import { SPECIMENS } from "./data/patterns";
import { PatternSpecimen } from "./types";
import { fetchServerPatterns, getAllStoredPatterns, savePatternLocally, syncPatternToServer } from "./utils/patternStorage";

export default function App() {
  const [specimensList, setSpecimensList] = useState<PatternSpecimen[]>(SPECIMENS);
  const [selectedSpecimen, setSelectedSpecimen] = useState<PatternSpecimen | null>(null);
  const [sandboxSpecimen, setSandboxSpecimen] = useState<PatternSpecimen>(SPECIMENS[1] || SPECIMENS[0]);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryNotes, setInquiryNotes] = useState("");
  const [patternManagerOpen, setPatternManagerOpen] = useState(false);
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("specimens");

  // On initial mount, restore any locked/saved patterns from server disk AND IndexedDB
  useEffect(() => {
    async function loadPatterns() {
      try {
        const [serverPatterns, localPatterns] = await Promise.all([
          fetchServerPatterns(),
          getAllStoredPatterns(),
        ]);
        const combined = { ...serverPatterns, ...localPatterns };
        if (Object.keys(combined).length > 0) {
          setSpecimensList((prev) =>
            prev.map((s) => (combined[s.id] ? { ...s, imageUrl: combined[s.id] } : s))
          );
        }
      } catch (err) {
        console.warn("Error loading persisted patterns", err);
      }
    }
    loadPatterns();
  }, []);

  const heroSpecimen = specimensList[0] || SPECIMENS[0];

  const handleUpdateSpecimenImage = async (specimenId: string, newImageUrl: string) => {
    // 1. Update React state immediately
    setSpecimensList((prev) =>
      prev.map((s) => (s.id === specimenId ? { ...s, imageUrl: newImageUrl } : s))
    );
    setSelectedSpecimen((prev) =>
      prev?.id === specimenId ? { ...prev, imageUrl: newImageUrl } : prev
    );
    setSandboxSpecimen((prev) =>
      prev?.id === specimenId ? { ...prev, imageUrl: newImageUrl } : prev
    );

    // 2. Persist to browser IndexedDB so it never disappears on refresh
    await savePatternLocally(specimenId, newImageUrl);

    // 3. Sync to server disk endpoint (/public/patterns)
    const serverUrl = await syncPatternToServer(specimenId, newImageUrl);
    if (serverUrl) {
      setSpecimensList((prev) =>
        prev.map((s) => (s.id === specimenId ? { ...s, imageUrl: serverUrl } : s))
      );
    }
  };

  const handleOpenInquiry = (notes = "") => {
    setInquiryNotes(notes);
    setInquiryModalOpen(true);
  };

  const handleOpenSandboxWithSpecimen = (specimen: PatternSpecimen) => {
    setSandboxSpecimen(specimen);
    const sandboxEl = document.getElementById("sandbox");
    if (sandboxEl) {
      sandboxEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["specimens", "shops", "lookbook", "sandbox", "about"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f5f4ef] flex flex-col font-sans-grotesk selection:bg-[#d8ff43] selection:text-[#070707]">
      {/* Hypnotic Breathing Wave Background Dots */}
      <HypnoWaveBackground />

      {/* Top Announcement Strip with Pattern Manager Button */}
      <TopStrip
        onOpenInquiry={() => handleOpenInquiry("Trade Commission Inquiry")}
        onOpenPatternManager={() => setPatternManagerOpen(true)}
      />

      {/* Main Sticky Header */}
      <Header
        onOpenInquiry={() => handleOpenInquiry("General Bespoke Inquiry")}
        onSelectSpecimen={(specimen) => setSelectedSpecimen(specimen)}
        activeSection={activeSection}
        specimens={specimensList}
        onOpenChat={() => setChatDrawerOpen(true)}
        onOpenAccount={() => setAccountDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          heroSpecimen={heroSpecimen}
          onSelectSpecimen={(specimen) => setSelectedSpecimen(specimen)}
          onOpenInquiry={() => handleOpenInquiry("Hero Section Commission Inquiry")}
        />

        {/* Pattern Garden Archive */}
        <PatternGarden
          specimens={specimensList}
          onSelectSpecimen={(specimen) => setSelectedSpecimen(specimen)}
          onOpenSandboxWithSpecimen={handleOpenSandboxWithSpecimen}
        />

        {/* Displate & Contrado Official Storefronts */}
        <ShopIntegration
          onSampleInquiry={() => handleOpenInquiry("Designer Sample Swatch Box Request")}
        />

        {/* Spatial Lookbook / Interior Architecture */}
        <LookbookSection
          onOpenInquiry={(subject) => handleOpenInquiry(subject || "Lookbook Architectural Installation")}
        />

        {/* Interactive Pattern Sandbox Repeat Simulator */}
        <PatternSandbox
          specimens={specimensList}
          activeSpecimen={sandboxSpecimen}
          onSelectSpecimen={(specimen) => setSandboxSpecimen(specimen)}
          onOpenInquiry={(notes) => handleOpenInquiry(notes || "Pattern Sandbox Custom Scale")}
          onUpdateSpecimenImage={handleUpdateSpecimenImage}
        />

        {/* About Kathleen Raft & Kat-Made Studio */}
        <AboutSection
          onOpenInquiry={() => handleOpenInquiry("Artist Collaboration & Custom Project")}
        />

        {/* Blog & 2026 Trend Report: The Rise of Psychedelic Maximalism */}
        <BlogSection
          onOpenInquiry={(note) => handleOpenInquiry(note || "Trend Report Licensing Inquiry")}
        />
      </main>

      {/* Footer */}
      <Footer onOpenInquiry={() => handleOpenInquiry("Footer Commission Inquiry")} />

      {/* Floating Kat-Made AI Concierge Bubble (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setChatDrawerOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-pink-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7)] transition-all transform hover:-translate-y-1 cursor-pointer border border-white/20"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
          </span>
          <Bot className="w-4 h-4 text-white" />
          <span>AI Concierge</span>
        </button>
      </div>

      {/* Specimen Detail Modal / Lightbox */}
      <SpecimenModal
        specimen={selectedSpecimen}
        onClose={() => setSelectedSpecimen(null)}
        onOpenInquiryForSpecimen={(specimen) =>
          handleOpenInquiry(`Inquiry for Specimen #${specimen.number} (${specimen.title})`)
        }
        onOpenSandbox={(specimen) => handleOpenSandboxWithSpecimen(specimen)}
        onUpdateSpecimenImage={handleUpdateSpecimenImage}
      />

      {/* Bespoke Project & Commission Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialNotes={inquiryNotes}
        patternId={selectedSpecimen?.id}
        patternName={selectedSpecimen?.title}
      />

      {/* Pattern Locker & Asset Manager Modal */}
      <PatternManagerModal
        isOpen={patternManagerOpen}
        onClose={() => setPatternManagerOpen(false)}
        specimens={specimensList}
        onUpdateSpecimenImage={handleUpdateSpecimenImage}
      />

      {/* Gemini AI Concierge Chatbot Drawer */}
      <ChatbotDrawer
        isOpen={chatDrawerOpen}
        onClose={() => setChatDrawerOpen(false)}
        onOpenInquiry={(note) => handleOpenInquiry(note || "AI Concierge Consultation")}
      />

      {/* Account & Firestore Database Vault Drawer */}
      <AccountDrawer
        isOpen={accountDrawerOpen}
        onClose={() => setAccountDrawerOpen(false)}
        specimens={specimensList}
        onSelectSpecimen={(specimen) => setSelectedSpecimen(specimen)}
        onOpenInquiry={handleOpenInquiry}
      />
    </div>
  );
}

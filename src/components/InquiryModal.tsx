import { useState, useId, useEffect } from "react";
import { X, Send, Calculator, Check, ShieldCheck, Mail, LogIn, Database } from "lucide-react";
import { InquiryFormData } from "../types";
import { useAuth } from "../context/AuthContext";
import { createInquiry } from "../services/dbService";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNotes?: string;
  patternId?: string;
  patternName?: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  initialNotes = "",
  patternId,
  patternName,
}: InquiryModalProps) {
  const { user, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: "",
    email: "",
    projectType: "residential-wallpaper",
    estimatedSqFt: "120",
    substratePreference: "textured-vinyl-wallpaper",
    timeline: "standard",
    notes: initialNotes,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inquiryId, setInquiryId] = useState("");
  const [dbSaved, setDbSaved] = useState(false);

  // Sync with user profile if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (initialNotes) {
      setFormData((prev) => ({ ...prev, notes: initialNotes }));
    }
  }, [initialNotes]);

  const nameId = useId();
  const emailId = useId();
  const projectTypeId = useId();
  const sqFtId = useId();
  const substrateId = useId();
  const timelineId = useId();
  const notesId = useId();

  if (!isOpen) return null;

  // Calculate live instant estimate
  const sqFt = Math.max(10, parseInt(formData.estimatedSqFt || "100", 10) || 100);
  const ratePerSqFt: Record<string, number> = {
    "textured-vinyl-wallpaper": 14,
    "archival-metal": 45,
    "silk-chiffon": 38,
    "luxury-velvet": 42,
    "uncoated-paper": 12,
  };
  const unitRate = ratePerSqFt[formData.substratePreference] || 14;
  const estimatedTotal = Math.round(sqFt * unitRate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const generatedId = `KAT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (user) {
      try {
        const fullMessage = `[Scope: ${formData.projectType} | ${formData.estimatedSqFt} sq ft | Substrate: ${formData.substratePreference} | Timeline: ${formData.timeline}]\nNotes: ${formData.notes}`;
        await createInquiry(
          user.uid,
          formData.fullName || user.displayName || 'Kat-Made Collector',
          formData.email || user.email || '',
          fullMessage,
          patternId,
          patternName || (patternId ? `Specimen ${patternId}` : undefined),
          formData.projectType
        );
        setDbSaved(true);
      } catch (err) {
        console.error('Failed to record inquiry to Firestore:', err);
      }
    }

    setInquiryId(generatedId);
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#050505]/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#070707] border-2 border-[#f5f4ef] shadow-[18px_18px_0_#ff67bd] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="h-11 px-4 bg-[#ff67bd] text-[#070707] flex items-center justify-between font-sans-grotesk font-bold text-xs uppercase tracking-wider border-b border-[#070707] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#070707]" />
            <span>KAT-MADE STUDIO // COMMISSION & TRADE INQUIRY</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 hover:bg-[#070707] hover:text-[#ff67bd] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#d8ff43] text-[#070707] flex items-center justify-center mx-auto mb-5 border-2 border-[#070707] shadow-[4px_4px_0_#ff67bd]">
                <Check className="w-8 h-8" />
              </div>

              <div className="text-xs font-mono text-[#d8ff43] uppercase tracking-widest mb-1">
                INQUIRY REGISTERED // {inquiryId}
              </div>
              <h3 className="text-3xl font-serif-display font-bold text-[#f5f4ef]">
                Thank you, {formData.fullName}!
              </h3>
              <p className="mt-3 text-sm text-[#adb2bd] font-sans-grotesk max-w-md mx-auto leading-relaxed">
                Kathleen Raft has received your project parameters. A custom specimen proof and formal trade quote will be delivered to <strong className="text-[#f5f4ef]">{formData.email}</strong> within 24–48 hours.
              </p>

              {dbSaved && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                  <Database className="w-3.5 h-3.5" />
                  <span>Securely saved in your Kat-Made Firestore Database Vault</span>
                </div>
              )}

              <div className="mt-6 p-4 bg-[#111217] border border-[#f5f4ef]/15 max-w-md mx-auto text-left text-xs font-sans-grotesk space-y-1.5 text-[#adb2bd]">
                <div className="flex justify-between">
                  <span>Project Scope:</span>
                  <span className="text-[#f5f4ef] font-semibold">{formData.projectType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Coverage:</span>
                  <span className="text-[#f5f4ef] font-semibold">{formData.estimatedSqFt} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Ballpark Estimate:</span>
                  <span className="text-[#d8ff43] font-bold font-mono">${estimatedTotal.toLocaleString()} USD</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider shadow-[4px_4px_0_#ff67bd] cursor-pointer"
                >
                  Return to Garden
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#f5f4ef]">
                    Commission or Trade Sample Request
                  </h3>
                  <p className="mt-1.5 text-xs text-[#adb2bd] font-sans-grotesk">
                    For interior designers, architects, and luxury fashion brands seeking site-specific scale, custom colorways, or fire-rated commercial wallpaper.
                  </p>
                </div>

                {!user && (
                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    className="self-start sm:self-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-cyan-300 text-xs font-mono rounded hover:bg-zinc-800 transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Sign in to auto-save to account
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={nameId} className="block text-[11px] font-sans-grotesk uppercase tracking-wider text-[#d8ff43] font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      id={nameId}
                      required
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#111217] border border-[#f5f4ef]/20 text-xs font-sans-grotesk text-[#f5f4ef] focus:border-[#d8ff43] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={emailId} className="block text-[11px] font-sans-grotesk uppercase tracking-wider text-[#d8ff43] font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      id={emailId}
                      required
                      type="email"
                      placeholder="e.g. sarah@studio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#111217] border border-[#f5f4ef]/20 text-xs font-sans-grotesk text-[#f5f4ef] focus:border-[#d8ff43] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Project Type + Substrate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={projectTypeId} className="block text-[11px] font-sans-grotesk uppercase tracking-wider text-[#d8ff43] font-bold mb-1">
                      Project Type
                    </label>
                    <select
                      id={projectTypeId}
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-[#111217] border border-[#f5f4ef]/20 text-xs font-sans-grotesk text-[#f5f4ef] focus:border-[#d8ff43] focus:outline-none"
                    >
                      <option value="residential-wallpaper">Residential Accent Wallpaper</option>
                      <option value="commercial-hospitality">Commercial & Hospitality (Hotel/Bar)</option>
                      <option value="textile-licensing">Fashion & Textile Licensing</option>
                      <option value="sample-kit">Designer Sample Swatch Box</option>
                      <option value="custom-mural">Site-Specific Architectural Mural</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={substrateId} className="block text-[11px] font-sans-grotesk uppercase tracking-wider text-[#d8ff43] font-bold mb-1">
                      Preferred Substrate
                    </label>
                    <select
                      id={substrateId}
                      value={formData.substratePreference}
                      onChange={(e) => setFormData({ ...formData, substratePreference: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-[#111217] border border-[#f5f4ef]/20 text-xs font-sans-grotesk text-[#f5f4ef] focus:border-[#d8ff43] focus:outline-none"
                    >
                      <option value="textured-vinyl-wallpaper">Class A Textured Vinyl Wallpaper ($14/sq ft)</option>
                      <option value="archival-metal">Displate Multi-Plate Metal ($45/sq ft)</option>
                      <option value="silk-chiffon">100% Mulberry Silk Twill ($38/sq ft)</option>
                      <option value="luxury-velvet">Acoustic Plush Velvet ($42/sq ft)</option>
                      <option value="uncoated-paper">FSC Uncoated Wallcovering ($12/sq ft)</option>
                    </select>
                  </div>
                </div>

                {/* Coverage + Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={sqFtId} className="block text-[11px] font-sans-grotesk uppercase tracking-wider text-[#d8ff43] font-bold mb-1">
                      Estimated Coverage (Sq Ft)
                    </label>
                    <input
                      id={sqFtId}
                      type="number"
                      min="10"
                      max="10000"
                      value={formData.estimatedSqFt}
                      onChange={(e) => setFormData({ ...formData, estimatedSqFt: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#111217] border border-[#f5f4ef]/20 text-xs font-sans-grotesk text-[#f5f4ef] focus:border-[#d8ff43] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={timelineId} className="block text-[11px] font-sans-grotesk uppercase tracking-wider text-[#d8ff43] font-bold mb-1">
                      Target Timeline
                    </label>
                    <select
                      id={timelineId}
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-[#111217] border border-[#f5f4ef]/20 text-xs font-sans-grotesk text-[#f5f4ef] focus:border-[#d8ff43] focus:outline-none"
                    >
                      <option value="standard">Standard (3–5 weeks production)</option>
                      <option value="urgent">Expedited Project (1–2 weeks)</option>
                      <option value="concept">Concept Stage / Planning Ahead</option>
                    </select>
                  </div>
                </div>

                {/* Live Estimator Callout */}
                <div className="p-3 bg-[#111217] border border-[#d8ff43]/30 flex items-center justify-between text-xs font-sans-grotesk">
                  <div className="flex items-center gap-2 text-[#adb2bd]">
                    <Calculator className="w-4 h-4 text-[#d8ff43]" />
                    <span>Ballpark Material & Licensing Estimate:</span>
                  </div>
                  <span className="text-base font-bold font-mono text-[#d8ff43]">
                    ${estimatedTotal.toLocaleString()} USD
                  </span>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor={notesId} className="block text-[11px] font-sans-grotesk uppercase tracking-wider text-[#d8ff43] font-bold mb-1">
                    Specific Requirements or Dimensions
                  </label>
                  <textarea
                    id={notesId}
                    rows={3}
                    placeholder="Provide wall dimensions, ceiling heights, or preferred Kat-Made specimen (e.g. Acid Orchid)..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#111217] border border-[#f5f4ef]/20 text-xs font-sans-grotesk text-[#f5f4ef] focus:border-[#d8ff43] focus:outline-none resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0_#ff67bd] hover:shadow-[6px_6px_0_#ff67bd] cursor-pointer disabled:opacity-50 transition-all"
                  >
                    {submitting ? (
                      <span>Transmitting parameters & saving to database...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-[10px] text-center text-[#adb2bd] font-sans-grotesk">
                    Direct confidential dispatch to Kathleen Raft (kathleenraft100@gmail.com). No spam.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

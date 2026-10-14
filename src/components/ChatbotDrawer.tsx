import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User as UserIcon,
  RotateCcw,
  LogIn,
  ChevronRight,
  ShieldCheck,
  Palette,
  Layers,
  FileCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  createConversation,
  addChatMessage,
  subscribeToMessages,
  ChatMessageRecord,
} from '../services/dbService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: (note?: string) => void;
}

const QUICK_PROMPTS = [
  {
    icon: Sparkles,
    label: 'Hypno Chrome Garden Collection',
    prompt: 'Can you give me an overview of all 10 patterns in the Hypno Chrome Garden collection and Kathleen Raft’s artistic concept?',
  },
  {
    icon: Layers,
    label: 'Technical Repeat Specifications',
    prompt: 'What are the technical repeat specs, resolution, and DPI for printing patterns like Chrome Garden Vortex on silk vs technical fabrics?',
  },
  {
    icon: Palette,
    label: 'Bespoke Colorway Adaptations',
    prompt: 'How does Kathleen Raft handle bespoke colorway adaptations and custom surface commissions for fashion or interiors?',
  },
  {
    icon: FileCheck,
    label: 'Licensing Tiers & Commercial Rights',
    prompt: 'What licensing tiers are available for commercial apparel, wallpaper, and exclusive luxury collections?',
  },
];

export default function ChatbotDrawer({ isOpen, onClose, onOpenInquiry }: ChatbotDrawerProps) {
  const { user, signInWithGoogle } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        'Welcome to **Kat-Made Studio**. I am your **Hypno Chrome AI Concierge**.\n\nAsk me anything about Kathleen Raft’s 10-pattern **Hypno Chrome Garden** collection, repeat mechanics, fabric & substrate suitability, or bespoke colorway commissioning.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Sync with Firestore when authenticated
  useEffect(() => {
    if (!user) {
      setConversationId(null);
      return;
    }

    let isMounted = true;
    let unsubscribeMessages: (() => void) | undefined;

    async function initUserChat() {
      if (!user) return;
      try {
        const convId = await createConversation(user.uid, 'Hypno Chrome Studio Consultation');
        if (!isMounted) return;
        setConversationId(convId);

        // Store welcome message
        await addChatMessage(
          user.uid,
          convId,
          'assistant',
          'Welcome to Kat-Made Studio! Your conversation history is securely synced to your cloud account.'
        );

        unsubscribeMessages = subscribeToMessages(user.uid, convId, (dbMsgs: ChatMessageRecord[]) => {
          if (dbMsgs.length > 0) {
            setMessages(
              dbMsgs.map((m) => ({
                id: m.id,
                role: m.role,
                content: m.content,
                timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              }))
            );
          }
        });
      } catch (err) {
        console.error('Error initializing user chat in Firestore:', err);
      }
    }

    initUserChat();

    return () => {
      isMounted = false;
      if (unsubscribeMessages) unsubscribeMessages();
    };
  }, [user]);

  const handleSend = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || isSending) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Optimistically update UI
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsSending(true);

    // Save to Firestore if user is authenticated and conversation exists
    if (user && conversationId) {
      try {
        await addChatMessage(user.uid, conversationId, 'user', promptText);
      } catch (err) {
        console.error('Failed to sync user message to Firestore:', err);
      }
    }

    try {
      // Build history payload for Gemini API
      const historyPayload = updatedMessages
        .filter((m) => m.id !== 'welcome-1')
        .slice(-10)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload,
          userEmail: user?.email || undefined,
          userName: user?.displayName || undefined,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();
      const assistantText = data.reply || 'Thank you for your inquiry. How else may I assist with your design project?';

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: assistantText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Save to Firestore if authenticated
      if (user && conversationId) {
        try {
          await addChatMessage(user.uid, conversationId, 'assistant', assistantText);
        } catch (err) {
          console.error('Failed to sync assistant message to Firestore:', err);
        }
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      const errMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Concierge Notice**: ${error?.message || 'Unable to connect to the Gemini service right now. Please ensure your GEMINI_API_KEY is configured in AI Studio Secrets.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content:
          'Conversation refreshed. Ask anything about the **Hypno Chrome Garden** collection, licensing, or custom colorways.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in">
      <div className="w-full max-w-xl h-full bg-zinc-950/95 border-l border-cyan-500/30 shadow-2xl flex flex-col relative overflow-hidden">
        {/* Holographic accent glow lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 via-cyan-400 to-lime-400 animate-pulse pointer-events-none" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/30 to-pink-500/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-sm tracking-widest text-zinc-100 font-bold uppercase">
                  Kat-Made AI Concierge
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                  GEMINI 3.8
                </span>
              </div>
              <p className="text-xs text-zinc-400">Surface Pattern Design & Hypno Chrome Specialist</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              title="Reset conversation"
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Close chat"
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Persistence Status Bar */}
        <div className="px-6 py-2 bg-zinc-900/40 border-b border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400 relative z-10">
          {user ? (
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">Synced to Firestore ({user.email})</span>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="font-mono text-[11px] text-zinc-400">Guest mode (History is temporary)</span>
              <button
                onClick={signInWithGoogle}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono transition-colors"
              >
                <LogIn className="w-3 h-3" />
                Sign in to save chat
              </button>
            </div>
          )}
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 custom-scrollbar">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 mt-1">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md'
                    : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800 rounded-tl-none shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm space-y-1">
                  {m.content.split('\n').map((line, i) => {
                    // Simple inline bold formatting
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={i} className="min-h-[1.2em]">
                        {parts.map((part, pIdx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                              <strong key={pIdx} className="font-semibold text-cyan-300">
                                {part.slice(2, -2)}
                              </strong>
                            );
                          }
                          return part;
                        })}
                      </p>
                    );
                  })}
                </div>
                <div
                  className={`text-[10px] mt-2 font-mono ${
                    m.role === 'user' ? 'text-cyan-200/70 text-right' : 'text-zinc-500 text-left'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300 mt-1">
                  <UserIcon className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                <Bot className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 text-xs font-mono text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Kat-Made Concierge analyzing pattern database...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-2 border-t border-zinc-800/80 bg-zinc-950/60 overflow-x-auto relative z-10 flex gap-2 no-scrollbar">
          {QUICK_PROMPTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSend(item.prompt)}
                disabled={isSending}
                className="whitespace-nowrap shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/50 text-[11px] text-zinc-300 hover:text-cyan-300 transition-all cursor-pointer font-mono"
              >
                <Icon className="w-3 h-3 text-cyan-400" />
                <span>{item.label}</span>
                <ChevronRight className="w-2.5 h-2.5 opacity-50" />
              </button>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/90 backdrop-blur-md relative z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about repeat specs, fabrics, bespoke colorways..."
              disabled={isSending}
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {onOpenInquiry && (
            <div className="mt-2 text-center">
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry('From AI Concierge Consultation: Bespoke Inquiry');
                }}
                className="text-[11px] font-mono text-zinc-400 hover:text-pink-400 transition-colors underline underline-offset-4"
              >
                Ready for a bespoke quote? Click to launch Formal Commission Inquiry →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

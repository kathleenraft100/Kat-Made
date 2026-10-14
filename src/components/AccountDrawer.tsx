import React, { useState, useEffect } from 'react';
import {
  X,
  User as UserIcon,
  LogOut,
  LogIn,
  Heart,
  FileText,
  Clock,
  Sparkles,
  Trash2,
  ExternalLink,
  Shield,
  Layers,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  FavoriteItem,
  InquiryRecord,
  subscribeToFavorites,
  subscribeToUserInquiries,
  removeFavorite,
} from '../services/dbService';
import { PatternSpecimen } from '../types';
import { WatermarkedImage } from './WatermarkedImage';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  specimens: PatternSpecimen[];
  onSelectSpecimen: (specimen: PatternSpecimen) => void;
  onOpenInquiry: (note?: string) => void;
}

export default function AccountDrawer({
  isOpen,
  onClose,
  specimens,
  onSelectSpecimen,
  onOpenInquiry,
}: AccountDrawerProps) {
  const { user, userProfile, signInWithGoogle, signOutUser, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'favorites' | 'inquiries'>('favorites');
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setInquiries([]);
      return;
    }

    const unsubFav = subscribeToFavorites(user.uid, (favs) => setFavorites(favs));
    const unsubInq = subscribeToUserInquiries(user.uid, (inqs) => setInquiries(inqs));

    return () => {
      unsubFav();
      unsubInq();
    };
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in">
      <div className="w-full max-w-lg h-full bg-zinc-950/95 border-l border-zinc-800 shadow-2xl flex flex-col relative overflow-hidden">
        {/* Holographic header accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-pink-500 to-lime-400 pointer-events-none" />

        {/* Drawer Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-5 h-5 text-zinc-400" />
              )}
            </div>
            <div>
              <h3 className="font-mono text-sm tracking-widest text-zinc-100 font-bold uppercase">
                {user ? user.displayName || 'Kat-Made Collector' : 'Studio Account & Vault'}
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                {user ? user.email : 'Sign in with Google for cloud sync'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication Card */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-900/30">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Shield className="w-4 h-4" />
                <span>Connected to Firebase Auth & Firestore</span>
              </div>
              <button
                onClick={signOutUser}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="text-center py-2 space-y-3">
              <p className="text-xs text-zinc-400 font-sans">
                Sign in with Google to bookmark your favorite patterns, save bespoke inquiries, and sync custom notes directly into your Kat-Made database vault.
              </p>
              <button
                onClick={signInWithGoogle}
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-mono tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <LogIn className="w-4 h-4" />
                Sign In with Google
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        {user && (
          <div className="flex border-b border-zinc-800 bg-zinc-900/40">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-colors ${
                activeTab === 'favorites'
                  ? 'border-pink-500 text-pink-400 bg-pink-500/10'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Saved Patterns ({favorites.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-colors ${
                activeTab === 'inquiries'
                  ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inquiries ({inquiries.length})</span>
            </button>
          </div>
        )}

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {!user ? (
            <div className="text-center py-16 space-y-4 text-zinc-500">
              <Sparkles className="w-12 h-12 mx-auto text-zinc-700 animate-pulse" />
              <p className="text-sm font-mono">Your Firestore vault will appear here once signed in.</p>
            </div>
          ) : activeTab === 'favorites' ? (
            favorites.length === 0 ? (
              <div className="text-center py-16 space-y-3 text-zinc-500">
                <Heart className="w-10 h-10 mx-auto text-zinc-700" />
                <p className="text-sm font-mono">No patterns favorited yet.</p>
                <p className="text-xs text-zinc-600">
                  Open any specimen from the 10-pattern Hypno Chrome Garden collection and click "Bookmark to Cloud".
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {favorites.map((fav) => {
                  const matchSpecimen = specimens.find((s) => s.id === fav.patternId);
                  return (
                    <div
                      key={fav.id}
                      className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-pink-500/40 transition-all flex items-start gap-4"
                    >
                      {matchSpecimen && (
                        <div
                          onClick={() => {
                            onClose();
                            onSelectSpecimen(matchSpecimen);
                          }}
                          className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-800 shrink-0 cursor-pointer border border-zinc-700 group relative"
                        >
                          <WatermarkedImage
                            src={matchSpecimen.imageUrl}
                            alt={matchSpecimen.title}
                            watermarkDensity="subtle"
                            badgePosition="none"
                            className="w-full h-full"
                            imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4
                            onClick={() => {
                              if (matchSpecimen) {
                                onClose();
                                onSelectSpecimen(matchSpecimen);
                              }
                            }}
                            className="font-mono text-sm font-bold text-zinc-100 hover:text-pink-400 cursor-pointer truncate"
                          >
                            {fav.patternName}
                          </h4>
                          <button
                            onClick={() => removeFavorite(user.uid, fav.id)}
                            title="Remove from favorites"
                            className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {fav.userNotes && (
                          <p className="text-xs text-zinc-300 mt-1 italic font-sans bg-zinc-950/60 p-2 rounded border border-zinc-800/80">
                            "{fav.userNotes}"
                          </p>
                        )}

                        <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(fav.createdAt).toLocaleDateString()}
                          </span>
                          {matchSpecimen && (
                            <button
                              onClick={() => {
                                onClose();
                                onSelectSpecimen(matchSpecimen);
                              }}
                              className="text-cyan-400 hover:underline flex items-center gap-1"
                            >
                              Inspect Specimen <ExternalLink className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* Inquiries Tab */
            inquiries.length === 0 ? (
              <div className="text-center py-16 space-y-3 text-zinc-500">
                <FileText className="w-10 h-10 mx-auto text-zinc-700" />
                <p className="text-sm font-mono">No bespoke inquiries recorded yet.</p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenInquiry();
                  }}
                  className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono hover:bg-cyan-500/30 transition-colors"
                >
                  Create Custom Commission Inquiry
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-zinc-200">
                        {inq.patternName || inq.projectType || 'Bespoke Inquiry'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        {inq.status}
                      </span>
                    </div>

                    <p className="text-zinc-300 font-sans leading-relaxed whitespace-pre-wrap bg-zinc-950/60 p-2.5 rounded border border-zinc-800/80">
                      {inq.message}
                    </p>

                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>Submitted: {new Date(inq.createdAt).toLocaleDateString()}</span>
                      <span>ID: {inq.id.slice(0, 12)}...</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

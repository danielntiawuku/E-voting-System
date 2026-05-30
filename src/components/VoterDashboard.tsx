/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Menu,
  School,
  User,
  Check,
  ExternalLink,
  Shield,
  HelpCircle,
  X,
  FileText,
  Lock,
  Vote,
  Users,
  Award,
  BarChart2,
  Settings,
  ShieldAlert,
  Verified,
  Loader2,
} from 'lucide-react';
import { Candidate, ScreenType } from '../types';

interface VoterDashboardProps {
  onNavigate: (screen: ScreenType) => void;
  onCastVote: (candidateId: string) => void;
  votedCandidateId: string | null;
}

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Abena Osei',
    level: 'Level 400',
    major: 'Computer Science',
    manifesto:
      'Empowering the student body by building centralized digital feedback trackers, securing modernized equipment for campus computer laboratories, and launching annual campus hackathons integrated with tech industry leaders.',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuKmzQTBdUlzPHyu18HzNYKWp1CuqyFURs-lNJY7ExVnSER6LxiT1UOy4AXULb37CSgVPtWK4lV3JxiDIJcUwI2h4Q0o1kKiE09VlJhCbNXL5a2D36nsCpYHr6-QydifJChx9nDeHZRGNSI7Er302jIW12dvekCYqG3gkkhHSheq7EaZNKVvnpUE1uq4il250xQO1rshrM_qhPVB74C--mpRbLlUC-cSgCJdrMo5U9zB8PdUh4TJpwT1yBf8arQGxqp60XBXidr92-',
    votes: 1894,
  },
  {
    id: 'cand-2',
    name: 'Kwame Appiah',
    level: 'Level 300',
    major: 'Telecommunications',
    manifesto:
      'Our focus is high-speed network reliability and accessible computing. Connecting all auditoriums with robust, schoolwide fiber Wi-Fi and establishing student representation directly in college broadband investment panels.',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhJuqXghB2PldkzaT9wFresW6Kvw0G5O6LF8OLeAx1xuQjciqWog4Re3XEk2aY-Jtn4UhVXSULwSV7lVMdbHdXLthdY3UhUMNQWkLG0EAtg83gEFL4yzyqPSTzQrcDZyaxFVd-0_BGbl6KaLJPdfjNZ59Kw6JSjXldIVX3qBbNnKrkG5NgUbzntvs2PiSOtRl0zZ6LSyMFoyZ4NP6BdoUiHpT_MXUifr3J7FRfz6yh8npOl0tUQJ-76448FgMzT4cfgecPPbJe22Ml',
    votes: 1540,
  },
  {
    id: 'cand-3',
    name: 'Naa Lamiley',
    level: 'Level 400',
    major: 'IT Management',
    manifesto:
      'Transforming student welfare and administrative transparency. Advocating for responsive student micro-grants, simplified scholarship databases, and establishing modern, inclusive workspaces for group collaboration.',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbJBUnPfjHqjrUezkmzl7_-nrBeeQKShT2VHGvIt8uZWCqFbA8WDR-oZFaaG_WZA9_iH0gE1sS8yNPeq4l8flrmzjUzo4C7c8AbMJdV_QyUNUd84wCdmo6BsanY8CcVMXUU-jw8xkMXdj9R4CfUP12JHdEr4y_A2QSvhtPnud7Xe71Lr8i6_1_-QudAt37kJTo6nJIE3w12Q3PSQpAqYNrANZ1lQ1ny54phLuUlrKwVT-s-GEjGYeBjKcoQAba2xCsxqKTKqRMUuAL',
    votes: 847,
  },
];

export default function VoterDashboard({ onNavigate, onCastVote, votedCandidateId }: VoterDashboardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(votedCandidateId);
  const [activeManifesto, setActiveManifesto] = useState<Candidate | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const selectedCandidateName = INITIAL_CANDIDATES.find((c) => c.id === selectedId)?.name;

  const handleCastVoteClick = () => {
    if (!selectedId) return;
    setShowConfirmModal(true);
  };

  const confirmFinalVote = () => {
    if (!selectedId) return;
    setIsSubmittingVote(true);
    setTimeout(() => {
      onCastVote(selectedId);
      setIsSubmittingVote(false);
      setShowConfirmModal(false);
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
        onNavigate('results');
      }, 1500);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-4 md:px-12 py-4 bg-surface shadow-sm border-b border-outline-variant/30">
        <div className="flex items-center gap-4">
          <button className="text-primary hover:bg-surface-container-high p-2 rounded-full transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <School className="text-primary w-6 h-6" />
            <h1 className="text-xl font-bold text-primary">GTU e-Vote</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-on-surface">Kofi Mensah</p>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              Verified Voter
            </p>
          </div>
          <img
            alt="Kofi Mensah Profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhWyQDVxCKflEE1MM4Z2j7HMzWhqAf8SRVMh8CZxAKOPrdEOxhMNwxo0HtDXMtDTwwyyKFfFQ63ZD9-0S1M-YUR3v1h7qdrYBmGICQL1kR-UjlAg3mruFyoOMbBHOXzBhDuQRg1kiiyZQ63sWmqmbRVN61mGThhUO5JGAjNXX8CQw2VR3ysXW0MtUvF8ElLOC6ffWkgbDFCZYZPwbRm7u2wXBfxr_IgAEui09p65J8uPnhb_whU8vjZACeu-_yoiO4aBP2nbU5ATWr"
            className="w-10 h-10 rounded-full border-2 border-primary shadow-sm object-cover"
          />
        </div>
      </header>

      {/* Main Page structure */}
      <div className="flex pt-20 pb-24 md:pb-8 min-h-screen">
        {/* Navigation Sidebar (Desktop Only) */}
        <aside className="hidden md:flex fixed left-0 top-20 h-[calc(100vh-80px)] w-80 bg-surface-container-low flex-col p-6 z-30 border-r border-outline-variant/20">
          <nav className="space-y-2">
            <button
              onClick={() => onNavigate('vote')}
              className="w-full text-left bg-secondary-container text-on-secondary-container rounded-full px-4 py-3 flex items-center gap-4 transition-all font-semibold"
            >
              <Vote className="w-5 h-5 fill-secondary-container" />
              <span>Voter Portal</span>
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="w-full text-left text-on-surface-variant hover:bg-surface-container-high rounded-full px-4 py-3 flex items-center gap-4 transition-all font-medium"
            >
              <Users className="w-5 h-5" />
              <span>How It Works</span>
            </button>
            <button
              onClick={() => onNavigate('results')}
              className="w-full text-left text-on-surface-variant hover:bg-surface-container-high rounded-full px-4 py-3 flex items-center gap-4 transition-all font-medium"
            >
              <BarChart2 className="w-5 h-5" />
              <span>Live Results</span>
            </button>
            <button
              onClick={() => onNavigate('restricted')}
              className="w-full text-left text-on-surface-variant hover:bg-surface-container-high rounded-full px-4 py-3 flex items-center gap-4 transition-all font-medium"
            >
              <Award className="w-5 h-5" />
              <span>Registrar Audit</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('reset')}
              className="w-full text-left text-on-surface-variant hover:bg-surface-container-high rounded-full px-4 py-3 flex items-center gap-4 transition-all font-medium"
            >
              <Settings className="w-5 h-5" />
              <span>Control Settings</span>
            </button>
          </nav>

          <div className="mt-auto p-4 bg-primary/5 rounded-2xl border border-primary/15">
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1.5">
              Voting Status
            </p>
            <div className="flex items-center gap-2 text-on-tertiary-container">
              <Check className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wide">
                {votedCandidateId ? 'Ballot Cast' : 'Ready to Vote'}
              </span>
            </div>
          </div>
        </aside>

        {/* Dynamic voting canvas */}
        <main className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-8 md:ml-80">
          <section className="py-6">
            {/* Step navigation bar */}
            <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 rounded-full bg-on-tertiary-container text-white flex items-center justify-center text-sm font-bold">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-on-surface-variant">Identification</span>
              </div>
              <div className="h-0.5 bg-outline-variant w-16 shrink-0"></div>
              <div className="flex items-center gap-3 shrink-0">
                <div className={`w-8 h-8 rounded-full ${votedCandidateId ? 'bg-on-tertiary-container' : 'bg-primary'} text-white flex items-center justify-center text-sm font-bold shadow-md`}>
                  {votedCandidateId ? <Check className="w-4 h-4" /> : '2'}
                </div>
                <span className={`text-sm font-bold ${votedCandidateId ? 'text-on-surface-variant' : 'text-primary'}`}>
                  Selection
                </span>
              </div>
              <div className="h-0.5 bg-outline-variant w-16 shrink-0"></div>
              <div className="flex items-center gap-3 shrink-0 opacity-40">
                <div className="w-8 h-8 rounded-full bg-outline-variant text-white flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="text-sm font-bold text-on-surface-variant">Review</span>
              </div>
            </div>

            {/* Dashboard Headers */}
            <div className="mb-8">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-widest">
                SRC President 2024
              </span>
              <h2 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">
                Cast Your Ballot
              </h2>
              <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
                Review your preferred student representative candidate from the validated nominees below. You can only choose one representative for the Student Representative Council (SRC) Executive Office.
              </p>
            </div>

            {/* Candidate selection cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {INITIAL_CANDIDATES.map((candidate) => {
                const isSelected = selectedId === candidate.id;
                const matchesVote = votedCandidateId === candidate.id;
                return (
                  <div
                    key={candidate.id}
                    onClick={() => {
                      if (!votedCandidateId) setSelectedId(candidate.id);
                    }}
                    className={`relative cursor-pointer bg-surface-container-lowest border-2 rounded-2xl p-6 transition-all shadow-[0px_4px_12px_rgba(11,28,48,0.03)] flex flex-col justify-between hover:shadow-md ${
                      isSelected
                        ? 'border-secondary bg-secondary/5 ring-1 ring-secondary/50'
                        : 'border-outline-variant/60 hover:border-outline'
                    } ${votedCandidateId && 'opacity-90'}`}
                  >
                    <div className="space-y-4">
                      {/* Round Avatar and Radio Indicator */}
                      <div className="flex items-start justify-between">
                        <img
                          alt={candidate.name}
                          src={candidate.avatarUrl}
                          className="w-20 h-20 rounded-full border-4 border-surface object-cover shadow-sm bg-slate-100"
                        />
                        <div className="w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center bg-white shadow-inner">
                          {isSelected && (
                            <div className="w-3.5 h-3.5 rounded-full bg-secondary transition-all transform scale-100" />
                          )}
                        </div>
                      </div>

                      {/* Header details */}
                      <div>
                        <h3 className="text-lg font-bold text-primary flex items-center gap-1.5">
                          {candidate.name}
                          {matchesVote && (
                            <Verified className="w-5 h-5 text-on-tertiary-container fill-white" />
                          )}
                        </h3>
                        <p className="text-xs font-bold text-on-surface-variant mt-0.5 tracking-wider uppercase">
                          {candidate.level} | {candidate.major}
                        </p>
                      </div>

                      <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                        {candidate.manifesto}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-outline-variant/40 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveManifesto(candidate);
                        }}
                        className="text-primary font-bold text-xs flex items-center gap-1 hover:underline tracking-wide cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-secondary" />
                        View Manifesto
                      </button>
                      {matchesVote && (
                        <span className="text-[10px] font-extrabold uppercase bg-on-tertiary-container/10 text-on-tertiary-container px-2 py-0.5 rounded">
                          Your Vote
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Voting CTAs section */}
            <div className="mt-12 flex flex-col items-center gap-4">
              {votedCandidateId ? (
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-2 bg-on-tertiary-container/10 text-on-tertiary-container px-6 py-3 rounded-full border border-on-tertiary-container/20">
                    <Check className="w-5 h-5" />
                    <span className="font-bold text-sm uppercase tracking-wide">
                      Ballot Successfully Checked & Signed
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigate('results')}
                    className="mt-2 text-sm font-semibold text-secondary hover:underline flex items-center gap-1 mx-auto"
                  >
                    View Real-time Statistics Screen →
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleCastVoteClick}
                    disabled={!selectedId}
                    className={`w-full max-w-sm py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg ${
                      selectedId
                        ? 'bg-primary hover:bg-primary-container cursor-pointer opacity-100 shadow-primary/10'
                        : 'bg-outline-variant cursor-not-allowed opacity-50'
                    }`}
                  >
                    Cast Secure Vote
                  </button>
                  <p className="text-on-surface-variant text-xs italic opacity-85">
                    Double-check your selection before proceeding. Digital voting choices are final.
                  </p>
                </>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Manifest Modal Detail Drawer popup */}
      {activeManifesto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-primary/45 backdrop-blur-xs" onClick={() => setActiveManifesto(null)}></div>
          <div className="relative w-full max-w-lg bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-3">
                <img
                  alt={activeManifesto.name}
                  src={activeManifesto.avatarUrl}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base font-bold text-primary">{activeManifesto.name}</h3>
                  <p className="text-[10px] text-on-surface-variant tracking-wider uppercase font-semibold">
                    {activeManifesto.level} | {activeManifesto.major}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveManifesto(null)}
                className="hover:bg-surface-container p-1 rounded-full text-on-surface-variant transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-sm text-on-surface leading-relaxed py-2">
              <h4 className="font-bold text-primary uppercase tracking-wider text-xs">
                Candidate Integrity Pledge & Manifesto
              </h4>
              <p className="text-sm opacity-90">{activeManifesto.manifesto}</p>
              <div className="p-3.5 bg-secondary-container/10 border border-secondary-container/20 rounded-xl space-y-1">
                <p className="text-xs font-semibold text-secondary flex items-center gap-1.5 uppercase tracking-wide">
                  <Shield className="w-4 h-4 fill-secondary-container/20" />
                  Electoral Policy Note
                </p>
                <p className="text-[11px] text-on-surface-variant">
                  This manifesto is officially logged in registry index hash: `0x7a2d-2024-evote`. All statements comply with the Electoral Code.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t flex justify-end">
              <button
                onClick={() => setActiveManifesto(null)}
                className="bg-primary hover:bg-primary-container text-white px-6 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Close Manifesto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal Overlay */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-xs" onClick={() => setShowConfirmModal(false)}></div>
          <div className="relative w-full max-w-md bg-white border border-outline-variant p-6 rounded-2xl shadow-2xl text-center">
            <div className="w-16 h-16 bg-secondary-container text-secondary flex items-center justify-center rounded-full mx-auto mb-4">
              <Shield className="w-10 h-10 fill-secondary-container/20" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Confirm Your Selection</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              You are about to cast your final vote for{' '}
              <span className="font-bold text-on-surface underline decoration-secondary decoration-2 underline-offset-2">
                {selectedCandidateName}
              </span>
              . This ballot is irreversible and is cryptographically signed using your voter verification code.
            </p>

            <div className="flex flex-col gap-3">
              <button
                disabled={isSubmittingVote}
                onClick={confirmFinalVote}
                className="w-full py-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmittingVote ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Cryptographically Signing...
                  </>
                ) : (
                  <>
                    Confirm & Cast Vote
                  </>
                )}
              </button>
              <button
                disabled={isSubmittingVote}
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-4 border-2 border-outline-variant text-primary font-bold rounded-xl hover:bg-surface-container transition-all cursor-pointer"
              >
                Cancel & Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast-like Success Feedback Alert popup */}
      {showSuccessToast && (
        <div className="fixed bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-teal-50 border border-teal-300 text-teal-800 px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <Check className="w-5 h-5 text-teal-600 font-bold" />
            <p className="font-bold text-sm tracking-wide">
              Vote Recorded Successfully! cryptographic index computed.
            </p>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom navigation menu */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 py-2 bg-surface border-t border-outline-variant/30 shadow-lg">
        <button
          onClick={() => onNavigate('vote')}
          className="flex flex-col items-center justify-center text-primary bg-primary-container/40 p-1 px-3 rounded-xl transition-all"
        >
          <Vote className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Vote</span>
        </button>
        <button
          onClick={() => onNavigate('landing')}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary p-1"
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5 mt-0.5">Journey</span>
        </button>
        <button
          onClick={() => onNavigate('results')}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary p-1"
        >
          <BarChart2 className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Results</span>
        </button>
        <button
          onClick={() => onNavigate('restricted')}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary p-1"
        >
          <Award className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Register</span>
        </button>
      </nav>
    </div>
  );
}

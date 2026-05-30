/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Vote,
  FileText,
  User,
  CheckCircle,
  Clock,
  ExternalLink,
  Shield,
  HelpCircle,
  Users,
  Award,
  Bell,
  Sliders,
  Send,
  PlusCircle,
  FileSpreadsheet,
  BarChart4,
  ChevronRight,
  School,
  Lock,
  ArrowRight,
  Info,
  Calendar,
  AlertCircle,
  ArrowLeft,
  Settings,
  Mail,
  UserPlus
} from 'lucide-react';
import { ScreenType, Candidate } from '../types';

interface VoterPortalProps {
  currentVoterScreen: string;
  onNavigate: (screen: ScreenType) => void;
  onNavigateVoter: (screen: string) => void;
}

const CONSTANT_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Abena Osei',
    level: 'Level 400',
    major: 'Computer Science',
    manifesto: 'Empowering student programming with centered feedback registers, updated computer laboratories, and industry hackathons.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuKmzQTBdUlzPHyu18HzNYKWp1CuqyFURs-lNJY7ExVnSER6LxiT1UOy4AXULb37CSgVPtWK4lV3JxiDIJcUwI2h4Q0o1kKiE09VlJhCbNXL5a2D36nsCpYHr6-QydifJChx9nDeHZRGNSI7Er302jIW12dvekCYqG3gkkhHSheq7EaZNKVvnpUE1uq4il250xQO1rshrM_qhPVB74C--mpRbLlUC-cSgCJdrMo5U9zB8PdUh4TJpwT1yBf8arQGxqp60XBXidr92-',
    votes: 1894
  },
  {
    id: 'cand-2',
    name: 'Kwame Appiah',
    level: 'Level 300',
    major: 'Telecommunications',
    manifesto: 'Our focus is fiber broadband reliability, campus computing networks, and student computer board representations.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhJuqXghB2PldkzaT9wFresW6Kvw0G5O6LF8OLeAx1xuQjciqWog4Re3XEk2aY-Jtn4UhVXSULwSV7lVMdbHdXLthdY3UhUMNQWkLG0EAtg83gEFL4yzyqPSTzQrcDZyaxFVd-0_BGbl6KaLJPdfjNZ59Kw6JSjXldIVX3qBbNnKrkG5NgUbzntvs2PiSOtRl0zZ6LSyMFoyZ4NP6BdoUiHpT_MXUifr3J7FRfz6yh8npOl0tUQJ-76448FgMzT4cfgecPPbJe22Ml',
    votes: 1540
  },
  {
    id: 'cand-3',
    name: 'Naa Lamiley',
    level: 'Level 400',
    major: 'IT Management',
    manifesto: 'Transforming campus welfare with micro-grants, easy database catalogs, and inclusive team study tables.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbJBUnPfjHqjrUezkmzl7_-nrBeeQKShT2VHGvIt8uZWCqFbA8WDR-oZFaaG_WZA9_iH0gE1sS8yNPeq4l8flrmzjUzo4C7c8AbMJdV_QyUNUd84wCdmo6BsanY8CcVMXUU-jw8xkMXdj9R4CfUP12JHdEr4y_A2QSvhtPnud7Xe71Lr8i6_1_-QudAt37kJTo6nJIE3w12Q3PSQpAqYNrANZ1lQ1ny54phLuUlrKwVT-s-GEjGYeBjKcoQAba2xCsxqKTKqRMUuAL',
    votes: 847
  }
];

export default function VoterPortalScreens({ currentVoterScreen, onNavigate, onNavigateVoter }: VoterPortalProps) {
  // Shared States
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [currentRegStep, setCurrentRegStep] = useState(1);
  const [manifestoDraft, setManifestoDraft] = useState('');
  
  // Registration States
  const [candName, setCandName] = useState('');
  const [candMajor, setCandMajor] = useState('Computer Engineering');
  const [candPosition, setCandPosition] = useState('SRC President');
  
  // Notification states
  const [notifs, setNotifs] = useState([
    { id: 1, title: 'Voting Period Open', body: 'The 2024 SRC General election polling lines are officially open for 24 hours.', read: false, time: '2 mins ago' },
    { id: 2, title: 'Student Clearance Confirmed', body: 'Your registration signature is indexed in ledger node #091.', read: true, time: '1 hour ago' },
    { id: 3, title: 'Presidential Candidates Manifesto Live', body: 'Read Abena Osei and Kwame Appiah campaign charters now.', read: true, time: '1 day ago' },
  ]);

  // Handle Notifications check
  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const selectedCandidateObject = CONSTANT_CANDIDATES.find(c => c.id === selectedCandidateId);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-16 font-sans">
      {/* Mini App Bar inside sandbox */}
      <div className="bg-[#001e40] py-3.5 px-6 text-white flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Vote className="text-amber-400 w-5 h-5" />
          <h4 className="text-xs font-black uppercase tracking-widest leading-none">VOTER PORTAL METRIC SANDBOX</h4>
        </div>
        <div className="flex gap-2.5">
          <span className="text-[10px] bg-amber-400 text-[#001e40] px-2 py-0.5 rounded font-black tracking-wider uppercase">
            SCREEN: {currentVoterScreen.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        
        {/* ==================== 1. VOTER DASHBOARD ==================== */}
        {currentVoterScreen === 'voter-dashboard' && (
          <div className="space-y-6">
            <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Welcome Kofi Mensah</h3>
                <p className="text-sm text-slate-500 mt-1">Student ID: <b className="text-slate-700">040912345</b> | Faculty: School of Technology</p>
              </div>
              <button
                onClick={() => onNavigateVoter('digital-ballot')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-950/10 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Vote className="w-4 h-4" />
                Cast Your Fast Vote Now
              </button>
            </div>

            {/* Turnout Stats Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Election Status</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Active</span>
                </div>
                <h4 className="text-lg font-black text-slate-800">2024 General SRC Polls</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Closes tomorrow at 18:00 UTC.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-3">Live Portal Turnout</span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-slate-800">78.4%</span>
                  <span className="text-xs text-emerald-600 font-bold mb-1">▲ 4.2% since noon</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-indigo-600 w-[78.4%]" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Quick Directories</span>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button onClick={() => onNavigateVoter('election-details')} className="py-2 px-1 text-center font-bold text-[10px] uppercase text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all cursor-pointer">
                    Candidate List
                  </button>
                  <button onClick={() => onNavigateVoter('candidate-dashboard')} className="py-2 px-1 text-center font-bold text-[10px] uppercase text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-all cursor-pointer">
                    Candidate Reg
                  </button>
                </div>
              </div>
            </div>

            {/* Mini active list wireframe */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6">
              <h4 className="font-extrabold text-base text-slate-800 mb-4 uppercase tracking-wider">Elections Checklist</h4>
              <div className="divide-y divide-slate-100">
                <div className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-slate-800">SRC Presidential Council</p>
                    <p className="text-xs text-slate-400">Standard voter ID check enabled</p>
                  </div>
                  <button onClick={() => onNavigateVoter('election-details')} className="text-xs text-indigo-600 font-bold hover:underline">View Poll →</button>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Technology Faculty Board</p>
                    <p className="text-xs text-slate-400">Clears at 15:00 tomorrow</p>
                  </div>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded">Open</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. ELECTION DETAILS ==================== */}
        {currentVoterScreen === 'election-details' && (
          <div className="space-y-6">
            <button onClick={() => onNavigateVoter('voter-dashboard')} className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:underline cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider block w-fit mb-2">Live Registry</span>
                  <h3 className="text-2xl font-black text-slate-900">SRC Executive Elections 2024</h3>
                  <p className="text-sm text-slate-500 mt-1">Official voting rules and roster of certified representatives.</p>
                </div>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Clock className="w-4 h-4" /> Closed Loop Encryption</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {CONSTANT_CANDIDATES.map((cand) => (
                  <div key={cand.id} className="border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img src={cand.avatarUrl} alt={cand.name} className="w-12 h-12 rounded-full object-cover bg-slate-100" />
                        <div>
                          <h4 className="font-bold text-slate-800 leading-tight">{cand.name}</h4>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{cand.level} • {cand.major}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 italic">"{cand.manifesto}"</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCandidateId(cand.id);
                        onNavigateVoter('candidate-profile');
                      }}
                      className="mt-4 pt-3 border-t border-slate-100 text-left text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Inspect Profile & Manifesto <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. CANDIDATE PROFILE ==================== */}
        {currentVoterScreen === 'candidate-profile' && (
          <div className="space-y-6">
            <button onClick={() => onNavigateVoter('election-details')} className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:underline cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to Candidate List
            </button>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              {/* Display selected or first candidate */}
              {(() => {
                const target = selectedCandidateObject || CONSTANT_CANDIDATES[0];
                return (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
                      <img src={target.avatarUrl} alt={target.name} className="w-40 h-40 rounded-full border-4 border-slate-50 shadow object-cover bg-slate-150" />
                      <div>
                        <h3 className="text-2xl font-black text-slate-900">{target.name}</h3>
                        <p className="text-xs uppercase font-extrabold text-amber-600 tracking-wider mt-1">{target.level} • {target.major}</p>
                        <span className="inline-block mt-3 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                          SRC President Nominee
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-8 space-y-6 text-left">
                      <div>
                        <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Core Integrity Manifesto</h4>
                        <div className="h-1 w-12 bg-indigo-600 rounded-full mt-2 mb-4" />
                        <p className="text-sm text-slate-600 leading-relaxed font-serif whitespace-pre-wrap">
                          {target.manifesto}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Electoral Registry Index</p>
                          <p className="text-xs font-mono font-bold text-slate-700 mt-1 mt-1">HASH-ID-ABENA2024</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Clearance Level</p>
                          <p className="text-xs font-bold text-emerald-600 mt-1">Fully Approved</p>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-6">
                        <button
                          onClick={() => {
                            setSelectedCandidateId(target.id);
                            onNavigateVoter('digital-ballot');
                          }}
                          className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 font-bold text-white text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md transition-all flex items-center gap-1.5"
                        >
                          <Vote className="w-4 h-4 text-amber-300" />
                          Set Candidate for Ballot
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ==================== 4. DIGITAL BALLOT ==================== */}
        {currentVoterScreen === 'digital-ballot' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  STEP 1 OF 3: CANDIDATE CHOICE
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-3">Voter Ballot Panel</h3>
                <p className="text-slate-500 text-sm mt-1">
                  Choose your preferred candidate for the SRC Executive Council, or select Abstain to submit an empty ballot.
                </p>
              </div>

              {/* Roster layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {CONSTANT_CANDIDATES.map((cand) => (
                  <div
                    key={cand.id}
                    onClick={() => setSelectedCandidateId(cand.id)}
                    className={`border-2 rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between ${
                      selectedCandidateId === cand.id
                        ? 'border-indigo-600 bg-indigo-50/20 ring-4 ring-indigo-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-3 text-center flex flex-col items-center">
                      <img src={cand.avatarUrl} alt={cand.name} className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold text-slate-800 leading-tight">{cand.name}</h4>
                        <p className="text-[9px] text-slate-400 uppercase font-semibold mt-1">{cand.major}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded inline-block ${
                        selectedCandidateId === cand.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {selectedCandidateId === cand.id ? 'Selected' : 'Choose'}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Abstain card option */}
                <div
                  onClick={() => setSelectedCandidateId('abstain')}
                  className={`border-2 rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedCandidateId === 'abstain'
                      ? 'border-indigo-600 bg-indigo-50/20 ring-4 ring-indigo-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-center flex flex-col items-center justify-center flex-grow p-4 space-y-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">Ø</div>
                    <div>
                      <h4 className="font-bold text-slate-800">Abstain Option</h4>
                      <p className="text-[9px] text-slate-400 mt-1 uppercase">Cast blank choice</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded inline-block ${
                      selectedCandidateId === 'abstain' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {selectedCandidateId === 'abstain' ? 'Selected' : 'Choose'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button
                  disabled={!selectedCandidateId}
                  onClick={() => onNavigateVoter('vote-confirmation')}
                  className="px-8 py-4 bg-[#001e40] hover:bg-[#002d62] text-white disabled:opacity-50 text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Confirm Choice & Next step <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 5. VOTE CONFIRMATION ==================== */}
        {currentVoterScreen === 'vote-confirmation' && (
          <div className="space-y-6">
            <button onClick={() => onNavigateVoter('digital-ballot')} className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:underline cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Go back & alter choice
            </button>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-lg mx-auto shadow-sm text-center">
              <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                STEP 2 OF 3: SECURITY SIGNING
              </span>

              <div className="w-16 h-16 bg-blue-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mt-6 mb-4">
                <Shield className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-black text-slate-900">Verify & Submit</h3>
              <p className="text-slate-500 text-xs mt-1.5 mb-6">Your selected candidates list is printed below. Review with absolute diligence.</p>

              <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-150 mb-6 space-y-2">
                <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">Chosen Ballot Representative:</p>
                <p className="text-base font-extrabold text-[#001e40]">
                  {selectedCandidateId === 'abstain' ? 'Abstain Option' : (selectedCandidateObject?.name || 'Abena Osei')}
                </p>
                {selectedCandidateId !== 'abstain' && <p className="text-xs text-slate-500">{(selectedCandidateObject?.major || 'Computer Science')}</p>}
              </div>

              <div className="p-4 bg-slate-50 rounded-xl text-left border border-slate-150 mb-6 text-xs text-slate-500 leading-relaxed flex gap-2.5">
                <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <p>This action is legally binding, irreversibly hashed on-screen, and countersigned with your registered profile key index.</p>
              </div>

              <button
                onClick={() => onNavigateVoter('vote-receipt')}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-md cursor-pointer transition-all active:scale-98"
              >
                Sign & Finalize My Vote
              </button>
            </div>
          </div>
        )}

        {/* ==================== 6. VOTE RECEIPT ==================== */}
        {currentVoterScreen === 'vote-receipt' && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-md text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Vote Hashed Successfully</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Thank you for participating! Your ballot is recorded and permanently signed. Below is your official anonymous ballot token receipt.
              </p>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150 text-left space-y-3 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans uppercase font-bold text-[10px]">Reference ID</span>
                  <span className="text-slate-800 font-bold">#GTU-782-X9B2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans uppercase font-bold text-[10px]">Registry Stamp</span>
                  <span className="text-slate-800 font-bold">2026-05-30 22:28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans uppercase font-bold text-[10px]">Proof Signature Ledger</span>
                  <span className="text-slate-800 truncate max-w-[200px]" title="0x0a2b8e3fc79d8e6a1002cf7f9d12aae510">0x0a2b8e3fc79d8e6a1002cf7f9d12aae510</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => onNavigateVoter('live-results-voter')}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  View Live Stats
                </button>
                <button
                  onClick={() => onNavigate('landing')}
                  className="flex-1 py-3 border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 7. LIVE ELECTION RESULTS ==================== */}
        {currentVoterScreen === 'live-results-voter' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h3 className="text-xl font-extrabold text-slate-800 uppercase tracking-wider">Live Voter Leaderboard</h3>
                <p className="text-xs text-slate-500 mt-1">Real-time candidate metrics computed securely.</p>
              </div>

              <div className="space-y-5">
                {[
                  { name: 'Abena Osei', count: 1894, pct: '44.2%', col: 'bg-indigo-600', max: 4281 },
                  { name: 'Kwame Appiah', count: 1540, pct: '35.9%', col: 'bg-amber-500', max: 4281 },
                  { name: 'Naa Lamiley', count: 847, pct: '19.9%', col: 'bg-slate-400', max: 4281 },
                ].map((item) => (
                  <div key={item.name} className="space-y-1.5 pb-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                      <span>{item.name}</span>
                      <span className="text-slate-600">{item.count} Votes ({item.pct})</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.col}`} style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 8. NOTIFICATIONS ==================== */}
        {currentVoterScreen === 'notifications-voter' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <Bell className="w-5 h-5 text-indigo-600" /> Notifications Inbox
                </h3>
                <button onClick={markAllRead} className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer">
                  Mark all as read
                </button>
              </div>

              <div className="space-y-3">
                {notifs.map((n) => (
                  <div key={n.id} className={`p-4 rounded-2xl border transition-all flex gap-3 ${
                    n.read ? 'bg-slate-50/55 border-slate-100' : 'bg-indigo-50/15 border-indigo-100'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-slate-300' : 'bg-indigo-600'}`} />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{n.body}</p>
                      <span className="text-[10px] text-slate-400 block pt-1">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 9. ACCOUNT SETTINGS ==================== */}
        {currentVoterScreen === 'account-settings-voter' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-2xl mx-auto shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-500" /> Voter Accounts Settings
              </h3>
              <p className="text-xs text-slate-400 mt-1">Configure profile tokens, verification methods, and active sessions.</p>
            </div>

            <div className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                  <p className="text-sm text-slate-800 font-bold mt-1">Kofi Mensah</p>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Student Index Code</label>
                  <p className="text-sm font-mono text-slate-800 font-bold mt-1">040912345</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">Device & Sessions Logs</h4>
                <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-150">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Chrome on macOS High Sierra</p>
                    <p className="text-[10px] text-slate-400">Active Session • IP 197.234.12.8</p>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">This Device</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 10. CANDIDATE REGISTRATION STEP 1 ==================== */}
        {currentVoterScreen === 'candidate-reg-1' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <span className="text-[9px] font-black uppercase text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                  STEP 1 OF 3: APPLICANT BIODATA
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-3">Nominee Registration Form</h3>
                <p className="text-xs text-slate-400 mt-1">Apply to stand as a verified executive counselor representing your constituency.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-500">Applicant Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abena Serwaa"
                    value={candName}
                    onChange={(e) => setCandName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-sm outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-500">Department Major</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Telecommunications Logistics"
                    value={candMajor}
                    onChange={(e) => setCandMajor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-sm outline-none"
                  />
                </div>

                <button
                  onClick={() => onNavigateVoter('candidate-reg-2')}
                  className="w-full py-3 bg-[#001e40] text-amber-300 font-bold uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer block text-center"
                >
                  Continue to Credentials →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 11. CANDIDATE REGISTRATION STEP 2 ==================== */}
        {currentVoterScreen === 'candidate-reg-2' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <span className="text-[9px] font-black uppercase text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                  STEP 2 OF 3: POSITION CHARTER
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-3">Nominee Rationale</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-500">Executive Office Position</label>
                  <select
                    value={candPosition}
                    onChange={(e) => setCandPosition(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-sm outline-none"
                  >
                    <option value="SRC President">SRC President</option>
                    <option value="SRC General Secretary">General Secretary</option>
                    <option value="SRC Financial Officer">Treasurer</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-500">Pledge / Manifesto Charter</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your student manifesto goals clearly..."
                    value={manifestoDraft}
                    onChange={(e) => setManifestoDraft(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-lg text-sm outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button onClick={() => onNavigateVoter('candidate-reg-1')} className="flex-1 py-3 border border-slate-200 font-bold uppercase text-xs rounded-xl cursor-pointer">
                    Back
                  </button>
                  <button onClick={() => onNavigateVoter('candidate-reg-3')} className="flex-1 py-3 bg-[#001e40] text-amber-300 font-bold uppercase text-xs rounded-xl cursor-pointer">
                    Preview Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 12. CANDIDATE REGISTRATION STEP 3 ==================== */}
        {currentVoterScreen === 'candidate-reg-3' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <span className="text-[9px] font-black uppercase text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                  STEP 3 OF 3: APPLICANT REVIEW
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">Submit For Clearance</h3>
              </div>

              <div className="bg-slate-50 border rounded-2xl p-4.5 space-y-3 font-medium text-xs">
                <p><b className="text-[#001e40] uppercase text-[10px]">Name:</b> {candName || 'Kofi Mensah'}</p>
                <p><b className="text-[#001e40] uppercase text-[10px]">Position:</b> {candPosition}</p>
                <p><b className="text-[#001e40] uppercase text-[10px]">Major Constituency:</b> {candMajor || 'Telecommunications'}</p>
                <p className="text-slate-500 italic">"{manifestoDraft || 'I stand for total administrative transparency and responsive digital communication lines.'}"</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => onNavigateVoter('candidate-reg-2')} className="flex-1 py-3 border border-slate-200 font-bold uppercase text-xs rounded-xl cursor-pointer">
                  Edit
                </button>
                <button onClick={() => onNavigateVoter('candidate-dashboard')} className="flex-1 py-3 bg-indigo-600 text-white font-bold uppercase text-xs rounded-xl cursor-pointer">
                  Submit Candidate Application
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 13. CANDIDATE DASHBOARD ==================== */}
        {currentVoterScreen === 'candidate-dashboard' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800 uppercase tracking-wide">Candidate Center</h3>
                  <p className="text-xs text-slate-500 mt-1">Manage executive registries and review status.</p>
                </div>
                <button
                  onClick={() => onNavigateVoter('candidate-reg-1')}
                  className="bg-[#001e40] text-amber-300 font-extrabold text-xs uppercase px-5 py-3.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" /> Create New Nominee Application
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                <div className="py-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Application #GTU-APP-09</h4>
                    <p className="text-xs text-slate-400">Position applied: <b className="text-slate-600">SRC President</b></p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-amber-100 text-amber-800 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">Under Audit</span>
                    <button onClick={() => onNavigateVoter('application-status')} className="text-xs font-bold text-indigo-600 hover:underline">Track Application →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 14. APPLICATION STATUS ==================== */}
        {currentVoterScreen === 'application-status' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="pb-4 border-b border-slate-150 text-center mb-6">
                <h3 className="text-lg font-black text-slate-900 uppercase">Application Tracker</h3>
                <p className="text-xs text-indigo-600 font-bold mt-1 font-mono">CODE: GTU-APP-09</p>
              </div>

              <div className="space-y-5 text-left text-xs">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className="font-bold text-slate-800">Candidacy Register Checked</p>
                    <p className="text-slate-400 mt-0.5">Checked today at 13:00</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">2</div>
                  <div>
                    <p className="font-bold text-slate-800">Academic Standing Review</p>
                    <p className="text-slate-400 mt-0.5">Under verification by GTU registrar staff</p>
                  </div>
                </div>
                <div className="flex gap-3 opacity-40">
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold">3</div>
                  <div>
                    <p className="font-bold text-slate-800">Cleared for Ballot</p>
                    <p className="text-slate-400 mt-0.5">Scheduled approval pending</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-150 flex gap-4">
                <button onClick={() => onNavigateVoter('edit-candidate-profile')} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wide rounded-xl hover:bg-slate-50 cursor-pointer text-center">
                  Edit Profile Draft
                </button>
                <button onClick={() => onNavigateVoter('candidate-dashboard')} className="flex-1 py-3 bg-[#001e40] text-amber-300 font-semibold text-xs uppercase tracking-wide rounded-xl cursor-pointer text-center">
                  Back to Center
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 15. EDIT CANDIDATE PROFILE ==================== */}
        {currentVoterScreen === 'edit-candidate-profile' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 uppercase mb-4 text-center">Alter Nominal Details</h3>
              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-500">Nominee Name</label>
                  <input type="text" value={candName || 'Kofi Mensah'} onChange={(e) => setCandName(e.target.value)} className="w-full bg-slate-50 border p-3 rounded-lg text-xs outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-500">Constituency Info</label>
                  <input type="text" value={candMajor || 'Telecommunications Dept'} onChange={(e) => setCandMajor(e.target.value)} className="w-full bg-slate-50 border p-3 rounded-lg text-xs outline-none" />
                </div>
                <button onClick={() => {
                  alert('Changes updated successfully in academic sandbox database!');
                  onNavigateVoter('candidate-dashboard');
                }} className="w-full py-3.5 bg-indigo-600 text-white text-xs uppercase tracking-wide font-bold rounded-xl cursor-pointer">
                  Submit Revised Charter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 16. CANDIDATE ELECTION RESULTS ==================== */}
        {currentVoterScreen === 'candidate-election-results' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 uppercase">Your Personal Election Metrics</h3>
              <p className="text-xs text-slate-400 mt-1">Certified counts parsed for candidate index dashboard.</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-[#eff4ff] p-4 rounded-xl border border-blue-100">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Total Ballot Votes</span>
                  <span className="text-2xl font-black text-[#001e40] block mt-1">1,894</span>
                </div>
                <div className="bg-emerald-58/12 p-4 rounded-xl border border-emerald-100">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Target Position Rank</span>
                  <span className="text-2xl font-black text-emerald-800 block mt-1">#1 of 3</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border rounded-2xl text-xs text-slate-500 leading-relaxed mt-6">
                Certified and sealed by the Ghana Telecom University Independent Electoral Board. Index Ledger hash: <b className="text-slate-750">0x89ab-evote-cert</b>.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  School,
  Lock,
  IdCard,
  ArrowRight,
  ShieldAlert,
  Loader2,
  CheckCircle,
  Vote,
  Award,
  ChevronRight,
  HelpCircle,
  Users,
  TrendingUp,
  Fingerprint,
  RefreshCw
} from 'lucide-react';
import { ScreenType } from '../types';

interface ScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

// ----------------- 1. LOGIN REDESIGN SCREEN -----------------
export function LoginRedesign({ onNavigate }: ScreenProps) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !password) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onNavigate('voter-dashboard');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left split screen (Visual Brand panel) */}
      <div className="lg:w-1/2 bg-[#001e40] text-white p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        {/* Background ambient mesh */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#002d62] rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400 rounded-full blur-3xl opacity-10"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <School className="text-amber-400 w-8 h-8" />
          <h1 className="text-xl font-black tracking-widest uppercase">GTU Portal</h1>
        </div>

        <div className="relative z-10 my-12 space-y-6">
          <span className="bg-amber-400/20 text-amber-400 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-amber-400/30">
            Electoral Integrity Protocol
          </span>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Next-Gen Digital <br/>
            Democracy.
          </h2>
          <p className="text-sm text-slate-300 max-w-md leading-relaxed">
            Ghana Telecom University SRC Elections security baseline is now hardened with localized hash signing. Experience absolute vote secrecy and seamless access from any authenticated device.
          </p>
        </div>

        <div className="relative z-10 border-t border-white/10 pt-6 flex items-center gap-6">
          <div>
            <p className="text-2xl font-black text-amber-400">100%</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Verifiable Logs</p>
          </div>
          <div className="w-px h-8 bg-white/25"></div>
          <div>
            <p className="text-2xl font-black text-amber-400">AES-256</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Data Secrecy</p>
          </div>
        </div>
      </div>

      {/* Right split screen (Interactive login card) */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-[440px] space-y-8">
          <div className="text-left">
            <h3 className="text-3xl font-black text-[#001e40] tracking-tight">Access Secure Voting</h3>
            <p className="text-slate-500 text-sm mt-2">
              Enter your student verification index keys for live ballot clearance.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#001e40] ml-0.5">
                Staff/Student ID Index
              </label>
              <div className="relative">
                <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 040912345"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-[#001e40] focus:ring-4 focus:ring-blue-100 placeholder:text-slate-300 py-3.5 pl-12 pr-4 rounded-xl text-sm transition-all outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-0.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#001e40]">
                  Electoral Key Password
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('recover')}
                  className="text-xs font-bold text-amber-600 hover:underline"
                >
                  Retrieve Portlet Key?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-[#001e40] focus:ring-4 focus:ring-blue-100 placeholder:text-slate-300 py-3.5 pl-12 pr-4 rounded-xl text-sm transition-all outline-none font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full bg-[#001e40] hover:bg-[#002d62] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-900/10 active:scale-98"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
                  Generating Session Hashing...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  Cleared Security Gate
                </>
              ) : (
                <>
                  Authenticate Secure Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Quick instructions alert */}
          <div className="bg-slate-100 border border-slate-200/80 rounded-2xl p-4 flex gap-3 text-xs text-slate-600">
            <ShieldAlert className="text-amber-500 w-5 h-5 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              Logging in triggers a 2-Factor Authentication (OTP Code) securely sent direct to your institutional mail address within 15 seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------- 2. CAST YOUR VOTE (EARLY DESIGN ITERATION) -----------------
export function CastEarly({ onNavigate }: ScreenProps) {
  const [chosenCandidate, setChosenCandidate] = useState<string | null>(null);
  const [signed, setSigned] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 md:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="border-b border-slate-200 pb-5 mb-6 text-center">
          <span className="bg-emerald-58/12 text-emerald-800 border border-emerald-200 font-extrabold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full inline-block mb-3">
            Legacy Blueprint: Iteration 0.4a
          </span>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">SRC Ballot (Early Proposal)</h2>
          <p className="text-xs text-slate-500 mt-1">This screen represents the early wireframe draft of the electronic ballot structure.</p>
        </div>

        {/* Paper Ballot Replica layout */}
        <div className="border-4 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50 space-y-4">
          <p className="text-[10px] font-mono text-slate-400 text-center uppercase tracking-widest">
            STAMP PORT - CERTIFICATE ID #0079-X90
          </p>
          
          <div className="space-y-3">
            {[
              { id: '1', name: 'Nominee A (IT Dept)', spec: 'Lvl 400 • Ghana' },
              { id: '2', name: 'Nominee B (CS Dept)', spec: 'Lvl 300 • Accra' },
              { id: '3', name: 'Abstain Option', spec: 'No candidate preference' },
            ].map((cand) => (
              <div
                key={cand.id}
                onClick={() => setChosenCandidate(cand.name)}
                className={`border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                  chosenCandidate === cand.name
                    ? 'bg-amber-400/10 border-amber-400 ring-2 ring-amber-400/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <p className="font-bold text-slate-800">{cand.name}</p>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{cand.spec}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  chosenCandidate === cand.name ? 'border-amber-500 bg-amber-400' : 'border-slate-300 bg-white'
                }`}>
                  {chosenCandidate === cand.name && <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />}
                </div>
              </div>
            ))}
          </div>

          {/* Legacy signature area */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Auditor Wet Signature Verification
            </label>
            <div className="border border-slate-200 rounded-xl p-4 bg-white text-center">
              <input
                type="checkbox"
                id="sign-check"
                checked={signed}
                onChange={(e) => setSigned(e.target.checked)}
                className="w-5 h-5 text-amber-500 border-slate-300 mr-2.5 rounded cursor-pointer"
              />
              <label htmlFor="sign-check" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                I cryptographically sign my selection with 1-second voter confirmation
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => onNavigate('landing')}
            className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all cursor-pointer text-center"
          >
            Back to Portal
          </button>
          <button
            disabled={!chosenCandidate || !signed}
            onClick={() => {
              alert('Successfully cast mocked vote in legacy layout index.');
              onNavigate('results');
            }}
            className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all cursor-pointer text-center"
          >
            Submit Legacy Cast
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------- 3. LIVE ELECTION RESULTS (EARLY VERSION) -----------------
export function ResultsEarly({ onNavigate }: ScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const triggerRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#071325] text-[#b8c2cc] py-12 px-4 md:px-8 flex items-center justify-center font-mono">
      <div className="w-full max-w-2xl bg-[#0d1f38] border border-blue-900/40 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-blue-900/30 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>EARLY SCREEN LAYOUT: 0.1v (MOCK)</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1 uppercase">RAW LIVE COUNT INDEX</h3>
          </div>
          <button
            onClick={triggerRefresh}
            className="p-2.5 rounded-lg bg-blue-952/50 border border-blue-900/40 hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <p className="text-xs text-blue-300 leading-relaxed mb-6">
          This layout represents the raw, low-overhead cryptographic counting terminal proposed for slow network coverage areas.
        </p>

        <div className="space-y-4">
          {[
            { id: '1', name: 'CS Dept Candidate', pct: '49.1%', count: '1,894 Votes', wd: 'w-[49.1%]' },
            { id: '2', name: 'Telecom Dept Candidate', pct: '38.6%', count: '1,540 Votes', wd: 'w-[38.6%]' },
            { id: '3', name: 'IT Dept Candidate', pct: '12.3%', count: '847 Votes', wd: 'w-[12.3%]' },
          ].map((item) => (
            <div key={item.id} className="space-y-1.5 bg-[#0a182b] border border-blue-900/20 p-4.5 rounded-xl">
              <div className="flex justify-between text-xs font-bold text-white uppercase">
                <span>{item.name}</span>
                <span className="text-amber-400">{item.pct}</span>
              </div>
              <div className="h-2.5 bg-blue-950 rounded-full overflow-hidden">
                <div className={`h-full bg-amber-400 ${item.wd}`} />
              </div>
              <div className="flex gap-2 text-[10px] text-slate-400 mt-1 font-mono uppercase tracking-wider justify-between">
                <span>Ref HASH: 0x8a2d{item.id}c</span>
                <span>{item.count}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-blue-900/30 flex justify-end">
          <button
            onClick={() => onNavigate('landing')}
            className="px-6 py-3 bg-blue-950 border border-blue-900/40 text-xs font-bold text-white uppercase tracking-widest rounded-xl hover:bg-blue-900 transition-all cursor-pointer"
          >
            Exit Terminal Layout →
          </button>
        </div>
      </div>
    </div>
  );
}

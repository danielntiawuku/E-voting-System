/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Award,
  BarChart2,
  Cpu,
  Fingerprint,
  UserPlus,
  Tv,
  Users,
  Smartphone,
  PhoneCall,
  Lock,
} from 'lucide-react';
import { ScreenType } from '../types';

interface LandingPageProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="bg-background text-on-background font-sans min-h-screen flex flex-col justify-between">
      {/* TopAppBar Navigation for Landing Page */}
      <header className="w-full top-0 sticky bg-surface border-b border-outline-variant shadow-sm z-50 flex items-center justify-between px-6 md:px-24 h-16 transition-colors duration-200">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-primary w-6 h-6" />
          <h1 className="text-lg font-black text-primary tracking-tight">GTU E-VOTING</h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => onNavigate('landing')}
              className="text-sm font-bold text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('results')}
              className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
            >
              Live Statistics
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
            >
              Portal Login
            </button>
          </nav>
          <button
            onClick={() => onNavigate('login')}
            className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            <UserCheck className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Cinematic Hero Banner */}
        <section className="relative min-h-[640px] flex items-center py-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Dark indigo institutional overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#001e40] via-[#003366]/95 to-[#eff4ff]/90 opacity-95"></div>
            <img
              className="w-full h-full object-cover mix-blend-overlay"
              alt="Ghana Telecom University Dusk Campus"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnSMeviY0Gcb2lFmu3LBQB-Sc-8R5seRMOuSKkkzLRSxdmclk7wVCOIf4EvKk9LEfFtQzmtoB-HKmMUjjVh9AblR938mhgBMerc7mvruQF9SCozE-omYGgFw1RypTxwtx_23--CpkITw6N38F6meHaV3oZWmdw-Wp99xiIes49-FaEmnLhH9a36lJn8t4tWolVEeNXT28ZYKoqpUeY6O_WDLwqK_MfDjeD3NibG0L4zLnX-v_IXN2HJtGBnzqtTA_j1hOYVv_odstc"
            />
          </div>

          <div className="container mx-auto px-6 md:px-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text description details Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-3 bg-secondary-container/20 border border-secondary-container/30 px-4 py-2 rounded-full">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </span>
                <span className="text-xs font-bold text-secondary-container tracking-widest uppercase">
                  3 Live Polls Currently Active
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Secure Democratic Voice for GTU
              </h2>
              <p className="text-sm md:text-base text-white/85 max-w-xl leading-relaxed">
                Empowering Ghana Telecom University with a transparent, encrypted, and easily accessible digital voting ecosystem. Your vote is your power—cast it securely with absolute assurance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => onNavigate('login')}
                  className="bg-secondary-container text-on-secondary-container hover:bg-amber-400 font-bold px-8 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('restricted')}
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  Candidate Registration
                  <UserPlus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Simulated Live Preview Widget Column */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="glass-effect p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-base font-bold text-primary">Live Participation Dashboard</h3>
                  <BarChart2 className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-on-surface">SRC Presidential Election</span>
                      <span className="text-primary">78.4% Turnout</span>
                    </div>
                    <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[78%] transition-all duration-1000"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-on-surface">Faculty Representatives</span>
                      <span className="text-primary">45.2% Turnout</span>
                    </div>
                    <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-secondary-container w-[45%] transition-all duration-1000"></div>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-center gap-3">
                    <Fingerprint className="w-5 h-5 text-secondary" />
                    <p className="text-[11px] font-semibold text-primary">
                      AES-256 Block-level Audit Encryption Active
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey steps explainer Journey Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-24">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-extrabold text-primary mb-3">The Voting Journey</h2>
              <div className="h-1 text-center w-24 bg-secondary-container mx-auto rounded-full mb-6"></div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Our simple, highly audited process ensures every student and faculty member can participate in campus democracy through three steps of absolute trust.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center bg-surface p-6 rounded-2xl border border-outline-variant/50 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-md shadow-primary/10">
                  <Fingerprint className="w-8 h-8 text-white" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-2">
                  Step 01
                </span>
                <h3 className="text-lg font-bold text-primary mb-3">Verify Identity</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Authenticate your credentials safely against local GTU database indexes and obtain a secure OTP code in your official email.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center bg-surface p-6 rounded-2xl border border-outline-variant/50 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center mb-6 shadow-md shadow-amber-400/15">
                  <Users className="w-8 h-8 text-on-secondary-container" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-2">
                  Step 02
                </span>
                <h3 className="text-lg font-bold text-primary mb-3">Choose Nominee</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Browse candidates, read active manifesto integrity drafts, and check campaign visions to make an informed democratic decision.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center bg-surface p-6 rounded-2xl border border-outline-variant/50 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-[#001b3c] flex items-center justify-center mb-6 shadow-md">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-2">
                  Step 03
                </span>
                <h3 className="text-lg font-bold text-primary mb-3">Cast Encrypted Ballot</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Submit your ballot securely through our gateway and obtain an encrypted digital voting receipt instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid style Institutional features section */}
        <section className="py-20 bg-surface-container-low">
          <div className="container mx-auto px-6 md:px-24">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="md:col-span-2 bg-primary rounded-3xl p-8 text-white relative overflow-hidden min-h-[300px] flex flex-col justify-end">
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-35 hover:scale-105 transition-transform"
                  alt="Voter using e-vote platform on tablet"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnDXvCahbSvU32y09Eqkt76Z8S5r8RhYAKJ_jOYw7gwwsNCAdSwEhqIgJ-vcCM6K9eWJjuaJfbAp-Naow1-IUeMrXkLjp3fx6BBU-_oR29hTt_ZtbXNQRhLrPzTg_xpQzzHRju7gjornHuxSwQ0k2ObfFQgi8Rch0Gz9RxDWV9N9AjqyP2cEMBPMXMeALflJTMeuDUFYzDAaKmmlpvfnV4USh7vXIh3A8xSHUX7tj814WyzCHSfA8Vg8iAXTMzn9EPZsPyN5f9TNXf"
                />
                <div className="relative z-10 space-y-3">
                  <h3 className="text-xl font-bold">Uncompromising Security Architecture</h3>
                  <p className="text-xs text-white/80 leading-relaxed max-w-sm">
                    Our system leverages state-of-the-art cryptographic hashing to protect the total anonymity and safety of your vote.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-secondary-container rounded-3xl p-8 flex flex-col justify-between min-h-[300px]">
                <Cpu className="w-10 h-10 text-on-secondary-container" />
                <div>
                  <h3 className="text-lg font-bold text-on-secondary-container mb-2">
                    Real-time Auditing
                  </h3>
                  <p className="text-xs text-on-secondary-container/85 leading-relaxed">
                    Watch the democratic process unfold in live stats visual panels with zero delays or double counting possibilities.
                  </p>
                </div>
              </div>

              {/* Feature 3: Side stats counts boxes */}
              <div className="space-y-6 flex flex-col justify-between min-h-[300px]">
                {/* Micro card A */}
                <div className="bg-white border border-outline-variant/60 rounded-2xl p-6 text-center shadow-xs flex-1 flex flex-col justify-center">
                  <Smartphone className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="text-2xl font-black text-primary">100%</h4>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">
                    Mobile Responsive Ready
                  </p>
                </div>
                {/* Micro card B */}
                <div className="bg-white border border-outline-variant/60 rounded-2xl p-6 text-center shadow-xs flex-1 flex flex-col justify-center">
                  <PhoneCall className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="text-2xl font-black text-primary">24/7</h4>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">
                    Technical Support Help
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Landing Footer */}
      <footer className="w-full py-8 bg-surface-container-highest border-t border-outline-variant/40 flex flex-col md:flex-row justify-between items-center px-6 md:px-24 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-primary">
            Ghana Telecom University
          </h2>
          <p className="text-[10px] text-on-surface-variant tracking-wider">
            © 2024 Institutional Democratic Electoral Committee. All Rights Reserved.
          </p>
        </div>
        <div className="flex gap-4.5 text-[10px] font-extrabold uppercase tracking-widest">
          <button onClick={() => onNavigate('login')} className="text-on-surface-variant hover:text-primary">
            System Portal Login
          </button>
          <button onClick={() => onNavigate('restricted')} className="text-on-surface-variant hover:text-primary">
            Electoral Integrity
          </button>
        </div>
      </footer>
    </div>
  );
}

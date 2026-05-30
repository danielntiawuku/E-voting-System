/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Clock,
  Key,
  Database,
  Wifi,
  Users,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
  School,
  ArrowLeft,
  Loader2,
  Info,
} from 'lucide-react';
import { ScreenType } from '../types';

interface GlobalSettingsProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function GlobalSettings({ onNavigate }: GlobalSettingsProps) {
  // Maintenance State
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [startDateTime, setStartDateTime] = useState('2026-05-30T08:00');
  const [endDateTime, setEndDateTime] = useState('2026-05-30T20:00');
  const [smsGatewayActive, setSmsGatewayActive] = useState(true);
  const [dualFactorRequired, setDualFactorRequired] = useState(true);

  // Api Secrets Visibility
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [showSmsToken, setShowSmsToken] = useState(false);
  
  // Rotating triggers state
  const [rotating, setRotating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [secretKey, setSecretKey] = useState('9ef2c1ba458adcb7ef901239ab7fa2');
  const [smsToken, setSmsToken] = useState('gtu_sms_auth_081a2f9cd9');

  const handleRotateKey = () => {
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
      const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
      let r1 = '';
      let r2 = '';
      for (let i = 0; i < 30; i++) {
        r1 += chars[Math.floor(Math.random() * chars.length)];
      }
      for (let i = 0; i < 20; i++) {
        r2 += chars[Math.floor(Math.random() * chars.length)];
      }
      setSecretKey(`9ef${r1}`);
      setSmsToken(`gtu_sms_${r2}`);
    }, 1200);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  return (
    <div className="bg-background min-h-screen text-on-background pb-12">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-4 md:px-12 py-4 bg-surface shadow-sm border-b border-outline-variant/30 font-sans">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('landing')}
            className="text-primary hover:bg-surface-container-high p-2 rounded-full transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer pt-0.5" onClick={() => onNavigate('landing')}>
            <School className="text-primary w-6 h-6" />
            <span className="text-xl font-bold text-primary">GTU Parameters</span>
          </div>
        </div>
        <div className="bg-[#eff4ff] text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold leading-none">
          Root Administrator View
        </div>
      </header>

      {/* Main Core Form */}
      <main className="pt-24 px-4 md:px-12 max-w-7xl mx-auto font-sans">
        <div className="mb-8 border-b pb-6 border-outline-variant/30">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-widest">
            Control Center
          </span>
          <h2 className="text-3xl font-extrabold text-primary tracking-tight">
            Global Systems Configuration
          </h2>
          <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed mt-1">
            Override underlying compliance frameworks, schedule electoral timeline windows, modify academic directory linkages, and administer system secrets.
          </p>
        </div>

        {saveSuccess && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4.5 text-emerald-800 text-sm font-bold flex items-center gap-3 mb-8 animate-in slide-in-from-top-6 duration-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-pulse" />
            <span>Success: Global voting parameters saved securely and propagated across nodes.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Settings sections Form */}
          <form onSubmit={handleSaveSettings} className="lg:col-span-8 space-y-6">
            
            {/* Box 1: Electoral Timings */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                Poll Scheduling Rules
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Determine the timeframe for student ballot operations. Voters accessing outside this window are automatically routed to the poll closed splash component.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="poll_open" className="text-xs font-semibold text-on-surface uppercase tracking-wider block">
                    Institutional Poll Opening Date/Time
                  </label>
                  <input
                    id="poll_open"
                    type="datetime-local"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                    required
                    className="w-full bg-surface-bright border border-outline-variant rounded-xl p-3 text-sm focus:border-primary outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="poll_close" className="text-xs font-semibold text-on-surface uppercase tracking-wider block">
                    Institutional Poll Closing Date/Time
                  </label>
                  <input
                    id="poll_close"
                    type="datetime-local"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                    required
                    className="w-full bg-surface-bright border border-outline-variant rounded-xl p-3 text-sm focus:border-primary outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Box 2: Secure Policy overrides checkboxes */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-5 h-5 text-secondary" />
                Security Policies & Handshakes
              </h3>

              <div className="divide-y divide-outline-variant/40">
                {/* Switch 1: SMS Toggle */}
                <div className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-primary block">SMS Mobile verification gateway</span>
                    <p className="text-xs text-on-surface-variant leading-relaxed max-w-md">
                      When enabled, fall back to bulk academic SMS channels in addition to student institutional emails to dispatch validation codeOTP keys.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSmsGatewayActive(!smsGatewayActive)}
                    className={`shrink-0 w-12 h-6.5 rounded-full transition-all flex items-center p-1 cursor-pointer ${
                      smsGatewayActive ? 'bg-primary justify-end' : 'bg-outline justify-start'
                    }`}
                  >
                    <div className="w-4.5 h-4.5 bg-white rounded-full shadow-xs"></div>
                  </button>
                </div>

                {/* Switch 2: Dual Factor Mandatory */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-primary block">Force Cryptographic 2FA handshakes</span>
                    <p className="text-xs text-on-surface-variant leading-relaxed max-w-md">
                      Requires all voter login segments to solve the 6-digit OTP verification security layer before unlocking their personal digital ballot page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDualFactorRequired(!dualFactorRequired)}
                    className={`shrink-0 w-12 h-6.5 rounded-full transition-all flex items-center p-1 cursor-pointer ${
                      dualFactorRequired ? 'bg-primary justify-end' : 'bg-outline justify-start'
                    }`}
                  >
                    <div className="w-4.5 h-4.5 bg-white rounded-full shadow-xs"></div>
                  </button>
                </div>
              </div>
            </section>

            {/* Box 3: API Key & Secrets credentials config */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <Key className="w-5 h-5 text-secondary" />
                  Cryptographic Signature Keys
                </h3>
                <button
                  type="button"
                  onClick={handleRotateKey}
                  disabled={rotating}
                  className="text-xs border border-primary/20 hover:bg-surface px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer text-primary"
                >
                  {rotating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3.5 h-3.5" />
                  )}
                  <span>Rotate API secrets</span>
                </button>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Tokens used by internal backend workers, SMS gateways (Twilio / BulkSMS), SMTP mailing servers, and JWT session authentications. Keep these strings hidden.
              </p>

              {/* Secret 1 input row */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#737780] block">
                  JWT Encryption Certificate (AES-256 Secret)
                </label>
                <div className="relative">
                  <input
                    type={showSecretKey ? 'text' : 'password'}
                    value={secretKey}
                    readOnly
                    className="w-full font-mono bg-surface-bright border border-outline-variant rounded-xl pr-12 p-3 text-xs outline-none text-slate-700 font-bold select-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                  >
                    {showSecretKey ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* Secret 2 input row */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#737780] block">
                  SMS Gateway Verification Key API-Token
                </label>
                <div className="relative">
                  <input
                    type={showSmsToken ? 'text' : 'password'}
                    value={smsToken}
                    readOnly
                    className="w-full font-mono bg-surface-bright border border-outline-variant rounded-xl pr-12 p-3 text-xs outline-none text-slate-700 font-bold select-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSmsToken(!showSmsToken)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                  >
                    {showSmsToken ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>
            </section>

            {/* Save CTA */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-container text-white py-4.5 px-6 rounded-xl font-extrabold text-sm uppercase tracking-wider cursor-pointer shadow-md transition-all active:scale-98"
              >
                Persist Global Voting Parameters
              </button>
            </div>
          </form>

          {/* Right sidebar details side info */}
          <div className="lg:col-span-4 space-y-6">
            {/* System Mode Switch banner */}
            <div className={`rounded-2xl border p-6 space-y-4 transition-all ${
              maintenanceMode 
                ? 'bg-rose-50 border-rose-200 text-rose-800' 
                : 'bg-emerald-55/10 border-emerald-200 text-emerald-800'
            }`}>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-outline">
                  System Mode Switch
                </span>
                <span className={`w-3.5 h-3.5 rounded-full ${maintenanceMode ? 'bg-rose-600 animate-pulse' : 'bg-emerald-500 animate-pulse'}`}></span>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-lg flex items-center gap-1.5 text-primary">
                  <Wifi className="w-5 h-5 shrink-0" />
                  {maintenanceMode ? 'Maintenance Mode Locked' : 'Voting System Active'}
                </h4>
                <p className="text-xs text-on-surface-variant/90 leading-relaxed">
                  {maintenanceMode 
                    ? 'Student-facing ballot terminals are completely locked. Visitors see a temporary maintenance countdown. Admins retain full read-only portal logins.' 
                    : 'The public voting framework is completely live. Student networks can login, parse nominee listings, authenticate 2FA, and cast votes.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  maintenanceMode 
                    ? 'bg-rose-600 text-white border-rose-700 hover:bg-rose-700' 
                    : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                {maintenanceMode ? 'Release System Live to Public' : 'Lock System for Diagnostics'}
              </button>
            </div>

            {/* Database integrations details and parameters info */}
            <div className="bg-surface-container-low border border-outline-variant p-6 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                <Database className="w-5 h-5 text-secondary" />
                Linked Academic Database
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Synchronized directly against Ghana Telecom University core registries index. Updates to student enrollments propagate instantly.
              </p>
              <div className="space-y-2 border-t pt-4 text-[11px] font-mono text-on-surface-variant">
                <div className="flex justify-between">
                  <span className="font-sans font-semibold">Instance URL:</span>
                  <span>gtu-db-master.cloud</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans font-semibold">Port Connection:</span>
                  <span>5432 (SSL Only)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans font-semibold">Synced Records:</span>
                  <span>4,281 Certified Students</span>
                </div>
              </div>
            </div>

            {/* Advisory integrity box note */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3 text-xs text-amber-900 leading-relaxed font-semibold">
              <AlertTriangle className="text-amber-600 w-5 h-5 shrink-0" />
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest block text-amber-800">Operational Notice</span>
                <p className="text-[11px] font-medium leading-relaxed">
                  Rotating cryptograhic signature keys or toggling forced SLA maintenance mode resets active token sessions across browser cookies. Proceed in coordination with the institutional tech lead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-xs text-outline font-bold uppercase tracking-widest">
        Ghana Telecom University • Administrative Parameter Core
      </footer>
    </div>
  );
}

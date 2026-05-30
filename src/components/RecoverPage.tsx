/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, ChevronLeft, ArrowRight, Loader2, Info } from 'lucide-react';
import { ScreenType } from '../types';

interface RecoverPageProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function RecoverPage({ onNavigate }: RecoverPageProps) {
  const [identifier, setIdentifier] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('A secure password reset verification link has been dispatched to your registered credentials.');
      onNavigate('reset');
    }, 1500);
  };

  return (
    <div className="w-full max-w-[460px] px-4 md:px-0 mx-auto py-12 flex flex-col items-center">
      {/* Recovery Banner Header Logo screen */}
      <h1 className="text-xl font-bold tracking-widest text-primary mb-12 flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
        <Shield className="w-6 h-6 text-primary fill-surface-container" />
        GTU E-VOTING
      </h1>

      {/* Recover Container Card box */}
      <div className="w-full bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-xl overflow-hidden">
        <div className="h-2 bg-primary"></div>
        <div className="p-8 md:p-10">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-container-high mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#001b3c] mb-2 leading-tight">
              Recover Your Account
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm mx-auto">
              Enter your official GTU student/staff ID or registered academic email address to receive a secure password reset link via email or SMS.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-on-surface block ml-1" htmlFor="identifier">
                Student/Staff ID or Email
              </label>
              <input
                id="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 040912345 or student@gtu.edu.gh"
                className="w-full px-4 py-3.5 bg-surface border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm outline-none placeholder:text-outline/40"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !identifier}
              className="w-full py-4 bg-primary hover:bg-primary-container disabled:opacity-50 text-white font-bold text-sm uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <span>Send Reset Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Action Back To Login page */}
          <div className="mt-8 pt-6 border-t border-outline-variant/50 flex flex-col items-center">
            <button
              onClick={() => onNavigate('login')}
              className="flex items-center gap-1 text-xs font-bold text-primary hover:underline transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Return to Login Portal
            </button>
          </div>
        </div>

        {/* System security notice footer block */}
        <div className="bg-surface-container-low p-6 flex gap-4 border-t border-outline-variant/30 text-xs">
          <Info className="text-secondary shrink-0 w-5 h-5" />
          <div className="space-y-1">
            <h4 className="font-bold text-secondary uppercase tracking-widest text-[10px]">
              Security Notice
            </h4>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              For your cryptographic protection, account reset codes are only valid for 10 minutes. Ensure you have fast access to the email linked to your student academic credentials records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

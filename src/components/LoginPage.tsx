/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  School,
  Verified,
  IdCard,
  Lock,
  ArrowRight,
  ShieldCheck,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { ScreenType } from '../types';

interface LoginPageProps {
  onNavigate: (screen: ScreenType) => void;
  onLoginSuccess: (studentId: string) => void;
}

export default function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !password) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onLoginSuccess(studentId);
        onNavigate('verification');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-[440px] px-4 md:px-0 mx-auto py-12 flex flex-col items-center">
      {/* Hero/Logo Section */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="relative w-20 h-20 mb-4">
          <div className="absolute inset-0 bg-primary rounded-2xl rotate-6 opacity-10"></div>
          <div className="absolute inset-0 bg-primary rounded-2xl shadow-xl flex items-center justify-center">
            <School className="text-white w-10 h-10" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary-container rounded-full flex items-center justify-center border-4 border-background shadow-sm">
            <Verified className="text-on-secondary-container w-4 h-4 fill-secondary-container" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-primary tracking-tight">GTU e-Vote</h1>
        <p className="text-sm text-on-surface-variant font-medium mt-1 opacity-80">
          Institutional Digital Voting Platform
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full bg-surface-container-lowest/90 border border-white/40 glass-effect rounded-2xl p-6 md:p-8 login-card-shadow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary">Secure Login</h2>
          <p className="text-on-surface-variant text-sm mt-1 opacity-70">
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ID Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant ml-1" htmlFor="student_id">
              GTU Student/Staff ID
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                <IdCard className="w-5 h-5" />
              </span>
              <input
                id="student_id"
                type="text"
                placeholder="e.g. 040912345"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-surface/50 border border-outline-variant/60 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm outline-none placeholder:text-outline/40"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant" htmlFor="password">
                Password
              </label>
              <button
                type="button"
                onClick={() => onNavigate('recover')}
                className="text-xs font-bold text-secondary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                <Lock className="w-5 h-5" />
              </span>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-surface/50 border border-outline-variant/60 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm outline-none placeholder:text-outline/40"
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-3 py-1 ml-1">
            <input
              id="remember"
              type="checkbox"
              checked={rememberId}
              onChange={(e) => setRememberId(e.target.checked)}
              className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm font-medium text-on-surface/80 cursor-pointer select-none">
              Remember my ID
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full bg-primary text-white font-semibold text-base py-4 rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/25 disabled:opacity-80 active:scale-[0.98] hover:-translate-y-[1px] transition-all flex items-center justify-center gap-3 mt-8 cursor-pointer"
          >
            {status === 'idle' && (
              <>
                Sign In
                <ArrowRight className="w-5 h-5" />
              </>
            )}
            {status === 'submitting' && (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Authenticating...
              </>
            )}
            {status === 'success' && (
              <>
                <CheckCircle2 className="w-5 h-5 text-teal-300" />
                Success
              </>
            )}
          </button>
        </form>

        {/* Secondary Action */}
        <div className="mt-6 pt-6 border-t border-outline-variant/30 flex flex-col items-center gap-4">
          <p className="text-xs text-on-surface-variant opacity-70">First time here?</p>
          <button
            onClick={() => onNavigate('restricted')}
            className="w-full text-sm font-semibold text-primary border-2 border-primary/10 bg-primary/5 py-3 rounded-xl hover:bg-primary/10 hover:border-primary/20 transition-all cursor-pointer"
          >
            Register Account
          </button>
        </div>
      </div>

      {/* Security Notice Footer */}
      <div className="w-full mt-8 space-y-6">
        <div className="bg-surface-container-low/60 border border-outline-variant/20 rounded-2xl p-4 flex gap-4 items-start shadow-sm">
          <div className="p-2 bg-secondary/10 rounded-lg shrink-0">
            <ShieldCheck className="text-secondary w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
              Security Notice
            </p>
            <p className="text-xs text-on-surface-variant/90 leading-relaxed">
              Verify you are on the official <strong className="text-primary font-semibold">gtu.edu.gh</strong> domain. All sessions are encrypted with 256-bit SSL for your protection.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[11px] font-semibold text-outline/65 uppercase tracking-widest">
            © 2024 Ghana Telecom University. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

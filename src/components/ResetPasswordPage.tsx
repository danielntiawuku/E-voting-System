/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ArrowLeft, Key, CornerDownLeft, Loader2, CheckCircle, Info } from 'lucide-react';
import { ScreenType } from '../types';

interface ResetPasswordPageProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function ResetPasswordPage({ onNavigate }: ResetPasswordPageProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Strength score evaluation
  const scoreStrength = () => {
    if (!password) return { label: 'Empty', color: 'text-outline', score: 0 };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 1) return { label: 'Weak', color: 'text-rose-500', score: 1 };
    if (score === 2) return { label: 'Fair', color: 'text-amber-500', score: 2 };
    if (score === 3) return { label: 'Good', color: 'text-blue-500', score: 3 };
    return { label: 'Strong', color: 'text-teal-500', score: 4 };
  };

  const strength = scoreStrength();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsSuccess(true);
      setTimeout(() => {
        onNavigate('login');
      }, 1500);
    }, 1800);
  };

  return (
    <div className="w-full max-w-[460px] px-4 md:px-0 mx-auto py-12 flex flex-col items-center">
      {/* Recovery Card Header */}
      <div className="w-full bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-xl p-6 md:p-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mb-3 text-white">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#001b3c] mb-1">Create New Password</h2>
          <p className="text-sm text-on-surface-variant max-w-sm">
            Enter your new secure cryptographic password below
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          {/* New Password field with visibility toggle */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-on-surface block ml-1" htmlFor="new_password">
              New Password
            </label>
            <div className="relative">
              <input
                id="new_password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter 8+ characters"
                className="w-full h-14 bg-surface border-2 border-outline-variant rounded-xl px-4 pr-12 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm outline-none placeholder:text-outline/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password security strength indicator row visual segments */}
            <div className="space-y-1.5 pt-1.5">
              <div className="flex justify-between items-center px-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">
                  Security Strength
                </span>
                <span className={`text-[11px] font-extrabold uppercase tracking-widest ${strength.color}`}>
                  {strength.label}
                </span>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden flex gap-1">
                <div
                  className={`h-full flex-1 transition-all duration-300 ${
                    strength.score >= 1
                      ? strength.score === 1
                        ? 'bg-rose-500'
                        : strength.score === 2
                        ? 'bg-amber-400'
                        : strength.score === 3
                        ? 'bg-blue-500'
                        : 'bg-teal-500'
                      : 'bg-outline-variant/50'
                  }`}
                ></div>
                <div
                  className={`h-full flex-1 transition-all duration-300 ${
                    strength.score >= 2
                      ? strength.score === 2
                        ? 'bg-amber-400'
                        : strength.score === 3
                        ? 'bg-blue-500'
                        : 'bg-teal-500'
                      : 'bg-outline-variant/50'
                  }`}
                ></div>
                <div
                  className={`h-full flex-1 transition-all duration-300 ${
                    strength.score >= 3
                      ? strength.score === 3
                        ? 'bg-blue-500'
                        : 'bg-teal-500'
                      : 'bg-outline-variant/30'
                  }`}
                ></div>
                <div
                  className={`h-full flex-1 transition-all duration-300 ${
                    strength.score >= 4 ? 'bg-teal-500' : 'bg-outline-variant/30'
                  }`}
                ></div>
              </div>
            </div>
          </div>

          {/* Confirm Password field with visibility toggle */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-on-surface block ml-1" htmlFor="confirm_password">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirm_password"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full h-14 bg-surface border-2 border-outline-variant rounded-xl px-4 pr-12 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm outline-none placeholder:text-outline/40"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Info card compliance prompt */}
          <div className="flex gap-2.5 p-3.5 bg-surface-container-low rounded-xl border border-outline-variant shadow-sm text-xs">
            <Info className="text-primary w-5 h-5 shrink-0" />
            <p className="text-on-surface-variant/90 leading-relaxed text-[11px]">
              Password must contain at least 8 characters including uppercase letters, numerical digits, and unique symbols for robust safety.
            </p>
          </div>

          {/* Action button reset password */}
          <button
            type="submit"
            disabled={isUpdating || isSuccess}
            className="w-full h-14 bg-primary text-white font-bold uppercase text-xs tracking-wider hover:bg-primary-container hover:shadow-lg disabled:opacity-50 transition-all rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-primary/10"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating Code Index...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-teal-300 animate-bounce" />
                Password Code Updated
              </>
            ) : (
              <>
                <span>Reset Password</span>
                <Key className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('login')}
            className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login Portal
          </button>
        </div>
      </div>
    </div>
  );
}

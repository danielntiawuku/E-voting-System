/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight, Loader2, CheckCircle2, RefreshCw } from 'lucide-react';
import { ScreenType } from '../types';

interface VerificationPageProps {
  onNavigate: (screen: ScreenType) => void;
  studentId: string;
}

export default function VerificationPage({ onNavigate, studentId }: VerificationPageProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(119); // 1:59 = 119 seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer Countdown loop
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    // Restrict strictly to numbers
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (!cleanValue) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    const newOtp = [...otp];
    // Take only first char
    const char = cleanValue[0];
    newOtp[index] = char;
    setOtp(newOtp);

    // Auto focus next input
    if (index < 5 && char) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const formattedTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `0${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const codes = otp.join('');
    if (codes.length < 6) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onNavigate('vote');
      }, 1000);
    }, 1500);
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    alert('A new secure verification code has been dispatched to your email.');
    setTimeLeft(120);
    setOtp(Array(6).fill(''));
    // Focus first element
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="w-full max-w-[460px] px-4 md:px-0 mx-auto py-12 flex flex-col items-center">
      {/* Top Banner Branding styling */}
      <h1 className="text-xl font-bold tracking-widest text-primary mb-12 flex items-center gap-2">
        <ShieldCheck className="w-6 h-6 text-primary fill-surface-container" />
        GTU e-Vote
      </h1>

      {/* Security Illustration */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-surface-container-high rounded-full mb-4 shadow-sm border border-outline-variant">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-1">Secure Verification</h2>
        <p className="text-sm text-on-surface-variant max-w-[320px] mx-auto leading-relaxed">
          To ensure the integrity of your vote, enter the 6-digit verification code sent to{' '}
          <span className="font-semibold text-on-surface">k***@st.gtu.edu.gh</span>
        </p>
      </div>

      {/* Verification Card */}
      <div className="w-full bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
        <form onSubmit={handleVerify} className="space-y-6">
          {/* OTP Input Fields Row */}
          <div className="flex justify-between gap-1.5 md:gap-3">
            {otp.map((val, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={val}
                ref={(el) => { inputRefs.current[idx] = el; }}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                required
                className="otp-input w-12 h-16 md:w-14 md:h-20 text-center text-2xl font-bold text-primary border-2 border-outline-variant rounded-xl bg-surface-bright focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
              />
            ))}
          </div>

          {/* Verification CTA */}
          <div className="space-y-4 pt-2">
            <button
              type="submit"
              disabled={otp.join('').length < 6 || isSubmitting || isSuccess}
              className="w-full bg-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/15"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying Identity...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-teal-300" />
                  Success Verified
                </>
              ) : (
                <>
                  Verify Identity
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Timer Actions */}
            <div className="flex flex-col items-center gap-2 pt-2 text-center">
              {timeLeft > 0 ? (
                <p className="text-xs font-semibold text-on-surface-variant tracking-wider">
                  Resend code in <span className="font-bold text-primary">{formattedTime()}</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Resend Code Now
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Encryption Footer indicator */}
      <div className="mt-8 flex items-center gap-2 text-outline">
        <ShieldCheck className="w-4 h-4" />
        <p className="text-[10px] font-bold tracking-widest uppercase">
          End-to-End Encrypted Verification
        </p>
      </div>
    </div>
  );
}

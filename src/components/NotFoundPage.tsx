/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, Shield, BarChart2, MessageSquare, Compass, ArrowRight } from 'lucide-react';
import { ScreenType } from '../types';

interface NotFoundPageProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center py-10">
      {/* Top logo branding header */}
      <h1 className="text-xl font-bold tracking-widest text-primary mb-12 flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
        <Shield className="w-6 h-6 text-primary fill-surface-container" />
        GTU E-VOTING
      </h1>

      {/* Main Container box */}
      <div className="w-full flex flex-col items-center text-center relative z-10">
        {/* Animated illustration explore node */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-4 bg-primary-container/10 rounded-full blur-2xl group-hover:bg-secondary-container/20 transition-all duration-700"></div>
          <div className="relative bg-surface-container-lowest p-6 rounded-[2rem] shadow-sm border border-outline-variant/60">
            <Compass className="text-primary w-20 h-20 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>

        {/* Error descriptions details */}
        <div className="mb-8">
          <h2 className="text-6xl font-black text-primary tracking-tighter mb-2">404</h2>
          <h3 className="text-xl font-bold text-on-surface mb-2">Page Not Found</h3>
          <p className="text-sm text-on-surface-variant max-w-md leading-relaxed mx-auto">
            The ballot folder or sub-page you are searching for might have been archived, transferred to registry index, or does not exist.
          </p>
        </div>

        {/* Action routing CTA rows */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => onNavigate('landing')}
            className="bg-primary hover:bg-[#003366] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            Back to Home Journey
          </button>
          <button
            onClick={() => onNavigate('vote')}
            className="border-2 border-primary text-primary px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-surface-container transition-all cursor-pointer flex items-center gap-2"
          >
            Voter Portal Dashboard
          </button>
        </div>

        {/* Category cards alternative links block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full max-w-[900px] px-4">
          {/* Quick link item A */}
          <div
            onClick={() => onNavigate('landing')}
            className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant hover:border-primary transition-all group cursor-pointer text-left"
          >
            <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-primary mb-1">Security Info</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Read how cryptographic models secure votes.
            </p>
          </div>

          {/* Quick link item B */}
          <div
            onClick={() => onNavigate('results')}
            className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant hover:border-primary transition-all group cursor-pointer text-left"
          >
            <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center mb-4 text-on-secondary-container group-hover:scale-110 transition-transform">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-primary mb-1">Live Results</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              View live counting updates from casting streams.
            </p>
          </div>

          {/* Quick link item C */}
          <div
            onClick={() => onNavigate('recover')}
            className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant hover:border-primary transition-all group cursor-pointer text-left"
          >
            <div className="w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-primary mb-1">Contact Admin</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Dispatch support queries regarding credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

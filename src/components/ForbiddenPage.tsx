/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldAlert, LogOut, ChevronRight, HelpCircle, School } from 'lucide-react';
import { ScreenType } from '../types';

interface ForbiddenPageProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function ForbiddenPage({ onNavigate }: ForbiddenPageProps) {
  const [showTechDetails, setShowTechDetails] = useState(false);

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
      {/* Top logo branding header */}
      <h1 className="text-xl font-bold tracking-widest text-primary mb-12 flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
        <ShieldAlert className="w-6 h-6 text-primary fill-surface-container" />
        GTU E-VOTING
      </h1>

      {/* Access Denied Container Card box */}
      <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-10 shadow-lg flex flex-col items-center text-center">
        {/* Shield with lock badge */}
        <div className="mb-6 relative">
          <div className="w-28 h-28 rounded-full bg-surface-container-high flex items-center justify-center shadow-md">
            <ShieldAlert className="w-12 h-12 text-[#93000a]" />
          </div>
        </div>

        {/* Action descriptions */}
        <div className="space-y-3 mb-8">
          <h2 className="text-2xl font-black text-[#001b3c]">Restricted Access</h2>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            You do not have the authorization credentials or role-based configurations needed to view this administrative secure section. If this is an error, contact the GTU Electoral commission.
          </p>
        </div>

        {/* CTA rows */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => onNavigate('vote')}
            className="bg-primary hover:bg-[#003366] text-white font-bold text-xs uppercase tracking-wide px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Return to Dashboard
          </button>
          <button
            onClick={() => onNavigate('landing')}
            className="border-2 border-outline hover:bg-surface-container-low text-on-surface font-bold text-xs uppercase tracking-wide px-8 py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            System Guidelines
          </button>
        </div>

        {/* Technical debugging information drawer */}
        <div className="mt-10 pt-4 border-t border-outline-variant/60 w-full text-left">
          <div
            onClick={() => setShowTechDetails(!showTechDetails)}
            className="flex items-center justify-between cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline">
              Security Log Reference ID: GTU-403-E-VOTE
            </span>
            <ChevronRight
              className={`w-4 h-4 text-outline transform transition-transform ${
                showTechDetails ? 'rotate-90' : ''
              }`}
            />
          </div>

          {showTechDetails && (
            <div className="mt-4 bg-surface-container-low p-4 rounded-xl space-y-2 border border-outline-variant/30 text-xs">
              <p className="text-[11px] text-on-surface-variant font-mono">
                <strong>Policy Enforcement:</strong> Role-Based Access Control (RBAC)<br />
                <strong>Timestamp Index:</strong> {new Date().toISOString()}<br />
                <strong>Authorization Module:</strong> `/secure-ballot-management/admin-panel`
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Institutional logo branding footer */}
      <div className="mt-8 flex flex-col items-center gap-3 text-center">
        <School className="text-secondary opacity-40 w-8 h-8" />
        <p className="text-[10px] font-bold text-outline uppercase tracking-widest leading-relaxed">
          Ghana Telecom University
          <br />Electoral Transparency Committee
        </p>
      </div>
    </div>
  );
}

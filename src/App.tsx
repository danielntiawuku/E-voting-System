/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType } from './types';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import VerificationPage from './components/VerificationPage';
import VoterDashboard from './components/VoterDashboard';
import LiveResults from './components/LiveResults';
import RecoverPage from './components/RecoverPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import ForbiddenPage from './components/ForbiddenPage';
import NotFoundPage from './components/NotFoundPage';
import BroadcastManagement from './components/BroadcastManagement';
import SystemAuditLog from './components/SystemAuditLog';
import ReportsAnalytics from './components/ReportsAnalytics';
import GlobalSettings from './components/GlobalSettings';
import AdminUserManagement from './components/AdminUserManagement';

// High-fidelity extra screens
import { LoginRedesign, CastEarly, ResultsEarly } from './components/AuthAndCoreScreens';
import VoterPortalScreens from './components/VoterPortalScreens';
import AdminPortalScreens from './components/AdminPortalScreens';

import {
  Layers,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Home,
  Lock,
  Shield,
  FileText,
  BarChart2,
  HelpCircle,
  Key,
  AlertTriangle,
  XCircle,
  Mail,
  Terminal,
  TrendingUp,
  Settings,
  UserPlus,
  Users,
  Vote,
  Unlock,
  ShieldAlert,
  Sliders,
  UserCheck,
  Building,
  Activity,
  FileSpreadsheet
} from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [studentId, setStudentId] = useState('040912345');
  const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Accordion state categories for the 41-screen directory
  const [isSet1Open, setIsSet1Open] = useState(true);
  const [isSet2Open, setIsSet2Open] = useState(false);
  const [isSet3Open, setIsSet3Open] = useState(false);

  // Helper routine to register login credentials
  const handleLoginSuccess = (id: string) => {
    setStudentId(id);
  };

  // Helper routine to record casted vote
  const handleCastVote = (candidateId: string) => {
    setVotedCandidateId(candidateId);
  };

  // Directory matrices
  const set1Screens = [
    { id: 'landing', label: '1. Landing / Welcome', icon: Home },
    { id: 'login', label: '2. Secure Login', icon: Lock },
    { id: 'login-redesign', label: '3. Login Redesign', icon: Unlock },
    { id: 'verification', label: '4. 2FA Verification OTP', icon: Shield },
    { id: 'recover', label: '5. Recover Password Email', icon: HelpCircle },
    { id: 'reset', label: '6. Set New Password', icon: Key },
    { id: 'notFound', label: '7. Page Not Found (404)', icon: XCircle },
    { id: 'restricted', label: '8. Access Denied (403)', icon: AlertTriangle },
    { id: 'cast-early', label: '9. Cast Your Vote (Early)', icon: Vote },
    { id: 'results-early', label: '10. Live Results (Early)', icon: BarChart2 }
  ];

  const set2Screens = [
    { id: 'voter-dashboard', label: '11. Voter Dashboard', icon: Home },
    { id: 'election-details', label: '12. Election Details', icon: Building },
    { id: 'candidate-profile', label: '13. Candidate Profile', icon: UserCheck },
    { id: 'digital-ballot', label: '14. Digital Ballot (3-Step)', icon: Vote },
    { id: 'vote-confirmation', label: '15. Vote Review / Sign', icon: ShieldCheck },
    { id: 'vote-receipt', label: '16. Vote Hashed Receipt', icon: FileSpreadsheet },
    { id: 'live-results-voter', label: '17. Voter Leaderboard', icon: BarChart2 },
    { id: 'notifications-voter', label: '18. Notifications Inbox', icon: Mail },
    { id: 'account-settings-voter', label: '19. Account Settings', icon: Settings },
    { id: 'candidate-reg-1', label: '20. Nominee Credentials', icon: UserPlus },
    { id: 'candidate-reg-2', label: '21. Position Charter', icon: Sliders },
    { id: 'candidate-reg-3', label: '22. Review & Submit Application', icon: ShieldAlert },
    { id: 'candidate-dashboard', label: '23. Candidate Hub Dashboard', icon: Activity },
    { id: 'application-status', label: '24. Progressive Application Status', icon: Activity },
    { id: 'edit-candidate-profile', label: '25. Revise Nominee Charter', icon: Settings },
    { id: 'candidate-election-results', label: '26. Candidate Personal Standings', icon: BarChart2 }
  ];

  const set3Screens = [
    { id: 'admin-dashboard', label: '27. Central Executive View', icon: ShieldAlert },
    { id: 'elections-management', label: '28. Elections Management Table', icon: Sliders },
    { id: 'setup-new-election', label: '29. Create Election Form', icon: Plus },
    { id: 'edit-election-detail', label: '30. Edit Existing Roster', icon: Settings },
    { id: 'manage-election-detail', label: '31. Live Administrative controls', icon: Sliders },
    { id: 'candidate-applications', label: '32. Candidate Approvals Panel', icon: UserCheck },
    { id: 'review-candidacy', label: '33. Academic Clearance Stamp', icon: ShieldCheck },
    { id: 'voter-roll-registry', label: '34. Voter Roll Registry list', icon: Users },
    { id: 'voter-profile-admin', label: '35. Individual voter history', icon: Activity },
    { id: 'advanced-election-analytics', label: '36. Turnout Analytical Curves', icon: TrendingUp },
    { id: 'broadcast-management-admin', label: '37. Command Center Broadcasts', icon: Mail },
    { id: 'system-audit-log-admin', label: '38. Cryptographic Auditing Ledger', icon: Terminal },
    { id: 'reports-analytics-admin', label: '39. Printable deviance reports', icon: FileText },
    { id: 'global-system-settings', label: '40. Security Parameters Override', icon: Settings },
    { id: 'admin-user-management', label: '41. Admin user roles matrix', icon: UserPlus }
  ];

  const handleSidebarNavigate = (screenId: string) => {
    setCurrentScreen(screenId as ScreenType);
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative min-h-screen scrollbar-none">
      {/* Background Graphic Watermark elements */}
      <div className="fixed top-0 right-0 -z-50 opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4">
        <Layers className="text-indigo-900 w-[800px] h-[800px]" />
      </div>

      {/* Primary Display Screen based on Current state router */}
      <div className="w-full">
        {/* Set 1: Authentication & Core pages */}
        {currentScreen === 'landing' && (
          <LandingPage onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'login' && (
          <LoginPage onNavigate={setCurrentScreen} onLoginSuccess={handleLoginSuccess} />
        )}
        {currentScreen === 'login-redesign' && (
          <LoginRedesign onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'verification' && (
          <VerificationPage onNavigate={setCurrentScreen} studentId={studentId} />
        )}
        {currentScreen === 'vote' && (
          <VoterDashboard
            onNavigate={setCurrentScreen}
            onCastVote={handleCastVote}
            votedCandidateId={votedCandidateId}
          />
        )}
        {currentScreen === 'results' && (
          <LiveResults onNavigate={setCurrentScreen} votedCandidateId={votedCandidateId} />
        )}
        {currentScreen === 'recover' && (
          <RecoverPage onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'reset' && (
          <ResetPasswordPage onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'restricted' && (
          <ForbiddenPage onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'notFound' && (
          <NotFoundPage onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'cast-early' && (
          <CastEarly onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'results-early' && (
          <ResultsEarly onNavigate={setCurrentScreen} />
        )}

        {/* Dynamic Voter Portal (Set 2) Selector */}
        {[
          'voter-dashboard',
          'election-details',
          'candidate-profile',
          'digital-ballot',
          'vote-confirmation',
          'vote-receipt',
          'live-results-voter',
          'notifications-voter',
          'account-settings-voter',
          'candidate-reg-1',
          'candidate-reg-2',
          'candidate-reg-3',
          'candidate-dashboard',
          'application-status',
          'edit-candidate-profile',
          'candidate-election-results'
        ].includes(currentScreen) && (
          <VoterPortalScreens
            currentVoterScreen={currentScreen}
            onNavigate={setCurrentScreen}
            onNavigateVoter={setCurrentScreen}
          />
        )}

        {/* Dynamic Admin Portal (Set 3) Selector */}
        {[
          'admin-dashboard',
          'elections-management',
          'setup-new-election',
          'edit-election-detail',
          'manage-election-detail',
          'candidate-applications',
          'review-candidacy',
          'voter-roll-registry',
          'voter-profile-admin',
          'advanced-election-analytics',
          'broadcast-management-admin',
          'system-audit-log-admin',
          'reports-analytics-admin',
          'global-system-settings',
          'admin-user-management'
        ].includes(currentScreen) && (
          <AdminPortalScreens
            currentAdminScreen={currentScreen}
            onNavigate={setCurrentScreen}
            onNavigateAdmin={setCurrentScreen}
          />
        )}

        {/* Backwards compatibility fallback routes to old standalones */}
        {currentScreen === 'broadcast' && (
          <BroadcastManagement onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'audit' && (
          <SystemAuditLog onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'reports' && (
          <ReportsAnalytics onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'settings' && (
          <GlobalSettings onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'adminUsers' && (
          <AdminUserManagement onNavigate={setCurrentScreen} />
        )}
      </div>

      {/* Global Sidebar Hamburger Trigger Button (Top Left Corner) */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-3 left-3 md:top-4 md:left-4 z-50 p-2.5 bg-[#001e40] text-amber-400 hover:text-white hover:bg-[#002d62] rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center shadow-lg border border-white/15 active:scale-95"
        title="Open Screen Directory Menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar Navigation Drawer */}
      {isSidebarOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[60] cursor-pointer transition-opacity duration-300"
          />

          {/* Sliding drawer container */}
          <div className="fixed top-0 left-0 h-full w-80 bg-[#001e40] text-white z-[70] shadow-2xl flex flex-col p-5 border-r border-white/10 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-amber-400 w-6 h-6" />
                <div>
                  <h3 className="font-extrabold text-sm tracking-wider uppercase text-white leading-none">e-Voting Portal</h3>
                  <span className="text-[10px] font-bold text-amber-400 tracking-widest uppercase">41 Active Screens</span>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tree Accordion categories */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-none">
              
              {/* Category 1: Set 1 — Auth & Core */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsSet1Open(!isSet1Open)}
                  className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-white/5 rounded-lg text-[10px] uppercase font-black tracking-widest text-[#8da2bb]"
                >
                  <span>1. Authentication & Core (10)</span>
                  {isSet1Open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
                {isSet1Open && (
                  <div className="space-y-1 pl-1 transition-all">
                    {set1Screens.map((item) => {
                      const IconComponent = item.icon;
                      const isActive = currentScreen === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSidebarNavigate(item.id)}
                          className={`w-full text-left px-3.5 py-2 rounded-lg flex items-center gap-3 transition-all text-xs font-semibold cursor-pointer ${
                            isActive
                              ? 'bg-amber-400 text-[#001e40] font-bold shadow-md shadow-amber-400/10'
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#001e40]' : 'text-amber-400/90'}`} />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Category 2: Set 2 — Voter Portal */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsSet2Open(!isSet2Open)}
                  className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-white/5 rounded-lg text-[10px] uppercase font-black tracking-widest text-[#8da2bb]"
                >
                  <span>2. Voter Portal (16)</span>
                  {isSet2Open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
                {isSet2Open && (
                  <div className="space-y-1 pl-1 transition-all">
                    {set2Screens.map((item) => {
                      const IconComponent = item.icon;
                      const isActive = currentScreen === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSidebarNavigate(item.id)}
                          className={`w-full text-left px-3.5 py-2 rounded-lg flex items-center gap-3 transition-all text-xs font-semibold cursor-pointer ${
                            isActive
                              ? 'bg-amber-400 text-[#001e40] font-bold shadow-md shadow-amber-400/10'
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#001e40]' : 'text-amber-400/90'}`} />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Category 3: Set 3 — Admin Portal */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsSet3Open(!isSet3Open)}
                  className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-white/5 rounded-lg text-[10px] uppercase font-black tracking-widest text-[#8da2bb]"
                >
                  <span>3. Admin Portal (15)</span>
                  {isSet3Open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
                {isSet3Open && (
                  <div className="space-y-1 pl-1 transition-all">
                    {set3Screens.map((item) => {
                      const IconComponent = item.icon;
                      const isActive = currentScreen === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSidebarNavigate(item.id)}
                          className={`w-full text-left px-3.5 py-2 rounded-lg flex items-center gap-3 transition-all text-xs font-semibold cursor-pointer ${
                            isActive
                              ? 'bg-amber-400 text-[#001e40] font-bold shadow-md shadow-amber-400/10'
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#001e40]' : 'text-amber-400/90'}`} />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/10 mt-3 text-center">
              <p className="text-[10px] font-black text-[#8da2bb] uppercase tracking-widest leading-none">
                Ghana Telecom University
              </p>
              <p className="text-[8px] text-white/40 tracking-wider mt-1">
                Technical Sandbox Blueprint Active
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Plus helper icon stub
function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

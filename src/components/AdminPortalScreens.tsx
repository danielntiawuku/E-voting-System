/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Search,
  Plus,
  Edit,
  Play,
  Pause,
  Clock,
  Trash2,
  CheckCircle,
  XCircle,
  Upload,
  FileText,
  BarChart2,
  TrendingUp,
  Mail,
  Terminal,
  Settings,
  Key,
  UserPlus,
  ArrowRight,
  School,
  ShieldCheck,
  Award,
  Sliders,
  Check,
  Layers
} from 'lucide-react';
import { ScreenType } from '../types';

interface AdminPortalProps {
  currentAdminScreen: string;
  onNavigate: (screen: ScreenType) => void;
  onNavigateAdmin: (screen: string) => void;
}

export default function AdminPortalScreens({ currentAdminScreen, onNavigate, onNavigateAdmin }: AdminPortalProps) {
  // Shared States
  const [elections, setElections] = useState([
    { id: 'EL-01', title: 'SRC President 2024', status: 'Live', voters: '1,894/4,281 cast', dept: 'All Campus' },
    { id: 'EL-02', title: 'Faculty of Technology Reps', status: 'Upcoming', voters: 'Not started', dept: 'SOT School' },
    { id: 'EL-03', title: 'Computing Faculty Board Special Election', status: 'Paused', voters: '480/1,200 cast', dept: 'SCS School' },
    { id: 'EL-04', title: 'SRC General Secretary 2023', status: 'Concluded', voters: '3,890/4,000 cast', dept: 'All Campus' },
  ]);

  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming'>('all');

  // New Election Form
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('All Campus');
  
  // Edit Election
  const [editTargetId, setEditTargetId] = useState('EL-01');
  const [editTitle, setEditTitle] = useState('SRC President 2024');

  // Broadcast State
  const [bText, setBText] = useState('');
  const [bChannel, setBChannel] = useState<'SMS Only' | 'Email Only' | 'All Channels'>('All Channels');

  // Voter List State
  const [voterFilter, setVoterFilter] = useState('');

  // Setup/Create Function
  const handleCreateElection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newEl = {
      id: `EL-0${elections.length + 1}`,
      title: newTitle,
      status: 'Upcoming',
      voters: '0/1,500 cast',
      dept: newDept
    };
    setElections([...elections, newEl]);
    setNewTitle('');
    alert('Election successfully initialized in system ledger!');
    onNavigateAdmin('elections-management');
  };

  // Safe Pause Polling
  const togglePollingState = (id: string) => {
    setElections(elections.map(el => {
      if (el.id === id) {
        return {
          ...el,
          status: el.status === 'Live' ? 'Paused' : 'Live'
        };
      }
      return el;
    }));
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-16 font-sans">
      {/* Sandbox bar */}
      <div className="bg-[#001e40] py-3.5 px-6 text-white flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-amber-400 w-5 h-5" />
          <h4 className="text-xs font-black uppercase tracking-widest leading-none">ADMINISTRATIVE MASTER SANDBOX</h4>
        </div>
        <div className="flex gap-2.5">
          <span className="text-[10px] bg-red-400 text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
            ADMIN VIEW: {currentAdminScreen.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8">

        {/* ==================== 1. ADMIN DASHBOARD ==================== */}
        {currentAdminScreen === 'admin-dashboard' && (
          <div className="space-y-6">
            <div className="bg-[#0d1f38] text-white p-6 rounded-3xl flex justify-between items-center shadow-lg">
              <div>
                <span className="text-[9px] uppercase tracking-widest bg-amber-400 text-slate-900 font-extrabold px-2.5 py-1 rounded inline-block mb-2">Systems Active</span>
                <h3 className="text-xl font-black">Electoral Director Terminal</h3>
                <p className="text-xs text-slate-300">Logged in via RSA certificate. Dynamic keys validated.</p>
              </div>
              <button onClick={() => onNavigateAdmin('elections-management')} className="bg-amber-400 text-slate-900 font-black text-xs px-4 py-3 rounded-lg hover:scale-105 cursor-pointer">
                Manage Elections
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white border rounded-2xl p-4.5 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Active Elections</p>
                <p className="text-2xl font-black text-slate-800">1 Live Poll</p>
              </div>
              <div className="bg-white border rounded-2xl p-4.5 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Nominees Registered</p>
                <p className="text-2xl font-black text-slate-800">12 Candidates</p>
              </div>
              <div className="bg-white border rounded-2xl p-4.5 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">System Integrity</p>
                <p className="text-2xl font-black text-emerald-600">100% Ok</p>
              </div>
              <div className="bg-white border rounded-2xl p-4.5 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">API Rotations</p>
                <p className="text-2xl font-black text-slate-800">Daily Hashed</p>
              </div>
            </div>

            {/* Quick Actions Grid layout */}
            <div className="bg-white border rounded-3xl p-6">
              <h4 className="font-extrabold text-base text-[#001e40] mb-4 uppercase tracking-wider">Quick Actions Console</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button onClick={() => onNavigateAdmin('setup-new-election')} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-600 bg-slate-50 transition-all text-center space-y-1 block cursor-pointer">
                  <Plus className="w-5 h-5 text-indigo-600 mx-auto" />
                  <p className="text-xs font-bold">New Election</p>
                </button>
                <button onClick={() => onNavigateAdmin('voter-roll-registry')} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-600 bg-slate-50 transition-all text-center space-y-1 block cursor-pointer">
                  <Users className="w-5 h-5 text-indigo-600 mx-auto" />
                  <p className="text-xs font-bold">Import Voters CSV</p>
                </button>
                <button onClick={() => onNavigateAdmin('broadcast-management-admin')} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-600 bg-slate-50 transition-all text-center space-y-1 block cursor-pointer">
                  <Mail className="w-5 h-5 text-indigo-600 mx-auto" />
                  <p className="text-xs font-bold">Compose Announcements</p>
                </button>
                <button onClick={() => onNavigateAdmin('system-audit-log-admin')} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-600 bg-slate-50 transition-all text-center space-y-1 block cursor-pointer">
                  <Terminal className="w-5 h-5 text-indigo-600 mx-auto" />
                  <p className="text-xs font-bold">System Log Audit</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. ELECTIONS MANAGEMENT ==================== */}
        {currentAdminScreen === 'elections-management' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <h3 className="text-xl font-extrabold text-slate-800 uppercase">Elections Registry List</h3>
              <button onClick={() => onNavigateAdmin('setup-new-election')} className="bg-[#001e40] text-amber-300 px-4 py-2 rounded-xl text-xs font-bold font-semibold uppercase flex items-center gap-1.5 cursor-pointer">
                <Plus className="w-4 h-4" /> Create Election Roster
              </button>
            </div>

            <div className="bg-white border rounded-3xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs divide-y divide-slate-100">
                  <thead className="bg-slate-50 text-slate-400 uppercase font-bold">
                    <tr>
                      <th className="p-4">CODE</th>
                      <th className="p-4">ELECTION TITLE</th>
                      <th className="p-4">ALLOCATED CONSTITUENCY</th>
                      <th className="p-4">BALLOT RATIO</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {elections.map((el) => (
                      <tr key={el.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-mono font-bold text-slate-500">{el.id}</td>
                        <td className="p-4 font-bold text-[#001e40]">{el.title}</td>
                        <td className="p-4 text-slate-500">{el.dept}</td>
                        <td className="p-4">{el.voters}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold inline-block border ${
                            el.status === 'Live' ? 'bg-emerald-58/12 text-emerald-800 border-emerald-300' :
                            el.status === 'Paused' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                            el.status === 'Upcoming' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                            'bg-slate-100 text-slate-500 border-slate-300'
                          }`}>
                            ● {el.status}
                          </span>
                        </td>
                        <td className="p-4 flex gap-2 justify-center">
                          <button onClick={() => {
                            setEditTargetId(el.id);
                            setEditTitle(el.title);
                            onNavigateAdmin('edit-election-detail');
                          }} className="p-1 px-3 bg-slate-50 border hover:bg-slate-100 text-slate-600 rounded cursor-pointer font-bold uppercase transition-all">
                            Edit
                          </button>
                          <button onClick={() => onNavigateAdmin('manage-election-detail')} className="p-1 px-3 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 rounded cursor-pointer font-bold uppercase transition-all">
                            Controls
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. SETUP NEW ELECTION ==================== */}
        {currentAdminScreen === 'setup-new-election' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-black text-[#001e40] mb-4 uppercase text-center">Setup New Election</h3>
              <form onSubmit={handleCreateElection} className="space-y-4 text-left font-semibold text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Election Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Technology Faculty Reps 2024"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border rounded-lg p-3 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Target Constituency</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full bg-slate-50 border rounded-lg p-3 outline-none"
                  >
                    <option value="All Campus">Ghana Telecom Campus (All)</option>
                    <option value="SOT School">School of Technology (SOT)</option>
                    <option value="SCS School">School of Computing Science</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-4 bg-[#001e40] hover:bg-[#002d62] text-amber-300 font-bold uppercase tracking-wider rounded-xl cursor-pointer mt-6 transition-all">
                  Initialize Election Ledger
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================== 4. EDIT ELECTION DETAIL ==================== */}
        {currentAdminScreen === 'edit-election-detail' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-black text-[#001e40] mb-4 uppercase text-center">Edit Election Parameters</h3>
              <div className="space-y-4 text-left font-semibold text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-400">Target Index ID</label>
                  <p className="bg-slate-100 p-3 rounded font-mono font-bold text-slate-600">{editTargetId}</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Modify Election Title</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-slate-50 border rounded-lg p-3 outline-none"
                  />
                </div>

                <button onClick={() => {
                  alert('Electoral details successfully updated!');
                  onNavigateAdmin('elections-management');
                }} className="w-full py-4 bg-indigo-600 text-white font-bold uppercase tracking-wider rounded-xl cursor-pointer mt-6 transition-all">
                  Apply Updates
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 5. MANAGE ELECTION DETAIL ==================== */}
        {currentAdminScreen === 'manage-election-detail' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm text-center">
              <div className="w-12 h-12 bg-red-100 text-red-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#001e40] uppercase">Election Live Controls Panel</h3>
              <p className="text-xs text-slate-500 mt-1">Halt, synchronize, or override active polling parameters.</p>

              <div className="space-y-3.5 mt-6">
                <div className="p-4 bg-slate-50 border rounded-xl flex justify-between items-center text-left">
                  <div>
                    <h5 className="font-bold text-sm text-slate-800">Pause/Resume Polling lines</h5>
                    <p className="text-[10px] text-slate-400">Halt digital ballot entry immediately.</p>
                  </div>
                  <button onClick={() => alert('Polling lines state altered')} className="p-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold uppercase text-[10px] rounded-lg">Toggle State</button>
                </div>

                <div className="p-4 bg-slate-50 border rounded-xl flex justify-between items-center text-left">
                  <div>
                    <h5 className="font-bold text-sm text-slate-800">Extend Election Duration</h5>
                    <p className="text-[10px] text-slate-400">Add 2 hours to active timer ledger.</p>
                  </div>
                  <button onClick={() => alert('Electoral window prolonged')} className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase text-[10px] rounded-lg">Prolong +2h</button>
                </div>

                <div className="p-4 bg-slate-50 border rounded-xl flex justify-between items-center text-left">
                  <div>
                    <h5 className="font-bold text-sm text-slate-800">Trigger Manual Tally Ledger Sync</h5>
                    <p className="text-[10px] text-slate-400">Force compile calculations.</p>
                  </div>
                  <button onClick={() => alert('Computations completed successfully')} className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-[10px] rounded-lg">Sync Ledger</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 6. CANDIDATE APPLICATIONS ==================== */}
        {currentAdminScreen === 'candidate-applications' && (
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-slate-800 uppercase pb-4 border-b">Submitted Nominee Registrations</h3>
            <div className="bg-white border rounded-3xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs divide-y divide-slate-100">
                <thead className="bg-slate-50 font-bold uppercase text-slate-400">
                  <tr>
                    <th className="p-4">CODE</th>
                    <th className="p-4">NOMINEE NAME</th>
                    <th className="p-4">DEPARTMENT MAJOR</th>
                    <th className="p-4">TARGET EXECUTIVE ROLE</th>
                    <th className="p-4">STATUS</th>
                    <th className="p-4 text-center">CLEARANCE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-mono font-bold text-slate-500">GTU-NOM-09</td>
                    <td className="p-4 font-bold text-[#001e40]">David Opoku-Mensah</td>
                    <td className="p-4">Logistics Engineering</td>
                    <td className="p-4">SRC President</td>
                    <td className="p-4"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] uppercase font-bold border border-amber-200">Pending Review</span></td>
                    <td className="p-4 flex gap-1.5 justify-center">
                      <button onClick={() => onNavigateAdmin('review-candidacy')} className="p-1 px-3 border bg-slate-5/25 text-slate-700 font-bold hover:bg-slate-50 text-[10px] rounded">Inspect Documents</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== 7. REVIEW CANDIDACY ==================== */}
        {currentAdminScreen === 'review-candidacy' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm text-left">
              <h3 className="text-xl font-black text-[#001e40] uppercase mb-4 text-center">Academic Standing Verification</h3>
              <div className="space-y-4 text-xs font-semibold">
                <div className="p-4 bg-slate-50 border rounded-xl">
                  <h4 className="text-xs font-black text-slate-700 uppercase">Applicant: David Opoku-Mensah</h4>
                  <p className="text-slate-500 mt-1">Elections Applied: SRC President 2024</p>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-center p-3 border-b border-dashed">
                    <span>GPA Threshold check (&gt; 3.0 required)</span>
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold">Passed</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border-b border-dashed">
                    <span>Disciplinary registry record clearance</span>
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold">Passed</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border-b border-dashed">
                    <span>Pledge & Student General Manifesto reviewed</span>
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold">Passed</span>
                  </div>
                </div>

                <button onClick={() => {
                  alert('Candidacy successfully cleared for active ballot lists!');
                  onNavigateAdmin('candidate-applications');
                }} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase rounded-xl cursor-pointer">
                  Seal nominee approval signature
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 8. VOTER ROLL REGISTRY ==================== */}
        {currentAdminScreen === 'voter-roll-registry' && (
          <div className="space-y-6">
            <div className="bg-white border rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
                <div>
                  <h3 className="text-lg font-black text-[#001e40] uppercase">Voter Roll Ledger</h3>
                  <p className="text-xs text-slate-400 mt-1">Configure student baseline rosters and register profiles.</p>
                </div>
                {/* CSV upload simulation */}
                <div className="border-2 border-dashed p-4 rounded-xl flex items-center gap-3 bg-slate-50 shrink-0 cursor-pointer hover:border-indigo-600 transition-all" onClick={() => alert('Simulated CSV parse completed')}>
                  <Upload className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h5 className="font-bold text-xs text-slate-700">Import CSV File</h5>
                    <p className="text-[10px] text-slate-400">Import baseline student rosters</p>
                  </div>
                </div>
              </div>

              {/* Voter Table search & filter line */}
              <div className="flex gap-2.5 my-4">
                <input
                  type="text"
                  placeholder="Identify student by name or index code..."
                  value={voterFilter}
                  onChange={(e) => setVoterFilter(e.target.value)}
                  className="w-full bg-slate-50 border p-3 rounded-lg text-xs outline-none"
                />
              </div>

              <div className="overflow-x-auto border-t">
                <table className="w-full text-left text-xs divide-y divide-slate-100">
                  <thead className="bg-slate-50 uppercase font-bold text-slate-400">
                    <tr>
                      <th className="p-4">INDEX</th>
                      <th className="p-4">STUDENT NAME</th>
                      <th className="p-4">OFFICIAL MAILBOX</th>
                      <th className="p-4">FACULTY REGISTRY</th>
                      <th className="p-4 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono font-bold text-slate-500">040912345</td>
                      <td className="p-4 font-bold text-[#001e40]">Kofi Mensah</td>
                      <td className="p-4">k.mensah@gtu.edu.gh</td>
                      <td className="p-4">School of Technology</td>
                      <td className="p-4 text-center">
                        <button onClick={() => onNavigateAdmin('voter-profile-admin')} className="text-xs font-bold text-indigo-600 hover:underline">View History →</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 9. VOTER PROFILE (ADMIN) ==================== */}
        {currentAdminScreen === 'voter-profile-admin' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-black text-[#001e40] uppercase text-center mb-4">Voter File & Records</h3>
              <div className="space-y-4 text-xs font-medium text-left">
                <div className="p-4 bg-slate-50 border rounded-xl grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Voter Name</span>
                    <span className="text-base font-bold text-[#001e40] block mt-1">Kofi Mensah</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Biometric Index Key</span>
                    <span className="text-sm font-mono text-slate-600 block mt-1">#040912345-RSA</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-700">Participation Chronicles</h4>
                  <div className="divide-y font-medium text-xs">
                    <div className="py-2.5 flex justify-between">
                      <span>2024 General SRC Polls</span>
                      <span className="text-emerald-700 font-bold">Voted (Signature Checked)</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span>2023 Senate Assembly Representatives</span>
                      <span className="text-slate-500 font-medium">Bypassed (Absence)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 10. ADVANCED ELECTION ANALYTICS ==================== */}
        {currentAdminScreen === 'advanced-election-analytics' && (
          <div className="space-y-6">
            <div className="bg-white border rounded-3xl p-6 shadow-sm">
              <div className="border-b pb-4 mb-6">
                <h3 className="text-lg font-black text-[#001e40] uppercase">Advanced College Turnout Metrics</h3>
                <p className="text-xs text-slate-500 mt-1">Distribution curves across primary academic campuses.</p>
              </div>

              <div className="space-y-5">
                {[
                  { faculty: 'School of Technology (SOT)', ratio: '1,204 Voted / 1,400 Total', pct: '86%', col: 'bg-indigo-600' },
                  { faculty: 'Business Administration (SBA)', ratio: '540 Voted / 1,200 Total', pct: '45%', col: 'bg-emerald-600' },
                  { faculty: 'School of Computing Science (SCS)', ratio: '954 Voted / 1,100 Total', pct: '86.7%', col: 'bg-amber-500' },
                ].map((dept) => (
                  <div key={dept.faculty} className="space-y-1.5 font-semibold text-xs">
                    <div className="flex justify-between text-slate-800">
                      <span>{dept.faculty}</span>
                      <span className="text-slate-400">{dept.ratio} ({dept.pct})</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${dept.col}`} style={{ width: dept.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 11. BROADCAST MANAGEMENT ==================== */}
        {currentAdminScreen === 'broadcast-management-admin' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-black text-[#001e40] uppercase mb-4 text-center">Compose Official Broadcast</h3>
              <div className="space-y-4 text-left font-semibold text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Distribution Channel</label>
                  <select
                    value={bChannel}
                    onChange={(e) => setBChannel(e.target.value as any)}
                    className="w-full bg-slate-50 border p-3 rounded-lg outline-none"
                  >
                    <option value="All Channels">All Channels (SMS, Mail and App notifications)</option>
                    <option value="SMS Only">Verifiable SMS Carrier Channels Only</option>
                    <option value="Email Only">Inbound Official Academic Mail</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Compose Message Content</label>
                  <textarea
                    rows={4}
                    value={bText}
                    onChange={(e) => setBText(e.target.value)}
                    placeholder="E.g. Clear warning: The 2024 SRC voting lines will shut down in 1 hour exactly at 18:00 UTC."
                    className="w-full bg-slate-50 border p-4 rounded-lg outline-none"
                  />
                </div>

                <button onClick={() => {
                  alert('Electoral broadcasts dispatch logged successfully on SMTP pool!');
                  setBText('');
                }} className="w-full py-3.5 bg-indigo-600 text-white font-bold uppercase rounded-xl cursor-pointer">
                  Dispatch Broadcast Pool Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 12. SYSTEM AUDIT LOG ==================== */}
        {currentAdminScreen === 'system-audit-log-admin' && (
          <div className="space-y-6">
            <div className="bg-white border rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-black text-[#001e40] uppercase pb-4 border-b">Cryptographic Hashing Audit Trail</h3>
              <div className="mt-4 font-mono text-[11px] leading-relaxed p-4 bg-slate-900 text-amber-400 rounded-2xl max-h-80 overflow-y-auto space-y-2">
                <p>[2026-05-30 22:28:31] - INFO - API Rotation successful. Checked index RSA-BLOCK #0.</p>
                <p>[2026-05-30 22:28:02] - WARNING - Portlet connection pool threshold 4% capacity.</p>
                <p>[2026-05-30 22:27:01] - INFO - Checked verification OTP token for student index #040912345.</p>
                <p>[2026-05-30 22:26:15] - SUCCESS - Countersigned ballot cryptogram hash #0x78ab9c.</p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 13. REPORTS & ANALYTICS ==================== */}
        {currentAdminScreen === 'reports-analytics-admin' && (
          <div className="space-y-6">
            <div className="bg-white border rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="text-lg font-black text-[#001e40] uppercase">Electoral Reports Pool</h3>
                <button onClick={() => alert('PDF audit compile file has been downloaded!')} className="p-2 border rounded text-xs hover:bg-slate-50 cursor-pointer font-bold uppercase transition-all">Download Audit PDF</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                <div className="p-4 bg-slate-50 border rounded-xl">
                  <h4 className="text-xs uppercase font-extrabold text-[#001e40]">Voter Standard Deviation Audit</h4>
                  <p className="text-slate-500 mt-1">Variance indices computed across campuses are within normal limits (0.007).</p>
                </div>
                <div className="p-4 bg-slate-50 border rounded-xl">
                  <h4 className="text-xs uppercase font-extrabold text-[#001e40]">Participation Confidence Scale</h4>
                  <p className="text-slate-500 mt-1">Statistical analysis displays voter turnout represents 98% confidence level intervals.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 14. GLOBAL SYSTEM SETTINGS ==================== */}
        {currentAdminScreen === 'global-system-settings' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm text-left">
              <h3 className="text-lg font-black text-[#001e40] uppercase text-center mb-6">Security & Configuration Matrix</h3>
              <div className="space-y-4 text-xs font-semibold">
                <div className="flex justify-between items-center p-3.5 bg-slate-50 border rounded-xl">
                  <div>
                    <h5 className="font-bold text-slate-800 text-xs">Sandbox Maintenance Mode</h5>
                    <p className="text-[10px] text-slate-400">Lock general voter entry immediately.</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 cursor-pointer text-indigo-600 rounded bg-indigo-50 border" defaultChecked />
                </div>

                <div className="flex justify-between items-center p-3.5 bg-slate-50 border rounded-xl">
                  <div>
                    <h5 className="font-bold text-slate-800 text-xs">Self-Audit Ledger Logging</h5>
                    <p className="text-[10px] text-slate-400">Force write submissions to block ledger.</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 cursor-pointer text-indigo-600 rounded bg-indigo-50 border" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 15. ADMIN USER MANAGEMENT ==================== */}
        {currentAdminScreen === 'admin-user-management' && (
          <div className="bg-white border rounded-3xl p-6">
            <h3 className="text-lg font-black text-[#001e40] uppercase pb-4 border-b text-center mb-4">Roles & Credentials Administration</h3>
            <p className="text-xs text-slate-500 text-center leading-relaxed max-w-sm mx-auto">
              Please refer directly to the global master accounts matrix panel or go to screen 14 on the standard directory. Handled dynamically on isolation node.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

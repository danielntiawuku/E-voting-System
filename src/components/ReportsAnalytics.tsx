/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  Award,
  Users,
  Calendar,
  Share2,
  Printer,
  FileText,
  School,
  ArrowLeft,
  ChevronRight,
  Download,
  Info,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { ScreenType } from '../types';

interface ReportsAnalyticsProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function ReportsAnalytics({ onNavigate }: ReportsAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<'turnout' | 'distribution' | 'historical'>('turnout');
  const [exporting, setExporting] = useState(false);
  const [reportSigned, setReportSigned] = useState(false);

  // Demography breakdown
  const levelStats = [
    { label: 'Level 100 Students', voted: 890, total: 1200, color: 'bg-primary' },
    { label: 'Level 200 Students', voted: 1105, total: 1500, color: 'bg-indigo-600' },
    { label: 'Level 300 Students', voted: 940, total: 1400, color: 'bg-purple-600' },
    { label: 'Level 400 Students', voted: 1346, total: 2150, color: 'bg-amber-500' },
  ];

  // Turnout Trend hours
  const hourlyTrend = [
    { time: '08:00 AM', count: 245, cumulative: 245 },
    { time: '10:00 AM', count: 580, cumulative: 825 },
    { time: '12:00 PM', count: 1110, cumulative: 1935 },
    { time: '02:00 PM', count: 980, cumulative: 2915 },
    { time: '04:00 PM', count: 750, cumulative: 3665 },
    { time: '06:00 PM', count: 616, cumulative: 4281 },
  ];

  // Historical data
  const historicalElections = [
    { year: '2023 Election', winner: 'Elise Gyamfi', turnout: '68.4%', totalVotes: '3,912', status: 'Archive Certified' },
    { year: '2022 Election', winner: 'David Ankrah', turnout: '74.2%', totalVotes: '4,103', status: 'Archive Certified' },
    { year: '2021 Election', winner: 'Josephine Boateng', turnout: '61.5%', totalVotes: '3,450', status: 'Archive Certified' },
  ];

  const triggerExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setReportSigned(true);
      setTimeout(() => {
        setReportSigned(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen text-on-background pb-12 animate-in fade-in duration-300">
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
            <span className="text-xl font-bold text-primary">GTU Analytics</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={triggerExport}
            disabled={exporting}
            className="text-xs bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Printer className="w-4 h-4" />
            <span>{exporting ? 'Generating PDF...' : 'Print / Export PDF'}</span>
          </button>
        </div>
      </header>

      {/* Main reporting Core */}
      <main className="pt-24 px-4 md:px-12 max-w-7xl mx-auto font-sans">
        <div className="mb-8 border-b pb-6 border-outline-variant/30 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="inline-block bg-[#fed65b] text-[#745c00] border border-[#fed65b]/40 px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-widest">
              Executive Reports
            </span>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight">
              Electoral Data & Scientific Reports
            </h2>
            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed mt-1">
              Factual, certified analysis of turnout statistics, historical reference benchmarks, and live demographic breakdowns of the student voice.
            </p>
          </div>
          <div className="flex bg-surface-container-low border border-outline-variant rounded-xl p-1 shrink-0">
            <button
              onClick={() => setActiveTab('turnout')}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                activeTab === 'turnout' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Voter Demography
            </button>
            <button
              onClick={() => setActiveTab('distribution')}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                activeTab === 'distribution' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Hourly Timeline
            </button>
            <button
              onClick={() => setActiveTab('historical')}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                activeTab === 'historical' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Elections History
            </button>
          </div>
        </div>

        {/* Status Signature Banner */}
        {reportSigned && (
          <div className="bg-teal-50 border border-teal-300 rounded-2xl p-4.5 text-teal-800 text-sm font-bold flex items-center gap-3 mb-8 animate-in slide-in-from-top-6 duration-300">
            <CheckCircle2 className="w-5 h-5 text-teal-600 animate-bounce" />
            <span>Success: High-fidelity PDF dossier and cryptographic audit ledger compiled. Download started automatically.</span>
          </div>
        )}

        {/* Tabs Core switch containers */}
        {activeTab === 'turnout' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Visual SVG Turnout demographic card */}
            <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-primary mb-6 flex items-center gap-2">
                <Users className="text-secondary w-5 h-5" />
                Participation turnouts by Academy Level
              </h3>

              <div className="space-y-6">
                {levelStats.map((item, idx) => {
                  const percent = ((item.voted / item.total) * 100).toFixed(1);
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-primary text-sm">{item.label}</span>
                        <div className="text-right">
                          <span className="font-bold text-primary">{item.voted}</span>
                          <span className="text-outline"> of {item.total} Students ({percent}%)</span>
                        </div>
                      </div>
                      {/* Stacked visually stunning double level bars */}
                      <div className="w-full bg-surface-container-high h-4 rounded-full overflow-hidden relative">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-indigo-600' : idx === 2 ? 'bg-violet-600' : 'bg-amber-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex gap-3 text-xs">
                <Info className="text-primary w-5 h-5 shrink-0" />
                <p className="text-on-surface-variant/90 leading-relaxed font-semibold">
                  Note: Level 400 final-year students currently demonstrate the highest turnout engagement rate (62.6%) due to robust student-body advocacy.
                </p>
              </div>
            </div>

            {/* Turnout bento sidebar details */}
            <div className="lg:col-span-5 space-y-6">
              {/* Turnout summary values */}
              <div className="bg-primary text-white rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-xs uppercase font-extrabold tracking-widest opacity-80">
                  Global Participation Rating
                </h3>
                <div className="space-y-1">
                  <span className="text-5xl font-black block">68.5%</span>
                  <span className="text-xs opacity-90 block">Overall turnout calculated at local GMT</span>
                </div>
                <div className="border-t border-white/20 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="opacity-85">Total Votes Recorded:</span>
                    <span>4,281</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="opacity-85">Total Verified Eligible:</span>
                    <span>6,250</span>
                  </div>
                </div>
              </div>

              {/* Verified Ledger info */}
              <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6 shadow-xs space-y-4">
                <h4 className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-secondary" />
                  Electoral Certificate Check
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  The voting database has been checked. Complete record cryptographic hashing ensures that double submissions are strictly prohibited.
                </p>
                <div className="p-3 bg-white rounded-xl border border-outline-variant/40">
                  <span className="text-[10px] font-bold text-outline uppercase block">Audit Hash Reference</span>
                  <span className="text-xs font-mono font-bold text-primary select-all">GTU-MD5-SHA256-VOTE-2024</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'distribution' && (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-base font-bold text-primary mb-6 flex items-center gap-2">
              <TrendingUp className="text-[#00b27b] w-5 h-5" />
              Hourly Ballot Entry Speed Wave
            </h3>

            {/* Custom SVG Line Chart */}
            <div className="w-full overflow-x-auto pb-4">
              <div className="min-w-[650px] h-72 relative flex flex-col justify-between">
                {/* SVG Visual graph container */}
                <svg className="w-full h-56 mt-4" viewBox="0 0 100 20 ml-2" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="1" x2="100" y2="1" stroke="#e1e4ee" strokeWidth="0.1" />
                  <line x1="0" y1="10" x2="100" y2="10" stroke="#e1e4ee" strokeWidth="0.1" />
                  <line x1="0" y1="19" x2="100" y2="19" stroke="#e1e4ee" strokeWidth="0.1" />

                  {/* Shaded Area */}
                  <polygon
                    points="0,20 16,18 33,16 50,11 66,7 83,4 100,2 100,20"
                    fill="rgba(0,30,64,0.06)"
                  />

                  {/* Line stroke */}
                  <polyline
                    fill="none"
                    stroke="#001e40"
                    strokeWidth="0.75"
                    points="0,18.8 16,16.2 33,12.5 50,8.2 66,5.1 83,3.0 100,1.2"
                  />

                  {/* Points on timeline */}
                  <circle cx="0" cy="18.8" r="0.8" fill="#735c00" stroke="white" strokeWidth="0.2" />
                  <circle cx="16" cy="16.2" r="0.8" fill="#001e40" stroke="white" strokeWidth="0.2" />
                  <circle cx="33" cy="12.5" r="0.8" fill="#001e40" stroke="white" strokeWidth="0.2" />
                  <circle cx="50" cy="8.2" r="0.8" fill="#001e40" stroke="white" strokeWidth="0.2" />
                  <circle cx="66" cy="5.1" r="0.8" fill="#001e40" stroke="white" strokeWidth="0.2" />
                  <circle cx="83" cy="3.0" r="0.8" fill="#001e40" stroke="white" strokeWidth="0.2" />
                  <circle cx="100" cy="1.2" r="0.8" fill="#00b27b" stroke="white" strokeWidth="0.2" />
                </svg>

                {/* X Axis Labels */}
                <div className="flex justify-between items-center px-2 mt-4 text-[10px] font-bold text-outline tracking-wider font-mono">
                  {hourlyTrend.map((t, idx) => (
                    <div key={idx} className="text-center">
                      <span>{t.time}</span>
                      <span className="block text-primary">Cumulative: {t.cumulative}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t p-6 pb-2 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-1">
                <span className="text-xs font-bold text-outline uppercase tracking-wider block">Peak Voting Hour</span>
                <span className="text-xl font-extrabold text-[#001e40] block">12:00 PM - 2:00 PM</span>
                <span className="text-[11px] text-on-surface-variant">1,110 ballots recorded</span>
              </div>
              <div className="space-y-1 border-t md:border-t-0 md:border-x py-4 md:py-0 border-outline-variant/60">
                <span className="text-xs font-bold text-outline uppercase tracking-wider block">Average Ballots/Minute</span>
                <span className="text-xl font-extrabold text-[#001e40] block">8.9 Ballots/Min</span>
                <span className="text-[11px] text-on-surface-variant">Steady voter intake flow</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-outline uppercase tracking-wider block">Remaining Eligible Pool</span>
                <span className="text-xl font-extrabold text-secondary block">1,969 Students</span>
                <span className="text-[11px] text-on-surface-variant">Pending portal authorization</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'historical' && (
          <div className="space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-primary flex items-center gap-2">
                  <Calendar className="text-secondary w-5 h-5" />
                  Historical Election Archive
                </h3>
                <span className="text-xs bg-surface-container-high px-3.5 py-1.5 rounded-full font-bold text-outline">
                  Authenticated Registry
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-outline-variant/60 text-[10px] font-extrabold uppercase tracking-widest text-outline">
                      <th className="pb-3.5 pl-3">Election Campaign Session</th>
                      <th className="pb-3.5">Elected SRC President</th>
                      <th className="pb-3.5">Validation Turnout</th>
                      <th className="pb-3.5">Total Ballots Cast</th>
                      <th className="pb-3.5 text-right pr-3">Registry Certificate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/40">
                    {historicalElections.map((ele, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-low/20">
                        <td className="py-4.5 font-bold pl-3 text-primary">{ele.year}</td>
                        <td className="py-4.5 font-semibold text-slate-800">{ele.winner}</td>
                        <td className="py-4.5 font-bold text-teal-700">{ele.turnout}</td>
                        <td className="py-4.5 font-mono font-medium">{ele.totalVotes}</td>
                        <td className="py-4.5 text-right pr-3">
                          <span className="inline-block bg-[#001e40]/5 text-primary border border-primary/20 text-[9px] font-extrabold px-2.5 py-1 rounded">
                            {ele.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Print action callout */}
            <div className="bg-gradient-to-r from-primary to-primary-container p-6 md:p-8 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Comprehensive Multi-Year Democracy Dossier</h3>
                <p className="text-xs text-white/80 max-w-lg leading-relaxed">
                  Compile complete participation counts, vote margins, verified hashes timestamps and compliance signatures into a single certified PDF dossier file.
                </p>
              </div>
              <button
                onClick={triggerExport}
                className="bg-secondary-container text-on-secondary-container hover:bg-amber-400 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wide cursor-pointer transition-all shrink-0"
              >
                Assemble Historical PDF
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-xs text-outline font-bold uppercase tracking-widest">
        Ghana Telecom University • Administrative Analytical Service
      </footer>
    </div>
  );
}

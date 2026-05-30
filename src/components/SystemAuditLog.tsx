/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  Search,
  Filter,
  Download,
  Terminal,
  Clock,
  User,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  ArrowLeft,
  School,
  FileSpreadsheet,
} from 'lucide-react';
import { ScreenType } from '../types';

interface SystemAuditLogProps {
  onNavigate: (screen: ScreenType) => void;
}

interface AuditRecord {
  id: string;
  category: 'Security' | 'Electoral' | 'Authentication' | 'Admin';
  event: string;
  actor: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'warning' | 'critical' | 'info';
  details: string;
  metaHash: string;
}

const INITIAL_AUDITS: AuditRecord[] = [
  {
    id: "AUD-9012",
    category: "Electoral",
    event: "Irreversible Ballot Cast & Signed",
    actor: "Voter: 040912345 (K. Mensah)",
    ipAddress: "197.255.122.45",
    timestamp: "2026-05-30T22:04:15Z",
    status: "success",
    details: "Ballot cast successfully for Candidate ID cand-1. Secure fingerprint compiled: candidate selection encrypted with AES-256 block-level standards.",
    metaHash: "0x8fa40de3c139ab6d0e82"
  },
  {
    id: "AUD-9011",
    category: "Authentication",
    event: "OTP 2-Factor Decrypted & Validated",
    actor: "Voter: 040912345 (K. Mensah)",
    ipAddress: "197.255.122.45",
    timestamp: "2026-05-30T22:03:52Z",
    status: "success",
    details: "Student entered valid 6-digit cryptographic registration code sent to official mail account k***@st.gtu.edu.gh.",
    metaHash: "0x2da49be293b9cdfe2d14"
  },
  {
    id: "AUD-9010",
    category: "Security",
    event: "Institutional Client Portal Access Allowed",
    actor: "Voter ID: 040912345 (K. Mensah)",
    ipAddress: "197.255.122.45",
    timestamp: "2026-05-30T22:02:11Z",
    status: "info",
    details: "User agent authentication successful. Handshake protocol upgraded to TLS 1.3 with high cryptography index matches.",
    metaHash: "0x9df3ac49cbdd2401feba"
  },
  {
    id: "AUD-9009",
    category: "Admin",
    event: "Global Configuration Settings Updated",
    actor: "Admin: Dean of Student Affairs",
    ipAddress: "10.120.45.18",
    timestamp: "2026-05-30T19:30:00Z",
    status: "warning",
    details: "Election end-time scheduled rules updated. Extended poll closure cutoff threshold set to 8:00 PM GMT dynamically.",
    metaHash: "0xb7dcd2b4501ba8dcd37e"
  },
  {
    id: "AUD-9008",
    category: "Security",
    event: "API Signature Key Re-Generation Blocked",
    actor: "External: Rest Endpoint Caller",
    ipAddress: "185.220.101.5",
    timestamp: "2026-05-30T17:15:22Z",
    status: "critical",
    details: "Access denied: Unauthorized external request tried to regenerate high-privilege JWT ballot signature keys without valid RSA certificates.",
    metaHash: "0x7a22fc901bdcaf2ea84b"
  },
  {
    id: "AUD-9007",
    category: "Electoral",
    event: "Candidate Registry Dossier Certified",
    actor: "Admin: Electoral Registrar",
    ipAddress: "10.120.45.11",
    timestamp: "2026-05-30T14:00:10Z",
    status: "success",
    details: "Nominee qualifications, profile details, and integrity manifesto text logged dynamically to production candidate indices.",
    metaHash: "0xef3b40dcca92ebff00d3"
  },
];

export default function SystemAuditLog({ onNavigate }: SystemAuditLogProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [audits, setAudits] = useState<AuditRecord[]>(INITIAL_AUDITS);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredLogs = audits.filter((log) => {
    // Search match
    const matchesSearch =
      log.event.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.id.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || log.category === categoryFilter;
    const matchesSeverity = severityFilter === 'All' || log.status === severityFilter;

    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const getStatusColor = (status: AuditRecord['status']) => {
    switch (status) {
      case 'success':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          indicator: 'bg-emerald-500',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          indicator: 'bg-amber-500',
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
        };
      case 'critical':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          indicator: 'bg-rose-500',
          icon: <XCircle className="w-4 h-4 text-rose-600" />,
        };
      default:
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          indicator: 'bg-blue-500',
          icon: <Info className="w-4 h-4 text-blue-600" />,
        };
    }
  };

  const handleExport = (format: 'json' | 'csv') => {
    if (format === 'json') {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `gtu_evote_audit_logs_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else {
      // Build dummy CSV lines
      const csvContent = "data:text/csv;charset=utf-8,ID,Category,Event,Actor,IP Address,Timestamp,Severity,HashCode\n" +
        filteredLogs.map(l => `"${l.id}","${l.category}","${l.event}","${l.actor}","${l.ipAddress}","${l.timestamp}","${l.status}","${l.metaHash}"`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `gtu_evote_audit_logs_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <div className="bg-background min-h-screen text-on-background pb-12">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-4 md:px-12 py-4 bg-surface shadow-sm border-b border-outline-variant/30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('landing')}
            className="text-primary hover:bg-surface-container-high p-2 rounded-full transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <School className="text-primary w-6 h-6" />
            <span className="text-xl font-bold text-primary">GTU Auditor</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-on-tertiary-container/15 text-on-tertiary-container px-3.5 py-1 rounded-full text-xs font-bold">
          <Terminal className="w-3.5 h-3.5" />
          <span>Real-time Secure Connection</span>
        </div>
      </header>

      {/* Main timeline core */}
      <main className="pt-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="mb-8 border-b pb-6 border-outline-variant/30">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-widest">
            Audit Trail
          </span>
          <h2 className="text-3xl font-extrabold text-primary tracking-tight">
            Cryptographic Integrity Audit Log
          </h2>
          <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed mt-1">
            Browse verified digital records and system events. Every single student transaction generates an audited ledger hash for independent electoral compliance checks.
          </p>
        </div>

        {/* Filter bar controller */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-4.5 mb-8 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by IP, Actor, Event payload content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface rounded-xl border border-outline-variant focus:border-primary outline-none text-xs text-on-surface"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Category selection */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-on-surface-variant">
                Category:
              </span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-surface border border-outline-variant rounded-lg p-2 text-xs font-semibold text-primary"
              >
                <option value="All">All Categories</option>
                <option value="Security">Security</option>
                <option value="Electoral">Electoral</option>
                <option value="Authentication">Authentication</option>
                <option value="Admin">Admin Actions</option>
              </select>
            </div>

            {/* Severity status selection */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-on-surface-variant">
                Severity:
              </span>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="bg-surface border border-outline-variant rounded-lg p-2 text-xs font-semibold text-primary"
              >
                <option value="All">All Severity Levels</option>
                <option value="success">Success</option>
                <option value="info">Information</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical Faults</option>
              </select>
            </div>

            {/* Exports */}
            <div className="flex items-center gap-2 ml-auto md:ml-0">
              <button
                onClick={() => handleExport('json')}
                className="p-2.5 text-primary hover:bg-surface-container-low border rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                title="Export Ledger as JSON Document"
              >
                <FileCode className="w-4 h-4" />
                <span>JSON</span>
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="p-2.5 text-primary hover:bg-surface-container-low border rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                title="Download CSV Spreadsheet Ledger"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Spreadsheet</span>
              </button>
            </div>
          </div>
        </section>

        {/* Timeline representation list */}
        <section className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-widest text-outline px-4">
            <span>Log Transactions ({filteredLogs.length})</span>
            <span>Recorded Timeline</span>
          </div>

          {filteredLogs.length === 0 ? (
            <div className="bg-surface-container-mid border border-dashed text-center p-12 rounded-2xl">
              <Shield className="w-12 h-12 text-outline mx-auto mb-3 opacity-30 animate-pulse" />
              <p className="font-bold text-sm text-primary">No Matching Action Logs Cached</p>
              <p className="text-xs text-on-surface-variant/70 mt-1">
                Refine your target filter or search values to fetch records.
              </p>
            </div>
          ) : (
            <div className="bg-surface-container-lowest border border-[#c3c6d1] rounded-2xl divide-y overflow-hidden shadow-xs">
              {filteredLogs.map((log) => {
                const styles = getStatusColor(log.status);
                const isExpanded = expandedId === log.id;

                return (
                  <div key={log.id} className="transition-all hover:bg-surface-container-low/35">
                    {/* Primary visible summary line */}
                    <div
                      onClick={() => toggleExpand(log.id)}
                      className="p-5 flex items-start md:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-start md:items-center gap-4 flex-grow min-w-0">
                        {/* Status Icon */}
                        <div className={`p-2 rounded-lg border flex shrink-0 items-center justify-center ${styles.bg}`}>
                          {styles.icon}
                        </div>

                        {/* Details */}
                        <div className="min-w-0 flex-grow grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
                          <div className="md:col-span-5 min-w-0">
                            <h4 className="font-bold text-sm text-primary leading-tight truncate">
                              {log.event}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-bold uppercase text-on-surface-variant font-sans bg-surface px-1.5 py-0.5 rounded border">
                                {log.category}
                              </span>
                              <span className="font-mono text-[9px] text-[#737780] font-bold">
                                {log.id}
                              </span>
                            </div>
                          </div>

                          <div className="md:col-span-4 min-w-0 text-left">
                            <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-outline shrink-0" />
                              <span className="truncate">{log.actor}</span>
                            </span>
                            <span className="text-[10px] text-outline font-mono block mt-0.5">
                              IP: {log.ipAddress}
                            </span>
                          </div>

                          <div className="md:col-span-3 min-w-0">
                            <span className="text-[11px] text-on-surface-variant/85 font-mono flex items-center gap-1 mt-1">
                              <Clock className="w-3.5 h-3.5" />
                              {log.timestamp.slice(11, 19)} UTC
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Expand Chevron Icon */}
                      <button className="text-outline hover:text-primary transition-colors">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Expandable internal parameter segment */}
                    {isExpanded && (
                      <div className="bg-surface/60 p-6 border-t border-outline-variant/30 animate-in fade-in duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Expanded detail description */}
                          <div className="md:col-span-2 space-y-3">
                            <h5 className="text-xs font-bold text-primary uppercase tracking-wider">
                              Full Transaction Payload Event Metadata
                            </h5>
                            <p className="text-xs text-on-surface leading-relaxed text-slate-700 bg-white p-4 rounded-xl border border-outline-variant/50 shadow-inner">
                              {log.details}
                            </p>
                          </div>

                          {/* Technical metadata parameters */}
                          <div className="space-y-4 bg-surface-container-high/40 p-5 rounded-xl border border-outline-variant">
                            <h5 className="text-xs font-bold text-primary uppercase tracking-wider">
                              Audit Security Context
                            </h5>
                            <div className="space-y-2 text-[11px] font-mono text-on-surface-variant/90">
                              <div>
                                <span className="font-sans font-bold text-slate-500 uppercase">Actor IP:</span> {log.ipAddress}
                              </div>
                              <div>
                                <span className="font-sans font-bold text-slate-500 uppercase">Cert-ID:</span> GTU-FIPS-140-3
                              </div>
                              <div>
                                <span className="font-sans font-bold text-slate-500 uppercase">Timestamp:</span> {log.timestamp}
                              </div>
                              <div className="pt-2 border-t mt-2">
                                <span className="font-sans font-bold text-slate-500 uppercase block mb-1">Receipt SHA Hash:</span>
                                <span className="bg-secondary/10 text-secondary-container text-xs px-2 py-1 rounded inline-block select-all">
                                  {log.metaHash}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <footer className="mt-12 text-center text-xs text-outline font-bold uppercase tracking-widest">
        Ghana Telecom University • Administrative Audit Core Office
      </footer>
    </div>
  );
}

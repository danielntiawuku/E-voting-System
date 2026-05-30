/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Send,
  Smartphone,
  Mail,
  Users,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowLeft,
  Loader2,
  Check,
  ChevronRight,
  Sparkles,
  School,
  Menu,
} from 'lucide-react';
import { ScreenType } from '../types';

interface BroadcastManagementProps {
  onNavigate: (screen: ScreenType) => void;
}

interface SentBroadcast {
  id: string;
  title: string;
  channel: 'sms' | 'email' | 'both';
  recipients: string;
  sentAt: string;
  status: 'delivered' | 'failed' | 'processing';
  deliveryRate: number;
}

const INITIAL_SENT_LOGS: SentBroadcast[] = [
  {
    id: 'BC-201',
    title: 'Urgent: SRC Presidential Debates Postponed to 4 PM',
    channel: 'both',
    recipients: 'All Registered Students (4,281)',
    sentAt: '2 hours ago',
    status: 'delivered',
    deliveryRate: 98.6,
  },
  {
    id: 'BC-202',
    title: 'Official: Polls are now OPEN for SRC 2024 Elections',
    channel: 'email',
    recipients: 'Faculty of Computing (1,842)',
    sentAt: '6 hours ago',
    status: 'delivered',
    deliveryRate: 100,
  },
  {
    id: 'BC-203',
    title: 'Reminder: Complete GTU Credential Validation',
    channel: 'sms',
    recipients: 'Unverified Voters (620)',
    sentAt: '1 day ago',
    status: 'delivered',
    deliveryRate: 94.2,
  },
];

const TEMPLATES = [
  {
    id: 't-1',
    name: 'Standard Poll Reminder',
    subject: 'Cast Your Ballot Today - GTU e-Vote',
    body: 'Dear Student, polls are currently active for the 2024 SRC Elections! Cast your cryptographically encrypted ballot securely at gtu.edu.gh before 8:00 PM GMT tonight.',
  },
  {
    id: 't-2',
    name: 'Debate / Event Alert',
    subject: 'Upcoming student representative dialogues live stream',
    body: 'Join the live campus presidential argument forum in the Main Hall or follow online via the student stream portal starting in 30 minutes.',
  },
  {
    id: 't-3',
    name: 'Verification Follow-up',
    subject: 'Action Required: Verify Voter Credentials',
    body: 'Please verify your student academic status. Access the GTU e-Vote login panel, enter your credentials, and submit the 2-factor OTP code instantly.',
  },
];

export default function BroadcastManagement({ onNavigate }: BroadcastManagementProps) {
  const [broadcasts, setBroadcasts] = useState<SentBroadcast[]>(INITIAL_SENT_LOGS);
  const [channel, setChannel] = useState<'sms' | 'email' | 'both'>('both');
  const [recipientGroup, setRecipientGroup] = useState('All');
  const [subject, setSubject] = useState('Important Update: e-Voting General Election');
  const [messageText, setMessageText] = useState(
    'Friendly notification to all Ghana Telecom University students to check active nominees and fulfill your democratic privilege in the ongoing SRC elections.'
  );

  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const selectTemplate = (id: string) => {
    const t = TEMPLATES.find((item) => item.id === id);
    if (t) {
      setSubject(t.subject);
      setMessageText(t.body);
    }
  };

  const getRecipientLabel = () => {
    if (recipientGroup === 'All') return 'All Registered Students (4,281)';
    if (recipientGroup === 'Computing') return 'Faculty of Computing (1,842)';
    if (recipientGroup === 'Engineering') return 'Faculty of Engineering (1,510)';
    return 'Pending Verification Pool (620)';
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      
      const newBroadcast: SentBroadcast = {
        id: `BC-${Math.floor(Math.random() * 900) + 300}`,
        title: channel === 'sms' ? messageText.slice(0, 45) + '...' : subject,
        channel,
        recipients: getRecipientLabel(),
        sentAt: 'Just now',
        status: 'delivered',
        deliveryRate: 100,
      };

      setBroadcasts([newBroadcast, ...broadcasts]);

      setTimeout(() => {
        setSendSuccess(false);
      }, 2500);
    }, 2000);
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
            <span className="text-xl font-bold text-primary">GTU Admin</span>
          </div>
        </div>
        <div className="bg-surface-container-low px-4 py-1.5 rounded-full border border-outline-variant text-xs font-bold text-primary">
          Officer Level Panel
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8 border-b pb-6 border-outline-variant/30">
          <div>
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-widest">
              Communications
            </span>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight">
              Broadcast Message Management
            </h2>
            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed mt-1">
              Construct, review templates, and push critical information payloads natively via bulk academic SMS and institutional SMTP emails.
            </p>
          </div>
          <button
            onClick={() => onNavigate('results')}
            className="text-xs font-bold text-primary border-2 border-primary/20 px-4 py-2 bg-white rounded-lg hover:bg-surface-container-low"
          >
            Go to e-Vote Live Stats Dashboard
          </button>
        </div>

        {/* Dispatch Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Creator panel */}
          <section className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              Compose Emergency Broadcast
            </h3>

            {/* Template Selector pillbox */}
            <div className="mb-6">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2">
                Apply pre-approved system template
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => selectTemplate(t.id)}
                    className="text-xs bg-surface-container-high hover:bg-primary/10 hover:text-primary rounded-full px-4.5 py-2.5 transition-colors whitespace-nowrap cursor-pointer font-semibold border border-outline-variant/40"
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSend} className="space-y-6">
              {/* Target Channel */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Delivery Channels
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setChannel('sms')}
                    className={`py-3.5 px-4 rounded-xl border flex flex-col items-center justify-center gap-1.5 font-bold text-xs transition-all ${
                      channel === 'sms'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-outline-variant bg-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    SMS Broadcast
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel('email')}
                    className={`py-3.5 px-4 rounded-xl border flex flex-col items-center justify-center gap-1.5 font-bold text-xs transition-all ${
                      channel === 'email'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-outline-variant bg-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                    Academic Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel('both')}
                    className={`py-3.5 px-4 rounded-xl border flex flex-col items-center justify-center gap-1.5 font-bold text-xs transition-all ${
                      channel === 'both'
                        ? 'border-primary bg-primary/5 text-primary shadow-xs'
                        : 'border-outline-variant bg-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <Users className="w-5 h-5" />
                    Both (Omni-channel)
                  </button>
                </div>
              </div>

              {/* Recipient Target */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Recipient Audience Segment
                </label>
                <select
                  value={recipientGroup}
                  onChange={(e) => setRecipientGroup(e.target.value)}
                  className="w-full bg-surface-container-low border-2 border-outline-variant rounded-xl p-3 text-sm focus:border-primary outline-none"
                >
                  <option value="All">All Registered Students (4,281 Contacts)</option>
                  <option value="Computing">Faculty of Computing & Informatics (1,842 Contacts)</option>
                  <option value="Engineering">Faculty of Engineering Sciences (1,510 Contacts)</option>
                  <option value="Pending">Pending Verification Segment (620 Contacts)</option>
                </select>
              </div>

              {/* Title / Mail Subject (Email Only) */}
              {channel !== 'sms' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Email Campaign Title / Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Enter newsletter subject..."
                    className="w-full px-4 py-3.5 bg-surface-bright border border-outline-variant rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-sm outline-none"
                  />
                </div>
              )}

              {/* Payload Body */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Announce Payload Body
                  </label>
                  <span className="text-[10px] text-on-surface-variant font-mono">
                    {messageText.length} characters
                  </span>
                </div>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={5}
                  required
                  className="w-full p-4 bg-surface-bright border border-outline-variant rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-sm outline-none resize-none leading-relaxed"
                  placeholder="Draft your public broadcast message payload here..."
                ></textarea>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSending || sendSuccess}
                className="w-full bg-primary hover:bg-primary-container text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Pushing Broadcast Payloads...
                  </>
                ) : sendSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-teal-300 animate-pulse" />
                    Omni-Channel Broadcast Successfully Dispatched
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Publish & Send Campaign Blast
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Side panel preview & logs history */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            {/* Live mockup preview */}
            <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6 shadow-xs">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                Mockup Handset Preview (SMS)
              </h3>
              <div className="mx-auto max-w-[280px] bg-[#0b1c30] p-3 rounded-[32px] border-4 border-[#43474f] shadow-inner relative">
                {/* Speaker */}
                <div className="h-4 w-24 bg-[#43474f] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="h-1.5 w-6 bg-black rounded-full"></div>
                </div>

                {/* Simulated Screen */}
                <div className="bg-slate-100 rounded-2xl min-h-[340px] p-3 flex flex-col justify-between text-black relative select-none">
                  {/* SMS Header */}
                  <div className="flex items-center gap-2 border-b border-black/5 pb-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                      GTU
                    </div>
                    <div>
                      <h4 className="text-[10px] font-extrabold leading-none text-primary">GTU-e-Vote</h4>
                      <span className="text-[8px] text-gray-500">Official SMS</span>
                    </div>
                  </div>

                  {/* Bubble content */}
                  <div className="flex-grow flex items-end">
                    <div className="bg-white/95 border text-[10px] p-2 rounded-xl shadow-xs border-slate-200 text-slate-800 leading-relaxed max-w-[95%]">
                      {messageText || 'Compose draft message to see layout mockup here...'}
                    </div>
                  </div>

                  {/* Screen base */}
                  <div className="text-[8px] text-center text-slate-400 font-bold tracking-wider mt-4">
                    GTU COMMUNICATIONS INTERFACE
                  </div>
                </div>
              </div>
            </div>

            {/* Historical list */}
            <div className="bg-surface-container-lowest border border-[#c3c6d1] rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                Dispatched Campaigns History
              </h3>
              <div className="space-y-4">
                {broadcasts.map((log) => (
                  <div key={log.id} className="p-3.5 bg-surface rounded-xl border border-outline-variant/45 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs text-primary line-clamp-1">{log.title}</h4>
                      <span className="text-[9px] font-bold bg-[#eff4ff] text-primary-container border border-primary/20 px-2 py-0.5 rounded uppercase">
                        {log.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant font-medium">
                          {log.channel === 'sms' && <Smartphone className="w-3.5 h-3.5" />}
                          {log.channel === 'email' && <Mail className="w-3.5 h-3.5" />}
                          {log.channel === 'both' && <Users className="w-3.5 h-3.5" />}
                          <span>{log.recipients}</span>
                        </div>
                        <p className="text-[9px] text-outline font-semibold">{log.sentAt}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-on-tertiary-container block">
                          {log.deliveryRate}% Delivered
                        </span>
                        <span className="text-[9px] text-[#00b27b] font-bold uppercase tracking-wider">
                          COMPLETED
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Controller Tray Toggle */}
      <footer className="mt-12 text-center text-xs text-outline font-bold uppercase tracking-widest">
        Ghana Telecom University • Administrative Electoral Core
      </footer>
    </div>
  );
}

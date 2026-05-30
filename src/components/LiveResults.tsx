/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Menu,
  School,
  TrendingUp,
  Clock,
  Award,
  BarChart2,
  Check,
  RefreshCw,
  Vote,
  Users,
  Info,
  ExternalLink,
} from 'lucide-react';
import { ScreenType, Candidate, BallotLog } from '../types';

interface LiveResultsProps {
  onNavigate: (screen: ScreenType) => void;
  votedCandidateId: string | null;
}

const INITIAL_RESULTS_CANDIDATES = [
  {
    name: 'Amara Adebayo',
    votes: 1894,
    percent: 44.2,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDV4ueEBgFDT2hlGIA92t3LX-2VcYGPcApH4a_XIelQPziRCgM_viS7O8zrlohOwUx2nU_mpRHWEWsY1CFApH5rMmvmEZFTMl3A5xesJakw7ja9XUoQ2YbUi70rRqoPNdUtRdWUdr30pDBoJwPH5R9xYltFB82iptdybViO0QCExMG_KhYJonASl7rtMvMyARekwvzEbnMKv7--OJ7dm5TPXpoiFsOn-EDc067KfNVQ44WLrH2Vd829ziEKcNbeMGE1Mrqwqom_jYTP',
  },
  {
    name: 'Kwame Osei',
    votes: 1540,
    percent: 36.0,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6UFXCHnyb_-rSo1Ayf_5qV7y3ApRG17FIFe9nFfy-6LS1NQfqXnOvLWCxTF-HzWmgs1KsaLqbY84vMTfCvk4N4W3i80Z4IVIIOy_7yREtYPTKvm7XHG6wMqWRdx7V_HB9EI7u-AI36tzuu8mAgWJbUuQhMgUB3Aljbn_aGvi1qvjS0khGBUAIiSpiCQHW4xqxAi_oELRpkLXe5BdAf4bHlCzYSs3IyVQNivJ7mkVLyKwB57n4oOV8qaJizJ_sqWsIlfk0LgqfPUQE',
  },
  {
    name: 'Efua Mensah',
    votes: 847,
    percent: 19.8,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBcTXhsFfjwccLNZfjdPPAVMhLxkBjweosVioVrTylECBVVMcrTQ-cSCiB7NYTJpwid5r7cigLwebFyBHGg1adbKmtvuS1h3vUDoHZn6NwsTzWWfrSKDERkCKUIxojzJsjkRLkzs8IPzhw9UamMV6s05p6MWotLqs-nvH13SD3kDd3TIf9MitZlg5tMXF0t83Dnr7zti2gZz62ITayR5uqf9PDF_26R_Y8_VnnvsuIWaZXW0IyIUUF7GJGL5a-i9rJ7ZtOVVBMtc0lf',
  },
];

export default function LiveResults({ onNavigate, votedCandidateId }: LiveResultsProps) {
  // Real-time simulated states
  const [totalVotes, setTotalVotes] = useState(4281);
  const [tickerVotesSinceLastMin, setTickerVotesSinceLastMin] = useState(124);
  const [secondsRemaining, setSecondsRemaining] = useState(4 * 3600 + 12 * 60 + 4); // 4 hrs 12 mins 4 seconds
  const [candidates, setCandidates] = useState(INITIAL_RESULTS_CANDIDATES);
  const [ballots, setBallots] = useState<BallotLog[]>([
    { hash: 'Hash: 7a2d...e91', timestamp: '2s ago', faculty: 'Engineering' },
    { hash: 'Hash: f3c1...8b2', timestamp: '14s ago', faculty: 'Computing' },
    { hash: 'Hash: 9e0b...4d3', timestamp: '45s ago', faculty: 'Business' },
  ]);

  // Handle countdown clock ticker
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // Handle simulated real-time Socket.io updates
  useEffect(() => {
    const socketSimulator = setInterval(() => {
      // 1. Increment total votes by a small random step (1 or 2)
      const increment = Math.floor(Math.random() * 2) + 1;
      setTotalVotes((prev) => prev + increment);
      setTickerVotesSinceLastMin((prev) => prev + increment);

      // 2. Allocate the random new vote to one of the candidates proportionally for live graph sync!
      setCandidates((prevCands) => {
        const updated = [...prevCands];
        // Distribute proportionally: 45% Amara (0), 35% Kwame (1), 20% Efua (2)
        const rand = Math.random();
        let targetIndex = 0;
        if (rand < 0.45) targetIndex = 0;
        else if (rand < 0.8) targetIndex = 1;
        else targetIndex = 2;

        updated[targetIndex].votes += increment;
        
        // Recompute percentages
        const overall = updated.reduce((s, c) => s + c.votes, 0);
        return updated.map((c) => ({
          ...c,
          percent: parseFloat(((c.votes / overall) * 100).toFixed(1)),
        }));
      });

      // 3. Prepend a newly generated "Verified Cryptographic Ballot Hash" into the activity list
      const faculties = ['Engineering', 'Computing', 'Business'];
      const randomFaculty = faculties[Math.floor(Math.random() * faculties.length)];
      const randomPart1 = Math.random().toString(36).substring(2, 6);
      const randomPart2 = Math.random().toString(36).substring(2, 5);
      const newHash: BallotLog = {
        hash: `Hash: ${randomPart1}...${randomPart2}`,
        timestamp: 'Just now',
        faculty: randomFaculty,
      };

      setBallots((prevBallots) => {
        // Increment timestamp counters of existing rows to mimic aging
        const aged = prevBallots.map((b) => {
          if (b.timestamp === 'Just now') return { ...b, timestamp: '8s ago' };
          if (b.timestamp === '2s ago') return { ...b, timestamp: '10s ago' };
          if (b.timestamp === '14s ago') return { ...b, timestamp: '22s ago' };
          if (b.timestamp === '8s ago') return { ...b, timestamp: '16s ago' };
          return b;
        });
        return [newHash, ...aged.slice(0, 4)];
      });
    }, 4500);

    return () => clearInterval(socketSimulator);
  }, []);

  const formatCountdown = () => {
    const h = Math.floor(secondsRemaining / 3600);
    const m = Math.floor((secondsRemaining % 3600) / 60);
    const s = secondsRemaining % 60;
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const totalEligible = 6250;
  const turnoutPercent = ((totalVotes / totalEligible) * 100).toFixed(1);

  return (
    <div className="bg-background min-h-screen text-on-background">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-4 md:px-12 py-4 bg-surface shadow-sm border-b border-outline-variant/30">
        <div className="flex items-center gap-4">
          <button className="text-primary hover:bg-surface-container-high p-2 rounded-full transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <School className="text-primary w-6 h-6" />
            <h1 className="text-xl font-bold text-primary">GTU e-Vote</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-on-surface">Kofi Mensah</span>
            <span className="text-[10px] text-on-tertiary-container font-extrabold uppercase tracking-wider">
              Verified Voter
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant">
            <img
              alt="Kofi Mensah avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhWyQDVxCKflEE1MM4Z2j7HMzWhqAf8SRVMh8CZxAKOPrdEOxhMNwxo0HtDXMtDTwwyyKFfFQ63ZD9-0S1M-YUR3v1h7qdrYBmGICQL1kR-UjlAg3mruFyoOMbBHOXzBhDuQRg1kiiyZQ63sWmqmbRVN61mGThhUO5JGAjNXX8CQw2VR3ysXW0MtUvF8ElLOC6ffWkgbDFCZYZPwbRm7u2wXBfxr_IgAEui09p65J8uPnhb_whU8vjZACeu-_yoiO4aBP2nbU5ATWr"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="pt-24 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Header Indicators section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-primary mb-2 tracking-tight">
              Results Live
            </h2>
            <p className="text-base text-on-surface-variant max-w-2xl leading-relaxed">
              Real-time monitoring of the 2024 GTU Student Council Elections. Ballot submissions are cryptographically verified, compiled, and rendered using live socket streams.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-low px-4.5 py-2.5 rounded-full border border-outline-variant/60 shadow-sm self-start md:self-auto">
            <span className="w-3 h-3 bg-on-tertiary-container rounded-full pulse-dot"></span>
            <span className="text-xs font-bold text-on-surface-variant tracking-wide">
              Simulated Socket.IO Stream Live
            </span>
          </div>
        </div>

        {/* Bento style Grid section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Bento card 1: Total votes */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm flex flex-col justify-between overflow-hidden relative min-h-[160px]">
            <div className="absolute top-2 right-2 p-4 opacity-5 text-primary">
              <Vote className="w-20 h-20" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Total Ballots Registered
              </span>
              <div className="text-4xl font-extrabold text-primary mt-2">
                {totalVotes.toLocaleString()}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-on-tertiary-container">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold tracking-wide">
                +{tickerVotesSinceLastMin} cast in current session
              </span>
            </div>
          </div>

          {/* Bento card 2: Progress percentage */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Overall Voter Turnout
              </span>
              <div className="text-4xl font-extrabold text-primary mt-2">
                {turnoutPercent}%
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-700"
                  style={{ width: `${turnoutPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-on-surface-variant">
                <span>{totalVotes.toLocaleString()} voted</span>
                <span>{totalEligible.toLocaleString()} eligible voters</span>
              </div>
            </div>
          </div>

          {/* Bento card 3: Time Countdown */}
          <div className="bg-primary-container border border-outline-variant/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between text-on-primary-container min-h-[160px]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Poll Closure Countdown
              </span>
              <div className="text-4xl font-mono font-bold text-white mt-2">
                {formatCountdown()}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-white/90">
              <Clock className="w-4 h-4 text-secondary-container" />
              <span className="text-xs font-medium">Polls close tonight at 8:00 PM GMT</span>
            </div>
          </div>
        </div>

        {/* President breakdowns charts panel */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Candidates charts panel element */}
          <div className="lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-primary">Student Council President Breakdown</h3>
              <span className="bg-secondary-container text-on-secondary-container px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                Audited & Verified
              </span>
            </div>

            <div className="space-y-6">
              {candidates.map((candidate, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20 bg-slate-100">
                        <img
                          src={candidate.avatarUrl}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-semibold text-sm text-on-surface">{candidate.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-primary block">
                        {candidate.votes.toLocaleString()} votes
                      </span>
                      <span className="text-xs font-semibold text-on-surface-variant block">
                        {candidate.percent}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container h-4.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-slate-500' : 'bg-outline-variant'
                      }`}
                      style={{ width: `${candidate.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('restricted')}
              className="mt-8 w-full py-3.5 bg-primary text-white hover:bg-primary-container rounded-xl text-xs font-bold tracking-wide uppercase cursor-pointer"
            >
              Request Full Certified Cryptographic Audit Ledger
            </button>
          </div>

          {/* Side Panel: turnouts and activity streams */}
          <div className="lg:col-span-2 space-y-6">
            {/* Faculty Turnout breakdowns */}
            <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                Participation by Faculty
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 text-right text-xs font-extrabold text-primary">82%</div>
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-on-surface-variant">
                      <span>Engineering Sciences</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                      <div className="bg-on-tertiary-container h-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 text-right text-xs font-extrabold text-primary">65%</div>
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-on-surface-variant">
                      <span>Computing & Informatics</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                      <div className="bg-on-tertiary-container h-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 text-right text-xs font-extrabold text-primary">54%</div>
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-on-surface-variant">
                      <span>Business School</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                      <div className="bg-on-tertiary-container h-full" style={{ width: '54%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Live Verified Ballots Ledger ticker */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                Recent Audited Ballots
              </h3>
              <div className="space-y-3.5">
                {ballots.map((ballot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2.5 border-b border-outline-variant/40 last:border-0"
                  >
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4.5 h-4.5 text-on-tertiary-container text-xs font-bold" />
                      <div>
                        <span className="font-mono text-xs font-bold text-on-surface block">
                          {ballot.hash}
                        </span>
                        <span className="text-[10px] text-on-surface-variant/75 font-semibold">
                          Faculty of {ballot.faculty}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-on-surface-variant tracking-wide">
                      {ballot.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 py-2 bg-surface border-t border-outline-variant/30 shadow-lg">
        <button
          onClick={() => onNavigate('vote')}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary p-1"
        >
          <Vote className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Vote</span>
        </button>
        <button
          onClick={() => onNavigate('landing')}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary p-1"
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5 mt-0.5">Journey</span>
        </button>
        <button
          onClick={() => onNavigate('results')}
          className="flex flex-col items-center justify-center text-primary bg-primary-container/40 p-1 px-3 rounded-xl transition-all"
        >
          <BarChart2 className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Results</span>
        </button>
        <button
          onClick={() => onNavigate('restricted')}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary p-1"
        >
          <Award className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Register</span>
        </button>
      </nav>
    </div>
  );
}

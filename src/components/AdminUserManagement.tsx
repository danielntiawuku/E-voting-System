/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  ShieldAlert,
  Mail,
  Search,
  CheckCircle,
  MoreVertical,
  XCircle,
  Plus,
  ArrowLeft,
  School,
  Loader2,
  Trash2,
  Check,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ScreenType } from '../types';

interface AdminUserManagementProps {
  onNavigate: (screen: ScreenType) => void;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Electoral Director' | 'Audit Officer' | 'Technical Admin' | 'Registrar';
  status: 'active' | 'offline' | 'suspended';
  avatarUrl: string;
  permissions: string[];
}

const INITIAL_ADMINS: AdminUser[] = [
  {
    id: "ADM-001",
    name: "Dean Albert Ofosu",
    email: "a.ofosu@gtu.edu.gh",
    role: "Electoral Director",
    status: "active",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6UFXCHnyb_-rSo1Ayf_5qV7y3ApRG17FIFe9nFfy-6LS1NQfqXnOvLWCxTF-HzWmgs1KsaLqbY84vMTfCvk4N4W3i80Z4IVIIOy_7yREtYPTKvm7XHG6wMqWRdx7V_HB9EI7u-AI36tzuu8mAgWJbUuQhMgUB3Aljbn_aGvi1qvjS0khGBUAIiSpiCQHW4xqxAi_oELRpkLXe5BdAf4bHlCzYSs3IyVQNivJ7mkVLyKwB57n4oOV8qaJizJ_sqWsIlfk0LgqfPUQE",
    permissions: ["Manage Timings", "Verify Candidates", "Audit Hashing", "Publish Broadcasts"]
  },
  {
    id: "ADM-002",
    name: "Dr. Paul Kwakwa",
    email: "p.kwakwa@gtu.edu.gh",
    role: "Technical Admin",
    status: "active",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhWyQDVxCKflEE1MM4Z2j7HMzWhqAf8SRVMh8CZxAKOPrdEOxhMNwxo0HtDXMtDTwwyyKFfFQ63ZD9-0S1M-YUR3v1h7qdrYBmGICQL1kR-UjlAg3mruFyoOMbBHOXzBhDuQRg1kiiyZQ63sWmqmbRVN61mGThhUO5JGAjNXX8CQw2VR3ysXW0MtUvF8ElLOC6ffWkgbDFCZYZPwbRm7u2wXBfxr_IgAEui09p65J8uPnhb_whU8vjZACeu-_yoiO4aBP2nbU5ATWr",
    permissions: ["Rotate API Keys", "Database Maintenance", "Debug Failures"]
  },
  {
    id: "ADM-003",
    name: "Mercy Mensah Antwi",
    email: "m.antwi@gtu.edu.gh",
    role: "Audit Officer",
    status: "offline",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV4ueEBgFDT2hlGIA92t3LX-2VcYGPcApH4a_XIelQPziRCgM_viS7O8zrlohOwUx2nU_mpRHWEWsY1CFApH5rMmvmEZFTMl3A5xesJakw7ja9XUoQ2YbUi70rRqoPNdUtRdWUdr30pDBoJwPH5R9xYltFB82iptdybViO0QCExMG_KhYJonASl7rtMvMyARekwvzEbnMKv7--OJ7dm5TPXpoiFsOn-EDc067KfNVQ44WLrH2Vd829ziEKcNbeMGE1Mrqwqom_jYTP",
    permissions: ["View Raw Logs", "Compare SHA Receipts"]
  },
  {
    id: "ADM-004",
    name: "Joseph Appiah-Kubi",
    email: "j.appiah@gtu.edu.gh",
    role: "Registrar",
    status: "suspended",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcTXhsFfjwccLNZfjdPPAVMhLxkBjweosVioVrTylECBVVMcrTQ-cSCiB7NYTJpwid5r7cigLwebFyBHGg1adbKmtvuS1h3vUDoHZn6NwsTzWWfrSKDERkCKUIxojzJsjkRLkzs8IPzhw9UamMV6s05p6MWotLqs-nvH13SD3kDd3TIf9MitZlg5tMXF0t83Dnr7zti2gZz62ITayR5uqf9PDF_26R_Y8_VnnvsuIWaZXW0IyIUUF7GJGL5a-i9rJ7ZtOVVBMtc0lf",
    permissions: ["Register Voters"]
  }
];

export default function AdminUserManagement({ onNavigate }: AdminUserManagementProps) {
  const [admins, setAdmins] = useState<AdminUser[]>(INITIAL_ADMINS);
  const [search, setSearch] = useState('');
  
  // Create state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'Electoral Director' | 'Audit Officer' | 'Technical Admin' | 'Registrar'>('Audit Officer');
  const [isAdding, setIsAdding] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setShowAddForm(false);

      // Map fallback permissions based on role
      let permissions = ["View Raw Logs"];
      if (newRole === 'Electoral Director') {
        permissions = ["Manage Timings", "Verify Candidates", "Audit Hashing", "Publish Broadcasts"];
      } else if (newRole === 'Technical Admin') {
        permissions = ["Rotate API Keys", "Database Maintenance", "Debug Failures"];
      } else if (newRole === 'Registrar') {
        permissions = ["Register Voters", "Audit Registrations"];
      }

      const newUser: AdminUser = {
        id: `ADM-0${admins.length + 1}`,
        name: newName,
        email: newEmail,
        role: newRole,
        status: 'active',
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhWyQDVxCKflEE1MM4Z2j7HMzWhqAf8SRVMh8CZxAKOPrdEOxhMNwxo0HtDXMtDTwwyyKFfFQ63ZD9-0S1M-YUR3v1h7qdrYBmGICQL1kR-UjlAg3mruFyoOMbBHOXzBhDuQRg1kiiyZQ63sWmqmbRVN61mGThhUO5JGAjNXX8CQw2VR3ysXW0MtUvF8ElLOC6ffWkgbDFCZYZPwbRm7u2wXBfxr_IgAEui09p65J8uPnhb_whU8vjZACeu-_yoiO4aBP2nbU5ATWr",
        permissions
      };

      setAdmins([...admins, newUser]);
      setNewName('');
      setNewEmail('');
    }, 1500);
  };

  const handleToggleStatus = (id: string) => {
    setAdmins(admins.map(adm => {
      if (adm.id === id) {
        let nextStatus: AdminUser['status'] = 'active';
        if (adm.status === 'active') nextStatus = 'offline';
        else if (adm.status === 'offline') nextStatus = 'suspended';
        return { ...adm, status: nextStatus };
      }
      return adm;
    }));
  };

  const handleRevoke = (id: string) => {
    setAdmins(admins.filter(adm => adm.id !== id));
  };

  const filteredAdmins = admins.filter((adm) => {
    return (
      adm.name.toLowerCase().includes(search.toLowerCase()) ||
      adm.email.toLowerCase().includes(search.toLowerCase()) ||
      adm.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="bg-background min-h-screen text-on-background pb-12">
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
            <span className="text-xl font-bold text-primary">GTU Officers</span>
          </div>
        </div>
        <div className="flex bg-[#eff4ff] text-primary border border-primary/20 items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-sans">
          <ShieldAlert className="w-3.5 h-3.5 text-secondary" />
          <span>Institutional Roles Master</span>
        </div>
      </header>

      {/* Main Core View */}
      <main className="pt-24 px-4 md:px-12 max-w-7xl mx-auto font-sans">
        
        {/* Banner with header details and Add Trigger button */}
        <div className="mb-8 border-b pb-6 border-outline-variant/30 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-widest">
              Access Matrix
            </span>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight">
              Admin & Officer Account Management
            </h2>
            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed mt-1">
              Add new registrars and auditing personnel, verify executive clearance indices, configure permissions, and toggle statuses dynamically.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-primary hover:bg-primary-container text-white py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shrink-0 shadow-sm cursor-pointer transition-all active:scale-95"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>{showAddForm ? 'Hide Creator Form' : 'Provision Officer'}</span>
          </button>
        </div>

        {/* Dynamic add officer drawer */}
        {showAddForm && (
          <div className="bg-surface-container-lowest border-2 border-primary/20 rounded-2xl p-6 mb-8 shadow-md">
            <h3 className="text-base font-bold text-primary mb-4 flex items-center gap-1.5">
              <UserPlus className="w-5 h-5 text-secondary" />
              Provision New Electoral Officer Role
            </h3>

            <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Officer Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prof. Joshua Osei"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:border-primary outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Official Academic Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. j.osei@gtu.edu.gh"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:border-primary outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Electoral Role Allocation
                </label>
                <div className="flex gap-2">
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="flex-grow bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:border-primary outline-none"
                  >
                    <option value="Audit Officer">Audit Officer</option>
                    <option value="Registrar">Registrar Account</option>
                    <option value="Technical Admin">Technical Admin</option>
                    <option value="Electoral Director">Electoral Director</option>
                  </select>
                  <button
                    type="submit"
                    disabled={isAdding}
                    className="bg-[#001e40] text-amber-400 hover:scale-105 font-bold p-3 px-5 rounded-xl cursor-pointer shadow-xs shrink-0 flex items-center gap-1"
                  >
                    {isAdding ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4.5 h-4.5" />
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Dashboard index filters */}
        <section className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center gap-3 mb-6">
          <Search className="w-5 h-5 text-outline shrink-0 ml-1" />
          <input
            type="text"
            placeholder="Search officer accounts by role, email alignment, or name indices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-0 text-sm outline-none text-on-surface"
          />
        </section>

        {/* Grid display users */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredAdmins.map((adm) => (
            <div key={adm.id} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-primary/45 transition-all">
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20 bg-slate-100">
                      <img
                        src={adm.avatarUrl}
                        alt={adm.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-primary leading-tight">{adm.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] bg-[#eff4ff] text-primary border border-primary/25 rounded px-2 py-0.5 uppercase tracking-wide font-bold">
                          {adm.role}
                        </span>
                        <span className="font-mono text-[9px] text-outline font-bold">
                          {adm.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status pills selector trigger toggle */}
                  <button
                    onClick={() => handleToggleStatus(adm.id)}
                    className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                      adm.status === 'active'
                        ? 'bg-emerald-58/12 text-emerald-800 border border-emerald-300'
                        : adm.status === 'offline'
                        ? 'bg-slate-100 text-slate-500 border border-slate-300'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                    title="Click to alternate account states"
                  >
                    ● {adm.status}
                  </button>
                </div>

                {/* Email line */}
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                  <Mail className="w-4.5 h-4.5 text-outline shrink-0" />
                  <span>{adm.email}</span>
                </div>

                {/* Permissions tag cloud line */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#737780] block">
                    Assigned Execution Privileges:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {adm.permissions.map((perm, idx) => (
                      <span key={idx} className="bg-surface border border-outline-variant/60 text-[10px] font-bold text-primary px-2 py-1 rounded-lg">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Box footer CTA actions */}
              <div className="mt-6 pt-4 border-t border-outline-variant/45 flex justify-between items-center gap-4">
                <p className="text-[10px] text-outline font-semibold">
                  Policy Level: Standard Clearance ISO-27001
                </p>
                <button
                  type="button"
                  onClick={() => handleRevoke(adm.id)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer"
                  title="Suspend credentials instantly"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Revoke</span>
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Informational help alert */}
        <section className="mt-8 bg-surface-container-low border border-outline-variant p-5 rounded-2xl flex gap-3 text-xs">
          <Info className="text-primary w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <h4 className="font-extrabold uppercase tracking-widest text-[10px] text-[#001e40]">Credentials and Roles Control</h4>
            <p className="text-on-surface-variant/95 leading-relaxed">
              Adding new administrators sends automatic credentials onboarding keys containing localized private RSA keys to their official GTU academic mailbox. Access tokens remain active for 24-hour cycles.
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-12 text-center text-xs text-outline font-bold uppercase tracking-widest">
        Ghana Telecom University • Accounts Security Secretariat
      </footer>
    </div>
  );
}

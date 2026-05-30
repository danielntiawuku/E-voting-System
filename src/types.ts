/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenType =
  // --- Legacy Screens ---
  | 'vote'
  | 'results'
  | 'broadcast'
  | 'audit'
  | 'reports'
  | 'settings'
  | 'adminUsers'

  // --- Set 1: Authentication & Core ---
  | 'landing'
  | 'login'
  | 'login-redesign'
  | 'verification'
  | 'recover'
  | 'reset'
  | 'notFound'
  | 'restricted'
  | 'cast-early'
  | 'results-early'
  
  // --- Set 2: Voter Portal ---
  | 'voter-dashboard'
  | 'election-details'
  | 'candidate-profile'
  | 'digital-ballot'
  | 'vote-confirmation'
  | 'vote-receipt'
  | 'live-results-voter'
  | 'notifications-voter'
  | 'account-settings-voter'
  | 'candidate-reg-1'
  | 'candidate-reg-2'
  | 'candidate-reg-3'
  | 'candidate-dashboard'
  | 'application-status'
  | 'edit-candidate-profile'
  | 'candidate-election-results'

  // --- Set 3: Admin Portal ---
  | 'admin-dashboard'
  | 'elections-management'
  | 'setup-new-election'
  | 'edit-election-detail'
  | 'manage-election-detail'
  | 'candidate-applications'
  | 'review-candidacy'
  | 'voter-roll-registry'
  | 'voter-profile-admin'
  | 'advanced-election-analytics'
  | 'broadcast-management-admin'
  | 'system-audit-log-admin'
  | 'reports-analytics-admin'
  | 'global-system-settings'
  | 'admin-user-management';

export interface Candidate {
  id: string;
  name: string;
  level: string;
  major: string;
  manifesto: string;
  avatarUrl: string;
  votes: number;
}

export interface BallotLog {
  hash: string;
  timestamp: string;
  faculty: string;
}

export interface VoteState {
  hasVoted: boolean;
  selectedCandidateId: string | null;
  votedCandidateId: string | null;
  isSubmitting: boolean;
  totalVotes: number;
}

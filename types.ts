
export type TransactionStatus = 'Pending' | 'Approved' | 'Paid' | 'Rejected';
export type TransactionType = 'Deposit' | 'Withdrawal';

export interface Transaction {
  id: string;
  userId: string;
  userEmail: string;
  type: TransactionType;
  amount: number;
  currency: string;
  method: string;
  status: TransactionStatus;
  date: string;
  screenshot?: string;
  remarks?: string;
}

export interface MT5Account {
  id: string;
  loginId: string;
  server: string;
  leverage: string;
  balance: number;
  status: 'Active' | 'Disabled';
  accountType: 'Standard' | 'ECN' | 'VIP';
}

export interface User {
  id: string;
  email: string;
  name: string;
  mobile?: string;
  country?: string;
  kycStatus: 'Unverified' | 'Pending' | 'Verified';
  accounts: MT5Account[];
}

export interface AdminLog {
  id: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
  reason: string;
}

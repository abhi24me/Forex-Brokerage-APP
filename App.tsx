
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/ClientDashboard';
import AdminPanel from './pages/AdminPanel';
import InstrumentsPage from './pages/InstrumentsPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import LegalPage from './pages/LegalPage';
import PlatformsPage from './pages/PlatformsPage';
import { User, Transaction, AdminLog } from './types';

const MOCK_USER: User = {
  id: 'user-777',
  email: 'trader.pro@global.com',
  name: 'Alexander Sterling',
  mobile: '+44 7700 900123',
  country: 'United Kingdom',
  kycStatus: 'Unverified',
  accounts: [
    { id: 'acc-1', loginId: '1099281', server: 'ABC-FX-Live-01', leverage: '1:500', balance: 14250.75, status: 'Active', accountType: 'ECN' },
    { id: 'acc-2', loginId: '2288394', server: 'ABC-FX-Live-01', leverage: '1:200', balance: 840.12, status: 'Active', accountType: 'Standard' },
    { id: 'acc-3', loginId: '5500129', server: 'ABC-FX-VIP-02', leverage: '1:100', balance: 125400.00, status: 'Active', accountType: 'VIP' }
  ]
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx-22', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Deposit', amount: 50000, currency: 'USD', method: 'Wire Transfer', status: 'Approved', date: '2023-11-04 10:30' },
  { id: 'tx-21', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Withdrawal', amount: 2500, currency: 'USD', method: 'Crypto (USDT)', status: 'Pending', date: '2023-11-04 09:15', remarks: 'USDT TRC20: TX99...' },
  { id: 'tx-20', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Deposit', amount: 1200, currency: 'USD', method: 'Crypto (USDT)', status: 'Pending', date: '2023-11-03 14:20', screenshot: 'https://picsum.photos/seed/tx20/400/600' },
  { id: 'tx-19', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Withdrawal', amount: 800, currency: 'USD', method: 'Bank Transfer', status: 'Paid', date: '2023-11-03 11:00' },
  { id: 'tx-18', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Deposit', amount: 15000, currency: 'USD', method: 'Wire Transfer', status: 'Approved', date: '2023-11-02 16:45' },
  { id: 'tx-17', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Withdrawal', amount: 1000, currency: 'USD', method: 'Crypto (USDT)', status: 'Paid', date: '2023-11-02 09:30' },
  { id: 'tx-16', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Deposit', amount: 500, currency: 'USD', method: 'UPI', status: 'Approved', date: '2023-11-01 19:10' },
  { id: 'tx-15', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Withdrawal', amount: 3000, currency: 'USD', method: 'Bank Transfer', status: 'Paid', date: '2023-11-01 13:00' },
  { id: 'tx-14', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Deposit', amount: 2500, currency: 'USD', method: 'Crypto (USDT)', status: 'Approved', date: '2023-10-31 10:15' },
  { id: 'tx-13', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Withdrawal', amount: 450, currency: 'USD', method: 'UPI', status: 'Rejected', date: '2023-10-31 08:40', remarks: 'Invalid VPA address' },
  { id: 'tx-12', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Deposit', amount: 10000, currency: 'USD', method: 'Wire Transfer', status: 'Approved', date: '2023-10-30 14:00' },
  { id: 'tx-11', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Deposit', amount: 100, currency: 'USD', method: 'Crypto (USDT)', status: 'Approved', date: '2023-10-30 09:00' },
  { id: 'tx-10', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Withdrawal', amount: 150, currency: 'USD', method: 'Bank Transfer', status: 'Paid', date: '2023-10-29 11:20' },
  { id: 'tx-09', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Deposit', amount: 5000, currency: 'USD', method: 'Wire Transfer', status: 'Approved', date: '2023-10-28 10:00' },
  { id: 'tx-08', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Withdrawal', amount: 2000, currency: 'USD', method: 'Crypto (USDT)', status: 'Paid', date: '2023-10-28 16:30' },
  { id: 'tx-07', userId: 'user-777', userEmail: 'trader.pro@global.com', type: 'Deposit', amount: 12000, currency: 'USD', method: 'Wire Transfer', status: 'Approved', date: '2023-10-27 12:15' },
];

const MOCK_LOGS: AdminLog[] = [
  { id: 'log-15', adminName: 'Chief Officer', action: 'VIP Upgrade', target: 'Alexander Sterling', timestamp: '2023-11-04 11:00', reason: 'High net-worth client request' },
  { id: 'log-14', adminName: 'Risk Desk', action: 'Withdrawal Paid', target: 'tx-17', timestamp: '2023-11-02 12:45', reason: 'USDT Liquidity fulfilled' },
  { id: 'log-13', adminName: 'Support Agent', action: 'Leverage Reset', target: '1099281', timestamp: '2023-11-01 14:30', reason: 'Margin requirement update' },
  { id: 'log-12', adminName: 'Compliance', action: 'Manual Review', target: 'trader.pro@global.com', timestamp: '2023-10-31 09:00', reason: 'Identity validation pending' },
  { id: 'log-11', adminName: 'Super Admin', action: 'Balance Adjusted', target: '5500129', timestamp: '2023-10-30 15:00', reason: 'Correction for deposit lag' },
  { id: 'log-10', adminName: 'Risk Desk', action: 'Manual Payout', target: 'tx-08', timestamp: '2023-10-28 18:00', reason: 'Priority processing for VIP' },
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [logs, setLogs] = useState<AdminLog[]>(MOCK_LOGS);

  useEffect(() => {
    const auth = localStorage.getItem('abcfx_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('abcfx_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('abcfx_auth');
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/instruments" element={<InstrumentsPage />} />
        <Route path="/platforms" element={<PlatformsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/legal" element={<LegalPage />} />
        
        <Route 
          path="/dashboard/*" 
          element={isAuthenticated ? (
            <ClientDashboard user={user} transactions={transactions} setTransactions={setTransactions} setUser={setUser} />
          ) : (
            <Navigate to="/login" replace />
          )} 
        />
        
        <Route 
          path="/admin/*" 
          element={isAuthenticated ? (
            <AdminPanel transactions={transactions} setTransactions={setTransactions} logs={logs} setLogs={setLogs} user={user} setUser={setUser} />
          ) : (
            <Navigate to="/login" replace />
          )} 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;

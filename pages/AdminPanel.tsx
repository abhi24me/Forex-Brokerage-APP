
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar, Header, PageContainer } from '../components/Layout';
import { Transaction, TransactionStatus, AdminLog, User } from '../types';
import { 
  Eye, 
  Check, 
  X, 
  User as UserIcon, 
  History,
  Plus,
  Minus,
  Server,
  ShieldCheck,
  AlertCircle,
  Clock,
  Shield,
  FileText,
  CreditCard,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react';

interface AdminPanelProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  logs: AdminLog[];
  setLogs: React.Dispatch<React.SetStateAction<AdminLog[]>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const RequestQueue: React.FC<{ 
  transactions: Transaction[]; 
  onAction: (id: string, status: TransactionStatus) => void;
  onMenuClick: () => void;
}> = ({ transactions, onAction, onMenuClick }) => {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const pendingCount = transactions.filter(t => t.status === 'Pending').length;
  const totalVolume = transactions.filter(t => t.status === 'Approved' || t.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="animate-in fade-in duration-500">
      <Header title="Administrative Queue" subtitle="Manage incoming manual funding requests." onMenuClick={onMenuClick} />
      
      {/* Admin Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass p-8 rounded-4xl border-white/5 group hover-lift active:scale-95 transition-all">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500"><Clock size={20} /></div>
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Pending Actions</p>
          </div>
          <p className="text-3xl font-black text-white">{pendingCount}</p>
        </div>
        <div className="glass p-8 rounded-4xl border-white/5 group hover-lift active:scale-95 transition-all">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-green-500/10 rounded-2xl text-green-500"><TrendingUp size={20} /></div>
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Processed Volume</p>
          </div>
          <p className="text-3xl font-black text-white">${totalVolume.toLocaleString()}</p>
        </div>
        <div className="glass p-8 rounded-4xl border-white/5 group hover-lift active:scale-95 transition-all">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-electricBlue/10 rounded-2xl text-electricBlue"><Activity size={20} /></div>
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">7-Day Velocity</p>
          </div>
          <p className="text-3xl font-black text-white">High</p>
        </div>
      </div>

      <div className="glass rounded-4xl border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-white/5 border-b border-white/10 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
              <tr>
                <th className="px-10 py-6">Identity</th>
                <th className="px-10 py-6">Type</th>
                <th className="px-10 py-6">Capital (USD)</th>
                <th className="px-10 py-6">Verification Proof</th>
                <th className="px-10 py-6 text-right">Review Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.filter(t => t.status === 'Pending').map(tx => (
                <tr key={tx.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex flex-col">
                      <span className="font-black text-sm text-white group-hover:text-electricBlue transition-colors">{tx.userEmail.split('@')[0].toUpperCase()}</span>
                      <span className="text-[10px] text-gray-500 font-mono tracking-tighter">{tx.userEmail}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-black tracking-[0.2em] border uppercase ${tx.type === 'Deposit' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-10 py-8 font-mono font-black text-base text-white tracking-tighter">${tx.amount.toLocaleString()}</td>
                  <td className="px-10 py-8">
                    {tx.type === 'Deposit' ? (
                      tx.screenshot ? (
                        <button onClick={() => setSelectedTx(tx)} className="p-3 glass rounded-xl text-electricBlue hover:bg-white hover:text-black transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><Eye size={16} /> Inspect</button>
                      ) : <span className="text-[10px] text-gray-600 font-black">MISSING PROOF</span>
                    ) : (
                      <div className="group/note relative">
                         <span className="text-gray-400 text-[10px] font-mono truncate max-w-[150px] block cursor-help">{tx.remarks || 'Direct Bank'}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex justify-end gap-3">
                      {tx.type === 'Withdrawal' ? (
                        <button 
                          onClick={() => onAction(tx.id, 'Paid')}
                          className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-90"
                          title="Execute Payment"
                        >
                          <CreditCard size={18} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => onAction(tx.id, 'Approved')}
                          className="p-3 bg-green-500/10 text-green-500 rounded-2xl hover:bg-green-500 hover:text-white transition-all shadow-lg active:scale-90"
                          title="Verify Funds"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => onAction(tx.id, 'Rejected')}
                        className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-90"
                        title="Decline"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {transactions.filter(t => t.status === 'Pending').length === 0 && (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center text-gray-500 uppercase font-black tracking-[0.5em] opacity-30">All manual queues are clear</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTx && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300" onClick={() => setSelectedTx(null)}>
          <div className="glass max-w-3xl w-full p-1 rounded-[48px] relative shadow-[0_0_100px_rgba(0,0,0,0.8)]" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedTx(null)}
              className="absolute top-8 right-8 z-10 p-3 glass-dark rounded-full hover:bg-white text-black transition-all shadow-2xl"
            >
              <X size={28} />
            </button>
            <div className="overflow-hidden rounded-[46px] max-h-[80vh]">
              <img src={selectedTx.screenshot} className="w-full object-contain" alt="Submission Proof" />
            </div>
            <div className="p-10 flex justify-between items-end">
              <div>
                <h4 className="text-3xl font-black mb-2 tracking-tight">Manual Verification</h4>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Transaction ID: {selectedTx.id}</p>
              </div>
              <div className="flex gap-4">
                 <button onClick={() => {onAction(selectedTx.id, 'Rejected'); setSelectedTx(null);}} className="px-8 py-3 bg-red-500/10 text-red-500 font-black rounded-2xl text-[10px] uppercase tracking-widest border border-red-500/20">Decline</button>
                 <button onClick={() => {onAction(selectedTx.id, 'Approved'); setSelectedTx(null);}} className="px-8 py-3 bg-green-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest blue-glow">Verify Credit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const UserManagement: React.FC<{ user: User, setUser: (u: User) => void, logs: AdminLog[], setLogs: (l: any) => void, onMenuClick: () => void }> = ({ user, setUser, logs, setLogs, onMenuClick }) => {
  const [showDocs, setShowDocs] = useState(false);
  
  const updateKYC = (status: 'Unverified' | 'Pending' | 'Verified') => {
    setUser({ ...user, kycStatus: status });
    const newLog: AdminLog = {
      id: Math.random().toString(36).substr(2, 9),
      adminName: 'Super Admin',
      action: 'KYC Override',
      target: user.email,
      timestamp: new Date().toISOString().replace('T', ' ').substr(0, 16),
      reason: `Institutional KYC manual override to ${status}`
    };
    setLogs((prev: any) => [newLog, ...prev]);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <Header title="Institutional Users" subtitle="Manual verification and client oversight." onMenuClick={onMenuClick} />
      <div className="glass rounded-4xl border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-white/5 border-b border-white/10 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
              <tr>
                <th className="px-10 py-6">Client Identity</th>
                <th className="px-10 py-6">Geography</th>
                <th className="px-10 py-6">KYC Protocol</th>
                <th className="px-10 py-6 text-right">Access Controls</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-white/[0.03] transition-colors group">
                <td className="px-10 py-8">
                  <div className="flex flex-col">
                    <span className="font-black text-base text-white">{user.name.toUpperCase()}</span>
                    <span className="text-[10px] text-gray-500 font-mono tracking-tighter">{user.email}</span>
                  </div>
                </td>
                <td className="px-10 py-8 text-xs text-gray-400 font-black tracking-widest">{user.country?.toUpperCase()}</td>
                <td className="px-10 py-8">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                    user.kycStatus === 'Verified' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 
                    user.kycStatus === 'Pending' ? 'text-amber-500 border-amber-500/20 bg-amber-500/5' : 'text-red-500 border-red-500/20 bg-red-500/5'
                  }`}>
                    {user.kycStatus}
                  </span>
                </td>
                <td className="px-10 py-8">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => setShowDocs(true)} className="px-6 py-2.5 glass border-white/10 hover:bg-white hover:text-black transition-all text-[10px] font-black uppercase tracking-widest rounded-xl">Review Docs</button>
                    <button onClick={() => updateKYC('Verified')} className="px-6 py-2.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all shadow-lg">Approve</button>
                    <button onClick={() => updateKYC('Unverified')} className="px-6 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg">Ban Client</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showDocs && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/98 backdrop-blur-3xl animate-in fade-in duration-300" onClick={() => setShowDocs(false)}>
          <div className="glass max-w-5xl w-full p-12 rounded-[48px] relative shadow-2xl" onClick={e => e.stopPropagation()}>
             <button onClick={() => setShowDocs(false)} className="absolute top-8 right-8 p-3 glass rounded-full hover:bg-white text-black transition-all"><X size={24} /></button>
             <h4 className="text-4xl font-black mb-10 tracking-tight">Identity Compliance</h4>
             <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Document Type: Passport (ID-1)</p>
                  <div className="aspect-[16/10] glass-dark rounded-[32px] overflow-hidden border border-white/5 hover:border-electricBlue/30 transition-all shadow-xl">
                     <img src="https://picsum.photos/seed/id1/800/500" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Primary ID" />
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Document Type: Bank Statement (POR)</p>
                  <div className="aspect-[16/10] glass-dark rounded-[32px] overflow-hidden border border-white/5 hover:border-electricBlue/30 transition-all shadow-xl">
                     <img src="https://picsum.photos/seed/por1/800/500" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Proof of Residence" />
                  </div>
                </div>
             </div>
             <div className="mt-12 flex justify-end gap-5">
                <button onClick={() => {updateKYC('Unverified'); setShowDocs(false);}} className="px-10 py-4 glass border-red-500/20 text-red-500 font-black rounded-2xl text-xs uppercase tracking-widest">Reject Submission</button>
                <button onClick={() => {updateKYC('Verified'); setShowDocs(false);}} className="px-10 py-4 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">Fully Verify Account</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AccountManagement: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => (
  <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
    <Header title="Terminal Protocol" subtitle="Manual MT5 server deployment." onMenuClick={onMenuClick} />
    <div className="glass p-10 md:p-16 rounded-[48px] border-white/10 mb-10 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-12 text-white/[0.02] group-hover:text-gold/5 transition-colors"><Server size={250} /></div>
      <div className="grid md:grid-cols-2 gap-10 mb-12 relative z-10">
        <div className="space-y-4">
          <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] block px-1">Login ID Assignment</label>
          <input type="text" className="w-full bg-onyx/50 border border-white/10 p-6 rounded-3xl focus:outline-none focus:border-gold font-mono text-white text-lg tracking-widest" placeholder="8819203" />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] block px-1">Execution Tier</label>
          <select className="w-full bg-onyx/50 border border-white/10 p-6 rounded-3xl focus:outline-none focus:border-gold text-white font-bold appearance-none">
            <option>ECN (LD4 Institutional)</option>
            <option>VIP (Raw Spreads)</option>
            <option>Standard (Low Spread)</option>
          </select>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] block px-1">Risk Parameter (Leverage)</label>
          <input type="text" className="w-full bg-onyx/50 border border-white/10 p-6 rounded-3xl text-white font-bold" placeholder="1:500" />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] block px-1">Deployment Server</label>
          <input type="text" className="w-full bg-onyx/50 border border-white/10 p-6 rounded-3xl text-white font-bold" placeholder="ABCFX-Manual-01" />
        </div>
      </div>
      <button className="w-full bg-gold text-black py-6 rounded-3xl font-black text-sm uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl gold-glow">
        Deploy MT5 Terminal
      </button>
    </div>
  </div>
);

const BalanceAdjuster: React.FC<{ 
  user: User; 
  onAdjust: (amount: number, reason: string) => void;
  onMenuClick: () => void;
}> = ({ user, onAdjust, onMenuClick }) => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [type, setType] = useState<'Add' | 'Sub'>('Add');

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <Header title="Capital Adjustment" subtitle="Manual balance synchronization desk." onMenuClick={onMenuClick} />
      <div className="glass p-10 md:p-16 rounded-[48px] border-white/5 shadow-2xl">
        <div className="flex items-center gap-6 p-8 glass-dark rounded-[32px] border-white/5 mb-12 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-electricBlue/10 border-4 border-electricBlue flex items-center justify-center font-black text-electricBlue text-2xl shadow-2xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-black text-white text-2xl tracking-tight">{user.name.toUpperCase()}</p>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Live Indicative Bal: <span className="text-gold font-mono">${user.accounts[0].balance.toLocaleString()}</span></p>
          </div>
        </div>

        <div className="space-y-10">
          <div className="flex gap-4 p-2 bg-onyx/50 rounded-[28px] border border-white/5 shadow-inner">
            <button 
              onClick={() => setType('Add')}
              className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${type === 'Add' ? 'bg-green-600 text-white shadow-lg blue-glow' : 'text-gray-500 hover:text-white'}`}
            >
              <Plus size={20} /> Credit Capital
            </button>
            <button 
              onClick={() => setType('Sub')}
              className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${type === 'Sub' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              <Minus size={20} /> Debit Capital
            </button>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] block px-2">Adjustment Quantum (USD)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00" 
              className="w-full bg-onyx/50 border border-white/10 p-8 rounded-[32px] text-5xl font-black focus:outline-none focus:border-gold transition-colors text-white font-mono tracking-tighter" 
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] block px-2">Audit Reasoning (Compulsory)</label>
            <textarea 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-onyx/50 border border-white/10 p-6 rounded-[32px] focus:outline-none focus:border-electricBlue text-sm min-h-[160px] text-white font-medium" 
              placeholder="e.g. Deposit match bonus, Correction for IB commission..."
            />
          </div>

          <button 
            disabled={!amount || !reason}
            onClick={() => onAdjust(type === 'Add' ? parseFloat(amount) : -parseFloat(amount), reason)}
            className={`w-full py-6 rounded-[32px] font-black uppercase tracking-[0.3em] text-sm shadow-2xl transition-all disabled:opacity-30 ${type === 'Add' ? 'bg-green-600 hover:scale-[1.02] active:scale-95' : 'bg-red-600 hover:scale-[1.02] active:scale-95'}`}
          >
            Execute Capital Change
          </button>
        </div>
      </div>
    </div>
  );
};

const ActivityLogs: React.FC<{ logs: AdminLog[], onMenuClick: () => void }> = ({ logs, onMenuClick }) => (
  <div className="animate-in fade-in duration-500">
    <Header title="Administrative Audit" subtitle="System-wide action tracking for compliance." onMenuClick={onMenuClick} />
    <div className="glass rounded-4xl border-white/10 overflow-hidden shadow-2xl">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-white/5 border-b border-white/10 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
            <tr>
              <th className="px-10 py-6">Audit Timestamp</th>
              <th className="px-10 py-6">Acting Official</th>
              <th className="px-10 py-6">Operation</th>
              <th className="px-10 py-6">Detailed Reasoning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-white/[0.03] transition-colors group">
                <td className="px-10 py-7 text-[11px] text-gray-500 font-mono tracking-tighter">{log.timestamp}</td>
                <td className="px-10 py-7 font-black text-xs text-white group-hover:text-gold transition-colors">{log.adminName.toUpperCase()}</td>
                <td className="px-10 py-7">
                  <span className="bg-white/5 px-3 py-1.5 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest border border-white/10">
                    {log.action}
                  </span>
                </td>
                <td className="px-10 py-7 text-[11px] text-gray-500 font-medium italic max-w-sm truncate">{log.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const AdminPanel: React.FC<AdminPanelProps> = ({ transactions, setTransactions, logs, setLogs, user, setUser }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAction = (id: string, status: TransactionStatus) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        if (status === 'Approved' || status === 'Paid') {
          const updatedUser = { ...user };
          // For demo, we adjust the first account. In prod, it matches the loginId in remarks.
          if (t.type === 'Deposit') {
            updatedUser.accounts[0].balance += t.amount;
          }
          setUser(updatedUser);
        }
        return { ...t, status };
      }
      return t;
    }));

    const tx = transactions.find(t => t.id === id);
    if (tx) {
      const newLog: AdminLog = {
        id: Math.random().toString(36).substr(2, 9),
        adminName: 'Super Admin',
        action: `${tx.type} ${status}`,
        target: tx.userEmail,
        timestamp: new Date().toISOString().replace('T', ' ').substr(0, 16),
        reason: `Manual request ${status.toLowerCase()} by admin protocol.`
      };
      setLogs((prev: any) => [newLog, ...prev]);
    }
  };

  const handleAdjust = (amount: number, reason: string) => {
    const updatedUser = { ...user };
    updatedUser.accounts[0].balance += amount;
    setUser(updatedUser);

    const newLog: AdminLog = {
      id: Math.random().toString(36).substr(2, 9),
      adminName: 'Super Admin',
      action: 'Balance Manual Sync',
      target: user.accounts[0].loginId,
      timestamp: new Date().toISOString().replace('T', ' ').substr(0, 16),
      reason: reason
    };
    setLogs((prev: any) => [newLog, ...prev]);
    alert('Capital adjustment synchronized and logged in the institutional ledger.');
  };

  return (
    <>
      <Sidebar type="admin" isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <PageContainer>
        <Routes>
          <Route index element={<RequestQueue transactions={transactions} onAction={handleAction} onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="users" element={<UserManagement user={user} setUser={setUser} logs={logs} setLogs={setLogs} onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="accounts" element={<AccountManagement onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="adjust" element={<BalanceAdjuster user={user} onAdjust={handleAdjust} onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="logs" element={<ActivityLogs logs={logs} onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="*" element={<RequestQueue transactions={transactions} onAction={handleAction} onMenuClick={() => setIsSidebarOpen(true)} />} />
        </Routes>
      </PageContainer>
    </>
  );
};

export default AdminPanel;

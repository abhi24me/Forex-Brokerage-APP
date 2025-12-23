
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  User as UserIcon, 
  ShieldCheck, 
  LogOut,
  Settings,
  History,
  Activity,
  Sparkles,
  Users,
  Menu,
  X,
  CreditCard,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  type: 'client' | 'admin';
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ type, isOpen, setIsOpen }) => {
  const clientLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard/analyst', icon: Sparkles, label: 'AI Analyst' },
    { to: '/dashboard/deposit', icon: ArrowDownCircle, label: 'Deposit' },
    { to: '/dashboard/withdraw', icon: ArrowUpCircle, label: 'Withdraw' },
    { to: '/dashboard/history', icon: CreditCard, label: 'Transactions' },
    { to: '/dashboard/profile', icon: UserIcon, label: 'Profile & KYC' },
    { to: '/support', icon: HelpCircle, label: 'Support' },
  ];

  const adminLinks = [
    { to: '/admin', icon: Activity, label: 'Request Queue' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
    { to: '/admin/accounts', icon: Settings, label: 'MT5 Management' },
    { to: '/admin/adjust', icon: Wallet, label: 'Balance Adjust' },
    { to: '/admin/logs', icon: History, label: 'Activity Logs' },
  ];

  const links = type === 'client' ? clientLinks : adminLinks;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`
        fixed left-0 top-0 h-screen bg-slate border-r border-white/5 flex flex-col z-[100] transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]
        w-[280px] ${isOpen ? 'translate-x-0 shadow-[20px_0_60px_rgba(0,0,0,0.5)]' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tighter flex items-center gap-2 group cursor-pointer">
              ABC <span className="text-gold group-hover:text-electricBlue transition-colors duration-500">FX</span>
            </h1>
            <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.3em] mt-1.5">Institutional Manual</p>
          </div>
          <button 
            className="lg:hidden p-2 text-gray-500 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to.split('/').length === 2}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3.5 px-5 py-4 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-electricBlue text-white blue-glow shadow-[0_10px_30px_rgba(0,82,255,0.3)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              <link.icon size={18} className="group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm tracking-wide">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <NavLink
            to="/"
            className="flex items-center gap-3.5 px-5 py-4 text-red-400 hover:bg-red-400/5 rounded-2xl transition-all group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Logout Portal</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export const Header: React.FC<{ title: string; subtitle?: string; onMenuClick?: () => void }> = ({ title, subtitle, onMenuClick }) => (
  <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div className="flex items-center gap-5">
      {onMenuClick && (
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-3 glass rounded-2xl text-gray-400 hover:text-white hover:border-white/20 transition-all active:scale-90"
        >
          <Menu size={20} />
        </button>
      )}
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1 font-medium tracking-wide">{subtitle}</p>}
      </div>
    </div>
  </header>
);

export const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="lg:ml-[280px] p-4 md:p-8 xl:p-12 min-h-screen bg-onyx text-white relative">
    <div className="max-w-[1600px] mx-auto">
      {children}
    </div>
  </div>
);

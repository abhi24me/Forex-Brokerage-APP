
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, Monitor, Smartphone, ShieldCheck, Zap, Globe, TrendingUp, Menu, X, MessageCircle, CheckCircle } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [regStatus, setRegStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const navigate = useNavigate();

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegStatus('loading');
    setTimeout(() => {
      setRegStatus('success');
      setTimeout(() => navigate('/login?mode=register'), 1500);
    }, 2000);
  };

  const navLinks = [
    { name: 'Instruments', to: '/instruments' },
    { name: 'Platforms', to: '/platforms' },
    { name: 'About', to: '/about' },
    { name: 'Support', to: '/support' },
  ];

  return (
    <div className="bg-onyx text-white font-['Inter'] selection:bg-electricBlue selection:text-white min-h-screen">
      <nav className="fixed top-0 w-full z-[100] glass-dark border-b border-white/5 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 group">
            <span className="group-hover:text-gold transition-colors">ABC</span> 
            <span className="text-gold group-hover:text-white transition-colors">FX</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
            {navLinks.map(link => (
              <Link key={link.name} to={link.to} className="nav-link-hover hover:text-white transition-colors">{link.name}</Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block text-sm font-semibold hover:text-white text-gray-400 transition-colors">Login</Link>
            <Link to="/login?mode=register" className="bg-electricBlue px-6 py-2.5 rounded-full text-sm font-bold blue-glow hover:scale-105 active:scale-95 transition-all">
              Open Account
            </Link>
            <button className="lg:hidden p-2 text-gray-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full glass-dark border-b border-white/10 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map(link => (
                <Link key={link.name} to={link.to} onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest py-2 border-b border-white/5">
                  {link.name}
                </Link>
              ))}
              <Link to="/login" className="text-electricBlue font-bold py-2">Login to Portal</Link>
            </div>
          </div>
        )}
      </nav>

      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-electricBlue/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left z-10">
            <span className="inline-block px-4 py-1.5 rounded-full glass border-gold/20 text-gold font-bold tracking-[0.2em] text-[10px] uppercase mb-6 animate-pulse">
              Institutional Grade Brokerage
            </span>
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-[1.1] mb-8">
              Trade Forex, Gold <br className="hidden md:block" /> & Crypto with <span className="text-electricBlue">ABC FX</span>
            </h1>
            <p className="text-gray-400 text-base md:text-xl mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
              MetaTrader 5 Native | No Re-quotes | Direct Market Access
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
              <Link to="/login?mode=register" className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all">
                <ShieldCheck size={20} /> Start Trading Now
              </Link>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="flex items-center gap-3 glass border-green-500/20 px-10 py-4 rounded-2xl font-bold text-green-400 hover:bg-green-500/5 hover:scale-105 active:scale-95 transition-all">
                <MessageCircle size={20} /> Support Desk
              </a>
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-[40px] border-white/10 relative z-10 hover-lift gold-glow min-h-[500px] flex flex-col justify-center">
            {regStatus === 'success' ? (
              <div className="text-center animate-in zoom-in duration-500">
                <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Account Initialized</h3>
                <p className="text-gray-400">Establishing MT5 manual gateway connection...</p>
              </div>
            ) : (
              <form onSubmit={handleHeroSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold mb-8">Open Live Account</h3>
                <input required type="text" placeholder="Full Legal Name" className="w-full bg-onyx/50 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-gold transition-colors text-white" />
                <div className="grid md:grid-cols-2 gap-5">
                  <input required type="email" placeholder="Institutional Email" className="w-full bg-onyx/50 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-gold transition-colors text-white" />
                  <input required type="text" placeholder="Mobile (+Country)" className="w-full bg-onyx/50 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-gold transition-colors text-white" />
                </div>
                <input required type="text" placeholder="Country of Residence" className="w-full bg-onyx/50 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-gold transition-colors text-white" />
                <button 
                  type="submit" 
                  disabled={regStatus === 'loading'}
                  className="w-full bg-electricBlue p-5 rounded-2xl font-bold blue-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {regStatus === 'loading' ? 'Encrypting Data...' : 'Register & Trade'}
                </button>
                <p className="text-center text-[10px] text-gray-500 mt-4 leading-relaxed uppercase tracking-widest font-black">
                  By registering, you agree to our <Link to="/legal" className="underline hover:text-white">Legal Framework</Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Account Types Section */}
      <section id="accounts" className="py-24 bg-slate/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Execution Accounts</h2>
            <div className="w-20 h-1.5 bg-gold mx-auto rounded-full mb-6" />
            <p className="text-gray-400 text-sm md:text-lg">Tailored for professional capital management.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
            {[
              { name: 'Standard', deposit: '$100', leverage: '1:500', spread: 'Variable', commission: '$0', color: 'white' },
              { name: 'ECN', deposit: '$1,000', leverage: '1:200', spread: 'Raw (0.0)', commission: '$7/lot', color: 'electricBlue', featured: true },
              { name: 'VIP', deposit: '$10,000', leverage: '1:100', spread: 'Raw (0.0)', commission: '$4/lot', color: 'gold' }
            ].map((tier) => (
              <div key={tier.name} className={`
                p-8 md:p-10 rounded-[40px] border transition-all duration-500 relative group hover-lift
                ${tier.featured ? 'border-electricBlue/40 bg-electricBlue/5 blue-glow' : 'border-white/10 glass hover:border-white/30'}
              `}>
                {tier.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-electricBlue text-white text-[10px] font-bold px-6 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Professional Pick</span>
                )}
                <h4 className={`text-3xl font-bold mb-10 text-${tier.name === 'VIP' ? 'gold' : tier.name === 'ECN' ? 'electricBlue' : 'white'}`}>{tier.name}</h4>
                <div className="space-y-6 mb-12">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Min Deposit</span>
                    <span className="font-bold text-lg">{tier.deposit}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Leverage</span>
                    <span className="font-bold text-lg">{tier.leverage}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Spreads</span>
                    <span className="font-bold text-lg">{tier.spread}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Commission</span>
                    <span className="font-bold text-lg">{tier.commission}</span>
                  </div>
                </div>
                <Link to="/login?mode=register" className={`
                  block text-center w-full py-5 rounded-2xl font-bold transition-all shadow-xl
                  ${tier.featured ? 'bg-electricBlue text-white hover:blue-glow' : 'bg-white text-black hover:bg-gray-100'}
                `}>
                  Start Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate/80 border-t border-white/5 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="text-3xl font-bold mb-8 block">ABC <span className="text-gold">FX</span></Link>
              <p className="text-gray-500 text-sm leading-loose max-w-md mb-8">
                Leading the way in institutional manual brokerage. Precision execution, deep liquidity, and a platform built for professionals.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gray-500 hover:text-white hover:scale-110 transition-all"><Globe size={20} /></a>
                <a href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gray-500 hover:text-white hover:scale-110 transition-all"><MessageCircle size={20} /></a>
                <a href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gray-500 hover:text-white hover:scale-110 transition-all"><ShieldCheck size={20} /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-white/50">Market Access</h4>
              <ul className="space-y-4 text-gray-500 text-sm font-medium">
                <li><Link to="/instruments" className="hover:text-gold transition-colors">Forex Majors</Link></li>
                <li><Link to="/instruments" className="hover:text-gold transition-colors">Spot Metals</Link></li>
                <li><Link to="/instruments" className="hover:text-gold transition-colors">Crypto CFDs</Link></li>
                <li><Link to="/platforms" className="hover:text-gold transition-colors">MT5 Platforms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-white/50">Support</h4>
              <ul className="space-y-4 text-gray-500 text-sm font-medium">
                <li><Link to="/support" className="hover:text-gold transition-colors">Help Center</Link></li>
                <li><Link to="/legal" className="hover:text-gold transition-colors">Risk Disclosure</Link></li>
                <li><Link to="/legal" className="hover:text-gold transition-colors">T&C Guide</Link></li>
                <li><Link to="/support" className="hover:text-gold transition-colors">Contact VIP</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 text-center md:text-left">
            <p className="text-gray-600 text-[10px] uppercase font-bold tracking-[0.3em]">© 2023 ABC FX. INSTITUTIONAL LIQUIDITY PROVIDER.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

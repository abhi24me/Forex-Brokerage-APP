
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Monitor, Smartphone, Globe, Download, MonitorCheck, AppWindow } from 'lucide-react';

const PlatformsPage: React.FC = () => {
  const platforms = [
    { name: 'MT5 Windows', icon: Monitor, desc: 'Professional desktop trading suite with advanced charting and manual order management.', link: '#' },
    { name: 'MT5 Android', icon: Smartphone, desc: 'Institutional trading on Android. High-speed manual execution from anywhere.', link: '#' },
    { name: 'MT5 iOS', icon: Smartphone, desc: 'Fully optimized MT5 experience for iPhone and iPad devices.', link: '#' },
    { name: 'MT5 Web', icon: Globe, desc: 'Direct browser access. No installation required. Secure manual trading portal.', link: '#' },
  ];

  return (
    <div className="bg-onyx min-h-screen text-white">
      <nav className="glass border-b border-white/10 px-6 py-6 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> <span className="font-bold">Home</span>
        </Link>
        <div className="text-2xl font-bold tracking-tighter">ABC <span className="text-gold">FX</span></div>
        <Link to="/dashboard" className="bg-electricBlue px-8 py-2.5 rounded-full text-xs font-bold blue-glow hover:scale-105 active:scale-95 transition-all">Open Account</Link>
      </nav>

      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Execution Terminals</h1>
          <p className="text-gray-400 text-lg">Download MetaTrader 5 (MT5) and connect to our high-speed manual servers on any operating system.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {platforms.map((p, i) => (
            <div key={i} className="glass p-12 rounded-[48px] border-white/5 hover:border-gold/30 transition-all group hover-lift relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-gold/5 transition-colors"><p.icon size={160} /></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-10">
                  <div className="p-6 bg-white/5 rounded-3xl text-gold group-hover:scale-110 transition-transform duration-500 shadow-xl border border-white/5">
                    <p.icon size={48} />
                  </div>
                  <button className="bg-electricBlue p-5 rounded-2xl blue-glow hover:scale-110 transition-all active:scale-90">
                    <Download size={24} />
                  </button>
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tight">{p.name}</h3>
                <p className="text-gray-500 leading-relaxed mb-10 font-medium text-sm md:text-base max-w-sm">{p.desc}</p>
                <a href={p.link} className="inline-flex items-center gap-3 text-gold font-black text-xs uppercase tracking-widest hover:underline decoration-gold/30 underline-offset-8">
                  Begin Download <ArrowLeft size={16} className="rotate-180" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformsPage;

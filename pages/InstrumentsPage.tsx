
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ArrowLeft } from 'lucide-react';

const InstrumentsPage: React.FC = () => {
  const [filter, setFilter] = useState('Forex');
  
  const assets = {
    'Forex': [
      { symbol: 'EURUSD', name: 'Euro / US Dollar', spread: '0.1', leverage: '1:500' },
      { symbol: 'GBPUSD', name: 'Pound / US Dollar', spread: '0.3', leverage: '1:500' },
      { symbol: 'USDJPY', name: 'US Dollar / Yen', spread: '0.2', leverage: '1:500' },
      { symbol: 'AUDUSD', name: 'Aus Dollar / US Dollar', spread: '0.4', leverage: '1:500' },
    ],
    'Metals': [
      { symbol: 'XAUUSD', name: 'Gold / US Dollar', spread: '1.2', leverage: '1:100' },
      { symbol: 'XAGUSD', name: 'Silver / US Dollar', spread: '1.5', leverage: '1:100' },
    ],
    'Crypto': [
      { symbol: 'BTCUSD', name: 'Bitcoin / US Dollar', spread: '15.0', leverage: '1:20' },
      { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', spread: '2.5', leverage: '1:20' },
    ]
  };

  return (
    <div className="bg-onyx min-h-screen text-white">
      <nav className="glass border-b border-white/10 px-6 py-6 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Back</span>
        </Link>
        <div className="text-2xl font-bold">ABC <span className="text-gold">FX</span></div>
        <Link to="/dashboard" className="bg-electricBlue px-6 py-2 rounded-full text-xs font-bold">Trade Now</Link>
      </nav>

      <div className="container mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Market Instruments</h1>
          <p className="text-gray-400 max-w-2xl">Access over 100+ global assets with ultra-low spreads and institutional execution on our MT5 servers.</p>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {Object.keys(assets).map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filter === cat ? 'bg-white text-black' : 'glass text-gray-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="glass rounded-[40px] border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <th className="px-8 py-6">Symbol</th>
                  <th className="px-8 py-6">Description</th>
                  <th className="px-8 py-6">Typical Spread</th>
                  <th className="px-8 py-6">Max Leverage</th>
                  <th className="px-8 py-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {assets[filter as keyof typeof assets].map(asset => (
                  <tr key={asset.symbol} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6 font-bold text-white group-hover:text-gold transition-colors">{asset.symbol}</td>
                    <td className="px-8 py-6 text-sm text-gray-400">{asset.name}</td>
                    <td className="px-8 py-6 font-mono text-sm">{asset.spread} pips</td>
                    <td className="px-8 py-6 text-sm">{asset.leverage}</td>
                    <td className="px-8 py-6 text-right">
                      <Link to="/dashboard" className="text-xs font-bold text-electricBlue hover:underline">Trade <ChevronRight size={14} className="inline" /></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentsPage;


import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Shield, Zap, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-onyx min-h-screen text-white">
      <nav className="glass border-b border-white/10 px-6 py-6 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Home</span>
        </Link>
        <div className="text-2xl font-bold">ABC <span className="text-gold">FX</span></div>
        <Link to="/dashboard" className="bg-electricBlue px-6 py-2 rounded-full text-xs font-bold">Join Now</Link>
      </nav>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Engineering the Future of <span className="text-gold">Trading</span></h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Founded by industry veterans, ABC FX was built to provide professional manual traders with the environment they deserve: zero manipulation, lightning execution, and premium security.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Shield, title: 'Security First', desc: 'Tier-1 segregated bank accounts for all client funds.' },
            { icon: Zap, title: 'Ultra Fast', desc: 'Average execution speeds under 20ms on our LD4 servers.' },
            { icon: Target, title: 'Precision', desc: 'Institutional spreads with no markups on our ECN accounts.' },
            { icon: Globe, title: 'Global', desc: 'Operating in 40+ countries with licensed infrastructure.' },
          ].map((item, i) => (
            <div key={i} className="glass p-8 rounded-[32px] border-white/10 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass p-12 rounded-[48px] border-white/10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Our Institutional Roots</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Unlike retail brokers who profit from client losses, ABC FX operates a manual institutional model. We prioritize high-volume traders and professional managers who need a partner they can trust.
            </p>
            <ul className="space-y-4">
              {['No Last Look Execution', 'Deep Liquidity Pool', 'Multi-Asset Support', 'Personal Account Managers'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
             <div className="aspect-square bg-gradient-to-tr from-electricBlue/20 to-gold/20 rounded-full blur-[100px] absolute inset-0" />
             <div className="relative glass border-white/10 p-8 rounded-[40px] text-center">
                <p className="text-6xl font-bold mb-2">$4.2B+</p>
                <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Monthly Trading Volume</p>
                <div className="h-px bg-white/10 my-8" />
                <p className="text-6xl font-bold mb-2">150k+</p>
                <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Active Traders Globally</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

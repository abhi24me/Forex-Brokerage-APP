
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Mail, Phone, MessageCircle } from 'lucide-react';

const SupportPage: React.FC = () => {
  const faqs = [
    { q: 'How long do withdrawals take?', a: 'Withdrawals are processed manually by our desk within 24 hours of request, subject to KYC verification (Section 4.6).' },
    { q: 'What is the minimum deposit?', a: 'Standard accounts start at $100. Institutional ECN accounts require $1,000 minimum.' },
    { q: 'Is my manual data secure?', a: 'We use institutional grade encryption (AES-256) and multi-factor authentication for all portal access.' },
    { q: 'How do I request a leverage change?', a: 'You can request leverage modifications by contacting your account manager or the support desk.' },
  ];

  return (
    <div className="bg-onyx min-h-screen text-white">
      <nav className="glass border-b border-white/10 px-6 py-6 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Home</span>
        </Link>
        <div className="text-2xl font-bold">ABC <span className="text-gold">FX</span></div>
        <Link to="/dashboard" className="bg-electricBlue px-8 py-2.5 rounded-full text-xs font-bold blue-glow hover:scale-105 active:scale-95 transition-all">Login</Link>
      </nav>

      <div className="container mx-auto px-6 py-20 max-w-6xl">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Institutional Support</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Our specialized manual support desk is available to assist with execution and funding inquiries.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="glass p-10 rounded-[40px] border-white/10 text-center hover-lift group">
            <MessageCircle size={40} className="text-green-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-sm uppercase tracking-widest mb-2">WhatsApp VIP</h4>
            <p className="text-[10px] text-gray-500 mb-6 uppercase">Instant Response</p>
            <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] border-b border-green-500/20 pb-1">Start Chat</span>
          </a>
          <div className="glass p-10 rounded-[40px] border-white/10 text-center hover-lift group">
            <MessageSquare size={40} className="text-electricBlue mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-sm uppercase tracking-widest mb-2">Live Portal Chat</h4>
            <p className="text-[10px] text-gray-500 mb-6 uppercase">Active Terminal</p>
            <span className="text-[10px] font-black text-electricBlue uppercase tracking-[0.2em] border-b border-electricBlue/20 pb-1">Enter Chat</span>
          </div>
          <div className="glass p-10 rounded-[40px] border-white/10 text-center hover-lift group">
            <Mail size={40} className="text-gold mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-sm uppercase tracking-widest mb-2">Email Desk</h4>
            <p className="text-[10px] text-gray-500 mb-6 uppercase">2hr Turnaround</p>
            <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em] border-b border-gold/20 pb-1">support@abcfx.com</span>
          </div>
          <div className="glass p-10 rounded-[40px] border-white/10 text-center hover-lift group">
            <Phone size={40} className="text-white mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-sm uppercase tracking-widest mb-2">24/7 Hotline</h4>
            <p className="text-[10px] text-gray-500 mb-6 uppercase">Global Reach</p>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] border-b border-white/20 pb-1">+1 (800) ABC-FX</span>
          </div>
        </div>

        <div className="mb-24">
          <h3 className="text-3xl font-black mb-12 text-center tracking-tight">Technical FAQs</h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="glass p-8 rounded-[32px] border-white/5 hover:border-white/20 transition-all cursor-default">
                <p className="font-bold text-lg mb-3 flex items-start gap-4">
                   <span className="text-gold font-black mt-0.5">Q:</span> {faq.q}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed pl-8 font-medium">
                  <span className="text-electricBlue font-black mr-2">A:</span> {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-10 md:p-16 rounded-[48px] border-white/10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-2 h-full bg-gold" />
           <div className="relative z-10">
             <h3 className="text-3xl font-black mb-10 tracking-tight">Submit Support Ticket</h3>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-onyx border border-white/5 p-5 rounded-2xl focus:border-gold outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Institutional Email</label>
                  <input type="email" placeholder="client@corp.com" className="w-full bg-onyx border border-white/5 p-5 rounded-2xl focus:border-gold outline-none transition-all" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Message Description</label>
                  <textarea placeholder="Describe your inquiry in detail..." className="w-full bg-onyx border border-white/5 p-6 rounded-2xl focus:border-gold outline-none min-h-[180px] transition-all" />
                </div>
                <button className="md:col-span-2 bg-electricBlue py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-sm blue-glow hover:scale-[1.02] active:scale-95 transition-all">Transmit Ticket</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;

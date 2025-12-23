
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, FileText, Scale, UserCheck } from 'lucide-react';

const LegalPage: React.FC = () => {
  return (
    <div className="bg-onyx min-h-screen text-white">
      <nav className="glass border-b border-white/10 px-6 py-6 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Home</span>
        </Link>
        <div className="text-2xl font-bold">ABC <span className="text-gold">FX</span></div>
        <Link to="/dashboard" className="bg-electricBlue px-6 py-2 rounded-full text-xs font-bold">Login</Link>
      </nav>

      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="flex items-center gap-6 mb-12">
           <div className="p-4 bg-gold/10 rounded-2xl">
              <Scale size={48} className="text-gold" />
           </div>
           <div>
              <h1 className="text-4xl font-bold">Legal & Compliance</h1>
              <p className="text-gray-500">ABC FX Regulatory Framework</p>
           </div>
        </div>

        <div className="space-y-12">
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
               <FileText size={18} className="text-electricBlue" /> 1. Terms & Conditions
            </h3>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <p>These terms govern your use of the ABC FX manual brokerage services. By opening an account, you agree to comply with institutional manual trading rules.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
               <ShieldAlert size={18} className="text-gold" /> 2. Risk Disclosure
            </h3>
            <div className="text-red-400/70 text-sm leading-relaxed glass border-red-500/20 p-6 rounded-2xl">
              <p>Trading Forex and CFDs carries a high level of risk. Manual execution requires professional oversight. You may lose your entire deposit.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
               <UserCheck size={18} className="text-electricBlue" /> 3. AML & KYC Policy
            </h3>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <p>ABC FX is committed to the highest standards of Anti-Money Laundering (AML) and Know Your Customer (KYC) compliance. Every client must submit valid ID and Proof of Residency before any withdrawal can be processed.</p>
              <p>We monitor all manual transactions for suspicious activity and report to relevant financial authorities as required.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
               <FileText size={18} className="text-gold" /> 4. Privacy Policy
            </h3>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <p>Your data is encrypted with AES-256 standards. We collect only necessary information for account management and regulatory compliance.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;

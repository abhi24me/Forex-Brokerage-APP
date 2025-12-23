
import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Sidebar, Header, PageContainer } from '../components/Layout';
import { User, Transaction, TransactionStatus, MT5Account } from '../types';
import { GoogleGenAI } from "@google/genai";
import { 
  Copy, 
  Upload, 
  Clock, 
  ArrowRight,
  Shield,
  ShieldCheck,
  ArrowDownCircle,
  ArrowUpCircle,
  Send,
  Sparkles,
  Globe,
  User as UserIcon,
  Phone,
  MapPin,
  CheckCircle2,
  FileText,
  AlertCircle,
  FileUp,
  Loader2
} from 'lucide-react';

const StatusBadge: React.FC<{ status: TransactionStatus }> = ({ status }) => {
  const styles = {
    Pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Approved: 'bg-green-500/10 text-green-500 border-green-500/20',
    Paid: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
  };
  return (
    <span className={`px-3 py-1.5 rounded-full text-[9px] font-black border uppercase tracking-[0.15em] ${styles[status]}`}>
      {status}
    </span>
  );
};

const TradingViewWidget: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = '';
    
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container";
    widgetContainer.style.height = "100%";
    widgetContainer.style.width = "100%";

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.height = "100%";
    widget.style.width = "100%";
    widgetContainer.appendChild(widget);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": "FX:EURUSD",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "calendar": false,
      "support_host": "https://www.tradingview.com"
    });
    
    widgetContainer.appendChild(script);
    container.current.appendChild(widgetContainer);
  }, []);

  return (
    <div className="glass rounded-4xl border-white/10 overflow-hidden h-[450px] md:h-[600px] w-full shadow-2xl relative" ref={container}>
      <div className="absolute inset-0 flex items-center justify-center bg-onyx/50 animate-pulse pointer-events-none -z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Initializing Terminal...</p>
      </div>
    </div>
  );
};

const Overview: React.FC<{ user: User, onMenuClick: () => void }> = ({ user, onMenuClick }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <Header title="Trading Overview" subtitle="Institutional capital summary." onMenuClick={onMenuClick} />
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
      <div className="xl:col-span-2">
        <TradingViewWidget />
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">Manual MT5 Terminals</h4>
          <span className="text-[10px] font-bold text-electricBlue animate-pulse">LIVE CONNECTED</span>
        </div>
        {user.accounts.map(acc => (
          <div key={acc.id} className="glass p-8 rounded-4xl border-white/5 relative overflow-hidden group hover-lift active:scale-[0.98]">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-electricBlue/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="flex justify-between items-start mb-8 relative z-10">
              <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{acc.accountType} Tier</span>
              <span className={`text-[9px] font-black px-3 py-1 rounded-full border ${acc.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                {acc.status.toUpperCase()}
              </span>
            </div>
            <div className="mb-8 relative z-10">
              <p className="text-3xl font-black text-white tracking-tighter mb-1 font-mono">{acc.loginId}</p>
              <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">{acc.server}</p>
            </div>
            <div className="space-y-4 pt-6 border-t border-white/5 relative z-10">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-gray-500 uppercase tracking-widest">Available Equity</span>
                <span className="text-white font-mono">${acc.balance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-gray-500 uppercase tracking-widest">Leverage</span>
                <span className="text-gold">{acc.leverage}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MarketAnalyst: React.FC<{ user: User, onMenuClick: () => void }> = ({ user, onMenuClick }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: `Greetings, ${user.name.split(' ')[0]}. Institutional AI Analyst online. How can I assist with your market strategy today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Professional ABC FX institutional analyst. Focus on Gold, Forex, and major Indices. Concise, data-driven. Always include risk warning. Professional tone.`
        }
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Analysis interrupted." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Analysis engine high demand. Retry soon." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-500">
      <Header title="AI Market Analyst" subtitle="Powered by Gemini Institutional AI." onMenuClick={onMenuClick} />
      <div className="flex-1 glass rounded-t-4xl border-white/5 p-6 md:p-10 overflow-y-auto custom-scrollbar space-y-8" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] md:max-w-[75%] p-6 rounded-3xl text-sm leading-relaxed shadow-xl border ${m.role === 'user' ? 'bg-electricBlue text-white border-white/10 rounded-br-none' : 'glass-dark border-white/5 text-gray-200 rounded-bl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="glass-dark border-white/5 p-5 rounded-2xl flex items-center gap-4">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Processing Signal</span>
            </div>
          </div>
        )}
      </div>
      <div className="glass rounded-b-4xl border-t border-white/5 p-4 md:p-6">
        <div className="relative group flex gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about XAUUSD or institutional trends..."
            className="flex-1 bg-onyx border border-white/5 p-5 rounded-2xl focus:outline-none focus:border-gold transition-all text-sm font-medium text-white"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="w-14 h-14 flex items-center justify-center bg-gold text-black rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const DepositWizard: React.FC<{ user: User, setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>, onMenuClick: () => void }> = ({ user, setTransactions, onMenuClick }) => {
  const [step, setStep] = useState(1);
  const [selectedAcc, setSelectedAcc] = useState<MT5Account | null>(user.accounts[0] || null);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFinish = () => {
    const newTx: Transaction = {
      id: `tx-${Math.random().toString(36).substr(2, 5)}`,
      userId: user.id,
      userEmail: user.email,
      type: 'Deposit',
      amount: parseFloat(amount),
      currency: 'USD',
      method: method,
      status: 'Pending',
      date: new Date().toISOString().replace('T', ' ').substr(0, 16),
      screenshot: screenshot || undefined,
      remarks: `Target: ${selectedAcc?.loginId}`
    };
    setTransactions(prev => [newTx, ...prev]);
    navigate('/dashboard/history');
  };

  return (
    <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
      <Header title="Capital Funding" subtitle="Deposit via institutional gateway." onMenuClick={onMenuClick} />
      <div className="glass p-8 md:p-12 rounded-4xl border-white/5 shadow-2xl">
        {step === 1 && (
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">Destination Account</label>
              <select className="w-full bg-onyx border border-white/10 p-5 rounded-3xl outline-none text-white font-bold" onChange={(e) => setSelectedAcc(user.accounts.find(a => a.id === e.target.value) || null)}>
                {user.accounts.map(a => <option key={a.id} value={a.id}>{a.loginId} ({a.accountType})</option>)}
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">Quantum (USD)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-onyx border border-white/10 p-6 rounded-3xl text-4xl font-black text-white outline-none" />
            </div>
            <button disabled={!amount} onClick={() => setStep(2)} className="w-full bg-electricBlue py-5 rounded-3xl font-black text-xs uppercase tracking-widest blue-glow hover:scale-105 active:scale-95 transition-all">Continue</button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-8">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">Payment Method</label>
            <div className="grid grid-cols-2 gap-4">
              {['Bank Transfer', 'Crypto (USDT)'].map(m => (
                <div key={m} onClick={() => setMethod(m)} className={`p-6 rounded-3xl border cursor-pointer transition-all ${method === m ? 'border-gold bg-gold/5' : 'glass border-white/5 hover:border-white/20'}`}>{m}</div>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 py-5 glass rounded-3xl font-black text-xs">Back</button>
              <button disabled={!method} onClick={() => setStep(3)} className="flex-1 bg-white text-black py-5 rounded-3xl font-black text-xs">Next</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-8">
             <div onClick={() => setScreenshot('https://picsum.photos/seed/deposit/400/600')} className="border-2 border-dashed border-white/10 p-12 text-center rounded-4xl cursor-pointer hover:border-gold transition-colors">
               {screenshot ? '✓ Receipt Attached' : 'Upload Payment Screenshot'}
             </div>
             <button disabled={!screenshot} onClick={handleFinish} className="w-full bg-electricBlue py-5 rounded-3xl font-black text-xs uppercase tracking-widest">Submit Request</button>
          </div>
        )}
      </div>
    </div>
  );
};

const WithdrawalWizard: React.FC<{ user: User, setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>, onMenuClick: () => void }> = ({ user, setTransactions, onMenuClick }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleFinish = () => {
    const newTx: Transaction = {
      id: `tx-${Math.random().toString(36).substr(2, 5)}`,
      userId: user.id,
      userEmail: user.email,
      type: 'Withdrawal',
      amount: parseFloat(amount),
      currency: 'USD',
      method: method,
      status: 'Pending',
      date: new Date().toISOString().replace('T', ' ').substr(0, 16),
      remarks: `Dest: ${address}`
    };
    setTransactions(prev => [newTx, ...prev]);
    navigate('/dashboard/history');
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <Header title="Capital Payout" subtitle="Secure manual withdrawal protocol." onMenuClick={onMenuClick} />
      <div className="glass p-8 md:p-12 rounded-4xl border-white/5 shadow-2xl space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">Amount (USD)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-onyx border border-white/10 p-6 rounded-3xl text-3xl font-black text-white outline-none" />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">Payment Details</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Bank details or Wallet address..." className="w-full bg-onyx border border-white/10 p-6 rounded-3xl h-32 outline-none focus:border-gold text-white font-medium" />
        </div>
        <button disabled={!amount || !address} onClick={handleFinish} className="w-full bg-gold text-black py-5 rounded-3xl font-black text-xs uppercase tracking-widest gold-glow hover:scale-105 active:scale-95 transition-all">Execute Payout</button>
      </div>
    </div>
  );
};

const KYCModule: React.FC<{ user: User, setUser: (u: User) => void, onMenuClick: () => void }> = ({ user, setUser, onMenuClick }) => {
  const [uploadStates, setUploadStates] = useState<{id: string, por: string}>({ id: 'none', por: 'none' });
  const [fileNames, setFileNames] = useState<{id?: string, por?: string}>({});
  
  const idInputRef = useRef<HTMLInputElement>(null);
  const porInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (type: 'id' | 'por', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileNames(prev => ({ ...prev, [type]: file.name }));
      setUploadStates(prev => ({ ...prev, [type]: 'uploading' }));
      // Simulate real upload progress
      setTimeout(() => {
        setUploadStates(prev => ({ ...prev, [type]: 'done' }));
      }, 2500);
    }
  };

  const isComplete = uploadStates.id === 'done' && uploadStates.por === 'done';

  const handleSubmitKYC = () => {
    setUser({ ...user, kycStatus: 'Pending' });
    alert('Documents submitted successfully. Institutional review typically completes within 24 business hours.');
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <Header title="Identity Compliance" subtitle="KYC Verification & Safety protocol." onMenuClick={onMenuClick} />
      
      {/* Hidden Inputs */}
      <input type="file" ref={idInputRef} className="hidden" accept="image/*,.pdf" onChange={(e) => handleFileChange('id', e)} />
      <input type="file" ref={porInputRef} className="hidden" accept="image/*,.pdf" onChange={(e) => handleFileChange('por', e)} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 glass p-10 rounded-4xl text-center border-white/5 relative overflow-hidden h-fit">
          <div className="absolute top-0 left-0 w-full h-1 bg-electricBlue" />
          <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-electricBlue flex items-center justify-center text-4xl font-black bg-electricBlue/5 shadow-2xl">{user.name.charAt(0)}</div>
          <h3 className="text-2xl font-black tracking-tight">{user.name}</h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8">{user.email}</p>
          
          <div className={`px-6 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${
            user.kycStatus === 'Verified' ? 'border-green-500/20 text-green-500 bg-green-500/10' : 
            user.kycStatus === 'Pending' ? 'border-amber-500/20 text-amber-500 bg-amber-500/10 animate-pulse' : 
            'border-red-500/20 text-red-500 bg-red-500/10'
          }`}>
            <Shield size={12} /> {user.kycStatus} Account
          </div>
        </div>

        <div className="lg:col-span-2 glass p-10 rounded-4xl border-white/5 space-y-10">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-black tracking-tight">Required Documentation</h4>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Manual Execution Desk Review</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             {/* ID Card / Passport Block */}
             <div className={`p-8 border rounded-[32px] glass-dark transition-all group relative ${uploadStates.id === 'done' ? 'border-green-500/20' : 'border-white/5 hover:border-gold/30'}`}>
                {uploadStates.id === 'done' && <CheckCircle2 className="absolute top-6 right-6 text-green-500 animate-in zoom-in" size={24} />}
                
                <FileText size={32} className={`mb-6 transition-colors ${uploadStates.id === 'done' ? 'text-green-500' : 'text-gray-600 group-hover:text-gold'}`} />
                <p className="font-bold text-base mb-2">Government ID</p>
                <p className="text-[11px] text-gray-500 mb-8 leading-relaxed">Passport, National ID, or Driving License. High resolution scan required.</p>
                
                {uploadStates.id === 'uploading' && (
                  <div className="mb-6 space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-electricBlue tracking-widest">
                      <span>Encrypting...</span>
                      <span>45%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-electricBlue w-[45%] animate-pulse" />
                    </div>
                  </div>
                )}

                {fileNames.id && uploadStates.id === 'done' && (
                  <p className="text-[9px] font-mono text-green-500/60 mb-6 truncate max-w-full">File: {fileNames.id}</p>
                )}

                <button 
                  onClick={() => idInputRef.current?.click()}
                  disabled={uploadStates.id !== 'none' || user.kycStatus !== 'Unverified'}
                  className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    uploadStates.id === 'done' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                    uploadStates.id === 'uploading' ? 'bg-white/5 text-gray-500 cursor-wait' : 
                    user.kycStatus !== 'Unverified' ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-white text-black hover:scale-105 active:scale-95'
                  }`}
                >
                  {uploadStates.id === 'uploading' ? <Loader2 size={14} className="animate-spin" /> : <FileUp size={14} />}
                  {uploadStates.id === 'uploading' ? 'Processing...' : uploadStates.id === 'done' ? 'Proof Ready' : 'Select Document'}
                </button>
             </div>

             {/* Proof of Address Block */}
             <div className={`p-8 border rounded-[32px] glass-dark transition-all group relative ${uploadStates.por === 'done' ? 'border-green-500/20' : 'border-white/5 hover:border-gold/30'}`}>
                {uploadStates.por === 'done' && <CheckCircle2 className="absolute top-6 right-6 text-green-500 animate-in zoom-in" size={24} />}
                <MapPin size={32} className={`mb-6 transition-colors ${uploadStates.por === 'done' ? 'text-green-500' : 'text-gray-600 group-hover:text-gold'}`} />
                <p className="font-bold text-base mb-2">Proof of Residency</p>
                <p className="text-[11px] text-gray-500 mb-8 leading-relaxed">Utility Bill or Bank Statement from the last 3 months showing address.</p>
                
                {uploadStates.por === 'uploading' && (
                  <div className="mb-6 space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-electricBlue tracking-widest">
                      <span>Uploading...</span>
                      <span>82%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-electricBlue w-[82%] animate-pulse" />
                    </div>
                  </div>
                )}

                {fileNames.por && uploadStates.por === 'done' && (
                  <p className="text-[9px] font-mono text-green-500/60 mb-6 truncate max-w-full">File: {fileNames.por}</p>
                )}

                <button 
                  onClick={() => porInputRef.current?.click()}
                  disabled={uploadStates.por !== 'none' || user.kycStatus !== 'Unverified'}
                  className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    uploadStates.por === 'done' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                    uploadStates.por === 'uploading' ? 'bg-white/5 text-gray-500 cursor-wait' : 
                    user.kycStatus !== 'Unverified' ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-white text-black hover:scale-105 active:scale-95'
                  }`}
                >
                  {uploadStates.por === 'uploading' ? <Loader2 size={14} className="animate-spin" /> : <FileUp size={14} />}
                  {uploadStates.por === 'uploading' ? 'Transmitting...' : uploadStates.por === 'done' ? 'Proof Ready' : 'Select Proof'}
                </button>
             </div>
          </div>

          <div className="p-6 bg-electricBlue/5 border border-electricBlue/10 rounded-[28px] flex items-start gap-4">
            <AlertCircle className="text-electricBlue shrink-0 mt-1" size={20} />
            <div>
              <p className="text-xs font-bold text-white mb-1">Validation Notice</p>
              <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider">KYC Verification is required for all institutional capital movements. Our manual desk verifies submissions against international AML standards.</p>
            </div>
          </div>

          {isComplete && user.kycStatus === 'Unverified' && (
            <button 
              onClick={handleSubmitKYC}
              className="w-full bg-gold py-5 rounded-[28px] font-black uppercase tracking-[0.2em] text-xs text-black gold-glow hover:scale-[1.02] active:scale-95 transition-all animate-in slide-in-from-bottom-4 shadow-2xl"
            >
              Confirm Document Submission
            </button>
          )}

          {user.kycStatus === 'Pending' && (
            <div className="p-8 glass-dark border border-amber-500/20 rounded-[32px] text-center shadow-2xl animate-in zoom-in">
               <Clock className="mx-auto text-amber-500 mb-4 animate-spin-slow" size={32} />
               <p className="text-amber-500 font-black uppercase tracking-widest text-[11px]">Audit in Progress</p>
               <p className="text-gray-500 text-[10px] mt-2 leading-relaxed">Your documents are being reviewed by our Compliance Desk. This process usually completes in 12-24 hours.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HistoryTable: React.FC<{ transactions: Transaction[], onMenuClick: () => void }> = ({ transactions, onMenuClick }) => (
  <div className="animate-in fade-in duration-500">
    <Header title="Transaction Ledger" subtitle="Detailed capital movement history." onMenuClick={onMenuClick} />
    <div className="glass rounded-4xl border-white/10 overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-10 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Event</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Execution Date</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Capital (USD)</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Processor</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {transactions.map(tx => (
              <tr key={tx.id} className="hover:bg-white/[0.03] transition-colors group">
                <td className="px-10 py-7">
                  <div className={`flex items-center gap-3 text-xs font-black tracking-wider ${tx.type === 'Deposit' ? 'text-blue-400' : 'text-orange-400'}`}>
                    {tx.type === 'Deposit' ? <ArrowDownCircle size={16} /> : <ArrowUpCircle size={16} />}
                    {tx.type.toUpperCase()}
                  </div>
                </td>
                <td className="px-10 py-7 text-[11px] text-gray-500 font-mono tracking-tighter">{tx.date}</td>
                <td className="px-10 py-7 font-black text-base text-white font-mono tracking-tighter">${tx.amount.toLocaleString()}</td>
                <td className="px-10 py-7 text-xs font-bold text-gray-400 uppercase tracking-widest">{tx.method}</td>
                <td className="px-10 py-7 text-right"><StatusBadge status={tx.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

interface ClientDashboardProps {
  user: User;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, transactions, setTransactions, setUser }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar type="client" isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <PageContainer>
        <Routes>
          <Route index element={<Overview user={user} onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="analyst" element={<MarketAnalyst user={user} onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="deposit" element={<DepositWizard user={user} setTransactions={setTransactions} onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="withdraw" element={<WithdrawalWizard user={user} setTransactions={setTransactions} onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="history" element={<HistoryTable transactions={transactions} onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="profile" element={<KYCModule user={user} setUser={setUser} onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="*" element={<Overview user={user} onMenuClick={() => setIsSidebarOpen(true)} />} />
        </Routes>
      </PageContainer>
    </>
  );
};

export default ClientDashboard;

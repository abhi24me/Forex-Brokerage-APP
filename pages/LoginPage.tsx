
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Shield, Mail, Lock, UserPlus, LogIn, ChevronLeft, User, KeyRound, CheckCircle2 } from 'lucide-react';

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const [isLogin, setIsLogin] = useState(mode !== 'register');
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const navigate = useNavigate();
  
  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsLogin(mode !== 'register');
    setShowOTP(false);
    setRegSuccess(false);
    setOtp('');
  }, [mode]);

  // Auto-focus the OTP input when it appears
  useEffect(() => {
    if (showOTP && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [showOTP]);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate OTP delivery delay
    setTimeout(() => {
      setLoading(false);
      setShowOTP(true);
    }, 1200);
  };

  const performVerification = (currentOtp: string) => {
    if (currentOtp.length !== 6 || loading) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!isLogin) {
        // Registration Flow: 
        setOtp('');
        setRegSuccess(true);
        setShowOTP(false);
        setIsLogin(true);
      } else {
        // Login Flow: Go to Dashboard
        onLogin();
        navigate('/dashboard');
      }
    }, 1500);
  };

  const handleVerifyFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(otp);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setOtp(val);
    
    // Auto-trigger verification if 6 digits are reached
    if (val.length === 6) {
      performVerification(val);
    }
  };

  return (
    <div className="min-h-screen bg-onyx flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-electricBlue/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />

      <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-10 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Exchange</span>
        </Link>

        <div key={isLogin ? 'login-card' : 'register-card'} className="glass p-10 md:p-12 rounded-[48px] border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black mb-2 tracking-tighter">
              ABC <span className="text-gold">FX</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              {showOTP ? 'Two-Factor Verification' : isLogin ? 'Institutional Terminal Access' : 'Create Trading Account'}
            </p>
          </div>

          {regSuccess && (
            <div className="mb-8 p-6 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center gap-4 animate-in slide-in-from-top-4">
              <CheckCircle2 className="text-green-500 shrink-0" size={24} />
              <div>
                <p className="text-xs font-black text-white uppercase tracking-wider">Registration Verified</p>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Account is now pending activation. Please login to enter terminal.</p>
              </div>
            </div>
          )}

          {!showOTP ? (
            <form onSubmit={handleInitialSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2 animate-in slide-in-from-top-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input key="name-field" required type="text" placeholder="John Sterling" className="w-full bg-onyx/50 border border-white/5 p-4 pl-12 rounded-2xl focus:border-gold outline-none transition-all text-sm font-medium text-white" />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input key="email-field" required type="email" placeholder="alex@sterling.com" className="w-full bg-onyx/50 border border-white/5 p-4 pl-12 rounded-2xl focus:border-gold outline-none transition-all text-sm font-medium text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input key="pass-field" required type="password" placeholder="••••••••" className="w-full bg-onyx/50 border border-white/5 p-4 pl-12 rounded-2xl focus:border-gold outline-none transition-all text-sm font-medium text-white" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-electricBlue py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs blue-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Enter Terminal' : 'Sign Up Now'}
                    {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyFormSubmit} className="space-y-6 animate-in zoom-in-95">
              <div className="text-center mb-6">
                <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-widest font-bold">Verification code transmitted to your email.</p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1 text-center block">Security OTP</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    ref={otpInputRef}
                    key="otp-field"
                    required 
                    type="text" 
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="0 0 0 0 0 0" 
                    className="w-full bg-onyx/50 border border-white/5 p-4 pl-12 rounded-2xl focus:border-gold outline-none transition-all text-xl font-black text-center text-white tracking-[0.5em]" 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading || otp.length < 6}
                className="w-full bg-gold text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs gold-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : 'Complete Verification'}
              </button>
              <button type="button" onClick={() => setShowOTP(false)} className="w-full text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors tracking-widest">Resend Code</button>
            </form>
          )}

          {!showOTP && (
            <div className="mt-10 text-center">
              <button 
                onClick={() => {
                  setIsLogin(!isLogin); 
                  setRegSuccess(false);
                  setOtp('');
                }}
                className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gold transition-colors"
              >
                {isLogin ? "Don't have an account? Create One" : "Already registered? Login Here"}
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-[9px] font-black text-gray-600 uppercase tracking-widest">
          <Shield size={12} /> Institutional OTP Security
          <span className="w-1 h-1 bg-gray-800 rounded-full" />
          v2.6.0 STABLE
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

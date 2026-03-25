import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-void pt-[120px] pb-24 px-6 flex items-center justify-center overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-phosphor/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="bg-[#0b0f16] border border-[#1E2D4A] rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-md">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-display text-[28px] md:text-[32px] text-white font-black uppercase tracking-tight mb-2" style={{ transform: 'scaleX(1.3)', transformOrigin: 'center' }}>
              {isLogin ? 'Access' : 'Register'}
            </h2>
            <p className="text-[#64748B] font-mono text-[13px] uppercase tracking-widest">
              {isLogin ? 'Welcome back to analyzer' : 'Start your genomic journey'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/'); }}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-[#64748B] uppercase tracking-widest mb-2 ml-1">First Name</label>
                  <input type="text" className="w-full bg-void border border-[#1E2D4A] rounded-lg px-4 py-3 text-white text-[13px] focus:border-phosphor transition-colors outline-none" required />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-[#64748B] uppercase tracking-widest mb-2 ml-1">Last Name</label>
                  <input type="text" className="w-full bg-void border border-[#1E2D4A] rounded-lg px-4 py-3 text-white text-[13px] focus:border-phosphor transition-colors outline-none" required />
                </div>
              </div>
            )}
            
            <div>
              <label className="block font-mono text-[10px] text-[#64748B] uppercase tracking-widest mb-2 ml-1">Institution Email</label>
              <input type="email" className="w-full bg-void border border-[#1E2D4A] rounded-lg px-4 py-3 text-white text-[13px] focus:border-phosphor transition-colors outline-none" placeholder="jane@institute.edu" required />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block font-mono text-[10px] text-[#64748B] uppercase tracking-widest">Password</label>
                {isLogin && <button type="button" className="text-[10px] text-phosphor/70 hover:text-phosphor transition-colors uppercase tracking-widest">Forgot?</button>}
              </div>
              <input type="password" className="w-full bg-void border border-[#1E2D4A] rounded-lg px-4 py-3 text-white text-[13px] focus:border-phosphor transition-colors outline-none" placeholder="••••••••" required />
            </div>

            <button type="submit" className="w-full py-4 bg-phosphor hover:bg-white text-void font-bold text-[13px] uppercase tracking-[0.2em] rounded-lg transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(0,214,143,0.2)]">
              {isLogin ? 'Log In' : 'Create Account'} &rarr;
            </button>
          </form>

          {/* Social Auth */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-[#1E2D4A]" />
              <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-widest">or continue with</span>
              <div className="h-px flex-1 bg-[#1E2D4A]" />
            </div>
            
            <button className="w-full py-3 bg-transparent border border-[#1E2D4A] hover:border-phosphor/30 rounded-lg flex items-center justify-center gap-3 group transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.94.46 3.77 1.18 5.07l3.66-2.98z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-[12px] font-mono text-white group-hover:text-phosphor transition-colors">Enterprise Single Sign-On</span>
            </button>
          </div>

          <div className="mt-10 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[11px] font-mono text-[#64748B] uppercase tracking-widest hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

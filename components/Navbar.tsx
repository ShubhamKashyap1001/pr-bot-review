import React from 'react';
import { Github, ChevronRight, Terminal, Server, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f8fafc] font-sans selection:bg-white/10">
      {/* Premium Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-350 mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="font-bold tracking-tighter text-xl">PR-Bot</span>
            <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-slate-500 uppercase tracking-widest">
              {/* <a href="#" className="hover:text-white transition-colors">Platform</a>
              <a href="#" className="hover:text-white transition-colors">Enterprise</a> */}
              {/* <a href="#" className="hover:text-white transition-colors">Docs</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a> */}
            </div>
          </div>
          <div className="flex items-center gap-6">
            {/* <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Sign in</a> */}
            {/* <button className="px-5 py-2 rounded-full bg-white text-black text-[13px] font-bold hover:bg-slate-200 transition-all">
              Install PR-Bot
            </button> */}
          </div>
        </div>
      </nav>

      
      <section className="pt-48 pb-32 px-8 max-w-350 mx-auto">
        <div className="max-w-4xl">
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight text-white mb-10 leading-[0.9]">
            Pull request <br />
            reviews — done.
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed mb-12">
            PR-Bot is the standard automated code review system for high-velocity engineering teams.
          </p>
          <div className="flex items-center gap-8">
            <button className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-lg">
              <a href="https://github.com/apps/v0-pr-bot-reviewer">Install PR-Bot</a>
              
            </button>
            <button className="text-lg font-medium text-slate-400 hover:text-white transition-colors border-b border-slate-800 pb-1">
              View example review
            </button>
          </div>
        </div>
      </section>

      

      {/* Product Proof: Large & Calm */}
      <section className="py-12 bg-[#080808]">
        <div className="max-w-300 mx-auto px-8">
          <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-white/[0.03] flex items-center justify-between bg-white/[0.01]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600" />
                <div className="w-3 h-3 rounded-full bg-green-600" />
                <div className="w-3 h-3 rounded-full bg-blue-600" />
              </div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">engine/auth.go</span>
              <div className="w-10" />
            </div>
            <div className="p-12 font-mono text-[15px] leading-relaxed">
              <div className="text-slate-600 mb-2">32  func Authorize(u *User) error {'{'}</div>
              <div className="text-slate-600 mb-2">33    if u.Role == "" {'{'}</div>
              <div className="flex gap-6 bg-white/[0.02] border-l border-white/20 -mx-12 px-12 py-8 my-6">
                <div className="flex flex-col gap-4 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                      <Terminal size={14} className="text-black" />
                    </div>
                    <span className="font-bold text-white tracking-tight">PR-Bot</span>
                    <span className="text-[10px] text-slate-500 font-sans tracking-widest">SYSTEM</span>
                  </div>
                  <p className="text-slate-300 font-sans text-lg">
                    Potential nil pointer dereference. Ensure <code className="text-white">u</code> is initialized before checking <code className="text-white">u.Role</code>.
                  </p>
                  <div className="flex gap-4 font-sans text-sm">
                    <span className="text-slate-500">Security Critical</span>
                    {/* <span className="text-white underline underline-offset-4 cursor-pointer">Fix automatically</span> */}
                  </div>
                </div>
              </div>
              <div className="text-slate-600">34      return errors.New("unauthorized")</div>
              <div className="text-slate-600">35    {'}'}</div>
            </div>
          </div>
        </div>
      </section>

      

      
      

      {/* Final CTA */}
      
      {/* Footer */}
      <footer className="py-20 border-t border-white/3 px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <span className="font-bold tracking-tighter text-2xl">PR-Bot</span>
            <p className="text-slate-600 mt-4 max-w-xs text-sm">
              The standard for automated code quality.
              Built for the next generation of software engineering.
            </p>
          </div>
          {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
            <div className="flex flex-col gap-4 text-sm text-slate-500">
              <span className="text-white font-bold mb-2">Product</span>
              <a href="#" className="hover:text-white transition-colors">Changelog</a>
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
            <div className="flex flex-col gap-4 text-sm text-slate-500">
              <span className="text-white font-bold mb-2">Company</span>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div> */}
        </div>
      </footer>
    </div>
  );
}
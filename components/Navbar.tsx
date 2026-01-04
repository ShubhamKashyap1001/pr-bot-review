"use client";

import React, { useState, useRef, useEffect } from "react";
import { Github, ChevronRight, Terminal, Server, Shield, Square } from "lucide-react";

export default function HomePage() {
  const [showVideoCard, setShowVideoCard] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isAdmin = true; // TEMP — replace later if needed

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-video", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setVideoUrl(data.url);
  };

  useEffect(() => {
    if (showVideoCard && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [showVideoCard, videoUrl]);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f8fafc] font-sans selection:bg-white/10">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-350 mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="font-bold tracking-tighter text-xl">PR-Bot</span>
          </div>
          <div className="flex items-center gap-6"></div>
        </div>
      </nav>

      {/* ================================================================ */}
      {/* 🚀 SHOW ONLY VIDEO SECTION WHEN BUTTON CLICKED */}
      {/* ================================================================ */}
      {showVideoCard ? (
        <section className="pt-40 pb-24 px-8 max-w-350 mx-auto">
          <div className="max-w-4xl">

            <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-8 shadow-xl">

              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">PR-Bot Review Demo</h3>

                <button
                  onClick={() => setShowVideoCard(false)}
                  className="w-9 h-9 rounded-md border border-white/20 flex items-center justify-center hover:bg-white/10"
                >
                  <Square size={18} className="text-white" />
                </button>
              </div>

              {/* PERMANENT VIDEO BOX */}
              <div
                className="w-full rounded-xl border border-white/10 overflow-hidden mb-6 cursor-pointer bg-black/40 flex items-center justify-center"
                style={{ height: "33vh" }}
                onClick={handleVideoClick}
              >
                {videoUrl ? (
                  <video ref={videoRef} className="w-full h-full object-cover">
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <span className="text-slate-500 text-sm">
                    No video uploaded yet — Upload a demo to help users understand how PR-Bot works.
                  </span>
                )}
              </div>

              {/* ADMIN UPLOAD (ALWAYS VISIBLE) */}
              {isAdmin && (
                <div className="mb-6">
                  <p className="text-slate-400 text-sm mb-2">
                    Admin: Upload PR-Bot demo video
                  </p>

                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={handleUpload}
                    className="text-sm"
                  />
                </div>
              )}

              <p className="text-slate-400 leading-relaxed text-lg">
                This video helps developers understand how PR-Bot analyzes pull requests,
                detects potential issues, and generates AI-assisted review feedback.
                Click the video to play or pause when uploaded.
              </p>
            </div>
          </div>
        </section>
      ) : (
      <>
        {/* ================================================================ */}
        {/* 🌟 NORMAL PAGE (DEFAULT VIEW) */}
        {/* ================================================================ */}

        {/* HERO */}
        <section className="pt-48 pb-32 px-8 max-w-350 mx-auto">
          <div className="max-w-4xl">

            <h1 className="text-7xl md:text-9xl font-bold tracking-tight text-white mb-10 leading-[0.9]">
              Pull request <br /> reviews — done.
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed mb-12">
              PR-Bot is the standard automated code review system for high-velocity engineering teams.
            </p>

            {/* CTA ROW */}
            <div className="flex items-center gap-8">

              <button className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-lg">
                <a href="https://github.com/apps/v0-pr-bot-reviewer">
                  Install PR-Bot
                </a>
              </button>

              <button className="text-lg font-medium text-slate-400 hover:text-white transition-colors border-b border-slate-800 pb-1">
                View example review
              </button>

              <button
                onClick={() => setShowVideoCard(true)}
                className="text-lg font-medium text-slate-400 hover:text-white transition-colors border-b border-slate-800 pb-1"
              >
                Watch how PR-Bot works
              </button>
            </div>
          </div>
        </section>

        {/* PRODUCT PROOF */}
        <section className="py-12 bg-[#080808]">
          <div className="max-w-300 mx-auto px-8">
            <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-white/[0.03] flex items-center justify-between bg-white/[0.01]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600" />
                  <div className="w-3 h-3 rounded-full bg-green-600" />
                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                </div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                  engine/auth.go
                </span>
                <div className="w-10" />
              </div>

              <div className="p-12 font-mono text-[15px] leading-relaxed">
                <div className="text-slate-600 mb-2">
                  32&nbsp;&nbsp;func Authorize(u *User) error {'{'}
                </div>
                <div className="text-slate-600 mb-2">
                  33&nbsp;&nbsp;&nbsp;if u.Role == "" {'{'}
                </div>

                <div className="flex gap-6 bg-white/[0.02] border-l border-white/20 -mx-12 px-12 py-8 my-6">
                  <div className="flex flex-col gap-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                        <Terminal size={14} className="text-black" />
                      </div>
                      <span className="font-bold text-white tracking-tight">
                        PR-Bot
                      </span>
                      <span className="text-[10px] text-slate-500 font-sans tracking-widest">
                        SYSTEM
                      </span>
                    </div>

                    <p className="text-slate-300 font-sans text-lg">
                      Potential nil pointer dereference. Ensure{" "}
                      <code className="text-white">u</code> is initialized before
                      checking <code className="text-white">u.Role</code>.
                    </p>

                    <div className="flex gap-4 font-sans text-sm">
                      <span className="text-slate-500">Security Critical</span>
                    </div>
                  </div>
                </div>

                <div className="text-slate-600">
                  34&nbsp;&nbsp;&nbsp;return errors.New("unauthorized")
                </div>
                <div className="text-slate-600">
                  35&nbsp;&nbsp;{'}'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 border-t border-white/3 px-8">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <span className="font-bold tracking-tighter text-2xl">
                PR-Bot
              </span>
              <p className="text-slate-600 mt-4 max-w-xs text-sm">
                The standard for automated code quality. Built for the next generation of software engineering.
              </p>
            </div>
          </div>
        </footer>
      </>
      )}
    </div>
  );
}

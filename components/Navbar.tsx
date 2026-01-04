"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Square } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const [showVideoCard, setShowVideoCard] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isAdmin = true;

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
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-3 md:px-6 h-16 md:h-20 flex items-center justify-between">

          {/* LEFT — LOGO + TITLE */}
          <div className="flex items-center -ml-30 gap-2 md:gap-3">
            {/* 🔹 LOGO — place file in /public/pr-bot-logo.png */}
            <Image
              src="/pr-bot-review-logo1.jpeg"
              alt="PR Bot Logo"
              width={28}
              height={28}
              className="rounded-md"
            />

            <span className="font-bold tracking-tight text-lg md:text-xl">
              PR-Bot
            </span>
          </div>

          <div className="flex items-center gap-4 md:gap-6" />
        </div>
      </nav>

      {showVideoCard ? (
        <section className="pt-28 md:pt-40 pb-16 px-3 md:px-6 max-w-[1200px] mx-auto">
          <div className="max-w-4xl">

            <div className="rounded-xl border border-white/15 bg-[#0b0b0b] p-6 md:p-8 shadow-2xl">

              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold">PR-Bot Review Demo</h3>

                <button
                  onClick={() => setShowVideoCard(false)}
                  className="w-9 h-9 rounded-md border border-white/20 flex items-center justify-center hover:bg-white/10"
                >
                  <Square size={18} className="text-white" />
                </button>
              </div>

              {/* VIDEO BOX */}
              <div
                className="w-full rounded-lg border border-white/15 shadow-lg overflow-hidden mb-6 cursor-pointer bg-black/40 flex items-center justify-center"
                style={{ height: "32vh" }}
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

              {/* ADMIN UPLOAD */}
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

              <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                This video helps developers understand how PR-Bot analyzes pull requests and
                generates AI-assisted review feedback. Tap the video to play or pause.
              </p>
            </div>
          </div>
        </section>
      ) : (
      <>
        {/* HERO */}
        <section className="pt-25 md:pt-48 pb-20 md:pb-32 px-3 md:px-6  max-w-[1200px] mx-auto">
          <div className="max-w-4xl">

            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6 md:mb-10 leading-[0.95]">
              Pull request <br /> reviews — done.
            </h1>

            <p className="text-lg md:text-2xl text-slate-400 max-w-2xl leading-relaxed mb-10 md:mb-12">
              PR-Bot is the standard automated code review system for high-velocity engineering teams.
            </p>

            {/* CTA ROW — tighter margins on mobile */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-8">

              {/* RECTANGLE BUTTON (NOT ROUND PILL) */}
              <button className="px-6 py-3 rounded-lg bg-white text-black font-semibold text-base md:text-lg shadow-md hover:shadow-xl transition">
                <a href="https://github.com/apps/v0-pr-bot-reviewer">
                  Install PR-Bot
                </a>
              </button>

              <button className="text-base md:text-lg font-medium text-slate-400 hover:text-white transition border-b border-slate-700">
                View example review
              </button>

              <button
                onClick={() => setShowVideoCard(true)}
                className="text-base md:text-lg font-medium text-slate-400 hover:text-white transition border-b border-slate-700"
              >
                Watch how PR-Bot works
              </button>
            </div>
          </div>
        </section>

        {/* PRODUCT PROOF */}
        <section className="py-10 md:py-12 bg-[#080808]">
          <div className="max-w-[1200px] mx-auto px-3 md:px-6">

            <div className="rounded-xl border border-white/12 bg-[#0c0c0c] shadow-2xl overflow-hidden">

              <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
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

              <div className="p-8 md:p-12 font-mono text-[13px] md:text-[15px] leading-relaxed">

                <div className="text-slate-600 mb-2">
                  32&nbsp;&nbsp;func Authorize(u *User) error {'{'}
                </div>

                <div className="flex gap-6 bg-white/[0.03] border-l border-white/30 -mx-8 md:-mx-12 px-8 md:px-12 py-6 md:py-8 my-6 rounded-r-lg shadow-inner">

                  <div className="flex flex-col gap-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                        <Terminal size={14} className="text-black" />
                      </div>

                      <span className="font-bold text-white tracking-tight">PR-Bot</span>
                      <span className="text-[10px] text-slate-500 tracking-widest">SYSTEM</span>
                    </div>

                    <p className="text-slate-300 text-base md:text-lg">
                      Potential nil pointer dereference. Ensure{" "}
                      <code className="text-white">u</code> is initialized before checking{" "}
                      <code className="text-white">u.Role</code>.
                    </p>

                    <span className="text-slate-500 text-sm">Security Critical</span>
                  </div>
                </div>

                <div className="text-slate-600">
                  34&nbsp;&nbsp;return errors.New("unauthorized")
                </div>
                <div className="text-slate-600">
                  35&nbsp;&nbsp;{'}'}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-14 md:py-20 border-t border-white/10 px-3 md:px-6">
          <div className="max-w-[1200px] mx-auto">
            <span className="font-bold tracking-tight text-xl">PR-Bot</span>
            <p className="text-slate-600 mt-3 max-w-xs text-sm">
              The standard for automated code quality. Built for the next generation of software engineering.
            </p>
          </div>
        </footer>
      </>
      )}
    </div>
  );
}

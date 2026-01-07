"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const [showVideoCard, setShowVideoCard] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Local static video stored in /public/uploads
  const DEFAULT_VIDEO = "/uploads/pr-bot-demo.mp4";

  // Load stored theme
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") setTheme("dark");
  }, []);

  // Apply theme
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Load demo video on mount
  useEffect(() => {
    setVideoUrl(DEFAULT_VIDEO);
  }, []);

  // Auto-play when card opens
  useEffect(() => {
    if (showVideoCard && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [showVideoCard, videoUrl]);

  // Click to pause / resume
  const handleVideoClick = () => {
    if (!videoRef.current) return;
    videoRef.current.paused
      ? videoRef.current.play()
      : videoRef.current.pause();
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-[#050505] text-[#f8fafc]"
      }`}
    >
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
          theme === "light"
            ? "bg-white/90 border-gray-200"
            : "bg-[#050505]/80 border-white/10"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-3 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/social.png"
              alt="PR Bot Logo"
              width={30}
              height={30}
            />
            <span className="font-bold text-lg">PR-Bot</span>
          </div>

          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-md border flex items-center justify-center transition ${
              theme === "light"
                ? "bg-gray-100 border-gray-300 hover:bg-gray-200"
                : "bg-white/5 border-white/20 hover:bg-white/10"
            }`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="flex-1 pt-24">
        {/* VIDEO MODE */}
        {showVideoCard ? (
          <section className="pb-16 px-3 max-w-[1200px] mx-auto">
            <div className="max-w-4xl">
              <button
                onClick={() => setShowVideoCard(false)}
                className="flex items-center gap-2 mb-6 text-sm opacity-80 hover:opacity-100"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <div
                className={`rounded-2xl border shadow-2xl p-6 ${
                  theme === "light"
                    ? "bg-white border-gray-200"
                    : "bg-[#0b0b0b] border-white/15"
                }`}
              >
                {/* VIDEO DISPLAY (visible to all users) */}
                <div
                  className={`w-full rounded-xl border shadow-lg overflow-hidden mb-6 flex items-center justify-center cursor-pointer ${
                    theme === "light"
                      ? "bg-gray-200 border-gray-300"
                      : "bg-black/40 border-white/15"
                  }`}
                  style={{ height: "32vh" }}
                  onClick={handleVideoClick}
                >
                  {videoUrl ? (
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      controls
                    >
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <span className="text-sm opacity-70">
                      Demo video coming soon.
                    </span>
                  )}
                </div>

                <p className="opacity-80 leading-relaxed">
                  This video explains how PR-Bot works and how to set it up on
                  your GitHub repositories.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* HERO SECTION */}
            <section className="pb-20 px-3 max-w-[1200px] mx-auto">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-8xl font-bold leading-[0.95] mb-8">
                  Pull request <br /> reviews — done.
                </h1>

                <p
                  className={`max-w-2xl mb-10 text-lg md:text-2xl ${
                    theme === "light" ? "text-gray-700" : "text-slate-400"
                  }`}
                >
                  PR-Bot is the automated code review system for
                  high-velocity engineering teams.
                </p>

                <div className="flex flex-col md:flex-row gap-3 md:gap-8">
                  <button className="inline-flex w-fit self-start px-4 py-3 rounded-lg bg-white text-black font-semibold shadow-md hover:shadow-xl">
                    <a href="https://github.com/apps/v0-pr-bot-reviewer">
                      Install PR-Bot
                    </a>
                  </button>

                  <button
                    onClick={() => setShowVideoCard(true)}
                    className="w-fit self-start opacity-75 hover:opacity-100 border-b border-current"
                  >
                    Watch how PR-Bot works
                  </button>
                </div>
              </div>
            </section>

            {/* (Your review preview card section remains unchanged) */}
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer
        className={`border-t px-3 md:px-6 py-12 ${
          theme === "light"
            ? "bg-white border-gray-300 text-gray-800"
            : "bg-[#050505] border-white/10 text-slate-300"
        }`}
      >
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-bold text-xl mb-2">PR-Bot</h3>

          <p className="max-w-lg text-sm opacity-80 leading-relaxed">
            AI-powered pull request reviews for high-velocity engineering teams.
            Improve code quality, reduce review fatigue, and ship confidently at
            scale. Built for developers. Secure by design. Production-ready.
          </p>

          <p className="mt-6 text-sm font-semibold opacity-90">
            Proudly Open Source
          </p>

          <p className="mt-1 text-xs opacity-70">
            © 2025 PR-Bot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

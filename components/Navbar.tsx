"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const [showVideoCard, setShowVideoCard] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isAdmin = true;

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
    setTheme(prev => (prev === "light" ? "dark" : "light"));

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
              src="/pr-bot-review-logo1.jpeg"
              alt="PR Bot Logo"
              width={28}
              height={28}
              className="rounded-full border border-white/20"
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

      <main className="flex-1 pt-24">
        {/* ================================================================= */}
        {/* 🎥 VIDEO PAGE */}
        {/* ================================================================= */}
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
                    >
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <span className="text-sm opacity-70">
                      No video uploaded yet — Upload a demo to help users
                      understand PR-Bot.
                    </span>
                  )}
                </div>

                {isAdmin && (
                  <div className="mb-6">
                    <p className="text-sm opacity-70 mb-2">
                      Admin: Upload PR-Bot demo video
                    </p>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleUpload}
                    />
                  </div>
                )}

                <p className="opacity-80 leading-relaxed">
                  This video explains how PR-Bot analyzes pull requests and
                  generates AI-assisted review feedback.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* ================================================================= */}
            {/* 🌟 HERO */}
            {/* ================================================================= */}
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
                  <button className="px-6 py-3 rounded-lg bg-white text-black font-semibold shadow-md hover:shadow-xl">
                    <a href="https://github.com/apps/v0-pr-bot-reviewer">
                      Install PR-Bot
                    </a>
                  </button>

                  <button className="opacity-75 hover:opacity-100 border-b">
                    View example review
                  </button>

                  <button
                    onClick={() => setShowVideoCard(true)}
                    className="opacity-75 hover:opacity-100 border-b"
                  >
                    Watch how PR-Bot works
                  </button>
                </div>
              </div>
            </section>

            {/* ================================================================= */}
            {/* 💻 REVIEW CARD */}
            {/* ================================================================= */}
            <section
              className={`py-12 ${
                theme === "light" ? "bg-gray-200" : "bg-[#080808]"
              }`}
            >
              <div className="max-w-[1200px] mx-auto px-3">
                <div
                  className={`rounded-2xl border shadow-2xl overflow-hidden ${
                    theme === "light"
                      ? "bg-white border-gray-300"
                      : "bg-[#0c0c0c] border-white/10"
                  }`}
                >
                  <div
                    className={`px-6 py-4 flex items-center justify-between border-b ${
                      theme === "light"
                        ? "border-gray-300 bg-gray-100"
                        : "border-white/10 bg-black/20"
                    }`}
                  >
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>

                    <span
                      className={`text-xs tracking-wider ${
                        theme === "light"
                          ? "text-gray-700"
                          : "text-slate-400"
                      }`}
                    >
                      ENGINE/AUTH.GO
                    </span>

                    <div className="w-8" />
                  </div>

                  <div className="p-10 font-mono text-[15px] leading-relaxed">
                    <div
                      className={`mb-6 ${
                        theme === "light"
                          ? "text-gray-700"
                          : "text-slate-400"
                      }`}
                    >
                      32&nbsp;&nbsp;func Authorize(u *User) error {'{'}
                    </div>

                    <div
                      className={`rounded-xl border px-8 py-8 shadow-inner mb-6 ${
                        theme === "light"
                          ? "bg-gray-100 border-gray-300"
                          : "bg-[#0f0f0f] border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                          <Terminal size={14} className="text-black" />
                        </div>

                        <span className="font-bold">PR-Bot</span>

                        <span
                          className={`text-[10px] tracking-widest ${
                            theme === "light"
                              ? "text-gray-600"
                              : "text-slate-500"
                          }`}
                        >
                          SYSTEM
                        </span>
                      </div>

                      <p
                        className={`text-lg mb-3 ${
                          theme === "light"
                            ? "text-gray-800"
                            : "text-slate-200"
                        }`}
                      >
                        Potential nil pointer dereference. Ensure{" "}
                        <code className="font-semibold">u</code> is initialized
                        before checking{" "}
                        <code className="font-semibold">u.Role</code>.
                      </p>

                      <span
                        className={`text-sm ${
                          theme === "light"
                            ? "text-gray-700"
                            : "text-slate-400"
                        }`}
                      >
                        Security Critical
                      </span>
                    </div>

                    <div
                      className={`${
                        theme === "light"
                          ? "text-gray-700"
                          : "text-slate-400"
                      }`}
                    >
                      34&nbsp;&nbsp;return errors.New("unauthorized")
                    </div>
                    <div
                      className={`${
                        theme === "light"
                          ? "text-gray-700"
                          : "text-slate-400"
                      }`}
                    >
                      35&nbsp;&nbsp;{'}'}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* ================================================================= */}
      {/* 🧩 FOOTER — THEMED + ALWAYS VISIBLE */}
      {/* ================================================================= */}
      <footer
        className={`border-t px-3 md:px-6 py-10 ${
          theme === "light"
            ? "bg-white border-gray-300 text-gray-800"
            : "bg-[#050505] border-white/10 text-slate-300"
        }`}
      >
        <div className="max-w-[1200px] mx-auto">
          <span className="font-bold text-lg">PR-Bot</span>

          <p className="mt-3 max-w-md text-sm opacity-80">
            The standard for automated code quality. Built for the next
            generation of software engineering.
          </p>
        </div>
      </footer>
    </div>
  );
}

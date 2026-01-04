"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Square, Sun, Moon } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const [showVideoCard, setShowVideoCard] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light"); // DEFAULT LIGHT MODE

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isAdmin = true;

  // Load theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") setTheme("dark");
  }, []);

  // Apply theme class to body
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

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
    <div
      className={`min-h-screen font-sans selection:bg-black/10
        ${theme === "light" ? "bg-gray-100 text-gray-900" : "bg-[#050505] text-[#f8fafc]"}
      `}
    >

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b 
          ${theme === "light" ? "bg-white/90 border-gray-200" : "bg-[#050505]/80 border-white/10"}
        `}
      >
        <div className="max-w-[1200px] mx-auto px-3 md:px-6 h-16 md:h-20 flex items-center justify-between">

          {/* LOGO + TITLE */}
          <div className="flex items-center gap-2 md:gap-3">
            <Image
              src="/pr-bot-review-logo1.jpeg"
              alt="PR Bot Logo"
              width={30}
              height={30}
              className="rounded-full border border-white/20"
            />

            <span className="font-bold tracking-tight text-lg md:text-xl">
              PR-Bot
            </span>
          </div>

          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-md flex items-center justify-center border transition
              ${theme === "light"
                ? "border-gray-300 bg-gray-100 hover:bg-gray-200"
                : "border-white/20 bg-white/5 hover:bg-white/10"}
            `}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </nav>

      
      {showVideoCard ? (
        <section className="pt-28 md:pt-40 pb-16 px-3 md:px-6 max-w-[1200px] mx-auto">
          <div className="max-w-4xl">

            <div
              className={`rounded-xl border shadow-2xl p-6 md:p-8
                ${theme === "light"
                  ? "bg-white border-gray-200"
                  : "bg-[#0b0b0b] border-white/15"}
              `}
            >

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-bold">PR-Bot Review Demo</h3>

                <button
                  onClick={() => setShowVideoCard(false)}
                  className={`w-9 h-9 rounded-md flex items-center justify-center border
                    ${theme === "light"
                      ? "border-gray-300 hover:bg-gray-200"
                      : "border-white/20 hover:bg-white/10"}
                  `}
                >
                  <Square size={18} />
                </button>
              </div>

              {/* VIDEO BOX */}
              <div
                className={`w-full rounded-lg border shadow-lg overflow-hidden mb-6 cursor-pointer flex items-center justify-center
                  ${theme === "light"
                    ? "border-gray-300 bg-gray-200"
                    : "border-white/15 bg-black/40"}
                `}
                style={{ height: "32vh" }}
                onClick={handleVideoClick}
              >
                {videoUrl ? (
                  <video ref={videoRef} className="w-full h-full object-cover">
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <span className="text-sm opacity-70">
                    No video uploaded yet — Upload a demo to help users understand how PR-Bot works.
                  </span>
                )}
              </div>

              {/* ADMIN UPLOAD */}
              {isAdmin && (
                <div className="mb-6">
                  <p className="text-sm opacity-70 mb-2">
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

              <p className="opacity-80 text-base md:text-lg leading-relaxed">
                This video helps developers understand how PR-Bot analyzes pull requests
                and generates AI-assisted review feedback. Tap the video to play or pause.
              </p>
            </div>
          </div>
        </section>
      ) : (
      <>
        
        <section className="pt-28 md:pt-48 pb-20 md:pb-32 px-3 md:px-6 max-w-[1200px] mx-auto">
          <div className="max-w-4xl">

            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.95]">
              Pull request <br /> reviews — done.
            </h1>

            <p className={`max-w-2xl mb-10 md:mb-12 text-lg md:text-2xl leading-relaxed
              ${theme === "light" ? "text-gray-700" : "text-slate-400"}
            `}>
              PR-Bot is the standard automated code review system for high-velocity engineering teams.
            </p>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-8">

              <button className="px-6 py-3 rounded-lg bg-white text-black font-semibold shadow-md hover:shadow-xl transition">
                <a href="https://github.com/apps/v0-pr-bot-reviewer">
                  Install PR-Bot
                </a>
              </button>

              <button className="text-base md:text-lg font-medium opacity-75 hover:opacity-100 border-b">
                View example review
              </button>

              <button
                onClick={() => setShowVideoCard(true)}
                className="text-base md:text-lg font-medium opacity-75 hover:opacity-100 border-b"
              >
                Watch how PR-Bot works
              </button>
            </div>
          </div>
        </section>

        {/* PRODUCT CARD */}
        <section className={`py-10 md:py-12
          ${theme === "light" ? "bg-gray-200" : "bg-[#080808]"}
        `}>
          <div className="max-w-[1200px] mx-auto px-3 md:px-6">

            <div
              className={`rounded-xl border shadow-2xl overflow-hidden
                ${theme === "light"
                  ? "bg-white border-gray-200"
                  : "bg-[#0c0c0c] border-white/12"}
              `}
            >
              <div className={`p-8 border-b flex items-center justify-between
                ${theme === "light"
                  ? "bg-gray-100 border-gray-200"
                  : "bg-white/5 border-white/10"}
              `}>
                <span className="text-xs opacity-70">engine/auth.go</span>
                <div className="w-10" />
              </div>

              <div className="p-10 font-mono text-[13px] md:text-[15px] leading-relaxed">
                <div className="opacity-70 mb-2">
                  32  func Authorize(u *User) error {'{'}
                </div>

                <div className={`flex gap-6 border-l -mx-10 px-10 py-8 my-6 rounded-r-lg shadow-inner
                  ${theme === "light"
                    ? "bg-gray-100 border-gray-300"
                    : "bg-white/5 border-white/30"}
                `}>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                        <Terminal size={14} className="text-black" />
                      </div>
                      <span className="font-bold">PR-Bot</span>
                    </div>

                    <p>
                      Potential nil pointer dereference. Ensure <code>u</code> is initialized
                      before checking <code>u.Role</code>.
                    </p>
                  </div>
                </div>

                <div className="opacity-70">
                  34  return errors.New("unauthorized")
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-14 border-t px-3 md:px-6">
          <div className="max-w-[1200px] mx-auto">
            <span className="font-bold tracking-tight text-xl">PR-Bot</span>
            <p className="opacity-70 mt-3 max-w-xs text-sm">
              The standard for automated code quality.
            </p>
          </div>
        </footer>
      </>
      )}
    </div>
  );
}

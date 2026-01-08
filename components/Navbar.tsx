// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { Terminal, ArrowLeft } from "lucide-react";
// import Image from "next/image";
// import { AnimatePresence, motion } from "framer-motion";

// export default function HomePage() {
//   const [showVideoCard, setShowVideoCard] = useState(false);
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);
//   const [theme, setTheme] = useState<"light" | "dark">("light");

//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   const DEFAULT_VIDEO = "/uploads/pr-bot-demo.mp4";

//   useEffect(() => {
//     const stored = localStorage.getItem("theme");
//     if (stored === "dark") setTheme("dark");
//   }, []);

//   useEffect(() => {
//     if (theme === "dark") {
//       document.body.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.body.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [theme]);

//   const toggleTheme = () =>
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));

//   useEffect(() => {
//     setVideoUrl(DEFAULT_VIDEO);
//   }, []);

//   useEffect(() => {
//     if (showVideoCard && videoRef.current) {
//       videoRef.current.play().catch(() => {});
//     }
//   }, [showVideoCard, videoUrl]);

//   const handleVideoClick = () => {
//     if (!videoRef.current) return;
//     videoRef.current.paused
//       ? videoRef.current.play()
//       : videoRef.current.pause();
//   };

//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isInteracting, setIsInteracting] = useState(false);

//   const slides = [
//     {
//       title: "What does PR-Bot do?",
//       description:
//         "PR-Bot automatically reviews pull requests using AI. It analyzes code changes, detects bugs, security risks, and best-practice violations, and leaves actionable comments directly on GitHub.",
//     },
//     {
//       title: "Why is this application important?",
//       description:
//         "Manual code reviews are slow and inconsistent. PR-Bot reduces review fatigue, enforces standards, and helps teams catch critical issues early before they reach production.",
//     },
//     {
//       title: "How does PR-Bot help teams?",
//       description:
//         "Teams ship faster with confidence. Senior engineers save review time, junior developers learn faster, and repositories remain secure, clean, and maintainable at scale.",
//     },
//   ];

  
//   useEffect(() => {
//     if (isInteracting) return;

//     const interval = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % slides.length);
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [isInteracting, slides.length]);

//   return (
//     <div
//       className={`min-h-screen flex flex-col font-sans ${
//         theme === "light"
//           ? "bg-gray-100 text-gray-900"
//           : "bg-[#050505] text-[#f8fafc]"
//       }`}
//     >
//       {/* NAVBAR */}
//       <nav
//         className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
//           theme === "light"
//             ? "bg-white/90 border-gray-200"
//             : "bg-[#050505]/80 border-white/10"
//         }`}
//       >
//         <div className="max-w-[1200px] mx-auto px-3 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Image src="/social.png" alt="PR Bot Logo" width={30} height={30} />
//             <span className="font-bold text-lg">PR-Bot</span>
//           </div>

//           <button
//             onClick={toggleTheme}
//             className={`w-9 h-9 rounded-md border flex items-center justify-center transition ${
//               theme === "light"
//                 ? "bg-gray-100 border-gray-300 hover:bg-gray-200"
//                 : "bg-white/5 border-white/20 hover:bg-white/10"
//             }`}
//           >
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>
//         </div>
//       </nav>

//       <main className="flex-1 pt-24">
//         {showVideoCard ? (
//           <section className="pb-16 px-3 max-w-[1200px] mx-auto">
//             <div className="max-w-4xl">
//               <button
//                 onClick={() => setShowVideoCard(false)}
//                 className="flex items-center gap-2 mb-6 text-sm opacity-80 hover:opacity-100"
//               >
//                 <ArrowLeft size={16} />
//                 Back
//               </button>

//               <div
//                 className={`rounded-2xl border shadow-2xl p-6 ${
//                   theme === "light"
//                     ? "bg-white border-gray-200"
//                     : "bg-[#0b0b0b] border-white/15"
//                 }`}
//               >
//                 <div
//                   className={`w-full rounded-xl border shadow-lg overflow-hidden mb-6 flex items-center justify-center cursor-pointer ${
//                     theme === "light"
//                       ? "bg-gray-200 border-gray-300"
//                       : "bg-black/40 border-white/15"
//                   }`}
//                   style={{ height: "32vh" }}
//                   onClick={handleVideoClick}
//                 >
//                   {videoUrl ? (
//                     <video
//                       ref={videoRef}
//                       className="w-full h-full object-cover"
//                       controls
//                     >
//                       <source src={videoUrl} type="video/mp4" />
//                     </video>
//                   ) : (
//                     <span className="text-sm opacity-70">
//                       Demo video coming soon.
//                     </span>
//                   )}
//                 </div>

//                 <p className="opacity-80 leading-relaxed">
//                   This video explains how PR-Bot works and how to set it up on
//                   your GitHub repositories.
//                 </p>
//               </div>
//             </div>
//           </section>
//         ) : (
//           <>
//             {/* HERO */}
//             <section className="pb-20 px-3 max-w-[1200px] mx-auto">
//               <div className="max-w-4xl">
//                 <h1 className="text-5xl md:text-8xl font-bold leading-[0.95] mb-8">
//                   Pull request <br /> reviews — done.
//                 </h1>

//                 <p
//                   className={`max-w-2xl mb-10 text-lg md:text-2xl ${
//                     theme === "light" ? "text-gray-700" : "text-slate-400"
//                   }`}
//                 >
//                   PR-Bot is the automated code review system for
//                   high-velocity engineering teams.
//                 </p>

//                 <div className="flex flex-col md:flex-row gap-3 md:gap-8">
//                   <a
//                     href="https://github.com/apps/v0-pr-bot-reviewer"
//                     className="inline-flex w-fit px-4 py-3 rounded-lg bg-white text-black font-semibold shadow-md hover:shadow-xl"
//                   >
//                     Install PR-Bot
//                   </a>

//                   <button
//                     onClick={() => setShowVideoCard(true)}
//                     className="w-fit opacity-75 hover:opacity-100 border-b border-current"
//                   >
//                     Watch how PR-Bot works
//                   </button>
//                 </div>
//               </div>
//             </section>

//             <section
//               className={`py-20 ${
//                 theme === "light" ? "bg-gray-100" : "bg-[#060606]"
//               }`}
//             >
//               <div className="max-w-[1200px] mx-auto px-3">
//                 <h2 className="text-3xl md:text-4xl font-bold mb-10">
//                   About the Project
//                 </h2>

//                 <div className="relative overflow-hidden px-24">
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={activeSlide}
//                       drag="x"
//                       dragConstraints={{ left: 0, right: 0 }}
//                       onDragStart={() => setIsInteracting(true)}
//                       onDragEnd={(e, info) => {
//                         setIsInteracting(false);

//                         if (info.offset.x < -160) {
//                           setActiveSlide(
//                             (prev) => (prev + 1) % slides.length
//                           );
//                         } else if (info.offset.x > 160) {
//                           setActiveSlide(
//                             (prev) =>
//                               prev === 0 ? slides.length - 1 : prev - 1
//                           );
//                         }
//                       }}
//                       initial={{ opacity: 0, x: 140, scale: 0.97 }}
// animate={{ opacity: 1, x: 0, scale: 1 }}
// exit={{ opacity: 0, x: -140, scale: 0.97 }}
// transition={{
//   duration: 1.2,                
//   ease: [0.16, 1, 0.3, 1],      
// }}

//                       className={`h-[260px] rounded-2xl border p-8 flex flex-col justify-center ${
//                         theme === "light"
//                           ? "bg-white border-gray-300"
//                           : "bg-[#0c0c0c] border-white/10"
//                       }`}
//                     >
//                       <h3 className="text-2xl font-semibold mb-4">
//                         {slides[activeSlide].title}
//                       </h3>
//                       <p
//                         className={`text-lg leading-relaxed ${
//                           theme === "light"
//                             ? "text-gray-700"
//                             : "text-slate-400"
//                         }`}
//                       >
//                         {slides[activeSlide].description}
//                       </p>
//                     </motion.div>
//                   </AnimatePresence>

//                   {/* ARROWS */}
//                   <button
//                     onClick={() =>
//                       setActiveSlide(
//                         activeSlide === 0
//                           ? slides.length - 1
//                           : activeSlide - 1
//                       )
//                     }
//                     className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
//                   >
//                     ←
//                   </button>

//                   {/* RIGHT ARROW */}
//                   <button
//                     onClick={() =>
//                       setActiveSlide((activeSlide + 1) % slides.length)
//                     }
//                     className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
//                   >
//                     →
//                   </button>
//                 </div>
//                 <div className="block md:hidden">
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={activeSlide}
//                       drag="x"
//                       dragConstraints={{ left: 0, right: 0 }}
//                       onDragStart={() => setIsInteracting(true)}
//                       onDragEnd={(e, info) => {
//                         setIsInteracting(false);
//                         if (info.offset.x < -120)
//                           setActiveSlide((p) => (p + 1) % slides.length);
//                         else if (info.offset.x > 120)
//                           setActiveSlide((p) =>
//                             p === 0 ? slides.length - 1 : p - 1
//                           );
//                       }}
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.95 }}
//                       transition={{ duration: 0.6 }}
//                       className={`rounded-2xl border p-6 ${
//                         theme === "light"
//                           ? "bg-white border-gray-300"
//                           : "bg-[#0c0c0c] border-white/10"
//                       }`}
//                     >
//                       <h3 className="text-xl font-semibold mb-3 text-center">
//                         {slides[activeSlide].title}
//                       </h3>
//                       <p className="text-base text-gray-500 text-center">
//                         {slides[activeSlide].description}
//                       </p>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 {/* DOTS */}
//                 <div className="flex justify-center gap-2 mt-6">
//                   {slides.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setActiveSlide(index)}
//                       className={`w-3 h-3 rounded-full ${
//                         activeSlide === index
//                           ? "bg-blue-500"
//                           : theme === "light"
//                           ? "bg-gray-400"
//                           : "bg-slate-600"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </section>

//             {/* CODE PREVIEW */}
//             <section
//               className={`py-12 ${
//                 theme === "light" ? "bg-gray-200" : "bg-[#080808]"
//               }`}
//             >
//               <div className="max-w-[1200px] mx-auto px-3">
//                 <div
//                   className={`rounded-2xl border shadow-2xl overflow-hidden ${
//                     theme === "light"
//                       ? "bg-white border-gray-300"
//                       : "bg-[#0c0c0c] border-white/10"
//                   }`}
//                 >
//                   <div
//                     className={`px-6 py-4 flex items-center justify-between border-b ${
//                       theme === "light"
//                         ? "border-gray-300 bg-gray-100"
//                         : "border-white/10 bg-black/20"
//                     }`}
//                   >
//                     <div className="flex gap-2">
//                       <div className="w-3 h-3 rounded-full bg-red-500" />
//                       <div className="w-3 h-3 rounded-full bg-yellow-400" />
//                       <div className="w-3 h-3 rounded-full bg-green-500" />
//                     </div>
//                     <span
//                       className={`text-xs tracking-wider ${
//                         theme === "light"
//                           ? "text-gray-700"
//                           : "text-slate-400"
//                       }`}
//                     >
//                       ENGINE/AUTH.GO
//                     </span>
//                     <div className="w-8" />
//                   </div>

//                   <div className="p-10 font-mono text-[15px] leading-relaxed">
//                     <div
//                       className={`mb-6 ${
//                         theme === "light"
//                           ? "text-gray-700"
//                           : "text-slate-400"
//                       }`}
//                     >
//                       32&nbsp;&nbsp;func Authorize(u *User) error {"{"}
//                     </div>

//                     <div
//                       className={`rounded-xl border px-8 py-8 shadow-inner mb-6 ${
//                         theme === "light"
//                           ? "bg-gray-100 border-gray-300"
//                           : "bg-[#0f0f0f] border-white/10"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3 mb-4">
//                         <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
//                           <Terminal size={14} className="text-black" />
//                         </div>
//                         <span className="font-bold">PR-Bot</span>
//                         <span
//                           className={`text-[10px] tracking-widest ${
//                             theme === "light"
//                               ? "text-gray-600"
//                               : "text-slate-500"
//                           }`}
//                         >
//                           SYSTEM
//                         </span>
//                       </div>

//                       <p
//                         className={`text-lg mb-3 ${
//                           theme === "light"
//                             ? "text-gray-800"
//                             : "text-slate-200"
//                         }`}
//                       >
//                         Potential nil pointer dereference. Ensure{" "}
//                         <code className="font-semibold">u</code> is initialized
//                         before checking{" "}
//                         <code className="font-semibold">u.Role</code>.
//                       </p>

//                       <span
//                         className={`text-sm ${
//                           theme === "light"
//                             ? "text-gray-700"
//                             : "text-slate-400"
//                         }`}
//                       >
//                         Security Critical
//                       </span>
//                     </div>

//                     <div
//                       className={`${
//                         theme === "light"
//                           ? "text-gray-700"
//                           : "text-slate-400"
//                       }`}
//                     >
//                       34&nbsp;&nbsp;return errors.New("unauthorized")
//                     </div>
//                     <div
//                       className={`${
//                         theme === "light"
//                           ? "text-gray-700"
//                           : "text-slate-400"
//                       }`}
//                     >
//                       35&nbsp;&nbsp;{"}"}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </>
//         )}
//       </main>

//       {/* FOOTER */}
//       <footer
//         className={`border-t px-3 md:px-6 py-12 ${
//           theme === "light"
//             ? "bg-white border-gray-300 text-gray-800"
//             : "bg-[#050505] border-white/10 text-slate-300"
//         }`}
//       >
//         <div className="max-w-[1200px] mx-auto">
//           <h3 className="font-bold text-xl mb-2">PR-Bot</h3>

//           <p className="max-w-lg text-sm opacity-80 leading-relaxed">
//             AI-powered pull request reviews for high-velocity engineering teams.
//             Improve code quality, reduce review fatigue, and ship confidently at
//             scale.
//           </p>

//           <p className="mt-6 text-sm font-semibold opacity-90">
//             Proudly Open Source
//           </p>

//           <p className="mt-1 text-xs opacity-70">
//             © 2025 PR-Bot. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function HomePage() {
  const [showVideoCard, setShowVideoCard] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const DEFAULT_VIDEO = "/uploads/pr-bot-demo.mp4";

  const [activeSlide, setActiveSlide] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const slides = [
    {
      title: "What does PR-Bot do?",
      description:
        "PR-Bot automatically reviews pull requests using AI. It analyzes code changes, detects bugs, security risks, and best-practice violations, and leaves actionable comments directly on GitHub.",
    },
    {
      title: "Why is this application important?",
      description:
        "Manual code reviews are slow and inconsistent. PR-Bot reduces review fatigue, enforces standards, and helps teams catch critical issues early before they reach production.",
    },
    {
      title: "How does PR-Bot help teams?",
      description:
        "Teams ship faster with confidence. Senior engineers save review time, junior developers learn faster, and repositories remain secure, clean, and maintainable at scale.",
    },
  ];

  /* AUTO SLIDE — 10 SECONDS */
  useEffect(() => {
    if (isInteracting) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isInteracting, slides.length]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") setTheme("dark");
  }, []);

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

  useEffect(() => {
    setVideoUrl(DEFAULT_VIDEO);
  }, []);

  useEffect(() => {
    if (showVideoCard && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [showVideoCard]);

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
            <Image src="/social.png" alt="PR Bot Logo" width={30} height={30} />
            <span className="font-bold text-lg">PR-Bot</span>
          </div>

          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-md border flex items-center justify-center ${
              theme === "light"
                ? "bg-gray-100 border-gray-300"
                : "bg-white/5 border-white/20"
            }`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      <main className="flex-1 pt-24">
        {showVideoCard ? (
          /* VIDEO SECTION */
          <section className="pb-16 px-3 max-w-[1200px] mx-auto">
            <button
              onClick={() => setShowVideoCard(false)}
              className="flex items-center gap-2 mb-6 text-sm opacity-80"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div
              className={`rounded-2xl border p-6 ${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "bg-[#0b0b0b] border-white/15"
              }`}
            >
              <div
                className="rounded-xl overflow-hidden cursor-pointer"
                style={{ height: "32vh" }}
                onClick={handleVideoClick}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls
                >
                  <source src={videoUrl ?? ""} type="video/mp4" />
                </video>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* HERO */}
            <section className="pb-20 px-3 max-w-[1200px] mx-auto">
              <h1 className="text-5xl md:text-8xl font-bold leading-[0.95] mb-8">
                Pull request <br /> reviews — done.
              </h1>

              <p className="max-w-2xl mb-10 text-lg md:text-2xl text-gray-500">
                PR-Bot is the automated code review system for high-velocity
                engineering teams.
              </p>

              <div className="flex flex-col md:flex-row gap-6">
                <a
                  href="https://github.com/apps/v0-pr-bot-reviewer"
                  className="px-6 py-3 rounded-lg bg-white text-black font-semibold shadow-md"
                >
                  Install PR-Bot
                </a>

                <button
                  onClick={() => setShowVideoCard(true)}
                  className="border-b w-fit opacity-75"
                >
                  Watch how PR-Bot works
                </button>
              </div>
            </section>

            {/* ================= SLIDER ================= */}
            <section
              className={`py-20 ${
                theme === "light" ? "bg-gray-100" : "bg-[#060606]"
              }`}
            >
              <div className="max-w-[1200px] mx-auto px-3">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">
                  About the Project
                </h2>

                {/* DESKTOP */}
                <div className="hidden md:block">
                  <div className="relative overflow-hidden px-24">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0, x: 140, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -140, scale: 0.97 }}
                        transition={{
                          duration: 1.2,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`h-[260px] rounded-2xl border flex items-center justify-center ${
                          theme === "light"
                            ? "bg-white border-gray-300"
                            : "bg-[#0c0c0c] border-white/10"
                        }`}
                      >
                        <div className="max-w-xl text-center px-16">
                          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                            {slides[activeSlide].title}
                          </h3>
                          <p className="text-lg text-gray-500">
                            {slides[activeSlide].description}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <button
                      onClick={() =>
                        setActiveSlide(
                          activeSlide === 0
                            ? slides.length - 1
                            : activeSlide - 1
                        )
                      }
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-blue-500 text-white shadow-lg"
                    >
                      ←
                    </button>

                    <button
                      onClick={() =>
                        setActiveSlide((activeSlide + 1) % slides.length)
                      }
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-blue-500 text-white shadow-lg"
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* MOBILE */}
                <div className="block md:hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragStart={() => setIsInteracting(true)}
                      onDragEnd={(e, info) => {
                        setIsInteracting(false);
                        if (info.offset.x < -120)
                          setActiveSlide((p) => (p + 1) % slides.length);
                        else if (info.offset.x > 120)
                          setActiveSlide((p) =>
                            p === 0 ? slides.length - 1 : p - 1
                          );
                      }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className={`rounded-2xl border p-6 ${
                        theme === "light"
                          ? "bg-white border-gray-300"
                          : "bg-[#0c0c0c] border-white/10"
                      }`}
                    >
                      <h3 className="text-xl font-semibold mb-3 text-center">
                        {slides[activeSlide].title}
                      </h3>
                      <p className="text-base text-gray-500 text-center">
                        {slides[activeSlide].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* DOTS */}
                <div className="flex justify-center gap-2 mt-6">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`w-3 h-3 rounded-full ${
                        activeSlide === i
                          ? "bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* CODE PREVIEW  */}
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
                      32&nbsp;&nbsp;func Authorize(u *User) error {"{"}
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
                      35&nbsp;&nbsp;{"}"}
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
            scale.
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

"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";
import SectionLabel from "./ui/SectionLabel";
import CountUp from "./ui/CountUp";

const STATS = [
  { value: 14, unit: " กม.", label: "สนามบินนานาชาติอุดรธานี" },
  { value: 53, unit: " กม.", label: "ด่านหนองคาย — สะพานมิตรภาพไทย-ลาว" },
  { value: 610, unit: " กม.", label: "ท่าเรือน้ำลึกแหลมฉบัง" },
];

// Mini-player sizes
const MINI_SIZES: Record<string, { w: number; h: number }> = {
  sm: { w: 240, h: 135 },
  lg: { w: 400, h: 225 },
};

// ============================================================
// Audio controls shared by both players
// ============================================================

function AudioControls({
  isMuted,
  volume,
  onToggleMute,
  onVolumeChange,
}: {
  isMuted: boolean;
  volume: number;
  onToggleMute: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggleMute}
        className="w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 transition-colors shrink-0"
        aria-label={isMuted ? "เปิดเสียง" : "ปิดเสียง"}
      >
        {isMuted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur rounded-full px-3 py-1.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.7}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        </svg>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={isMuted ? 0 : volume}
          onChange={onVolumeChange}
          className="range-mini w-16"
          style={{
            background: `linear-gradient(to right, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%)`,
          }}
        />
      </div>
    </div>
  );
}

// ============================================================
// Main
// ============================================================

export default function StrategicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const miniVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);

  // Mini-player state
  const [miniVisible, setMiniVisible] = useState(false);
  const [miniDismissed, setMiniDismissed] = useState(false);
  const [miniSize, setMiniSize] = useState<"sm" | "lg">("sm");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "center center"],
  });
  const mapScale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const mapOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // ---- Scroll detection for mini-player ----
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const bottom = el.getBoundingClientRect().bottom;
        // Show mini-player when section bottom scrolls above viewport
        if (bottom < -100 && !miniDismissed) {
          setMiniVisible(true);
        } else if (bottom >= 0) {
          setMiniVisible(false);
          setMiniDismissed(false);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [miniDismissed]);

  // Audio routing: only the visible video produces sound
  // If user dismissed mini-player → both muted until section comes back
  useEffect(() => {
    const mini = miniVideoRef.current;
    const main = videoRef.current;
    if (!mini || !main) return;

    if (miniVisible) {
      // Mini is visible → audio from mini, main silent
      main.muted = true;
      main.volume = 0;
      mini.muted = isMuted;
      mini.volume = isMuted ? 0 : volume;
    } else if (miniDismissed) {
      // User closed mini → both silent until they scroll back to section
      main.muted = true;
      main.volume = 0;
      mini.muted = true;
      mini.volume = 0;
    } else {
      // Section is visible → audio from main, mini silent
      mini.muted = true;
      mini.volume = 0;
      main.muted = isMuted;
      main.volume = isMuted ? 0 : volume;
    }
  }, [isMuted, volume, miniVisible, miniDismissed]);

  // Keep mini video playing continuously (no seek → no stutter)
  useEffect(() => {
    const mini = miniVideoRef.current;
    const main = videoRef.current;
    if (!mini || !main) return;

    // Start mini video once main video has begun
    const startMini = () => {
      if (main.readyState >= 2 && mini.readyState >= 2) {
        // One-time initial sync when both are ready
        mini.currentTime = main.currentTime;
      }
      mini.play().catch(() => {});
    };

    if (main.readyState >= 2) {
      startMini();
    } else {
      main.addEventListener("canplay", startMini, { once: true });
    }

    // Gently nudge mini to stay close to main (every 3s, while hidden)
    // Small corrections are invisible — no stutter
    const interval = setInterval(() => {
      if (!miniVisible && mini.readyState >= 2 && main.readyState >= 2) {
        const diff = Math.abs(main.currentTime - mini.currentTime);
        if (diff > 0.3) {
          mini.currentTime = main.currentTime;
        }
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      main.removeEventListener("canplay", startMini);
    };
  }, []); // run once on mount

  // ---- Audio handlers ----
  const toggleMute = useCallback(() => {
    if (miniDismissed) return; // no audio when dismissed
    const next = !isMuted;
    const active = miniVisible ? miniVideoRef.current : videoRef.current;
    if (active) {
      active.muted = next;
      if (!next && active.volume === 0) active.volume = volume;
    }
    setIsMuted(next);
  }, [isMuted, volume, miniVisible, miniDismissed]);

  const handleVolume = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (miniDismissed) return; // no audio when dismissed
      const v = parseFloat(e.target.value);
      setVolume(v);
      let nextMuted = isMuted;
      if (v > 0 && isMuted) nextMuted = false;
      if (v === 0) nextMuted = true;
      setIsMuted(nextMuted);
      const active = miniVisible ? miniVideoRef.current : videoRef.current;
      if (active) {
        active.volume = v;
        active.muted = nextMuted;
      }
    },
    [isMuted, miniVisible, miniDismissed],
  );

  const closeMini = useCallback(() => {
    setMiniVisible(false);
    setMiniDismissed(true);
  }, []);

  const scrollToSection = useCallback(() => {
    setMiniVisible(false);
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const toggleMiniSize = useCallback(() => {
    setMiniSize((s) => (s === "sm" ? "lg" : "sm"));
  }, []);

  const size = MINI_SIZES[miniSize];

  return (
    <>
      <section ref={sectionRef} id="strategic" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20 items-center">
            {/* Main Video */}
            <motion.div
              style={{ opacity: mapOpacity, scale: mapScale }}
              className="relative lg:order-1"
            >
              <div className="relative group overflow-hidden rounded-2xl">
                <video
                  ref={videoRef}
                  src="/videos/logistics.mp4"
                  poster="/images/thailand.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full aspect-[4/3] object-cover"
                />
                {/* Subtle frame border — not a generic shadow */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <AudioControls
                    isMuted={isMuted}
                    volume={volume}
                    onToggleMute={toggleMute}
                    onVolumeChange={handleVolume}
                  />
                </div>
              </div>
              {/* Caption that breaks below — editorial style */}
              <p className="mt-3 text-xs text-text-light tracking-wide">
                วิดีโอแนะนำโครงการ — ที่ตั้งและโครงข่ายคมนาคมโดยรอบ
              </p>
            </motion.div>

            {/* Info — asymmetric editorial layout */}
            <div className="lg:order-2">
              <SectionLabel number="02" />
              <h2 className="text-4xl lg:text-5xl font-black text-text-dark leading-[1.2] mt-4">
                ยุทธศาสตร์<br />
                <span className="text-primary">ประตูสู่อนุภูมิภาค</span>ลุ่มน้ำโขง
              </h2>
              <p className="text-text-light mt-5 text-base leading-relaxed max-w-md">
                ตำแหน่งบนระเบียงเศรษฐกิจ GMS เชื่อมไทย&ndash;ลาว&ndash;เวียดนาม&ndash;จีนตอนใต้
                ด้วยโครงข่ายถนน ทางราง และอากาศยาน
              </p>

              {/* Stats — connected route line */}
              <div className="mt-12">
                {/* Visual route bar */}
                <div className="relative flex items-center mb-6">
                  {/* Continuous horizontal line */}
                  <div className="absolute left-0 right-0 h-0.5 bg-gray-200" />
                  {/* Three dots on the line */}
                  {STATS.map((_, i) => (
                    <div
                      key={i}
                      className="relative flex-1 flex justify-center"
                    >
                      <div className="w-3 h-3 rounded-full border-2 border-primary bg-white" />
                    </div>
                  ))}
                </div>

                {/* Numbers + labels */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-0">
                  {STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ delay: 0.2 + i * 0.12 }}
                      className="flex-1"
                    >
                      <div className="text-4xl lg:text-5xl font-black text-text-dark tracking-tight">
                        <CountUp value={stat.value} suffix={stat.unit} duration={1.8} />
                      </div>
                      <div className="text-xs text-text-light mt-2 leading-snug">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Divider with facts */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-text-light">
                <span>ครอบคลุม 4 ประเทศ</span>
                <span className="w-1 h-1 rounded-full bg-primary/40 hidden sm:block" />
                <span>รัศมีการขนส่ง 600 กม.</span>
                <span className="w-1 h-1 rounded-full bg-primary/40 hidden sm:block" />
                <span>นิคมฯ แห่งแรกของภาคอีสาน</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== Floating Mini-Player (always mounted — no re-load) ======== */}
      <motion.div
        animate={
          miniVisible
            ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" as const }
            : { opacity: 0, y: 40, scale: 0.9, pointerEvents: "none" as const }
        }
        transition={{ duration: 0.3, ease: [0.17, 0.55, 0.55, 1] }}
        className="fixed z-[9999] bottom-4 right-4 shadow-2xl rounded-xl overflow-hidden border border-gray-700 bg-black"
        style={{ width: size.w }}
      >
        {/* Video */}
        <div className="relative group/mini">
          <video
            ref={miniVideoRef}
            src="/videos/logistics.mp4"
            poster="/images/thailand.png"
            loop
            muted
            playsInline
            preload="auto"
            className="w-full object-cover"
            style={{ height: size.h }}
          />

          {/* Top bar (hover) */}
          <div className="absolute top-0 left-0 right-0 p-2 flex items-center justify-between opacity-0 group-hover/mini:opacity-100 transition-opacity duration-200 bg-gradient-to-b from-black/70 to-transparent">
            <span className="text-white text-xs font-semibold pl-1">
              เมืองอุตสาหกรรมอุดรธานี
            </span>
            <div className="flex items-center gap-1">
              {/* Toggle size */}
              <button
                onClick={toggleMiniSize}
                className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label={miniSize === "sm" ? "ขยาย" : "ย่อ"}
              >
                {miniSize === "sm" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 14 10 14 10 20" />
                    <polyline points="20 10 14 10 14 4" />
                    <line x1="10" y1="14" x2="4" y2="20" />
                    <line x1="14" y1="10" x2="20" y2="4" />
                  </svg>
                )}
              </button>

              {/* Scroll to section */}
              <button
                onClick={scrollToSection}
                className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label="กลับไปวิดีโอเต็ม"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              </button>

              {/* Close */}
              <button
                onClick={closeMini}
                className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
                aria-label="ปิด"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Audio controls (bottom, hover) */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover/mini:opacity-100 transition-opacity duration-200">
            <AudioControls
              isMuted={isMuted}
              volume={volume}
              onToggleMute={toggleMute}
              onVolumeChange={handleVolume}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

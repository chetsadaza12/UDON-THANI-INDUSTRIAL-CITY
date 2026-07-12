"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";
import SectionLabel from "./ui/SectionLabel";
import CountUp from "./ui/CountUp";

const STATS = [
  {
    value: 14,
    unit: " กม.",
    label: "สนามบินอุดรธานี",
    icon: (
      <svg width="20" height="20" viewBox="0 0 502.4 502.4" fill="#C41E3A">
        <path d="M480.766,336h-69.333L306.9,226.133l176-106.667c5.333-3.2,8.533-8.533,9.6-14.933c0-6.4-2.133-12.8-6.4-17.067 L453.033,54.4c-5.333-5.333-12.8-7.467-20.267-5.333l-236.8,59.733l-78.933-84.267l-1.067-1.067C99.966,8.534,79.7,0,59.433,0 c-16,0-32,6.4-42.667,17.067C-7.767,42.667-4.567,86.4,24.233,117.333L25.3,118.4l83.2,78.933c0,1.067-1.067,2.133-1.067,2.133 l-60.8,236.8c-2.133,7.467,0,14.933,5.333,20.267L85.033,489.6c4.267,4.267,9.6,6.4,14.933,6.4c0,0,1.067,0,2.133-1.067 c6.4,0,11.733-4.267,14.933-9.6L224.766,307.2l112,105.6v68.267c0,11.733,9.6,21.333,21.333,21.333s20.267-9.6,21.333-21.333 v-40.533c4.267,1.067,8.533,1.067,12.8,1.067c13.867,0,25.6-5.333,34.133-16c11.733-11.733,16-29.867,12.8-46.933h41.6 c11.733,0,21.333-8.533,21.333-21.333C502.1,345.6,492.5,336,480.766,336z" />
      </svg>
    ),
  },
  {
    value: 53,
    unit: " กม.",
    label: "ด่านหนองคาย",
    icon: (
      <svg width="20" height="20" viewBox="0 0 190 256" fill="#C41E3A">
        <path d="M187.4,155.43l-14.51,15.53l-14.11-12.94V254H113.7v-59h-38v59H30.48v-96.78l-14.34,12.95L2,154.24l88.21-78.95V2H114 c6.5,0,7.63,4.31,8.41,5.08c2.4,2.33,4.09,3.75,7.48,3.75h17.3V49.1h-17.23c-3.39,0-5.08-1.41-7.48-3.74 c-0.85-0.85-1.91-5.09-8.41-5.09h-15.6v33.9L187.4,155.43z" />
      </svg>
    ),
  },
  {
    value: 610,
    unit: " กม.",
    label: "ท่าเรือแหลมฉบัง",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C41E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Main Video */}
            <motion.div
              style={{ opacity: mapOpacity, scale: mapScale }}
              className="overflow-hidden"
            >
              <div className="relative group">
                <video
                  ref={videoRef}
                  src="/videos/logistics.mp4"
                  poster="/images/thailand.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <AudioControls
                    isMuted={isMuted}
                    volume={volume}
                    onToggleMute={toggleMute}
                    onVolumeChange={handleVolume}
                  />
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <div>
              <SectionLabel number="02" />
              <motion.h2
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="text-4xl font-extrabold text-text-dark leading-tight mb-6"
              >
                จุดยุทธศาสตร์
                <br />
                ที่เชื่อม 4 ประเทศ
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.2 }}
                className="text-base text-text-light leading-relaxed mb-8"
              >
                เชื่อมโยงไทย ลาว เวียดนาม และจีน
                <br />
                ผ่านเส้นทางเศรษฐกิจหลักของภูมิภาค
              </motion.p>

              {/* Stat cards */}
              <div className="flex gap-4 max-sm:flex-col">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.17, 0.55, 0.55, 1], delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 flex-1 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-primary">
                      <CountUp value={stat.value} suffix={stat.unit} duration={1.5} />
                    </div>
                      <div className="text-xs text-text-light leading-tight">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
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

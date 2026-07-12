"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";

const INDUSTRIES = [
  {
    title: "Cold Chain & Agro-Export",
    desc: "ห่วงโซ่ความเย็นครบวงจร ส่งออกผลไม้และสินค้าเกษตรอีสานพรีเมียมสู่จีน ทางรถไฟลาว-จีน",
    image: "/images/logistics-warehouse.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" />
        <path d="M12 12v4" />
        <path d="M8 16h8" />
      </svg>
    ),
  },
  {
    title: "แปรรูปเกษตรและอาหาร",
    desc: "เชื่อมต่อแหล่งวัตถุดิบเกษตรชั้นเลิศของภาคอีสาน สู่การแปรรูปส่งออกทั่วโลก",
    image: "/images/train-logistics.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    title: "คลังสินค้าทัณฑ์บน & Distribution",
    desc: "Bonded warehouse และศูนย์กระจายสินค้า เชื่อมต่อ customs pre-clearance สู่ GMS",
    image: "/images/logistics-warehouse.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "ชิ้นส่วน EV & ยานยนต์",
    desc: "รองรับการผลิตชิ้นส่วน EV และยานยนต์ Nearshore จาก EEC ด้วยมาตรฐานระดับสากล",
    image: "/images/auto-parts-factory.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-5 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    title: "พลังงานหมุนเวียน & BCG",
    desc: "สนับสนุนอุตสาหกรรมพลังงานสะอาด โซลาร์ ชีวมวล และ BCG Economy เพื่อการพัฒนาอย่างยั่งยืน",
    image: "/images/power-infrastructure.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function IndustriesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const indexRef = useRef(0);
  const scrollingRef = useRef(false);

  const scrollTo = useCallback((index: number) => {
    const el = carouselRef.current;
    const card = el?.querySelector(".industry-card") as HTMLElement;
    if (!el || !card) return;
    const amount = card.offsetWidth + 24;
    scrollingRef.current = true;
    el.scrollTo({ left: index * amount, behavior: "smooth" });
    indexRef.current = index;
    setActiveIndex(index);
    setTimeout(() => { scrollingRef.current = false; }, 600);
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollingRef.current) return;
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector(".industry-card") as HTMLElement;
    if (!card) return;
    const amount = card.offsetWidth + 24;
    const idx = Math.round(el.scrollLeft / amount);
    indexRef.current = idx;
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      const next = (indexRef.current + 1) % INDUSTRIES.length;
      scrollTo(next);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, scrollTo]);

  return (
    <section id="industries" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel number="04" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="text-3xl font-black text-text-dark">
            เราออกแบบมาเพื่อ
            <br />
            อุตสาหกรรมเหล่านี้
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              className="w-11 h-11 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/5"
              aria-label="ก่อนหน้า"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo(Math.min(INDUSTRIES.length - 1, activeIndex + 1))}
              className="w-11 h-11 rounded-full border-2 border-primary bg-primary text-white flex items-center justify-center transition-all duration-300 hover:bg-primary-dark"
              aria-label="ถัดไป"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-snap-x mandatory pb-4"
          >
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 18,
                  mass: 0.8,
                  delay: i * 0.08,
                }}
                className="industry-card min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(33.333%-1rem)] flex-shrink-0 scroll-snap-align-start rounded-2xl overflow-hidden bg-white border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="h-[220px] overflow-hidden">
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    width={400}
                    height={220}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {ind.icon}
                  </div>
                  <h3 className="text-lg font-bold text-text-dark mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mt-8"
        >
          {INDUSTRIES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                i === activeIndex
                  ? "bg-primary w-11 h-11"
                  : "bg-gray-300 w-11 h-11"
              }`}
              aria-label={`หน้า ${i + 1}`}
            >
              <span className={`rounded-full transition-all ${
                i === activeIndex
                  ? "bg-primary w-6 h-2"
                  : "bg-gray-300 w-2 h-2"
              }`} />
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

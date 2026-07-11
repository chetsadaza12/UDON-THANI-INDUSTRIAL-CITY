"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";

const INDUSTRIES = [
  {
    title: "ชิ้นส่วนยานยนต์",
    desc: "รองรับการผลิตชิ้นส่วนยานยนต์และอุตสาหกรรมต่อเนื่อง ด้วยมาตรฐานระดับสากล",
    image: "/images/auto-parts-factory.png",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    title: "โลจิสติกส์และคลังสินค้า",
    desc: "ศูนย์กลางกระจายสินค้าสู่อนุภูมิภาคลุ่มแม่น้ำโขง เชื่อมโยงการขนส่งทุกรูปแบบ",
    image: "/images/logistics-warehouse.png",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "อาหารแปรรูป",
    desc: "เชื่อมต่อแหล่งวัตถุดิบการเกษตรชั้นเลิศของภาคอีสาน สู่การแปรรูปส่งออกทั่วโลก",
    image: "/images/train-logistics.png",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    title: "อิเล็กทรอนิกส์อัจฉริยะ",
    desc: "ศูนย์รวมการผลิตชิ้นส่วนอิเล็กทรอนิกส์และเทคโนโลยีอัจฉริยะแห่งใหม่ของอาเซียน",
    image: "/images/auto-parts-factory.png",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
  },
  {
    title: "พลังงานสะอาด",
    desc: "สนับสนุนอุตสาหกรรมพลังงานทดแทนและเทคโนโลยีสีเขียวเพื่อการพัฒนาอย่างยั่งยืน",
    image: "/images/logistics-warehouse.png",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function IndustriesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const card = carouselRef.current?.querySelector(".industry-card") as HTMLElement;
    if (!card) return;
    const amount = card.offsetWidth + 24; // 24px gap
    carouselRef.current?.scrollTo({ left: index * amount, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector(".industry-card") as HTMLElement;
    if (!card) return;
    const amount = card.offsetWidth + 24;
    setActiveIndex(Math.round(el.scrollLeft / amount));
  };

  return (
    <section id="industries" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel number="04" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="text-3xl font-extrabold text-text-dark">
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
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo(Math.min(4, activeIndex + 1))}
              className="w-11 h-11 rounded-full border-2 border-primary bg-primary text-white flex items-center justify-center transition-all duration-300 hover:bg-primary-dark"
              aria-label="ถัดไป"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-snap-x mandatory pb-4"
          >
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.title}
                className="industry-card min-w-[calc(33.333%-1rem)] flex-shrink-0 scroll-snap-align-start rounded-2xl overflow-hidden bg-white border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
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
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mt-8"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "bg-primary w-6"
                  : "bg-gray-300 w-2"
              }`}
              aria-label={`หน้า ${i + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

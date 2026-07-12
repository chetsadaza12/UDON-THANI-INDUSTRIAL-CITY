"use client";

import { motion } from "motion/react";
import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";
import CountUp from "./ui/CountUp";

const STATS = [
  { label: "พื้นที่โครงการ", value: 2170, unit: " ไร่", note: "นิคมฯ แห่งแรกของภาคอีสาน" },
  { label: "เงินลงทุนเป้าหมาย", value: 22000, unit: " ล้านบาท", note: "สร้างงาน 20,000+ ตำแหน่ง" },
  { label: "รายได้รัฐต่อปี", value: 2000, unit: " ล้านบาท", note: "เสริมเศรษฐกิจอีสานตอนบน" },
];

const UTILITIES = [
  { label: "กำลังไฟฟ้า", value: 100, unit: " MW" },
  { label: "น้ำประปา", value: 8000, unit: " ลบ.ม. / วัน" },
  { label: "บำบัดน้ำเสีย", value: 6400, unit: " ลบ.ม. / วัน" },
];

export default function GrowthSection() {
  return (
    <section id="growth" className="py-24 bg-offwhite overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* === Top Row: Label + Heading + Image === */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-x-20 gap-y-10 mb-20">
          {/* Left: Text block */}
          <div>
            <SectionLabel number="03" />
            <h2 className="text-4xl lg:text-5xl font-black text-text-dark leading-[1.1] mt-4">
              โครงสร้างพื้นฐาน<br />
              <span className="text-primary">ครบวงจร</span> พร้อม<br />
              รองรับทุกธุรกิจ
            </h2>
            <p className="text-text-light mt-6 text-base leading-relaxed max-w-sm">
              นิคมอุตสาหกรรมแห่งแรกของภาคอีสาน ออกแบบมาเพื่อ
              เป็นศูนย์กลางอุตสาหกรรมและโลจิสติกส์แห่งอนุภูมิภาคลุ่มน้ำโขง
            </p>

            {/* Inline utility row — desktop only */}
            <div className="hidden lg:flex gap-8 mt-10 pt-8 border-t border-gray-100">
              {UTILITIES.map((u) => (
                <div key={u.label}>
                  <div className="text-xs text-text-light uppercase tracking-wider mb-1">
                    {u.label}
                  </div>
                  <div className="text-lg font-bold text-text-dark">
                    <CountUp value={u.value} suffix={` ${u.unit}`} duration={1.8} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Large feature image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.2, 0.6, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px]">
              <Image
                src="/images/power-infrastructure.png"
                alt="โครงสร้างพื้นฐาน"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            {/* Floating label pill — breaks the image edge */}
            <div className="absolute -bottom-4 left-6 bg-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              ระบบไฟฟ้า 100 MW — เสถียรเต็มกำลัง
            </div>
          </motion.div>
        </div>

        {/* === Big Numbers Row (3 stats spanning full width) === */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white p-8 lg:p-10"
            >
              <span className="text-xs font-semibold text-text-light uppercase tracking-widest">
                {s.label}
              </span>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-text-dark mt-3 mb-2 tracking-tight">
                <span className="whitespace-nowrap">
                  <CountUp value={s.value} suffix={s.unit} duration={2.5} />
                </span>
              </div>
              <p className="text-sm text-text-light">{s.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile utility row */}
        <div className="lg:hidden grid grid-cols-3 gap-3 mt-6">
          {UTILITIES.map((u) => (
            <div key={u.label} className="text-center py-3">
              <div className="text-xs text-text-light mb-1">{u.label}</div>
              <div className="text-sm font-bold text-text-dark">
                <CountUp value={u.value} suffix={` ${u.unit}`} duration={1.8} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

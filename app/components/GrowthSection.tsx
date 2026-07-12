"use client";

import { motion } from "motion/react";
import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";
import CountUp from "./ui/CountUp";

const INFRA_STATS = [
  {
    label: "พื้นที่กว่า",
    value: 2170,
    unit: " ไร่",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    label: "เงินลงทุน",
    value: 22000,
    unit: " ล้านบาท",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "จ้างงานกว่า",
    value: 20000,
    unit: " ตำแหน่ง",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "ไฟฟ้ากำลังผลิต",
    value: 100,
    unit: " MW",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    label: "น้ำประปา",
    value: 8000,
    unit: " ลบ.ม./วัน",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      </svg>
    ),
  },
  {
    label: "ระบบบำบัดน้ำเสีย",
    value: 6400,
    unit: " ลบ.ม./วัน",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
];

export default function GrowthSection() {
  return (
    <section id="growth" className="py-24 bg-offwhite">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
            className="rounded-2xl overflow-hidden shadow-xl group"
          >
            <Image
              src="/images/power-infrastructure.png"
              alt="โครงสร้างพื้นฐาน สายส่งไฟฟ้าแรงสูง"
              width={600}
              height={400}
              className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
          >
            <SectionLabel number="03" />
            <h2 className="text-4xl font-extrabold text-text-dark leading-tight mb-2">
              พร้อมรองรับ
              <br />
              การเติบโตของธุรกิจ
            </h2>
            <p className="text-sm text-text-light mb-8">
              นิคมอุตสาหกรรมแห่งแรกของภาคอีสาน พร้อมโครงสร้างพื้นฐานครบวงจร
            </p>

            <div className="flex flex-col gap-5">
              {INFRA_STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-4 py-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    {stat.icon}
                  </div>
                  <span className="text-base text-text-dark">
                    {stat.label}{" "}
                    <strong className="font-extrabold text-primary">
                      <CountUp value={stat.value} suffix={stat.unit} duration={2} />
                    </strong>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

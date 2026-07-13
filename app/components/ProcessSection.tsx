"use client";

import { motion } from "motion/react";
import SectionLabel from "./ui/SectionLabel";

const STEPS = [
  {
    number: "01",
    title: "ติดต่อทีมงาน",
    desc: "",
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
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "รับคำปรึกษา",
    desc: "วิเคราะห์ความต้องการเพื่อวางแผนการลงทุน",
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
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "เลือกพื้นที่",
    desc: "เลือกทำเลที่เหมาะสมกับธุรกิจของคุณ",
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
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "ดำเนินการเอกสาร",
    desc: "เราช่วยดำเนินการเอกสารและสิทธิประโยชน์",
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
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "เปิดดำเนินธุรกิจ",
    desc: "พร้อมเปิดดำเนินธุรกิจหลังเสร็จสิ้นการลงทุน",
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
      >
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="hidden sm:block py-24 bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white relative overflow-hidden">
      {/* Decorative circle — contained by overflow-hidden on parent */}
      <div className="absolute -top-1/4 -right-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-white/5 rounded-full" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12 items-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
          >
            <SectionLabel number="06" light />
            <h2 className="text-4xl font-black leading-tight mb-4">
              เริ่มต้นธุรกิจ
              <br />
              ง่ายกว่าที่คิด
            </h2>
            <p className="text-sm opacity-80 leading-relaxed">
              เรามีทีมงานมืออาชีพ
              <br />
              คอยดูแลคุณในทุกขั้นตอน
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="text-center p-4 sm:p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/15 transition-all duration-300 hover:bg-white/15 hover:-translate-y-1"
              >
                <div className="text-xl font-extrabold opacity-60 mb-3">
                  {step.number}
                </div>
                <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h4 className="text-sm font-bold mb-2">{step.title}</h4>
                {step.desc && (
                  <p className="text-xs opacity-70 leading-relaxed">{step.desc}</p>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

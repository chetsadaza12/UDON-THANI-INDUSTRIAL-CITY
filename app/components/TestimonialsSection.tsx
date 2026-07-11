"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "./ui/SectionLabel";

const BENEFITS = [
  {
    value: "35%",
    label: "ลดต้นทุนขนส่ง",
    detail: "ด้วยทำเลที่ตั้งเชื่อมต่อการขนส่งทุกเส้นทาง",
  },
  {
    value: "2 เท่า",
    label: "ขยายพื้นที่คลังสินค้าเพิ่ม",
    detail: "ภายในระยะเวลา 3 ปี",
  },
  {
    value: "",
    label: "เพิ่มประสิทธิภาพการดำเนินงาน",
    detail: "และรองรับการเติบโตในอนาคต",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-offwhite">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-start justify-between mb-10"
        >
          <div>
            <SectionLabel number="05" />
            <h2 className="text-3xl font-extrabold text-text-dark mt-2">
              ผู้ประกอบการกว่า 150 ราย
              <br />
              เลือกอุดรธานี
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.17, 0.55, 0.55, 1] }}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] rounded-2xl bg-white shadow-lg"
        >
          {/* Left image — slide from left, leave to left */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
            className="overflow-hidden max-md:h-[250px]"
          >
            <Image
              src="/images/logistics-warehouse.png"
              alt="ABC Logistics Co., Ltd."
              width={400}
              height={350}
              className="w-full h-full object-cover min-h-[350px]"
            />
          </motion.div>

          {/* Center info */}
          <div className="p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-text-dark mb-2">
              ABC Logistics Co., Ltd.
            </h3>
            <p className="text-sm text-text-light mb-6 pb-6 border-b border-gray-200">
              ธุรกิจ : โลจิสติกส์และคลังสินค้า
            </p>

            <div className="flex flex-col gap-4">
              {BENEFITS.map((b) => (
                <div key={b.label} className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C41E3A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="text-sm text-text-dark leading-relaxed">
                    {b.label}{" "}
                    {b.value && (
                      <strong className="text-primary font-bold">
                        {b.value}
                      </strong>
                    )}
                    {b.detail && (
                      <>
                        <br />
                        <span className="text-gray-400 text-xs">{b.detail}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image — slide from right, leave to right */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
            className="overflow-hidden max-md:hidden"
          >
            <Image
              src="/images/train-logistics.png"
              alt="การขนส่งสินค้า"
              width={400}
              height={350}
              className="w-full h-full object-cover min-h-[350px]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-300 rounded-full font-semibold text-sm text-text-dark transition-all duration-300 hover:border-primary hover:text-primary"
          >
            ดูกรณีศึกษาทั้งหมด
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
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import SectionLabel from "./ui/SectionLabel";

const ZONES = [
  {
    name: "เขตอุตสาหกรรมทั่วไป",
    desc: "สำหรับโรงงาน คลังสินค้า และธุรกิจอุตสาหกรรมทั่วไป รองรับทั้งการผลิตเพื่อจำหน่ายในประเทศและส่งออก",
    price: "5,000,000",
    unit: "บาท/ไร่",
    features: ["การผลิตเพื่อจำหน่ายในประเทศ", "การผลิตเพื่อส่งออก", "คลังสินค้าและโลจิสติกส์"],
  },
  {
    name: "เขตประกอบการเสรี (Free Zone)",
    desc: "สำหรับธุรกิจนำเข้า–ส่งออกและโรงงานเพื่อการส่งออก พร้อมสิทธิประโยชน์ด้านภาษีและศุลกากร",
    price: "6,000,000",
    unit: "บาท/ไร่",
    features: ["สิทธิประโยชน์ทางภาษี", "ยกเว้นอากรศุลกากร", "นำเข้า–ส่งออกเสรี"],
    highlight: true,
  },
  {
    name: "เขตพาณิชยกรรม",
    desc: "สำหรับสำนักงาน ร้านค้า ร้านอาหาร โรงแรม และธุรกิจบริการที่สนับสนุนการดำเนินงานภายในนิคม",
    price: "6,000,000",
    unit: "บาท/ไร่",
    features: ["สำนักงาน", "ร้านค้าและร้านอาหาร", "โรงแรมและธุรกิจบริการ"],
  },
];

export default function CalculatorSection() {
  return (
    <section id="calculator" className="py-24 bg-offwhite">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionLabel number="07" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-text-dark leading-tight">
                ประเภทพื้นที่และ
                <br />
                ราคาจำหน่าย
              </h2>
              <p className="text-text-light mt-3 max-w-xl">
                นิคมอุตสาหกรรมอุดรธานีแบ่งพื้นที่ออกเป็น 3 ประเภท
                เพื่อรองรับการลงทุนในด้านอุตสาหกรรม การส่งออก และธุรกิจบริการ
              </p>
            </div>
          </div>
        </motion.div>

        {/* Zone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ZONES.map((zone, i) => (
            <motion.div
              key={zone.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.17, 0.55, 0.55, 1] }}
              className={`relative rounded-2xl bg-white border overflow-hidden flex flex-col ${
                zone.highlight
                  ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary"
                  : "border-gray-200 shadow-sm"
              }`}
            >
              {/* Highlight badge */}
              {zone.highlight && (
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wide">
                  แนะนำ
                </div>
              )}

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                {/* Name */}
                <h3 className="text-lg font-black text-text-dark mb-3">
                  {zone.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-light leading-relaxed mb-6">
                  {zone.desc}
                </p>

                {/* Features */}
                <ul className="flex-1 flex flex-col gap-2 mb-6">
                  {zone.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-text-dark">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C41E3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-5">
                  <div className="text-xs text-text-light mb-1">ราคาจำหน่าย</div>
                  <div className="text-3xl font-black text-primary">
                    {zone.price}
                    <span className="text-sm font-bold text-text-light ml-1">
                      {zone.unit}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-xs text-text-light italic"
        >
          หมายเหตุ: ราคาดังกล่าวเป็นราคาจำหน่ายเบื้องต้น
          อาจมีการเปลี่ยนแปลงตามเงื่อนไขและประกาศของผู้พัฒนาโครงการในแต่ละช่วงเวลา
        </motion.p>
      </div>
    </section>
  );
}

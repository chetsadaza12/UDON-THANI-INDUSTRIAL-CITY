"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import SectionLabel from "./ui/SectionLabel";

const SLIDER_VALUES = [5, 20, 50, 100, 200];
const SLIDER_LABELS = ["5 ไร่", "20 ไร่", "50 ไร่", "100 ไร่", "200 ไร่+"];

interface Result {
  zone: string;
  utilities: string[];
  services: string[];
}

function getResults(value: number): Result {
  if (value <= 20) {
    return {
      zone: "โซนอุตสาหกรรมขนาดเล็ก (Light Industrial Zone)",
      utilities: [
        "ไฟฟ้า 50 MW",
        "น้ำประปา 3,000 ลบ.ม./วัน",
        "ระบบบำบัดน้ำเสีย 2,500 ลบ.ม./วัน",
      ],
      services: [
        "บริการรักษาความปลอดภัย",
        "บริการอินเทอร์เน็ตความเร็วสูง",
      ],
    };
  } else if (value <= 80) {
    return {
      zone: "โซนอุตสาหกรรมทั่วไป (General Zone)",
      utilities: [
        "ไฟฟ้า 100 MW",
        "น้ำประปา 8,000 ลบ.ม./วัน",
        "ระบบบำบัดน้ำเสีย 6,400 ลบ.ม./วัน",
      ],
      services: [
        "บริการรักษาความปลอดภัย",
        "บริการดำเนินเอกสารลงทุน",
        "บริการโลจิสติกส์ครบวงจร",
      ],
    };
  } else {
    return {
      zone: "โซนอุตสาหกรรมขนาดใหญ่ (Heavy Industrial Zone)",
      utilities: [
        "ไฟฟ้า 200 MW",
        "น้ำประปา 15,000 ลบ.ม./วัน",
        "ระบบบำบัดน้ำเสีย 12,000 ลบ.ม./วัน",
      ],
      services: [
        "บริการรักษาความปลอดภัยขั้นสูงสุด",
        "บริการศูนย์ศุลกากรภายในพื้นที่",
        "บริการคลังสินค้าและโลจิสติกส์พิเศษ",
      ],
    };
  }
}

export default function CalculatorSection() {
  const [sliderIndex, setSliderIndex] = useState(2); // 50 rai default
  const displayValue = SLIDER_VALUES[sliderIndex];
  const results = getResults(displayValue);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderIndex(parseInt(e.target.value, 10));
  }, []);

  const percentage = ((sliderIndex) / (SLIDER_VALUES.length - 1)) * 100;

  return (
    <section id="calculator" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionLabel number="07" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
          >
            <h2 className="text-3xl font-black text-text-dark leading-tight mb-6">
              ประเมินความต้องการพื้นที่
              <br />
              สำหรับธุรกิจของคุณ
            </h2>
            <p className="text-sm text-text-light mb-8">เลือกขนาดพื้นที่โดยประมาณ</p>

            <div className="mt-8">
              <div className="text-6xl font-black text-primary mb-1">
                {displayValue}
              </div>
              <div className="text-lg text-text-light mb-6">ไร่</div>

              <input
                type="range"
                min={0}
                max={SLIDER_VALUES.length - 1}
                value={sliderIndex}
                onChange={handleChange}
                className="w-full mt-6 mb-4"
                style={{
                  background: `linear-gradient(to right, #C41E3A 0%, #C41E3A ${percentage}%, #E0E0E0 ${percentage}%, #E0E0E0 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-text-light">
                {SLIDER_LABELS.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
            className="p-8 bg-offwhite rounded-2xl border border-gray-200"
          >
            <h3 className="text-xl font-bold text-text-dark mb-8 pb-4 border-b border-gray-200">
              ผลลัพธ์ที่แนะนำ
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-5 bg-white rounded-xl border border-gray-200">
                <h4 className="text-sm font-bold text-text-dark mb-4">โซนที่แนะนำ</h4>
                <p className="text-xs text-text-light flex items-start gap-2">
                  <span className="text-primary font-bold shrink-0">›</span>
                  {results.zone}
                </p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200">
                <h4 className="text-sm font-bold text-text-dark mb-4">สาธารณูปโภคที่รองรับ</h4>
                <ul className="flex flex-col gap-2">
                  {results.utilities.map((u) => (
                    <li key={u} className="text-xs text-text-light flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">›</span>
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200">
                <h4 className="text-sm font-bold text-text-dark mb-4">บริการเพิ่มเติม</h4>
                <ul className="flex flex-col gap-2">
                  {results.services.map((s) => (
                    <li key={s} className="text-xs text-text-light flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">›</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 text-xs text-gray-400 italic">
              หมายเหตุ : ข้อมูลเบื้องต้นเพื่อการประเมินเบื้องต้น กรุณาติดต่อทีมงานเพื่อรับข้อมูลที่ครบถ้วนมากยิ่งขึ้น
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Button from "./ui/Button";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 -z-10">
        <motion.img
          src="/images/hero-bg.png"
          alt="เมืองอุตสาหกรรมอุดรธานี ภาพถ่ายทางอากาศ"
          className="w-full h-full object-cover"
          style={{ y: bgY, scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 via-30% via-black/20 via-60% to-transparent" />
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 ml-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
          className="relative z-10 text-white max-w-[650px] pt-28"
        >
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-tight mb-6 drop-shadow-lg">
            เมืองอุตสาหกรรม
            <br />
            อุดรธานี
          </h1>
          <p className="text-lg font-light leading-relaxed mb-10 opacity-90 drop-shadow-md">
            ประตูการลงทุนสู่ภูมิภาคลุ่มแม่น้ำโขง
            <br />
            รองรับอุตสาหกรรมยุคใหม่
            <br />
            พร้อมโครงสร้างพื้นฐานครบวงจร
          </p>
          <Button href="#strategic">สำรวจศักยภาพ</Button>
        </motion.div>
      </div>
    </section>
  );
}

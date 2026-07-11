"use client";

import { motion } from "motion/react";
import SectionLabel from "./ui/SectionLabel";
import Button from "./ui/Button";
import ContactForm from "./ContactForm";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="py-24 relative overflow-hidden text-white"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/hero-bg.png') center/cover no-repeat`,
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-light" />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* CTA Header */}
        <div className="text-center mb-16">
          <SectionLabel number="08" light className="justify-center" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
            className="text-[clamp(1.75rem,3vw,2.25rem)] font-black leading-snug mb-4"
          >
            พร้อมขยายธุรกิจ
            <br />
            สู่<span className="text-primary">ศูนย์กลางเศรษฐกิจอีสาน</span>
            แล้วหรือยัง?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-base text-white/85 max-w-[600px] mx-auto mb-8 leading-relaxed"
          >
            ทีมงานพร้อมให้คำปรึกษาและดูแลคุณในทุกขั้นตอนการลงทุน
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button href="#" variant="white">
              ขอใบเสนอราคา
            </Button>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold text-center mb-8">
            ติดต่อเราโดยตรง
          </h3>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

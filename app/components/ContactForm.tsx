"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4 bg-white/10 backdrop-blur rounded-xl border border-white/20">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">ขอบคุณที่สนใจ!</h3>
        <p className="text-white/80">ทีมงานจะติดต่อกลับโดยเร็วที่สุด</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            ชื่อ-นามสกุล *
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/15 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
            placeholder="กรุณากรอกชื่อ-นามสกุล"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
            เบอร์โทรศัพท์ *
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 bg-white/15 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
            placeholder="กรุณากรอกเบอร์โทรศัพท์"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
          อีเมล
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 bg-white/15 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
          placeholder="example@email.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
          ข้อความ / ความต้องการ
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 bg-white/15 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all resize-none"
          placeholder="แจ้งความต้องการหรือสอบถามข้อมูลเพิ่มเติม"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3.5 bg-white text-primary font-bold rounded-lg transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
      >
        ส่งข้อความ
      </button>
    </form>
  );
}

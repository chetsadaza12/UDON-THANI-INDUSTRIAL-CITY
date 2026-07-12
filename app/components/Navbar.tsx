"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#hero", label: "หน้าหลัก" },
  { href: "#strategic", label: "เกี่ยวกับเมืองฯ" },
  { href: "#industries", label: "บริการของเรา" },
  { href: "#testimonials", label: "ส่งเสริมผู้ประกอบการ" },
  { href: "#calculator", label: "ข่าวสาร" },
  { href: "#cta", label: "ติดต่อเรา" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/97 backdrop-blur-xl shadow-md border-gray-100"
          : "bg-white/97 backdrop-blur-xl border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between py-3">
        <Link href="#" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/logo.jpeg"
            alt="โลโก้เมืองอุตสาหกรรมอุดรธานี"
            width={40}
            height={40}
            className="w-11 h-11 rounded"
          />
          <div className="text-sm font-bold text-text-dark leading-tight">
            เมืองอุตสาหกรรมอุดรธานี
            <span className="block text-xs font-normal text-text-light uppercase tracking-wide">
              UDON THANI INDUSTRIAL CITY
            </span>
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="relative text-sm font-medium text-gray-600 hover:text-primary transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#cta"
            className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-primary-dark hover:-translate-y-px hover:shadow-lg hover:shadow-primary/30"
          >
            ขอใบเสนอราคา
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col items-center justify-center gap-1.5 bg-none w-11 h-11"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"}
        >
          <span
            className={`block w-6 h-0.5 bg-text-dark rounded-sm transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-dark rounded-sm transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-dark rounded-sm transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 border-t border-gray-200" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-6 bg-white shadow-xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="px-4 py-3.5 rounded-lg text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#cta"
            onClick={closeMenu}
            className="bg-primary text-white px-5 py-3.5 rounded-lg font-semibold text-sm text-center mt-2 hover:bg-primary-dark transition-colors"
          >
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </nav>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-6">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-sm font-bold">
          เมืองอุตสาหกรรมอุดรธานี
        </div>
        <div className="flex items-center gap-5 text-xs text-white/60">
          <span>© 2026 Udon Thani Industrial City</span>
          <Link href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</Link>
        </div>
      </div>
    </footer>
  );
}

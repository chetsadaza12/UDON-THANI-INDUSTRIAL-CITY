import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "white";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  showArrow?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white border-2 border-primary hover:bg-primary-dark hover:border-primary-dark hover:shadow-lg hover:shadow-primary/30",
  outline:
    "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30",
  white:
    "bg-white text-primary border-2 border-white hover:bg-white/90 hover:shadow-lg hover:shadow-white/20",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  showArrow = true,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 ${variantClasses[variant]} ${className}`}
    >
      {children}
      {showArrow && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )}
    </Link>
  );
}

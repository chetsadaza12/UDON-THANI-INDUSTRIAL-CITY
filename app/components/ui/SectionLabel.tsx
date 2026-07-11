interface SectionLabelProps {
  number: string;
  className?: string;
  light?: boolean;
}

export default function SectionLabel({
  number,
  className = "",
  light = false,
}: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-4 text-xl font-semibold mb-6 ${
        light ? "text-white" : "text-text-light"
      } ${className}`}
    >
      {number}
      <span
        className={`w-[60px] h-[3px] rounded-sm ${
          light ? "bg-white" : "bg-primary"
        }`}
      />
    </div>
  );
}

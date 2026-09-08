type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
};

export default function BentoCard({
  title,
  children,
  className = "",
  dark = false,
}: Props) {
  return (
    <div
      className={`
      flex
      h-full
      flex-col
      rounded-[24px]
      border
      p-6
      shadow-sm
      transition-all
      hover:-translate-y-1
      hover:shadow-lg
      ${dark ? "border-slate-800 bg-slate-900 text-white" : "border-slate-200 bg-white"}
      ${className}
    `}
    >
      <p
        className={`mb-3 text-xs font-semibold uppercase tracking-wider ${
          dark ? "text-slate-400" : "text-slate-400"
        }`}
      >
        {title}
      </p>

      <div className="flex-1">{children}</div>
    </div>
  );
}

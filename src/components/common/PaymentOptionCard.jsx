export default function PaymentOptionCard({
  iconSrc,
  label = "Pay",
  title,
  description,
  methodLabel,
  onClick,
  highlight,
  className = "",
}) {
  return (
    <div
      className={`group relative rounded-[32px] p-6 text-left flex flex-col justify-between transition-all duration-300 shadow-lg border border-white/10 bg-gradient-to-br from-[#1b1f2c] to-[#141925] hover:from-[#1de9b6]/10 hover:to-[#008cff]/10 hover:border-cyan-500/50 ${className}`}
    >
      {/* Highlight badge */}
      {highlight && (
        <div className="absolute top-4 right-4 bg-emerald-400 text-[#0f1b44] text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {highlight}
        </div>
      )}

      {/* Icon */}
      {iconSrc && (
        <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-[#1de9b6] to-[#008cff] flex items-center justify-center group-hover:from-cyan-300 group-hover:to-blue-400">
          <img src={iconSrc} alt={title} className="w-10 h-10" />
        </div>
      )}

      {/* Title and Method */}
      <div className="flex-grow mb-6">
        <h3 className="text-[24px] font-grifter mb-1 text-white group-hover:text-white">
          {title}
        </h3>
        <h4 className="font-aeonik px-2 mb-2 text-white group-hover:text-white">
          {description}
        </h4>
        {methodLabel && (
          <span className="inline-block text-xs bg-gradient-to-br from-[#1de9b6] to-[#008cff] text-white rounded-full px-3 py-0.5 font-aeonik group-hover:from-cyan-300 group-hover:to-blue-400">
            {methodLabel}
          </span>
        )}
      </div>

      {/* Pay Button */}
      <button
        onClick={onClick}
        className="w-full rounded-full py-2 text-sm h-12 font-gilroy font-[14px, bold] border border-white text-white bg-transparent group-hover:bg-[#008cff] transition-all duration-300"
      >
        {label}
      </button>
    </div>
  );
}

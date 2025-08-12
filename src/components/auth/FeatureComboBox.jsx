import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FeatureComboBox({ title, content }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border rounded-[20px] px-6 py-4 text-white shadow-md transition-all duration-300 font-grifter ${
        open ? "border-cyan-400" : "border-[#d9d9d9]"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left font-grifter text-[16px] text-white/90 hover:text-white"
      >
        <span>{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && (
        <div className="mt-3 text-sm text-white/70 leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
}

export default function AccountInfo({ user }) {
  const info = [
    { label: "Email", value: user.email, status: "Verified" },
    { label: "Name", value: user.name, status: "Set" },
  ];

  return (
    <section className="w-full max-w-2xl mx-auto text-white">
      <h2 className="text-xl font-grifter mb-4">Account</h2>

      <div className="space-y-3">
        {info.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-4 py-3 border border-white/10 rounded-xl bg-white/5"
          >
            <span className="text-sm font-aeonik text-white/90">
              {item.label}
            </span>
            <div className="text-right">
              <div className="text-sm text-emerald-400 font-aeonik">
                {item.value}
              </div>
              <div className="text-xs text-white/50">{item.status}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

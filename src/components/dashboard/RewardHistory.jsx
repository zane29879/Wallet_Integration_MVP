import Table from "../common/Table";

// src/components/dashboard/RewardHistory.jsx
export default function RewardHistory({ data = [] }) {
  const columns = ["Date", "Reward Source", "Tokens", "Note"];

  const tableData = data.map((his) => ({
    date: new Date(his.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }),
    reward_source: (
      <span className="text-white font-aeonik whitespace-nowrap">
        {his.source}
      </span>
    ),
    tokens: (
      <span className="text-emerald-400 font-aeonik whitespace-nowrap">
        {his.tokens}
      </span>
    ),
    note: (
      <span className="text-white/70 text-sm whitespace-nowrap">
        {his.note}
      </span>
    ),
  }));

  const totalTokens = data.reduce((sum, his) => sum + (his.tokens || 0), 0);

  return (
    <section className="w-full max-w-8xl mx-auto mb-10 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-grifter">Reward History</h2>
        <p className="text-sm font-aeonik text-cyan-400">
          PAY earned so far{" "}
          <span className="text-emerald-400">{totalTokens}</span> Tokens
        </p>
      </div>

      <div className=" border border-white/10 rounded-2xl overflow-hidden shadow-inner">
        {/* Gradient header row */}
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-aeonik px-6 py-3 rounded-t-2xl grid grid-cols-4 gap-4">
          {columns.map((col, idx) => (
            <div key={idx} className="whitespace-nowrap overflow-hidden">
              {col}
            </div>
          ))}
        </div>

        {/* Table body */}
        <div className="divide-y divide-white/10">
          <Table
            columns={columns}
            data={tableData}
            hideHeader
            rowClassName="px-6 py-4 grid grid-cols-4 gap-4 items-center hover:bg-white/5 transition-all"
          />
        </div>
      </div>
    </section>
  );
}

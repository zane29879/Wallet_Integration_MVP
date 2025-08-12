import React, { useState } from "react";
import Table from "../common/Table";

export default function PurchaseHistory({ data = [] }) {
  const [methodFilter, setMethodFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const columns = [
    "Date",
    "Merchant",
    "Item",
    "Amount Paid",
    "Payment Method",
    "Status",
    "Rewards Earned",
  ];

  const filteredData = data
    .filter((item) =>
      methodFilter === "All" ? true : item.payment_method === methodFilter
    )
    .filter((item) =>
      statusFilter === "All" ? true : item.status === statusFilter
    )
    .map((his) => ({
      date: new Date(his.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
      merchant: (
        <span className="text-white font-aeonik whitespace-nowrap">
          {his.merchant_name}
        </span>
      ),
      item: <span className="text-white/80 whitespace-nowrap">{his.item}</span>,
      amount_paid: (
        <span className="text-white whitespace-nowrap">
          ${his.amount_paid.toFixed(2)}
        </span>
      ),
      payment_method: (
        <span className="text-white whitespace-nowrap">
          {his.payment_method}
        </span>
      ),
      status: (
        <span
          className={`font-aeonik text-sm whitespace-nowrap ${
            his.status === "Completed"
              ? "text-green-400"
              : his.status === "Failed"
              ? "text-red-500"
              : "text-yellow-400"
          }`}
        >
          {his.status}
        </span>
      ),
      reward_earned: (
        <span className="text-white whitespace-nowrap">
          {his.points > 0 ? `${his.points} pts (5%)` : "-"}
        </span>
      ),
    }));

  return (
    <section className="w-full max-w-8xl mx-auto mb-10 text-white">
      <div className="flex justify-between w-full mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-grifter">Purchase History</h2>

        <div className="flex gap-2">
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="bg-[#1c1f26] border border-white/10 rounded-full px-4 py-1 text-sm text-white"
          >
            <option>All</option>
            <option>Crypto</option>
            <option>Via Credit Card</option>
            <option>Bank</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1c1f26] border border-white/10 rounded-full px-4 py-1 text-sm text-white"
          >
            <option>All</option>
            <option>Completed</option>
            <option>Failed</option>
            <option>Applied</option>
          </select>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="w-full overflow-x-auto">
        <div className="border border-white/10 rounded-2xl overflow-hidden shadow-inner">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-aeonik px-6 py-3 rounded-t-2xl grid grid-cols-7 gap-4">
            {columns.map((col, idx) => (
              <div
                key={idx}
                className="whitespace-nowrap text-center overflow-hidden"
              >
                {col}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/10">
            <Table
              columns={columns}
              data={filteredData}
              hideHeader
              rowClassName="px-6 py-4 grid grid-cols-7 gap-4 items-center hover:bg-white/5 transition-all text-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

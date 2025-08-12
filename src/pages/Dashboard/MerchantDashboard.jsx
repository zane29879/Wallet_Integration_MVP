import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { Dialog } from "@headlessui/react";

const COLORS = [
  "#00C49F",
  "#0088FE",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#FF6384",
  "#36A2EB",
];

export default function MerchantDashboard() {
  const [sales] = useState([
    { name: "USD", value: 2863.54 },
    { name: "BTC", value: 283.54 },
    { name: "ETH", value: 283.54 },
    { name: "BNB", value: 283.54 },
    { name: "USDT", value: 283.54 },
    { name: "USDC", value: 283.54 },
    { name: "SOL", value: 283.54 },
  ]);

  const [transactions] = useState([
    {
      date: "April 23",
      customer: "Alex Carter",
      amount: "$200.00",
      method: "Credit",
      status: "Confirmed",
    },
    {
      date: "April 22",
      customer: "Ryan Lee",
      amount: "0.05 BT",
      method: "Crypto",
      status: "Confirmed",
    },
    {
      date: "April 22",
      customer: "Emma Reed",
      amount: "$150.00",
      method: "Bank",
      status: "Transfer Refund",
    },
    {
      date: "April 21",
      customer: "Mia Blake",
      amount: "$75.00",
      method: "Credit",
      status: "Confirmed",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const staticUrl =
    "https://paga-alpha.vercel.app/checkout?merchantId=e305bb4c-5f13-49a0-8a28-3258f5b6b657&customerId=5ed89014-c11d-4aca-b492-b3c8c1550d6b&itemId=abc123&quantity=2&price=50&total=100&discount=10&successUrl=https%3A%2F%2Fpaga-alpha.vercel.app%2Fsuccess%3Fsession_id%3D%7BCHECKOUT_SESSION_ID%7D";

  return (
    <div className="h-full text-white px-4 py-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#00ffd1] text-black font-bold px-6 py-2 rounded-full shadow hover:bg-cyan-300 transition"
        >
          Generate QR Code
        </button>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-xl text-center">
            <Dialog.Title className="text-lg font-bold mb-4 text-black">
              Scan to Pay
            </Dialog.Title>
            <QRCodeSVG value={staticUrl} size={200} />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-black text-white rounded-full"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Payout Summary */}
          <div className="rounded-[32px] bg-[#f2f2f2]/10 p-6 space-y-6 shadow-inner">
            <h2 className="font-grifter text-2xl text-white">Payout Summary</h2>
            <div className="bg-[#f2f2f2]/10 px-6 py-5 rounded-[20px] flex justify-between items-center">
              <span className="text-white text-base font-aeonik">
                Total Settled This Month
              </span>
              <span className="text-[#00ffd1] font-aeonik text-base">
                $10,000
              </span>
            </div>
            <div className="bg-[#f2f2f2]/10 px-6 py-5 rounded-[20px] flex justify-between items-center">
              <span className="text-white text-base font-aeonik">
                Pending Payout
              </span>
              <span className="text-[#00ffd1] font-aeonik text-base">
                $2,000
              </span>
            </div>
            <div className="bg-[#f2f2f2]/10 px-6 py-5 rounded-[20px] flex justify-between items-center">
              <span className="text-red-500 text-base font-aeonik">
                Refunds Processed
              </span>
              <span className="text-red-500 font-aeonik text-base">$150</span>
            </div>
            <div className="mt-2">
              <p className="text-sm font-aeonik mb-2">Your Sales Goal</p>
              <div className="relative w-full h-3 bg-[#404452] rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-[#00ffd1] rounded-full"
                  style={{ width: "28%" }}
                />
                <div className="absolute left-[28%] -top-6 text-xs bg-[#0f172a] border border-[#00ffd1] text-white px-2 py-0.5 rounded-full shadow-sm">
                  28%
                </div>
              </div>
            </div>
          </div>

          {/* Rewards & Insights */}
          <div className="rounded-[32px] bg-[#f2f2f2]/10 p-6 space-y-6 shadow-inner">
            <h2 className="font-grifter text-2xl text-white">
              Rewards & Insights
            </h2>
            <div className="bg-[#f2f2f2]/10 px-6 py-5 rounded-[20px] flex justify-between items-center">
              <span className="text-white text-base font-aeonik">
                Total Rewards Given
              </span>
              <span className="text-[#00ffd1] font-aeonik text-base">
                500 Tokens
              </span>
            </div>
            <div className="bg-[#f2f2f2]/10 px-6 py-5 rounded-[20px] flex justify-between items-center">
              <span className="text-white text-base font-aeonik">
                Most Popular Payment
              </span>
              <span className="text-[#00ffd1] font-aeonik text-base">USDC</span>
            </div>
            <div className="bg-[#f2f2f2]/10 px-6 py-5 rounded-[20px] flex justify-between items-center">
              <span className="text-white text-base font-aeonik">
                Transactions
              </span>
              <span className="text-[#00ffd1] font-aeonik text-base">120</span>
            </div>
          </div>
        </div>

        {/* Total Sales */}
        <div className="rounded-[32px] bg-[#f2f2f2]/10 p-6 space-y-6 shadow-inner">
          <h2 className="font-grifter text-2xl text-white">Total Sales</h2>
          <div className="flex flex-col gap-6 items-center">
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sales}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                  >
                    {sales.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm w-full">
              {sales.map((s, i) => (
                <div
                  key={i}
                  className="border border-white/10 bg-[#f2f2f2]/10 rounded-full px-3 py-1 flex items-center gap-2 justify-between"
                >
                  <span className="font-aeonik text-white">{s.name}</span>
                  <span className="text-[#00ffd1]">${s.value.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Full Width */}
      <div className="rounded-[32px] bg-[#f2f2f2]/10 p-6 overflow-auto shadow-inner">
        <h2 className="font-grifter text-2xl text-white mb-4">Transaction</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-400 to-sky-500 text-white">
              <th className="text-left py-3 px-4 rounded-l-full font-aeonik">
                Date
              </th>
              <th className="text-left py-3 px-4 font-aeonik">Customer</th>
              <th className="text-left py-3 px-4 font-aeonik">Amount</th>
              <th className="text-left py-3 px-4 font-aeonik">Method</th>
              <th className="text-left py-3 px-4 rounded-r-full font-aeonik">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-white/90 divide-y divide-[#2a2e3a]">
            {transactions.map((t, i) => {
              const isConfirmed = t.status.toLowerCase().includes("confirm");
              const isRefund = t.status.toLowerCase().includes("refund");
              const statusColor = isConfirmed
                ? "text-[#00ffd1]"
                : isRefund
                ? "text-[#38bdf8]"
                : "text-white";
              return (
                <tr key={i} className="rounded-xl">
                  <td className="py-4 px-4 rounded-l-xl">{t.date}</td>
                  <td className="py-4 px-4">{t.customer}</td>
                  <td className="py-4 px-4">{t.amount}</td>
                  <td className="py-4 px-4">{t.method}</td>
                  <td
                    className={`py-4 px-4 rounded-r-xl font-aeonik flex items-center gap-1 ${statusColor}`}
                  >
                    {t.status}
                    {isConfirmed && (
                      <FaCheckCircle className="text-[#00ffd1]" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

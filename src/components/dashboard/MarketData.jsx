import React from "react";
import Table from "../common/Table";

export default function MarketData(cryptos) {
  const columns = ["Type", "Name", "Price(USD)"];

  const data = cryptos.cryptos.map((crypto) => ({
    type: (
      <div className="flex items-center gap-2 text-white font-aeonik">
        <img src={crypto.icon} alt={crypto.type} className="w-5 h-5" />
        {crypto.type}
      </div>
    ),
    name: <span className="text-white/50 text-sm">{crypto.name}</span>,
    rate: (
      <div className="text-right">
        <p className="text-emerald-400 font-aeonik float-left">
          {crypto.price}
        </p>
        <p
          className={`text-xs ${
            parseFloat(crypto.change) < 0 ? "text-red-400" : "text-green-400"
          }`}
        >
          {crypto.change}
        </p>
      </div>
    ),
  }));

  return (
    <section className="w-full max-w-2xl mx-auto mb-10 text-white">
      <h2 className="text-xl font-grifter mb-4">Market Data</h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-inner">
        <Table columns={columns} data={data} />
      </div>
    </section>
  );
}

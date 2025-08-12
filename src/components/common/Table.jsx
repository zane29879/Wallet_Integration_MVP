import React from "react";

const Table = ({
  columns,
  data = [],
  hideHeader = false,
  rowClassName = "",
}) => {
  return (
    <div className="overflow-auto">
      <table className="w-full table-auto text-sm">
        {!hideHeader && (
          <thead className="bg-white/10 text-white">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="p-3 text-left whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-white/10 last:border-0 ${rowClassName}`}
            >
              {Object.values(row).map((value, i) => (
                <td key={i} className="p-3 whitespace-nowrap overflow-hidden">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

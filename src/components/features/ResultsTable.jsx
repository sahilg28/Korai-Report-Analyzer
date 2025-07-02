import React from "react";
import StatusBadge from "../ui/StatusBadge";

const ResultsTable = ({ parameters = [] }) => (
  <div className="results-table overflow-x-auto bg-white rounded-xl shadow p-4 mt-6">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-left text-gray-700 border-b">
          <th className="py-2 px-3">Parameter</th>
          <th className="py-2 px-3">Your Value</th>
          <th className="py-2 px-3">Normal Range</th>
          <th className="py-2 px-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {parameters.map((param, idx) => (
          <tr key={idx} className="border-b last:border-0">
            <td className="py-2 px-3 font-medium">{param.name}</td>
            <td className="py-2 px-3 font-semibold">{param.value} {param.unit}</td>
            <td className="py-2 px-3 text-gray-600">{param.normalRange}</td>
            <td className="py-2 px-3"><StatusBadge status={param.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ResultsTable; 
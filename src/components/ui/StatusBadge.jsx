import React from "react";

const statusMap = {
  normal: "bg-green-100 text-green-700 border-green-300",
  warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
  critical: "bg-red-100 text-red-700 border-red-300",
  low: "bg-blue-100 text-blue-700 border-blue-300"
};

const StatusBadge = ({ status = "normal", children }) => (
  <span className={`status-badge px-3 py-1 rounded-full border text-xs font-semibold ${statusMap[status] || statusMap.normal}`}>{children || status}</span>
);

export default StatusBadge; 
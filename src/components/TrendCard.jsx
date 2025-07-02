import React from 'react';

const getStatus = (value, range) => {
  if (!range) return { label: '—', color: 'bg-gray-200 text-gray-600' };
  const [low, high] = range.split(/[–-]/).map(Number);
  if (isNaN(low) || isNaN(high)) return { label: '—', color: 'bg-gray-200 text-gray-600' };
  if (value < low) return { label: 'Low', color: 'bg-red-100 text-red-600' };
  if (value > high) return { label: 'High', color: 'bg-yellow-100 text-yellow-700' };
  return { label: 'In Range', color: 'bg-green-100 text-green-700' };
};

const TrendCard = ({ parameter, values, unit, normalRange }) => {
  const latest = values[values.length - 1];
  const status = getStatus(latest, normalRange);
  // SVG sparkline
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values.map((v, i) => `${i * 30},${40 - ((v - min) / (max - min || 1)) * 30}`).join(' ');

  return (
    <div className="bg-white rounded-2xl shadow-md p-3 sm:p-4 flex flex-col gap-2 w-full max-w-[170px] sm:max-w-xs">
      <div className="flex items-center justify-between">
        <span className="text-[#8B7355] font-semibold text-sm sm:text-base">{parameter}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold animate-pulse ${status.color}`}>{status.label}</span>
      </div>
      <div className="text-2xl sm:text-3xl font-extrabold text-[#8B7355]">{latest} <span className="text-base font-medium">{unit}</span></div>
      <svg width="90" height="40" className="my-1">
        <polyline
          fill="none"
          stroke={status.label === 'High' ? '#eab308' : status.label === 'Low' ? '#ef4444' : '#22c55e'}
          strokeWidth="3"
          points={points}
        />
      </svg>
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <span className="ml-auto text-gray-500">Normal: {normalRange}</span>
      </div>
    </div>
  );
};

export default TrendCard; 
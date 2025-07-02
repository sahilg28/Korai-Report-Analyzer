// Health analysis and status logic will be implemented here. 

import normalRanges from "../data/normalRanges";

export function getParameterStatus(name, value) {
  const range = normalRanges[name];
  if (!range) return "unknown";
  if (value < range.min) return "low";
  if (value > range.max) return "high";
  return "normal";
} 
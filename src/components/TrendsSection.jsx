import React from 'react';
import TrendCard from './TrendCard';
import { loadReports } from '../utils/localStorage';

const TrendsSection = ({ parameters }) => {
  // Get last 3 reports from localStorage
  const reports = loadReports().slice(0, 3);
  // Pick up to 4 parameters from the current report
  const topParams = parameters.slice(0, 4);

  // For each parameter, build a trend of last 3 values
  const trends = topParams.map((param) => {
    const values = reports
      .map((report) => {
        const found = report.parameters.find((p) => p.parameter === param.parameter);
        return found ? found.value : null;
      })
      .filter((v) => v !== null);
    return {
      parameter: param.parameter,
      values,
      unit: param.unit,
      normalRange: param.range,
    };
  });

  if (trends.length === 0) return null;

  return (
    <section className="w-full grid grid-cols-2 gap-3">
      {trends.map((trend) => (
        <TrendCard
          key={trend.parameter}
          parameter={trend.parameter}
          values={trend.values}
          unit={trend.unit}
          normalRange={trend.normalRange}
        />
      ))}
    </section>
  );
};

export default TrendsSection; 
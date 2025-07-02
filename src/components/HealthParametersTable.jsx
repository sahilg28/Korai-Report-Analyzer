import React from 'react';
import PropTypes from 'prop-types';

const HealthParametersTable = ({ parameters = [] }) => (
  <div className="w-full max-w-2xl mx-auto mt-6 bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-lg font-bold text-[#8B7355] mb-2">Health Parameters</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#F5F3F0]">
            <th className="py-2 px-3 font-semibold text-[#8B7355]">Parameters</th>
            <th className="py-2 px-3 font-semibold text-[#8B7355]">Value</th>
            <th className="py-2 px-3 font-semibold text-[#8B7355]">Unit</th>
            <th className="py-2 px-3 font-semibold text-[#8B7355]">Range</th>
          </tr>
        </thead>
        <tbody>
          {parameters.length === 0 ? (
            <tr><td colSpan={4} className="text-center text-[#CCCCCC] py-4">No data extracted</td></tr>
          ) : (
            parameters.map((p, i) => (
              <tr key={p.parameter + i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F3F0]'}>
                <td className="py-2 px-3 text-[#8B7355]">{p.parameter}</td>
                <td className={`py-2 px-3 ${p.abnormal ? 'text-red-600 font-bold' : 'text-[#8B7355]'}`}>{p.value ?? '—'}</td>
                <td className="py-2 px-3 text-[#8B7355]">{p.unit ?? '—'}</td>
                <td className="py-2 px-3 text-[#8B7355]">{p.range ?? '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

HealthParametersTable.propTypes = {
  parameters: PropTypes.arrayOf(
    PropTypes.shape({
      parameter: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      unit: PropTypes.string,
      range: PropTypes.string,
      abnormal: PropTypes.bool,
    })
  ),
};

export default HealthParametersTable; 
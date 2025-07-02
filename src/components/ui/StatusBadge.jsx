import React from 'react';
import PropTypes from 'prop-types';

const statusColors = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  default: 'bg-[#CCCCCC] text-[#8B7355]',
};

const StatusBadge = ({ status, children }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status] || statusColors.default}`}>{children}</span>
);

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['success', 'warning', 'error', 'default']),
  children: PropTypes.node.isRequired,
};

export default StatusBadge; 
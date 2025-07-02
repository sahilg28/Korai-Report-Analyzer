import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, type = 'button', disabled = false, loading = false, className = '', ariaLabel }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    aria-label={ariaLabel}
    className={`px-4 py-2 rounded-xl bg-[#8B7355] text-white font-semibold shadow transition hover:bg-[#6d5a3a] focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:ring-offset-2 disabled:opacity-50 ${className}`}
    tabIndex={0}
  >
    {loading ? <span className="animate-spin mr-2">⏳</span> : null}
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Button; 
import React from "react";

const Button = ({ children, ...props }) => (
  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#8B7355] to-[#A68B6B] text-white font-semibold shadow hover:from-[#A68B6B] hover:to-[#8B7355] focus:ring-2 focus:ring-[#8B7355] focus:outline-none transition-all duration-200" {...props}>
    {children}
  </button>
);

export default Button; 
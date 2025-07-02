import React from "react";

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-xl shadow bg-[#F5F3F0] p-6 ${className}`} {...props}>
    {children}
  </div>
);

export default Card; 
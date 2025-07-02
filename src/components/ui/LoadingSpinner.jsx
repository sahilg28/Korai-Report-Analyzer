import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-6 h-6 border-4 border-[#8B7355] border-t-transparent rounded-full animate-spin" aria-label="Loading"></div>
  </div>
);

export default LoadingSpinner; 
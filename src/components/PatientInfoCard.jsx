import React from 'react';

const PatientInfoCard = ({ name, age, gender, date }) => (
  <div className="w-full max-w-md mx-auto mt-4 bg-white rounded-2xl shadow-lg border border-[#E5E3DF] p-6 flex flex-col gap-2 transition-transform duration-200 hover:scale-[1.02]">
    <h2 className="text-base font-bold text-[#8B7355] mb-1">Patient Information</h2>
    <div className="flex flex-wrap gap-x-6 gap-y-1 text-[#8B7355]">
      <span><span className="font-medium">Name:</span> <span className="font-semibold text-lg">{name || '—'}</span></span>
      <span><span className="font-medium">Age:</span> {age || '—'}</span>
      <span><span className="font-medium">Gender:</span> {gender || '—'}</span>
      {date && <span><span className="font-medium">Date:</span> {date}</span>}
    </div>
  </div>
);

export default PatientInfoCard; 
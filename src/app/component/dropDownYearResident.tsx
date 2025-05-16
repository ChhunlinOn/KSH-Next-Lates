
'use client';

import React from 'react';

const staticYears = ['2021', '2022', '2023', '2024'];

type DropdownYearResidentProps = {
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

const DropdownYearResident = ({
  selectedYear,
  setSelectedYear,
  className = "",  
}: DropdownYearResidentProps) => {
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="year" className="text-sm sm:text-base font-semibold">
        Year
      </label>
      <select
        id="year"
        value={selectedYear}
        onChange={handleYearChange}
        className={`p-2 border border-gray-400 rounded-md w-28 sm:w-32 ${className}`}
      >
        <option value="">Select Year</option>
        {staticYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownYearResident;

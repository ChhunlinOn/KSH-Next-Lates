'use client';

import React from 'react';
import { FaEye } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

interface BoxResidentProps {
  image: string | null;
  name: string;
  medicalUse: boolean;
  id: string;
}

const BoxResident: React.FC<BoxResidentProps> = ({ image, name, medicalUse, id }) => {
  return (
    <Link
      href={`/dashbaord/pages/medical/medicalInfo`}
      className="block"
    >
      <div className="flex items-center justify-between gap-2 p-4 border border-gray-300 bg-[#F6F6F6] shadow-md rounded-xl sm:p-4 sm:gap-6 hover:shadow-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer">
        
        {/* Image + Info */}
        <div className="flex items-center gap-4">
          {image ? (
            <Image
              src={image}
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full object-cover h-16 w-16 sm:h-20 sm:w-20"
            />
          ) : (
            <div className="h-16 w-16 bg-gray-300 rounded-full" />
          )}
          <div>
            <p className="text-[#207137] font-bold text-sm sm:text-lg md:text-xl">
              {name}
            </p>
            <p className="text-gray-700 text-xs sm:text-base md:text-lg">
              Medical Use: {medicalUse ? 'Yes' : 'No'}
            </p>
          </div>
        </div>

        {/* View Icon */}
        <div className="text-right text-gray-600 text-xs sm:text-sm flex items-center gap-2">
          <FaEye />
          <span className="hidden sm:inline">View</span>
        </div>
      </div>
    </Link>
  );
};

export default BoxResident;

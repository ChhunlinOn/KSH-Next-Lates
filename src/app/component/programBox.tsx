import React from "react";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import type { IconBaseProps } from "react-icons";

interface ProgramBoxProps {
  id: number;
  title: string;
  image: string | null;
  level: string | number;
}

const ProgramBox: React.FC<ProgramBoxProps> = ({ id, title, image, level }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-md mx-auto">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-56 sm:h-64 object-cover rounded-t-2xl"
        />
      )}
      <div className="p-6 flex flex-col items-center text-center">
        <h3 className="text-2xl font-semibold text-green-800 mb-2">{title}</h3>
        {/* <p className="text-sm text-gray-600 mb-4">{level}</p> */}
        <Link
  href={`/dashbaord/pages/program/programActivities/${id}`}
  className="inline-flex items-center gap-2 bg-green-700 text-white text-sm font-medium py-2 px-5 rounded-full hover:bg-green-800 transition duration-200"
>
  View Program
  <MdArrowForward {...({ className: "text-lg" } as IconBaseProps)} />
</Link>
      </div>
    </div>
  );
};

export default ProgramBox;

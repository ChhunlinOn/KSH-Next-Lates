'use client';
import React, { useState, useRef, useEffect } from "react";

type ProgramBoxProps = {
  profile: string;
  name: string;
  score: string;
  coment: string;
  onValueChange: (val: string) => void;
  onCommentChange?: (comment: string) => void;
};

const options = [
  { value: "1", label: "Good", image: "https://res.cloudinary.com/dq5usncvp/image/upload/v1733993278/correct_removebg_preview_9ab70cbf0a.png" },
  { value: "3", label: "50/50", image: "https://res.cloudinary.com/dq5usncvp/image/upload/v1733993278/medium_removebg_preview_b99a72ec49.png" },
  { value: "2", label: "Not Good", image: "https://res.cloudinary.com/dq5usncvp/image/upload/v1733993278/incorrect_removebg_preview_b11a69e95e.png" },
  { value: "4", label: "Uncheckable", image: "https://res.cloudinary.com/dq5usncvp/image/upload/v1748464069/medium_removebg_preview_891832675e.png" },
];

const ProgramInfoBox: React.FC<ProgramBoxProps> = ({
  profile,
  name,
  score,
  coment,
  onValueChange,
  onCommentChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === score) || options[0];

  return (
    <tr className="border-b hover:bg-gray-50 transition-all duration-200">
      <td className="px-4 py-6">
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-2xl shadow-md">
          <div className="flex items-center gap-4 w-full md:w-1/3">
            <img
              src={profile}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-4 border-green-600 shadow-sm"
            />
            <span className="text-lg font-semibold text-gray-800 break-words">{name}</span>
          </div>

          <div className="w-full md:w-1/3 relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm text-base flex items-center justify-between"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-2">
                <img
                  src={selectedOption.image}
                  alt={selectedOption.label}
                  className="w-5 h-5 object-contain"
                />
                <span className="text-base">{selectedOption.label}</span>
              </div>
              <svg
                className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <ul
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto"
                role="listbox"
              >
                {options.map((option) => (
                  <li
                    value={score}
                    key={option.value 
                    }
                    onClick={() => {
                      onValueChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      score === option.value ? "bg-gray-50" : ""
                    }`}
                    role="option"
                    aria-selected={score === option.value}
                  >
                    <img
                      src={option.image}
                      alt={option.label}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="text-base">{option.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full md:w-1/3">
            <input
              value={coment}
              type="text"
              placeholder="Write comment..."
              onChange={(e) => onCommentChange?.(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm text-base"
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ProgramInfoBox;
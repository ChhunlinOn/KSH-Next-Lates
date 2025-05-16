import React from "react";

interface residentChecklistProps {
  profile: string;
  name: string;
  initialValue: string;
  comment: string;
  onValueChange: (value: string) => void;
  onCommentChange: (comment: string) => void;
}

const ResidentChecklist: React.FC<residentChecklistProps> = ({
  profile,
  name,
  initialValue,
  comment,
  onValueChange,
  onCommentChange,
}) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition duration-200">
      <td colSpan={3} className="p-4 sm:p-5 md:p-6">
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-2xl shadow-md p-6 w-full">
          {/* Profile & Name */}
          <div className="flex items-center gap-4 w-full md:w-1/3">
            <img
              src={profile}
              alt={name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 object-cover shadow-md"
            />
            <span className="font-bold text-gray-900 text-base sm:text-lg md:text-xl break-words">
              {name}
            </span>
          </div>

          {/* Status Dropdown */}
          <div className="w-full md:w-1/3">
            <select
              value={initialValue}
              onChange={(e) => onValueChange(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-white shadow-md text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="Good">✅ Good</option>
              <option value="50/50">🔄 50/50</option>
              <option value="Not Good">❌ Not Good</option>
              <option value="??">❓ Uncheckable</option>
            </select>
          </div>

          {/* Comment Field */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              value={comment}
              onChange={(e) => onCommentChange(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 shadow-md text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ResidentChecklist;

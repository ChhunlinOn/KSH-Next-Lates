"use client";

import React, { useState, useEffect } from "react";
import ProgramInfoBox from "../../../../../component/activitiesResident";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const TaskPage = () => {
  const [programInfo, setProgramInfo] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("today");
  const [customDate, setCustomDate] = useState("");

  const itemsPerPage = 4;
  const today = new Date().toISOString().split("T")[0];
  const selectedDate = selectedOption === "today" ? today : customDate;

  const title = "Hygiene";
  const image = "https://as2.ftcdn.net/jpg/01/81/91/45/1000_F_181914597_tXKzwgfkdsYfbXGMJqrwFOT1U4HV375m.jpg"; 

  useEffect(() => {
    setLoading(true);
    const fakeData = Array.from({ length: 13 }, (_, i) => ({
      id: i + 1,
      value: "50%",
      attributes: {
        description: "Nice effort",
        score_point: { data: { attributes: { score_point: 50 } } },
        resident: {
          data: {
            attributes: {
              fullname_english: `Resident ${i + 1}`,
              profile_img_url: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: "https://img.pikbest.com/png-images/20241125/professional-businessman-cartoon-character-with-briefcase_11109331.png!f305cw", 
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }));

    setTimeout(() => {
      setProgramInfo(fakeData);
      setTotalPages(Math.ceil(fakeData.length / itemsPerPage));
      setLoading(false);
    }, 1000);
  }, [selectedDate]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDate(e.target.value);
  };

  const handleValueChange = (id: number, value: string) => {
    setProgramInfo((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value } : p))
    );
  };

  const handleSave = () => {
    toast.success("Saved successfully!", { position: "top-center" });
  };

  const getPaginatedData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return programInfo.slice(start, start + itemsPerPage);
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-12">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <Link href="/dashbaord/pages/program/programActivities">

        <button className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300 mb-8">
            Back
          </button>
          </Link>

          <div className="flex items-center gap-4 flex-wrap">
            <select
              className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="today">Today</option>
              <option value="custom">Custom</option>
            </select>

            {selectedOption === "custom" && (
              <input
                type="date"
                value={customDate}
                onChange={handleDateChange}
                className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
              />
            )}
          </div>
        </div>

        {/* Residents Count */}
        <div className="mb-4 text-xl font-semibold text-gray-700">
          Residents: <span className="text-green-700">{programInfo.length}</span>
        </div>

        {/* Program Header */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={image}
            alt="Program"
            className="w-full max-w-xs md:max-w-sm rounded-lg shadow-md object-cover"
          />
          <h1 className="text-2xl md:text-4xl font-bold text-green-800 mt-4 text-center">
            {title}
          </h1>
        </div>

        {/* Program Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm">
            <tbody>
              {getPaginatedData().map((program) => (
                <ProgramInfoBox
                  key={program.id}
                  profile={
                    program.attributes.resident.data.attributes
                      .profile_img_url.data.attributes.formats.thumbnail.url
                  }
                  name={
                    program.attributes.resident.data.attributes.fullname_english
                  }
                  initialValue={program.value}
                  onValueChange={(val: string) =>
                    handleValueChange(program.id, val)
                  }
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination + Save */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md text-white ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#207137]"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-700 font-medium text-lg">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md text-white ${
                currentPage === totalPages
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#207137]"
              }`}
            >
              Next
            </button>
          </div>

          <div className="flex justify-start">
            <button
              onClick={handleSave}
              className="bg-green-700 hover:bg-green-800 text-white text-base px-8 py-3 rounded-md shadow"
            >
              Save
            </button>
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default TaskPage;

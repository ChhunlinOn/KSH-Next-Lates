"use client";
import React, { useState, useEffect } from "react";
import ProgramInfoBox from "../../../../../component/activitiesResident";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const ActivitiesResident = () => {
  const [programInfo, setProgramInfo] = useState<any[]>([]);
  const [filteredProgramInfo, setFilteredProgramInfo] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOption, setSelectedOption] = useState("today");
  const [customDate, setCustomDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 4;
  const today = new Date().toISOString().split("T")[0];
  const selectedDate = selectedOption === "today" ? today : customDate;

  const title = "Hygiene";
  const image =
    "https://as2.ftcdn.net/jpg/01/81/91/45/1000_F_181914597_tXKzwgfkdsYfbXGMJqrwFOT1U4HV375m.jpg";

  const residentNames = [
    "Sokha Chan", "Nita Thea", "Dara Kim", "Sophea Lim", "Rachana Em",
    "Vannak Chea", "Channa Sok", "Malis Neang", "Sokun Nguon",
    "Rithy Yim", "Dalin Meas", "Nika Leng", "Borey Pich",
  ];

  useEffect(() => {
    setLoading(true);
    const fakeData = Array.from({ length: residentNames.length }, (_, i) => ({
      id: i + 1,
      value: "50%",
      attributes: {
        description: "Nice effort",
        score_point: { data: { attributes: { score_point: 50 } } },
        resident: {
          data: {
            attributes: {
              fullname_english: residentNames[i],
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
      setFilteredProgramInfo(fakeData);
      setTotalPages(Math.ceil(fakeData.length / itemsPerPage));
      setLoading(false);
    }, 500);
  }, [selectedDate]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDate(e.target.value);
  };

  const handleValueChange = (id: number, value: string) => {
    setFilteredProgramInfo((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value } : p))
    );
  };

  const handleSave = () => {
    toast.success("Saved successfully!", { position: "top-center" });
  };

  const handleSearch = () => {
    const term = searchName.trim().toLowerCase();
    const filtered = programInfo.filter((p) =>
      p.attributes.resident.data.attributes.fullname_english
        .toLowerCase()
        .includes(term)
    );
    setFilteredProgramInfo(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getPaginatedData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProgramInfo.slice(start, start + itemsPerPage);
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-12 ">
      <div className="max-w-7xl mx-auto w-full">

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:justify-between">
          <div className="flex justify-between items-center w-full lg:w-1/2">
            <Link href="/dashbaord/pages/program/programActivities">
              <button className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition">
                Back
              </button>
            </Link>
<div className="flex items-center gap-3">
  <select
    className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500"
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
      className="border border-gray-300 px-3 py-1 rounded-md focus:ring-2 focus:ring-green-500
                 w-24 sm:w-28 md:w-32 lg:w-36"
    />
  )}
</div>


          </div>

          <div className="flex sm:flex-row items-stretch gap-3 w-full mt-4 lg:mt-0 lg:w-1/2">
          <input
  type="text"
  placeholder="Search by resident name"
  value={searchName}
  onChange={(e) => {
    const value = e.target.value;
    setSearchName(value);
    setCurrentPage(1);

    if (value.trim() === "") {
      setFilteredProgramInfo(programInfo);
      setTotalPages(Math.ceil(programInfo.length / itemsPerPage));
    } else {
      const filtered = programInfo.filter((p) =>
        p.attributes.resident.data.attributes.fullname_english
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      setFilteredProgramInfo(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    }
  }}
  className="border border-gray-400 rounded-md flex-grow min-w-0
         py-2 lg:py-2 px-2 lg:px-3 text-sm lg:text-base
         focus:outline-none focus:ring-2 focus:ring-green-500"
/>

            <button
              onClick={handleSearch}
              className="bg-green-700 hover:bg-green-800 text-white rounded-md flex items-center justify-center gap-2 py-2 px-4"
            >
              <FaSearch />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>

        <div className="mb-4 text-lg font-semibold text-gray-700 text-center sm:text-left">
          Residents:{" "}
          <span className="text-green-700">{filteredProgramInfo.length}</span>
        </div>

        <div className="flex flex-col items-center mb-8">
          <img
            src={image}
            alt="Program"
            className="w-full max-w-[300px] md:max-w-sm rounded-lg shadow-md object-cover"
          />
          <h1 className="text-2xl md:text-4xl font-bold text-green-800 mt-4 text-center">
            {title}
          </h1>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full  rounded-lg shadow-sm">
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

        <div className="mt-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md text-white ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
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
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              Next
            </button>
          </div>

          <div className="w-full flex justify-end">
            <button
              onClick={handleSave}
              className="bg-green-700 hover:bg-green-800 active:bg-green-900 text-white font-semibold text-lg px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-75 w-full sm:w-full md:w-auto max-w-full sm:max-w-full md:max-w-xs"
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

export default ActivitiesResident;

"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProgramActivity } from "../Context/ProgramactivityContext";
import { useEffect, useState } from "react";
import { useProgram } from "../Context/ProgramTypecontext";

const ProgramActivityList = () => {
    const { programType, fetchProgramTypeById } = useProgram();
      const [currentPage, setCurrentPage] = useState(1);
      const activitiesPerPage = 4;
  const { programsActivity } = useProgramActivity();
  const { id } = useParams();
    useEffect(() => {
      fetchProgramTypeById(id as string);
    }
      , [id as string]);
  
    const totalPages = Math.ceil(programsActivity.length / activitiesPerPage);
    const indexOfLast = currentPage * activitiesPerPage;
    const indexOfFirst = indexOfLast - activitiesPerPage;
    const currentActivities = programsActivity.slice(indexOfFirst, indexOfLast);
  
    const nextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
  
    const prevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
  

  return (
     <div className="max-w-7xl mx-auto px-4 py-10">
        <Link href="/dashbaord/pages/program">
          <button className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300 mb-8">
            Back
          </button>
        </Link>
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-green-800 mb-12">
          {programType?.program_type_name || ""}
        </h1>

        {currentActivities.map((activity) => (
          <Link href={`/dashbaord/pages/program/programActivities/${id}/activitiesResident/${activity.id}`} key={activity.id}>

            <div className="my-6">
              <div
                key={activity.id}
                className="flex items-center justify-between bg-white shadow-md hover:shadow-lg transition p-6 rounded-2xl"
              >
                {/* <div className="w-full sm:w-auto text-lg sm:text-xl font-bold text-gray-700 mb-4 sm:mb-0">
        {activity.attributes || "none"}
      </div> */}

                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <img
                    src={activity.activity_img || "none"}
                    alt={activity.activity_name || "none"}
                    className="w-48 h-44 object-cover rounded-xl"
                  />
                </div>

                <div className="w-full sm:w-1/6 text-xl sm:text-2xl font-semibold text-gray-800 text-center sm:text-left">
                  {activity.activity_name}
                </div>
              </div>
            </div>
          </Link>
        ))}


        <div className="flex justify-center items-center mt-8 gap-4 flex-wrap">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-white text-sm sm:text-base ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#207137]"
              }`}
          >
            Previous
          </button>
          <span className="text-sm sm:text-base font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md text-white text-sm sm:text-base ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-[#207137]"
              }`}
          >
            Next
          </button>
        </div>
      </div>
  );
};

export default ProgramActivityList;

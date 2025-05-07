"use client"
import React, { useState } from "react";
import Link from 'next/link';

const foyerActivities = [
  { id: 1, name: "Hygiene", image: "https://as2.ftcdn.net/jpg/01/81/91/45/1000_F_181914597_tXKzwgfkdsYfbXGMJqrwFOT1U4HV375m.jpg", time: "7:00 - 8:00 AM" },
  { id: 2, name: "Cleaning Toilets", image: "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/how-to-clean-a-toilet-step-5-A.jpg", time: "8:00 - 8:30 AM" },
  { id: 3, name: "Cleaning Leaves", image: "https://www.shutterstock.com/image-photo/anonymous-male-worker-wearing-dark-600nw-2360377845.jpg", time: "8:30 - 9:00 AM" },
  { id: 4, name: "Cleaning Fans", image: "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/how-to-clean-a-ceiling-fan-2022-step-3.jpg", time: "9:00 - 9:30 AM" },
  { id: 5, name: "Sweeping Floor", image: "https://rescuemytimecleaningservice.com/wp-content/uploads/2019/12/how-often-should-you-mop.jpeg", time: "9:30 - 10:00 AM" },
  { id: 6, name: "Wiping Tables", image: "https://img.freepik.com/free-photo/side-view-barista-cleaning-table-while-wearing-latex-glove_23-2148522931.jpg?semt=ais_hybrid&w=740", time: "10:00 - 10:30 AM" },
  { id: 7, name: "Dusting Windows", image: "https://www.bhg.com/thmb/KRuk3RP7ghIWEMPGya73wSzreII=/3000x0/filters:no_upscale():strip_icc()/cleaning-products-tools-best-homemade-window-cleaner-03-aed804b8d9034941be9eba785dff7f7d.jpg", time: "10:30 - 11:00 AM" },
  { id: 8, name: "Organizing Shoes", image: "https://foter.com/photos/449/20-pair-solid-wood-shoe-rack.jpg?s=lbx", time: "11:00 - 11:30 AM" },
  { id: 9, name: "Emptying Trash Bins", image: "https://www.wikihow.com/images/thumb/9/94/Empty-a-Trash-Bin-Step-5-Version-3.jpg/v4-460px-Empty-a-Trash-Bin-Step-5-Version-3.jpg", time: "11:30 - 12:00 PM" },
  { id: 10, name: "Refilling Soaps", image: "https://m.media-amazon.com/images/I/71-h5wgFEiL._AC_UF1000,1000_QL80_.jpg", time: "1:00 - 1:30 PM" },
  { id: 11, name: "Checking Supplies", image: "https://media.istockphoto.com/id/2156105421/photo/female-cook-checking-kitchens-supplies-while-working-in-a-restaurant.jpg?s=612x612&w=0&k=20&c=iBkpyLhfQJjVgZbZQiYkNaUSh852ohVINn9osE0PNhQ=", time: "1:30 - 2:00 PM" },
  { id: 12, name: "Cleaning Light Switches", image: "https://www.wikihow.com/images/thumb/a/a2/Clean-Light-Switches-Step-10-Version-2.jpg/aid8687247-v4-1200px-Clean-Light-Switches-Step-10-Version-2.jpg", time: "2:00 - 2:30 PM" },
];

const FoyerActivityPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 4;

  const totalPages = Math.ceil(foyerActivities.length / activitiesPerPage);
  const indexOfLast = currentPage * activitiesPerPage;
  const indexOfFirst = indexOfLast - activitiesPerPage;
  const currentActivities = foyerActivities.slice(indexOfFirst, indexOfLast);

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
  Foyer Activities
</h1>
<Link href="/dashbaord/pages/program/programActivities/activitiesResident">

<div className="space-y-6">
  {currentActivities.map((activity) => (
    <div
      key={activity.id}
      className="flex flex-wrap items-center justify-between bg-white shadow-md hover:shadow-lg transition p-6 rounded-2xl"
    >
      <div className="w-full sm:w-auto text-lg sm:text-xl font-bold text-gray-700 mb-4 sm:mb-0">
        {activity.time}
      </div>

      <div className="w-full sm:w-1/2 mb-4 sm:mb-0 flex justify-center">
        <img
          src={activity.image}
          alt={activity.name}
          className="w-48 h-44 object-cover rounded-xl"
        />
      </div>

      <div className="w-full sm:w-1/4 text-xl sm:text-2xl font-semibold text-gray-800 text-center sm:text-left">
        {activity.name}
      </div>
    </div>
  ))}
</div>
</Link>

<div className="flex justify-center items-center mt-8 gap-4 flex-wrap">
  <button
    onClick={prevPage}
    disabled={currentPage === 1}
    className={`px-4 py-2 rounded-md text-white text-sm sm:text-base ${
      currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#207137]"
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
    className={`px-4 py-2 rounded-md text-white text-sm sm:text-base ${
      currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-[#207137]"
    }`}
  >
    Next
  </button>
</div>
</div>
);
};

export default FoyerActivityPage;




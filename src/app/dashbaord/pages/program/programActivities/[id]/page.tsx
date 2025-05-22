"use client"
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import dotenv from "dotenv";
import { useParams } from "next/navigation";

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
  dotenv.config();
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const token = process.env.NEXT_PUBLIC_TOKEN;
  const [activitys, setActivities] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [programType, setProgramType] = useState<any>({});
  const activitiesPerPage = 4;
  const params = useParams();
  const id = params.id;
  console.log(id);

  const handlefetchprogramtype = async () => {
    try {
      const response = await fetch(
        `${api_url}/program-types/${id}?populate=*`, // Replace with your API endpoint
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your API token
          },
        }
      );
      const data = await response.json();
      console.log(data.data.attributes);
      setProgramType(data.data.attributes);
    } catch (error) {
      console.error("Error fetching program type:", error);
    }
  };
  useEffect(() => {
    handlefetchprogramtype();
  }
  , []);

  const handlefetchActivities = async () => {
    try {
      const response = await fetch(
        `${api_url}/program-activities?populate=*&filters[program_type][id][$eq]=${id}`, // Replace with your API endpoint
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your API token
          },
        }
      );
      const data = await response.json();
      console.log(data.data);
      setActivities(data.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };
  useEffect(() => {
    handlefetchActivities();
  }
  , []);

  const totalPages = Math.ceil(activitys.length / activitiesPerPage);
  const indexOfLast = currentPage * activitiesPerPage;
  const indexOfFirst = indexOfLast - activitiesPerPage;
  const currentActivities = activitys.slice(indexOfFirst, indexOfLast);

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
  {programType.program_type_name || ""}
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
          src={activity.attributes.img_url.data[0].attributes.url || null}
          alt={activity.attributes.program_activity_name || "none"}
          className="w-48 h-44 object-cover rounded-xl"
        />
      </div>

      <div className="w-full sm:w-1/6 text-xl sm:text-2xl font-semibold text-gray-800 text-center sm:text-left">
        {activity.attributes.program_activity_name}
      </div>
    </div>
    </div>
</Link>
  ))}


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




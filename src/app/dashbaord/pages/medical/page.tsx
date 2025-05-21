'use client';
import React, { useState, useEffect } from 'react';
import BoxResident from '../../../component/medicalBox';
import { FaPlus, FaTimes, FaSearch } from 'react-icons/fa';
import dotenv from 'dotenv';

const MedicalList: React.FC = () => {
  dotenv.config();
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const token = process.env.NEXT_PUBLIC_TOKEN;
  console.log(api_url);
  console.log(token);
  const [residents, setResidents] = useState<any[]>([]);

  const handlefetchResidents = async () => {
    try {
      const response = await fetch(
        `${api_url}/resident-medicals?filters[require_to_use][$eq]=true&populate[resident][populate]=profile_img_url`, // Replace with your API endpoint
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your API token
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setResidents(data.data);
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };

  useEffect(() => {
    handlefetchResidents();
  }, []);

  const [searchName, setSearchName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddResidentModal, setShowAddResidentModal] = useState(false);
  const [newResidentData, setNewResidentData] = useState({
    name: '',
    medicalUse: false,
  });

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchTerm(searchName.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewResidentData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const { name} = newResidentData;
    if (name ) {
      const newResident = {
        id: (residents.length + 1).toString(),
        ...newResidentData,
      };
      setResidents([...residents, newResident]);
      setShowAddResidentModal(false);
      setNewResidentData({
        name: '',
  
        medicalUse: false,
      });
    } else {
      alert('Please fill out all fields!');
    }
  };

  const handleAddResident = () => setShowAddResidentModal(true);
  const handleCloseModal = () => setShowAddResidentModal(false);

  const filteredResidents = residents.filter((resident) => {
    const name =
      resident?.attributes?.resident?.data?.attributes?.fullname_english ||
      resident?.name ||
      '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const residentsPerPage = 10;
  const totalPages = Math.ceil(filteredResidents.length / residentsPerPage);
  const currentResidents = filteredResidents.slice(
    (currentPage - 1) * residentsPerPage,
    currentPage * residentsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-[95%] max-w-screen-xl">
        <div className="flex flex-nowrap items-center gap-2 w-full lg:w-auto">
        <input
  type="text"
  placeholder="Search by resident name"
  value={searchName}
  onChange={(e) => {
    const value = e.target.value;
    setSearchName(value);
    setCurrentPage(1);       
    setSearchTerm(value.trim()); 
  }}
  className="border border-gray-400 rounded-md flex-grow min-w-0
             py-2 lg:py-2 px-2 lg:px-3 text-sm lg:text-base
             focus:outline-none focus:ring-2 focus:ring-green-500"
/>
          <button
            onClick={handleSearch}
            className="bg-green-700 hover:bg-green-800 text-white rounded-md flex items-center gap-2 py-2 px-4 text-sm"
          >
            <FaSearch />
            Search
          </button>
        </div>

        <h2 className="text-center text-2xl font-bold text-green-800 my-6">
          Medicals
        </h2>

        <div className="flex flex-col gap-5">
          {currentResidents.length > 0 ? (
            currentResidents.map((resident) => (
              <BoxResident
                key={resident.id}
                id={resident.id}
                image={resident?.attributes?.resident?.data?.attributes?.profile_img_url?.data?.attributes?.url}
                name={resident?.attributes?.resident?.data?.attributes?.fullname_english}
                medicalUse={resident.attributes?.require_to_use}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 font-medium">
              No medical found.
            </div>
          )}
        </div>

        <div className="flex justify-center items-center mt-8 gap-4 flex-wrap">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-white ${
              currentPage === 1
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-700'
            }`}
          >
            Previous
          </button>
          <span className="text-base font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md text-white ${
              currentPage === totalPages
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-700'
            }`}
          >
            Next
          </button>
        </div>

        <div
          onClick={handleAddResident}
          className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow cursor-pointer border border-dashed border-gray-400 hover:bg-gray-50 mt-5"
        >
          <FaPlus className="text-green-600" />
          <span className="text-sm font-medium text-green-600">
            Add New Medical
          </span>
        </div>

        {showAddResidentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2 sm:px-4">
            <div className="relative w-full max-w-lg p-6 bg-white rounded-2xl shadow-2xl">
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Add New Medical
              </h3>

              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={newResidentData.name}
                  onChange={handleInputChange}
                  className="border rounded-md p-2"
                />
              
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="medicalUse"
                    checked={newResidentData.medicalUse}
                    onChange={handleInputChange}
                  />
                  Medical Use
                </label>
                <button
                  onClick={handleSubmit}
                  className="bg-green-700 text-white rounded-md px-4 py-2 hover:bg-green-800"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalList;

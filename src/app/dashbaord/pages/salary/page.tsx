'use client';
import React, { useState, useEffect } from 'react';
import BoxSalary from '../../../component/boxSalary';
import { FaPlus, FaTimes, FaSearch } from 'react-icons/fa';
import dotenv from 'dotenv';

dotenv.config();
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

const ResidentList: React.FC = () => {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState<any[]>([]);
  const [residents, setResidents] = useState<any[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddResidentModal, setShowAddResidentModal] = useState(false);
  const [newResidentData, setNewResidentData] = useState({
    search: '',
    salary: '',
    date: '',
  });

  const fectchResident = async () => {
    try {
      const response = await fetch(`${API_URL}/internships?populate[resident][populate]=profile_img_url&populate[date]=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setSearch(data.data);

      const transformed = data.data.map((item: any) => ({
        id: item.id,
        name: item.attributes?.resident?.data?.attributes?.fullname_english || 'No Name',
        date_of_birth: item.attributes?.resident?.data?.attributes?.date_of_birth || 'N/A',
        image: item.attributes?.resident?.data?.attributes?.profile_img_url?.data?.attributes?.url,
        dob: item.attributes?.resident?.data?.attributes?.date_of_birth,
      }));
      setResidents(transformed);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fectchResident();
  }, []);

  const getFilteredOptions = () => {
    if (input.trim() === '') return search;
    return search.filter((resident) =>
      resident.attributes.fullname_english.toLowerCase().includes(input.trim().toLowerCase())
    );
  };

  const filteredOptions = getFilteredOptions();

  const handleSelect = (resident: any) => {
    setInput(resident.attributes.fullname_english);
   
  };

  const handleSubmit = () => {
    if (newResidentData.search && newResidentData.salary && newResidentData.date) {
      const newResident = {
        id: (residents.length + 1).toString(),
        name: newResidentData.search,
        salary: newResidentData.salary,
        date: newResidentData.date,
        dob: newResidentData.date,
      };
      setResidents([...residents, newResident]);
      setShowAddResidentModal(false);
    } else {
      alert('Please fill out all fields!');
    }
  };

  const residentsPerPage = 10;
  const filteredResidents = residents.filter((resident) =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalResidents = filteredResidents.length;
  const totalPages = Math.ceil(totalResidents / residentsPerPage);

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

  const handleAddResident = () => {
    setShowAddResidentModal(true);
  };

  const handleCloseModal = () => {
    setShowAddResidentModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewResidentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchTerm(searchName.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  return (
    <div className="flex justify-center w-full">
      <div className="w-[95%] max-w-screen-xl min-h-screen bg-gradient-to-b py-10 px-6 relative">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-center text-green-800 mb-6 drop-shadow-md">
          Salary
        </h1>

        <div className="flex flex-nowrap items-center gap-2 w-full lg:w-auto mb-4">
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
            onKeyDown={handleKeyDown}
            className="border border-gray-400 rounded-md flex-grow min-w-0 py-2 lg:py-2 px-2 lg:px-3 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="bg-green-700 hover:bg-green-800 text-white rounded-md flex items-center gap-2 whitespace-nowrap min-w-[80px] py-2 lg:py-2 px-3 lg:px-4 text-sm lg:text-base"
          >
            <FaSearch />
            Search
          </button>
        </div>

        <div className="flex flex-col gap-5 object-cover">
          {currentResidents.length > 0 ? (
            currentResidents.map((resident) => (
              <BoxSalary
              key={resident.id}
              id={resident.id}
              image={resident.image}
              name={resident.name}
              age={calculateAge(resident.dob) ?? 0}
            />
            
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 font-medium">
              No residents found.
            </div>
          )}
        </div>

        <div className="flex justify-center items-center mt-8 gap-4 flex-wrap">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-white ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#207137]'}`}
          >
            Previous
          </button>
          <span className="text-base font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md text-white ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#207137]'}`}
          >
            Next
          </button>
        </div>



        <div
          onClick={handleAddResident}
          className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow cursor-pointer border border-dashed border-gray-400 hover:bg-gray-50 mt-5"
        >
          <FaPlus className="text-green-600" />
          <span className="text-sm font-medium text-green-600">Add New Resident</span>
        </div>

{showAddResidentModal && (
    

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2 sm:px-4">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl p-6 bg-white rounded-2xl shadow-2xl">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Add New Resident</h3>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="search"
                placeholder="Enter resident name"
                value={newResidentData.search}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                name="salary"
                placeholder="Enter salary"
                value={newResidentData.salary}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="date"
                name="date"
                value={newResidentData.date}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-800 hover:bg-green-700 text-white px-5 py-2 rounded-md w-full sm:w-auto"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ResidentList;




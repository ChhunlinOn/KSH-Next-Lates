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
  const [allResidents, setAllResidents] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddResidentModal, setShowAddResidentModal] = useState(false);
  const [newResidentData, setNewResidentData] = useState({
    name: '',
    medicalUse: false,
  });

  const handlefetchResidents = async () => {
    try {
      const response = await fetch(
        `${api_url}/resident-medicals?filters[require_to_use][$eq]=true&populate[resident][populate]=profile_img_url`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
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

  const fetchAllResidents = async () => {
    try {
      const response = await fetch(
        `${api_url}/beneficiaries?populate=profile_img_url&pagination[page]=1&pagination[pageSize]=1000`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAllResidents(data.data);
    } catch (error) {
      console.error('Error fetching all residents:', error);
    }
  };

  const handleSelect = (resident: any) => {
    setInput(resident.attributes.fullname_english);
    setNewResidentData((prev) => ({
      ...prev,
      name: resident.attributes.fullname_english,
    }));
  };

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


  const handleSubmit = async () => {
    const { name, medicalUse } = newResidentData;
    const selectedResident = allResidents.find(
      (res) => res.attributes.fullname_english === name
    );
  
    if (!selectedResident) {
      alert('Resident not found!');
      return;
    }
  
    try {
      const response = await fetch(`${api_url}/resident-medicals?filters[require_to_use][$eq]=true&populate[resident][populate]=profile_img_url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            require_to_use: medicalUse,
            resident: selectedResident.id,
          },
        }),
      });
  
      if (response.ok) {
        await handlefetchResidents(); 
        setShowAddResidentModal(false);
        setNewResidentData({ name: '', medicalUse: false });
        setInput('');
      } else {
        const errorData = await response.json();
        console.error('API error:', errorData);
        alert('Failed to add new medical record.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error while saving. Please try again.');
    }
  };
  

  const handleAddResident = () => {
    setShowAddResidentModal(true);
    fetchAllResidents(); 
  };
  const handleCloseModal = () => setShowAddResidentModal(false);

  const filteredResidents = residents.filter((resident) => {
    const name =
      resident?.attributes?.resident?.data?.attributes?.fullname_english ||
      resident?.name ||
      '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredOptions = allResidents.filter((resident) =>
    resident.attributes.fullname_english
      .toLowerCase()
      .includes(input.toLowerCase())
  );

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

  useEffect(() => {
    handlefetchResidents();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="w-[95%] max-w-screen-xl min-h-screen bg-gradient-to-b py-10 px-6 relative">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-center text-green-800 mb-6 drop-shadow-md">
          Medical
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
            className="border border-gray-400 rounded-md flex-grow min-w-0
             py-2 lg:py-2 px-2 lg:px-3 text-sm lg:text-base
             focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="bg-green-700 hover:bg-green-800 text-white
            rounded-md flex items-center gap-2 whitespace-nowrap
            min-w-[80px] py-2 lg:py-2 px-3 lg:px-4 text-sm lg:text-base"
          >
            <FaSearch />
            Search
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {currentResidents.length > 0 ? (
            currentResidents.map((resident) => (
              <BoxResident
                key={resident.id}
                id={resident.id}
                image={
                  resident?.attributes?.resident?.data?.attributes
                    ?.profile_img_url?.data?.attributes?.url
                }
                name={
                  resident?.attributes?.resident?.data?.attributes
                    ?.fullname_english
                }
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
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl p-6 bg-white rounded-2xl shadow-2xl">
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
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search resident..."
                  className="w-full border border-gray-400 rounded-md px-3 py-2 mb-2"
                />
                {filteredOptions.length > 0 && (
                  <ul className="max-h-32 overflow-y-auto border border-gray-200 rounded-md mb-4">
                    {filteredOptions.map((resident) => (
                      <li
                        key={resident.id}
                        onClick={() => handleSelect(resident)}
                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {resident.attributes.profile_img_url?.data?.attributes
                          ?.url && (
                          <img
                            src={
                              resident.attributes.profile_img_url.data
                                .attributes.url
                            }
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        {resident.attributes.fullname_english}
                      </li>
                    ))}
                  </ul>
                )}

<div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full">
  <input
    type="checkbox"
    name="medicalUse"
    checked={newResidentData.medicalUse}
    onChange={handleInputChange}
    className="form-checkbox h-5 w-5 text-blue-600"
  />
  <label className="ml-3 text-gray-700 select-none">Medical Use</label>
</div>

                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <FaTimes className="text-sm" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-md w-full sm:w-auto"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalList;

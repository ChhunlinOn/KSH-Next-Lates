'use client';
import React, { useState, useEffect } from 'react';
import BoxSalary from '../../../component/boxSalary';
import { FaPlus, FaTimes, FaSearch } from 'react-icons/fa';
import axios from 'axios';

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
    resident: '',
    date: '',
  });

  const fetchResident = async () => {
    try {
      const response = await fetch(`${API_URL}/internships?populate[resident][populate]=profile_img_url&populate[date]=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      });
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

  const fetchAllResidents = async () => {
    try {
      const response = await fetch(`${API_URL}/beneficiaries?populate=profile_img_url&pagination[page]=1&pagination[pageSize]=1000`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.json();
      setSearch(data.data);
    } catch (error) {
      console.error('Error fetching all residents:', error);
    }
  };

  const handleAddResident = () => {
    setShowAddResidentModal(true);
    fetchAllResidents();
  };

  useEffect(() => {
    fetchResident();
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
    setNewResidentData((prev) => ({ ...prev, resident: resident.attributes.fullname_english }));
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitted data:', newResidentData);
  
      const selectedResident = filteredOptions.find(
        (r) => r.attributes.fullname_english === newResidentData.resident
      );
  
      if (!selectedResident) {
        alert('Resident not found!');
        return;
      }
  
      const duplicate = residents.find((r) => r.name === newResidentData.resident);
      if (duplicate) {
        alert('This resident has already been added.');
        return;
      }
  
      const payload = {
        data: {
          resident: selectedResident.id,
          date: [],
        },
      };
  
      console.log('Sending payload:', payload);
  
      const response = await axios.post(
        `${API_URL}/internships?populate=*`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('API Response:', response.data);
  
      fetchResident();
      setShowAddResidentModal(false);
      setInput('');
      setNewResidentData({ resident: '', date: '' });
  
    } catch (error) {
      console.error('Error saving internship:', error);
      alert('Failed to save internship. Check console for details.');
    }
  };
  
  
  

  const residentsPerPage = 10;
  const filteredResidents = residents.filter((resident) =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredResidents.length / residentsPerPage);
  const currentResidents = filteredResidents.slice(
    (currentPage - 1) * residentsPerPage,
    currentPage * residentsPerPage
  );

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleCloseModal = () => setShowAddResidentModal(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewResidentData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearch = () => {
    setCurrentPage(1);
    setSearchTerm(searchName.trim());
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch();
  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-[95%] max-w-screen-xl min-h-screen bg-white py-10 px-6 relative">
      <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-center text-green-800 mb-6 drop-shadow-md">
    Resident Salary
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

        <div className="space-y-4">
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
            <p className="text-center text-gray-500">No residents found.</p>
          )}
        </div>

        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-white ${currentPage === 1 ? 'bg-gray-400' : 'bg-green-700'}`}
          >Previous</button>
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md text-white ${currentPage === totalPages ? 'bg-gray-400' : 'bg-green-700'}`}
          >Next</button>
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
                <div className="relative w-full">
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
                          {resident.attributes.profile_img_url?.data?.attributes?.url && (
                            <img
                              src={resident.attributes.profile_img_url.data.attributes.url}
                              alt=""
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          {resident.attributes.fullname_english}
                        </li>
                      ))}
                    </ul>
                  )}
                  <input
                    type="date"
                    name="date"
                    value={newResidentData.date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-400 rounded-md px-3 py-2 mb-4"
                  />
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
                      className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-md w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResidentList;

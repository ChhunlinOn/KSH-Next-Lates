'use client';
import React, { useState } from 'react';
import BoxResident from '../../../component/medicalBox';
import { FaPlus, FaTimes, FaSearch } from 'react-icons/fa';

const MedicalList: React.FC = () => {
  const [residents, setResidents] = useState<any[]>([
    {
      id: '1',
      name: 'Sok Dara',
      date_of_birth: '2005-06-15',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
      medicalUse: true,
    },
    {
      id: '2',
      name: 'Kim Lina',
      date_of_birth: '2006-02-20',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
      medicalUse: true,
    },
    {
      id: '3',
      name: 'Kim Alysa',
      date_of_birth: '2006-02-20',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
      medicalUse: true,
    },
    {
      id: '4',
      name: 'Kim Kanha',
      date_of_birth: '2006-02-20',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
      medicalUse: true,
    },
    {
      id: '5',
      name: 'Kim Nynao',
      date_of_birth: '2006-02-20',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
    },
    {
      id: '6',
      name: 'Kim Kaknika',
      date_of_birth: '2006-02-20',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
      medicalUse: true,
    },
    {
      id: '7',
      name: 'Kim Lina',
      date_of_birth: '2006-02-20',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
      medicalUse: true,
    },
    {
      id: '8',
      name: 'Kim Nona',
      date_of_birth: '2006-02-20',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
      medicalUse: true,
    },
    {
      id: '9',
      name: 'Kim Alyka',
      date_of_birth: '2006-02-20',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
      medicalUse: true,
    },
  ]);

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

  const filteredResidents = residents.filter((resident) =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    resident.medicalUse
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

  return (
    <div className="flex justify-center w-full ">
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
  className="border border-gray-400 rounded-md flex-grow min-w-0
             py-2 lg:py-2 px-2 lg:px-3 text-sm lg:text-base
             focus:outline-none focus:ring-2 focus:ring-green-500"
/>
          <button
            onClick={handleSearch}
            className="bg-green-700 hover:bg-green-800 text-white
            rounded-md flex items-center gap-2 whitespace-nowrap
            min-w-[80px] py-2 lg:py-2 px-3 lg:px-4 text-sm lg:text-base"          >
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
                image={resident.image}
                name={resident.name}
                medicalUse={resident.medicalUse}
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

"use client"
import React, { useState } from 'react';
import BoxResident from '../../../component/boxResident';
import DropdownYearResident from '../../../component/dropDownYearResident';
import { FaPlus } from 'react-icons/fa';
import { FaTimes } from "react-icons/fa";


const ResidentList: React.FC = () => {
  const [residents, setResidents] = useState<any[]>([
    {
      id: '1',
      name: 'Sok Dara',
      date_of_birth: '2005-06-15',
      image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
    },
    {
      id: '2',
      name: 'Kim Lina',
      date_of_birth: '2006-02-20',
      image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
    },
    {
      id: '3',
      name: 'Chan Sovann',
      date_of_birth: '2004-11-08',
      image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
    },
    {
        id: '4',
        name: 'Chan Sovann',
        date_of_birth: '2004-11-08',
        image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
      },    {
        id: '5',
        name: 'Chan Sovann',
        date_of_birth: '2004-11-08',
        image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
      },    {
        id: '6',
        name: 'Chan Sovann',
        date_of_birth: '2004-11-08',
        image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
      },
      {
        id: '7',
        name: 'Chan Sovann',
        date_of_birth: '2004-11-08',
        image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
      },    {
        id: '8',
        name: 'Chan Sovann',
        date_of_birth: '2004-11-08',
        image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
      },    {
        id: '9',
        name: 'Chan Sovann',
        date_of_birth: '2004-11-08',
        image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
      },    {
        id: '10',
        name: 'Chan Sovann',
        date_of_birth: '2004-11-08',
        image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
      },    {
        id: '11',
        name: 'Chan Sovann',
        date_of_birth: '2004-11-08',
        image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
      },
  ]);

  const [selectedYear, setSelectedYear] = useState('');
  const [type, setType] = useState('1');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddResidentModal, setShowAddResidentModal] = useState(false);

  const [newResidentData, setNewResidentData] = useState({
    name: '',
    age: '',
    image: '',
  });

  const residentsPerPage = 10;
  const filteredResidents = selectedYear ? residents : residents;

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
    setNewResidentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (newResidentData.name && newResidentData.age && newResidentData.image) {
      const newResident = {
        id: (residents.length + 1).toString(),
        name: newResidentData.name,
        date_of_birth: newResidentData.age, 
        image: newResidentData.image,
      };

      setResidents([...residents, newResident]);
      setShowAddResidentModal(false); 
    } else {
      alert('Please fill out all fields!');
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-[95%] max-w-screen-xl">
        <div className="flex justify-between items-center gap-4 mt-24 mb-5">
          <DropdownYearResident
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
          <div className="flex items-center gap-2">
            <label htmlFor="type" className="text-sm sm:text-base font-semibold">
              Level
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 border border-gray-400 rounded-md w-28 sm:w-32"
            >
              <option value="1">All Level</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
              <option value="5-6">Level 5</option>
            </select>
          </div>
        </div>

        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-green-800 mb-6">
          Residents
        </h2>

        <div className="flex flex-col gap-5 object-cover">
        {currentResidents.length > 0 ? (
  currentResidents.map((resident) => (
    <BoxResident
      key={resident.id} 
      id={resident.id}
      image={resident.image}
      name={resident.name}
      age={0}
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
            className={`px-4 py-2 rounded-md text-white ${
              currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#207137]'
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
              currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#207137]'
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
          name="name"
          placeholder="Enter Name"
          value={newResidentData.name}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={newResidentData.age}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="image"
          placeholder="Enter Image URL"
          value={newResidentData.image}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
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

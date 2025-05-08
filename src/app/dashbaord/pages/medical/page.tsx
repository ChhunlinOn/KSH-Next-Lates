'use client';
import React, { useState } from 'react';
import BoxResident from '../../../component/medicalBox';
import { FaPlus, FaTimes } from 'react-icons/fa';

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
      },  {
        id: '4',
        name: 'Kim Kanha',
        date_of_birth: '2006-02-20',
        image:
          'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
        medicalUse: true,
      },  {
        id: '5',
        name: 'Kim Nynao',
        date_of_birth: '2006-02-20',
        image:
        'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
      },  {
        id: '6',
        name: 'Kim Kaknika',
        date_of_birth: '2006-02-20',
        image:
        'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
        medicalUse: true,
      },  {
        id: '7',
        name: 'Kim Lina',
        date_of_birth: '2006-02-20',
        image:
        'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
        medicalUse: true,
      },  {
        id: '8',
        name: 'Kim Nona',
        date_of_birth: '2006-02-20',
        image:
          'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
        medicalUse: true,
      },  {
        id: '9',
        name: 'Kim Alyka',
        date_of_birth: '2006-02-20',
        image:
          'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
        medicalUse: true,
      },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [showAddResidentModal, setShowAddResidentModal] = useState(false);

  const [newResidentData, setNewResidentData] = useState({
    name: '',
    image: '',
    medicalUse: false,
  });

  const residentsPerPage = 10;
  const totalPages = Math.ceil(residents.length / residentsPerPage);
  const currentResidents = residents.slice(
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
    const { name, value, type, checked } = e.target;
    setNewResidentData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const { name, image } = newResidentData;
    if (name && image) {
      const newResident = {
        id: (residents.length + 1).toString(),
        ...newResidentData,
      };
      setResidents([...residents, newResident]);
      setShowAddResidentModal(false);
      setNewResidentData({
        name: '',
        image: '',
        medicalUse: false,
      });
    } else {
      alert('Please fill out all fields!');
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-[95%] max-w-screen-xl">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-green-800 mb-6">
          Medicals
        </h2>

        <div className="flex flex-col gap-5 object-cover">
          {currentResidents.length > 0 ? (
            currentResidents.map((resident) =>
              resident.medicalUse ? (
                <BoxResident
                  key={resident.id}
                  id={resident.id}
                  image={resident.image}
                  name={resident.name}
                  medicalUse={true}
                />
              ) : null
            )
          ) : (
            <div className="col-span-full text-center text-gray-500 font-medium">
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
                : 'bg-[#207137]'
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
                : 'bg-[#207137]'
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
                  name="name"
                  placeholder="Enter Name"
                  value={newResidentData.name}
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
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="medicalUse"
                    checked={newResidentData.medicalUse}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Use Medical</label>
                </div>
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

export default MedicalList;

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaTimes, FaPlus } from 'react-icons/fa';
import ResidentBoxInfo from '../../../../component/residentBoxInfo';

interface CustomInfo {
  name: string;
  value: string;
}

const ResidentDetailPage: React.FC = () => {
  const [showAddResidentModal, setShowAddResidentModal] = useState(false);
  const [newInfo, setNewInfo] = useState<CustomInfo>({ name: '', value: '' });
  const [customInfos, setCustomInfos] = useState<CustomInfo[]>([]);

  const handleOpenModal = () => setShowAddResidentModal(true);
  const handleCloseModal = () => setShowAddResidentModal(false);

  const handleAddInfo = () => {
    if (newInfo.name && newInfo.value) {
      setCustomInfos((prev) => [...prev, newInfo]);
      setNewInfo({ name: '', value: '' });
      handleCloseModal();
    }
  };

  const residentData = {
    fullname_english: 'John Doe',
    gender: 'Male',
    type_of_disability: 'None',
    date_of_birth: '01-01-1990',
    is_required_medical_use: false,
    medical_use: 'None',
    is_active: true,
    start_date: '01-01-2022',
    end_date: '01-01-2023',
    profile_img_url: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              url: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
            }
          }
        }
      }
    }
  };

  const profileImageUrl = residentData.profile_img_url?.data?.attributes?.formats?.thumbnail?.url || null;

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 py-8">
<div className="max-w-screen-lg mx-auto flex justify-between items-center mb-8  gap-4 px-2 overflow-x-auto whitespace-nowrap">
  <Link href="/dashbaord/pages/resident">
    <button className="bg-gray-500 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap">
      Back
    </button>
  </Link>
  <div className="flex gap-2 sm:gap-4 whitespace-nowrap">
    <button className="bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap">
      Program
    </button>
    <button className="bg-red-700 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap">
      Medical
    </button>
  </div>
</div>



      <div className="max-w-screen-lg mx-auto flex justify-center items-center mb-6">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt="Profile"
            className="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover shadow-lg"
          />
        ) : (
          <p className="text-xl font-semibold text-gray-600">No Image Available</p>
        )}
      </div>

      <h1 className="text-xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        Detail Information of Resident
      </h1>

      <div className="bg-white w-full max-w-screen-lg mx-auto rounded-lg p-6 shadow-lg border border-gray-200">
        <ResidentBoxInfo name="Full Name" value={residentData.fullname_english} />
        <ResidentBoxInfo name="Gender" value={residentData.gender} />
        <ResidentBoxInfo name="Type Of Disability" value={residentData.type_of_disability} />
        <ResidentBoxInfo name="Date Of Birth" value={residentData.date_of_birth} />
        <ResidentBoxInfo name="Required Medical Use" value={residentData.is_required_medical_use ? "Yes" : "No"} />
        <ResidentBoxInfo name="Medical Use" value={residentData.medical_use} />
        <ResidentBoxInfo name="Is Active" value={residentData.is_active ? "Yes" : "No"} />
        <ResidentBoxInfo name="Start Date" value={residentData.start_date} />
        <ResidentBoxInfo name="End Date" value={residentData.end_date} />

        {customInfos.map((info, index) => (
          <ResidentBoxInfo key={index} name={info.name} value={info.value} />
        ))}
      </div>

      <div
        onClick={handleOpenModal}
        className="max-w-screen-lg mx-auto mt-5 flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow cursor-pointer border border-dashed border-gray-400 hover:bg-gray-50"
      >
        <FaPlus className="text-green-600" />
        <span className="text-sm font-medium text-green-600">Add Custom Info</span>
      </div>

      {showAddResidentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2 sm:px-4">
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl p-6 bg-white rounded-2xl shadow-2xl">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Add Custom Info</h3>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Enter Info Label (e.g. Hobby)"
                value={newInfo.name}
                onChange={(e) => setNewInfo({ ...newInfo, name: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="value"
                placeholder="Enter Info Value (e.g. Painting)"
                value={newInfo.value}
                onChange={(e) => setNewInfo({ ...newInfo, value: e.target.value })}
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
                onClick={handleAddInfo}
                className="bg-green-800 hover:bg-green-700 text-white px-5 py-2 rounded-md w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentDetailPage;
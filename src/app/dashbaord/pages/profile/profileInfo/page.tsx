"use client";
import React, { useState } from 'react';
import { FaEdit, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const ProfileInfoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profile, setProfile] = useState({
    fullName: 'Canyon.',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    location: 'Siem Reap, Cambodia',
    memberSince: 'Jan 2023',
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setProfile(formData);
    setIsModalOpen(false);
    console.log('Updated Profile:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative">
      <div className="absolute top-8 left-8 z-20">
        <Link href="/dashbaord/pages/profile">
        <button className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300">
            Back
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl min-h-[700px] flex flex-col lg:flex-row overflow-hidden z-10">
        <div className="w-full lg:w-1/2 bg-green-50 flex flex-col items-center justify-center p-14 text-center">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg"
            alt="Profile"
            className="w-60 h-60 rounded-full object-cover shadow-lg border-4 border-green-700"
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-8">{profile.fullName}</h2>
          <p className="text-2xl text-green-700 font-semibold mt-2">Administrator</p>
        </div>

        <div className="w-full lg:w-1/2 p-10 sm:p-20 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-12 lg:gap-y-32 lg:gap-x-32 mb-12">
            <div>
              <p className="text-xl text-gray-500 mb-1">Email</p>
              <p className="text-xl font-medium text-gray-800">{profile.email}</p>
            </div>
            <div>
              <p className="text-xl text-gray-500 mb-1">Phone</p>
              <p className="text-xl font-medium text-gray-800">{profile.phone}</p>
            </div>
            <div>
              <p className="text-xl text-gray-500 mb-1">Location</p>
              <p className="text-xl font-medium text-gray-800">{profile.location}</p>
            </div>
            <div>
              <p className="text-xl text-gray-500 mb-1">Member Since</p>
              <p className="text-xl font-medium text-gray-800">{profile.memberSince}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-end">
            <button
              onClick={() => {
                setFormData(profile);
                setIsModalOpen(true);
              }}
              className="flex items-center justify-center gap-3 px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-lg rounded-xl shadow transition"
            >
              <FaEdit className="text-xl" />
              Edit Profile
            </button>
            <button className="flex items-center justify-center gap-3 px-4 py-2 border border-red-500 text-red-500 text-lg rounded-xl shadow hover:bg-red-100 transition">
              <FaSignOutAlt className="text-xl" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white px-4 py-6 sm:px-8 sm:py-10 rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Member Since</label>
                <input
                  type="text"
                  name="memberSince"
                  value={formData.memberSince}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <FaTimes className="text-sm" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfoPage;

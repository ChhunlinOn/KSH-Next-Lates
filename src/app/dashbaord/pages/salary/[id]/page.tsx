'use client';
import React, { useState } from 'react';
import { FaTimes, FaPlus } from "react-icons/fa";
import Link from 'next/link';

interface SalaryBoxProps {
  month: string;
  day: number;
  year: number;
  amount: number;
}

const formatMoney = (value: number) =>
  `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const SalaryBox: React.FC<SalaryBoxProps> = ({ month, day, year, amount }) => {
  const formattedSalary = formatMoney(amount);
  const dateStr = `${day}, ${year}`;

  return (
    <div className="bg-gray-50 hover:bg-gray-100 transition-all duration-200 rounded-xl px-4 py-6 shadow-sm flex justify-between items-center text-center">
      <div className="font-semibold text-gray-700 text-md md:text-lg lg:text-xl">{month}</div>
      <div className="text-gray-400 text-md md:text-lg lg:text-xl font-semibold">{dateStr}</div>
      <div className="text-gray-900 text-md md:text-lg lg:text-xl">{formattedSalary}</div>
    </div>
  );
};

const SalaryPage: React.FC = () => {
  const salaryData = {
    fullname_english: 'Kim Alysa',
    profile_img_url: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              url: 'https://static.vecteezy.com/system/resources/thumbnails/038/974/578/small_2x/ai-generated-professional-portrait-of-a-competent-woman-free-photo.jpg',
            },
          },
        },
      },
    },
  };

  const profileImageUrl =
    salaryData.profile_img_url?.data?.attributes?.formats?.thumbnail?.url || null;

  const [monthlySalaries, setMonthlySalaries] = useState([
    { month: 'January', day: 1, year: 2025, amount: 100 },
    { month: 'February', day: 2, year: 2025, amount: 200 },
    { month: 'March', day: 3, year: 2025, amount: 300 },
    { month: 'April', day: 4, year: 2025, amount: 400 },
    { month: 'May', day: 5, year: 2025, amount: 500 },
    { month: 'June', day: 6, year: 2025, amount: 600 },
    { month: 'July', day: 7, year: 2025, amount: 700 },
    { month: 'August', day: 8, year: 2025, amount: 800 },
    { month: 'September', day: 9, year: 2025, amount: 900 },
    { month: 'October', day: 10, year: 2025, amount: 1000 },
    { month: 'November', day: 11, year: 2025, amount: 1100 },
    { month: 'December', day: 12, year: 2025, amount: 1200 },
  ]);

  const [newSalary, setNewSalary] = useState({
    month: '',
    day: 1,
    year: 2025,
    amount: 0,
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const salariesPerPage = 12;
  const totalPages = Math.ceil(monthlySalaries.length / salariesPerPage);
  const currentSalaries = monthlySalaries.slice(
    (currentPage - 1) * salariesPerPage,
    currentPage * salariesPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSalary((prev) => ({
      ...prev,
      [name]: name === 'amount' || name === 'day' || name === 'year' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSalary.month || !newSalary.day || !newSalary.year || newSalary.amount <= 0) {
      alert('Please fill in all fields correctly.');
      return;
    }
    setMonthlySalaries((prev) => [...prev, newSalary]);
    setNewSalary({ month: '', day: 1, year: 2025, amount: 0 });
    setIsFormVisible(false);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="min-h-screen py-10 px-4 relative">
<div className="max-w-6xl mx-auto flex justify-start mb-6">
  <Link href="/dashbaord/pages/salary">
    <button className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300">
      Back
    </button>
  </Link>
</div>
      <div className="flex justify-center mb-6">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt="Profile"
            className="h-40 w-40 md:h-48 md:w-48 rounded-full object-cover"
          />
        ) : (
          <p className="text-xl font-semibold text-gray-600">No Image Available</p>
        )}
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        {salaryData.fullname_english}
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 justify-center">
        {currentSalaries.map((item, index) => (
          <SalaryBox key={index} {...item} />
        ))}
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


<div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 justify-center mt-6">


  <div
    onClick={() => setIsFormVisible(true)}
    className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl shadow cursor-pointer border border-dashed border-gray-400 hover:bg-gray-50 transition-all duration-200"
  >
    <FaPlus className="text-green-600" />
    <span className="text-md font-medium text-green-600">Add New Salary</span>
  </div>
</div>



      {isFormVisible && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Add New Salary</h2>
              <button
                onClick={handleCloseForm}
                className="text-gray-600 hover:text-gray-900 text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="month" className="block text-gray-700">Month</label>
                  <input
                    type="text"
                    id="month"
                    name="month"
                    value={newSalary.month}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter month"
                  />
                </div>

                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="day" className="block text-gray-700">Day</label>
                    <input
                      type="number"
                      id="day"
                      name="day"
                      value={newSalary.day}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="year" className="block text-gray-700">Year</label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      value={newSalary.year}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="amount" className="block text-gray-700">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={newSalary.amount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <FaTimes className="text-sm" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-800 hover:bg-green-700 text-white px-5 py-2 rounded-md w-full sm:w-auto"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryPage;

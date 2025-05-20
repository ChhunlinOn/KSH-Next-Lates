"use client"
import React, { useState, useEffect } from 'react';
import BoxSalary from '../../../component/boxSalary';
import DropdownYearResident from '../../../component/dropDownYearResident';
import { FaPlus } from 'react-icons/fa';
import { FaTimes } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import dotenv from 'dotenv';
// import { console } from 'inspector';

// interface ResidentListProps {
//   session: {
//     jwt: string;
//     userRole?: string;
//     userImage?: string;
//   } | null;
// }

const ResidentList: React.FC = () => {

dotenv.config();
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
  console.log('API_URL:', API_URL);
  console.log('TOKEN:', TOKEN);
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState<typeof residents[0] | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState<any[]>([]);
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
    }, {
      id: '5',
      name: 'Chan Sovann',
      date_of_birth: '2004-11-08',
      image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
    }, {
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
    }, {
      id: '8',
      name: 'Chan Sovann',
      date_of_birth: '2004-11-08',
      image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
    }, {
      id: '9',
      name: 'Chan Sovann',
      date_of_birth: '2004-11-08',
      image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
    }, {
      id: '10',
      name: 'Chan Sovann',
      date_of_birth: '2004-11-08',
      image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
    }, {
      id: '11',
      name: 'Chan Sovann',
      date_of_birth: '2004-11-08',
      image: 'https://img.freepik.com/premium-photo/professional-business-woman-cartoon-character-with-glasses-arms-crossed-confidence-pink_996993-57501.jpg',
    },
  ]);

  const getFilteredOptions = () => {
    if (input.trim() === '') return search;

    return search.filter((resident) =>
      resident.attributes.fullname_english.toLowerCase().includes(input.trim().toLowerCase())
    );
  };
  const filteredOptions = getFilteredOptions();

  const handleSelect = (resident: typeof search[0]) => {
    console.log('Selected resident:', resident);
    setInput(resident.attributes.fullname_english);
    setSelected(resident); // now storing the full object
    setShowDropdown(false);
  };

  const fectchResident = async () => {
    const response = await fetch(`${API_URL}/curriculum-program-levels?filters[program_level][program_level_name][$eq]=Level%201&filters[curriculum][end_date][$lte]=2025-12-31&populate[residents][populate]=profile_img_url&populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log('Fetched data:', data.data[0].attributes.residents.data[0].attributes);
    setSearch(data.data[0].attributes.residents.data);
  };

  useEffect(() => {
    fectchResident();
  }, []);


  const [selectedYear, setSelectedYear] = useState('');
  const [type, setType] = useState('1');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddResidentModal, setShowAddResidentModal] = useState(false);

  const [newResidentData, setNewResidentData] = useState({
    search: '',
    salary: '',
    date: '',
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
    if (newResidentData.search && newResidentData.salary && newResidentData.date) {
      const newResident = {
        id: (residents.length + 1).toString(),
        search: newResidentData.search,
        salary: newResidentData.salary,
        date: newResidentData.date,
      };

      setResidents([...residents, newResident]);
      setShowAddResidentModal(false);
    } else {
      alert('Please fill out all fields!');
    }
  };
  const handleSearch = () => {
    setCurrentPage(1);
    setSearchTerm(searchName.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const [searchName, setSearchName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
            onChange={(e) => setSearchName(e.target.value)}
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
 

        <div className="flex flex-col gap-5 object-cover">
          {currentResidents.length > 0 ? (
            currentResidents.map((resident) => (
              <BoxSalary
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
            className={`px-4 py-2 rounded-md text-white ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#207137]'
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
            className={`px-4 py-2 rounded-md text-white ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#207137]'
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
                <div className="relative">
                  <input
                    type="text"
                    id="resident-search"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setShowDropdown(true);
                      setSelected(null);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // delay to let click register
                    placeholder="Search resident by name"
                    className="w-full px-4 py-2 border rounded-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  {showDropdown && (
                    <ul className="absolute w-full bg-white border rounded shadow z-10 max-h-[300px] overflow-y-auto mt-1">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((resident, index) => (
                          <li
                            key={index}
                            onMouseDown={() => handleSelect(resident)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {resident.attributes.profile_img_url?.data?.attributes?.url || resident.image ? (
                              <img
                                src={
                                  resident.attributes.profile_img_url?.data?.attributes?.url
                                    ? resident.attributes.profile_img_url.data.attributes.url
                                    : resident.image
                                }
                                alt={resident.attributes.fullname_english || resident.name || "Resident"}
                                className="h-8 w-8 rounded-full object-cover bg-gray-200"
                              />
                            ) : null}
                            <div>
                              <p className="font-medium">{resident.attributes.fullname_english}</p>
                              <p className="text-sm text-gray-500">🎂 {resident.attributes.date_of_birth}</p>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-500">❌ No resident found</li>
                      )}
                    </ul>
                  )}
                </div>
                {selected && (
                  <div className="flex items-center gap-4 p-4 border rounded bg-gray-50">
                    {selected.attributes.profile_img_url?.data?.attributes?.url || selected.image ? (
                      <img
                        src={
                          selected.attributes.profile_img_url?.data?.attributes?.url
                            ? selected.attributes.profile_img_url.data.attributes.url
                            : selected.image
                        }
                        alt={selected.attributes.fullname_english || selected.name || "Resident"}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : null}
                    <div>
                      <p className="text-lg font-semibold">{selected.attributes.fullname_english}</p>
                      <p className="text-sm text-gray-600">🎂 {selected.attributes.date_of_birth}</p>
                    </div>
                  </div>
                )}

                <input
                  type="number"
                  name="salary"
                  placeholder="Enter Salary"
                  value={newResidentData.salary}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="date"
                  name="date"
                  placeholder="Enter date"
                  value={newResidentData.date}
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

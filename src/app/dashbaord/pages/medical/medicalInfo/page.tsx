'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaTimes, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import ResidentBoxInfo from '../../../../component/medicalBoxInfo';

interface CustomInfo {
  name: string;
  value: string;
}

interface Document {
  title: string;
  imageUrl: string;
  link: string;
}

const MedicalDetailPage: React.FC = () => {
  const [showAddResidentModal, setShowAddResidentModal] = useState(false);
  const [newInfo, setNewInfo] = useState<CustomInfo>({ name: '', value: '' });
  const [customInfos, setCustomInfos] = useState<CustomInfo[]>([]);
  const [documents] = useState<Document[]>([
    {
      title: 'Medical Report',
      imageUrl:
        'https://plumsail.com/static/eade2ba6d4a6bf0947c24f462853c95b/e46ed/thumbnail.png',
      link: 'https://drive.google.com',
    },
    {
      title: 'X-Ray Results',
      imageUrl:
        'https://images.squarespace-cdn.com/content/v1/5c308af3f2e6b1bd0e605a39/1616289419150-ZLE2Z6DES0A73UY83RLL/Mediastinum.+Strong+Medicine.+How+to+Interpret+a+Chest+X-Ray+%28Lesson+2+-+A+Systematic+Method+and+Anatomy%29.',
      link: 'https://drive.google.com',
    },
  ]);

  const handleOpenModal = () => setShowAddResidentModal(true);
  const handleCloseModal = () => setShowAddResidentModal(false);

  const handleAddInfo = () => {
    if (newInfo.name && newInfo.value) {
      setCustomInfos((prev) => [...prev, newInfo]);
      setNewInfo({ name: '', value: '' });
      handleCloseModal();
    }
  };


  const medicalData = {
    fullname_english: 'Kim Alysa',
    gender: 'Female',
    type_of_disability: 'Autism Spectrum Disorder',
    date_of_birth: '01-01-1990',
    is_required_medical_use: true,
    medical_use: 'Anti-seizure medication',
    is_active: true,
    start_date: '01-01-2022',
    end_date: '01-01-2023',
    medical_treatment: 'Occupational therapy, Speech therapy',
    doctor_name: 'Dr. Emily Smith',
    comment: 'Needs regular therapy and follow-up every 3 months.',
    next_appointment: '01-07-2025',
    profile_img_url: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              url: 'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
            },
          },
        },
      },
    },
  };

  const profileImageUrl =
    medicalData.profile_img_url?.data?.attributes?.formats?.thumbnail?.url || null;

  return (
    <div className="min-h-screen p-8 relative">
      <div className="w-[80%] mx-auto flex justify-between items-center mb-8 mt-16">
        <Link href="/dashbaord/pages/medical">
          <button className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300">
            Back
          </button>
        </Link>
      </div>

      <div className="w-[80%] mx-auto flex justify-center items-center mb-6">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt="Profile"
            className="h-36 w-36 md:h-48 md:w-48 rounded-full object-cover shadow-lg"
          />
        ) : (
          <p className="text-xl font-semibold text-gray-600">No Image Available</p>
        )}
      </div>

      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 text-gray-800 w-[80%] mx-auto">
        Medical Information of Resident
      </h1>

      <div className="bg-white w-[80%] mx-auto rounded-lg p-6 shadow-lg border border-gray-200">
        <ResidentBoxInfo name="Full Name" value={medicalData.fullname_english} />
        <ResidentBoxInfo name="Gender" value={medicalData.gender} />
        <ResidentBoxInfo name="Disability/Disorder" value={medicalData.type_of_disability} />
        <ResidentBoxInfo name="Date of Birth" value={medicalData.date_of_birth} />
        <ResidentBoxInfo
          name="Required Medical Use"
          value={medicalData.is_required_medical_use ? 'Yes' : 'No'}
        />
        <ResidentBoxInfo name="Medical Use" value={medicalData.medical_use} />
        <ResidentBoxInfo name="Is Active" value={medicalData.is_active ? 'Yes' : 'No'} />
        <ResidentBoxInfo name="Start Date" value={medicalData.start_date} />
        <ResidentBoxInfo name="End Date" value={medicalData.end_date} />
        <ResidentBoxInfo name="Medical Treatment" value={medicalData.medical_treatment} />
        <ResidentBoxInfo name="Doctor Name" value={medicalData.doctor_name} />
        <ResidentBoxInfo name="Comment" value={medicalData.comment} />
        <ResidentBoxInfo name="Next Appointment" value={medicalData.next_appointment} />
        

        {customInfos.map((info, index) => (
          <div
            key={index}
            className="flex justify-between items-center  py-2 px-2 hover:bg-gray-50 rounded"
          >
            <div className="w-full">
              <ResidentBoxInfo name={info.name} value={info.value} />
            </div>
 
          </div>
        ))}
      </div>

      <div
        onClick={handleOpenModal}
        className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow cursor-pointer border border-dashed border-gray-400 hover:bg-gray-50 mt-5 w-[80%] mx-auto"
      >
        <FaPlus className="text-green-600" />
        <span className="text-sm font-medium text-green-600">Add Custom Info</span>
      </div>

      <div className="mt-8 w-[80%] mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={doc.imageUrl}
                alt={doc.title}
                className="w-32 h-32 md:w-40 md:h-40 object-cover mb-6 mx-auto"
              />
              <h3 className="font-semibold text-xl text-gray-800 text-center mb-4">{doc.title}</h3>
              <a
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-center block"
              >
                View Document
              </a>
            </div>
          ))}
        </div>
      </div>

      {showAddResidentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 overflow-y-auto">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-lg my-12">
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
                placeholder="Enter Info Label (e.g. Allergy)"
                value={newInfo.name}
                onChange={(e) => setNewInfo({ ...newInfo, name: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="value"
                placeholder="Enter Info Value (e.g. Penicillin)"
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

export default MedicalDetailPage;

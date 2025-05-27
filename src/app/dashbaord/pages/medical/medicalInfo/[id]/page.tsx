'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTimes, FaPlus, FaEdit } from 'react-icons/fa';
import ResidentBoxInfo from '../../../../../component/medicalBoxInfo';
import { useParams } from 'next/navigation';
import dotenv from 'dotenv';

interface CustomInfo {
  comment: string;
  title: string;
}

interface Document {
  title: string;
  imageUrl: string;
  link: string;
}

const MedicalDetailPage: React.FC = () => {
  const [showAddResidentModal, setShowAddResidentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newInfo, setNewInfo] = useState<CustomInfo>({ comment: '', title: '' });
  const [customInfos, setCustomInfos] = useState<CustomInfo[]>([]);
  const [residentMedical, setResidentMedical] = useState<any>(null);
  const [residentimg, setResidentImg] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});

  dotenv.config();
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const token = process.env.NEXT_PUBLIC_TOKEN;
  const params = useParams();
  const id = params.id;

  const [documents] = useState<Document[]>([
    {
      title: 'Medical Report',
      imageUrl: 'https://plumsail.com/static/eade2ba6d4a6bf0947c24f462853c95b/e46ed/thumbnail.png',
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


  const handleEditClose = () => setShowEditModal(false);

  const handleAddInfo = async () => {
    if (newInfo.comment && newInfo.title) {
      try {
        const response = await fetch(`${api_url}/medical-comments?populate=*`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              comment: newInfo.comment,
              title: newInfo.title,
              resident_medical: id, 
            },
          }),
        });
  
        if (!response.ok) throw new Error('Failed to add custom info');
  
        const result = await response.json();
        setCustomInfos((prev) => [...prev, result.data.attributes]); // Update frontend state
        setNewInfo({ comment: '', title: '' });
        handleCloseModal();
      } catch (error) {
        console.error('Error adding custom info:', error);
      }
    }
  };
  const fetchCustomInfos = async () => {
    try {
      const response = await fetch(
        `${api_url}/custom-medical-infos?filters[resident_medical][id][$eq]=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCustomInfos(data.data.map((item: any) => item.attributes));
    } catch (error) {
      console.error('Error fetching custom infos:', error);
    }
  };
useEffect(() => {
  handlefetchResident();
  fetchCustomInfos();
}, []);
    

  const handlefetchResident = async () => {
    try {
      const response = await fetch(
        `${api_url}/resident-medicals/${id}?populate[resident][populate][profile_img_url]=true&populate=resident`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setResidentMedical(data.data.attributes);
    } catch (error) {
      console.error('Error fetching resident data:', error);
    }
  };

  const residentid = residentMedical?.resident?.data.id || null;

  const handleResidentdata = async () => {
    if (!residentid) return;
    try {
      const response = await fetch(`${api_url}/beneficiaries/${residentid}?populate=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setResidentImg(data.data?.attributes?.profile_img_url?.data?.attributes?.url);
    } catch (error) {
      console.error('Error fetching resident image:', error);
    }
  };

  useEffect(() => {
    handlefetchResident();
  }, []);

  useEffect(() => {
    if (residentid) {
      handleResidentdata();
    }
  }, [residentid]);

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`${api_url}/resident-medicals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            require_to_use: editForm.require_to_use,
            medical_treatment: editForm.medical_treatment,
            doctor: editForm.doctor,
            specailist_doctor_comment: editForm.specailist_doctor_comment,
            next_appointment: editForm.next_appointment,
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to update');

      handlefetchResident();
      handleEditClose();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  function formatDate(dateString: string | number | Date) {
    if (!dateString) return '';
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  


  const handleEditOpen = () => {
  setEditForm({
    fullname_english: medicalData.fullname_english || '',
    gender: medicalData.gender || '',
    type_of_disability: medicalData.type_of_disability || '',
    date_of_birth: medicalData.date_of_birth || '',
    is_required_medical_use: medicalData.is_required_medical_use || false,
    medical_use: medicalData.medical_use || '',
    is_active: medicalData.is_active || false,
    start_date: medicalData.start_date || '',
    end_date: medicalData.end_date || '',
    medical_treatment: medicalData.medical_treatment || '',
    doctor_name: medicalData.doctor_name || '',
    comment: medicalData.comment || '',
    next_appointment: medicalData.next_appointment || '',
  });
  setShowEditModal(true);
};


  const medicalData = {
    fullname_english: residentMedical?.resident?.data.attributes.fullname_english || 'none',
    gender: residentMedical?.resident?.data.attributes.gender || 'none',
    type_of_disability: residentMedical?.resident?.data.attributes.type_of_disability || 'none',
    date_of_birth: formatDate(residentMedical?.resident?.data.attributes.date_of_birth) || 'none',
    is_required_medical_use: residentMedical?.require_to_use || false,
    medical_use: 'Anti-seizure medication',
    is_active: true,
    start_date: formatDate(residentMedical?.start_date) || 'none',
    end_date: formatDate(residentMedical?.end_date) || 'none',
    medical_treatment: residentMedical?.medical_treatment || 'none',
    doctor_name: residentMedical?.doctor || 'none',
    comment: residentMedical?.specailist_doctor_comment || 'none',
    next_appointment: formatDate(residentMedical?.next_appointment) || 'none',
  };

  return (
    <div className="min-h-screen p-8 relative">
      <div className="w-[90%] mx-auto flex justify-between items-center mb-8 mt-16">
        <Link href="/dashbaord/pages/medical">
          <button className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300">
            Back
          </button>
        </Link>
        <button
          onClick={handleEditOpen}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500"
        >
          <FaEdit />
          Edit
        </button>
      </div>

      <div className="w-[80%] mx-auto flex justify-center items-center mb-6">
        {residentimg ? (
          <img
            src={residentimg}
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

      <div className="bg-white w-[90%] mx-auto rounded-lg p-6 shadow-lg border border-gray-200">
        <ResidentBoxInfo name="Full Name" value={medicalData.fullname_english} />
        <ResidentBoxInfo name="Gender" value={medicalData.gender} />
        <ResidentBoxInfo name="Disability/Disorder" value={medicalData.type_of_disability} />
        <ResidentBoxInfo name="Date of Birth" value={medicalData.date_of_birth} />
        <ResidentBoxInfo name="Required Medical Use" value={medicalData.is_required_medical_use ? 'Yes' : 'No'} />
        <ResidentBoxInfo name="Medical Use" value={medicalData.medical_use} />
        <ResidentBoxInfo name="Is Active" value={medicalData.is_active ? 'Yes' : 'No'} />
        <ResidentBoxInfo name="Start Date" value={medicalData.start_date} />
        <ResidentBoxInfo name="End Date" value={medicalData.end_date} />
        <ResidentBoxInfo name="Medical Treatment" value={medicalData.medical_treatment} />
        <ResidentBoxInfo name="Doctor Name" value={medicalData.doctor_name} />
        <ResidentBoxInfo name="Comment" value={medicalData.comment} />
        <ResidentBoxInfo name="Next Appointment" value={medicalData.next_appointment} />
      </div>
      {showEditModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="bg-white p-6 rounded-2xl max-w-xl w-full relative overflow-y-auto max-h-[90vh]">
      <button
        onClick={handleEditClose}
        className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
      >
        <FaTimes />
      </button>
      <h2 className="text-2xl font-bold mb-4">Edit Medical Info</h2>
      <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto">

        <label className="block mb-1 font-semibold">Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          value={editForm.fullname_english || ''}
          onChange={(e) => setEditForm({ ...editForm, fullname_english: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg"
        />

        <label className="block mb-1 font-semibold">Gender</label>
        <select
          value={editForm.gender || ''}
          onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label className="block mb-1 font-semibold">Disability/Disorder</label>
        <input
          type="text"
          placeholder="Disability/Disorder"
          value={editForm.type_of_disability || ''}
          onChange={(e) => setEditForm({ ...editForm, type_of_disability: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg"
        />

        <div>
          <label className="block mb-1 font-semibold">Date of Birth</label>
          {editForm.date_of_birth ? (
            <input
              type="date"
              value={editForm.date_of_birth.split('T')[0]}
              onChange={(e) => setEditForm({ ...editForm, date_of_birth: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
          ) : (
            <div className="p-3 border border-gray-300 rounded-lg text-gray-500">None</div>
          )}
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={editForm.is_required_medical_use || false}
            onChange={(e) => setEditForm({ ...editForm, is_required_medical_use: e.target.checked })}
          />
          Required Medical Use
        </label>

        <label className="block mb-1 font-semibold">Medical Use</label>
        <input
          type="text"
          placeholder="Medical Use"
          value={editForm.medical_use || ''}
          onChange={(e) => setEditForm({ ...editForm, medical_use: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={editForm.is_active || false}
            onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
          />
          Is Active
        </label>

        <div>
          <label className="block mb-1 font-semibold">Start Date</label>
          {editForm.start_date ? (
            <input
              type="date"
              value={editForm.start_date.split('T')[0]}
              onChange={(e) => setEditForm({ ...editForm, start_date: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
          ) : (
            <div className="p-3 border border-gray-300 rounded-lg text-gray-500">None</div>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">End Date</label>
          {editForm.end_date ? (
            <input
              type="date"
              value={editForm.end_date.split('T')[0]}
              onChange={(e) => setEditForm({ ...editForm, end_date: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
          ) : (
            <div className="p-3 border border-gray-300 rounded-lg text-gray-500">None</div>
          )}
        </div>

        <label className="block mb-1 font-semibold">Medical Treatment</label>
        <input
          placeholder="Medical Treatment"
          value={editForm.medical_treatment || ''}
          onChange={(e) => setEditForm({ ...editForm, medical_treatment: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg"
        />

        <label className="block mb-1 font-semibold">Doctor Name</label>
        <input
          type="text"
          placeholder="Doctor Name"
          value={editForm.doctor_name || ''}
          onChange={(e) => setEditForm({ ...editForm, doctor_name: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg"
        />

        <label className="block mb-1 font-semibold">Comment</label>
        <input
          placeholder="Comment"
          value={editForm.comment || ''}
          onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg"
        />

        <label className="block mb-1 font-semibold">Next Appointment</label>
        <input
          type="date"
          value={editForm.next_appointment ? editForm.next_appointment.split('T')[0] : ''}
          onChange={(e) => setEditForm({ ...editForm, next_appointment: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg"
        />

                  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                        <button
                          onClick={handleEditClose}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md w-full sm:w-auto flex items-center justify-center gap-2"
                        >
                          <FaTimes className="text-sm" />
                          Cancel
                        </button>
                        <button
                          onClick={handleEditSubmit}
                          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-md w-full sm:w-auto flex items-center justify-center gap-2"
                        >
                          Save
                        </button>
                      </div>
      </div>
    </div>
  </div>
)}
  <div
        onClick={handleOpenModal}
        className="flex items-center w-[90%] justify-center gap-2 p-4 bg-white rounded-lg shadow cursor-pointer border border-dashed border-gray-400 hover:bg-gray-50 mt-5  mx-auto"
      >
        <FaPlus className="text-green-600" />
        <span className="text-sm font-medium text-green-600">Add Custom Info</span>
      </div>

      <div className="mt-8 w-[90%] mx-auto">
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
                placeholder="Enter Info Label (e.g. Allergy)"
                value={newInfo.comment}
                onChange={(e) => setNewInfo({ ...newInfo, comment: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="value"
                placeholder="Enter Info Value (e.g. Penicillin)"
                value={newInfo.title}
                onChange={(e) => setNewInfo({ ...newInfo, title: e.target.value })}
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

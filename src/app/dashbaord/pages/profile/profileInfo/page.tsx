"use client"
import { useState } from "react"
import { Edit, ArrowLeft, LogOut, X } from "lucide-react"
import Link from "next/link"

const ProfileInfoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [profile, setProfile] = useState({
    fullName: "Canyon.",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    location: "Siem Reap, Cambodia",
    memberSince: "Jan 2023",
  })

  const [formData, setFormData] = useState(profile)

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setProfile(formData)
    setIsModalOpen(false)
    console.log("Updated Profile:", formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative">
      <div className="absolute top-8 left-8 z-20">
      <Link href="/dashbaord/pages/profile">
        <button className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300">
            Back
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-7xl overflow-hidden z-10 border border-gray-100">
        <div className="flex flex-col lg:flex-row min-h-[700px] lg:min-h-[800px]">
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14 text-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-60 xl:h-60 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-20 blur-xl"></div>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg"
                alt="Profile"
                className="w-full h-full rounded-full object-cover shadow-lg border-4 border-white relative z-10"
              />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mt-6 sm:mt-8 lg:mt-10">
              {profile.fullName}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-green-700 font-semibold mt-2">Administrator</p>
            <div className="mt-4 bg-white/50 px-6 py-2 rounded-full shadow-sm border border-green-100 backdrop-blur-sm">
              <span className="text-green-800 text-sm">Active Account</span>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-12">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-16 md:gap-y-28 gap-x-6 sm:gap-x-8 mb-10">
                <div className="group">
                  <p className="text-sm uppercase tracking-wider text-gray-500 mb-2 group-hover:text-green-600 transition-colors">
                    Email
                  </p>
                  <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800 break-words border-b border-gray-100 pb-1 group-hover:border-green-200 transition-colors">
                    {profile.email}
                  </p>
                </div>
                <div className="group">
                  <p className="text-sm uppercase tracking-wider text-gray-500 mb-2 group-hover:text-green-600 transition-colors">
                    Phone
                  </p>
                  <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800 border-b border-gray-100 pb-1 group-hover:border-green-200 transition-colors">
                    {profile.phone}
                  </p>
                </div>
                <div className="group">
                  <p className="text-sm uppercase tracking-wider text-gray-500 mb-2 group-hover:text-green-600 transition-colors">
                    Location
                  </p>
                  <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800 border-b border-gray-100 pb-1 group-hover:border-green-200 transition-colors">
                    {profile.location}
                  </p>
                </div>
                <div className="group">
                  <p className="text-sm uppercase tracking-wider text-gray-500 mb-2 group-hover:text-green-600 transition-colors">
                    Member Since
                  </p>
                  <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800 border-b border-gray-100 pb-1 group-hover:border-green-200 transition-colors">
                    {profile.memberSince}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-end gap-4 mt-2">
              <button
                onClick={() => {
                  setFormData(profile)
                  setIsModalOpen(true)
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                Edit Profile
              </button>
              <button className="flex items-center justify-center gap-2 px-5 py-2.5 border border-red-200 text-red-500 hover:bg-red-50 text-sm sm:text-base rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div
            className="bg-white px-6 py-6 sm:px-8 sm:py-8 rounded-2xl w-full max-w-md lg:max-w-lg shadow-2xl relative border border-gray-100 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1.5 transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Profile</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium mb-1.5 text-gray-700 group-hover:text-green-600 transition-colors">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium mb-1.5 text-gray-700 group-hover:text-green-600 transition-colors">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium mb-1.5 text-gray-700 group-hover:text-green-600 transition-colors">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium mb-1.5 text-gray-700 group-hover:text-green-600 transition-colors">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium mb-1.5 text-gray-700 group-hover:text-green-600 transition-colors">
                  Member Since
                </label>
                <input
                  type="text"
                  name="memberSince"
                  value={formData.memberSince}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex flex-row justify-between gap-4 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-base transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-base shadow-md hover:shadow-lg transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileInfoPage

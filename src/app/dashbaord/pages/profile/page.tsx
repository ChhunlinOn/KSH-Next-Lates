"use client"
import { FaUser, FaArrowRight } from "react-icons/fa"
import Link from "next/link"

const users = [
  {
    id: 1,
    fullName: "Canyon.",
    email: "john.doe@example.com",
    role: "Administrator",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Manager",
    image: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg",
  },
  {
    id: 3,
    fullName: "Mark Johnson",
    email: "mark.j@example.com",
    role: "Team Lead",
    image: "https://i.pinimg.com/736x/c5/35/0f/c5350f084e43aa828f0503831ab69912.jpg",
  },
  {
    id: 4,
    fullName: "Mark Johnson",
    email: "mark.j@example.com",
    role: "Team Lead",
    image: "https://i.pinimg.com/736x/bd/e3/af/bde3afba0942342f02ce5a62f6b0b3c4.jpg",
  },
  {
    id: 5,
    fullName: "Mark Johnson",
    email: "mark.j@example.com",
    role: "Team Lead",
    image: "https://i.pinimg.com/736x/18/79/73/1879732a4edf5c5c776277a175a8e433.jpg",
  },
  {
    id: 6,
    fullName: "Mark Johnson",
    email: "mark.j@example.com",
    role: "Team Lead",
    image: "https://i.pinimg.com/736x/57/2b/98/572b9886a26a463fc37672b267946be3.jpg",
  },
]

const UserListPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-6 sm:py-8 md:py-10 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-center text-green-800 mb-4 sm:mb-6 md:mb-8 drop-shadow-md">
          Users
        </h1>

        {/* Adjusted grid layout for iPad (md) and Nest Hub (xl) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-3xl shadow-lg p-4 sm:p-5 md:p-6 flex flex-col items-center text-center border-green-100 border-2 bg-white transition-transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative">
                <img
                  src={user.image || "/placeholder.svg"}
                  alt={user.fullName}
                  className="w-full h-full rounded-full object-cover border-4 border-green-700 shadow"
                  loading="lazy"
                />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mt-3 sm:mt-4">
                {user.fullName}
              </h2>
              <p className="text-green-600 font-medium text-sm sm:text-base">{user.role}</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 break-words max-w-full">{user.email}</p>
              <Link href="/dashbaord/pages/profile/profileInfo" className="mt-4 sm:mt-5 md:mt-6">
                <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-700 hover:bg-green-800 text-white text-xs sm:text-sm rounded-xl transition">
                  <FaUser className="text-xs sm:text-sm" />
                  View Profile
                  <FaArrowRight className="ml-1 text-xs sm:text-sm" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserListPage

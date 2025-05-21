// "use client"

// import { useRouter } from "next/navigation"
// import { logout } from "@/app/action/auth"

// export default function LogoutButton() {
//   const router = useRouter()

//   const handleLogout = async () => {
//     await logout()
//     router.push("/login")
//     router.refresh() // Refresh to update auth state
//   }

//   return (
//     <button
//       onClick={handleLogout}
//       className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//     >
//       Logout
//     </button>
//   )
// }

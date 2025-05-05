import { getSession } from "../action/auth"

export default async function DashboardPage() {
  const session = await getSession()

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h2>
        <p className="text-gray-600">You have successfully logged in as {session?.userRole || "a user"}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Quick Stats</h3>
          <div className="text-3xl font-bold text-[#207137]">42</div>
          <p className="text-gray-500">Active projects</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
          <div className="text-3xl font-bold text-[#207137]">12</div>
          <p className="text-gray-500">New updates today</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Tasks</h3>
          <div className="text-3xl font-bold text-[#207137]">8</div>
          <p className="text-gray-500">Pending tasks</p>
        </div>
      </div>
    </div>
  )
}

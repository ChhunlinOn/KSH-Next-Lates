export default function SettingsPage() {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <p className="text-gray-600 mb-4">Manage your account settings and preferences.</p>
  
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Profile Information</h3>
            <p className="text-gray-500 mb-4">Update your account's profile information.</p>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>
  
          <div>
            <h3 className="text-lg font-medium mb-2">Password</h3>
            <p className="text-gray-500 mb-4">Ensure your account is using a secure password.</p>
  
            <button className="px-4 py-2 bg-[#207137] text-white rounded-md hover:bg-green-700 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>
    )
  }
  
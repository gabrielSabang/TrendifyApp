import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const UserProfile = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
        <p className="text-gray-600">Loading user profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-indigo-100 w-full max-w-md p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Profile</h1>
        <div className="space-y-4 text-left">
          <p className="text-lg"><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-600">{user.name}</span></p>
          <p className="text-lg"><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-600">{user.email}</span></p>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

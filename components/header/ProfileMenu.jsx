import React from 'react';

const ProfileMenu = ({ user }) => {
  if (!user) {
    return null; // Return nothing if the user object is not provided
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-md w-64">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-blue-500"
        />
        <div>
          <p className="text-gray-800 font-semibold text-lg">{user.name}</p>
          <p className="text-gray-500 text-sm">Member</p>
        </div>
      </div>

      {/* Links */}
      <div className="space-y-2">
        <a
          href="/add-listing"
          className="block text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Add Listing
        </a>
        <a
          href="/logout"
          className="block text-red-500 hover:text-red-700 font-medium transition"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default ProfileMenu;

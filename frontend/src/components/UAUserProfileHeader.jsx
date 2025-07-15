import React, { useState } from 'react';
import { Camera, Edit } from 'lucide-react';

const UserProfileHeader = ({ user }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="flex items-start gap-6">
      {/* Profile Picture Section */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
          {user?.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600">
              <span className="text-2xl font-medium">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          )}
        </div>
        
        {/* Camera Icon Overlay */}
        {isHovering && (
          <button className="absolute inset-0 w-24 h-24 rounded-full bg-black/50 flex items-center justify-center">
            <Camera className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

      {/* User Info Section */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {user?.name || 'User Name'}
            </h1>
            <p className="text-gray-500">{user?.email || 'user@example.com'}</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {user?.bookmarks?.length || 0}
            </div>
            <div className="text-sm text-gray-500">Bookmarked Tools</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {user?.comparisons?.length || 0}
            </div>
            <div className="text-sm text-gray-500">Comparisons</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {user?.preferences?.length || 0}
            </div>
            <div className="text-sm text-gray-500">Preferences Set</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
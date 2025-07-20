import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const UserProfileHeader = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-6">
      {/* Profile Picture Section */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
          {user?.profileImage ? (
            <img 
              src={user.profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
              }}
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
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {user?.name}
          </h1>
          <p className="text-gray-500">{user?.email}</p>
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
              {user?.comparisonHistory?.length || 0}
            </div>
            <div className="text-sm text-gray-500">Comparisons</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {Object.values(user?.preferences?.features || {}).filter(Boolean).length || 0}
            </div>
            <div className="text-sm text-gray-500">Active Preferences</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
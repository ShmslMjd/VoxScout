import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserProfileHeader from '../components/UAUserProfileHeader';
import UAProfile from '../components/UAProfile';
import UABookmarks from '../components/UABookmarks';
import UAComparisonHistory from '../components/UAComparisonHistory';
import UAPreferences from '../components/UAPreferences';

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuth();

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'bookmarks', label: 'Bookmarked Tools' },
    { id: 'history', label: 'Comparison History' },
    { id: 'preferences', label: 'Preferences' }
  ];

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Profile Header Section */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <UserProfileHeader user={user} />
        </div>

        {/* Main Content Area with Tabs */}
        <div className="bg-white rounded-lg shadow">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-4 px-8 text-sm font-medium border-b-2 whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && <UAProfile />}
            {activeTab === 'bookmarks' && <UABookmarks />}
            {activeTab === 'history' && <UAComparisonHistory />}
            {activeTab === 'preferences' && <UAPreferences />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserAccount;
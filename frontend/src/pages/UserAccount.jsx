import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserProfileHeader from '../components/UAUserProfileHeader';
import UAProfile from '../components/UAProfile';
import UABookmarks from '../components/UABookmarks';
import elevenlabsLogo from '../img/homePage/elevenlabs.png';
import voicemodLogo from '../img/homePage/voicemod.png';
import respeecherLogo from '../img/homePage/respeecher.png';
import murfLogo from '../img/homePage/murf.png';
import UAComparisonHistory from '../components/UAComparisonHistory';
import UAPreferences from '../components/UAPreferences';

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Dummy user data with bookmarked tools
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: null,
    bookmarks: [
      {
        id: 1,
        name: "Elevenlabs",
        logo: elevenlabsLogo,
        rating: 4.7,
        totalReviews: 6797,
        platforms: ["Windows", "Mac", "Mobile"],
        summary: "Advanced AI voice synthesis platform with natural-sounding voices and easy integration options.",
        dateBookmarked: "2023-12-01"
      },
      {
        id: 2,
        name: "Voicemod",
        logo: voicemodLogo,
        rating: 4.5,
        totalReviews: 3500,
        platforms: ["Windows"],
        summary: "Real-time voice changing software with extensive voice effects and soundboard features.",
        dateBookmarked: "2023-12-15"
      },
      {
        id: 3,
        name: "Respeecher",
        logo: respeecherLogo,
        rating: 4.2,
        totalReviews: 120,
        platforms: ["Windows", "Mac"],
        summary: "Professional voice cloning solution for content creators and entertainment industry.",
        dateBookmarked: "2023-12-20"
      },
      {
        id: 4,
        name: "Murf AI",
        logo: murfLogo,
        rating: 4.3,
        totalReviews: 2100,
        platforms: ["Windows", "Mac"],
        summary: "AI-powered text-to-speech platform with multiple voices and languages support.",
        dateBookmarked: "2023-12-25"
      }
    ],
    comparisons: [
      {
        id: 1,
        date: "2023-12-20",
        tools: [
          {
            id: 1,
            name: "Elevenlabs",
            logo: elevenlabsLogo
          },
          {
            id: 2,
            name: "Voicemod",
            logo: voicemodLogo
          }
        ]
      },
      {
        id: 2,
        date: "2023-12-15",
        tools: [
          {
            id: 1,
            name: "Elevenlabs",
            logo: elevenlabsLogo
          },
          {
            id: 3,
            name: "Respeecher",
            logo: respeecherLogo
          },
          {
            id: 4,
            name: "Murf AI",
            logo: murfLogo
          }
        ]
      }
    ],
    preferences: {
      budget: {
        min: 15,
        max: 50,
        currency: 'USD'
      },
      platforms: {
        windows: true,
        mac: true,
        mobile: false
      },
      features: {
        textToSpeech: true,
        voiceCloning: true,
        realTimeVoiceChange: false,
        multiLanguage: true,
        customVoiceCreation: false,
        apiAccess: true
      },
      minRating: 4,
      notification: {
        priceDrops: true,
        newTools: true,
        updates: false,
        recommendations: true
      },
      lastUpdated: "2023-12-20"
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'bookmarks', label: 'Bookmarked Tools' },
    { id: 'history', label: 'Comparison History' },
    { id: 'preferences', label: 'Preferences' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Profile Header Section */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <UserProfileHeader user={userData} />
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
            {activeTab === 'profile' && (
              <UAProfile user={userData} />
            )}
            {activeTab === 'bookmarks' && (
              <UABookmarks user={userData}/>
            )}
            {activeTab === 'history' && (
              <UAComparisonHistory user={userData}/>
            )}
            {activeTab === 'preferences' && (
              <UAPreferences user={userData}/>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserAccount;
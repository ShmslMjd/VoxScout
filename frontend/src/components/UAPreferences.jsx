import React, { useState, useEffect } from 'react';
import { Save, Sliders } from 'lucide-react';

const UAPreferences = ({ user }) => {
  // Initialize preferences with user's existing preferences
  const [preferences, setPreferences] = useState(user.preferences || {
    budget: {
      min: 0,
      max: 100,
      currency: 'USD'
    },
    platforms: {
      windows: true,
      mac: false,
      mobile: false
    },
    features: {
      textToSpeech: true,
      voiceCloning: false,
      realTimeVoiceChange: false,
      multiLanguage: false,
      customVoiceCreation: false,
      apiAccess: false
    },
    minRating: 4,
    notification: {
      priceDrops: true,
      newTools: false,
      updates: true,
      recommendations: false
    }
  });

  // Update preferences when user prop changes
  useEffect(() => {
    if (user.preferences) {
      setPreferences(user.preferences);
    }
  }, [user.preferences]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle saving preferences
    console.log('Saving preferences:', preferences);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Your Preferences</h2>
        <span className="text-sm text-gray-500">
          Used to personalize your experience
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Budget Range */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-4">Budget Range</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Minimum ($)</label>
              <input
                type="number"
                value={preferences.budget.min}
                onChange={(e) => setPreferences({
                  ...preferences,
                  budget: { ...preferences.budget, min: parseInt(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Maximum ($)</label>
              <input
                type="number"
                value={preferences.budget.max}
                onChange={(e) => setPreferences({
                  ...preferences,
                  budget: { ...preferences.budget, max: parseInt(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Platforms */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-4">Preferred Platforms</h3>
          <div className="space-y-3">
            {Object.entries(preferences.platforms).map(([platform, checked]) => (
              <label key={platform} className="flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    platforms: { ...preferences.platforms, [platform]: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-4">Important Features</h3>
          <div className="space-y-3">
            {Object.entries(preferences.features).map(([feature, checked]) => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    features: { ...preferences.features, [feature]: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">
                  {feature.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-4">Minimum Rating</h3>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={preferences.minRating}
            onChange={(e) => setPreferences({
              ...preferences,
              minRating: parseFloat(e.target.value)
            })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="mt-2 text-sm text-gray-600">{preferences.minRating} stars or higher</div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};

export default UAPreferences;
import React, { useState, useEffect } from 'react';
import { Save, Sliders } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const UAPreferences = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Initialize with default preferences structure
  const defaultPreferences = {
    budget: {
      min: 0,
      max: 3000,
      currency: 'USD'
    },
    platforms: {
      windows: true,
      mac: false,
      mobile: false
    },
    features: {
      textToSpeech: false,
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
  };

  const [preferences, setPreferences] = useState(user?.preferences || defaultPreferences);

  // Fetch preferences when component mounts
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await api.get('/users/profile');
        setPreferences(response.data.preferences || defaultPreferences);
      } catch (error) {
        console.error('Error fetching preferences:', error);
        toast.error('Failed to load preferences');
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await api.put('/users/preferences', preferences);
      // Update the user context with new data
      setUser(response.data);
      toast.success('Preferences saved successfully');
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error(error.response?.data?.message || 'Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  // Add validation for budget range
  const validateBudgetRange = (newBudget) => {
    if (newBudget.min < 0) newBudget.min = 0;
    if (newBudget.max < newBudget.min) newBudget.max = newBudget.min;
    return newBudget;
  };

  // Update the budget handlers
  const handleBudgetChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    setPreferences(prev => ({
      ...prev,
      budget: validateBudgetRange({
        ...prev.budget,
        [type]: numValue
      })
    }));
  };

  // Handle feature changes
  const handleFeatureChange = (feature, checked) => {
    setPreferences(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: checked
      }
    }));
  };

  // Add specific handler for rating changes
  const handleRatingChange = (value) => {
    setPreferences(prev => ({
      ...prev,
      minRating: parseFloat(value)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
                min="0"
                value={preferences.budget.min}
                onChange={(e) => handleBudgetChange('min', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Maximum ($)</label>
              <input
                type="number"
                min={preferences.budget.min}
                value={preferences.budget.max}
                onChange={(e) => handleBudgetChange('max', e.target.value)}
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
                  onChange={(e) => handleFeatureChange(feature, e.target.checked)}
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
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={preferences.minRating}
              onChange={(e) => handleRatingChange(e.target.value)}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-900 min-w-[60px]">
              {preferences.minRating} stars
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Only show tools rated {preferences.minRating} stars or higher
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UAPreferences;
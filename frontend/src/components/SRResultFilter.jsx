import React, { useEffect, useState } from 'react';
import { Filter, ChevronDown, Star, Heart } from 'lucide-react'; // Change Bookmark to Heart for consistency
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext'; // Add Auth context
import api from '../lib/axios';
import toast from 'react-hot-toast'; // Add toast for notifications

const SRResultFilter = ({ searchQuery }) => {
  // Base states
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('latest');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter UI states
  const [availableFeatures, setAvailableFeatures] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    pricing: true,
    ratings: true,
    downloads: true,
    features: true
  });

  // Filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3000 });
  const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: 3000 });
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [downloadRange, setDownloadRange] = useState({ min: 0, max: 100000 });
  const [tempDownloadRange, setTempDownloadRange] = useState({ min: 0, max: 100000 });
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // Add bookmark state
  const [bookmarkedTools, setBookmarkedTools] = useState(new Set());
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch features when component mounts
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        // Only fetch features related to current search results
        const response = await api.get('/audio/features', {
          params: {
            q: searchQuery // Pass search query to filter features
          }
        });
        setAvailableFeatures(response.data);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    if (searchQuery) {
      fetchFeatures();
    }
  }, [searchQuery]); // Add searchQuery as dependency

  // Fetch results with filters
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/audio/search`, {
          params: {
            q: searchQuery,
            sort: sortBy,
            limit: itemsPerPage,
            page: currentPage,
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            ratings: selectedRatings.join(','),
            minDownloads: downloadRange.min,
            maxDownloads: downloadRange.max,
            features: selectedFeatures.join(',')
          }
        });
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching results:', error);
        setError('Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [
    searchQuery, 
    sortBy, 
    itemsPerPage, 
    currentPage, 
    priceRange, 
    selectedRatings,
    downloadRange,
    selectedFeatures
  ]);

  // Add useEffect to fetch bookmarks
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (user) {
        try {
          const response = await api.get('/users/bookmarks');
          const bookmarkedIds = new Set(response.data.map(b => b._id));
          setBookmarkedTools(bookmarkedIds);
        } catch (error) {
          console.error('Error fetching bookmarks:', error);
        }
      }
    };

    fetchBookmarks();
  }, [user]);

  // Section toggling
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Price range handlers
  const handlePriceChange = (type, value) => {
    const newValue = Math.min(parseInt(value) || 0, 3000); // Restrict to max 3000
    
    if (type === 'min') {
      setTempPriceRange(prev => ({
        ...prev,
        min: Math.min(newValue, prev.max)
      }));
    } else {
      setTempPriceRange(prev => ({
        ...prev,
        max: Math.max(Math.min(newValue, 3000), prev.min) // Ensure max doesn't exceed 3000
      }));
    }
  };

  const handlePriceBlur = () => {
    setPriceRange(tempPriceRange);
    setCurrentPage(1);
  };

  // Rating handlers
  const handleRatingChange = (rating) => {
    setSelectedRatings(prev => {
      const newRatings = prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating];
      return newRatings;
    });
    setCurrentPage(1);
  };

  // Download range handlers
  const handleDownloadChange = (type, value) => {
    const newValue = Math.min(parseInt(value) || 0, 100000); // Restrict to max 100000
    
    if (type === 'min') {
      setTempDownloadRange(prev => ({
        ...prev,
        min: Math.min(newValue, prev.max)
      }));
    } else {
      setTempDownloadRange(prev => ({
        ...prev,
        max: Math.max(Math.min(newValue, 100000), prev.min) // Ensure max doesn't exceed 100000
      }));
    }
  };

  const handleDownloadBlur = () => {
    setDownloadRange(tempDownloadRange);
    setCurrentPage(1);
  };

  // Feature handlers
  const handleFeatureChange = (feature) => {
    setSelectedFeatures(prev => {
      const newFeatures = prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature];
      return newFeatures;
    });
    setCurrentPage(1);
  };

  // Sort and pagination handlers
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleViewSoftware = (softwareId) => {
    navigate(`/software/${softwareId}`);
  };

  // Add bookmark handler
  const handleBookmark = async (e, toolId) => {
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to bookmark tools');
      navigate('/login');
      return;
    }

    try {
      if (bookmarkedTools.has(toolId)) {
        await api.delete(`/users/bookmarks/${toolId}`);
        setBookmarkedTools(prev => {
          const next = new Set(prev);
          next.delete(toolId);
          return next;
        });
        toast.success('Tool removed from bookmarks');
      } else {
        await api.post(`/users/bookmarks/${toolId}`);
        setBookmarkedTools(prev => new Set([...prev, toolId]));
        toast.success('Tool added to bookmarks');
      }
    } catch (err) {
      console.error('Bookmark error:', err);
      toast.error('Failed to update bookmark');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <div className="flex-shrink-0 w-64">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filter</span>
          </div>
          
          {/* Filter Sections */}
          <div className="space-y-6">
            {/* Price Range Section */}
            <div className="border-b pb-4">
              <div 
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => toggleSection('pricing')}
              >
                <span className="font-medium">Price Range</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                  expandedSections.pricing ? '' : '-rotate-90'
                }`} />
              </div>
              <div className={`space-y-4 transition-all duration-200 ${
                expandedSections.pricing ? 'visible opacity-100' : 'invisible opacity-0 h-0'
              }`}>
                <div className="relative pt-6">
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div 
                      className="absolute h-1 bg-blue-500 rounded-full"
                      style={{
                        left: `${(tempPriceRange.min / 3000) * 100}%`,
                        right: `${100 - (tempPriceRange.max / 3000) * 100}%`
                      }}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      value={tempPriceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      onMouseUp={handlePriceBlur}
                      onTouchEnd={handlePriceBlur}
                      className="absolute w-full -top-1 h-1 appearance-none bg-transparent pointer-events-none"
                    />
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      value={tempPriceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      onMouseUp={handlePriceBlur}
                      onTouchEnd={handlePriceBlur}
                      className="absolute w-full -top-1 h-1 appearance-none bg-transparent pointer-events-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      min="0"
                      max={Math.min(tempPriceRange.max, 3000)}
                      value={tempPriceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      onBlur={handlePriceBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'e' || e.key === '+' || e.key === '-') {
                          e.preventDefault();
                        }
                      }}
                      className="w-full px-3 py-1 text-sm border rounded-md"
                      placeholder="Min"
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      min={tempPriceRange.min}
                      max={3000}
                      value={tempPriceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      onBlur={handlePriceBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'e' || e.key === '+' || e.key === '-') {
                          e.preventDefault();
                        }
                      }}
                      className="w-full px-3 py-1 text-sm border rounded-md"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Ratings Section */}
            <div className="border-b pb-4">
              <div 
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => toggleSection('ratings')}
              >
                <span className="font-medium">Ratings</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                  expandedSections.ratings ? '' : '-rotate-90'
                }`} />
              </div>
              <div className={`space-y-2 transition-all duration-200 ${
                expandedSections.ratings ? 'visible opacity-100' : 'invisible opacity-0 h-0'
              }`}>
                {[5, 4, 3, 2, 1].map(stars => (
                  <label key={stars} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedRatings.includes(stars)}
                      onChange={() => handleRatingChange(stars)}
                      className="rounded border-gray-300" 
                    />
                    <span className="text-sm">{stars} Star</span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {results.filter(software => 
                        software.rating.score >= stars && software.rating.score < stars + 1
                      ).length}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Downloads Section */}
            <div className="border-b pb-4">
              <div 
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => toggleSection('downloads')}
              >
                <span className="font-medium">Number Of Downloads</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                  expandedSections.downloads ? '' : '-rotate-90'
                }`} />
              </div>
              <div className={`space-y-4 transition-all duration-200 ${
                expandedSections.downloads ? 'visible opacity-100' : 'invisible opacity-0 h-0'
              }`}>
                <div className="relative pt-6">
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div 
                      className="absolute h-1 bg-blue-500 rounded-full"
                      style={{
                        left: `${(tempDownloadRange.min / 100000) * 100}%`,
                        right: `${100 - (tempDownloadRange.max / 100000) * 100}%`
                      }}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      value={tempDownloadRange.min}
                      onChange={(e) => handleDownloadChange('min', e.target.value)}
                      onMouseUp={handleDownloadBlur}
                      onTouchEnd={handleDownloadBlur}
                      className="absolute w-full -top-1 h-1 appearance-none bg-transparent pointer-events-none"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      value={tempDownloadRange.max}
                      onChange={(e) => handleDownloadChange('max', e.target.value)}
                      onMouseUp={handleDownloadBlur}
                      onTouchEnd={handleDownloadBlur}
                      className="absolute w-full -top-1 h-1 appearance-none bg-transparent pointer-events-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      min="0"
                      max={Math.min(tempDownloadRange.max, 100000)}
                      value={tempDownloadRange.min}
                      onChange={(e) => handleDownloadChange('min', e.target.value)}
                      onBlur={handleDownloadBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'e' || e.key === '+' || e.key === '-') {
                          e.preventDefault();
                        }
                      }}
                      className="w-full px-3 py-1 text-sm border rounded-md"
                      placeholder="Min"
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      min={tempDownloadRange.min}
                      max={100000}
                      value={tempDownloadRange.max}
                      onChange={(e) => handleDownloadChange('max', e.target.value)}
                      onBlur={handleDownloadBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'e' || e.key === '+' || e.key === '-') {
                          e.preventDefault();
                        }
                      }}
                      className="w-full px-3 py-1 text-sm border rounded-md"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="pb-4">
              <div 
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => toggleSection('features')}
              >
                <span className="font-medium">Features</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                  expandedSections.features ? '' : '-rotate-90'
                }`} />
              </div>
              <div className={`space-y-2 transition-all duration-200 ${
                expandedSections.features ? 'visible opacity-100' : 'invisible opacity-0 h-0'
              }`}>
                {availableFeatures.map((feature) => (
                  <label key={feature.title} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedFeatures.includes(feature.title)}
                      onChange={() => handleFeatureChange(feature.title)}
                      className="rounded border-gray-300" 
                    />
                    <span className="text-sm">{feature.title}</span>
                    <span className="text-xs text-gray-500 ml-auto">
                      ({results.filter(software => 
                        software.features.some(f => f.title === feature.title)
                      ).length})
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">
              {loading ? (
                'Loading results...'
              ) : error ? (
                'Error loading results'
              ) : (
                `Showing ${results.length} results for "${searchQuery}"`
              )}
            </div>
            <div className="flex items-center gap-4">
              <select 
                className="text-sm border rounded-lg px-3 py-2"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
              <select 
                className="text-sm border rounded-lg px-3 py-2"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={12}>12 per page</option>
                <option value={24}>24 per page</option>
                <option value={48}>48 per page</option>
              </select>
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : results.length === 0 ? (
            <div className="text-center py-8">No results found for "{searchQuery}"</div>
          ) : (
            <div className="grid gap-4">
              {results.map((software) => (
                <div 
                  key={software._id} 
                  className="bg-white rounded-lg p-4 shadow-sm border flex items-center hover:shadow-md transition-shadow"
                >
                  <img 
                    src={software.logo} 
                    alt={software.name} 
                    className="w-16 h-16 rounded-lg object-cover mr-6"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{software.name}</h3>
                        <p className="text-sm text-gray-500">by {software.company.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(software.rating.score) 
                              ? "text-yellow-400 fill-current" 
                              : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm text-blue-600">
                        ({software.rating.totalReviews})
                      </span>
                      <span className="text-sm">
                        {software.rating.score.toFixed(1)} out of 5
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <button 
                      className={`transition-colors ${
                        bookmarkedTools.has(software._id) 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-gray-400 hover:text-red-400'
                      }`}
                      onClick={(e) => handleBookmark(e, software._id)}
                    >
                      <Heart 
                        className="w-5 h-5"
                        fill={bookmarkedTools.has(software._id) ? "currentColor" : "none"}
                      />
                    </button>
                    <button 
                      onClick={() => handleViewSoftware(software._id)}
                      className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SRResultFilter;
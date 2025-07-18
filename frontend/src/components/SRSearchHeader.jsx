import React from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const SRSearchHeader = ({ initialQuery = '' }) => {
  const [searchTerm, setSearchTerm] = React.useState(initialQuery);
  const [categories] = React.useState([
    'Text to Speech',
    'Voice Cloning',
    'Voice Changer',
    'Speech to Text'
  ]); // These match the enum in Software model
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="bg-[#B2EBFF] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation - With working links */}
        <div className="flex justify-end text-sm mb-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium">Find Tools</span>
          </div>
        </div>

        {/* Title - Now clear of the breadcrumb */}
        <h1 className="text-2xl font-bold mb-6">Find Tools</h1>

        {/* Search Form */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border-0 shadow-sm"
            />
          </div>
          <div className="w-72">
            <div className="relative">
              <select 
                className="w-full appearance-none py-2.5 px-4 pr-8 rounded-lg border-0 shadow-sm bg-white"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <button 
            onClick={handleSearch}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Find
          </button>
        </div>
      </div>
    </div>
  );
};

export default SRSearchHeader;
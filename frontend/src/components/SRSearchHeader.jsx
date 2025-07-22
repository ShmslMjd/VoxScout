import React from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const SRSearchHeader = ({ initialQuery = '' }) => {
  const [searchTerm, setSearchTerm] = React.useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="bg-[#B2EBFF] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex justify-end text-sm mb-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium">Find Tools</span>
          </div>
        </div>

        {/* Title */}
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
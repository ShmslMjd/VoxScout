import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import api from '../lib/axios';
import heroImg from '../img/homePage/heroImg.jpg';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Fetch suggestions when user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await api.get(`/audio/search`, {
          params: {
            q: searchTerm,
            limit: 5, // Limit suggestions to 5 results
          },
        });
        // Make sure we're using the results array from the response
        setSuggestions(response.data.results || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleSuggestionClick = (software) => {
    navigate(`/software/${software._id}`);
    setShowSuggestions(false);
    setSearchTerm('');
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="hero bg-sky-200 min-h-96">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={heroImg}
          className="max-w-sm rounded-lg shadow-2xl"
          alt="Hero"
        />
        <div>
          <h1 className="text-5xl font-bold">
            Find the Right AI Audio tools for you!
          </h1>
          <p className="py-6">
            Explore and compare diverse tools to suits your need search now.
          </p>
          <div className="relative">
            <label className="input input-bordered rounded-full input-lg flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <button
                className="btn btn-outline btn-primary rounded-full"
                onClick={handleSearch}
              >
                Find AI Tool
              </button>
            </label>

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-50">
                {suggestions.map((software) => (
                  <div
                    key={software._id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSuggestionClick(software)}
                  >
                    <img
                      src={software.logo}
                      alt={software.name}
                      className="w-8 h-8 rounded"
                    />
                    <div>
                      <div className="font-medium">{software.name}</div>
                      <div className="text-sm text-gray-500">
                        {software.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
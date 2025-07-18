import React from 'react';
import { Filter, ChevronDown, Star, Bookmark } from 'lucide-react';
import elevenlabslogo from '../img/homePage/elevenlabs.png'; 

const dummyData = [
  {
    id: 1,
    name: 'ElevenLabs',
    company: 'ElevenLabs',
    logo: elevenlabslogo,
    rating: { score: 4.7, totalReviews: 2134 }
  },
  {
    id: 2,
    name: 'ElevenLabs',
    company: 'ElevenLabs',
    logo: elevenlabslogo,
    rating: { score: 4.7, totalReviews: 2134 }
  },
  {
    id: 3,
    name: 'ElevenLabs',
    company: 'ElevenLabs',
    logo: elevenlabslogo,
    rating: { score: 4.7, totalReviews: 2134 }
  },
  {
    id: 4,
    name: 'ElevenLabs',
    company: 'ElevenLabs',
    logo: elevenlabslogo,
    rating: { score: 4.7, totalReviews: 2134 }
  },
  {
    id: 5,
    name: 'ElevenLabs',
    company: 'ElevenLabs',
    logo: elevenlabslogo,
    rating: { score: 4.7, totalReviews: 2134 }
  },
  // Add more dummy items as needed
];

const SRResultFilter = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <div className="flex-shrink-0 w-64">
          {/* Filter Header */}
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filter</span>
          </div>

          {/* Filter Sections */}
          <div className="space-y-6">
            {/* Pricing Section */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Pricing</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-sm text-blue-600">60$</div>
              </div>
            </div>

            {/* Ratings Section */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Ratings</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(stars => (
                  <label key={stars} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm">{stars} Star</span>
                    <span className="text-xs text-gray-500 ml-auto">(1229)</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of Downloads */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Number Of Download</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-sm text-blue-600">20M</div>
              </div>
            </div>

            {/* Features Section */}
            <div className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Features</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                {[
                  'Real-time voice changing',
                  'Text-to-speech (TTS)',
                  'Voice cloning / voice synthesis',
                  'Character or celebrity voices',
                  'Emotion/tone control',
                  'Multi-language support',
                  'Mobile compatibility',
                  'Offline functionality'
                ].map((feature, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm">{feature}</span>
                    <span className="text-xs text-gray-500 ml-auto">(102)</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">Showing 1-12 of 48 results</div>
            <div className="flex items-center gap-4">
              <select className="text-sm border rounded-lg px-3 py-2">
                <option>Latest</option>
                <option>Most Popular</option>
                <option>Highest Rated</option>
              </select>
              <select className="text-sm border rounded-lg px-3 py-2">
                <option>12 per page</option>
                <option>24 per page</option>
                <option>48 per page</option>
              </select>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid gap-4">
            {dummyData.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg p-4 shadow-sm border flex items-center hover:shadow-md transition-shadow"
              >
                <img src={item.logo} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-6" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">by {item.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(item.rating.score) 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-blue-600">({item.rating.totalReviews})</span>
                    <span className="text-sm">{item.rating.score} out of 5</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded ${
                  page === 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SRResultFilter;
import React from 'react';
import { Star } from 'lucide-react';

const CPSummary = ({ selected }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Summary</h2>
        </div>

        <div className="px-6">
          <div className="overflow-x-auto">
            {/* Remove grid-rows-4 to allow dynamic heights */}
            <div className="divide-y divide-gray-200">
              {/* Ratings Row */}
              <div
                className="grid divide-x divide-gray-200"
                style={{
                  gridTemplateColumns:
                    selected.length === 3 ? '180px 1fr 1fr 1fr' : '180px 1fr 1fr',
                }}
              >
                <div className="py-4 pl-4 pr-8 font-medium h-full flex items-center">Ratings</div>
                {selected.map((software, index) => (
                  <div key={index} className="py-4 px-6 h-full">
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < Math.floor(software.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-blue-600 text-sm ml-1">
                        ({software.reviews})
                      </span>
                      <span className="text-sm ml-1">
                        {software.rating} out of 5
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Platform Row */}
              <div
                className="grid divide-x divide-gray-200"
                style={{
                  gridTemplateColumns:
                    selected.length === 3 ? '180px 1fr 1fr 1fr' : '180px 1fr 1fr',
                }}
              >
                <div className="py-4 pl-4 pr-8 font-medium h-full flex items-start">Platform Supported</div>
                {selected.map((software, index) => (
                  <div key={index} className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      {software.platforms.map((platform, i) => (
                        <div key={i} className="text-sm leading-relaxed">
                          {platform}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Row */}
              <div
                className="grid divide-x divide-gray-200"
                style={{
                  gridTemplateColumns:
                    selected.length === 3 ? '180px 1fr 1fr 1fr' : '180px 1fr 1fr',
                }}
              >
                <div className="py-4 pl-4 pr-8 font-medium h-full flex items-center">Starting Price</div>
                {selected.map((software, index) => (
                  <div key={index} className="py-4 px-6 h-full flex items-center">
                    <span className="text-sm">{software.price}</span>
                  </div>
                ))}
              </div>

              {/* Summary Row */}
              <div
                className="grid divide-x divide-gray-200"
                style={{
                  gridTemplateColumns:
                    selected.length === 3 ? '180px 1fr 1fr 1fr' : '180px 1fr 1fr',
                }}
              >
                <div className="py-4 pl-4 pr-8 font-medium h-full flex items-start">App Summary</div>
                {selected.map((software, index) => (
                  <div key={index} className="py-4 px-6">
                    <p className="text-sm leading-relaxed text-gray-600">
                      {software.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPSummary;
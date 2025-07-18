import React from 'react';
import { Check, Minus } from 'lucide-react';

const CPFeatures = ({ selected }) => {
  // Get all unique features from all selected software
  const allFeatures = Array.from(
    new Set(selected.flatMap(software => 
      software.features.map(feature => feature.title)
    ))
  ).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Features</h2>
        </div>

        <div className="px-6">
          <div className="overflow-x-auto">
            <div className="divide-y divide-gray-200">
              {allFeatures.map((featureTitle, i) => (
                <div
                  key={i}
                  className="grid divide-x divide-gray-200"
                  style={{
                    gridTemplateColumns:
                      selected.length === 3 ? '180px 1fr 1fr 1fr' : '180px 1fr 1fr',
                  }}
                >
                  <div className="py-4 pl-4 pr-8 font-medium">{featureTitle}</div>
                  {selected.map((software, index) => {
                    const hasFeature = software.features.some(
                      feature => feature.title === featureTitle
                    );
                    
                    return (
                      <div 
                        key={index} 
                        className="py-4 px-6 flex items-center justify-center group relative"
                        title={hasFeature ? 
                          software.features.find(f => f.title === featureTitle)?.description 
                          : 'Not available'
                        }
                      >
                        {hasFeature ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Minus className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPFeatures;
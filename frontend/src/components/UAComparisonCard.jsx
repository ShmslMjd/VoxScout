import React from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';

const UAComparisonCard = ({ comparison, onRecompare }) => {
  const formattedDate = new Date(comparison.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <button
          onClick={() => onRecompare(comparison.tools.map(tool => tool.id))}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
        >
          <RefreshCw className="w-4 h-4" />
          Compare Again
        </button>
      </div>

      <div className="flex items-center gap-2">
        {comparison.tools.map((tool, index) => (
          <React.Fragment key={tool.id}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium">{tool.name}</span>
            </div>
            {index < comparison.tools.length - 1 && (
              <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default UAComparisonCard;
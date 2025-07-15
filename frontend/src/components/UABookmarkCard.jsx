import React from 'react';
import { Star, Trash2 } from 'lucide-react';

const UABookmarkCard = ({ tool, onRemove }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0">
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{tool.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">{tool.rating}</span>
              </div>
              <span className="text-sm text-gray-500">
                ({tool.totalReviews} reviews)
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onRemove(tool.id)}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <p className="mt-3 text-sm text-gray-600 line-clamp-2">{tool.summary}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {tool.platforms.map((platform, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {platform}
            </span>
          ))}
        </div>
        <a
          href={`/software/${tool.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default UABookmarkCard;
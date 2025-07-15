import React from 'react';
import { BookmarkX } from 'lucide-react';
import UABookmarkCard from './UABookmarkCard';

const UABookmarks = ({ user }) => {
  const handleRemoveBookmark = (toolId) => {
    // TODO: Implement bookmark removal logic
    console.log('Removing bookmark:', toolId);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Bookmarked Tools</h2>
        <span className="text-sm text-gray-500">
          {user.bookmarks.length} tools saved
        </span>
      </div>

      {user.bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {user.bookmarks.map((tool) => (
            <UABookmarkCard
              key={tool.id}
              tool={tool}
              onRemove={handleRemoveBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookmarkX className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No bookmarks yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Start exploring and bookmark the tools you're interested in.
          </p>
          <a
            href="/explore"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Explore Tools
          </a>
        </div>
      )}
    </div>
  );
};

export default UABookmarks;
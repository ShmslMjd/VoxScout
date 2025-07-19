import React, { useState, useEffect } from 'react';
import { BookmarkX } from 'lucide-react';
import UABookmarkCard from './UABookmarkCard';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

const UABookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await api.get('/users/bookmarks');
      setBookmarks(response.data);
    } catch (err) {
      setError('Failed to load bookmarks');
      console.error('Error fetching bookmarks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (toolId) => {
    try {
      await api.delete(`/users/bookmarks/${toolId}`);
      setBookmarks(bookmarks.filter(tool => tool._id !== toolId));
      toast.success('Tool removed from bookmarks');
    } catch (err) {
      toast.error('Failed to remove bookmark');
      console.error('Error removing bookmark:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Bookmarked Tools</h2>
        <span className="text-sm text-gray-500">
          {bookmarks.length} tools saved
        </span>
      </div>

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {bookmarks.map((tool) => (
            <UABookmarkCard
              key={tool._id}
              tool={{
                id: tool._id,
                name: tool.name,
                logo: tool.logo,
                rating: tool.rating?.score || 0,
                totalReviews: tool.rating?.totalReviews || 0,
                summary: tool.description,
                platforms: tool.platforms || []
              }}
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
          <Link
            to="/"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Explore Tools
          </Link>
        </div>
      )}
    </div>
  );
};

export default UABookmarks;
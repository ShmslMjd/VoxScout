import React from 'react';
import { History } from 'lucide-react';
import UAComparisonCard from './UAComparisonCard';
import { useNavigate } from 'react-router';

const UAComparisonHistory = ({ user }) => {
  const navigate = useNavigate();

  const handleRecompare = (toolIds) => {
    // Navigate to comparison page with selected tools
    navigate(`/compare?tools=${toolIds.join(',')}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Comparison History</h2>
        <span className="text-sm text-gray-500">
          {user.comparisons.length} comparisons made
        </span>
      </div>

      {user.comparisons.length > 0 ? (
        <div className="space-y-4">
          {user.comparisons.map((comparison) => (
            <UAComparisonCard
              key={comparison.id}
              comparison={comparison}
              onRecompare={handleRecompare}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <History className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No comparisons yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Start comparing different voice AI tools to find the best match for your needs.
          </p>
          <a
            href="/compare"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Compare Tools
          </a>
        </div>
      )}
    </div>
  );
};

export default UAComparisonHistory;
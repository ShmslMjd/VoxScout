import React, { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import UAComparisonCard from './UAComparisonCard';
import { useNavigate } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const UAComparisonHistory = () => {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        const response = await api.get('/users/comparisons');
        setComparisons(response.data);
      } catch (error) {
        console.error('Error fetching comparisons:', error);
        toast.error('Failed to load comparison history');
      } finally {
        setLoading(false);
      }
    };

    fetchComparisons();
  }, []);

  const handleRecompare = (toolIds) => {
    navigate('/compare', {
      state: {
        selectedIds: toolIds
      }
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Comparison History</h2>
        <span className="text-sm text-gray-500">
          {comparisons.length} comparisons made
        </span>
      </div>

      {comparisons.length > 0 ? (
        <div className="space-y-4">
          {comparisons.map((comparison) => (
            <UAComparisonCard
              key={comparison._id}
              comparison={{
                date: comparison.date,
                tools: comparison.softwares.map(tool => ({
                  id: tool._id,
                  name: tool.name,
                  logo: tool.logo
                }))
              }}
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
          <button
            onClick={() => navigate('/compare')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Compare Tools
          </button>
        </div>
      )}
    </div>
  );
};

export default UAComparisonHistory;
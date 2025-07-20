import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SDAlternative = ({ software }) => {
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchAlternatives = async () => {
      if (!software) return;

      try {
        // Fetch all software in the same category first
        const response = await api.get(`/audio?category=${software.category}`);
        let allSoftware = response.data.filter(sw => sw._id !== software._id);

        // If not enough software in same category, fetch from other categories
        if (allSoftware.length < 3) {
          const otherResponse = await api.get('/audio');
          const otherSoftware = otherResponse.data.filter(sw => 
            sw._id !== software._id && 
            sw.category !== software.category
          );
          allSoftware = [...allSoftware, ...otherSoftware];
        }

        // Helper function to calculate similarity score
        const calculateSimilarity = (sw1, sw2) => {
          let score = 0;
          
          // Compare features (highest weight)
          const features1 = new Set(sw1.features.map(f => f.title.toLowerCase()));
          const features2 = new Set(sw2.features.map(f => f.title.toLowerCase()));
          features1.forEach(f => {
            if (features2.has(f)) score += 3;
          });

          // Compare pricing model
          if (sw1.pricing.hasFreeVersion === sw2.pricing.hasFreeVersion) score += 1;
          if (sw1.pricing.hasFreeTrialPeriod === sw2.pricing.hasFreeTrialPeriod) score += 1;

          // Compare platforms
          const platforms1 = new Set(sw1.platforms);
          const platforms2 = new Set(sw2.platforms);
          platforms1.forEach(p => {
            if (platforms2.has(p)) score += 1;
          });

          // Add category bonus
          if (sw1.category === sw2.category) score += 2;

          return score;
        };

        // Sort alternatives by similarity score and always take top 3
        const similarSoftware = allSoftware
          .map(sw => ({
            software: sw,
            similarity: calculateSimilarity(software, sw)
          }))
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 3) // Always take top 3
          .map(item => ({
            left: { 
              id: software._id,
              logo: software.logo, 
              name: software.name 
            },
            right: { 
              id: item.software._id,
              logo: item.software.logo, 
              name: item.software.name,
              similarity: item.similarity // Add similarity score for potential display
            }
          }));

        setAlternatives(similarSoftware);
      } catch (error) {
        console.error('Error fetching alternatives:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlternatives();
  }, [software]);

  const handleCompareClick = async (alternative) => {
    try {
      const toolIds = [alternative.left.id, alternative.right.id];
      
      // Save comparison if user is logged in
      if (user) {
        await api.post('/users/comparisons', { toolIds });
        toast.success('Comparison saved to history');
      }

      // Navigate to comparison page
      navigate('/compare', {
        state: {
          selectedIds: toolIds
        }
      });
    } catch (error) {
      console.error('Error handling comparison:', error);
      toast.error('Failed to save comparison');
    }
  };

  if (loading || !software || alternatives.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-8 mt-8 mb-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">{software.name} Comparison and Alternatives</h2>
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        {alternatives.map((alt, idx) => (
          <div
            key={idx}
            onClick={() => handleCompareClick(alt)}
            className="flex flex-col items-center flex-1 min-w-[200px] p-4 transition transform hover:scale-105 hover:shadow-lg rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E6B057]"
            tabIndex={0}
          >
            <div className="flex items-end gap-4 mb-2 w-full">
              <div className="flex flex-col items-center flex-1">
                <img 
                  src={alt.left.logo} 
                  alt={alt.left.name} 
                  className="h-16 md:h-24 object-contain mb-2" 
                />
                <span className="block text-center text-sm text-black font-medium mt-1">
                  {alt.left.name}
                </span>
              </div>
              <span className="font-bold text-lg mb-8 md:mb-10">VS</span>
              <div className="flex flex-col items-center flex-1">
                <img 
                  src={alt.right.logo} 
                  alt={alt.right.name} 
                  className="h-16 md:h-24 object-contain mb-2" 
                />
                <span className="block text-center text-sm text-black font-medium mt-1">
                  {alt.right.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SDAlternative;
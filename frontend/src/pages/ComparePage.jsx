import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Navbar from '../components/Navbar';
import CPSoftwareSelection from '../components/CPSoftwareSelection';
import CPSummary from '../components/CPSummary';
import CPFeatures from '../components/CPFeatures';
import CPPricing from '../components/CPPricing';
import CPReviews from '../components/CPReviews';
import Footer from '../components/Footer';
import api from '../lib/axios';

const ComparePage = () => {
  const location = useLocation();
  const [softwareList, setSoftwareList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch all software from database
        const response = await api.get('/audio');
        setSoftwareList(response.data);

        // 2. Check if we have software IDs from SDAlternative
        if (location.state?.selectedIds && Array.isArray(location.state.selectedIds)) {
          // 3. Find and set the selected software based on IDs
          const selectedSoftware = response.data.filter(sw => 
            location.state.selectedIds.includes(sw._id)
          );
          setSelected(selectedSoftware);
        }
      } catch (error) {
        console.error('Error fetching software:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  if (loading) {
    return (
      <div className='min-h-screen bg-slate-50'>
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <CPSoftwareSelection 
        selected={selected}
        setSelected={setSelected}
        softwareList={softwareList}
      />
      {selected.length > 0 && (
        <>
          <div id="summary">
            <CPSummary selected={selected} />
          </div>
          <div id="features">
            <CPFeatures selected={selected} />
          </div>
          <div id="price">
            <CPPricing selected={selected} />
          </div>
          <div id="ratings">
            <CPReviews selected={selected} />
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default ComparePage;
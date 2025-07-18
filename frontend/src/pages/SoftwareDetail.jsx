import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../lib/axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import SDAlternative from "../components/SDAlternative";
import SDCarousel from "../components/SDCarousel";
import SDFeatures from "../components/SDFeatures";
import SDHero from "../components/SDHero";
import SDOverview from "../components/SDOverview";
import SDPricing from "../components/SDPricing";
import SDProsCons from "../components/SDProsCons";
import SDReviews from "../components/SDReviews";
import toast from 'react-hot-toast';

const SoftwareDetail = () => {
  const { id } = useParams();
  const [software, setSoftware] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const response = await api.get(`/audio/${id}`);
        setSoftware(response.data);
        setRateLimited(false);
      } catch (err) {
        console.error("Error fetching software:", err);
        if (err.response?.status === 429) {
          setRateLimited(true);
        } else {
          setError(err.message);
          toast.error('Failed to fetch software details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSoftware();
  }, [id]);

  if (loading) return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-primary font-medium">Loading Software Details...</span>
      </div>
    </div>
  );

  if (isRateLimited) return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <RateLimitedUI />
    </div>
  );

  if (error) return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <div className="text-center text-error py-10">Error: {error}</div>
    </div>
  );

  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar/>
      <SDHero software={software}/>
      <SDOverview software={software}/>
      <SDCarousel software={software}/>
      <SDFeatures software={software}/>
      <SDProsCons software={software}/>
      <SDReviews software={software}/>
      <SDPricing software={software}/>
      <SDAlternative software={software}/>
      <Footer/>
    </div>
  );
};

export default SoftwareDetail;
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowTo from '../components/HowTo';
import PopularTools from '../components/PopularTools';
import PopularCategories from '../components/PopularCategories';
import Footer from '../components/Footer';
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [israteLimited, setRateLimited] = useState(false);
  const [softwares, setSoftwares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const res = await api.get("/audio");
        setSoftwares(res.data);
        setRateLimited(false);
      } catch (error) {
        console.error('Error fetching software:', error);
        if (error.response?.status === 429) {
          setRateLimited(true);
          toast.error('Rate limit reached. Please try again later.');
        } else {
          setError(error.message);
          toast.error('Failed to fetch software data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSoftware();
  }, []);

  if (israteLimited) {
    return (
      <div className='min-h-screen'>
        <Navbar />
        <RateLimitedUI />
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <Navbar />
      <Hero />
      <HowTo />
      <PopularTools 
        tools={softwares} 
        loading={loading} 
        error={error}
      />
      <PopularCategories softwares={softwares} />
      <Footer />
    </div>
  );
};

export default HomePage;

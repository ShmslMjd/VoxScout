import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import axios from 'axios';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [israteLimited, setRateLimited] = useState(false);
  const [software, setSoftware] = useState([]);
  const [loadng, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoftware = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/audio");
            console.log(res.data);
            setSoftware(res.data);
            setRateLimited(false);
        } catch (error) {
            console.log('Error fetching software');
            if(error.response?.status === 429) {
                setRateLimited(true);
            }else{
                toast.error('Failed to fetch software data');
            }
        }finally {
            setLoading(false);
        }
    }

    fetchSoftware();
  
  },[])

  return (
    <div className='min-h-screen'>
        <Navbar />

        {israteLimited && <RateLimitedUI/>}
    </div>
  )
}

export default HomePage
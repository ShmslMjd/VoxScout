import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import axios from 'axios';
import toast from 'react-hot-toast';
import SoftwareCard from '../components/SoftwareCard';

const HomePage = () => {
  const [israteLimited, setRateLimited] = useState(false);
  const [softwares, setSoftwares] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoftware = async () => {
        try {
            //axios is used to make HTTP requests
            //Here we are making a GET request to the backend API to fetch software data
            const res = await axios.get("http://localhost:5001/api/audio");
            console.log(res.data);
            setSoftwares(res.data);
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

        <div className="max-w-7xl mx-auto p-4 mt-6">
            {loading && <div className="text-center text-primary py-10">Loading Software ...</div>}

            {softwares.length > 0 && !israteLimited && (
                <div className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {softwares.map((software) => (
                        <SoftwareCard key={software._id} software={software}/>
                    ))}
                </div>
            )}

        </div>

    </div>
  )
}

export default HomePage
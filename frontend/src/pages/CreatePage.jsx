import { ArrowLeftIcon, Icon } from 'lucide-react';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import api from '../lib/axios';

const CreatePage = () => {
    const [softwareName, setSoftwareName] = useState('');
    const [features, setFeatures] = useState('');
    const [loading, setLoading] = useState(false);

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!softwareName.trim() || !features.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await api.post("/audio", {
                softwareName,
                features
            })
            toast.success("Software created successfully");
            Navigate("/");
            
        } catch (error) {
            console.log("Error creating software", error);
            //toast.error("Failed to create software");
            if(error.response.status === 429) {
                toast.error("Slow down you are creating software too fast.", {
                    duration: 4000,
                    icon: "💀",
                });
            }else{
                toast.error("Failed to create software. Please try again later.");
            }
            
        } finally{
            setLoading(false);
        }
    }

    return <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
                <Link to={"/"} className="btn btn-ghost mb-6">
                    <ArrowLeftIcon className='size-5'/>
                    Back to Home
                </Link>

                <div className='card bg-base-100'>
                    <div className='card-body'>
                        <h2 className='card-title text-2xl mb-4'>Create New Software</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-control mb-4'>
                                <label className="label">
                                    <span className="label-text">Software Name</span>
                                </label>
                                <input type="text" 
                                    placeholder="Enter software name"
                                    className="input input-bordered"
                                    value={softwareName}
                                    onChange={(e) => setSoftwareName(e.target.value)}
                                />

                            </div>
                            <div className='form-control mb-4'>
                                <label className="label">
                                    <span className="label-text">Features</span>
                                </label>
                                <textarea
                                    placeholder="Enter features"
                                    className="textarea textarea-bordered h-32"
                                    value={features}
                                    onChange={(e) => setFeatures(e.target.value)}
                                />

                            </div>
                            <div className="card-actions justify-end">
                                <button type='submit' className='btn btn-primary' disabled={loading}> {loading ? "Creating ..." : "Create Software"}</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>

        </div>
    </div>;
}

export default CreatePage
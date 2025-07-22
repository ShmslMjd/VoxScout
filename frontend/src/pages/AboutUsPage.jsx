import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageSquareText, Search, RefreshCw } from 'lucide-react';

const AboutUsPage = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: "Find the Perfect Tool",
      description: "Discover and compare AI voice tools tailored to your specific needs"
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-blue-600" />,
      title: "Compare & Analyze",
      description: "Make informed decisions with our comprehensive comparison features"
    },
    {
      icon: <MessageSquareText className="h-8 w-8 text-blue-600" />,
      title: "Community Insights",
      description: "Benefit from real user reviews and ratings for each tool"
    }
  ];

  return (
    <div className='min-h-screen'>
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-sky-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About VoxScout
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your trusted companion in navigating the world of AI voice technology. 
            We help you find, compare, and choose the perfect voice AI tools for your needs.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              To simplify the process of finding and comparing AI voice tools, 
              making it easier for everyone to harness the power of voice technology.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
              <p className="text-gray-600">
                We provide honest, unbiased comparisons and reviews to help you make informed decisions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Centric</h3>
              <p className="text-gray-600">
                Everything we do is focused on making your search for the perfect voice AI tool easier.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
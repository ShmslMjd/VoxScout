import React, { useState, useEffect } from 'react';
import { PlusCircle, XCircle, Search, Star, X } from 'lucide-react';

// Modal Component
const SoftwareSelectModal = ({ isOpen, onClose, onSelect, selected, softwareList }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSoftware = softwareList.filter(software => 
    software.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selected.find(s => s._id === software._id)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add software to compare</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search software..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {filteredSoftware.map(software => (
            <div 
              key={software._id} 
              className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img 
                  src={software.logo} 
                  alt={software.name}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h4 className="font-medium">{software.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      <Star 
                        size={16} 
                        className="text-yellow-400 fill-yellow-400" 
                      />
                      <span className="ml-1 text-sm text-gray-600">
                        {software.rating?.score?.toFixed(1) || "N/A"}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({software.rating?.totalReviews?.toLocaleString() || 0} reviews)
                    </span>
                    <span className="text-sm text-gray-500 px-2 py-0.5 bg-gray-100 rounded">
                      {software.category}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onSelect(software)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Select
              </button>
            </div>
          ))}

          {filteredSoftware.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No software found matching your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component
const CPSoftwareSelection = ({ selected, setSelected, softwareList }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px',
        threshold: 0
      }
    );

    const sections = ['summary', 'features', 'price', 'ratings'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const getTabClasses = (tabId) => {
    return `border-b-2 py-4 px-1 text-sm font-medium ${
      activeTab === tabId
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`;
  };

  const handleRemove = (index) => {
    // Only allow removal when there are 3 software selected
    if (selected.length === 3) {
      const newSelected = [...selected];
      newSelected.splice(index, 1);
      setSelected(newSelected);
    }
  };

  const handleSelect = (software) => {
    if (selected.find(s => s._id === software._id)) {
      if (selected.length === 3) {
        setSelected(selected.filter(s => s._id !== software._id));
      }
    } else if (selected.length < 3) {
      setSelected([...selected, software]);
      setModalOpen(false); // Close modal after selection
    }
  };

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="text-2xl font-medium mb-8">
          {selected.map(s => s.name).join(' VS ')}
        </h1>

        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="px-6">
            <nav className="flex gap-8">
              {['summary', 'features', 'price', 'ratings'].map((tabId) => (
                <button
                  key={tabId}
                  onClick={() => {
                    document.getElementById(tabId).scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={getTabClasses(tabId)}
                >
                  {tabId.charAt(0).toUpperCase() + tabId.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200"></div>

          {/* Software Selection Grid */}
          <div 
            className="grid divide-x divide-gray-200"
            style={{ 
              gridTemplateColumns: selected.length === 3 
                ? '200px 1fr 1fr 1fr' 
                : '200px 1fr 1fr'
            }}
          >
            {/* Left Cell - Add Software button */}
            <div className="p-8 flex items-center justify-center">
              {selected.length < 3 && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex flex-col items-center text-blue-600 hover:text-blue-700"
                >
                  <span className="text-sm mb-2">Compare with</span>
                  <PlusCircle className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Software Cards */}
            {selected.map((software, index) => (
              <div key={software._id} className="p-8 flex items-center justify-center">
                <div className="relative flex flex-col items-center justify-center">
                  {selected.length === 3 && (
                    <button
                      onClick={() => handleRemove(index)}
                      className="absolute -top-2 -right-2 text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}
                  <img
                    src={software.logo}
                    alt={software.name}
                    className="w-32 h-32 object-contain"
                  />
                  <span className="text-sm font-medium">
                    {software.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <SoftwareSelectModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSelect={handleSelect}
          selected={selected}
          softwareList={softwareList}
        />
      )}
    </div>
  );
};

export default CPSoftwareSelection;
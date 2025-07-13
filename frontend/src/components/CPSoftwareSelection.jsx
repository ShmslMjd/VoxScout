import React, { useState } from 'react';
import { PlusCircle, XCircle, Search, Star, X } from 'lucide-react';

// Modal Component
const SoftwareSelectModal = ({ isOpen, onClose, onSelect, selected, softwareList }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSoftware = softwareList.filter(software => 
    software.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selected.find(s => s.id === software.id)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add more products</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for Software and Services"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          <h3 className="font-medium text-gray-700">Suggested Products</h3>
          {filteredSoftware.map(software => (
            <div key={software.id} 
                 className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <img 
                  src={software.logo} 
                  alt={software.name}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h4 className="font-medium">{software.name}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(software.rating) 
                          ? "text-yellow-400 fill-current" 
                          : "text-gray-300"}
                      />
                    ))}
                    <span className="text-sm text-gray-600">
                      ({software.reviews}) {software.rating} out of 5
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onSelect(software)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Component
const CPSoftwareSelection = ({ selected, setSelected, softwareList }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleRemove = (index) => {
    const newSelected = [...selected];
    newSelected.splice(index, 1);
    setSelected(newSelected);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-8">
      {/* Container with padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Title */}
        <h1 className="text-2xl font-medium mb-8">
          {selected.map(s => s.name).join(' VS ')}
        </h1>

        {/* Card Container */}
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="px-6">
            <nav className="flex gap-8">
              <a href="#summary" className="border-b-2 border-blue-600 py-4 px-1 text-sm font-medium text-blue-600">Summary</a>
              <a href="#features" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Features</a>
              <a href="#price" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Price</a>
              <a href="#ratings" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Ratings</a>
            </nav>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200"></div>

          {/* Software Selection Grid */}
          <div className="grid grid-cols-3 divide-x">
            {/* Left Cell - Add Software or Third Selection */}
            <div className="p-8 flex items-center justify-center min-h-[250px]">
              {selected.length < 3 ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex flex-col items-center text-blue-600 hover:text-blue-700"
                >
                  <span className="text-sm mb-2">Add Software</span>
                  <PlusCircle className="w-6 h-6" />
                </button>
              ) : (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <button
                    onClick={() => handleRemove(2)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                  <img
                    src={selected[2].logo}
                    alt={selected[2].name}
                    className="w-32 h-32 object-contain mb-4"
                  />
                  <span className="text-sm font-medium">{selected[2].name}</span>
                </div>
              )}
            </div>

            {/* Middle Cell - First Selection */}
            <div className="p-8 flex items-center justify-center min-h-[250px]">
              {selected[0] && (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  {selected.length === 3 && (
                    <button
                      onClick={() => handleRemove(0)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}
                  <img
                    src={selected[0].logo}
                    alt={selected[0].name}
                    className="w-32 h-32 object-contain mb-4"
                  />
                  <span className="text-sm font-medium">{selected[0].name}</span>
                </div>
              )}
            </div>

            {/* Right Cell - Second Selection */}
            <div className="p-8 flex items-center justify-center min-h-[250px]">
              {selected[1] && (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  {selected.length === 3 && (
                    <button
                      onClick={() => handleRemove(1)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}
                  <img
                    src={selected[1].logo}
                    alt={selected[1].name}
                    className="w-32 h-32 object-contain mb-4"
                  />
                  <span className="text-sm font-medium">{selected[1].name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal remains the same */}
      {modalOpen && (
        <SoftwareSelectModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSelect={(software) => {
            if (selected.length < 3) {
              setSelected([...selected, software]);
              setModalOpen(false);
            }
          }}
          selected={selected}
          softwareList={softwareList}
        />
      )}
    </div>
  );
};

export default CPSoftwareSelection;
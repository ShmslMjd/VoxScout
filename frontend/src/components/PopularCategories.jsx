import { useState } from "react";
import { Star } from "lucide-react";
import elevenlabsLogo from '../img/homePage/elevenlabs2.png';
import voicemodLogo from '../img/homePage/voicemod.png';
import respeecherLogo from '../img/homePage/respeecher.png';
import murfLogo from '../img/homePage/murf.png';

// Dummy data for categories and software
const categories = [
  "Real-Time Voice Changers",
  "Studio-Quality Voice Generators",
  "Text-to-Speech (TTS) Voice Cloners",
  "Character or Celebrity Voice Imitators",
  "Developer/Enterprise APIs",
  "Accessibility and Assistive Voice Tools",
  "Offline functionality",
];

const softwareByCategory = {
  "Real-Time Voice Changers": [
    {
      name: "Elevenlabs",
      logo: elevenlabsLogo,
      rating: 4.5,
      reviews: 35131,
    },
    {
      name: "Voicemod",
      logo: voicemodLogo,
      rating: 4.5,
      reviews: 12139,
    },
    {
      name: "Respeecher",
      logo: respeecherLogo,
      rating: 4.5,
      reviews: 13635,
    },
    {
      name: "Murf AI",
      logo: murfLogo,
      rating: 4.5,
      reviews: 6445,
    },
    {
      name: "Respeecher",
      logo: respeecherLogo,
      rating: 4.5,
      reviews: 20170,
    },
    {
      name: "Voicemod",
      logo: voicemodLogo,
      rating: 4.5,
      reviews: 6793,
    },
    {
      name: "elvenlabs",
      logo: elevenlabsLogo,
      rating: 4.5,
      reviews: 2994,
    },
    {
      name: "Murf AI",
      logo: murfLogo,
      rating: 4,
      reviews: 4420,
    },
    {
      name: "Elevenlabs",
      logo: elevenlabsLogo,
      rating: 4.5,
      reviews: 13705,
    },
  ],
  // Add more categories and their software as needed
};

const PopularCategories = () => {
  const [selected, setSelected] = useState(categories[0]);
  const softwares = softwareByCategory[selected] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Categories List */}
        <div className="md:w-1/3">
          <h2 className="text-3xl font-bold mb-6">
            Most Popular Software
            <br />
            Categories
          </h2>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`text-left px-4 py-2 rounded border transition-all ${
                  selected === cat
                    ? "border-blue-500 text-blue-500 bg-white font-semibold"
                    : "border-transparent text-gray-700 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {/* Software Grid */}
        <div className="md:w-2/3 flex-1">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-lg">{selected}</span>
            <a
              href="#"
              className="text-blue-500 text-sm font-medium hover:underline"
            >
              See all {selected} Software
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {softwares.map((sw) => (
              <div
                key={sw.name}
                className="border rounded-lg p-4 flex flex-col items-center bg-white"
              >
                <div className="w-full flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">{sw.name}</span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-red-500 fill-red-500" />
                    <span className="text-xs text-gray-600">
                      ({sw.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>
                <img
                  src={sw.logo}
                  alt={sw.name}
                  className="h-24 my-4 object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
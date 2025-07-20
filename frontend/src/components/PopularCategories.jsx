import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useNavigate } from 'react-router';

const PopularCategories = ({ softwares }) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [softwareByCategory, setSoftwareByCategory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (softwares?.length > 0) {
      // Group software by category and count
      const categoryCount = softwares.reduce((acc, sw) => {
        acc[sw.category] = (acc[sw.category] || 0) + 1;
        return acc;
      }, {});

      // Get top 8 categories with most software
      const topCategories = Object.entries(categoryCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 8)
        .map(([category]) => category);

      // Create software by category object (limit 6 per category)
      const swByCategory = softwares.reduce((acc, sw) => {
        if (topCategories.includes(sw.category)) {
          if (!acc[sw.category]) {
            acc[sw.category] = [];
          }
          if (acc[sw.category].length < 6) {
            acc[sw.category].push({
              _id: sw._id,
              name: sw.name,
              logo: sw.logo,
              rating: sw.rating?.score || 0,
              reviews: sw.rating?.totalReviews || 0
            });
          }
        }
        return acc;
      }, {});

      setCategories(topCategories);
      setSoftwareByCategory(swByCategory);
      setSelected(topCategories[0]); // Select first category by default
    }
  }, [softwares]);

  const handleSoftwareClick = (softwareId) => {
    navigate(`/software/${softwareId}`);
  };

  if (!softwares?.length) return null;

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
              href={`/software?category=${encodeURIComponent(selected)}`}
              className="text-blue-500 text-sm font-medium hover:underline"
            >
              See all {selected} Software
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {softwareByCategory[selected]?.map((sw) => (
              <div
                key={sw._id}
                onClick={() => handleSoftwareClick(sw._id)}
                className="border rounded-lg p-4 flex flex-col items-center bg-white cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="w-full flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">{sw.name}</span>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {[...Array(Math.floor(sw.rating || 0))].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className="text-yellow-400 fill-yellow-400" 
                        />
                      ))}
                    </div>
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
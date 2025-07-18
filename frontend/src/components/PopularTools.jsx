import { useState, useEffect } from "react";
import { useNavigate } from "react-router"; // Add this import
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from '../lib/axios';

// Custom arrow components
const Arrow = ({ className, style, onClick, direction }) => (
	<button
		className={`absolute top-1/2 z-10 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 ${
			direction === "left" ? "left-0" : "right-0"
		}`}
		style={{ ...style }}
		onClick={onClick}
		aria-label={direction === "left" ? "Previous" : "Next"}
		type="button"
	>
		{direction === "left" ? (
			<ChevronLeft size={24} />
		) : (
			<ChevronRight size={24} />
		)}
	</button>
);

const PopularTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Add this hook

  // Fetch software data
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await api.get('/audio');
        // Sort by downloads and get top 5
        const sortedTools = response.data
          .sort((a, b) => b.downloads - a.downloads)
          .slice(0, 5);
        setTools(sortedTools);
      } catch (err) {
        console.error('Error fetching tools:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { 
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: { 
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: { 
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const handleCardClick = (toolId) => {
    navigate(`/software/${toolId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

	return (
		<div className="bg-sky-200 py-8 px-2 md:px-8 rounded-lg">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold">
            Popular AI Audio Tools
          </h2>
          <a
            href="/software"
            className="text-blue-700 font-medium hover:underline text-sm md:text-base"
          >
            See all
          </a>
        </div>
        <div className="relative">
          <Slider {...settings}>
            {tools.map((tool) => (
              <div key={tool._id} className="px-2">
                <div 
                  className="card bg-base-100 shadow-lg rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleCardClick(tool._id)}
                >
                  <div className="card-body p-4">
                    <div className="flex justify-between items-center">
                      <h2 className="card-title">{tool.name}</h2>
                      <button 
                        className="text-gray-400 hover:text-red-400"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click when clicking heart
                          // Add wishlist functionality here
                        }}
                      >
                        <Heart size={18} />
                      </button>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(Math.round(tool.rating?.score || 0))].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        ({tool.rating?.totalReviews || 0})
                      </span>
                    </div>
                  </div>
                  <figure className="px-4 pb-4">
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="w-full h-32 object-contain rounded-xl bg-white"
                    />
                  </figure>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
	);
};

export default PopularTools;
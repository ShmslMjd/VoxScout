import { Star, Bookmark, PlayCircle } from "lucide-react";
import elevenlabsLogo from "../img/homePage/elevenlabs.png";
import mic from "../img/softwareDetailPage/mic.jpg";

const SoftwareDetail = () => {
  // Dummy data for now
  const software = {
    name: "Elevenlabs",
    by: "Elevenlabs",
    logo: elevenlabsLogo,
    banner: mic,
    rating: 5,
    reviews: 3784,
    website: "https://elevenlabs.io",
  };

  return (
    <div className="max-w-7xl mx-auto mt-6">
      {/* Banner */}
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={software.banner}
          alt="Banner"
          className="w-full h-56 md:h-72 object-cover"
        />
        <button className="absolute inset-0 flex items-center justify-center">
          <PlayCircle size={48} className="text-white/80 hover:text-white" />
        </button>
      </div>
      {/* Card */}
      <div className="bg-white rounded-lg shadow flex flex-col md:flex-row items-center gap-6 px-6 py-6 -mt-16 relative z-10">
        {/* Logo */}
        <div className="bg-white rounded-lg shadow p-4 flex-shrink-0">
          <img src={software.logo} alt={software.name} className="h-24 w-24 object-contain" />
        </div>
        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{software.name}</h2>
          <div className="text-sm text-blue-600 mb-2">
            By <a href="#" className="hover:underline">{software.by}</a>
          </div>
          <div className="flex items-center gap-1 text-yellow-500 mb-1">
            {[...Array(software.rating)].map((_, i) => (
              <Star key={i} size={18} className="fill-yellow-400" />
            ))}
            <span className="text-gray-700 ml-2 font-medium">{software.reviews} Reviews</span>
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-row gap-2 mt-4 md:mt-0">
          <button className="btn btn-ghost btn-square">
            <Bookmark size={20} />
          </button>
          <a
            href={software.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Visit Website
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SoftwareDetail;
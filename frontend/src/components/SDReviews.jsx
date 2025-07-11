import React, { useState } from "react";
import { Star } from "lucide-react";
import avatar1 from "../img/softwareDetailPage/av1.jpg";
import avatar2 from "../img/softwareDetailPage/av2.jpg";
import avatar3 from "../img/softwareDetailPage/av3.jpg";
import avatar4 from "../img/softwareDetailPage/av4.jpg";

const reviews = [
  {
    avatar: avatar1,
    name: "John D.",
    role: "Company CEO",
    rating: 5,
    text: "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
  },
  {
    avatar: avatar2,
    name: "John D.",
    role: "Company CEO",
    rating: 5,
    text: "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
  },
  {
    avatar: avatar3,
    name: "John D.",
    role: "Company CEO",
    rating: 5,
    text: "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
  },
  {
    avatar: avatar4,
    name: "John D.",
    role: "Company CEO",
    rating: 5,
    text: "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
  },
  // Add more reviews as needed for pagination demo
];

const ratingStats = [
  { stars: 5, count: 488 },
  { stars: 4, count: 74 },
  { stars: 3, count: 14 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const totalReviews = ratingStats.reduce((sum, r) => sum + r.count, 0);
const average = 4.7;

const REVIEWS_PER_PAGE = 3;

const SDReviews = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  const pagedReviews = reviews.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE
  );

  return (
    <section className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <h2 className="text-2xl font-bold mb-4">Review</h2>
        <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
          <select className="border rounded px-3 py-2 text-sm w-56">
            <option>Sort by newest review</option>
            <option>Sort by oldest review</option>
            <option>Sort by highest rating</option>
            <option>Sort by lowest rating</option>
          </select>
        </div>
        {/* Overall Review Card */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Left: Average and stars */}
            <div className="flex flex-col items-center md:items-start min-w-[180px]">
              <span className="text-lg font-semibold mb-2 text-black">Overall Review</span>
              <span className="text-6xl font-extrabold text-black leading-none mb-2">{average}</span>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={32}
                    className={
                      i < Math.floor(average)
                        ? "fill-[#E6B057] text-[#E6B057]"
                        : i < average
                        ? "fill-[#E6B057] text-[#E6B057] opacity-50"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-base text-gray-400 font-medium">({totalReviews} Reviews)</span>
            </div>
            {/* Right: Bar chart */}
            <div className="flex-1 w-full">
              {ratingStats.map((r) => (
                <div key={r.stars} className="flex items-center gap-3 mb-2">
                  <span className="w-16 text-base font-medium text-black">{r.stars} stars</span>
                  <div className="flex-1 bg-[#F3F5F7] rounded h-2">
                    <div
                      className="bg-[#E6B057] h-2 rounded"
                      style={{
                        width: `${(r.count / ratingStats[0].count) * 100}%`,
                        transition: "width 0.3s",
                      }}
                    ></div>
                  </div>
                  <span className="w-8 text-base text-black text-right">{r.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Review List */}
        <div className="flex flex-col gap-6">
          {pagedReviews.map((review, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow flex flex-col md:flex-row items-start gap-4 p-6">
              <img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`mr-1 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-800 mb-2">"{review.text}"</p>
                <div className="font-bold">{review.name}</div>
                <div className="text-xs text-gray-500">{review.role}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <nav className="inline-flex items-center space-x-1">
              <button
                className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded ${
                    page === i + 1
                      ? "bg-[#E6B057] text-white font-bold"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default SDReviews;
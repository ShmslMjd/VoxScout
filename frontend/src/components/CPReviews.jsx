import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <div className="flex flex-col gap-3 py-4 px-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <img 
            src={review.avatar || '/default-avatar.png'} 
            alt={review.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-gray-900 truncate">{review.name}</h4>
          <p className="text-sm text-gray-500 truncate">{review.profession}</p>
          <div className="mt-1">
            <StarRating rating={review.rating} />
          </div>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{review.comment}</p>
          <p className="mt-1 text-xs text-gray-400">
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const RatingOverview = ({ rating }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-baseline">
        <span className="text-3xl font-semibold">{rating.score.toFixed(1)}</span>
        <span className="text-sm text-gray-500 ml-1">out of 5</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className={i < Math.floor(rating.score) 
                ? "text-yellow-400 fill-current" 
                : "text-gray-300"
              }
            />
          ))}
        </div>
        <span className="text-sm text-blue-600">({rating.totalReviews.toLocaleString()})</span>
      </div>
    </div>
  );
};

const CPReviews = ({ selected }) => {
  if (!selected || selected.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Reviews</h2>
        </div>

        <div className="px-6">
          <div className="overflow-x-auto">
            <div className="divide-y divide-gray-200">
              {/* Overall Rating Row - Updated */}
              <div
                className="grid divide-x divide-gray-200"
                style={{
                  gridTemplateColumns:
                    selected.length === 3 ? '180px 1fr 1fr 1fr' : '180px 1fr 1fr',
                }}
              >
                <div className="py-4 pl-4 pr-8 font-medium">Overall Rating</div>
                {selected.map((software, index) => (
                  <div key={index} className="py-4 px-6">
                    <RatingOverview rating={software.rating} />
                  </div>
                ))}
              </div>

              {/* Reviews Grid */}
              <div
                className="grid divide-x divide-gray-200"
                style={{
                  gridTemplateColumns:
                    selected.length === 3 ? '180px 1fr 1fr 1fr' : '180px 1fr 1fr',
                }}
              >
                <div className="py-4 pl-4 pr-8 font-medium">Recent Reviews</div>
                {selected.map((software, index) => (
                  <div key={index} className="divide-y divide-gray-200">
                    {software.reviews
                      .slice(0, 3) // Show only first 3 reviews
                      .map((review, i) => (
                        <ReviewCard key={i} review={review} />
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPReviews;
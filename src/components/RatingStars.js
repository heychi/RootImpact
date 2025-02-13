import React from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';

const RatingStars = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <Star key={star} className="text-yellow-400" />
        ) : (
          <StarOff key={star} className="text-gray-300" />
        )
      )}
    </div>
  );
};

export default RatingStars;

import React, { useState } from 'react';
import './vendorServices.css'; 

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'John Doe',
      rating: 4.5,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at luctus nulla. Sed vitae tristique arcu.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 5,
      comment:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    },
   
  ]);

  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={i <= rating ? 'filled-star' : 'empty-star'}>&#9733;</span>);
    }
    return stars;
  };

  return (
    <div className="review-section">
      <h2 className="review-heading">Customer Reviews</h2>
      <div className="review-cards">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h3>{review.name}</h3>
              <div className="star-rating">{renderStarRating(review.rating)}</div>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
      {/* <button className="write-review-btn">Write a Review</button> */}
    </div>
  );
};

export default ReviewSection;

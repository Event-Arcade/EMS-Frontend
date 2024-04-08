import React from "react";
import "./feedbackSection.css";
import FeedbackItem from "./FeedbackItem";
import profile1 from '../../assets/img/profileImg.jpg'

const FeedbackSection: React.FC = () => {
  const feedbackData = [
    {
      profilePicture: profile1,
      name: "Lahiru Madhuwantha",
      date: "April 7, 2024",
      rating: 5,
      comment: "Great Service! Highly recommend.",
    },
    {
      profilePicture: profile1,
      name: "Balasooriya Lahiru",
      date: "April 8, 2024",
      rating: 4,
      comment: "Great Service! Highly recommend.",
    },
    {
      profilePicture: profile1,
      name: "Madhuwantha Lahiru",
      date: "April 8, 2024",
      rating: 3,
      comment: "Great Service! Highly recommend.",
    },
    {
      profilePicture: profile1,
      name: "Madhuwantha Lahiru",
      date: "April 8, 2024",
      rating: 1,
      comment: "Great Service! Highly recommend.",
    },
  ];

  return (
    <div className="fb-section">
      <h2>Customer Ratings & Feedback</h2>
      {/* <div className="feedback-section"> */}
        <div className="scrollable-container">
          {feedbackData.map((feedback, index) => (
            <FeedbackItem key={index} {...feedback} />
          ))}
        </div>
      {/* </div> */}
    </div>
  );
};

export default FeedbackSection;

import React from "react";
import "./feedbackItem.css";

interface FeedbackItemProps {
  profilePicture: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({
  profilePicture,
  name,
  date,
  rating,
  comment,
}) => {
  const maxRating = 5;

  return (
    <div className="feedback-item">
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile" />
      </div>
      <div className="feedback-details">
        <div className="name-date">
          <p className="name">{name}</p>
          <p className="date">{date}</p>
        </div>
        <div className="rating">
          {Array.from({ length: maxRating }, (_, i) => (
            <span
              key={i}
              className={i < rating ? "star filled" : "star unfilled"}
            >
              {i < rating ? "★" : "☆"}
            </span>
          ))}
        </div>
        <p className="comment">{comment}</p>
      </div>
    </div>
  );
};

export default FeedbackItem;




// Feedback section component
// const FeedbackSectio: React.FC = () => {
//   // Sample feedback data
//   const feedbackData: FeedbackItemProps[] = [
//     {
//       profilePicture: "profile1.jpg",
//       name: "John Doe",
//       date: "April 1, 2024",
//       rating: 5,
//       comment: "Great product! Highly recommend.",
//     },
//     {
//       profilePicture: "profile2.jpg",
//       name: "Jane Smith",
//       date: "April 2, 2024",
//       rating: 4,
//       comment: "Good quality. Fast delivery.",
//     },
//     // Add more feedback items as needed
//   ];

//   return (
//     <div className="scrollable-container">
//       <div className="feedback-section">
//         <h2>Customer Ratings & Feedback</h2>
//         {feedbackData.map((feedback, index) => (
//           <FeedbackItem key={index} {...feedback} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeedbackSectio;

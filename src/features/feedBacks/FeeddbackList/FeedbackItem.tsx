import { useEffect, useState } from "react";
import FeedBack from "../../../interfaces/FeedBack";
import { useAppSelector } from "../../../store/hooks";
import "./feedbackItem.css";
import { User } from "../../../interfaces/User";

export default function FeedbackItem({ feedback }: { feedback: FeedBack }) {
  const { users } = useAppSelector((state) => state.account);
  const [commentor, setCommentor] = useState<User>();

  useEffect(() => {
    if (users) {
      const user = users.find((user) => user.id === feedback.applicationUserId);
      setCommentor(user);
    }
  }, [feedback, users]);

  return (
    <div className="feedback-item">
      <div className="profile-picture">
        <img src={commentor?.profilePictureUrl ?? ""} alt="Profile" />
      </div>
      <div className="feedback-details">
        <div className="name-date">
          <p className="name">{commentor?.firstName}</p>
          <p className="date">
            {feedback.postedOn ? feedback.postedOn.toString() : ""}
          </p>
        </div>
        <div className="rating">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={i < feedback.rating ? "star filled" : "star unfilled"}
            >
              {i < feedback.rating ? "★" : "☆"}
            </span>
          ))}
        </div>
        <p className="comment">{feedback.comment}</p>
      </div>
    </div>
  );
}

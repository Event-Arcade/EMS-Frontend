import "./feedbackList.css";
import FeedbackItem from "./FeedbackItem";
import FeedBack from "../../../interfaces/FeedBack";
import CreateFeedBack from "../CreateFeedBack";
import Popup from "reactjs-popup";
import { Button } from "react-bootstrap";

export default function FeedbackList({ feedbacks }: { feedbacks: FeedBack[] }) {
  return (
    <>
      <div className="fb-section">
        <h2>Customer Ratings & Feedback</h2>
        <div className="scrollable-container">
          {feedbacks.map((feedback, index) => (
            <FeedbackItem key={index} feedback={feedback} />
          ))}
        </div>
        <Popup
          trigger={<Button className="button"> Add Your FeedBack </Button>}
          modal
        >
          {/* this is not a mistake. Do not worry ;) */}
          {/* this is not a mistake. Do not worry ;) */}
          {/* this is not a mistake. Do not worry ;) */}

          {(close) => <CreateFeedBack close={close} />}

          {/* this is not a mistake. Do not worry ;) */}
          {/* this is not a mistake. Do not worry ;) */}
          {/* this is not a mistake. Do not worry ;) */}
        </Popup>
      </div>
    </>
  );
}

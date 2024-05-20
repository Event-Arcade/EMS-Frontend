import "./feedbackList.css";
import FeedbackItem from "./FeedbackItem";
import FeedBack from "../../../interfaces/FeedBack";
import CreateFeedBack from "../CreateFeedBack";
import Popup from "reactjs-popup";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";

export default function FeedbackList({
  feedbacks,
  shopOwner,
  serviceId,
}: {
  feedbacks: FeedBack[];
  shopOwner: string;
  serviceId: number;
}) {
  const { user } = useAppSelector((state) => state.account);
  const [abilityToAddFeedBack, setAbilityToAddFeedBack] = useState<boolean>();

  useEffect(() => {
    if (user) {
      if (user.id === shopOwner) {
        setAbilityToAddFeedBack(false);
      } else {
        setAbilityToAddFeedBack(true);
      }
    }
  }, [shopOwner, serviceId, user ]);
  return (
    <>
      <div className="fb-section">
        <h2>Customer Ratings & Feedback</h2>
        <div className="scrollable-container">
          {feedbacks.map((feedback, index) => (
            <FeedbackItem key={index} feedback={feedback} />
          ))}
        </div>
        {abilityToAddFeedBack && (
          <Popup
            trigger={<Button className="button"> Add Your FeedBack </Button>}
            modal
          >
            {/* this is not a mistake. Do not worry ;) */}
            {/* this is not a mistake. Do not worry ;) */}
            {/* this is not a mistake. Do not worry ;) */}

            {(close) => <CreateFeedBack close={close} serviceId={serviceId} />}

            {/* this is not a mistake. Do not worry ;) */}
            {/* this is not a mistake. Do not worry ;) */}
            {/* this is not a mistake. Do not worry ;) */}
          </Popup>
        )}
      </div>
    </>
  );
}

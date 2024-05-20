import { useEffect, useState } from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
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
    <Card className="feedback-item mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={2} className="profile-picture">
            <Image
              src={commentor?.profilePictureURL ?? ""}
              alt="Profile"
              roundedCircle
              fluid
            />
          </Col>
          <Col xs={10} className="feedback-details">
            <div className="name-date">
              <Card.Title className="name mb-1">{commentor?.firstName}</Card.Title>
              <Card.Subtitle className="date text-muted mb-2">
                {feedback.postedOn ? new Date(feedback.postedOn).toLocaleDateString() : ""}
              </Card.Subtitle>
            </div>
            <div className="rating mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={i < feedback.rating ? "star filled" : "star unfilled"}
                >
                  {i < feedback.rating ? "★" : "☆"}
                </span>
              ))}
            </div>
            <Card.Text className="comment mb-2">{feedback.comment}</Card.Text>
            <div className="feedback-images">
              <Row>
                {feedback.feedBackStaticResourceUrls && feedback.feedBackStaticResourceUrls.map((url, index) => (
                  <Col key={index} xs={3} className="mb-2">
                    <Image src={url} thumbnail className="feedback-thumbnail" />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

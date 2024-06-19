import { Card, Row, Col, Image, Button, Modal } from "react-bootstrap";
import "./feedbackItem.css";
import { getAccountById } from "../../../services/authService";
import { useState, useCallback, useEffect } from "react";
import { User } from "../../../interfaces/User";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { feedBackDelete } from "../FeedBackSlice";

interface FeedbackProp {
  id: number;
  comment: string;
  postedOn: Date;
  rating: number;
  feedbackStaticResourceUrls: string[];
  commentorId: string;
}

export default function FeedbackItem({
  id,
  comment,
  postedOn,
  rating,
  feedbackStaticResourceUrls,
  commentorId,
}: FeedbackProp) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const { loading } = useAppSelector((state) => state.feedback);
  const [commentor, setCommentor] = useState<User>();
  const [show, setShow] = useState(false);

  const getCommentor = useCallback(async () => {
    const response = await getAccountById(commentorId);
    if (response) {
      setCommentor(response);
    }
  }, [id]);

  useEffect(() => {
    getCommentor();
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleDeleteFeedback = () => {
    setShow(true);
  };

  const handleRemoveConfirm = async () => {
    const response = await dispatch(feedBackDelete(id)).unwrap();
    if (response) {
      setShow(false);
    }
  };

  return (
    <>
      <Card className="feedback-item mb-3" key={id}>
        <Card.Body>
          <Row className="align-items-center">
            {commentor && (
              <Col className="profile-picture">
                <Image src={commentor.profilePictureURL} roundedCircle />
                {commentor && (
                  <Card.Text className="comment mb-2">
                    {commentor.firstName}
                  </Card.Text>
                )}
              </Col>
            )}
            <Col xs={10}>
              <div>
                <Card.Title className="name mb-1">{comment}</Card.Title>
                <Card.Subtitle className="date text-muted mb-2">
                  {postedOn ? new Date(postedOn).toLocaleDateString() : ""}
                </Card.Subtitle>
              </div>
              <div className="rating mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={i < rating ? "star filled" : "star unfilled"}
                  >
                    {i < rating ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </Col>
            {user?.id == commentorId && (
              <Col>
                
                <i className="bi bi-trash3 feedback-icon-custom-style " style={{color:"red"}} onClick={handleDeleteFeedback}></i>
              </Col>
            )}
          </Row>
          <div className="feedback-images">
            <Row>
              {feedbackStaticResourceUrls &&
                feedbackStaticResourceUrls.map((url, index) => (
                  <Image src={url} className="feedback-thumbnail" />
                ))}
            </Row>
          </div>
        </Card.Body>
      </Card>
      {/* Remove conformation modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to remove your feedback ?
        </Modal.Body>
        <Modal.Footer>
          {!loading ? (
            <>
              <Button variant="danger" onClick={handleRemoveConfirm}>
                Confirm & Remove
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </>):
            <Button variant="primary" disabled>
              Removing ...
            </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Container, Button, Modal, Form, Spinner } from "react-bootstrap";
import FeedBack from "../../../interfaces/FeedBack";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { feedBackCreate } from "../FeedBackSlice";
import FeedbackItem from "./FeedbackItem";
import "./feedbackList.css";
import { shopGetAll } from "../../shops/ShopSlice";

interface FeedbackListProps {
  serviceId: number;
}

export default function FeedBackList({ serviceId }: FeedbackListProps) {
  const dispatch = useAppDispatch();
  const { loading, feedBacks } = useAppSelector((state) => state.feedback);
  const { shopServices } = useAppSelector((state) => state.service);
  const { user } = useAppSelector((state) => state.account);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [serviceFeedbacks, setServiceFeedbacks] = useState<FeedBack[]>(
    feedBacks.filter((f) => f.serviceId === serviceId)
  );
  const [newFeedback, setNewFeedback] = useState<FeedBack>({
    comment: "",
    rating: 1,
    serviceId: 0,
    applicationUserId: "",
    feedBackStaticResourcesUrls: [],
    feedBackStaticResourceFiles: [],
  });
  const [commentError, setCommentError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [currentService] = useState(
    shopServices.find((s) => s.id == serviceId)
  );

  const currentServiceId = useMemo(() => serviceId, [serviceId]);

  useEffect(() => {
    setServiceFeedbacks(
      feedBacks.filter((f) => f.serviceId === currentServiceId)
    );
  }, [feedBacks]);

  const close = () => {
    setShowFeedbackModal(false);
    setNewFeedback({
      comment: "",
      rating: 1,
      serviceId: 0,
      applicationUserId: "",
      feedBackStaticResourcesUrls: [],
      feedBackStaticResourceFiles: [],
    });
    setCommentError(null);
    setFileError(null);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewFeedback({
      ...newFeedback,
      [name]: value,
    });

    if (name === "comment" && value.length < 10) {
      setCommentError("Comment must be at least 10 characters long.");
    } else {
      setCommentError(null);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        setFileError("You can upload a maximum of 5 files.");
      } else {
        setFileError(null);
        setNewFeedback({
          ...newFeedback,
          feedBackStaticResourceFiles: files,
        });
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newFeedback.comment.length < 10) {
      setCommentError("Comment must be at least 10 characters long.");
      return;
    }
    if (
      newFeedback.feedBackStaticResourceFiles &&
      (newFeedback.feedBackStaticResourceFiles.length > 5 ||
        newFeedback.feedBackStaticResourceFiles.length === 0)
    ) {
      setFileError("You can upload a maximum of 5 files.");
      return;
    }
    const formData = new FormData();
    formData.append("comment", newFeedback.comment);
    formData.append("rating", newFeedback.rating.toString());
    formData.append("serviceId", serviceId.toString());
    if (newFeedback.feedBackStaticResourceFiles) {
      newFeedback.feedBackStaticResourceFiles.forEach((file) => {
        formData.append("feedBackStaticResources", file);
      });
    }
    try {
      const resposne = await dispatch(feedBackCreate(formData)).unwrap();
      if (resposne) {
        await dispatch(shopGetAll()).unwrap();
        close();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="my-4">
      {user?.id &&
        user.id !== currentService?.shopServiceOwner &&
        user.role == "client" && (
          <Button
            variant="primary"
            onClick={() => {
              setShowFeedbackModal(true);
            }}
          >
            Add Feedback
          </Button>
        )}
      <div className="mt-4">
        {serviceFeedbacks.length === 0 ? (
          <h3>No Feedbacks yet</h3>
        ) : (
          <>
            <h3>Customer Reviews</h3>
            <div className="feedback-list">
              {serviceFeedbacks.map((feedback) => (
                <FeedbackItem
                  key={feedback.id}
                  id={feedback.id || 1}
                  comment={feedback.comment}
                  postedOn={feedback.postedOn || new Date()}
                  rating={feedback.rating}
                  feedbackStaticResourceUrls={
                    feedback.feedBackStaticResourcesUrls || []
                  }
                  commentorId={feedback.applicationUserId}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Modal show={showFeedbackModal} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Add Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="comment"
                value={newFeedback.comment}
                onChange={handleChange}
                required
              />
              {commentError && (
                <Form.Text className="text-danger">{commentError}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={newFeedback.rating}
                onChange={handleChange}
                min={1}
                max={5}
                required
              />
            </Form.Group>

            <Form.Group
              className="mt-3"
              controlId="formFeedBackStaticResourceFiles"
            >
              <Form.Label>Upload Files</Form.Label>
              <Form.Control type="file" multiple onChange={handleFileChange} />
              {fileError && (
                <Form.Text className="text-danger">{fileError}</Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <Button variant="success" className="mt-3">
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mx-2"
              />
              Uploading ...
            </Button>
          ) : (
            <>
              <Button variant="warning" onClick={handleSubmit} className="mt-3">
                Create FeedBack
              </Button>
              <Button variant="danger" onClick={close} className="mt-3 ms-3">
                Cancel
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

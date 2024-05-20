import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import FeedBack from "../../interfaces/FeedBack";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { feedBackCreate } from "./FeedBackSlice";

export default function CreateFeedBack({
  close,
  serviceId,
}: {
  close: () => void;
  serviceId: number;
}) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.feedback);
  const [feedback, setFeedback] = useState<FeedBack>({
    comment: "",
    rating: 1,
    serviceId: 0,
    applicationUserId: "",
    feedBackStaticResourceUrls: [],
    feedBackStaticResourceFiles: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFeedback({
        ...feedback,
        feedBackStaticResourceFiles: Array.from(e.target.files),
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", feedback.comment);
    formData.append("rating", feedback.rating.toString());
    formData.append("serviceId", serviceId.toString());
    if (feedback.feedBackStaticResourceFiles) {
      feedback.feedBackStaticResourceFiles.forEach((file) => {
        formData.append("feedBackStaticResources", file);
      });
    }
    try {
      await dispatch(feedBackCreate(formData)).unwrap();
      close();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formComment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="comment"
          value={feedback.comment}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formRating">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="number"
          name="rating"
          value={feedback.rating}
          onChange={handleChange}
          min={1}
          max={5}
          required
        />
      </Form.Group>

      <Form.Group className="mt-3" controlId="formFeedBackStaticResourceFiles">
        <Form.Label>Upload Files</Form.Label>
        <Form.Control type="file" multiple onChange={handleFileChange} />
      </Form.Group>
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
          <Button variant="primary" type="submit" className="mt-3">
            Create FeedBack
          </Button>
          <Button variant="danger" onClick={close} className="mt-3 ms-3">
            Cancel
          </Button>
        </>
      )}
    </Form>
  );
}

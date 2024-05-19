import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FeedBack from "../../interfaces/FeedBack";

export default function CreateFeedBack({ close }: { close: () => void }) {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(feedback);
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
      <Button className="mt-3" variant="primary" type="submit">
        Post
      </Button>
      <Button className="mt-3 mx-5" onClick={close}>
        Cancel
      </Button>
    </Form>
  );
}

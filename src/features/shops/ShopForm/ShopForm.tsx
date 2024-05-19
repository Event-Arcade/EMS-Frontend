import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./shopForm.css";
import { useNavigate } from "react-router-dom";
import Shop from "../../../interfaces/Shop";
import { useAppDispatch } from "../../../store/hooks";
import { Button, Form } from "react-bootstrap";

export default function ShopForm({ close }: { close: any }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [shop, setShop] = useState<Shop>({
    name: "",
    description: "",
    rating: 0,
    ownerId: "",
    backgroundImageUrl: "",
    backgroundImageFile: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShop({
      ...shop,
      [name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setShop({
        ...shop,
        backgroundImageFile: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(shop);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={shop.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={shop.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formRating">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="number"
          name="rating"
          value={shop.rating}
          onChange={handleChange}
          min={0}
          max={5}
        />
      </Form.Group>

      <Form.Group controlId="formOwnerId">
        <Form.Label>Owner ID</Form.Label>
        <Form.Control
          type="text"
          name="ownerId"
          value={shop.ownerId}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBackgroundImageFile">
        <Form.Label>Upload Background Image</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit Shop
      </Button>
    </Form>
  );
}

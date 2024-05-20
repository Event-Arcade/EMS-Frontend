import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./shopForm.css";
import { useNavigate } from "react-router-dom";
import Shop from "../../../interfaces/Shop";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Button, Form, Spinner } from "react-bootstrap";
import { shopCreate } from "../ShopSlice";

export default function ShopForm({ close }: { close: any }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, shops } = useAppSelector((state) => state.shop);
  const { user } = useAppSelector((state) => state.account);

  const [shop, setShop] = useState<Shop>({
    name: "",
    description: "",
    rating: 0,
    ownerId: "",
    backgroundImageURL: "",
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const formData = new FormData();
    formData.append("name", shop.name);
    formData.append("description", shop.description ?? " description default");
    formData.append("backgroundImage", shop.backgroundImageFile as Blob);

    try {
      const response = await dispatch(shopCreate(formData)).unwrap();
      return navigate(`/shop/${response.id}`);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create Shop</h1>
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

      <Form.Group controlId="formBackgroundImageFile">
        <Form.Label>Upload Background Image</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>

      {error && <p className="text-danger">{error}</p>}

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
          Creating ...
        </Button>
      ) : (
        <>
          <Button variant="primary" type="submit" className="mt-3">
            Begin Journey
          </Button>
          <Button variant="danger" onClick={close} className="mt-3 ms-3">
            Cancel
          </Button>
        </>
      )}
    </Form>
  );
}

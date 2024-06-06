import { useState, ChangeEvent, FormEvent } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import Shop from "../../interfaces/Shop";
import { shopUpdate } from "./ShopSlice";

interface UpdateShopProps {
  shop: Shop;
  close: () => void;
}

export default function UpdateShop({ shop, close }: UpdateShopProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.shop);

  const [updatedShop, setUpdatedShop] = useState<Partial<Shop>>({
    name: shop.name,
    description: shop.description,
    ownerId: shop.ownerId,
    rating: shop.rating,
    backgroundImageFile: undefined,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedShop({
      ...updatedShop,
      [name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUpdatedShop({
        ...updatedShop,
        backgroundImageFile: e.target.files[0],
      });
    }
  };

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", updatedShop.name || "");
      formData.append("description", updatedShop.description || "");
      if (updatedShop.backgroundImageFile) {
        formData.append("backgroundImage", updatedShop.backgroundImageFile);
      }
      await dispatch(shopUpdate({id: shop.id || 0, formData: formData})).unwrap();
      close();
      navigate(`/shop/${shop.id}`);
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  };

  return (
    <Container className="update-shop-container">
      <h2 className="mb-4">Update Shop Details</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={updatedShop.name}
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
            value={updatedShop.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBackgroundFile">
          <Form.Label>Background Image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
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
            Updating ...
          </Button>
        ) : (
          <>
            <Button variant="primary" type="submit" className="mt-3">
              Update Shop
            </Button>
            <Button variant="danger" onClick={close} className="mt-3 ms-3">
              Cancel
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
}

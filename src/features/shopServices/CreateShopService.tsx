import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import ShopService from "../../interfaces/ShopService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { shopServiceCreate } from "./ShopServiceSlice";

interface ShopServiceFormProps {
  shopId: number;
  close: () => {};
}

export default function CreateShopService({
  shopId,
  close,
}: ShopServiceFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const { loading } = useAppSelector((state) => state.service);
  const [shopService, setShopService] = useState<ShopService>({
    name: "",
    description: "",
    rating: undefined,
    price: 0,
    shopId: shopId,
    categoryId: 0,
    shopServiceStaticResourcesFiles: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShopService({
      ...shopService,
      [name]:
        name === "rating" || name === "price" || name === "categoryId"
          ? parseInt(value)
          : value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setShopService({
        ...shopService,
        shopServiceStaticResourcesFiles: Array.from(e.target.files),
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const formData = new FormData();
    formData.append("name", shopService.name);
    formData.append("description", shopService.description || "");
    formData.append("price", shopService.price.toString());
    formData.append("shopId", shopService.shopId.toString());
    formData.append("categoryId", shopService.categoryId.toString());
    shopService.shopServiceStaticResourcesFiles?.forEach((file) => {
      formData.append("shopServiceStaticResources", file);
    });
    try {
      await dispatch(shopServiceCreate(formData)).unwrap();
      setShopService({
        name: "",
        description: "",
        rating: undefined,
        price: 0,
        shopId: shopId,
        categoryId: 0,
        shopServiceStaticResourcesFiles: [],
      });
      close();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Create Shop Service</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={shopService.name}
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
            value={shopService.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={shopService.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategoryId">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="categoryId"
            value={shopService.categoryId}
            onChange={handleChange}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formShopServiceStaticResourcesFiles">
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
            Creating ...
          </Button>
        ) : (
          <>
            <Button variant="primary" type="submit" className="mt-3">
              Submit Shop Service
            </Button>

            <Button variant="danger" onClick={close} className="mt-3 mx-5">
              Cancel
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
}

import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Shop from "../../interfaces/Shop";
import { shopCreate } from "./ShopSlice";
import { getCurrentUser } from "../accounts/UserAccountSlice";

export default function ShopForm({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: any;
}) {
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
      if (response) {
        const result = await dispatch(getCurrentUser()).unwrap();
        if (result) {
          navigate(`/shop/${response.id}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="no-fade">
      <Modal.Header closeButton>
        <Modal.Title>Start Your New Business Today!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
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
            <Button variant="primary" onClick={handleSubmit} className="mt-3">
              Begin Journey
            </Button>
            <Button
              variant="danger"
              onClick={handleClose}
              className="mt-3 ms-3"
            >
              Cancel
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

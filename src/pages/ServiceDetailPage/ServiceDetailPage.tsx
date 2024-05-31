import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  Carousel,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import ShopService from "../../interfaces/ShopService";
import FeedbackList from "../../features/feedBacks/FeeddbackList/FeedBackList";
import {
  shopServiceDelete,
  shopServiceUpdate,
} from "../../features/shopServices/ShopServiceSlice";
import {
  setSenderId,
  setChatBarVisibility,
  setChatInboxVisibility,
} from "../../features/chats/ChatSlice";

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { feedBacks } = useAppSelector((state) => state.feedback);
  const { shopServices, loading } = useAppSelector((state) => state.service);
  const { shops } = useAppSelector((state) => state.shop);
  const { user } = useAppSelector((state) => state.account);
  const [currentShopService, setCurrentShopService] = useState<
    ShopService | undefined
  >();
  const [updateShopService, setUpdateShopService] = useState<ShopService>({
    name: "",
    description: "",
    price: 0,
    rating: 0,
    categoryId: 0,
    noOfGuests: 0,
    indoor: false,
    outdoor: false,
    shopId: 0,
    shopServiceStaticResourcesURLs: [],
    shopServiceStaticResourcesFiles: [],
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tempService = shopServices.find(
      (service) => service.id === parseInt(id!)
    );
    if (tempService) {
      setCurrentShopService(tempService);
    }
  }, [feedBacks, id, shopServices]);

  useEffect(() => {
    if (currentShopService) {
      const tempService = shopServices.find(
        (service) => service.id === currentShopService.id
      );
      if (tempService) {
        setCurrentShopService(tempService);
        setUpdateShopService(currentShopService);
      }
    }
  }, [currentShopService, isUpdateModalOpen]);
  const handleUpdate = () => {
    setIsUpdateModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await dispatch(
        shopServiceDelete(currentShopService?.id || 0)
      );
      if (response) {
        setIsDeleteModalOpen(false);
        navigate(`/shop/${currentShopService?.shopId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleServiceUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", updateShopService.name);
    formData.append("description", updateShopService.description || "");
    formData.append("shopId", currentShopService?.shopId.toString() || "");
    formData.append(
      "noOfGuests",
      updateShopService.noOfGuests?.toString() || "10"
    );
    // @ts-ignore
    formData.append("indoor", updateShopService.indoor || false);
    // @ts-ignore
    formData.append("outdoor", updateShopService.outdoor || false);
    formData.append(
      "categoryId",
      currentShopService?.categoryId.toString() || ""
    );
    updateShopService.shopServiceStaticResourcesFiles?.forEach((file) => {
      formData.append("shopServiceStaticResourcesFiles", file);
    });

    try {
      const response = await dispatch(
        shopServiceUpdate({ id: currentShopService?.id || 0, data: formData })
      );
      if (response) {
        setIsUpdateModalOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "indoor" || name === "outdoor") {
      setUpdateShopService({
        ...updateShopService,
        [name]: updateShopService[name] ? false : true,
      });
    } else if (
      name === "categoryId" ||
      name === "shopId" ||
      name === "noOfGuests" ||
      name === "price"
    ) {
      setUpdateShopService({
        ...updateShopService,
        [name]: parseInt(value),
      });
    } else {
      setUpdateShopService({
        ...updateShopService,
        [name]: value,
      });
    }
  };

  const handleUpdateFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUpdateShopService({
        ...updateShopService,
        shopServiceStaticResourcesFiles: Array.from(e.target.files),
      });
    }
  };

  const handleChat = (shopId: number) => {
    const senderId = shops.find((shop) => shop.id === shopId)?.ownerId;
    if (senderId) {
      dispatch(setSenderId(senderId));
      dispatch(setChatInboxVisibility(true));
      dispatch(setChatBarVisibility(true));
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <Carousel>
              {currentShopService?.shopServiceStaticResourcesURLs?.map(
                (url, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={url}
                      alt={`Slide ${index}`}
                    />
                  </Carousel.Item>
                )
              )}
            </Carousel>
          </Col>
          <Col md={6}>
            <h2>{currentShopService?.name}</h2>
            <p>{currentShopService?.description}</p>
            <p>
              <strong>Price:</strong> ${currentShopService?.price}
            </p>
            <p>
              <strong>Rating:</strong>
              <span style={{ color: "orange" }}>
                {"★".repeat(Math.floor(currentShopService?.rating || 0))}
                {"☆".repeat(5 - Math.floor(currentShopService?.rating || 0))}
              </span>
              <span>({currentShopService?.rating})</span>
            </p>
            <p>
              <strong>Guests:</strong> {currentShopService?.noOfGuests}
            </p>
            <p>
              <strong>Indoor:</strong>{" "}
              {currentShopService?.indoor ? "Yes" : "No"}
            </p>
            <p>
              <strong>Outdoor:</strong>{" "}
              {currentShopService?.outdoor ? "Yes" : "No"}
            </p>
            {user?.role === "vendor" ? (
              <>
                <Button variant="warning" onClick={handleUpdate}>
                  Update
                </Button>
                <Button
                  variant="danger"
                  className="ml-2 mx-5"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate(`/shop/${currentShopService?.shopId}`);
                  }}
                >
                  Goto Store
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate(`/shop/${currentShopService?.shopId}`);
                  }}
                >
                  Goto Store
                </Button>{" "}
                <Button
                  variant="primary"
                  onClick={() => {
                    handleChat(currentShopService?.shopId ?? 0);
                  }}
                >
                  Chat with Vendor
                </Button>
              </>
            )}
          </Col>
        </Row>
        <FeedbackList
          isVendor={user?.role === "vendor"}
          serviceId={currentShopService?.id ?? 0}
        />
      </Container>
      <Footer />

      {/* Update Modal */}
      <Modal
        show={isUpdateModalOpen}
        onHide={() => setIsUpdateModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Your Service Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleServiceUpdate}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                min={10}
                max={20}
                value={updateShopService.name}
                onChange={handleUpdateChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={updateShopService.description}
                onChange={handleUpdateChange}
                maxLength={100}
              />
            </Form.Group>
            <Row className="my-3 align-items-center">
              <Col>
                <Form.Group controlId="formNoOfGouest">
                  <Form.Label>No. of Guests</Form.Label>
                  <Form.Control
                    type="number"
                    name="noOfGuests"
                    value={updateShopService.noOfGuests}
                    onChange={handleUpdateChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formIndoor">
                  <Form.Check
                    type="checkbox"
                    label="Indoor"
                    name="indoor"
                    checked={updateShopService.indoor}
                    onChange={handleUpdateChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formOutdoor">
                  <Form.Check
                    type="checkbox"
                    label="Outdoor"
                    name="outdoor"
                    checked={updateShopService.outdoor}
                    onChange={handleUpdateChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formShopServiceStaticResourcesFiles">
              <Form.Label>Upload Files</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleUpdateFileChange}
              />
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
                  Save Changes
                </Button>

                <Button
                  variant="danger"
                  onClick={() => {
                    setIsUpdateModalOpen(false);
                    setUpdateShopService({
                      name: "",
                      description: "",
                      price: 0,
                      rating: 0,
                      categoryId: 0,
                      shopId: 0,
                      shopServiceStaticResourcesURLs: [],
                      shopServiceStaticResourcesFiles: [],
                      noOfGuests: 0,
                      indoor: false,
                      outdoor: false,
                    });
                  }}
                  className="mt-3 mx-5"
                >
                  Cancel
                </Button>
              </>
            )}
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={isDeleteModalOpen}
        onHide={() => setIsDeleteModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this service?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServiceDetailPage;

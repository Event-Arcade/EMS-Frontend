// src/components/AdminStaticResourcesList.tsx
import { useState } from 'react';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import AdminStaticResource from '../../interfaces/AdminStaticResource';
import { useAppSelector } from '../../store/hooks';
import "./style.css";
import PageTitle from '../../components/pageTitle/PageTitle';

export default function AdminStaticResourceManagementListing() {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<AdminStaticResource | null>(null);
  const { staticResources} = useAppSelector((state)=> state.adminStaticResource);

  const handleShowModal = (resource: AdminStaticResource) => {
    setModalContent(resource);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <Container className="container">
      <PageTitle page={"Help"} title={""} />
      <Row>
        {staticResources.map((resource) => (
          <Col md={12} key={resource.id} className="mb-4">
            <Card>
              {resource.resourceUrl && (
                <Card.Img
                  variant="top"
                  src={resource.resourceUrl}
                  alt={resource.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <Card.Body>
                <Card.Title>{resource.name}</Card.Title>
                <Card.Text>{resource.description?.slice(0,50)}</Card.Text>
                <Button variant="warning" onClick={() => handleShowModal(resource)}>
                  View More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {modalContent && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{modalContent.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalContent.resourceUrl && (
              <img
                src={modalContent.resourceUrl}
                alt={modalContent.name}
                style={{ width: '100%', marginBottom: '15px' }}
              />
            )}
            <p>{modalContent.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};


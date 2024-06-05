import {
  Container,
  Row,
  Col,
  Table,
  Badge,
  Image,
  Button,
  Modal,
} from "react-bootstrap";
import "./style.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAllUsers,
  userAccountUpdateToAdmin,
} from "../../features/accounts/UserAccountSlice";
import {
  setChatBarVisibility,
  setChatInboxVisibility,
  setSenderId,
} from "../../features/chats/ChatSlice";

export default function ClientListing() {
  const dispatch = useAppDispatch();
  const { user, users, loading } = useAppSelector((state) => state.account);
  const [show, setShow] = useState(false);
  const [tempUserId, setTempUserId] = useState<string>("");
  const clients = useMemo(() => {
    return users?.filter((user) => user.role == "client") || [];
  }, [users]);

  const init = useCallback(async () => {
    await dispatch(getAllUsers());
  }, [user]);

  useEffect(() => {
    init();
  }, [init]);

  // Upgrade to admin function
  const handleConfirmationUpgradeToAdmin = async (clientId: string) => {
    // Implement the logic to upgrade the client to admin
    await dispatch(userAccountUpdateToAdmin(clientId));
  };

  // Modal functions
  const handleClose = () => {
    setTempUserId("");
    setShow(false);
  };

  return (
    <>
      <Container fluid className="p-4">
        <Row className="mb-4">
          <Col>
            <h1>Clients List</h1>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={client.id || index}>
                    <td>{index}</td>
                    <td>
                      {client.profilePictureURL && (
                        <Image
                          src={client.profilePictureURL}
                          roundedCircle
                          width="50"
                          height="50"
                          alt="Profile"
                        />
                      )}
                    </td>
                    <td>
                      {client.firstName} {client.lastName}
                    </td>
                    <td>{`${client.street}, ${client.city}, ${client.province}, ${client.postalCode}`}</td>
                    <td>{client.email}</td>
                    <td>
                      <Badge bg={client.isActive ? "success" : "secondary"}>
                        {client.isActive ? "Online" : "Offline"}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          dispatch(setSenderId(client.id));
                          dispatch(setChatInboxVisibility(true));
                          dispatch(setChatBarVisibility(true));
                        }}
                      >
                        Chat with User
                      </Button>
                    </td>
                    <td>
                      {!loading ? (
                        <Button
                          variant="warning"
                          onClick={() => {
                            setTempUserId(client.id || "");
                            setShow(true);
                          }}
                        >
                          Upgrade to admin
                        </Button>
                      ) : (
                        <Button variant="warning" disabled>
                          Loading...
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Conformation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to upgrade this user to Admin role?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleConfirmationUpgradeToAdmin(tempUserId);
              handleClose();
            }}
          >
            Upgrade to Admin Role
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

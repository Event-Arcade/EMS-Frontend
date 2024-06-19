import {
  Button,
  Card,
  Col,
  Container,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";
import "./adminDashboardPage.css";
import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllUsers } from "../../features/accounts/UserAccountSlice";
import { Link } from "react-router-dom";
import { setChatBarVisibility, setChatInboxVisibility, setSenderId } from "../../features/chats/ChatSlice";
import PageTitle from "../../components/pageTitle/PageTitle";

export default function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const { user, users } = useAppSelector((state) => state.account);
  const { shops } = useAppSelector((state) => state.shop);
  const { shopServices } = useAppSelector((state) => state.service);

  const totalUsers = useMemo(() => {
    return users?.length || 0;
  }, [users]);

  const activeUsers = useMemo(() => {
    return users?.filter((user) => user.isActive == true).length || 0;
  }, [users]);

  const inactiveUsers = useMemo(() => {
    return users?.filter((user) => user.isActive == false).length || 0;
  }, [users]);

  const init = useCallback(async () => {
    await dispatch(getAllUsers());
  }, [user]);

  useEffect(() => {
    init();
  }, [init]);

  const getServicesCount = (id: number) => {
    return shopServices?.filter((service) => service.shopId === id).length || 0;
  };

  return (
    
    <Container fluid className="p-4">
       <PageTitle page={"Admin Dashboard"} title={""} />
      <Row className="mb-4">
        <Col>
          <h4 className="dashboard-main-topic" style={{ color: "#f68905" }}>Dashboard</h4>
          <h5 style={{marginTop:"50px"}}>User Details</h5>
        </Col>
      </Row>
      <Row className="mb-4" style={{background:"white" ,padding:"50px"}}>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{totalUsers}</Card.Text>
              <ProgressBar variant="warning"
                now={(activeUsers / totalUsers) * 100}
                label={`${Math.round(
                  (activeUsers / totalUsers) * 100
                )}% Active`}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Active Users</Card.Title>
              <Card.Text>{activeUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Inactive Users</Card.Title>
              <Card.Text>{inactiveUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h5>Shop Details</h5>
        </Col>
      </Row>
      <Row className="mb-4" style={{background:"white" ,padding:"50px",marginBottom:"20px"}}>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Shops</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>No. of Services</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shops.map((shop, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/shop/${shop.id}`}>{shop.name}</Link>
                      </td>
                      <td>{shop.rating}</td>
                      <td>{getServicesCount(shop.id || 0)}</td>
                      <td>
                        <Button
                        variant="warning"
                          onClick={() => {
                            dispatch(setSenderId(shop.ownerId));
                            dispatch(setChatInboxVisibility(true));
                            dispatch(setChatBarVisibility(true));
                          }}
                        >
                          Chat with user
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

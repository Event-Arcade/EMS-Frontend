import {
  Container,
  Row,
  Col,
  Table,
  Badge,
  Image,
  Button,
} from "react-bootstrap";
import "./style.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback, useEffect, useMemo } from "react";
import { getAllUsers } from "../../features/accounts/UserAccountSlice";
import { Link } from "react-router-dom";
import { setChatBarVisibility, setChatInboxVisibility, setSenderId } from "../../features/chats/ChatSlice";
import PageTitle from "../../components/pageTitle/PageTitle";

export default function VendorListing() {
  const dispatch = useAppDispatch();
  const { user, users } = useAppSelector((state) => state.account);
  const { shops } = useAppSelector((state) => state.shop);
  const { shopServices } = useAppSelector((state) => state.service);

  const vendors = useMemo(() => {
    return users?.filter((user) => user.role == "vendor") || [];
  }, [user, users]);

  const init = useCallback(async () => {
    await dispatch(getAllUsers());
  }, [user]);

  useEffect(() => {
    init();
  }, [init]);

  const getShopName = (userId?: string) => {
    const shop = shops.find((shop) => shop.ownerId === userId);
    return shop?.name;
  };

  const getServices = (shopId?: number) => {
    const services = shopServices.filter(
      (service) => service.shopId === shopId
    );
    return services.length;
  };

  const getShopId = (userId?: string) => {
    const shop = shops.find((shop) => shop.ownerId === userId);
    return shop?.id;
  };

  return (
    <Container fluid className="p-4">
       <PageTitle page={"Vendors"} title={""} />
      <Row className="mb-4">
        <Col>
          <h4 style={{ color: "#f68905" }}>Vendors</h4>
          <h5 style={{marginTop:"50px",marginBottom:"-20px"}}>Vendor List</h5>
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
                <th>Shop Name</th>
                <th>No. of Services</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor.id || index}>
                  <td>{index}</td>
                  <td>
                    {vendor.profilePictureURL && (
                      <Image
                        src={vendor.profilePictureURL}
                        roundedCircle
                        width="50"
                        height="50"
                        alt="Profile"
                      />
                    )}
                  </td>
                  <td>
                    {vendor.firstName} {vendor.lastName}
                  </td>
                  <td>{`${vendor.street}, ${vendor.city}, ${vendor.province}, ${vendor.postalCode}`}</td>
                  <td>{vendor.email}</td>
                  <td>
                    <Badge bg={vendor.isActive ? "success" : "secondary"}>
                      {vendor.isActive ? "Online" : "Offline"}
                    </Badge>
                  </td>
                  <td>
                    <Link to={`/shop/${getShopId(vendor.id)}`}>
                      {getShopName(vendor.id)}
                    </Link>
                  </td>
                  <td>{getServices(getShopId(vendor.id))}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        dispatch(setSenderId(vendor.id));
                        dispatch(setChatInboxVisibility(true));
                        dispatch(setChatBarVisibility(true));
                      }}
                    >
                      Chat with Vendor
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

import { Container, Button, Badge } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import SubPackage from "../../interfaces/SubPackage";
import { useCallback, useEffect, useState } from "react";
import { getAllSubPackages } from "../../services/packageService";
import { packageUpdateSubPackage } from "../../features/package/PackageSlice";

export default function VendorSubPackageTable() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const { packages } = useAppSelector((state) => state.package);
  const { shops } = useAppSelector((state) => state.shop);
  const { shopServices } = useAppSelector((state) => state.service);

  const [mySubPackages, setSubMyPackages] = useState<SubPackage[]>([]);

  const init = useCallback(async () => {
    const response = await getAllSubPackages();
    if (response) {
      setSubMyPackages(response);
    }
  }, [packages, shopServices, shops, user]);

  useEffect(() => {
    init();
  }, [init]);

  const statusToBadge = (status: number) => {
    switch (status) {
      case 1:
        return <Badge bg="warning">Pending</Badge>;
      case 2:
        return <Badge bg="primary">Approved</Badge>;
      case 3:
        return <Badge bg="danger">Rejected</Badge>;
      case 4:
        return <Badge bg="success">Delivered</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const handleAccept = async (id: number) => {
    const mySubPackage = mySubPackages.find((subPkg) => subPkg.id === id);
    const data = new FormData();
    data.append("status", "2");
    data.append("id", id.toString());
    data.append("description", mySubPackage?.description ?? "");
    data.append("orderTime", mySubPackage?.orderTime.toString() ?? "");
    data.append("packageId", mySubPackage?.packageId?.toString() ?? ""); // Fix: Added nullish coalescing operator
    data.append("serviceId", mySubPackage?.serviceId.toString() ?? "");

    try {
        await dispatch(packageUpdateSubPackage({ id, data }));
    } catch (e) {
        console.error(e);
    }
  };

  const handleReject = (id: number) => {
    const mySubPackage = mySubPackages.find((subPkg) => subPkg.id === id);
    const data = new FormData();
    data.append("status", "3");
    data.append("id", id.toString());
    data.append("description", mySubPackage?.description ?? "");
    data.append("orderTime", mySubPackage?.orderTime.toString() ?? "");
    data.append("packageId", mySubPackage?.packageId?.toString() ?? ""); // Fix: Added nullish coalescing operator
    data.append("serviceId", mySubPackage?.serviceId.toString() ?? "");

    try {
        dispatch(packageUpdateSubPackage({ id, data }));
    } catch (e) {
        console.error(e);
    }
  };

  if (mySubPackages.length === 0) {
    return <Container className="mt-4">No Sub Packages</Container>;
  }

  return (
    <Container className="mt-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>SubPackage ID</th>
            <th>Description</th>
            <th>Order Time</th>
            <th>Package ID</th>
            <th>Service ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mySubPackages.map((subPkg) => (
            <tr key={subPkg.id}>
              <td>{subPkg.id}</td>
              <td>{subPkg.description}</td>
              <td>{new Date(subPkg.orderTime).toLocaleString()}</td>
              <td>{subPkg.packageId}</td>
              <td>{subPkg.serviceId}</td>
              <td>{statusToBadge(parseInt(subPkg.status || "0"))}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleAccept(subPkg?.id || 0)}
                  className="me-2"
                >
                  Accept
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleReject(subPkg?.id || 0)}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
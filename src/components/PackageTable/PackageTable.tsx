import Table from "react-bootstrap/Table";
import { Button, Badge, Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import Package from "../../interfaces/Package";
import React from "react";
import { packageDelete } from "../../features/package/PackageSlice";

export default function PackageTable() {
  const { user } = useAppSelector((state) => state.account);
  const { packages } = useAppSelector((state) => state.package);
  const [data, setData] = useState<Package[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.role === "client") {
      setData(packages);
    } else {
      setData(packages.filter((pkg) => pkg.userId === user?.id));
    }
  }, [user, packages]);

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 1:
        return <Badge bg="warning">Pending</Badge>;
      case 2:
        return <Badge bg="success">Approved</Badge>;
      case 3:
        return <Badge bg="danger">Rejected</Badge>;
      case 4:
        return <Badge bg="info">Delivered</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const handleDelete = async (index: number) => {
    try {
      await dispatch(packageDelete(index));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className="mt-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Package ID</th>
            <th>Package Status</th>
            <th>SubPackage ID</th>
            <th>Description</th>
            <th>Order Time</th>
            <th>Service ID</th>
            <th>SubPackage Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <React.Fragment key={pkg.id}>
              {pkg.subPackages.map((subPkg, idx) => (
                <tr key={subPkg.id}>
                  {idx === 0 && (
                    <>
                      <td rowSpan={pkg.subPackages.length}>{pkg.id}</td>
                      <td rowSpan={pkg.subPackages.length}>
                        {getStatusBadge(parseInt(pkg.status || "0"))}
                      </td>
                    </>
                  )}
                  <td>{subPkg.id}</td>
                  <td>{subPkg.description}</td>
                  <td>{new Date(subPkg.orderTime).toLocaleString()}</td>
                  <td>{subPkg.serviceId}</td>
                  <td>{getStatusBadge(parseInt(subPkg.status || "0"))}</td>
                  {idx === 0 && (
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleDelete(pkg.id || 0);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

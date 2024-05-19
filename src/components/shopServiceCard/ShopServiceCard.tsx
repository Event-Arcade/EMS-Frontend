import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import ShopService from "../../interfaces/ShopService";



export default function ShopServiceCard({shopService }: {shopService: ShopService}) {
  const navigate = useNavigate();
  return (
    <Card
      style={{ width: "16rem", padding: 0, margin: "10px", marginLeft: "15px" }}
    >
      <Card.Img variant="top" src={shopService.shopServiceStaticResourcesUrls ? shopService.shopServiceStaticResourcesUrls[0] : ''} />
      <Card.Body>
        <Card.Title style={{ fontSize: "15px", fontWeight: 600 }}>
          {shopService.name}
        </Card.Title>
        <Card.Text style={{ fontSize: "10px" }}>{shopService.description}</Card.Text>
        <Button
          style={{ background: "#e78309", borderWidth: 0, width: 100 }}
          onClick={() => navigate(`/shop-service/${shopService.id}`)}
        >
          Visit
        </Button>
      </Card.Body>
    </Card>
  );
}

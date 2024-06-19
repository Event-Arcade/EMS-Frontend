import React, { useMemo, useState } from 'react';
import { Badge, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addSubPackageToTemporary, removeSubPackageFromTemporary } from "../../../features/package/PackageSlice";
import SubPackage from "../../../interfaces/SubPackage";
import ShopService from "../../../interfaces/ShopService";
import "./shopServiceCard.css";

const ShopServiceCard = ({ shopService }: { shopService: ShopService }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { description, orderDate, tempararyPackage } = useAppSelector((state) => state.package);
  const defaultImageUrl = "../../assets/SlidingPic1.jpg";

  const isServiceSelected = useMemo(() => {
    return tempararyPackage.subPackages.some(
      (subPackage) => subPackage.serviceId === shopService.id
    );
  }, [tempararyPackage.subPackages, shopService.id]);

  const handleAddService = () => {
    const data: SubPackage = {
      description: description,
      orderTime: orderDate,
      serviceId: shopService.id!,
    };
    try {
      dispatch(addSubPackageToTemporary(data));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveService = () => {
    try {
      dispatch(removeSubPackageFromTemporary(shopService.id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="Service-form-item">
      <Carousel interval={null}>
        {shopService.shopServiceStaticResourcesURLs &&
          shopService.shopServiceStaticResourcesURLs.map((url, index) => (
            <Carousel.Item key={index}>
              <div className="Service-form-img">
                <img src={url} alt={`Slide ${index}`} />
              </div>
            </Carousel.Item>
          ))}
        {shopService.shopServiceStaticResourcesURLs ? (
          <Carousel.Item>
            <div className="Service-form-img">
              <img src={defaultImageUrl} alt="Default" />
            </div>
          </Carousel.Item>
        ) : null}
      </Carousel>
      <div className="Service-form-content">
        <div className="Service-form-title">{shopService.name}</div>
        <div className="Service-form-des">{shopService.description}</div>
        <div className="Service-form-price">{shopService.price}</div>
        <div className="Service-form-rating">
          <Badge bg="warning" text="dark">
            {shopService.rating} <i className="fa fa-star"></i>
          </Badge>
        </div>
        <div className="Service-form-button-row">
          {!isServiceSelected ? (
            <button className="Service-form-add" onClick={handleAddService}>
              Book
            </button>
          ) : (
            <button className="Service-form-add" onClick={handleRemoveService}>
              Remove
            </button>
          )}
          <button
            className="Service-form-visit"
            onClick={() => {
              navigate(`/shop-service/${shopService.id}`);
            }}
          >
            Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopServiceCard;

// export default function ShopServiceList() {
//   const { shopServices } = useAppSelector((state) => state.service);
//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 8; // 2 rows of 4 cards each
//   const totalPages = Math.ceil(shopServices.length / cardsPerPage);

//   const handleClick = (page: number) => {
//     setCurrentPage(page);
//   };

//   const paginatedServices = shopServices.slice(
//     (currentPage - 1) * cardsPerPage,
//     currentPage * cardsPerPage
//   );

//   return (
//     <div className="Service-form-container">
//       <div className="Service-form-list">
//         {paginatedServices.map((service) => (
//           <ShopServiceCard key={service.id} shopService={service} />
//         ))}
//       </div>
//       <ul className="Service-form-listPage">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <li
//             key={index}
//             onClick={() => handleClick(index + 1)}
//             className={currentPage === index + 1 ? 'active' : ''}
//           >
//             {index + 1}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

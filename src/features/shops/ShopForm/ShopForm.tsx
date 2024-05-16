import { FormEvent, useEffect, useState } from "react";
import "./shopForm.css";
import { useNavigate } from "react-router-dom";
import Shop from "../../../interfaces/Shop";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { shopCreate } from "../ShopSlice";

export default function ShopForm() {
  const { myshop } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();
  const [shop, setShop] = useState<Shop>();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", shop?.name || "");
    if (shop?.imageFile) {
      formData.append("image", shop.imageFile);
    }
    dispatch(shopCreate(formData));
  };

  useEffect(() => {
    if (myshop) {
      navigate("/shop");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myshop]);

  return (
    <div className={`modal modal-open`}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Create Shop</h3>
          <button className="close-button">Close</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="shopName">Shop Name:</label>
              <input
                type="text"
                id="shopName"
                value={shop?.name || ""}
                onChange={(e) => {
                  setShop({ ...shop, name: e.target.value });
                }}
                required
              />
            </div>
            <div>
              <label htmlFor="shopImage">Shop Image:</label>
              <input type="file" id="shopImage" accept="image/*" />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

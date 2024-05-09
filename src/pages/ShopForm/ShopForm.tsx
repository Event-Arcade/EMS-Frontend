import React, { useState } from 'react';
import './shopForm.css';
import { useNavigate } from 'react-router-dom';

interface ShopFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (shopName: string, shopImage: File | null) => void;
}

const ShopForm: React.FC<ShopFormProps> = ({ isOpen, onClose, onCreate }) => {
  const [shopName, setShopName] = useState('');
  const [shopImage, setShopImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(shopName, shopImage);
    setShopName('');
    setShopImage(null);
    onClose();
    navigate('/shopPage');
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Create Shop</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="shopName">Shop Name:</label>
              <input
                type="text"
                id="shopName"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="shopImage">Shop Image:</label>
              <input
                type="file"
                id="shopImage"
                accept="image/*"
                onChange={(e) => setShopImage(e.target.files ? e.target.files[0] : null)}
              />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopForm;

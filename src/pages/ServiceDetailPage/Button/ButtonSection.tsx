import { useState } from "react";
import "./buttonSection.css";
import Chat from "../../../components/Chat/Chat";

function ButtonSection() {
  const [chatVisible, setChatVisible] = useState(false);

  const handleOpenChat = () => {
    setChatVisible(true);
  };

  const handleCloseChat = () => {
    setChatVisible(false);
  };

  // const [isShopFormOpen, setIsShopFormOpen] = useState(false);

  // const handleOpenShopForm = () => {
  //   setIsShopFormOpen(true);
  // };

  // const handleCloseShopForm = () => {
  //   setIsShopFormOpen(false);
  // };

  // const handleCreateShop = (shopName: string) => {
  //   console.log('New shop created:', shopName);
  //   handleCloseShopForm();
  // };
  return (
    <div className="button-section">
      <button className="booking-btn">Book Now</button>
      <button className="chat-btn" onClick={handleOpenChat}>
        Chat
      </button>
      <Chat isVisible={chatVisible} onClose={handleCloseChat} />
    </div>
  );
}

export default ButtonSection;

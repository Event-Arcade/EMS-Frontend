import React, { useState } from 'react'
import './buttonSection.css'
import Chat from '../../components/Chat/Chat';

function ButtonSection() {
  const [chatVisible, setChatVisible] = useState(false);

    const handleOpenChat = () => {
        setChatVisible(true);
    };

    const handleCloseChat = () => {
        setChatVisible(false);
    };
  return (
    <div className='button-section'>
      <button className='booking-btn'>Book Now</button>
      <button className='chat-btn' onClick={handleOpenChat}>Chat</button>
      <Chat isVisible={chatVisible} onClose={handleCloseChat}/>
      </div>
  )
}

export default ButtonSection
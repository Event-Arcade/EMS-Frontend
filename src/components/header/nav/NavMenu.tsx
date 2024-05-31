import "./nav.css";
import NavNotice from "./navNotice/NavNotice";
import NavMessage from "./navMessage/NavMessage";
import NavAvatar from "./navAvatar/NavAvatar";
import {useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr"; // Import the necessary package


function NavMenu({ handleShowSignUp }: { handleShowSignUp: () => void }) {
  const { isLoggedIn, user } = useAppSelector((state) => state.account);
  const [chatClient, setChatClient] = useState<any>();

  useEffect(() => {
    if (user) {
      const newConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5257/personalChatHub", {
          withCredentials: false,
        })
        .withAutomaticReconnect()
        .build();

      setChatClient(newConnection);
    } else {
      chatClient?.stop();
      setChatClient(undefined);
    }
  }, [user]);



  useEffect(() => {
    if (chatClient) {
      // Event listeners
      chatClient.on("ReceiveMessage", (message: any) => {
        console.log("Message received: ", message);
      });
      chatClient.on("UserConnected", (message: any) => {
        console.log("User connected: ", message);
      });
      chatClient.on("UserOffline", (message: any) => {
        console.log("User offline: ", message);
      });

      chatClient.start().then(() => {
        console.log("Connection started:");
        chatClient.invoke("SetActive", user?.id);
      });
    }
    return () => {
      if (chatClient) {
        chatClient.stop().then(() => {
          console.log("Connection stopped");
        });
      }
    };
  }, [chatClient]);

  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        {!isLoggedIn ? (
          <li className="nav-item">
            <button onClick={handleShowSignUp} className="nav-link-btn-home">
              Sign In
            </button>
          </li>
        ) : (
          <>
            <NavNotice />
            <NavMessage chatService={chatClient} />
            <NavAvatar />
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavMenu;

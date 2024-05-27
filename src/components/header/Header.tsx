import "./header.css";
import Logo from "./logo/Logo";
import Searchbar from "./searchBar/Searchbar";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import SideBar from "../sideBar/SideBar";
import NavMenu from "./nav/NavMenu";

interface HeaderProps {
  getSideBarVisibility: () => void;
  handleShowSignUp: () => void;
}

export default function Header({
  getSideBarVisibility,
  handleShowSignUp,
}: HeaderProps) {
  const [isVisibleSideBar, setIsVisibleSideBar] = useState<boolean>(false);

  const toggleSideBar = () => {
    setIsVisibleSideBar(!isVisibleSideBar);
    getSideBarVisibility();
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <FaBars className="menu-icon" onClick={toggleSideBar} />
      <SideBar isVisible={isVisibleSideBar} />
      {/* logo */}
      <Logo />
      {/* searchbar */}
      <Searchbar />
      {/* nav */}
      <NavMenu handleShowSignUp={handleShowSignUp} />
    </header>
  );
}

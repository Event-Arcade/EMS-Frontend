import React, { useState } from "react";
import "./header.css";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Nav from "./Nav";
import { FaBars } from "react-icons/fa";

interface HeaderProps {
  toggleSideBar: () => void;
}
const Header: React.FC<HeaderProps> = ({toggleSideBar}) => {
 

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <FaBars className="menu-icon" onClick={toggleSideBar} />

      {/* logo */}
      <Logo/>
      {/* searchbar */}
      <Searchbar />
      {/* nav */}
      <Nav />
    </header>
  );
}

export default Header;

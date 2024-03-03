import React from "react";
import "./header.css";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Nav from "./Nav";

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      {/* logo */}
      <Logo />
      {/* searchbar */}
      <Searchbar />
      {/* nav */}
      <Nav />
    </header>
  );
}

export default Header;

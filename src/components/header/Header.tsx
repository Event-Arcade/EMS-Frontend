import "./header.css";
import Logo from "./logo/Logo";
import Searchbar from "./searchBar/Searchbar";
import Nav from "./nav/Nav";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import SideBar from "../sideBar/SideBar";

interface HeaderProps{
  getSideBarVisibility: () => void;
}

export default function Header({ getSideBarVisibility }: HeaderProps) { 
  const [isVisibleSideBar, setIsVisibleSideBar] = useState<boolean>(false);

  const toggleSideBar = ()=>{
    setIsVisibleSideBar(!isVisibleSideBar);
    getSideBarVisibility();
  }

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <FaBars className="menu-icon" onClick={toggleSideBar} />
      <SideBar isVisible={isVisibleSideBar}/>
      {/* logo */}
      <Logo/>
      {/* searchbar */}
      <Searchbar />
      {/* nav */}
      <Nav />
    </header>
  );
}


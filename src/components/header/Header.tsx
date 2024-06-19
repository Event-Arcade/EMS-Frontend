import "./header.css";
import Logo from "./logo/Logo";
import Searchbar from "./searchBar/Searchbar";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import SideBar from "../sideBar/SideBar";
import NavMenu from "./nav/NavMenu";
import { useAppSelector } from "../../store/hooks";

interface HeaderProps {
  handleShowSignUp: () => void;
  toggleSideBar: () => void;
  // isSignUpVisible: boolean;

}

export default function Header({ handleShowSignUp,toggleSideBar }: HeaderProps) {
  // const [isVisibleSideBar, setIsVisibleSideBar] = useState<boolean>(false);
  const { isLoggedIn } = useAppSelector((state) => state.account);

  // const toggleSideBar = () => {
  //   setIsVisibleSideBar(!isVisibleSideBar);
  // };
  // useEffect(() => {
  //   if (isSignUpVisible) {
  //     toggleSideBar();
  //   }
  // }, [isSignUpVisible]);

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      {isLoggedIn && (
        <>
          {/* <FaBars className="menu-icon" onClick={toggleSideBar} /> */}
          {/* <SideBar isVisible={isVisibleSideBar} /> */}
          <i className="bi bi-list" onClick={toggleSideBar}></i>
        </>
      )}
      {/* logo */}
      <Logo />
      {/* searchbar */}
      {/*<Searchbar />*/}
      {/* nav */}
      <NavMenu handleShowSignUp={handleShowSignUp} />
    </header>
  );
}

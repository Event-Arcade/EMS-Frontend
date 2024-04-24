import React, { useState } from 'react'
import Header from './Dashboard/Header'
import SideBar from './Dashboard/SideBar'

const CalenderPage: React.FC = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  return (
    <>
    <Header toggleSideBar={toggleSideBar}/>
    <SideBar isVisible={isSideBarVisible}/>
    </>
  )
}

export default CalenderPage
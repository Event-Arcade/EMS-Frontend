import React, { useState } from "react";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import CalendarComponent from "./CalendarComponent";
import Footer from "../../components/Footer/Footer";
// import Calendar from "react-calendar";
// import { EventType } from './CalendarComponent';

interface EventType {
  id: string; 
  title: string; 
  start: string; 
  end?: string; 
}
const CalenderPage: React.FC = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };
  const eventsData: EventType[] = [
    {
      id: "1",
      title: "Supply Food to Hotel Araliya",
      start: "2024-05-06",
    },
    {
      id: "2",
      title: "DJ Event",
      start: "2024-05-07",
    },
    {
      id: "3",
      title: "Wedding",
      start: "2024-05-08",
    },
    {
      id: "4",
      title: "DJ Event",
      start: "2024-05-08",
    },];
  return (
    <>
      <Header toggleSideBar={toggleSideBar} />
      {/* <SideBar isVisible={isSideBarVisible}/> */}
      <CalendarComponent events={eventsData} />
      <Footer/>
    </>
  );
};

export default CalenderPage;

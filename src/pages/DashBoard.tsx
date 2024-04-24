// import DashBoardCard from "../components/DashBoardCard/DashBoardCard";
// import Footer from "../components/Footer/Footer";
// import NavBar from "../components/NavBar/NavBar";
// import "../components/DashBoardCard/DashBoardCard.css";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Calender from "../components/Calender/Calender";

import Header from "./Dashboard/Header"

// export default function DashBoard() {
//   return (
//     <>
//       <div className="card-page-content">
//         <NavBar
//           isAuthenticated={true}
//           onLogout={() => console.log("Logout")}
//           onAuthentication={() => console.log("Authentication")}
//         />
//       </div>
//       <div>
//         <Container>
//           <Row className="solid-line">
//             <Col xs={2}>+ New Plane</Col>
//             <Col xs={6}>
//               <DashBoardCard />
//             </Col>
//             <Col>
//               <Row> Upcoming Events</Row>
//               <br></br>
//               <Row>Calender<Calender/></Row>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//       <div>
//         <Footer />
//       </div>
//     </>
//   );
// }
import '../App.css'
import SideBar from "./Dashboard/SideBar"
import Main from "./Dashboard/Main"
//import Footer from "./Dashboard/Footer"
import Footer from "../components/Footer/Footer"
import { useState } from "react"

const DashBoard: React.FC = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  return (
<>
<Header toggleSideBar={toggleSideBar}/>
<SideBar isVisible={isSideBarVisible}/>
<Main/>
<Footer/>
</>
    )
}

export default DashBoard
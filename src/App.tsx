import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import 'remixicon/fonts/remixicon.css';

import'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication/Authentication";
import DashBoard from "./pages/DashBoard";
import VendorRegistration from "./pages/VendorRegistration";
import EditProfile from "./pages/EditProfile";
import CalenderPage from "./pages/CalenderPage";
import StartPage from "./pages/StartPage";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Authentication/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/editProfile" element={<EditProfile/>}/>
        <Route path="/vendorRegistration" element={<VendorRegistration/>}/>
        <Route path="/calendar" element={<CalenderPage/>}/>
        <Route path="/startpage" element={<StartPage/>}/>
      </Routes>
    </Router>
  )
}



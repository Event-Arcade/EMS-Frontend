import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import "remixicon/fonts/remixicon.css";

import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication/Authentication";
import DashBoard from "./pages/DashBoard";
import VendorRegistration from "./pages/VendorRegistration";
import EditProfile from "./pages/ProfileSetting/EditProfile";
import CalenderPage from "./pages/Calander/CalenderPage";
import StartPage from "./pages/StartPage";
import ServiceDetailPage from "./pages/ServiceDetail/ServiceDetailPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import PackageDetailsPage from "./pages/PackageDetails/PackagDetailsPage";
import ShopPage from "./pages/ShopPage/ShopPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/vendorRegistration" element={<VendorRegistration />} />
        <Route path="/calendar" element={<CalenderPage />} />
        <Route path="/startpage" element={<StartPage />} />
        <Route path="/serviceDetailPage" element={<ServiceDetailPage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/packageDetails" element={<PackageDetailsPage />} />
        <Route path="/shopPage" element={<ShopPage />} />
      </Routes>
    </Router>
  );
}

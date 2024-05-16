import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import "remixicon/fonts/remixicon.css";

import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Authentication from "./features/accounts/Authentication";
import DashBoard from "./pages/DashBoard";
import VendorRegistration from "./pages/VendorRegistration";
import EditProfile from "./pages/ProfileSetting/EditProfile";
import CalenderPage from "./pages/Calander/CalenderPage";
import StartPage from "./pages/StartPage";
import ServiceDetailPage from "./pages/ServiceDetail/ServiceDetailPage/ServiceDetailPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import PackageDetailsPage from "./pages/PackageDetails/PackagDetailsPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import VendorServices from "./pages/VendorServices/VendorServices";
import { useCallback, useEffect } from "react";
import { getCurrentUser } from "./features/accounts/UserAccountSlice";
import { useAppDispatch } from "./store/hooks";
import AuthRoute from "./components/protectedRoutes/AuthRoute";
import ShopForm from "./features/shops/ShopForm/ShopForm";
import { categoryGetAll } from "./features/categories/CategorySlice";
import { shopGetAll } from "./features/shops/ShopSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const initApp = useCallback(async () => {
    await dispatch(getCurrentUser());
    await dispatch(categoryGetAll());
    await dispatch(shopGetAll());
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, []);
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
        <Route path="/vendorServices" element={<VendorServices />} />
        <Route path="/" element={<AuthRoute />}>
          <Route path="createshop" element={<ShopForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

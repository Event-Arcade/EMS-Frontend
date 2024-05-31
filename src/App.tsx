import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "reactjs-popup/dist/index.css";
import "./App.css";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import EditProfile from "./features/accounts/ProfileSetting/EditProfile";
import CalenderPage from "./pages/CalanderPage/CalenderPage";
import StartPage from "./pages/StartPage/StartPage";
import ServiceDetailPage from "./pages/ServiceDetailPage/ServiceDetailPage";
import AdminDashboard from "./pages/AdminDashboardPage/AdminDashboardPage";
import PackageDetailsPage from "./features/package/PackageDetails/PackagDetailsPage";
import ShopDetailPage from "./pages/ShopPage/ShopDetailPage";
import VendorServices from "./pages/VendorServices/VendorServices";
import { useCallback, useEffect, useState } from "react";
import { getCurrentUser } from "./features/accounts/UserAccountSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import AuthRoute from "./components/protectedRoutes/AuthRoute";
import { categoryGetAll } from "./features/categories/CategorySlice";
import { shopGetAll } from "./features/shops/ShopSlice";
import { shopServiceGetAll } from "./features/shopServices/ShopServiceSlice";
import AdminRoute from "./components/protectedRoutes/AdminRoute";
import { adminStaticResourceGetAll } from "./features/adminStaticResources/AdminStaticResourceSlice";
import { feedBackGetAll } from "./features/feedBacks/FeedBackSlice";
import CategoryManagementPage from "./pages/AdminCategoryManagementPage/CategoryManagementPage";
import StaticResourceManagementPage from "./pages/AdminStaticResourceManagementPage/StaticResourceManagementPage";
import VendorRoute from "./components/protectedRoutes/VendorRoute";
import VendorDashBoardPage from "./pages/VendorDashBoardPage/VendorDashBoardPage";
import ClientDashBoardPage from "./pages/ClientDashboardPage/ClientDashBoardPage";
import Header from "./components/header/Header";
import AuthenticationModal from "./features/accounts/authentication/AuthenticationModal";
import { packageGetAll } from "./features/package/PackageSlice";
import {
  getAllChatMessages,
  getAllUnReadChatMessages,
  getChatUsersIds,
} from "./features/chats/ChatSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { user, isLoggedIn } = useAppSelector((state) => state.account);

  const initApp = useCallback(async () => {
    await dispatch(getCurrentUser());
    await dispatch(categoryGetAll());
    await dispatch(shopGetAll());
    await dispatch(shopServiceGetAll());
    await dispatch(adminStaticResourceGetAll());
    await dispatch(feedBackGetAll());
    await dispatch(packageGetAll());
    await dispatch(getAllChatMessages());
    await dispatch(getAllUnReadChatMessages());
    await dispatch(getChatUsersIds());
  }, [dispatch]);

  const handleShowSignUP = () => {
    setShowSignInModal(true);
  };

  const handleClose = () => {
    setShowSignInModal(false);
  };

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      initApp();
    }
  }, [isLoggedIn]);
  return (
    <>
      <Router>
        <Header
          getSideBarVisibility={function (): void {
            throw new Error("Function not implemented.");
          }}
          handleShowSignUp={handleShowSignUP}
        />
        <AuthenticationModal show={showSignInModal} handleClose={handleClose} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/packageDetails" element={<PackageDetailsPage />} />
            <Route path="/vendorServices" element={<VendorServices />} />
            <Route
              path="/"
              element={<AuthRoute handleShowSignInModal={handleShowSignUP} />}
            >
              <Route path="/startpage" element={<StartPage />} />
              <Route path="/dashboard" element={<ClientDashBoardPage />} />
              <Route
                path="/editProfile"
                element={
                  <EditProfile
                    close={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                }
              />
              <Route path="/calendar" element={<CalenderPage />} />
              <Route path="/shop/:id" element={<ShopDetailPage />} />
              <Route path="/shop-service/:id" element={<ServiceDetailPage />} />

              <Route path="admin/" element={<AdminRoute />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route
                  path="category-management"
                  element={<CategoryManagementPage />}
                />
                <Route
                  path="static-resource-management"
                  element={<StaticResourceManagementPage />}
                />
              </Route>

              <Route path="vendor/" element={<VendorRoute />}>
                <Route path="dashboard" element={<VendorDashBoardPage />} />
              </Route>

              <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
          </Routes>
        </main>
      </Router>
    </>
  );
}

// TODO: implement the not found page

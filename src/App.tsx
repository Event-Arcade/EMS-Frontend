import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "reactjs-popup/dist/index.css";
import "./App.css";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import EditProfile from "./features/accounts/ProfileSetting/EditProfile";
import ServiceDetailPage from "./pages/ServiceDetailPage/ServiceDetailPage";
import AdminDashboard from "./pages/AdminDashboardPage/AdminDashboardPage";
import ShopDetailPage from "./pages/ShopPage/ShopDetailPage";
import VendorServices from "./pages/VendorServices/VendorServices";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  getUsersById,
  setUserActiveState,
  userRemoveEntity,
} from "./features/accounts/UserAccountSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import AuthRoute from "./components/protectedRoutes/AuthRoute";
import {
  categoryGetAll,
  categoryGetById,
  categoryRemoveEntity,
} from "./features/categories/CategorySlice";
import {
  shopGetAll,
  shopGetById,
  shopRemoveEntity,
} from "./features/shops/ShopSlice";
import {
  shopServiceGetAll,
  shopServiceGetById,
  shopServiceRemoveEntity,
} from "./features/shopServices/ShopServiceSlice";
import AdminRoute from "./components/protectedRoutes/AdminRoute";
import {
  adminStaticResourceGetAll,
  adminStaticResourceGetById,
  adminStaticResourceRemoveEntity,
} from "./features/adminStaticResources/AdminStaticResourceSlice";
import {
  feedBackGetAll,
  feedBackGetById,
  feedBackRemoveEntity,
} from "./features/feedBacks/FeedBackSlice";
import CategoryManagementPage from "./pages/AdminCategoryManagementPage/CategoryManagementPage";
import StaticResourceManagementPage from "./pages/AdminStaticResourceManagementPage/StaticResourceManagementPage";
import VendorRoute from "./components/protectedRoutes/VendorRoute";
import VendorDashBoardPage from "./pages/VendorDashBoardPage/VendorDashBoardPage";
import ClientDashBoardPage from "./pages/ClientDashboardPage/ClientDashBoardPage";
import Header from "./components/header/Header";
import AuthenticationModal from "./features/accounts/authentication/AuthenticationModal";
import {
  packageGetAll,
  packageGetAllSubPackages,
  packageGetById,
  packageGetSubPackageById,
  packageRemoveEntity,
  subPackageRemoveEntity,
} from "./features/package/PackageSlice";
import {
  chatGetUserInbox,
  chatGetUsersInboxs,
  chatSetMarkAsReaded,
  pushNewMessage,
  toggleUserActiveState,
} from "./features/chats/ChatSlice";
import Footer from "./components/Footer/Footer";
import {
  addNewNotification,
  notificationGetAll,
} from "./features/notifications/NotificationSlice";
import { HubConnectionBuilder } from "@microsoft/signalr";
import AdminStaticResourceManagementListing from "./pages/AdminStaticResourceManagementPage/AdminStaticResourceManagementListing";
import VendorListing from "./pages/VendorListingPage/VendorListing";
import ClientListing from "./pages/ClientListingPage/ClientListing";
import StartPage from "./pages/StartPage/StartPage";
import CalendarComponent from "./pages/CalanderPage/CalendarComponent";

export enum DatabaseChangeEventType {
  Add = 1,
  Update = 2,
  Delete = 3,
}

export enum EntityType {
  Package = 1,
  Feedback = 2, // done
  Service = 3, // done
  Shop = 4, // done
  User = 5,
  Category = 6, // done
  AdminStaticResource = 7, // done
  SubPackage = 8,
}

export default function App() {
  const dispatch = useAppDispatch();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { user, isLoggedIn } = useAppSelector((state) => state.account);
  const { chatInboxVisibility, chatBarVisibility, senderId } = useAppSelector(
    (state) => state.chat
  );

  const chatClient = useMemo(() => {
    if (user !== null) {
      return new HubConnectionBuilder()
        .withUrl("http://localhost:5257/personalChatHub", {
          withCredentials: false,
        })
        .configureLogging("information")
        .withAutomaticReconnect()
        .build();
    } else {
      return null;
    }
  }, [user, isLoggedIn]);

  // chat client event listeners
  useEffect(() => {
    if (chatClient !== null) {
      chatClient.start().then(() => {
        console.log("Connection started:");
        chatClient.invoke("SetActive", user?.id);
      });
      // Event listeners
      chatClient.on("ReceiveMessage", (message: any) => {
        console.log("Message received: ", message);
        //check chat inbox is open
        if (
          senderId == message.senderId &&
          chatInboxVisibility === true &&
          chatBarVisibility === true
        ) {
          dispatch(pushNewMessage(message));
          dispatch(chatSetMarkAsReaded(message.senderId));
        } else {
          dispatch(chatGetUserInbox(message.senderId));
        }
      });
      chatClient.on("UserConnected", (message: any) => {
        console.log("User connected: ", message);
        // set user active in chat slice
        dispatch(toggleUserActiveState(message));
        // set user active in account slice
        dispatch(setUserActiveState({ id: message, isActive: true }));
      });
      chatClient.on("ReceiveNotification", (message: any) => {
        console.log("Notification received: ", message);
        dispatch(addNewNotification(message));
      });
      chatClient.on("UserOffline", (message: any) => {
        console.log("User offline: ", message);
        // set user inactive in chat slice
        dispatch(toggleUserActiveState(message));
        // set user inactive in account slice
        dispatch(setUserActiveState({ id: message, isActive: false }));
      });
      chatClient.on("ReceiveDatabaseChangeEvent", (message: any) => {
        console.log("ReceiveDatabaseChangeEvent : ", message);
        switch (message.entityType) {
          case EntityType.AdminStaticResource:
            switch (message.eventType) {
              case DatabaseChangeEventType.Add:
                dispatch(adminStaticResourceGetById(message.entityId));
                break;
              case DatabaseChangeEventType.Update:
                dispatch(adminStaticResourceGetById(message.entityId));
                break;
              case DatabaseChangeEventType.Delete:
                dispatch(adminStaticResourceRemoveEntity(message.entityId));
                break;
              default:
                break;
            }
            break;
          case EntityType.Category:
            switch (message.eventType) {
              case DatabaseChangeEventType.Add:
                dispatch(categoryGetById(message.entityId));
                break;
              case DatabaseChangeEventType.Update:
                dispatch(categoryGetById(message.entityId));
                break;
              case DatabaseChangeEventType.Delete:
                dispatch(categoryRemoveEntity(message.entityId));
                break;
              default:
                break;
            }
            break;
          case EntityType.Shop:
            switch (message.eventType) {
              case DatabaseChangeEventType.Add:
                dispatch(shopGetById(message.entityId));
                break;
              case DatabaseChangeEventType.Update:
                dispatch(shopGetById(message.entityId));
                break;
              case DatabaseChangeEventType.Delete:
                dispatch(shopRemoveEntity(message.entityId));
                break;
              default:
                break;
            }
            break;
          case EntityType.Service:
            switch (message.eventType) {
              case DatabaseChangeEventType.Add:
                dispatch(shopServiceGetById(message.entityId));
                break;
              case DatabaseChangeEventType.Update:
                dispatch(shopServiceGetById(message.entityId));
                break;
              case DatabaseChangeEventType.Delete:
                dispatch(shopServiceRemoveEntity(message.entityId));
                break;
              default:
                break;
            }
            break;
          case EntityType.Feedback:
            switch (message.eventType) {
              case DatabaseChangeEventType.Add:
                dispatch(feedBackGetById(message.entityId));
                break;
              case DatabaseChangeEventType.Update:
                dispatch(feedBackGetById(message.entityId));
                break;
              case DatabaseChangeEventType.Delete:
                dispatch(feedBackRemoveEntity(message.entityId));
                break;
              default:
                break;
            }
            break;
          case EntityType.Package:
            switch (message.eventType) {
              case DatabaseChangeEventType.Add:
                dispatch(packageGetById(message.entityId));
                break;
              case DatabaseChangeEventType.Update:
                dispatch(packageGetById(message.entityId));
                break;
              case DatabaseChangeEventType.Delete:
                dispatch(packageRemoveEntity(message.entityId));
                break;
              default:
                break;
            }
            break;
          case EntityType.SubPackage:
            switch (message.eventType) {
              case DatabaseChangeEventType.Add:
                dispatch(packageGetSubPackageById(message.entityId));
                break;
              case DatabaseChangeEventType.Update:
                dispatch(packageGetSubPackageById(message.entityId));
                break;
              case DatabaseChangeEventType.Delete:
                dispatch(subPackageRemoveEntity(message.entityId));
                break;
              default:
                break;
            }
            break;
          case EntityType.User:
            switch (message.eventType) {
              case DatabaseChangeEventType.Add:
                dispatch(getUsersById(message.entityId));
                break;
              case DatabaseChangeEventType.Update:
                dispatch(getUsersById(message.entityId));
                break;
              case DatabaseChangeEventType.Delete:
                dispatch(userRemoveEntity(message.entityId));
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
      });
    }
    return () => {
      chatClient?.stop();
      console.log("Connection stopped");
    };
  }, [chatClient]);

  const initApp = useCallback(async () => {
    await dispatch(categoryGetAll());
    await dispatch(shopGetAll());
    await dispatch(shopServiceGetAll());
    await dispatch(adminStaticResourceGetAll());
    await dispatch(feedBackGetAll());
    const token = localStorage.getItem("token");
    if (token) {
      const result = await dispatch(getCurrentUser()).unwrap();
      if (result?.role === "client") {
        await dispatch(packageGetAll());
        await dispatch(chatGetUsersInboxs());
        await dispatch(notificationGetAll());
      } else if (result?.role === "vendor") {
        await dispatch(packageGetAllSubPackages());
        await dispatch(chatGetUsersInboxs());
        await dispatch(notificationGetAll());
      }
    }
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
        <Header handleShowSignUp={handleShowSignUP} />
        <AuthenticationModal show={showSignInModal} handleClose={handleClose} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vendorServices" element={<VendorServices />} />
            <Route path="/shop/:id" element={<ShopDetailPage />} />
            <Route path="/shop-service/:id" element={<ServiceDetailPage />} />

            {/* client auth paths */}
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
              <Route
                path="/help-resources"
                element={<AdminStaticResourceManagementListing />}
              />
              <Route path="/calendar" element={<CalendarComponent />} />

              {/* admin paths */}
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
                <Route path="vendor-details" element={<VendorListing />} />
                <Route path="client-details" element={<ClientListing />} />
              </Route>

              {/* vendor paths */}
              <Route path="vendor/" element={<VendorRoute />}>
                <Route path="dashboard" element={<VendorDashBoardPage />} />
              </Route>

              <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

// TODO: implement the not found page

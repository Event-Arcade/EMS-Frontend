import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import calculateArrivedTime from "../../../../util/calculateArrivedTime";
import { notificationSetMarkAsRead } from "../../../../features/notifications/NotificationSlice";
import { DatabaseChangeEventType, EntityType } from "../../../../App";

function NavNotice() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.notification);
  const { user } = useAppSelector((state) => state.account);

  const handleNotificationClicked = (id: number) => {
    const notification = notifications.find((n) => n.id === id);
    switch (user?.role) {
      case "admin":
        switch (notification?.eventType) {
          case DatabaseChangeEventType.Add:
            switch (notification?.entityType) {
              case EntityType.Service:
                navigate("/shop-service/" + notification.entityId);
                break;
              case EntityType.Shop:
                navigate("/shop/" + notification.entityId);
                break;
              case EntityType.User:
                navigate("/admin/dashboard/");
                break;
              case EntityType.Category:
                navigate("/admin/category-management/");
                break;
              case EntityType.AdminStaticResource:
                navigate("/admin/static-resource-management/");
                break;
              default:
                break;
            }
            break;
          case DatabaseChangeEventType.Update:
            switch (notification?.entityType) {
              case EntityType.Service:
                navigate("/shop-service/" + notification.entityId);
                break;
              case EntityType.Shop:
                navigate("/shop/" + notification.entityId);
                break;
              case EntityType.User:
                navigate("/admin/dashboard/");
                break;
              case EntityType.Category:
                navigate("/admin/category-management/");
                break;
              case EntityType.AdminStaticResource:
                navigate("/admin/static-resource-management/");
                break;
              default:
                break;
            }
            break;
          case DatabaseChangeEventType.Delete:
            switch (notification?.entityType) {
              case EntityType.User:
                navigate("/admin/dashboard/");
                break;
              case EntityType.Category:
                navigate("/admin/category-management/");
                break;
              case EntityType.AdminStaticResource:
                navigate("/admin/static-resource-management/");
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
        break;
      case "vendor":
        switch (notification?.eventType) {
          case DatabaseChangeEventType.Add:
            switch (notification?.entityType) {
              case EntityType.Package:
                navigate("/vendor/dashboard/");
                break;
              case EntityType.Feedback:
                navigate("/shop-service/" + notification.entityId);
                break;
              default:
                break;
            }
            break;
          case DatabaseChangeEventType.Update:
            switch (notification?.entityType) {
              case EntityType.Package:
                navigate("/vendor/dashboard/");
                break;
              default:
                break;
            }
            break;
          case DatabaseChangeEventType.Delete:
            switch (notification?.entityType) {
              case EntityType.Package:
                navigate("/vendor/dashboard/");
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
        break;
      case "client":
        switch (notification?.eventType) {
          case DatabaseChangeEventType.Add:
            switch (notification?.entityType) {
              case EntityType.Service:
                navigate("/shop-service/" + notification.entityId);
                break;
              default:
                break;
            }
            break;
          case DatabaseChangeEventType.Update:
            switch (notification?.entityType) {
              case EntityType.Package:
                navigate("/dashboard");
                break;
              case EntityType.SubPackage:
                navigate("/dashboard");
                break;
              default:
                break;
            }
            break;
          case DatabaseChangeEventType.Delete:
            switch (notification?.entityType) {
              case EntityType.SubPackage:
                navigate("/dashboard");
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  const getNotificationEventType = (eventType: number) => {
    switch (eventType) {
      case DatabaseChangeEventType.Add:
        // return right icon based on event type
        return "bi bi bi-bell text-success";
      case DatabaseChangeEventType.Update:
        return "bi bi bi-pencil-square text-info";
      case DatabaseChangeEventType.Delete:
        return "bi bi bi-trash text-danger";
      default:
        return "bi bi bi-exclamation-circle text-info";
    }
  };

  const handleMarkAsRead = async (id: number) => {
    // mark notification as read
    await dispatch(notificationSetMarkAsRead(id));
  };

  if (notifications.length === 0)
    return (
      <li className="nav-item dropdown">
        <a className="nav-link nav-icon" data-bs-toggle="dropdown">
          <i className="bi bi-bell"></i>
        </a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notification">
          <li className="dropdown-header">You have no notifications</li>
        </ul>
      </li>
    );

  return (
    <li className="nav-item dropdown">
      <a className="nav-link nav-icon" data-bs-toggle="dropdown">
        <i className="bi bi-bell"></i>
        <span className="badge bg-primary badge-number">
          {notifications.length}
        </span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notification">
        <li className="dropdown-header">
          You have {notifications.length} notifications
          <a>
            <span className="badge rounded-pill bg-primary p-2 ms-2"></span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        {notifications.map((notification) => (
          <>
            <li key={notification.id} className="notification-item">
              <i
                className={getNotificationEventType(notification.eventType)}
              ></i>
              <div>
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <p>{calculateArrivedTime(notification.createdAt)}</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  mark as read
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleNotificationClicked(notification.id)}
                >
                  view
                </button>
              </div>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
          </>
        ))}
        <li className="dropdown-footer">
          <a>
            <i className="bi bi-arrow-right-circle"></i> Mark all as read
          </a>
        </li>
      </ul>
    </li>
  );
}

export default NavNotice;

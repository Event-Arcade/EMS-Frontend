import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export default function AdminRoute() {
  const { user } = useAppSelector((state) => state.account);
  const navigate = useNavigate();
  return user?.role === "admin" ? <Outlet /> : <>{navigate("/")}</>;
}

// TODO: unAuthorized page create
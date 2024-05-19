import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export default function VendorRoute() {
  const { user } = useAppSelector((state) => state.account);
  const navigate = useNavigate();
  return user?.role === "vendor" ? <Outlet /> : <>{navigate("/")}</>;
}

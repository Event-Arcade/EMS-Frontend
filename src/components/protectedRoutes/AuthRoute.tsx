import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export default function AuthRoute() {
  const { isLoggedIn } = useAppSelector((state) => state.account);
  const navigate = useNavigate();
  return isLoggedIn ? <Outlet /> : <>{navigate("/")}</>;
}

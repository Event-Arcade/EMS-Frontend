import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export default function AuthRoute({ handleShowSignInModal }: { handleShowSignInModal: ()=>void}) {
  const { isLoggedIn } = useAppSelector((state) => state.account);
  return isLoggedIn ? <Outlet /> : <>{handleShowSignInModal()}</>;
}

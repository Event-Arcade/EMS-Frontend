import NavBar from "../components/NavBar";
import SlidingPanel from "../components/SlidingPanel";

export default function Home() {
  return (
    <>
      <NavBar
        isAuthenticated={false}
        onLogout={() => console.log("Logout")}
        onAuthentication={() => console.log("Authentication")}
      />
      <SlidingPanel />
    </>
  );
}

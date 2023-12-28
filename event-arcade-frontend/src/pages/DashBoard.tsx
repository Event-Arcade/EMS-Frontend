import NavBar from "../components/NavBar";


export default function DashBoard() {
  return (
    <div><NavBar isAuthenticated={true} onLogout={() => console.log("Logout")} onAuthentication={() => console.log("Authentication")} /></div>
  )
}

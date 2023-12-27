import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication/Authentication";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Authentication/>}/>

      </Routes>
    </Router>
  )
}



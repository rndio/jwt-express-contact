//import react router dom
import { Routes, Route } from "react-router-dom";

//import view homepage
import Home from '../views/home.jsx';

// Auth
import Register from "../views/auth/Register.jsx";
import Login from "../views/auth/Login.jsx";
import Dashboard from "../views/dashboard/Dashboard.jsx";
import Logout from "../views/auth/Logout.jsx";
import MyMessage from "../views/dashboard/MyMessage.jsx";
import SendMessage from "../views/SendMessage.jsx";

function RoutesIndex() {
  return (
  <Routes>
    {/* Route Home */}
    <Route path="/" element={<Home />} />
    <Route path="/u/:username" element={<SendMessage />} />

    {/* Route Auth */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/logout" element={<Logout />} />

    {/* Route Admin */}
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/dashboard/mymessage" element={<MyMessage/>} />


    {/* Route 404 */}
    <Route path="*" element={<h1>404 Not Found</h1>} />
  </Routes>
  )
}

export default RoutesIndex
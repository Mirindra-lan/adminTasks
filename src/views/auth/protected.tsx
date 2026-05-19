import  { Navigate, useLocation } from "react-router";
import Homepage from "../home/homepage.js";

export default function ProtectedRoute() {
    const location = useLocation()
    const isAuthentified = !!localStorage.getItem("token");
    if(isAuthentified) {
        return <Homepage/>
    }
    return <Navigate to="/login" state={{from: location}} replace/>
}
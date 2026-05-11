import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./home/homepage.js";
import LoginPage from "./auth/login.js";
import RegisterPage from "./auth/register.js";
import "./global.css";

const router = createBrowserRouter([
    {path: "/", element: <Homepage/>},
    {path: "/login", element: <LoginPage/>},
    {path: "/register", element: <RegisterPage/>}
]);
export default function App() {
    return <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
}
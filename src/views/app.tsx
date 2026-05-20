import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./auth/login.js";
import RegisterPage from "./auth/register.js";
import "./global.css";
import MainPage from "./home/mainPage.js";
import TaskManagement from "./tasks/taskPages.js";
import UsersPage from "./users/userPages.js";
import UserProfile from "./users/profilUser.js";
import SettingsPage from "./settings/settingPages.js";
import ProtectedRoute from "./auth/protected.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute/>,
        children: [
            {index: true,element: <MainPage/>},
            {path: "tasks", element: <TaskManagement />},
            {path: "users", element: <UsersPage/>},
            {path: "profile", element: <UserProfile/>},
            {path: "conf", element: <SettingsPage/>}
        ]
    },
    {path: "/login", element: <LoginPage/>},
    {path: "/register", element: <RegisterPage/>}
]);
export default function App() {
    return <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
}
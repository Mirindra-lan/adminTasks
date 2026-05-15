import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./home/homepage.js";
import LoginPage from "./auth/login.js";
import RegisterPage from "./auth/register.js";
import "./global.css";
import MainPage from "./home/mainPage.js";
import TaskManagement from "./tasks/taskPages.js";
import UsersPage from "./users/userPages.js";

const router = createBrowserRouter([
    {
        path: "/app",
        element: <Homepage/>,
        children: [
            {index: true,element: <MainPage/>},
            {path: "tasks", element: <TaskManagement />},
            {path: "users", element: <UsersPage/>}
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
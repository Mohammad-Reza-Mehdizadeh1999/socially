import { createBrowserRouter } from "react-router";
import type { RouteObject } from "react-router";
import Home from "../pages/Home";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/Register";
import NotificationsPage from "../pages/Notification";
import ProfilePage from "../pages/Profile";


const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/notifications", element: <NotificationsPage /> },
  { path: "/profile/:username", element: <ProfilePage /> },
];

const router = createBrowserRouter(routes);

export default router;